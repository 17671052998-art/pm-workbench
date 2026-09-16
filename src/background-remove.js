const MAX_EDGE = 2048;
const MAX_BYTES = 20 * 1024 * 1024;

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
  let revision = 0;
  let disposed = false;
  let renderPending = false;

  const status = (message, error = false) => {
    $("bgStatus").textContent = message;
    $("bgStatus").classList.toggle("is-error", error);
  };
  const tolerance = () => Number($("bgTolerance").value);
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
    $("bgUndo").disabled = !history.length;
    $("bgReset").disabled = !original;
    $("bgDownload").disabled = !original;
    $("bgAuto").disabled = !original;
  };
  const applyMask = (mask, soften = false, backgroundColor = null) => {
    const selection = soften ? softenMask(mask, edited.width, edited.height) : mask;
    if (!selection.some((value) => value > 0)) return false;
    saveUndo();
    for (let i = 0; i < selection.length; i++) {
      if (!selection[i]) continue;
      const offset = i * 4 + 3;
      const remaining = 1 - selection[i] / 255;
      if (backgroundColor && remaining > 0.05 && remaining < 1) {
        for (let channel = 0; channel < 3; channel++) {
          edited.data[i * 4 + channel] = Math.max(0, Math.min(255, Math.round((edited.data[i * 4 + channel] - backgroundColor[channel] * (1 - remaining)) / remaining)));
        }
      }
      edited.data[offset] = Math.round(edited.data[offset] * remaining);
    }
    render();
    return true;
  };
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
    const mask = floodMask(original, borderSeeds(color), color, tolerance());
    status(applyMask(mask, true, color) ? "已移除与图片边缘连通的相近颜色背景，可继续手动修正。" : "没有找到可移除的背景，请调高容差或手动选区。", !mask.some(Boolean));
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
  const choose = async (file) => {
    if (!file) return;
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) { status("请选择 PNG、JPG 或 WebP 图片。", true); return; }
    if (file.size > MAX_BYTES) { status("图片超过 20 MB，请先压缩后重试。", true); return; }
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

  on($("bgFile"), "change", (event) => choose(event.target.files[0]));
  on($("bgChoose"), "click", () => $("bgFile").click());
  on($("bgReplace"), "click", () => $("bgFile").click());
  on($("bgDrop"), "dragover", (event) => { event.preventDefault(); $("bgDrop").classList.add("is-dragging"); });
  on($("bgDrop"), "dragleave", () => $("bgDrop").classList.remove("is-dragging"));
  on($("bgDrop"), "drop", (event) => { event.preventDefault(); $("bgDrop").classList.remove("is-dragging"); if (event.dataTransfer.files.length === 1) choose(event.dataTransfer.files[0]); else status("每次请选择一张图片。", true); });
  on($("bgAuto"), "click", autoRemove);
  on($("bgTolerance"), "input", () => { $("bgToleranceValue").textContent = tolerance(); });
  on($("bgBrushSize"), "input", () => { $("bgBrushSizeValue").textContent = $("bgBrushSize").value; });
  on($("bgPreviewBackground"), "change", () => { $("bgCanvasFrame").dataset.background = $("bgPreviewBackground").value; });
  root.querySelectorAll("[data-bg-mode]").forEach((button) => on(button, "click", () => {
    mode = button.dataset.bgMode;
    root.querySelectorAll("[data-bg-mode]").forEach((item) => { item.classList.toggle("active", item === button); item.setAttribute("aria-pressed", item === button ? "true" : "false"); });
    $("bgBrushControl").hidden = mode !== "erase" && mode !== "restore";
    $("bgCanvasFrame").dataset.mode = mode;
    status(mode === "wand" ? "点击图片中想要移除的连续背景区域。" : mode === "lasso" ? "沿目标区域拖出套索，松开后移除。" : mode === "erase" ? "拖动画笔擦除背景。" : "拖动画笔恢复误删的部分。");
  }));
  on($("bgOverlay"), "pointerdown", (event) => {
    if (!edited) return;
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
    const previous = history.pop();
    if (!previous || !edited) return;
    edited = new ImageData(previous, edited.width, edited.height);
    render();
    updateActions();
    status("已撤销上一步。");
  });
  on($("bgReset"), "click", () => {
    if (!original) return;
    saveUndo();
    edited = new ImageData(new Uint8ClampedArray(original.data), original.width, original.height);
    render();
    updateActions();
    status("已恢复原图。");
  });
  on($("bgDownload"), "click", () => {
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
  updateActions();
  return () => {
    disposed = true;
    revision++;
    if (downloadURL) URL.revokeObjectURL(downloadURL);
    original = null;
    edited = null;
    history = [];
  };
}
