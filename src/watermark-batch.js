import { Zip, ZipPassThrough } from "fflate";
import { MAX_WATERMARK_PIXELS } from "./watermark-core.mjs";

export const MAX_WATERMARK_FILES = 120;
const MAX_OUTPUT_BYTES = 512 * 1024 * 1024;

export function renderWatermarkBatch() {
  return `<section id="wmBatch" class="wm-batch" aria-labelledby="wmBatchTitle" hidden>
    <h4 id="wmBatchTitle">批量去水印 · 最多 120 张</h4>
    <p class="tool-hint">统一使用右侧识别设置，自动修复识别区域。未识别到水印的图片会原样转为 PNG，并单独标记；请检查结果。需要手动框选时，请单张上传处理。</p>
    <div class="tool-actions wm-batch-actions"><button id="wmBatchStart" class="btn primary" type="button">开始批量处理</button><button id="wmBatchRetry" class="btn secondary" type="button" disabled>重试失败图片</button><button id="wmBatchCancel" class="btn secondary" type="button" hidden>暂停处理</button><button id="wmBatchReplace" class="btn secondary" type="button">重新选择图片</button></div>
    <progress id="wmBatchProgress" max="120" value="0" aria-label="批量处理进度"></progress>
    <p id="wmBatchStatus" class="tool-status" role="status" aria-live="polite"></p>
    <div class="wm-batch-scroll"><table class="wm-batch-table"><thead><tr><th scope="col">图片</th><th scope="col">处理状态</th><th scope="col">结果</th></tr></thead><tbody id="wmBatchList"></tbody></table></div>
    <div class="tool-actions wm-batch-actions"><button id="wmBatchZip" class="btn primary" type="button" disabled>打包下载 PNG（ZIP）</button><a id="wmBatchArchive" class="btn secondary" hidden>再次下载 ZIP</a></div>
    <p class="tool-hint">逐张在本机处理，不上传图片。每张上限 40 MB、1200 万像素、最长边 8192 px；结果缓存上限 512 MB。暂停会保留已完成结果，可继续处理；更换图片或离开工具箱后清空缓存。</p>
  </section>`;
}

export function mountWatermarkBatch(root, on, { workerURL, getOptions, onStateChange }) {
  const $ = (id) => root.querySelector(`#${id}`);
  let items = [], busy = false, exporting = false, epoch = 0, controller = null, archiveURL = null, disposed = false;
  const rows = new Map();
  const outputName = (file, index) => `${String(index + 1).padStart(3, "0")}-${(file.name.replace(/\.[^.]+$/, "").replace(/[\\/:*?"<>|\x00-\x1f]/g, "_").slice(0, 100) || "图片")}-去水印.png`;
  const abortError = () => new DOMException("已暂停", "AbortError");
  const active = (current) => { if (disposed || current !== epoch) throw abortError(); };
  const status = (text) => { $("wmBatchStatus").textContent = text; };
  function clearArchive() {
    if (archiveURL) URL.revokeObjectURL(archiveURL);
    archiveURL = null; $("wmBatchArchive").hidden = true; $("wmBatchArchive").removeAttribute("href");
  }
  function paint() {
    const complete = items.filter((item) => item.blob).length;
    const errors = items.filter((item) => item.state === "error").length;
    const unchanged = items.filter((item) => item.state === "unchanged").length;
    const pending = items.filter((item) => item.state === "pending").length;
    $("wmBatchProgress").max = items.length || 1; $("wmBatchProgress").value = complete + errors;
    $("wmBatchStart").disabled = busy || exporting || !pending;
    $("wmBatchStart").textContent = !pending && !busy ? "队列处理完成" : complete || errors ? `继续处理（${pending} 张）` : `开始批量处理（${items.length} 张）`;
    $("wmBatchRetry").disabled = busy || exporting || !errors;
    $("wmBatchZip").disabled = busy || exporting || !complete;
    $("wmBatchZip").textContent = exporting ? "正在打包…" : `打包下载 PNG（${complete} 张）`;
    $("wmBatchCancel").hidden = !busy && !exporting;
    $("wmBatchCancel").textContent = exporting ? "取消打包" : "暂停处理";
    $("wmBatchReplace").disabled = busy || exporting;
    status(`共 ${items.length} 张 · 已导出 ${complete} 张（其中 ${unchanged} 张未识别到水印）· 失败 ${errors} 张 · 待处理 ${pending} 张${busy ? " · 正在逐张处理" : ""}`);
    for (const item of items) {
      const row = rows.get(item);
      row.state.textContent = item.message;
      row.state.classList.toggle("is-error", item.state === "error");
      row.download.hidden = !item.blob;
      row.preview.hidden = !item.blob;
      if (item.url) { row.download.href = row.preview.href = item.url; row.download.download = item.outputName; }
      else { row.download.removeAttribute("href"); row.preview.removeAttribute("href"); }
    }
    onStateChange();
  }
  function cancel() {
    epoch++; controller?.abort(); controller = null;
    busy = exporting = false;
    for (const item of items) if (item.state === "processing") { item.state = "pending"; item.message = "已暂停，等待继续"; }
    paint();
  }
  function invalidate() {
    cancel(); clearArchive();
    for (const item of items) { if (item.url) URL.revokeObjectURL(item.url); item.url = item.blob = null; item.state = "pending"; item.message = "待处理（使用当前识别设置）"; }
    paint();
  }
  function clear() {
    cancel(); clearArchive();
    for (const item of items) if (item.url) URL.revokeObjectURL(item.url);
    items = []; rows.clear(); $("wmBatchList").replaceChildren(); $("wmBatch").hidden = true; paint();
  }
  function setFiles(files) {
    clear();
    items = files.map((file, index) => ({ file, outputName: outputName(file, index), state: "pending", message: "待处理", blob: null, url: null }));
    const fragment = document.createDocumentFragment();
    for (const [index, item] of items.entries()) {
      const tr = document.createElement("tr"), name = document.createElement("td"), state = document.createElement("td"), actions = document.createElement("td");
      name.textContent = `${index + 1}. ${item.file.name}`; name.title = item.file.name; state.textContent = item.message;
      const download = document.createElement("a"), preview = document.createElement("a");
      download.textContent = "下载 PNG"; download.hidden = preview.hidden = true;
      preview.textContent = "查看"; preview.target = "_blank"; preview.rel = "noopener";
      actions.append(preview, download); tr.append(name, state, actions); fragment.append(tr); rows.set(item, { state, download, preview });
    }
    $("wmBatchList").append(fragment); $("wmBatch").hidden = false; paint();
  }
  async function processFile(file, options, current, signal) {
    if (!file.size || file.size > 40 * 1024 * 1024) throw new Error("请选择非空、40 MB 以内的图片");
    if (!/\.(png|jpe?g|webp)$/i.test(file.name) || file.type && !["image/png", "image/jpeg", "image/webp"].includes(file.type)) throw new Error("仅支持静态 PNG、JPG、WebP");
    let bitmap, worker;
    const canvas = document.createElement("canvas");
    try {
      bitmap = await createImageBitmap(file); active(current);
      if (bitmap.width * bitmap.height > MAX_WATERMARK_PIXELS || bitmap.width > 8192 || bitmap.height > 8192) throw new Error("超过 1200 万像素或最长边 8192 px");
      canvas.width = bitmap.width; canvas.height = bitmap.height;
      const ctx = canvas.getContext("2d"); ctx.drawImage(bitmap, 0, 0); bitmap.close(); bitmap = null;
      const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const result = await new Promise((resolve, reject) => {
        worker = new Worker(workerURL);
        const finish = (error, data) => { clearTimeout(timer); signal.removeEventListener("abort", abort); worker.terminate(); error ? reject(error) : resolve(data); };
        const abort = () => finish(abortError());
        const timer = setTimeout(() => finish(new Error("处理超时，请缩小图片后重试")), 60000);
        signal.addEventListener("abort", abort, { once: true });
        worker.onerror = () => finish(new Error("处理程序加载失败，请重试"));
        worker.onmessage = ({ data }) => { if (data.type === "error") finish(new Error(data.message)); else if (data.type === "batch-done") finish(null, data); };
        worker.postMessage({ type: "batch", buffer: image.data.buffer, width: image.width, height: image.height, options }, [image.data.buffer]);
      });
      active(current);
      ctx.putImageData(new ImageData(new Uint8ClampedArray(result.data), result.width, result.height), 0, 0);
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png")); active(current);
      if (!blob) throw new Error("PNG 导出失败，请重试");
      return { blob, regions: result.regions };
    } finally { bitmap?.close(); worker?.terminate(); canvas.width = canvas.height = 1; }
  }
  async function run(retry = false) {
    if (busy || exporting || disposed) return;
    const queue = items.filter((item) => item.state === (retry ? "error" : "pending"));
    if (!queue.length) return;
    clearArchive(); busy = true; const current = ++epoch; controller = new AbortController();
    const signal = controller.signal, options = getOptions(); paint();
    try {
      for (const item of queue) {
        active(current); item.state = "processing"; item.message = "正在识别与修复…"; paint();
        try {
          const result = await processFile(item.file, options, current, signal); active(current);
          if (items.reduce((sum, entry) => sum + (entry.blob?.size || 0), 0) + result.blob.size > MAX_OUTPUT_BYTES) throw new Error("结果缓存达到 512 MB，请先下载已完成图片，再分批处理剩余图片");
          item.blob = result.blob; item.url = URL.createObjectURL(result.blob); item.state = result.regions ? "done" : "unchanged";
          item.message = result.regions ? `已修复 ${result.regions} 处疑似水印` : "未识别到水印，原样导出";
        } catch (error) {
          active(current); item.state = "error"; item.message = `失败：${error.message}`;
        }
        paint(); await new Promise((resolve) => setTimeout(resolve, 0));
      }
    } catch (error) { if (error.name !== "AbortError") status(`批量处理失败：${error.message}`); }
    finally { if (current === epoch) { busy = false; controller = null; paint(); } }
  }
  async function downloadZip() {
    if (busy || exporting || disposed) return;
    const completed = items.filter((item) => item.blob);
    if (!completed.length) return;
    clearArchive(); exporting = true; const current = ++epoch; paint();
    const chunks = []; let zipError, failure;
    const zip = new Zip((error, data) => { if (error) zipError = error; else chunks.push(data); });
    try {
      for (const [index, item] of completed.entries()) {
        const bytes = new Uint8Array(await item.blob.arrayBuffer()); active(current);
        const entry = new ZipPassThrough(item.outputName); zip.add(entry); entry.push(bytes, true);
        if (zipError) throw zipError;
        status(`正在打包 ${index + 1} / ${completed.length} 张 PNG…`);
        await new Promise((resolve) => setTimeout(resolve, 0)); active(current);
      }
      zip.end(); if (zipError) throw zipError;
      active(current); archiveURL = URL.createObjectURL(new Blob(chunks, { type: "application/zip" }));
      const link = $("wmBatchArchive"); link.href = archiveURL; link.download = `去水印-${completed.length}张.zip`; link.hidden = false; link.click();
    } catch (error) { if (error.name !== "AbortError") failure = `打包失败：${error.message}。仍可逐张下载。`; }
    finally { zip.terminate(); if (current === epoch) { exporting = false; paint(); if (failure) status(failure); } }
  }
  on($("wmBatchStart"), "click", () => run());
  on($("wmBatchRetry"), "click", () => run(true));
  on($("wmBatchCancel"), "click", cancel);
  on($("wmBatchReplace"), "click", () => $("wmFile").click());
  on($("wmBatchZip"), "click", downloadZip);
  return { setFiles, clear, invalidate, cancel, get busy() { return busy || exporting; }, get hasFiles() { return items.length > 0; }, dispose() { disposed = true; clear(); } };
}
