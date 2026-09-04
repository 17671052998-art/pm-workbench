import { parseGIF, decompressFrame } from "gifuct-js";
import { deflate } from "pako";
import { MovieEntity } from "./svga-schema.js";

const MAX_BYTES = 20 * 1024 * 1024;
const MAX_PIXELS = 64 * 1024 * 1024;
const fail = (message) => { throw new Error(message); };
const delayOf = (frame) => {
  const delay = (frame.gce?.delay || 10) * 10;
  return delay < 20 ? 100 : delay;
};

function inspect(buffer) {
  if (!buffer || buffer.byteLength > MAX_BYTES) fail("请选择不超过 20 MB 的 GIF 文件。");
  const bytes = new Uint8Array(buffer);
  const signature = new TextDecoder().decode(bytes.subarray(0, 6));
  if (!["GIF87a", "GIF89a"].includes(signature) || bytes.length < 14) {
    fail("文件内容不是有效的 GIF，请重新选择。");
  }
  if (bytes[bytes.length - 1] !== 0x3b) fail("GIF 文件不完整，请重新导出后重试。");
  const gif = parseGIF(buffer);
  const frames = gif.frames.filter((frame) => frame.image);
  const { width, height } = gif.lsd;
  if (!width || !height || width > 2048 || height > 2048) fail("GIF 宽高不能超过 2048 像素，请先缩小尺寸。");
  if (!frames.length || frames.length > 300) fail("请选择包含 1 至 300 帧的 GIF。");
  let pixels = 0;
  for (const { image } of frames) {
    const d = image.descriptor;
    if (!d.width || !d.height || d.left + d.width > width || d.top + d.height > height) fail("GIF 帧尺寸异常，无法转换。");
    pixels += d.width * d.height;
    if (image.data.minCodeSize < 2 || image.data.minCodeSize > 8) fail("GIF 图像编码损坏，请更换文件。");
    if (!image.data.blocks.length || !(image.lct || gif.gct)?.length) fail("GIF 图像数据缺失，请更换文件。");
  }
  if (pixels > MAX_PIXELS || width * height * frames.length > MAX_PIXELS) {
    fail("动画画面过大，请先缩小 GIF 尺寸或减少帧数后重试。");
  }
  const duration = frames.reduce((sum, frame) => sum + delayOf(frame), 0);
  if (duration > 30000) fail("暂时支持 30 秒以内的 GIF，请先截短动画。");
  return { gif, frames, info: { width, height, frames: frames.length, duration } };
}

async function convert({ gif, frames, info }, options) {
  if (typeof OffscreenCanvas === "undefined") fail("当前浏览器不支持转换，请使用新版 Chrome 或 Edge。");
  const fps = Number(options.fps);
  const maxEdge = Number(options.maxEdge);
  if (![15, 20, 30, 60].includes(fps) || ![0, 240, 480, 720].includes(maxEdge)) fail("转换参数无效，请重新选择。");
  const scale = maxEdge ? Math.min(1, maxEdge / Math.max(info.width, info.height)) : 1;
  const width = Math.max(1, Math.round(info.width * scale));
  const height = Math.max(1, Math.round(info.height * scale));
  const count = Math.max(1, Math.round(info.duration * fps / 1000));
  const canvas = new OffscreenCanvas(info.width, info.height);
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const output = new OffscreenCanvas(width, height);
  const out = output.getContext("2d");
  const patch = new OffscreenCanvas(1, 1);
  const patchCtx = patch.getContext("2d");
  if (!ctx || !out || !patchCtx) fail("浏览器无法创建画布，请刷新或更换浏览器。");
  const movie = {
    version: "2.0",
    params: { viewBoxWidth: width, viewBoxHeight: height, fps, frames: count },
    images: {}, sprites: [],
  };
  const background = gif.gct?.[gif.lsd.backgroundColorIndex];
  function clearArea(dims, transparent) {
    ctx.clearRect(dims.left, dims.top, dims.width, dims.height);
    if (!transparent && background) {
      ctx.fillStyle = `rgb(${background.join(",")})`;
      ctx.fillRect(dims.left, dims.top, dims.width, dims.height);
    }
  }
  clearArea({ left: 0, top: 0, width: info.width, height: info.height }, frames[0].gce?.extras.transparentColorGiven);
  let previous;
  let restore;
  let elapsed = 0;
  let imageBytes = 0;
  for (let i = 0; i < frames.length; i++) {
    // GIF disposal applies after the previous frame's display interval, before the next patch.
    if (previous?.disposalType === 2) clearArea(previous.dims, previous.transparentIndex !== undefined);
    if (previous?.disposalType === 3 && restore) ctx.putImageData(restore, 0, 0);
    const frame = decompressFrame(frames[i], gif.gct, true);
    restore = frame.disposalType === 3 ? ctx.getImageData(0, 0, info.width, info.height) : null;
    patch.width = frame.dims.width;
    patch.height = frame.dims.height;
    patchCtx.putImageData(new ImageData(frame.patch, patch.width, patch.height), 0, 0);
    ctx.drawImage(patch, frame.dims.left, frame.dims.top);
    const start = Math.round(elapsed * fps / 1000);
    elapsed += delayOf(frames[i]);
    const end = i === frames.length - 1 ? count : Math.round(elapsed * fps / 1000);
    if (end > start) {
      out.clearRect(0, 0, width, height);
      out.drawImage(canvas, 0, 0, width, height);
      const png = new Uint8Array(await (await output.convertToBlob({ type: "image/png" })).arrayBuffer());
      imageBytes += png.length;
      if (imageBytes > 64 * 1024 * 1024) fail("转换文件过大，请选择更小的输出尺寸重试。");
      const key = `frame_${i}`;
      movie.images[key] = png;
      const visible = { alpha: 1, layout: { x: 0, y: 0, width, height }, transform: { a: 1, b: 0, c: 0, d: 1, tx: 0, ty: 0 } };
      movie.sprites.push({ imageKey: key, frames: Array.from({ length: count }, (_, t) => t >= start && t < end ? visible : { alpha: 0 }) });
    }
    previous = frame;
    self.postMessage({ type: "progress", value: Math.round((i + 1) / frames.length * 90), message: `正在处理第 ${i + 1} / ${frames.length} 帧` });
  }
  self.postMessage({ type: "progress", value: 95, message: "正在打包 SVGA 文件" });
  const error = MovieEntity.verify(movie);
  if (error) fail("动画编码失败，请更换文件后重试。");
  const bytes = deflate(MovieEntity.encode(MovieEntity.create(movie)).finish());
  self.postMessage({ type: "done", bytes, info: { width, height, fps, frames: count, duration: count / fps * 1000 } }, [bytes.buffer]);
}

self.onmessage = async ({ data }) => {
  try {
    const parsed = inspect(data.buffer);
    if (data.inspect) self.postMessage({ type: "info", info: parsed.info });
    else await convert(parsed, data.options);
  } catch (error) {
    self.postMessage({ type: "error", message: error instanceof Error ? error.message : "GIF 解析失败，请更换文件后重试。" });
  }
};
