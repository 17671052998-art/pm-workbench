import { parseBackgroundIntent } from "./background-intent.js";

const backgroundGifWorkerURL = new URL("./background-gif-worker.js", document.currentScript.src);
backgroundGifWorkerURL.search = "v=background-gif-4";
const MAX_EDGE = 2048;
const MAX_BYTES = 20 * 1024 * 1024;

function colorDistance(data, index, color) {
  const offset = index * 4;
  const red = data[offset] - color[0];
  const green = data[offset + 1] - color[1];
  const blue = data[offset + 2] - color[2];
  return red * red + green * green + blue * blue;
}

function dominantBorderColor(image, matches = () => true) {
  const { width, height, data } = image;
  const bins = new Map();
  const stride = Math.max(1, Math.floor(Math.min(width, height) / 48));
  const add = (x, y) => {
    const index = (y * width + x) * 4;
    if (data[index + 3] < 16 || !matches(y * width + x)) return;
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

function matchesNamedColor(data, index, key, tolerance) {
  const offset = index * 4;
  const red = data[offset] / 255;
  const green = data[offset + 1] / 255;
  const blue = data[offset + 2] / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const difference = max - min;
  const saturation = max ? difference / max : 0;
  if (key === "white") return max >= .92 - tolerance / 450 && saturation <= .09 + tolerance / 270;
  if (key === "black") return max <= .12 + tolerance / 330;
  if (key === "gray") return saturation <= .15 + tolerance / 450 && max > .18 && max < .84;
  if (saturation < .23 - tolerance / 800 || max < .18) return false;
  let hue = 0;
  if (difference) {
    if (max === red) hue = ((green - blue) / difference) % 6;
    else if (max === green) hue = (blue - red) / difference + 2;
    else hue = (red - green) / difference + 4;
    hue = (hue * 60 + 360) % 360;
  }
  if (key === "red") return hue < 18 || hue >= 345;
  if (key === "orange") return hue >= 18 && hue < 48;
  if (key === "yellow") return hue >= 48 && hue < 78;
  if (key === "green") return hue >= 78 && hue < 175;
  if (key === "blue") return hue >= 175 && hue < 255;
  if (key === "purple") return hue >= 255 && hue < 300;
  if (key === "pink") return hue >= 300 && hue < 345;
  return false;
}

function floodMask(image, seeds, color, tolerance) {
  const { width, height, data } = image;
  const length = width * height;
  const seen = new Uint8Array(length);
  const mask = new Uint8Array(length);
  const queue = new Uint32Array(length);
  const limit = (12 + Number(tolerance) * 2) ** 2;
  let front = 0;
  let back = 0;
  const push = (index) => {
    if (seen[index]) return;
    seen[index] = 1;
    if (data[index * 4 + 3] < 16 || colorDistance(data, index, color) > limit) return;
    mask[index] = 255;
    queue[back++] = index;
  };
  for (const seed of seeds) push(seed);
  while (front < back) {
    const index = queue[front++];
    const x = index % width;
    if (x > 0) push(index - 1);
    if (x + 1 < width) push(index + 1);
    if (index >= width) push(index - width);
    if (index < length - width) push(index + width);
  }
  return mask;
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

function protectedBackgroundMask(image, color, tolerance) {
  const { width, height, data } = image;
  if (width <= 2 || height <= 2) return floodMask(image, [0], color, tolerance);
  const length = width * height;
  const seen = new Uint8Array(length);
  const mask = new Uint8Array(length);
  const queue = new Uint32Array(length);
  const limit = (12 + Number(tolerance) * 2) ** 2;
  const barrier = contourGapBarrier(image, color, limit);
  let front = 0;
  let back = 0;
  const push = (index) => {
    if (seen[index]) return;
    seen[index] = 1;
    if (barrier[index] || data[index * 4 + 3] < 16 || colorDistance(data, index, color) > limit) return;
    mask[index] = 255;
    queue[back++] = index;
  };
  push(width + 1);
  push(width + width - 2);
  push((height - 2) * width + 1);
  push((height - 2) * width + width - 2);
  while (front < back) {
    const index = queue[front++];
    const x = index % width;
    const y = Math.floor(index / width);
    if (x > 1) push(index - 1);
    if (x + 1 < width - 1) push(index + 1);
    if (y > 1) push(index - width);
    if (y + 1 < height - 1) push(index + width);
  }
  const extend = (index, neighbor) => {
    if (mask[neighbor] && data[index * 4 + 3] >= 16 && colorDistance(data, index, color) <= limit) mask[index] = 255;
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
  return mask;
}

function softenMask(mask, width, height) {
  const soft = new Uint8Array(mask.length);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = y * width + x;
      if (mask[index]) { soft[index] = 255; continue; }
      const nearby = (x > 0 && mask[index - 1]) || (x + 1 < width && mask[index + 1]) || (y > 0 && mask[index - width]) || (y + 1 < height && mask[index + width]);
      if (!nearby) continue;
      let sum = 0;
      let count = 0;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
        sum += mask[ny * width + nx];
        count++;
      }
      soft[index] = Math.round(sum / count);
    }
  }
  return soft;
}

function insideRegion(x, y, width, height, region, fraction) {
  if (!region) return true;
  const nx = (x + .5) / width;
  const ny = (y + .5) / height;
  if (region === "left") return nx < fraction;
  if (region === "right") return nx > 1 - fraction;
  if (region === "top") return ny < fraction;
  if (region === "bottom") return ny > 1 - fraction;
  if (region === "top-left") return nx < fraction && ny < fraction;
  if (region === "top-right") return nx > 1 - fraction && ny < fraction;
  if (region === "bottom-left") return nx < fraction && ny > 1 - fraction;
  if (region === "bottom-right") return nx > 1 - fraction && ny > 1 - fraction;
  if (region === "border") return nx < fraction || nx > 1 - fraction || ny < fraction || ny > 1 - fraction;
  if (region === "center") return Math.abs(nx - .5) < fraction / 2 && Math.abs(ny - .5) < fraction / 2;
  return false;
}

function makeIntentMask(image, step, tolerance) {
  const { width, height, data } = image;
  const limit = (12 + tolerance * 2) ** 2;
  const matches = (index) => step.colorKey === "hex" ? colorDistance(data, index, step.color) <= limit : matchesNamedColor(data, index, step.colorKey, tolerance);
  const color = step.target === "background" ? dominantBorderColor(image) : step.borderOnly ? dominantBorderColor(image, matches) : step.color;
  if (step.target !== "region" && !color) return null;
  let mask;
  if (step.target === "region") {
    mask = new Uint8Array(width * height);
    mask.fill(255);
  } else if (step.target === "background" || step.borderOnly) {
    const seeds = [];
    const add = (index) => { if (colorDistance(data, index, color) <= limit && (step.target === "background" || matches(index))) seeds.push(index); };
    for (let x = 0; x < width; x++) { add(x); add((height - 1) * width + x); }
    for (let y = 1; y < height - 1; y++) { add(y * width); add(y * width + width - 1); }
    mask = floodMask(image, seeds, color, tolerance);
  } else {
    mask = new Uint8Array(width * height);
    for (let index = 0; index < mask.length; index++) {
      if (data[index * 4 + 3] >= 16 && matches(index)) mask[index] = 255;
    }
  }
  if (step.region) {
    for (let index = 0; index < mask.length; index++) {
      if (mask[index] && !insideRegion(index % width, Math.floor(index / width), width, height, step.region, step.fraction)) mask[index] = 0;
    }
  }
  return { mask, color: step.target === "background" || step.borderOnly || step.colorKey === "hex" ? color : null, soften: step.target !== "region" };
}

export function mountBackgroundTool(root, on) {
  const $ = (id) => root.querySelector(`#${id}`);
  const canvas = $("bgCanvas");
  const overlay = $("bgOverlay");
  const context = canvas.getContext("2d", { willReadFrequently: true });
  const overlayContext = overlay.getContext("2d", { willReadFrequently: true });
  let original = null;
  let edited = null;
  let history = [];
  let mode = "wand";
  let drawing = false;
  let points = [];
  let lastPoint = null;
  let downloadURL = null;
  let coverURL = null;
  let revision = 0;
  let disposed = false;
  let renderPending = false;
  let intentPlan = null;
  let animated = false;
  let gifFile = null;
  let gifWorker = null;
  let gifBusy = false;

  const status = (message, error = false) => {
    $("bgStatus").textContent = message;
    $("bgStatus").classList.toggle("is-error", error);
  };
  const tolerance = () => Number($("bgTolerance").value);
  const boundaryMode = () => $("bgBoundaryMode").value;
  const render = () => {
    if (edited && !disposed) context.putImageData(edited, 0, 0);
    renderPending = false;
  };
  const requestRender = () => {
    if (!renderPending) {
      renderPending = true;
      requestAnimationFrame(render);
    }
  };
  const clearOverlay = () => overlayContext.clearRect(0, 0, overlay.width, overlay.height);
  const saveUndo = () => {
    history.push(new Uint8ClampedArray(edited.data));
    if (history.length > 5) history.shift();
    $("bgUndo").disabled = false;
  };
  const updateActions = () => {
    if (animated) {
      $("bgUndo").disabled = true;
      $("bgReset").disabled = true;
      $("bgDownload").disabled = !downloadURL || gifBusy;
      $("bgDownloadCover").disabled = !coverURL || gifBusy;
      $("bgAuto").disabled = !gifFile || gifBusy;
      return;
    }
    $("bgUndo").disabled = !history.length;
    $("bgReset").disabled = !original;
    $("bgDownload").disabled = !original;
    $("bgDownloadCover").disabled = true;
    $("bgAuto").disabled = !original;
  };
  const stopGifWorker = () => {
    gifWorker?.terminate();
    gifWorker = null;
    gifBusy = false;
    $("bgTolerance").disabled = false;
    $("bgBoundaryMode").disabled = false;
  };
  const clearDownload = () => {
    if (downloadURL) URL.revokeObjectURL(downloadURL);
    if (coverURL) URL.revokeObjectURL(coverURL);
    downloadURL = null;
    coverURL = null;
  };
  const setAnimatedMode = (value) => {
    animated = value;
    $("bgIntentSection").hidden = value;
    $("bgManualControls").hidden = value;
    $("bgGifNotice").hidden = !value;
    canvas.hidden = value;
    overlay.hidden = value;
    $("bgGifPreview").hidden = true;
    if (!value) $("bgGifPreview").removeAttribute("src");
    $("bgAuto").textContent = value ? "重新处理所有帧" : "重新自动移除背景";
    $("bgDownload").textContent = value ? "下载透明 GIF" : "下载透明 PNG";
    $("bgDownloadCover").hidden = !value;
  };
  const applySelection = (mask, action = "remove", soften = false, backgroundColor = null, recordUndo = true, deferRender = false) => {
    const selection = soften ? softenMask(mask, edited.width, edited.height) : mask;
    let willChange = false;
    for (let i = 0; i < selection.length; i++) {
      if (!selection[i]) continue;
      const offset = i * 4 + 3;
      if (action === "remove" ? edited.data[offset] > 0 : edited.data[offset] < original.data[offset]) { willChange = true; break; }
    }
    if (!willChange) return false;
    if (recordUndo) saveUndo();
    for (let i = 0; i < selection.length; i++) {
      if (!selection[i]) continue;
      const offset = i * 4 + 3;
      const remaining = 1 - selection[i] / 255;
      if (action === "restore") {
        edited.data[offset] = Math.round(edited.data[offset] + (original.data[offset] - edited.data[offset]) * (1 - remaining));
        for (let channel = 0; channel < 3; channel++) edited.data[i * 4 + channel] = Math.round(edited.data[i * 4 + channel] * remaining + original.data[i * 4 + channel] * (1 - remaining));
      } else if (backgroundColor && remaining > 0.05 && remaining < 1) {
        for (let channel = 0; channel < 3; channel++) {
          edited.data[i * 4 + channel] = Math.max(0, Math.min(255, Math.round((edited.data[i * 4 + channel] - backgroundColor[channel] * (1 - remaining)) / remaining)));
        }
      }
      if (action === "remove") edited.data[offset] = Math.round(edited.data[offset] * remaining);
    }
    if (!deferRender) render();
    return true;
  };
  const applyMask = (mask, soften = false, backgroundColor = null) => applySelection(mask, "remove", soften, backgroundColor);
  const borderSeeds = (color) => {
    const seeds = [];
    const width = original.width;
    const height = original.height;
    const limit = (12 + tolerance() * 2) ** 2;
    const add = (index) => {
      if (colorDistance(original.data, index, color) <= limit) seeds.push(index);
    };
    for (let x = 0; x < width; x++) { add(x); add((height - 1) * width + x); }
    for (let y = 1; y < height - 1; y++) { add(y * width); add(y * width + width - 1); }
    return seeds;
  };
  const autoRemove = () => {
    if (!original) return;
    const color = dominantBorderColor(original);
    if (!color) { status("未检测到可处理的实色背景，请使用手动工具。", true); return; }
    const mask = boundaryMode() === "protect" ? protectedBackgroundMask(original, color, tolerance()) : floodMask(original, borderSeeds(color), color, tolerance());
    const done = applyMask(mask, true, color);
    const detail = boundaryMode() === "protect" ? "已开启边缘主体保护。" : "已使用普通边缘连通处理。";
    status(done ? `已移除相近颜色背景，${detail}可继续手动修正。` : "没有找到可移除的背景，请调高容差或手动选区。", !mask.some(Boolean));
    updateActions();
  };
  const position = (event) => {
    const box = canvas.getBoundingClientRect();
    return {
      x: Math.max(0, Math.min(canvas.width - 1, (event.clientX - box.left) * canvas.width / box.width)),
      y: Math.max(0, Math.min(canvas.height - 1, (event.clientY - box.top) * canvas.height / box.height)),
    };
  };
  const fitPreview = () => {
    if (!original) return;
    const width = Math.max(200, $("bgCanvasArea").clientWidth - 24);
    const scale = Math.min(width / original.width, 520 / original.height, Math.max(1, 360 / Math.max(original.width, original.height)));
    canvas.style.width = `${Math.round(original.width * scale)}px`;
    canvas.style.height = `${Math.round(original.height * scale)}px`;
  };
  const drawLasso = () => {
    clearOverlay();
    if (!points.length) return;
    overlayContext.strokeStyle = "#5d5fef";
    overlayContext.fillStyle = "rgba(93, 95, 239, .16)";
    overlayContext.lineWidth = Math.max(2, canvas.width / 300);
    overlayContext.setLineDash([overlayContext.lineWidth * 2, overlayContext.lineWidth * 2]);
    overlayContext.beginPath();
    overlayContext.moveTo(points[0].x, points[0].y);
    for (const point of points.slice(1)) overlayContext.lineTo(point.x, point.y);
    overlayContext.closePath();
    overlayContext.fill();
    overlayContext.stroke();
    overlayContext.setLineDash([]);
  };
  const eraseLasso = () => {
    if (points.length < 3) { clearOverlay(); return; }
    clearOverlay();
    overlayContext.fillStyle = "#fff";
    overlayContext.beginPath();
    overlayContext.moveTo(points[0].x, points[0].y);
    for (const point of points.slice(1)) overlayContext.lineTo(point.x, point.y);
    overlayContext.closePath();
    overlayContext.fill();
    const alpha = overlayContext.getImageData(0, 0, overlay.width, overlay.height).data;
    const mask = new Uint8Array(canvas.width * canvas.height);
    for (let i = 0; i < mask.length; i++) mask[i] = alpha[i * 4 + 3];
    clearOverlay();
    if (applyMask(mask)) { status("套索区域已移除，背景现为透明。"); updateActions(); }
  };
  const brushAt = (point) => {
    const radius = Number($("bgBrushSize").value) / 2;
    const minX = Math.max(0, Math.floor(point.x - radius - 1));
    const maxX = Math.min(edited.width - 1, Math.ceil(point.x + radius + 1));
    const minY = Math.max(0, Math.floor(point.y - radius - 1));
    const maxY = Math.min(edited.height - 1, Math.ceil(point.y + radius + 1));
    for (let y = minY; y <= maxY; y++) for (let x = minX; x <= maxX; x++) {
      const distance = Math.hypot(x + .5 - point.x, y + .5 - point.y);
      const coverage = Math.max(0, Math.min(1, radius + .5 - distance));
      if (!coverage) continue;
      const index = (y * edited.width + x) * 4 + 3;
      if (mode === "erase") edited.data[index] = Math.round(edited.data[index] * (1 - coverage));
      else edited.data[index] = Math.round(edited.data[index] + (original.data[index] - edited.data[index]) * coverage);
    }
    requestRender();
  };
  const brushLine = (from, to) => {
    const distance = Math.hypot(to.x - from.x, to.y - from.y);
    const step = Math.max(1, Number($("bgBrushSize").value) / 4);
    const count = Math.max(1, Math.ceil(distance / step));
    for (let i = 1; i <= count; i++) brushAt({ x: from.x + (to.x - from.x) * i / count, y: from.y + (to.y - from.y) * i / count });
  };
  const processAnimatedGif = async (file) => {
    stopGifWorker();
    clearDownload();
    const job = ++revision;
    gifFile = file;
    gifBusy = true;
    original = null;
    edited = null;
    history = [];
    clearIntentPlan();
    setAnimatedMode(true);
    $("bgCanvasArea").hidden = false;
    $("bgEmpty").hidden = true;
    $("bgControls").hidden = false;
    $("bgGifPreview").removeAttribute("src");
    $("bgFileName").textContent = `${file.name} · 正在处理全部帧`;
    $("bgGifInfo").textContent = "正在解析动画、移除每一帧背景并重新编码…";
    $("bgTolerance").disabled = true;
    $("bgBoundaryMode").disabled = true;
    $("bgFile").value = "";
    updateActions();
    status("正在读取 GIF 动画…");
    try {
      const buffer = await file.arrayBuffer();
      if (disposed || job !== revision) return;
      gifWorker = new Worker(backgroundGifWorkerURL);
      gifWorker.onerror = (event) => {
        event.preventDefault();
        if (disposed || job !== revision) return;
        stopGifWorker();
        updateActions();
        status("GIF 处理工具加载失败，请刷新页面或使用新版 Chrome / Edge。", true);
      };
      gifWorker.onmessage = ({ data }) => {
        if (disposed || job !== revision) return;
        if (data.type === "progress") {
          status(`${data.message} · ${data.value}%`);
          return;
        }
        if (data.type === "error") {
          stopGifWorker();
          updateActions();
          status(`无法处理 GIF：${data.message}`, true);
          return;
        }
        stopGifWorker();
        const blob = new Blob([data.bytes], { type: "image/gif" });
        downloadURL = URL.createObjectURL(blob);
        coverURL = URL.createObjectURL(new Blob([data.coverBytes], { type: "image/png" }));
        $("bgGifPreview").src = downloadURL;
        $("bgGifPreview").hidden = false;
        const { width, height, frames, duration, repeat, removedPixels } = data.info;
        const loop = repeat === 0 ? "无限循环" : repeat < 0 ? "播放一次" : `循环参数 ${repeat}`;
        $("bgFileName").textContent = `${file.name} · ${width} × ${height} px · ${frames} 帧`;
        $("bgGifInfo").textContent = `${frames} 帧 · ${(duration / 1000).toFixed(2)} 秒 · ${loop} · 已透明化 ${removedPixels.toLocaleString()} 个帧像素`;
        updateActions();
        status(removedPixels ? "GIF 全部帧处理完成，可预览并下载透明动画。" : "未检测到可移除的边缘背景，已保留原动画。", !removedPixels);
      };
      gifWorker.postMessage({ buffer, tolerance: tolerance(), boundaryMode: boundaryMode() }, [buffer]);
    } catch {
      if (disposed || job !== revision) return;
      stopGifWorker();
      updateActions();
      status("GIF 文件无法读取，请重新选择。", true);
    }
  };
  const choose = async (file) => {
    if (!file) return;
    const isGif = file.type === "image/gif" || /\.gif$/i.test(file.name);
    if (!["image/png", "image/jpeg", "image/webp", "image/gif"].includes(file.type) && !isGif) { status("请选择 PNG、JPG、WebP 或 GIF 文件。", true); return; }
    if (file.size > MAX_BYTES) { status("图片超过 20 MB，请先压缩后重试。", true); return; }
    if (isGif) return processAnimatedGif(file);
    stopGifWorker();
    clearDownload();
    gifFile = null;
    setAnimatedMode(false);
    const job = ++revision;
    status("正在读取图片…");
    let bitmap;
    try {
      bitmap = await createImageBitmap(file);
      if (disposed || job !== revision) return;
      if (Math.max(bitmap.width, bitmap.height) > MAX_EDGE) { status("图片最长边不能超过 2048 px，请先缩小尺寸。", true); return; }
      canvas.width = overlay.width = bitmap.width;
      canvas.height = overlay.height = bitmap.height;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(bitmap, 0, 0);
      original = context.getImageData(0, 0, canvas.width, canvas.height);
      edited = new ImageData(new Uint8ClampedArray(original.data), original.width, original.height);
      history = [];
      clearIntentPlan();
      $("bgCanvasArea").hidden = false;
      $("bgEmpty").hidden = true;
      $("bgControls").hidden = false;
      $("bgFileName").textContent = `${file.name} · ${bitmap.width} × ${bitmap.height} px`;
      fitPreview();
      $("bgFile").value = "";
      clearOverlay();
      updateActions();
      autoRemove();
    } catch {
      if (!disposed && job === revision) status("图片无法读取，请更换文件后重试。", true);
    } finally {
      bitmap?.close();
    }
  };

  function clearIntentPlan() {
    intentPlan = null;
    $("bgIntentPlan").hidden = true;
    $("bgExecuteIntent").disabled = false;
    $("bgExecuteIntent").textContent = "按计划执行";
    $("bgIntentError").hidden = true;
    $("bgIntentError").textContent = "";
    clearOverlay();
  }

  const drawIntentPreview = (steps) => {
    const preview = overlayContext.createImageData(overlay.width, overlay.height);
    for (const { step, selection } of steps) {
      if (!selection) continue;
      for (let i = 0; i < selection.mask.length; i++) {
        if (!selection.mask[i]) continue;
        const offset = i * 4;
        const restore = step.action === "restore";
        preview.data[offset] = restore ? 42 : 93;
        preview.data[offset + 1] = restore ? 184 : 95;
        preview.data[offset + 2] = restore ? 132 : 239;
        preview.data[offset + 3] = 90;
      }
    }
    overlayContext.putImageData(preview, 0, 0);
  };

  const analyzeIntent = () => {
    clearIntentPlan();
    if (!original) {
      $("bgIntentError").textContent = "请先上传图片。";
      $("bgIntentError").hidden = false;
      return;
    }
    const parsed = parseBackgroundIntent($("bgIntentInput").value);
    if (parsed.error) {
      $("bgIntentError").textContent = parsed.error;
      $("bgIntentError").hidden = false;
      return;
    }
    intentPlan = parsed.steps.map((step) => ({ step, selection: makeIntentMask(original, step, tolerance()) }));
    const list = $("bgIntentSteps");
    list.replaceChildren();
    for (const { step, selection } of intentPlan) {
      const item = document.createElement("li");
      const affected = selection ? selection.mask.reduce((count, value) => count + (value > 0 ? 1 : 0), 0) : 0;
      const percent = (affected / (original.width * original.height) * 100).toFixed(1);
      item.textContent = `${step.label} · 预计覆盖 ${percent}%`;
      list.append(item);
    }
    $("bgIntentWarning").hidden = !parsed.warning;
    $("bgIntentWarning").textContent = parsed.warning || "";
    $("bgIntentPlan").hidden = false;
    drawIntentPreview(intentPlan);
    status(`已识别 ${parsed.steps.length} 个处理步骤，请检查计划后执行。`);
  };

  const executeIntent = () => {
    if (!original || !intentPlan) return;
    let changed = false;
    for (const { step, selection } of intentPlan) {
      if (!selection) continue;
      const result = applySelection(selection.mask, step.action, selection.soften, selection.color, !changed, true);
      changed = changed || result;
    }
    if (changed) {
      render();
      clearOverlay();
      updateActions();
      status(`已执行 ${intentPlan.length} 个文字指令步骤，可用撤销或画笔调整。`);
      $("bgExecuteIntent").disabled = true;
      $("bgExecuteIntent").textContent = "已执行";
      intentPlan = null;
    } else {
      status("指令没有选中可处理的像素，请调整描述或颜色容差。", true);
    }
  };

  on($("bgFile"), "change", (event) => choose(event.target.files[0]));
  on($("bgChoose"), "click", () => $("bgFile").click());
  on($("bgReplace"), "click", () => $("bgFile").click());
  on($("bgDrop"), "dragover", (event) => { event.preventDefault(); $("bgDrop").classList.add("is-dragging"); });
  on($("bgDrop"), "dragleave", () => $("bgDrop").classList.remove("is-dragging"));
  on($("bgDrop"), "drop", (event) => { event.preventDefault(); $("bgDrop").classList.remove("is-dragging"); if (event.dataTransfer.files.length === 1) choose(event.dataTransfer.files[0]); else status("每次请选择一张图片。", true); });
  on($("bgAuto"), "click", () => {
    if (animated) {
      if (gifFile) processAnimatedGif(gifFile);
      return;
    }
    clearIntentPlan();
    autoRemove();
  });
  on($("bgAnalyzeIntent"), "click", analyzeIntent);
  on($("bgExecuteIntent"), "click", executeIntent);
  on($("bgIntentInput"), "input", clearIntentPlan);
  root.querySelectorAll("[data-bg-example]").forEach((button) => on(button, "click", () => { $("bgIntentInput").value = button.dataset.bgExample; analyzeIntent(); }));
  on($("bgTolerance"), "input", () => {
    $("bgToleranceValue").textContent = tolerance();
    clearIntentPlan();
    if (!animated || gifBusy) return;
    clearDownload();
    $("bgGifPreview").removeAttribute("src");
    $("bgGifPreview").hidden = true;
    updateActions();
    status("颜色容差已更新，请点击“重新处理所有帧”。");
  });
  on($("bgBoundaryMode"), "change", () => {
    clearIntentPlan();
    if (animated) {
      clearDownload();
      $("bgGifPreview").removeAttribute("src");
      $("bgGifPreview").hidden = true;
      updateActions();
      status("主体保护方式已更新，请点击“重新处理所有帧”。");
      return;
    }
    if (original) status("主体保护方式已更新，请点击“重新自动移除背景”。");
  });
  on($("bgBrushSize"), "input", () => { $("bgBrushSizeValue").textContent = $("bgBrushSize").value; });
  on($("bgPreviewBackground"), "change", () => { $("bgCanvasFrame").dataset.background = $("bgPreviewBackground").value; });
  root.querySelectorAll("[data-bg-mode]").forEach((button) => on(button, "click", () => {
    clearIntentPlan();
    mode = button.dataset.bgMode;
    root.querySelectorAll("[data-bg-mode]").forEach((item) => { item.classList.toggle("active", item === button); item.setAttribute("aria-pressed", item === button ? "true" : "false"); });
    $("bgBrushControl").hidden = mode !== "erase" && mode !== "restore";
    $("bgCanvasFrame").dataset.mode = mode;
    status(mode === "wand" ? "点击图片中想要移除的连续背景区域。" : mode === "lasso" ? "沿目标区域拖出套索，松开后移除。" : mode === "erase" ? "拖动画笔擦除背景。" : "拖动画笔恢复误删的部分。");
  }));
  on($("bgOverlay"), "pointerdown", (event) => {
    if (!edited) return;
    clearIntentPlan();
    event.preventDefault();
    const point = position(event);
    if (mode === "wand") {
      const index = Math.floor(point.y) * original.width + Math.floor(point.x);
      const offset = index * 4;
      const color = [original.data[offset], original.data[offset + 1], original.data[offset + 2]];
      const mask = floodMask(original, [index], color, tolerance());
      if (applyMask(mask, true, color)) { status("相近颜色的连续区域已移除。"); updateActions(); }
      return;
    }
    drawing = true;
    overlay.setPointerCapture(event.pointerId);
    points = [point];
    lastPoint = point;
    if (mode === "lasso") drawLasso();
    else { saveUndo(); updateActions(); brushAt(point); }
  });
  on($("bgOverlay"), "pointermove", (event) => {
    if (!drawing) return;
    const point = position(event);
    if (mode === "lasso") { points.push(point); drawLasso(); }
    else brushLine(lastPoint, point);
    lastPoint = point;
  });
  const finishStroke = () => {
    if (!drawing) return;
    drawing = false;
    if (mode === "lasso") eraseLasso();
    else { render(); status(mode === "erase" ? "已擦除选中区域。" : "已恢复选中区域。"); }
    points = [];
  };
  on($("bgOverlay"), "pointerup", finishStroke);
  on($("bgOverlay"), "pointercancel", finishStroke);
  on(window, "resize", fitPreview);
  on($("bgUndo"), "click", () => {
    clearIntentPlan();
    const previous = history.pop();
    if (!previous || !edited) return;
    edited = new ImageData(previous, edited.width, edited.height);
    render();
    updateActions();
    status("已撤销上一步。");
  });
  on($("bgReset"), "click", () => {
    if (!original) return;
    clearIntentPlan();
    saveUndo();
    edited = new ImageData(new Uint8ClampedArray(original.data), original.width, original.height);
    render();
    updateActions();
    status("已恢复原图。");
  });
  on($("bgDownload"), "click", () => {
    if (animated) {
      if (!downloadURL || !gifFile) return;
      const link = document.createElement("a");
      link.href = downloadURL;
      link.download = `${gifFile.name.replace(/\.gif$/i, "") || "animation"}-transparent.gif`;
      link.click();
      status("透明 GIF 已下载，动画帧与播放节奏已保留。");
      return;
    }
    if (!edited) return;
    canvas.toBlob((blob) => {
      if (!blob || disposed) { status("PNG 导出失败，请重试。", true); return; }
      if (downloadURL) URL.revokeObjectURL(downloadURL);
      downloadURL = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadURL;
      link.download = `${($("bgFileName").textContent || "image").split(" · ")[0].replace(/\.(png|jpe?g|webp)$/i, "")}-transparent.png`;
      link.click();
      status("透明 PNG 已下载。");
    }, "image/png");
  });
  on($("bgDownloadCover"), "click", () => {
    if (!animated || !coverURL || !gifFile) return;
    const link = document.createElement("a");
    link.href = coverURL;
    link.download = `${gifFile.name.replace(/\.gif$/i, "") || "animation"}-cover-72x72.png`;
    link.click();
    status("第一帧封面已以 72 × 72 透明 PNG 下载。");
  });
  updateActions();
  return () => {
    disposed = true;
    revision++;
    stopGifWorker();
    clearDownload();
    original = null;
    edited = null;
    gifFile = null;
    history = [];
  };
}
