const workerURL = new URL("./gif-worker.js", document.currentScript.src);
let cleanup = () => {};

function render() {
  return `
    <header class="page-head"><div><h1 class="page-title">工具箱</h1><p class="page-subtitle">处理产品工作中的常用素材，减少重复操作。</p></div><span class="badge green">本地处理 · 无需上传</span></header>
    <div class="tool-catalog"><div class="tool-card"><span class="tool-format">GIF</span><div><h2>GIF 转 SVGA</h2><p>将 GIF 动画转换为可交付的 SVGA 文件</p></div><span class="badge green">可用</span></div></div>
    <section class="panel tool-workspace" aria-labelledby="converterTitle">
      <header class="panel-head"><div><h2 id="converterTitle">GIF 转 SVGA</h2><p>选择动画，设置输出参数，转换后下载。</p></div><span class="doc-tag">素材转换</span></header>
      <div class="tool-columns">
        <div class="tool-source">
          <h3>1. 选择 GIF</h3>
          <input id="gifFile" class="tool-file-input" type="file" accept=".gif,image/gif" aria-label="选择 GIF 文件" />
          <button id="gifDrop" class="tool-drop" type="button">
            <svg aria-hidden="true"><use href="#i-upload"></use></svg><strong>点击选择或拖入 GIF 文件</strong><span>单个文件不超过 20 MB</span>
          </button>
          <div id="gifPreviewBox" hidden>
            <div class="tool-preview"><img id="gifPreview" alt="所选 GIF 动画预览" /></div>
            <p id="gifFilename" class="tool-filename"></p><p id="gifMetadata" class="tool-hint"></p>
            <button id="gifReplace" class="btn secondary" type="button">重新选择</button>
          </div>
          <p class="tool-hint">支持宽高不超过 2048 px、最多 300 帧、30 秒以内的动画。复杂动画可能需要先缩小尺寸。</p>
        </div>
        <div class="tool-settings">
          <h3>2. 设置与转换</h3>
          <label class="form-label" for="gifSize">输出尺寸<select id="gifSize"><option value="720">最长边 720 px（推荐）</option><option value="480">最长边 480 px</option><option value="240">最长边 240 px</option><option value="0">保持原始尺寸</option></select></label>
          <p class="tool-hint">保持比例，不放大小尺寸图片。</p>
          <label class="form-label" for="gifFps">输出帧率<select id="gifFps"><option value="30">30 FPS（推荐）</option><option value="60">60 FPS</option><option value="20">20 FPS</option><option value="15">15 FPS</option></select></label>
          <p class="tool-hint">按原动画时长匹配播放节奏，时间精度受帧率影响；极短帧可能合并。</p>
          <p id="gifOutputHint" class="tool-output-hint">选择 GIF 后可查看预计输出信息。</p>
          <div class="tool-actions"><button id="gifConvert" class="btn primary" type="button" disabled>开始转换</button><button id="gifCancel" class="btn secondary" type="button" hidden>取消处理</button></div>
          <div id="gifProgressBox" class="tool-progress-box" hidden><progress id="gifProgress" max="100" value="0" aria-label="转换进度"></progress></div>
          <p id="gifStatus" class="tool-status" role="status" aria-live="polite">请先选择 GIF 文件。</p>
          <div id="gifResult" class="tool-result" hidden><strong>转换完成</strong><p id="gifResultInfo"></p><a id="gifDownload" class="btn primary">下载 SVGA</a></div>
        </div>
      </div>
      <div class="tool-notes"><strong>使用说明</strong><p>文件仅在当前浏览器中处理，不上传服务器。离开工具箱或退出登录会清除本次文件；转换完成后请下载保存。</p><p>输出为 SVGA 2.0 逐帧位图动画，不会自动转为矢量，文件可能增大。保留原图透明区域，不会自动去除实色背景；循环次数由使用方播放器设置。</p></div>
    </section>`;
}

function mount(root) {
  const $ = (id) => root.querySelector(`#${id}`);
  const controller = new AbortController();
  const on = (element, event, fn) => element.addEventListener(event, fn, { signal: controller.signal });
  let selectedFile = null;
  let metadata = null;
  let previewURL = null;
  let downloadURL = null;
  let worker = null;
  let timer = null;
  let revision = 0;
  let disposed = false;
  let busy = false;
  const formatSize = (bytes) => bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(1)} KB` : `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  const status = (text, error = false) => {
    $("gifStatus").textContent = text;
    $("gifStatus").classList.toggle("is-error", error);
  };
  function stopWorker() {
    worker?.terminate();
    worker = null;
    clearTimeout(timer);
    revision++;
  }
  function setBusy(value) {
    busy = value;
    ["gifSize", "gifFps", "gifReplace", "gifFile", "gifDrop"].forEach((id) => { $(id).disabled = value; });
    $("gifConvert").disabled = value || !metadata;
    $("gifCancel").hidden = !value;
    $("gifProgressBox").hidden = !value;
    $("gifConvert").textContent = value ? "处理中…" : "开始转换";
  }
  function clearResult() {
    if (downloadURL) URL.revokeObjectURL(downloadURL);
    downloadURL = null;
    $("gifDownload").removeAttribute("href");
    $("gifResult").hidden = true;
  }
  function updateOutputHint() {
    if (!metadata) {
      $("gifOutputHint").textContent = "选择 GIF 后可查看预计输出信息。";
      return;
    }
    const edge = Number($("gifSize").value);
    const scale = edge ? Math.min(1, edge / Math.max(metadata.width, metadata.height)) : 1;
    const fps = Number($("gifFps").value);
    const frames = Math.max(1, Math.round(metadata.duration * fps / 1000));
    $("gifOutputHint").textContent = `预计输出：${Math.max(1, Math.round(metadata.width * scale))} × ${Math.max(1, Math.round(metadata.height * scale))} px · ${fps} FPS · ${(frames / fps).toFixed(2)} 秒`;
  }
  function failure(message) {
    stopWorker();
    setBusy(false);
    status(message, true);
  }
  function watchdog() {
    clearTimeout(timer);
    timer = setTimeout(() => failure("处理超时，请缩小 GIF 尺寸后重试。"), 60000);
  }
  async function run(inspect) {
    stopWorker();
    const job = revision;
    setBusy(true);
    $("gifProgress").value = 0;
    status(inspect ? "正在读取 GIF 信息…" : "正在解析 GIF 动画…");
    watchdog();
    try {
      const buffer = await selectedFile.arrayBuffer();
      if (disposed || job !== revision) return;
      worker = new Worker(workerURL);
      worker.onerror = (event) => {
        event.preventDefault();
        failure("转换工具加载失败，请刷新页面或使用新版 Chrome / Edge 重试。");
      };
      worker.onmessage = ({ data }) => {
        if (disposed || job !== revision) return;
        watchdog();
        if (data.type === "error") {
          failure(`无法处理：${data.message}`);
        } else if (data.type === "info") {
          metadata = data.info;
          stopWorker();
          setBusy(false);
          previewURL = URL.createObjectURL(selectedFile);
          $("gifPreview").src = previewURL;
          $("gifPreviewBox").hidden = false;
          $("gifDrop").hidden = true;
          $("gifFilename").textContent = selectedFile.name;
          $("gifMetadata").textContent = `${formatSize(selectedFile.size)} · ${metadata.width} × ${metadata.height} px · ${metadata.frames} 帧 · ${(metadata.duration / 1000).toFixed(2)} 秒`;
          updateOutputHint();
          status("文件已就绪，可以开始转换。");
        } else if (data.type === "progress") {
          $("gifProgress").value = data.value;
          status(data.message);
        } else if (data.type === "done") {
          stopWorker();
          setBusy(false);
          const blob = new Blob([data.bytes], { type: "application/octet-stream" });
          downloadURL = URL.createObjectURL(blob);
          $("gifDownload").href = downloadURL;
          $("gifDownload").download = `${selectedFile.name.replace(/\.gif$/i, "") || "animation"}.svga`;
          const info = data.info;
          $("gifResultInfo").textContent = `${formatSize(blob.size)} · ${info.width} × ${info.height} px · ${info.frames} 帧 · ${info.fps} FPS · ${(info.duration / 1000).toFixed(2)} 秒`;
          $("gifResult").hidden = false;
          status("转换成功，请下载保存 SVGA 文件。");
        }
      };
      worker.postMessage({ buffer, inspect, options: { maxEdge: $("gifSize").value, fps: $("gifFps").value } }, [buffer]);
    } catch {
      if (!disposed && job === revision) failure("无法读取文件或启动转换，请重新选择文件或更换浏览器。");
    }
  }
  function choose(file) {
    if (!file || busy) return;
    stopWorker();
    clearResult();
    if (previewURL) URL.revokeObjectURL(previewURL);
    previewURL = null;
    selectedFile = file;
    metadata = null;
    $("gifPreview").removeAttribute("src");
    $("gifPreviewBox").hidden = true;
    $("gifDrop").hidden = false;
    $("gifFile").value = "";
    updateOutputHint();
    setBusy(false);
    if (file.size > 20 * 1024 * 1024) return status("文件超过 20 MB，请先压缩或选择其他 GIF。", true);
    if (!file.size) return status("文件为空，请重新选择 GIF。", true);
    run(true);
  }
  on($("gifDrop"), "click", () => $("gifFile").click());
  on($("gifReplace"), "click", () => $("gifFile").click());
  on($("gifFile"), "change", (event) => choose(event.target.files[0]));
  on(root, "dragover", (event) => {
    event.preventDefault();
    if (!busy) $("gifDrop").classList.add("is-dragging");
  });
  on(root, "dragleave", (event) => {
    if (!root.contains(event.relatedTarget)) $("gifDrop").classList.remove("is-dragging");
  });
  on(root, "drop", (event) => {
    event.preventDefault();
    $("gifDrop").classList.remove("is-dragging");
    if (busy) return;
    if (event.dataTransfer.files.length !== 1) return status("每次请选择一个 GIF 文件。", true);
    choose(event.dataTransfer.files[0]);
  });
  ["gifSize", "gifFps"].forEach((id) => on($(id), "change", () => {
    clearResult();
    updateOutputHint();
    status(metadata ? "参数已更新，请点击开始转换。" : "请先选择 GIF 文件。");
  }));
  on($("gifConvert"), "click", () => {
    if (!metadata || busy) return;
    clearResult();
    run(false);
  });
  on($("gifCancel"), "click", () => {
    stopWorker();
    setBusy(false);
    status(metadata ? "已取消，可重新开始转换。" : "已取消，请重新选择 GIF。");
  });
  cleanup = () => {
    disposed = true;
    stopWorker();
    controller.abort();
    if (previewURL) URL.revokeObjectURL(previewURL);
    if (downloadURL) URL.revokeObjectURL(downloadURL);
    selectedFile = null;
    metadata = null;
  };
}

window.OrbitTools = { render, mount, dispose() { cleanup(); cleanup = () => {}; } };
