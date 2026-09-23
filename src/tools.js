import { mountBackgroundTool } from "./background-remove.js";

const workerURL = new URL("./gif-worker.js", document.currentScript.src);
workerURL.search = "v=repeat-30";
let cleanup = () => {};

function render() {
  return `
    <header class="page-head"><div><h1 class="page-title">工具箱</h1><p class="page-subtitle">处理产品工作中的常用素材，减少重复操作。</p></div><span class="badge green">本地处理 · 无需上传</span></header>
    <section id="toolCatalog" class="tool-catalog" aria-labelledby="toolCatalogTitle">
      <div class="tool-catalog-head"><div><h2 id="toolCatalogTitle">素材处理</h2><p>选择工具后进入操作页面</p></div><span>2 个工具</span></div>
      <div class="tool-catalog-grid">
      <button id="gifToolOpen" class="tool-card" type="button" aria-label="打开 GIF 转 SVGA 工具">
        <span class="tool-card-art" aria-hidden="true">
          <svg class="tool-card-picture" viewBox="0 0 320 160" role="img">
            <defs><linearGradient id="toolArtGradient" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#706ff8"/><stop offset="1" stop-color="#4f91ff"/></linearGradient></defs>
            <rect width="320" height="160" rx="18" fill="url(#toolArtGradient)"/>
            <circle cx="270" cy="28" r="44" fill="#fff" opacity=".08"/><circle cx="38" cy="144" r="58" fill="#fff" opacity=".06"/>
            <rect x="38" y="34" width="92" height="92" rx="18" fill="#fff"/>
            <rect x="51" y="48" width="66" height="48" rx="9" fill="#eceeff"/>
            <circle cx="66" cy="63" r="7" fill="#ffba62"/><path d="m53 90 18-18 13 13 10-10 21 21H53Z" fill="#7777f6"/>
            <rect x="57" y="105" width="54" height="9" rx="4.5" fill="#d9dcf7"/>
            <path d="M145 80h31m-9-10 10 10-10 10" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
            <rect x="193" y="34" width="89" height="92" rx="18" fill="#17233e" opacity=".94"/>
            <path d="m219 62 18 36 18-36" fill="none" stroke="#75e5bd" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
            <text x="237.5" y="113" fill="#fff" font-size="16" font-weight="700" text-anchor="middle">SVGA</text>
          </svg>
        </span>
        <span class="tool-card-content"><span class="tool-card-title">GIF 转 SVGA</span><span class="tool-card-description">转换动画、处理透明边缘并导出 SVGA 2.0</span><span class="tool-card-meta"><span class="badge green">可用</span><span>进入工具 <b aria-hidden="true">→</b></span></span></span>
      </button>
      <button id="bgToolOpen" class="tool-card" type="button" aria-label="打开移除背景工具">
        <span class="tool-card-art" aria-hidden="true">
          <svg class="tool-card-picture" viewBox="0 0 320 160" role="img">
            <defs><linearGradient id="bgArtGradient" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#49b4af"/><stop offset="1" stop-color="#686ef1"/></linearGradient><pattern id="bgArtChecks" width="12" height="12" patternUnits="userSpaceOnUse"><rect width="12" height="12" fill="#fff"/><path d="M0 0h6v6H0zm6 6h6v6H6z" fill="#e7e9f0"/></pattern></defs>
            <rect width="320" height="160" rx="18" fill="url(#bgArtGradient)"/>
            <circle cx="38" cy="146" r="58" fill="#fff" opacity=".07"/><circle cx="275" cy="17" r="44" fill="#fff" opacity=".08"/>
            <rect x="47" y="27" width="95" height="106" rx="14" fill="#f8f8ff"/><rect x="57" y="37" width="75" height="86" rx="8" fill="#d9dcf1"/>
            <circle cx="95" cy="67" r="15" fill="#f7bf9b"/><path d="M64 114c3-23 15-36 31-36s28 13 31 36" fill="#f3698b"/>
            <path d="M155 80h29m-9-9 10 9-10 9" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
            <rect x="198" y="27" width="95" height="106" rx="14" fill="url(#bgArtChecks)"/>
            <circle cx="245" cy="67" r="15" fill="#f7bf9b"/><path d="M214 114c3-23 15-36 31-36s28 13 31 36" fill="#f3698b"/>
          </svg>
        </span>
        <span class="tool-card-content"><span class="tool-card-title">移除图片背景</span><span class="tool-card-description">静态图片精修，GIF 动画逐帧去除背景并透明导出</span><span class="tool-card-meta"><span class="badge green">可用</span><span>进入工具 <b aria-hidden="true">→</b></span></span></span>
      </button>
      </div>
    </section>
    <section id="toolWorkspace" class="panel tool-workspace" aria-labelledby="converterTitle" hidden>
      <header class="panel-head"><div class="tool-workspace-title"><button id="gifToolBack" class="tool-back" type="button" aria-label="返回工具箱">←</button><div><h2 id="converterTitle" tabindex="-1">GIF 转 SVGA</h2><p>选择动画，设置输出参数，转换后下载。</p></div></div><span class="doc-tag">素材转换</span></header>
      <div class="tool-columns">
        <div class="tool-source">
          <h3>1. 选择 GIF</h3>
          <label class="tool-preview-control">预览底色<select id="gifPreviewBackground"><option value="black">黑色（检查白边）</option><option value="checker">透明棋盘格</option><option value="white">白色（检查暗边）</option></select></label>
          <input id="gifFile" class="tool-file-input" type="file" accept=".gif,image/gif" aria-label="选择 GIF 文件" />
          <button id="gifDrop" class="tool-drop" type="button">
            <svg aria-hidden="true"><use href="#i-upload"></use></svg><strong>点击选择或拖入 GIF 文件</strong><span>单个文件不超过 20 MB</span>
          </button>
          <div id="gifPreviewBox" hidden>
            <p class="tool-hint">原始 GIF 动画</p><div class="tool-preview"><img id="gifPreview" alt="所选原始 GIF 动画预览" /></div>
            <p id="gifFilename" class="tool-filename"></p><p id="gifMetadata" class="tool-hint"></p>
            <button id="gifReplace" class="btn secondary" type="button">重新选择</button>
          </div>
          <p class="tool-hint">支持宽高不超过 2048 px、最多 300 帧、30 秒以内的动画。复杂动画可能需要先缩小尺寸。</p>
        </div>
        <div class="tool-settings">
          <h3>2. 设置与转换</h3>
          <label class="form-label" for="gifUsage">用途类型<select id="gifUsage"><option value="emoji">表情包</option><option value="general">通用素材</option></select></label>
          <div id="gifEmojiPreset"><p class="tool-output-hint">表情包标准：SVGA 2.0 · 240 × 240 px · 20 FPS</p><p class="tool-hint">保持原 GIF 的播放节奏，帧数和时长根据重复次数计算。等比居中、透明补边，不裁切、不放大小尺寸素材。</p></div>
          <div id="gifGeneralOptions" hidden>
          <label class="form-label" for="gifSize">输出尺寸<select id="gifSize"><option value="720">最长边 720 px（推荐）</option><option value="480">最长边 480 px</option><option value="240">最长边 240 px</option><option value="0">保持原始尺寸</option></select></label>
          <p class="tool-hint">保持比例，不放大小尺寸图片。</p>
          <label class="form-label" for="gifFps">输出帧率<select id="gifFps"><option value="30">30 FPS（推荐）</option><option value="60">60 FPS</option><option value="20">20 FPS</option><option value="15">15 FPS</option></select></label>
          <p class="tool-hint">按原动画时长匹配播放节奏，时间精度受帧率影响；极短帧可能合并。</p>
          </div>
          <label class="form-label" for="gifRepeat">重复播放次数<select id="gifRepeat"><option value="1">1 次（保持原时长）</option>${Array.from({ length: 29 }, (_, index) => `<option value="${index + 2}">${index + 2} 次</option>`).join("")}</select></label>
          <p class="tool-hint">导出时会连续复制完整动画。例如原时长 0.25 秒，选择 4 次后输出约 1.00 秒。</p>
          <label class="form-label" for="gifEdgeMode">透明边缘处理<select id="gifEdgeMode"><option value="none">保留原始边缘</option><option value="soft">柔化锯齿</option><option value="white">去白边并柔化</option></select></label>
          <p class="tool-hint">有碎白边时选「去白边并柔化」，会收缩残留边缘并重新生成平滑的半透明轮廓。</p>
          <div id="gifEdgeTrimBox" hidden><label class="form-label" for="gifEdgeTrim">去边宽度<select id="gifEdgeTrim"><option value="1">1 px · 轻度</option><option value="1.5" selected>1.5 px · 标准（推荐）</option><option value="2">2 px · 较强</option></select></label><p class="tool-hint">以最终输出像素为准。轮廓会略微收缩，仍有残边可选 2 px；细小素材建议先用 1 px。</p></div>
          <p id="gifOutputHint" class="tool-output-hint">选择 GIF 后可查看预计输出信息。</p>
          <div class="tool-actions"><button id="gifConvert" class="btn primary" type="button" disabled>开始转换</button><button id="gifCancel" class="btn secondary" type="button" hidden>取消处理</button></div>
          <div id="gifProgressBox" class="tool-progress-box" hidden><progress id="gifProgress" max="100" value="0" aria-label="转换进度"></progress></div>
          <p id="gifStatus" class="tool-status" role="status" aria-live="polite">请先选择 GIF 文件。</p>
          <div id="gifResult" class="tool-result" hidden><strong>转换完成</strong><p id="gifResultInfo"></p><p id="gifEdgeNotice"></p><label class="tool-preview-control">结果抽帧预览<select id="gifResultFrame"></select></label><div class="tool-preview tool-result-preview"><img id="gifResultPreview" alt="转换后 SVGA 的实际帧画面" /></div><p class="tool-hint">预览为导出文件中的实际帧；下载文件保留完整动画。</p><a id="gifDownload" class="btn primary">下载 SVGA</a></div>
        </div>
      </div>
      <div class="tool-notes"><strong>使用说明</strong><p>文件仅在当前浏览器中处理，不上传服务器。离开工具箱或退出登录会清除本次文件；转换完成后请下载保存。</p><p>输出为 SVGA 2.0 逐帧位图动画，不会自动转为矢量，文件可能增大。这里的重复次数会直接写入动画时间轴；播放器仍可对整个 SVGA 再设置循环播放。</p></div>
    </section>
    <section id="bgWorkspace" class="panel tool-workspace bg-workspace" aria-labelledby="bgTitle" hidden>
      <header class="panel-head"><div class="tool-workspace-title"><button id="bgToolBack" class="tool-back" type="button" aria-label="返回工具箱">←</button><div><h2 id="bgTitle" tabindex="-1">移除图片背景</h2><p>支持静态图片和 GIF 动画逐帧移除背景。</p></div></div><span class="doc-tag">图片处理</span></header>
      <div class="bg-columns">
        <div class="bg-preview-column">
          <div class="bg-preview-head"><div><h3>图片预览</h3><p id="bgFileName">尚未选择图片</p></div><label class="tool-preview-control">预览底色<select id="bgPreviewBackground"><option value="checker">透明棋盘格</option><option value="black">黑色</option><option value="white">白色</option></select></label></div>
          <input id="bgFile" class="tool-file-input" type="file" accept="image/png,image/jpeg,image/webp,image/gif,.png,.jpg,.jpeg,.webp,.gif" aria-label="选择要移除背景的图片或 GIF" />
          <div id="bgDrop" class="bg-stage">
            <div id="bgEmpty" class="bg-empty"><svg aria-hidden="true"><use href="#i-upload"></use></svg><strong>上传图片或 GIF 开始处理</strong><span>支持 PNG、JPG、WebP、GIF · 不超过 20 MB · 最长边 2048 px</span><button id="bgChoose" class="btn primary" type="button">选择文件</button></div>
            <div id="bgCanvasArea" class="bg-canvas-area" hidden><div id="bgCanvasFrame" class="bg-canvas-frame" data-background="checker" data-mode="wand"><canvas id="bgCanvas" aria-label="图片处理结果"></canvas><canvas id="bgOverlay" aria-label="图片选区操作区"></canvas><img id="bgGifPreview" alt="透明 GIF 动画处理结果" hidden /></div></div>
          </div>
          <p id="bgStatus" class="tool-status bg-status" role="status" aria-live="polite">图片只在当前浏览器处理，不上传服务器。</p>
        </div>
        <div class="bg-controls-column">
          <h3>处理与导出</h3>
          <p class="tool-hint">上传后会自动移除与图片边缘连通的相近颜色背景。适合纯色或近似纯色背景，复杂背景请手动修正。</p>
          <div id="bgControls" hidden>
            <section id="bgIntentSection" class="bg-intent" aria-labelledby="bgIntentTitle">
              <h4 id="bgIntentTitle">智能指令 · 本地识别</h4>
              <p class="tool-hint">描述要处理的颜色和位置，先查看识别步骤，再执行。</p>
              <label class="form-label" for="bgIntentInput">想处理哪里？<textarea id="bgIntentInput" rows="2" maxlength="200" placeholder="例如：去掉左上角白色背景，然后擦除下方 20%"></textarea></label>
              <div class="bg-intent-examples"><button type="button" data-bg-example="去掉白色背景">去掉白色背景</button><button type="button" data-bg-example="去掉左上角白色区域">左上角白色区域</button><button type="button" data-bg-example="恢复左侧 20%">恢复左侧 20%</button></div>
              <button id="bgAnalyzeIntent" class="btn secondary bg-intent-analyze" type="button">识别并拆解</button>
              <p id="bgIntentError" class="tool-status is-error" role="alert" hidden></p>
              <div id="bgIntentPlan" class="bg-intent-plan" hidden><strong>执行计划</strong><ol id="bgIntentSteps"></ol><p id="bgIntentWarning" hidden></p><button id="bgExecuteIntent" class="btn primary" type="button">按计划执行</button></div>
            </section>
            <label class="form-label" for="bgBoundaryMode">主体保护<select id="bgBoundaryMode"><option value="protect" selected>边缘主体保护（推荐）</option><option value="standard">普通边缘连通</option></select></label>
            <p class="tool-hint">主体伸到图片边缘时，可保护白色手臂、衣服等浅色区域；GIF 会自动补偿个别帧中的短轮廓断口。</p>
            <label class="form-label" for="bgTolerance">颜色容差 <strong id="bgToleranceValue">22</strong><input id="bgTolerance" class="bg-range" type="range" min="0" max="100" value="22" /></label>
            <p class="tool-hint">数值越高，选中的近似颜色越多；过高可能误删主体。</p>
            <button id="bgAuto" class="btn secondary bg-auto-btn" type="button" disabled>重新自动移除背景</button>
            <div id="bgGifNotice" class="bg-gif-notice" hidden><strong>GIF 逐帧处理</strong><p id="bgGifInfo">会保留原帧节奏与循环信息，重新编码为透明 GIF。</p><p>GIF 透明度只有透明/不透明两档；需要精修单帧时，建议先拆帧处理。</p></div>
            <div id="bgManualControls"><h4>手动修正</h4>
            <div class="bg-mode-grid" role="group" aria-label="手动处理方式">
              <button class="bg-mode active" data-bg-mode="wand" aria-pressed="true" type="button">相近颜色点选</button>
              <button class="bg-mode" data-bg-mode="lasso" aria-pressed="false" type="button">套索选区</button>
              <button class="bg-mode" data-bg-mode="erase" aria-pressed="false" type="button">画笔擦除</button>
              <button class="bg-mode" data-bg-mode="restore" aria-pressed="false" type="button">画笔恢复</button>
            </div>
            <div id="bgBrushControl" hidden><label class="form-label" for="bgBrushSize">画笔大小 <strong id="bgBrushSizeValue">32</strong> px<input id="bgBrushSize" class="bg-range" type="range" min="4" max="160" value="32" /></label></div>
            <p class="tool-hint">点选会移除相近颜色的连续区域；套索圈选后松开即可擦除。误删时可用恢复画笔或撤销。</p>
            <div class="bg-edit-actions"><button id="bgUndo" class="btn secondary" type="button" disabled>撤销</button><button id="bgReset" class="btn secondary" type="button" disabled>恢复原图</button></div></div>
            <div class="bg-edit-actions"><button id="bgReplace" class="btn secondary" type="button">更换文件</button></div>
            <button id="bgDownload" class="btn primary bg-download" type="button" disabled>下载透明 PNG</button>
            <button id="bgDownloadCover" class="btn secondary bg-download" type="button" disabled hidden>下载封面 PNG（72 × 72）</button>
          </div>
        </div>
      </div>
      <div class="tool-notes"><strong>使用说明</strong><p>自动处理依据每张图片或每一帧边缘的相近颜色，不是 AI 人像分割。静态图片可用套索或画笔手动调整；GIF 会逐帧自动处理并保留动画节奏和循环信息。</p></div>
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
  let resultPreviewURLs = [];
  let worker = null;
  let timer = null;
  let revision = 0;
  let disposed = false;
  let busy = false;
  let converterOpen = false;
  const disposeBackground = mountBackgroundTool(root, on);
  root.dataset.previewBackground = "black";
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
    ["gifUsage", "gifSize", "gifFps", "gifRepeat", "gifEdgeMode", "gifEdgeTrim", "gifReplace", "gifFile", "gifDrop"].forEach((id) => { $(id).disabled = value; });
    if ($("gifUsage").value === "emoji") { $("gifSize").disabled = true; $("gifFps").disabled = true; }
    $("gifConvert").disabled = value || !metadata;
    $("gifCancel").hidden = !value;
    $("gifProgressBox").hidden = !value;
    $("gifConvert").textContent = value ? "处理中…" : "开始转换";
  }
  function clearResult() {
    resultPreviewURLs.forEach((url) => URL.revokeObjectURL(url));
    resultPreviewURLs = [];
    $("gifResultPreview").removeAttribute("src");
    $("gifResultFrame").replaceChildren();
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
    const emoji = $("gifUsage").value === "emoji";
    const edge = emoji ? 240 : Number($("gifSize").value);
    const scale = emoji ? Math.min(1, edge / Math.max(metadata.width, metadata.height)) : edge ? Math.min(1, edge / Math.max(metadata.width, metadata.height)) : 1;
    const width = emoji ? 240 : Math.max(1, Math.round(metadata.width * scale));
    const height = emoji ? 240 : Math.max(1, Math.round(metadata.height * scale));
    const fps = emoji ? 20 : Number($("gifFps").value);
    const repeat = Number($("gifRepeat").value);
    const cycleFrames = Math.max(1, Math.round(metadata.duration * fps / 1000));
    const frames = cycleFrames * repeat;
    $("gifOutputHint").textContent = `预计输出：${width} × ${height} px · ${fps} FPS · ${frames} 帧 · ${(cycleFrames / fps).toFixed(2)} 秒 × ${repeat} 次 = ${(frames / fps).toFixed(2)} 秒`;
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
          const labels = ["首帧", "中间帧", "末帧"];
          data.previews.forEach((preview, index) => {
            resultPreviewURLs.push(URL.createObjectURL(new Blob([preview.png], { type: "image/png" })));
            $("gifResultFrame").add(new Option(`${labels[index]} · 第 ${preview.frame + 1} 帧`, String(index)));
          });
          $("gifResultPreview").src = resultPreviewURLs[0];
          $("gifEdgeNotice").textContent = $("gifEdgeMode").value === "none" ? "已保留原始边缘。" : info.edgeApplied ? $("gifEdgeMode").value === "white" ? `已按 ${$("gifEdgeTrim").value} px 去边并重建透明轮廓，请切换底色检查效果。` : "已柔化透明边缘，请切换底色检查效果。" : "未检测到可处理的透明边缘，边缘优化未生效；此工具不会去除实色背景。";
          $("gifResultInfo").textContent = `${formatSize(blob.size)} · ${info.width} × ${info.height} px · ${info.frames} 帧 · ${info.fps} FPS · ${(info.duration / 1000).toFixed(2)} 秒 · 完整播放 ${info.repeat} 次`;
          $("gifResult").hidden = false;
          status("转换成功，请下载保存 SVGA 文件。");
        }
      };
      worker.postMessage({ buffer, inspect, options: { usage: $("gifUsage").value, maxEdge: $("gifSize").value, fps: $("gifFps").value, repeat: $("gifRepeat").value, edgeMode: $("gifEdgeMode").value, edgeTrim: $("gifEdgeTrim").value } }, [buffer]);
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
  function showConverter() {
    converterOpen = true;
    $("toolCatalog").hidden = true;
    $("toolWorkspace").hidden = false;
    $("bgWorkspace").hidden = true;
    $("converterTitle").focus();
  }
  function showBackground() {
    converterOpen = false;
    $("toolCatalog").hidden = true;
    $("toolWorkspace").hidden = true;
    $("bgWorkspace").hidden = false;
    $("bgTitle").focus();
  }
  function showCatalog() {
    const returnTarget = $("bgWorkspace").hidden ? $("gifToolOpen") : $("bgToolOpen");
    converterOpen = false;
    $("toolWorkspace").hidden = true;
    $("bgWorkspace").hidden = true;
    $("toolCatalog").hidden = false;
    returnTarget.focus();
  }
  on($("gifToolOpen"), "click", showConverter);
  on($("gifToolBack"), "click", showCatalog);
  on($("bgToolOpen"), "click", showBackground);
  on($("bgToolBack"), "click", showCatalog);
  on($("gifDrop"), "click", () => $("gifFile").click());
  on($("gifReplace"), "click", () => $("gifFile").click());
  on($("gifFile"), "change", (event) => choose(event.target.files[0]));
  on(root, "dragover", (event) => {
    if (!converterOpen) return;
    event.preventDefault();
    if (!busy) $("gifDrop").classList.add("is-dragging");
  });
  on(root, "dragleave", (event) => {
    if (!root.contains(event.relatedTarget)) $("gifDrop").classList.remove("is-dragging");
  });
  on(root, "drop", (event) => {
    if (!converterOpen) return;
    event.preventDefault();
    $("gifDrop").classList.remove("is-dragging");
    if (busy) return;
    if (event.dataTransfer.files.length !== 1) return status("每次请选择一个 GIF 文件。", true);
    choose(event.dataTransfer.files[0]);
  });
  on($("gifPreviewBackground"), "change", () => { root.dataset.previewBackground = $("gifPreviewBackground").value; });
  on($("gifResultFrame"), "change", () => { $("gifResultPreview").src = resultPreviewURLs[Number($("gifResultFrame").value)]; });
  ["gifUsage", "gifSize", "gifFps", "gifRepeat", "gifEdgeMode", "gifEdgeTrim"].forEach((id) => on($(id), "change", () => {
    const emoji = $("gifUsage").value === "emoji";
    $("gifEmojiPreset").hidden = !emoji;
    $("gifGeneralOptions").hidden = emoji;
    setBusy(busy);
    $("gifEdgeTrimBox").hidden = $("gifEdgeMode").value !== "white";
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
  updateOutputHint();
  setBusy(false);
  cleanup = () => {
    disposed = true;
    disposeBackground();
    stopWorker();
    controller.abort();
    if (previewURL) URL.revokeObjectURL(previewURL);
    if (downloadURL) URL.revokeObjectURL(downloadURL);
    resultPreviewURLs.forEach((url) => URL.revokeObjectURL(url));
    resultPreviewURLs = [];
    delete root.dataset.previewBackground;
    selectedFile = null;
    metadata = null;
  };
}

window.OrbitTools = { render, mount, dispose() { cleanup(); cleanup = () => {}; } };
