import { parseGIF, decompressFrame } from "gifuct-js";
import { GIFEncoder, quantize, applyPalette } from "gifenc";

const MAX_BYTES = 20 * 1024 * 1024;
const MAX_PIXELS = 64 * 1024 * 1024;
const fail = (message) => { throw new Error(message); };

function delayOf(frame) {
  return (frame.gce?.delay || 10) * 10;
}

function colorDistance(data, index, color) {
  const offset = index * 4;
  const red = data[offset] - color[0];
  const green = data[offset + 1] - color[1];
  const blue = data[offset + 2] - color[2];
  return red * red + green * green + blue * blue;
}

function dominantBorderColor(image) {
  const { width, height, data } = image;
  const bins = new Map();
  const stride = Math.max(1, Math.floor(Math.min(width, height) / 48));
  const add = (x, y) => {
    const index = (y * width + x) * 4;
    if (data[index + 3] < 16) return;
    const key = `${data[index] >> 4},${data[index + 1] >> 4},${data[index + 2] >> 4}`;
    const bin = bins.get(key) || { count: 0, red: 0, green: 0, blue: 0 };
    bin.count++;
    bin.red += data[index];
    bin.green += data[index + 1];
    bin.blue += data[index + 2];
    bins.set(key, bin);
  };
  for (let x = 0; x < width; x += stride) { add(x, 0); add(x, height - 1); }
  for (let y = 0; y < height; y += stride) { add(0, y); add(width - 1, y); }
  const top = [...bins.values()].sort((a, b) => b.count - a.count)[0];
  return top ? [top.red / top.count, top.green / top.count, top.blue / top.count] : null;
}

function contourGapBarrier(image, color, limit) {
  const { width, height, data } = image;
  const barrier = new Uint8Array(width * height);
  const radius = Math.max(2, Math.min(6, Math.round(Math.min(width, height) * 0.03)));
  const maxGap = radius * 2;
  const states = new Uint8Array(width * height);
  for (let index = 0; index < states.length; index++) {
    if (data[index * 4 + 3] < 16) continue;
    states[index] = colorDistance(data, index, color) <= limit ? 1 : 2;
  }
  const scan = (startX, startY, dx, dy) => {
    let bounded = false;
    let run = [];
    for (let x = startX, y = startY; x >= 0 && x < width && y >= 0 && y < height; x += dx, y += dy) {
      const index = y * width + x;
      if (states[index] === 2) {
        if (bounded && run.length && run.length <= maxGap) for (const candidate of run) barrier[candidate] = 1;
        bounded = true;
        run = [];
      } else if (states[index] === 1 && bounded) {
        if (run.length <= maxGap) run.push(index);
      } else {
        bounded = false;
        run = [];
      }
    }
  };
  for (let y = 0; y < height; y++) scan(0, y, 1, 0);
  for (let x = 0; x < width; x++) scan(x, 0, 0, 1);
  for (let x = 0; x < width; x++) { scan(x, 0, 1, 1); scan(x, 0, -1, 1); }
  for (let y = 1; y < height; y++) { scan(0, y, 1, 1); scan(width - 1, y, -1, 1); }
  return barrier;
}

function removeConnectedBackground(image, tolerance, boundaryMode) {
  const { width, height, data } = image;
  const color = dominantBorderColor(image);
  if (!color) return 0;
  const length = width * height;
  const seen = new Uint8Array(length);
  const background = new Uint8Array(length);
  const queue = new Uint32Array(length);
  const limit = (12 + tolerance * 2) ** 2;
  let front = 0;
  let back = 0;
  const protectedBoundary = boundaryMode === "protect" && width > 2 && height > 2;
  const barrier = protectedBoundary ? contourGapBarrier(image, color, limit) : null;
  const push = (index) => {
    if (seen[index]) return;
    seen[index] = 1;
    if (barrier?.[index] || data[index * 4 + 3] < 16 || colorDistance(data, index, color) > limit) return;
    background[index] = 1;
    queue[back++] = index;
  };
  if (protectedBoundary) {
    push(width + 1);
    push(width + width - 2);
    push((height - 2) * width + 1);
    push((height - 2) * width + width - 2);
  } else {
    for (let x = 0; x < width; x++) { push(x); push((height - 1) * width + x); }
    for (let y = 1; y < height - 1; y++) { push(y * width); push(y * width + width - 1); }
  }
  while (front < back) {
    const index = queue[front++];
    const x = index % width;
    const y = Math.floor(index / width);
    if (x > (protectedBoundary ? 1 : 0)) push(index - 1);
    if (x + 1 < width - (protectedBoundary ? 1 : 0)) push(index + 1);
    if (y > (protectedBoundary ? 1 : 0)) push(index - width);
    if (y + 1 < height - (protectedBoundary ? 1 : 0)) push(index + width);
  }
  if (protectedBoundary) {
    const extend = (index, neighbor) => {
      if (background[neighbor] && data[index * 4 + 3] >= 16 && colorDistance(data, index, color) <= limit) background[index] = 1;
    };
    for (let x = 1; x < width - 1; x++) {
      extend(x, width + x);
      extend((height - 1) * width + x, (height - 2) * width + x);
    }
    for (let y = 1; y < height - 1; y++) {
      extend(y * width, y * width + 1);
      extend(y * width + width - 1, y * width + width - 2);
    }
    extend(0, width + 1);
    extend(width - 1, width + width - 2);
    extend((height - 1) * width, (height - 2) * width + 1);
    extend(length - 1, (height - 2) * width + width - 2);
  }
  let removed = 0;
  for (let index = 0; index < length; index++) {
    if (!background[index]) continue;
    const offset = index * 4;
    data[offset] = 0;
    data[offset + 1] = 0;
    data[offset + 2] = 0;
    data[offset + 3] = 0;
    removed++;
  }
  return removed;
}

function normalizeTransparency(data) {
  for (let offset = 0; offset < data.length; offset += 4) {
    if (data[offset + 3] <= 127) {
      data[offset] = 0;
      data[offset + 1] = 0;
      data[offset + 2] = 0;
      data[offset + 3] = 0;
    } else {
      data[offset + 3] = 255;
    }
  }
}

async function makeCover(image, size = 72) {
  const source = new OffscreenCanvas(image.width, image.height);
  const sourceContext = source.getContext("2d");
  const cover = new OffscreenCanvas(size, size);
  const coverContext = cover.getContext("2d");
  if (!sourceContext || !coverContext) fail("无法生成 GIF 封面，请使用新版 Chrome 或 Edge。");
  sourceContext.putImageData(image, 0, 0);
  const scale = Math.min(size / image.width, size / image.height);
  const width = image.width * scale;
  const height = image.height * scale;
  coverContext.imageSmoothingEnabled = true;
  coverContext.imageSmoothingQuality = "high";
  coverContext.clearRect(0, 0, size, size);
  coverContext.drawImage(source, (size - width) / 2, (size - height) / 2, width, height);
  const blob = await cover.convertToBlob({ type: "image/png" });
  return new Uint8Array(await blob.arrayBuffer());
}

function loopCount(gif) {
  const extension = gif.frames.find((frame) => frame.application?.id?.startsWith("NETSCAPE"))?.application;
  const blocks = extension?.blocks;
  return blocks?.length >= 3 && blocks[0] === 1 ? blocks[1] | blocks[2] << 8 : -1;
}

async function processGif(buffer, tolerance, boundaryMode) {
  if (!buffer || buffer.byteLength > MAX_BYTES) fail("请选择不超过 20 MB 的 GIF 文件。");
  const bytes = new Uint8Array(buffer);
  const signature = new TextDecoder().decode(bytes.subarray(0, 6));
  if (!["GIF87a", "GIF89a"].includes(signature) || bytes[bytes.length - 1] !== 0x3b) fail("文件内容不是完整有效的 GIF。");
  const gif = parseGIF(buffer);
  const frames = gif.frames.filter((frame) => frame.image);
  const { width, height } = gif.lsd;
  if (!width || !height || width > 2048 || height > 2048) fail("GIF 宽高不能超过 2048 像素。");
  if (!frames.length || frames.length > 300) fail("GIF 需要包含 1 至 300 帧。");
  if (width * height * frames.length > MAX_PIXELS) fail("GIF 画面总量过大，请先缩小尺寸或减少帧数。");
  const delays = frames.map(delayOf);
  const duration = delays.reduce((sum, delay) => sum + delay, 0);
  if (duration > 30000) fail("暂时支持 30 秒以内的 GIF，请先截短动画。");
  const canvas = new OffscreenCanvas(width, height);
  const context = canvas.getContext("2d", { willReadFrequently: true });
  const patch = new OffscreenCanvas(1, 1);
  const patchContext = patch.getContext("2d");
  if (!context || !patchContext) fail("浏览器无法创建动画画布，请使用新版 Chrome 或 Edge。");
  const encoder = GIFEncoder();
  const repeat = loopCount(gif);
  const background = gif.gct?.[gif.lsd.backgroundColorIndex];
  function clearArea(dims, transparent) {
    context.clearRect(dims.left, dims.top, dims.width, dims.height);
    if (!transparent && background) {
      context.fillStyle = `rgb(${background.join(",")})`;
      context.fillRect(dims.left, dims.top, dims.width, dims.height);
    }
  }
  clearArea({ left: 0, top: 0, width, height }, frames[0].gce?.extras.transparentColorGiven);
  let previous;
  let restore;
  let removedPixels = 0;
  let coverBytes;
  for (let index = 0; index < frames.length; index++) {
    if (previous?.disposalType === 2) clearArea(previous.dims, previous.transparentIndex !== undefined);
    if (previous?.disposalType === 3 && restore) context.putImageData(restore, 0, 0);
    const frame = decompressFrame(frames[index], gif.gct, true);
    restore = frame.disposalType === 3 ? context.getImageData(0, 0, width, height) : null;
    patch.width = frame.dims.width;
    patch.height = frame.dims.height;
    patchContext.putImageData(new ImageData(frame.patch, patch.width, patch.height), 0, 0);
    context.drawImage(patch, frame.dims.left, frame.dims.top);
    const image = context.getImageData(0, 0, width, height);
    removedPixels += removeConnectedBackground(image, tolerance, boundaryMode);
    normalizeTransparency(image.data);
    if (index === 0) coverBytes = await makeCover(image);
    const palette = quantize(image.data, 256, { format: "rgba4444", oneBitAlpha: 127, clearAlpha: true });
    const indexed = applyPalette(image.data, palette, "rgba4444");
    const transparentIndex = palette.findIndex((color) => color[3] === 0);
    encoder.writeFrame(indexed, width, height, {
      palette,
      delay: delays[index],
      repeat: index === 0 ? repeat : undefined,
      transparent: transparentIndex >= 0,
      transparentIndex,
      dispose: transparentIndex >= 0 ? 2 : 1,
    });
    previous = frame;
    self.postMessage({ type: "progress", value: Math.round((index + 1) / frames.length * 95), message: `正在处理第 ${index + 1} / ${frames.length} 帧` });
  }
  encoder.finish();
  const output = encoder.bytes();
  if (output.byteLength > 100 * 1024 * 1024) fail("导出的 GIF 超过 100 MB，请先缩小尺寸或减少帧数。");
  self.postMessage({ type: "done", bytes: output, coverBytes, info: { width, height, frames: frames.length, duration, repeat, removedPixels } }, [output.buffer, coverBytes.buffer]);
}

self.onmessage = async ({ data }) => {
  try {
    const tolerance = Number(data.tolerance);
    if (!Number.isFinite(tolerance) || tolerance < 0 || tolerance > 100) fail("颜色容差无效，请重新设置。");
    const boundaryMode = data.boundaryMode === "standard" ? "standard" : "protect";
    await processGif(data.buffer, tolerance, boundaryMode);
  } catch (error) {
    self.postMessage({ type: "error", message: error instanceof Error ? error.message : "GIF 处理失败，请更换文件后重试。" });
  }
};
