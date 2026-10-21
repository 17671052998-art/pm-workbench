const FIGMA_FILES = "https://www.figma.com/files/";
const CONVERTIFY = "https://www.figma.com/community/plugin/849159306117999028/convertify-sketch-adobe-google";

const flows = {
  "sketch-figma": {
    title: "Sketch 转 Figma",
    tag: "Figma 官方导入",
    description: "将 .sketch 文件导入 Figma，生成可编辑的 Figma Design 文件。",
    steps: [
      "在 Figma 文件页登录账号，点击“创建” > “导入” > “从计算机”。",
      "选择本机 .sketch 文件，等待 Figma 完成转换。",
      "打开导入结果，检查字体、组件和样式；需要本地 .fig 文件时再从 Figma 保存本地副本。",
    ],
    launch: FIGMA_FILES,
    launchLabel: "打开 Figma 导入",
    docs: "https://help.figma.com/hc/en-us/articles/360040514273-Import-Sketch-files",
    note: "Figma 官方导入不保留 Sketch 样式；缺失字体、组件关联等可能需要手动修正。",
  },
  "xd-figma": {
    title: "XD 转 Figma",
    tag: "Figma 插件转换",
    description: "通过 Convertify 插件将 .xd 文件导入可编辑的 Figma 设计稿。",
    steps: [
      "在 Figma 中打开或新建一个有编辑权限的设计文件，并安装、运行 Convertify。",
      "选择“Import into Figma” > “Import Adobe XD to Figma”。",
      "把本机 .xd 文件拖入插件，完成后检查图层、字体和交互效果。",
    ],
    launch: CONVERTIFY,
    launchLabel: "打开 Convertify 插件",
    docs: "https://docs.hypermatic.com/convertify/import/adobe-xd",
    note: "此方向依赖第三方 Figma 插件。插件试用次数和后续收费以开发者页面为准。",
  },
  "figma-sketch": {
    title: "Figma 转 Sketch",
    tag: "Figma 插件转换",
    description: "从 Figma 页面或选定画框导出可在 Sketch 中打开的 .sketch 文件。",
    steps: [
      "打开有编辑权限的 Figma 设计文件，安装并运行 Convertify。",
      "选择“Export from Figma” > “Export Figma to Sketch”，选定页面或画框。",
      "点击导出并下载 .sketch 文件，在 Sketch 中检查组件、字体和布局。",
    ],
    launch: CONVERTIFY,
    launchLabel: "打开 Convertify 插件",
    docs: "https://docs.hypermatic.com/convertify/export/sketch",
    note: "此方向依赖第三方 Figma 插件；部分 Figma 特性在 Sketch 中没有对应能力。",
  },
  "figma-xd": {
    title: "Figma 转 XD",
    tag: "Figma 插件转换",
    description: "从 Figma 单个页面或选定画框导出可在 Adobe XD 中打开的 .xd 文件。",
    steps: [
      "打开有编辑权限的 Figma 设计文件，安装并运行 Convertify。",
      "选择“Export from Figma” > “Export Figma to Adobe XD”，选定单个页面或画框。",
      "点击导出并下载 .xd 文件，在 Adobe XD 中检查图层、字体和原型链接。",
    ],
    launch: CONVERTIFY,
    launchLabel: "打开 Convertify 插件",
    docs: "https://docs.hypermatic.com/convertify/export/adobe-xd",
    note: "Adobe XD 文件只支持单页；部分 Figma 图层属性和交互无法完整保留。此方向依赖第三方插件。",
  },
};

export function renderDesignWorkspace() {
  return `
    <section id="designWorkspace" class="panel tool-workspace design-workspace" aria-labelledby="designTitle" hidden>
      <header class="panel-head"><div class="tool-workspace-title"><button id="designToolBack" class="tool-back" type="button" aria-label="返回工具箱">←</button><div><h2 id="designTitle" tabindex="-1">设计文件互转</h2><p>在 Figma 中完成 Sketch、XD 与 Figma 的原生文件转换。</p></div></div><span class="doc-tag">设计文件</span></header>
      <div class="design-content">
        <p class="design-intro">选择转换方向，按步骤前往 Figma 操作。当前工作台不会读取、上传或直接生成这些设计文件；转换发生在 Figma 或其插件内。</p>
        <div class="design-flow-grid" role="group" aria-label="选择设计文件转换方向">
          <button type="button" data-design-flow="sketch-figma" aria-pressed="true"><strong>Sketch → Figma</strong><span>官方导入</span></button>
          <button type="button" data-design-flow="xd-figma" aria-pressed="false"><strong>XD → Figma</strong><span>插件导入</span></button>
          <button type="button" data-design-flow="figma-sketch" aria-pressed="false"><strong>Figma → Sketch</strong><span>插件导出</span></button>
          <button type="button" data-design-flow="figma-xd" aria-pressed="false"><strong>Figma → XD</strong><span>插件导出</span></button>
        </div>
        <div class="design-flow-detail">
          <span id="designFlowTag" class="badge green"></span>
          <h3 id="designFlowTitle"></h3>
          <p id="designFlowDescription"></p>
          <ol id="designFlowSteps"></ol>
          <div class="design-flow-actions"><a id="designFlowLaunch" class="btn primary" target="_blank" rel="noopener noreferrer"></a><a id="designFlowDocs" class="btn secondary" target="_blank" rel="noopener noreferrer">查看详细教程</a></div>
          <p id="designFlowNote" class="design-flow-note"></p>
        </div>
      </div>
      <div class="tool-notes"><strong>转换前请留意</strong><p>跨工具转换无法保证像素级或功能级完全一致，重要文件请保留原稿并逐页检查。Convertify 是第三方插件，可能有试用限制或收费；请在其页面确认最新条款。</p></div>
    </section>`;
}

export function mountDesignWorkspace(root, on) {
  const buttons = [...root.querySelectorAll("[data-design-flow]")];
  function selectFlow(key) {
    const flow = flows[key];
    if (!flow) return;
    buttons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.designFlow === key)));
    root.querySelector("#designFlowTag").textContent = flow.tag;
    root.querySelector("#designFlowTitle").textContent = flow.title;
    root.querySelector("#designFlowDescription").textContent = flow.description;
    root.querySelector("#designFlowSteps").replaceChildren(...flow.steps.map((step) => {
      const item = document.createElement("li");
      item.textContent = step;
      return item;
    }));
    const launch = root.querySelector("#designFlowLaunch");
    launch.href = flow.launch;
    launch.textContent = flow.launchLabel;
    root.querySelector("#designFlowDocs").href = flow.docs;
    root.querySelector("#designFlowNote").textContent = flow.note;
  }
  buttons.forEach((button) => on(button, "click", () => selectFlow(button.dataset.designFlow)));
  selectFlow("sketch-figma");
}
