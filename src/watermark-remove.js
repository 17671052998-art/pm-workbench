import { MAX_WATERMARK_PIXELS } from "./watermark-core.mjs";

const workerURL = new URL("./watermark-worker.js", document.currentScript.src);
workerURL.search = "v=watermark-1";

export function renderWatermarkWorkspace() {
  return `<section id="wmWorkspace" class="panel tool-workspace" aria-labelledby="wmTitle" hidden>
    <header class="panel-head"><div class="tool-workspace-title"><button id="wmBack" class="tool-back" type="button" aria-label="返回工具箱">←</button><div><h2 id="wmTitle" tabindex="-1">去除文字水印</h2><p>识别多处疑似文字水印，检查选区后批量修复。</p></div></div><span class="doc-tag">本地图片处理</span></header>
    <div class="tool-columns wm-columns">
      <div class="tool-source">
        <h3>1. 上传与预览</h3>
        <input id="wmFile" class="tool-file-input" type="file" accept="image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp" aria-label="选择要去水印的图片" />
        <button id="wmDrop" class="tool-drop" type="button"><svg aria-hidden="true"><use href="#i-upload"></use></svg><strong>点击选择或拖入图片</strong><span>PNG、JPG、WebP · 最大 40 MB / 1200 万像素</span></button>
        <div id="wmPreview" hidden>
          <p id="wmFilename" class="tool-filename"></p>
          <div class="wm-preview-toolbar"><label>查看<select id="wmView"><option value="original">原图与选区</option><option id="wmResultOption" value="result" disabled>处理结果</option></select></label><label>缩放<select id="wmZoom"><option value="1">适应宽度</option><option value="1.5">150%</option><option value="2">200%</option><option value="3">300%</option></select></label><label><input id="wmShowRegions" type="checkbox" checked /> 显示选区</label></div>
          <div id="wmStage" class="wm-stage"><div id="wmFrame" class="wm-frame"><canvas id="wmCanvas" aria-label="去水印图片预览"></canvas><canvas id="wmOverlay" aria-label="在图片上拖动框选水印"></canvas></div></div>
          <div class="tool-actions"><button id="wmReplace" class="btn secondary" type="button">更换图片</button><button id="wmManual" class="btn secondary" type="button" aria-pressed="false">框选水印</button><button id="wmUndo" class="btn secondary" type="button" disabled>恢复原图预览</button></div>
          <p class="tool-hint">选择“框选水印”后在图片上拖动；可取消误识别区域的勾选。每次均从原图修复，不累积损伤。</p>
        </div>
        <p id="wmStatus" class="tool-status" role="status" aria-live="polite">图片只在本机处理，不上传服务器，不调用付费 AI。</p>
      </div>
      <div class="tool-settings">
        <h3>2. 识别与修复</h3>
        <p class="tool-output-hint">适合纯色底、近似纯色底上的半透明重复文字，包括示例中的斜排灰色水印。不是通用 OCR，不能保证识别任意水印文字。</p>
        <label class="form-label" for="wmStrength">识别强度 <strong id="wmStrengthValue">55</strong><input id="wmStrength" class="bg-range" type="range" min="15" max="100" value="55" /></label>
        <label class="form-label" for="wmDirection">水印颜色<select id="wmDirection"><option value="auto">自动：浅色或深色水印</option><option value="light">比背景浅</option><option value="dark">比背景深</option></select></label>
        <label class="wm-protection"><input id="wmProtect" type="checkbox" checked /> 保护高对比正文（推荐）</label>
        <div class="tool-actions"><button id="wmAnalyze" class="btn secondary" type="button" disabled>重新识别水印</button><button id="wmCancel" class="btn secondary" type="button" hidden>取消处理</button></div>
        <p class="tool-hint">上传后自动识别。调整设置需重新识别，会重置现有选区；强度过高可能选中原有图形。</p>
        <section class="wm-regions" aria-labelledby="wmRegionsTitle"><div class="wm-region-heading"><h4 id="wmRegionsTitle">待处理区域 <span id="wmCount">0 / 0</span></h4><div><button id="wmAll" type="button" disabled>全选</button><button id="wmNone" type="button" disabled>全不选</button></div></div><div id="wmRegionList" class="wm-region-list"><p>上传图片后显示识别区域，也可以手动补充。</p></div></section>
        <details class="wm-coordinates"><summary>精确添加手动选区</summary><div class="wm-coordinate-grid">${[["X", "wmX", 0], ["Y", "wmY", 0], ["宽度", "wmWidth", 40], ["高度", "wmHeight", 20]].map(([label, id, value]) => `<label for="${id}">${label}<input id="${id}" type="number" min="${id === "wmX" || id === "wmY" ? 0 : 1}" value="${value}" /></label>`).join("")}</div><button id="wmAddRect" class="btn secondary" type="button" disabled>添加选区</button></details>
        <button id="wmRepair" class="btn primary wm-full-action" type="button" disabled>一键去除已选水印</button>
        <a id="wmDownload" class="btn secondary wm-full-action" hidden>下载处理后的 PNG</a>
        <p class="tool-hint">会填补选中区域，不会让其变透明。照片、纹理或覆盖正文的水印无法保证无痕；请对比原图检查后再使用。</p>
      </div>
    </div>
  </section>`;
}

export function mountWatermarkWorkspace(root, on) {
  const $ = (id) => root.querySelector(`#${id}`);
  let source = null, result = null, filename = "", regions = [], selected = new Set(), worker = null, revision = 0, timer, busy = false, ready = false, disposed = false, url = null, drag = null, manual = false, manualId = 0;
  const canvas = $("wmCanvas"), overlay = $("wmOverlay");
  const status = (message, error = false) => { $("wmStatus").textContent = message; $("wmStatus").classList.toggle("is-error", error); };
  function stop() { worker?.terminate(); worker = null; ready = false; clearTimeout(timer); revision++; }
  function controls() {
    for (const id of ["wmStrength", "wmDirection", "wmProtect", "wmReplace"]) $(id).disabled = busy;
    $("wmAnalyze").disabled = !source || busy;
    $("wmRepair").disabled = !source || !ready || busy || !selected.size;
    $("wmManual").disabled = $("wmAddRect").disabled = !source || !ready || busy;
    $("wmAll").disabled = $("wmNone").disabled = !regions.length || busy;
    $("wmUndo").disabled = !result || busy;
    $("wmCancel").hidden = !busy;
    $("wmRepair").textContent = busy ? "处理中…" : `一键去除已选水印${selected.size ? `（${selected.size} 处）` : ""}`;
    $("wmCount").textContent = `${selected.size} / ${regions.length}`;
    $("wmRegionList").querySelectorAll("input,button").forEach((element) => { element.disabled = busy; });
  }
  function clearResult() {
    result = null;
    if (url) URL.revokeObjectURL(url);
    url = null; $("wmDownload").hidden = true; $("wmDownload").removeAttribute("href");
    $("wmView").value = "original"; $("wmResultOption").disabled = true;
    $("wmShowRegions").checked = true;
  }
  function draw() {
    if (!source || $("wmWorkspace").hidden) return;
    canvas.getContext("2d").putImageData($("wmView").value === "result" && result ? result : source, 0, 0);
    $("wmFrame").style.width = `${Math.min(source.width, Math.max(80, $("wmStage").clientWidth - 24)) * Number($("wmZoom").value)}px`;
    overlay.style.cursor = manual ? "crosshair" : "default";
    const ctx = overlay.getContext("2d"); ctx.clearRect(0, 0, overlay.width, overlay.height);
    if (!$("wmShowRegions").checked && !drag) return;
    const scale = source.width / Math.max(1, overlay.getBoundingClientRect().width);
    const box = (region, label, active) => {
      ctx.strokeStyle = active ? "#ee4565" : "#68758d"; ctx.fillStyle = active ? "rgba(238,69,101,.13)" : "rgba(104,117,141,.06)";
      ctx.lineWidth = Math.max(1, 1.5 * scale); ctx.fillRect(region.x, region.y, region.width, region.height); ctx.strokeRect(region.x, region.y, region.width, region.height);
      ctx.font = `${Math.max(11, 12 * scale)}px sans-serif`; ctx.fillStyle = active ? "#d32248" : "#46536d"; ctx.fillText(label, region.x + 2 * scale, Math.max(12 * scale, region.y - 3 * scale));
    };
    if ($("wmShowRegions").checked) regions.forEach((region, i) => box(region, String(i + 1), selected.has(String(region.id))));
    if (drag) box(rect(drag.start, drag.end), "框选", true);
  }
  function renderRegions() {
    const list = $("wmRegionList"); list.replaceChildren();
    if (!regions.length) { const empty = document.createElement("p"); empty.textContent = source ? "未发现可靠区域，可降低/提高强度重新识别，或手动框选水印。" : "上传图片后显示识别区域，也可以手动补充。"; list.append(empty); }
    regions.forEach((region, index) => {
      const row = document.createElement("div"), label = document.createElement("label"), input = document.createElement("input"), text = document.createElement("span");
      row.className = "wm-region"; input.type = "checkbox"; input.checked = selected.has(String(region.id)); input.dataset.wmRegion = region.id;
      text.textContent = `${region.manual ? "手动选区" : "疑似水印"} ${index + 1} · ${region.width} × ${region.height} px`;
      label.append(input, text); row.append(label);
      if (region.manual) { const remove = document.createElement("button"); remove.type = "button"; remove.dataset.wmRemove = region.id; remove.textContent = "移除"; remove.setAttribute("aria-label", `移除手动选区 ${index + 1}`); row.append(remove); }
      list.append(row);
    });
    controls(); draw();
  }
  function analyze() {
    if (!source || busy) return;
    stop(); clearResult(); regions = []; selected.clear(); busy = true; renderRegions(); status("正在本地查找低对比、文字状水印…");
    const current = revision;
    worker = new Worker(workerURL);
    timer = setTimeout(() => { if (current !== revision) return; stop(); busy = false; controls(); status("识别超时，请裁小图片后重试。", true); }, 60000);
    worker.onerror = () => { if (current !== revision || disposed) return; stop(); busy = false; controls(); status("图片处理程序加载失败，请刷新页面后重试。", true); };
    worker.onmessage = async ({ data }) => {
      if (disposed || current !== revision) return;
      clearTimeout(timer);
      if (data.type === "error") { busy = false; controls(); status(data.message, true); return; }
      if (data.type === "ready") {
        ready = true; busy = false; regions = data.regions; selected = new Set(regions.map((region) => String(region.id))); renderRegions();
        status(regions.length ? `找到 ${regions.length} 处疑似区域。请检查红框，确认后可一键去除；正文不要勾选。` : "未发现可靠的文字水印区域，可以手动框选后修复。");
      } else if (data.type === "done") {
        const image = new ImageData(new Uint8ClampedArray(data.data), data.width, data.height);
        const output = document.createElement("canvas"); output.width = data.width; output.height = data.height; output.getContext("2d").putImageData(image, 0, 0);
        const blob = await new Promise((resolve) => output.toBlob(resolve, "image/png"));
        if (disposed || current !== revision) return;
        if (!blob) { busy = false; controls(); status("PNG 导出失败，请重试。", true); return; }
        result = image; url = URL.createObjectURL(blob); $("wmDownload").href = url; $("wmDownload").download = `${filename.replace(/\.[^.]+$/, "")}-去水印.png`; $("wmDownload").hidden = false;
        $("wmResultOption").disabled = false; $("wmView").value = "result"; $("wmShowRegions").checked = false;
        busy = false; controls(); draw(); status(`已修复 ${selected.size} 处选区，处理 ${data.pixels.toLocaleString()} 个像素。可切换原图对比并下载 PNG。`);
      }
    };
    const buffer = source.data.slice().buffer;
    worker.postMessage({ type: "analyze", buffer, width: source.width, height: source.height, options: { strength: Number($("wmStrength").value), direction: $("wmDirection").value, protectText: $("wmProtect").checked } }, [buffer]);
  }
  async function choose(file) {
    if (!file || disposed) return;
    stop(); clearResult(); source = null; regions = []; selected.clear(); busy = false; manual = false; drag = null;
    $("wmManual").setAttribute("aria-pressed", "false"); $("wmPreview").hidden = true; $("wmDrop").hidden = false; $("wmFile").value = ""; renderRegions();
    if (!file.size || file.size > 40 * 1024 * 1024) return status("请选择非空、40 MB 以内的 PNG、JPG 或 WebP 图片。", true);
    if (!/\.(png|jpe?g|webp)$/i.test(file.name) || file.type && !["image/png", "image/jpeg", "image/webp"].includes(file.type)) return status("暂时仅支持静态 PNG、JPG 和 WebP；GIF 请先导出需要处理的帧。", true);
    const current = revision;
    busy = true; controls(); status("正在读取图片…");
    let bitmap;
    try {
      bitmap = await createImageBitmap(file);
      if (disposed || current !== revision) return;
      if (bitmap.width * bitmap.height > MAX_WATERMARK_PIXELS || bitmap.width > 8192 || bitmap.height > 8192) throw new Error("图片超过 1200 万像素或最长边 8192 px，请裁小后重试。");
      canvas.width = overlay.width = bitmap.width; canvas.height = overlay.height = bitmap.height;
      canvas.getContext("2d").drawImage(bitmap, 0, 0); source = canvas.getContext("2d").getImageData(0, 0, bitmap.width, bitmap.height);
      filename = file.name; $("wmFilename").textContent = `${file.name} · ${bitmap.width} × ${bitmap.height} px`;
      $("wmWidth").value = Math.min(40, bitmap.width); $("wmHeight").value = Math.min(20, bitmap.height);
      $("wmPreview").hidden = false; $("wmDrop").hidden = true; $("wmShowRegions").checked = true; $("wmZoom").value = "1";
      busy = false; draw(); analyze();
    } catch (error) { if (disposed || current !== revision) return; busy = false; controls(); status(error.message === "The source image could not be decoded." ? "无法读取图片，请确认文件没有损坏。" : `无法读取图片：${error.message}`, true); }
    finally { bitmap?.close(); }
  }
  const point = (event) => { const bounds = overlay.getBoundingClientRect(); return { x: Math.max(0, Math.min(source.width, (event.clientX - bounds.left) * source.width / bounds.width)), y: Math.max(0, Math.min(source.height, (event.clientY - bounds.top) * source.height / bounds.height)) }; };
  const rect = (a, b) => ({ x: Math.floor(Math.min(a.x, b.x)), y: Math.floor(Math.min(a.y, b.y)), width: Math.ceil(Math.abs(a.x - b.x)), height: Math.ceil(Math.abs(a.y - b.y)) });
  function addRect(box) {
    if (!ready || busy || !source) return;
    const { x, y, width, height } = box;
    if (![x, y, width, height].every(Number.isFinite) || x < 0 || y < 0 || width < 2 || height < 2 || x + width > source.width || y + height > source.height) return status("选区至少 2 × 2 px，且必须位于图片范围内。", true);
    clearResult(); const id = `manual-${++manualId}`; regions.push({ id, ...box, manual: true }); selected.add(id); $("wmShowRegions").checked = true; renderRegions(); status("手动选区已添加。请确认没有覆盖正文，再点击一键去除。");
  }
  function cancel() { if (!busy) return; stop(); busy = false; controls(); status("已取消处理。请点击重新识别，再继续修复。"); }
  on($("wmFile"), "change", (event) => choose(event.target.files[0]));
  for (const id of ["wmDrop", "wmReplace"]) on($(id), "click", () => $("wmFile").click());
  on($("wmWorkspace"), "dragover", (event) => { event.preventDefault(); $("wmDrop").classList.add("is-dragging"); });
  on($("wmWorkspace"), "dragleave", (event) => { if (!$("wmWorkspace").contains(event.relatedTarget)) $("wmDrop").classList.remove("is-dragging"); });
  on($("wmWorkspace"), "drop", (event) => { event.preventDefault(); $("wmDrop").classList.remove("is-dragging"); if (event.dataTransfer.files.length !== 1) return status("每次请选择一张图片。", true); choose(event.dataTransfer.files[0]); });
  on($("wmAnalyze"), "click", analyze);
  on($("wmCancel"), "click", cancel);
  for (const id of ["wmStrength", "wmDirection", "wmProtect"]) on($(id), "change", () => { stop(); clearResult(); regions = []; selected.clear(); $("wmStrengthValue").textContent = $("wmStrength").value; renderRegions(); if (source) status("设置已更改，请重新识别水印。现有选区已清空。"); });
  on($("wmStrength"), "input", () => { $("wmStrengthValue").textContent = $("wmStrength").value; });
  on($("wmRegionList"), "change", (event) => { const id = event.target.dataset.wmRegion; if (!id || busy) return; clearResult(); if (event.target.checked) selected.add(id); else selected.delete(id); controls(); draw(); });
  on($("wmRegionList"), "click", (event) => { const id = event.target.dataset.wmRemove; if (!id || busy) return; clearResult(); regions = regions.filter((region) => String(region.id) !== id); selected.delete(id); renderRegions(); });
  on($("wmAll"), "click", () => { clearResult(); selected = new Set(regions.map((region) => String(region.id))); renderRegions(); });
  on($("wmNone"), "click", () => { clearResult(); selected.clear(); renderRegions(); });
  on($("wmManual"), "click", () => { manual = !manual; $("wmManual").setAttribute("aria-pressed", String(manual)); draw(); if (manual) status("在图片上拖动框选水印，松开即可添加选区。"); });
  on($("wmAddRect"), "click", () => addRect({ x: Number($("wmX").value), y: Number($("wmY").value), width: Number($("wmWidth").value), height: Number($("wmHeight").value) }));
  on(overlay, "pointerdown", (event) => { if (!manual || !source || !ready || busy || event.button !== 0) return; event.preventDefault(); drag = { start: point(event), end: point(event), pointer: event.pointerId }; overlay.setPointerCapture(event.pointerId); draw(); });
  on(overlay, "pointermove", (event) => { if (!drag || event.pointerId !== drag.pointer) return; drag.end = point(event); draw(); });
  on(overlay, "pointerup", (event) => { if (!drag || event.pointerId !== drag.pointer) return; const box = rect(drag.start, point(event)); drag = null; addRect(box); draw(); });
  on(overlay, "pointercancel", () => { drag = null; draw(); });
  on($("wmRepair"), "click", () => {
    if (!ready || busy || !selected.size) return;
    clearResult(); busy = true; controls(); status(`正在修复 ${selected.size} 处选区…`);
    const current = revision;
    timer = setTimeout(() => { if (current !== revision) return; stop(); busy = false; controls(); status("修复超时，请缩小选区后重新识别。", true); }, 60000);
    worker.postMessage({ type: "repair", selected: regions.filter((r) => !r.manual && selected.has(String(r.id))).map((r) => r.id), rectangles: regions.filter((r) => r.manual && selected.has(String(r.id))) });
  });
  on($("wmUndo"), "click", () => { clearResult(); $("wmShowRegions").checked = true; controls(); draw(); status("已恢复原图预览，选区仍保留，可调整后重新修复。"); });
  for (const id of ["wmView", "wmZoom", "wmShowRegions"]) on($(id), "change", draw);
  on(window, "resize", draw);
  controls();
  return { show: draw, leave: cancel, dispose() { disposed = true; stop(); clearResult(); source = result = null; regions = []; selected.clear(); } };
}
