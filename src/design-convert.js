const designWorkerURL = new URL("./design-worker.js", document.currentScript.src);
designWorkerURL.search = "v=design-preflight-3";
const formatNames = { fig: "Figma (.fig)", sketch: "Sketch (.sketch)", xd: "Adobe XD (.xd)" };

export function renderDesignWorkspace() {
  return `
    <section id="designWorkspace" class="panel tool-workspace design-workspace" aria-labelledby="designTitle" hidden>
      <header class="panel-head"><div class="tool-workspace-title"><button id="designToolBack" class="tool-back" type="button" aria-label="返回工具箱">←</button><div><h2 id="designTitle" tabindex="-1">设计文件互转</h2><p>选择 XD、Sketch 或 Figma 源文件，转换并下载。</p></div></div><span class="doc-tag">本地转换 · 测试版</span></header>
      <div class="tool-columns design-columns">
        <div>
          <h3>1. 选择设计文件</h3>
          <input id="designFile" class="tool-file-input" type="file" accept=".fig,.sketch,.xd" aria-label="选择 XD、Sketch 或 Figma 文件" />
          <button id="designDrop" class="tool-drop" type="button"><svg aria-hidden="true"><use href="#i-upload"></use></svg><strong>点击选择或拖入设计文件</strong><span>.fig / .sketch / .xd · 不再限制原文件大小</span></button>
          <div id="designSource" class="design-source" hidden><strong id="designFilename"></strong><p id="designSourceInfo" class="tool-hint"></p><div id="designPreviewBox" hidden><p class="tool-hint">原文件封面（非转换结果预览）</p><div class="design-preview"><img id="designPreview" alt="原设计文件的封面" /></div></div><button id="designReplace" class="btn secondary" type="button">更换文件</button></div>
          <p class="tool-hint">文件在浏览器内处理，无需登录设计平台或安装插件。大文件处理取决于电脑可用内存；为防止浏览器卡死，仍保留解压后 400 MB、50,000 个图层的安全保护。</p>
        </div>
        <div class="tool-settings">
          <h3>2. 转换与下载</h3>
          <label class="form-label" for="designTarget">目标格式<select id="designTarget"><option value="fig">Figma (.fig)</option><option value="sketch">Sketch (.sketch)</option><option value="xd">Adobe XD (.xd)</option></select></label>
          <p class="tool-output-hint">按完整保留可编辑图层和属性的要求转换，不丢弃效果、不合成为图片。选文件后会先检查当前格式的适配情况。</p>
          <p class="tool-hint">无法完整转换时会直接说明是转换器尚未适配，还是目标格式本身存在限制。没有忽略属性后强行导出的开关。检查通过仍需在目标软件中核对外观。</p>
          <div class="tool-actions"><button id="designConvert" class="btn primary" type="button" disabled>开始转换</button><button id="designCancel" class="btn secondary" type="button" hidden>取消处理</button></div>
          <p id="designStatus" class="tool-status" role="status" aria-live="polite">请先选择设计文件。</p>
          <div id="designResult" class="tool-result" hidden><strong>设计文件已生成</strong><p id="designResultInfo"></p><a id="designDownload" class="btn primary">下载设计文件</a><p class="tool-hint">请在目标软件中打开结果，检查字体、位置与复杂效果。</p></div>
          <section id="designReport" class="design-report" aria-labelledby="designReportTitle" hidden><h4 id="designReportTitle">当前文件的适配情况</h4><ul id="designIssues"></ul><p id="designNoIssues" hidden>未检测到已知不兼容项，可以开始转换。生成后仍需在目标软件中核对。</p></section>
        </div>
      </div>
      <div class="tool-notes"><strong>当前支持范围</strong><p>此版本尚未完成所有跨格式属性的适配。遇到不能等价保留的组件关联、自动布局、蒙版或特效时，不会降级为普通分组、固定位置或合成图片后导出。</p><p>字体文件不会随设计稿嵌入，目标软件需要安装原稿使用的字体。离开工具箱或退出登录会清除本次文件。</p></div>
    </section>`;
}

export function mountDesignWorkspace(root, on) {
  const $ = (id) => root.querySelector(`#${id}`);
  let worker = null, ready = false, busy = false, revision = 0, disposed = false;
  let resultURL = null, previewURL = null, timer = null, file = null;
  let compatibility = {};
  const currentIssues = () => compatibility[$("designTarget").value] || [];
  const hasBlockers = () => currentIssues().some((issue) => issue.severity !== "info");
  const size = (bytes) => bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${(bytes / 1024).toFixed(1)} KB`;
  const setStatus = (message, error = false) => { $("designStatus").textContent = message; $("designStatus").classList.toggle("is-error", error); };
  function setBusy(value) {
    busy = value;
    ["designFile", "designDrop", "designReplace", "designTarget"].forEach((id) => { $(id).disabled = value; });
    $("designConvert").disabled = value || !ready || hasBlockers();
    $("designConvert").textContent = value ? "处理中…" : ready && hasBlockers() ? "暂不支持完整转换" : "开始转换";
    $("designCancel").hidden = !value;
  }
  function clearResult() {
    if (resultURL) URL.revokeObjectURL(resultURL);
    resultURL = null;
    $("designDownload").removeAttribute("href");
    $("designResult").hidden = true;
    $("designReport").hidden = true;
  }
  function stop() { worker?.terminate(); worker = null; clearTimeout(timer); revision++; }
  function fail(message) { stop(); ready = false; setBusy(false); setStatus(message, true); }
  function watch() { clearTimeout(timer); timer = setTimeout(() => fail("处理时间过长，请按页面拆分文件后重试。"), 120000); }
  function showIssues(issues) {
    $("designIssues").replaceChildren(...issues.map((issue) => {
      const item = document.createElement("li");
      const category = issue.severity === "info" ? "说明" : issue.category === "format" ? "目标格式限制" : "转换器尚未适配";
      item.textContent = `${category}：${issue.message}（${issue.count} 项）${issue.examples.length ? ` 例如：${issue.examples.join("、")}` : ""}`;
      return item;
    }));
    $("designNoIssues").hidden = issues.length > 0;
    $("designReport").hidden = false;
  }
  function showCompatibility() {
    showIssues(currentIssues());
    setStatus(hasBlockers() ? `当前文件尚不能完整转换为 ${formatNames[$("designTarget").value]}，请查看下方适配情况。未生成不完整文件。` : "未检测到已知不兼容项，可以开始转换。");
    setBusy(false);
  }
  async function choose(nextFile) {
    if (!nextFile || busy) return;
    stop(); clearResult(); ready = false; compatibility = {};
    file = nextFile;
    $("designFile").value = "";
    if (previewURL) URL.revokeObjectURL(previewURL);
    previewURL = null;
    $("designPreview").removeAttribute("src");
    $("designPreviewBox").hidden = true;
    $("designSource").hidden = true;
    $("designDrop").hidden = false;
    setBusy(false);
    if (!/\.(fig|xd|sketch)$/i.test(file.name)) return setStatus("请选择 .fig、.sketch 或 .xd 文件。", true);
    if (!file.size) return setStatus("文件为空，请重新选择。", true);
    const job = revision;
    setBusy(true); setStatus("正在读取设计文件…"); watch();
    try {
      const buffer = await file.arrayBuffer();
      if (disposed || job !== revision) return;
      worker = new Worker(designWorkerURL);
      worker.onerror = (event) => { event.preventDefault(); fail("转换器加载失败，请刷新页面后重试。"); };
      worker.onmessage = ({ data }) => {
        if (disposed || job !== revision) return;
        if (data.type === "progress") { watch(); setStatus(data.message); }
        else if (data.type === "error") {
          if (data.code === "PRESERVATION_REQUIRED") {
            compatibility[$("designTarget").value] = data.issues || [];
            clearTimeout(timer); setBusy(false); setStatus(data.message, true); showIssues(currentIssues());
          } else fail(`无法处理：${data.message}`);
        }
        else if (data.type === "ready") {
          clearTimeout(timer); ready = true; compatibility = data.compatibility || {};
          $("designFilename").textContent = file.name;
          $("designSourceInfo").textContent = `${formatNames[data.source]} · ${size(file.size)} · ${data.stats.pages} 页 · ${data.stats.layers} 个图层 · ${data.stats.images} 张图片`;
          for (const option of $("designTarget").options) option.disabled = option.value === data.source;
          if ($("designTarget").value === data.source) $("designTarget").value = data.source === "fig" ? "sketch" : "fig";
          if (data.preview.length > 100) {
            previewURL = URL.createObjectURL(new Blob([data.preview], { type: "image/png" }));
            $("designPreview").src = previewURL; $("designPreviewBox").hidden = false;
          }
          $("designSource").hidden = false; $("designDrop").hidden = true;
          showCompatibility();
        } else if (data.type === "done") {
          clearTimeout(timer); setBusy(false);
          const blob = new Blob([data.bytes], { type: "application/octet-stream" });
          resultURL = URL.createObjectURL(blob);
          const link = $("designDownload"); link.href = resultURL; link.download = data.filename; link.textContent = `下载 ${formatNames[data.target]}`;
          $("designResultInfo").textContent = `${data.filename} · ${size(blob.size)} · ${data.stats.layers} 个源图层`;
          $("designResult").hidden = false;
          showIssues(data.issues);
          setStatus("设计文件已生成，仍需在目标软件中核对外观。");
        }
      };
      worker.postMessage({ type: "read", buffer, filename: file.name }, [buffer]);
    } catch { if (!disposed && job === revision) fail("无法读取文件，请重新选择。"); }
  }
  on($("designDrop"), "click", () => $("designFile").click());
  on($("designReplace"), "click", () => $("designFile").click());
  on($("designFile"), "change", (event) => choose(event.target.files[0]));
  on($("designWorkspace"), "dragover", (event) => { event.preventDefault(); if (!busy) $("designDrop").classList.add("is-dragging"); });
  on($("designWorkspace"), "dragleave", (event) => { if (!$("designWorkspace").contains(event.relatedTarget)) $("designDrop").classList.remove("is-dragging"); });
  on($("designWorkspace"), "drop", (event) => { event.preventDefault(); $("designDrop").classList.remove("is-dragging"); if (!busy) { if (event.dataTransfer.files.length !== 1) return setStatus("每次请选择一个设计文件。", true); choose(event.dataTransfer.files[0]); } });
  on($("designTarget"), "change", () => { clearResult(); if (ready) showCompatibility(); else setStatus("请先选择设计文件。"); });
  on($("designConvert"), "click", () => { if (!ready || busy || !worker || hasBlockers()) return; clearResult(); setBusy(true); watch(); worker.postMessage({ type: "convert", target: $("designTarget").value }); });
  on($("designCancel"), "click", () => { stop(); ready = false; setBusy(false); setStatus("已取消处理，请重新选择文件。"); });
  return () => { disposed = true; stop(); clearResult(); if (previewURL) URL.revokeObjectURL(previewURL); file = null; };
}
