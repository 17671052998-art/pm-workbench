const icon = (name) => `<svg aria-hidden="true"><use href="#i-${name}"></use></svg>`;

const docRow = (type, title, subtitle, tag, time) => `
  <div class="doc-row searchable">
    <div class="doc-title">
      <span class="doc-type ${type}">${icon("file")}</span>
      <div><strong>${title}</strong><small>${subtitle}</small></div>
    </div>
    <span class="doc-tag">${tag}</span><span>${time}</span>
    <button class="row-action" aria-label="更多操作">${icon("more")}</button>
  </div>`;

const mockPreview = (version = "V2.4") => `
  <div class="mock-preview">
    <div class="mock-browser">
      <div class="mock-bar"><span></span><span></span><span></span></div>
      <div class="mock-body"><div class="mock-sidebar"></div><div class="mock-content"><div class="mock-cover"></div><div class="mock-lines"><i></i><i></i><i></i><i></i></div></div></div>
    </div>
    <span class="version-pill">${version}</span>
  </div>`;

const dashboardPage = () => `
  <header class="page-head">
    <div><h1 class="page-title">上午好，林晓</h1><p class="page-subtitle">今天有 3 个产品事项等待你推进，保持节奏。</p></div>
    <button class="btn primary create-btn">${icon("plus")} 新建内容</button>
  </header>
  <section class="stats-grid">
    <article class="stat-card"><span class="stat-icon purple">${icon("layout")}</span><div><small>产品原型</small><div class="stat-number">${getPrototypeCount()}</div></div><em>+ 2 本周</em></article>
    <article class="stat-card"><span class="stat-icon blue">${icon("file")}</span><div><small>产品文档</small><div class="stat-number">38</div></div><em>+ 6 本周</em></article>
    <article class="stat-card"><span class="stat-icon orange">${icon("cycle")}</span><div><small>进行中迭代</small><div class="stat-number">3</div></div><em>68% 完成</em></article>
  </section>
  <section class="dashboard-grid">
    <div class="content-stack">
      <section class="panel">
        <header class="panel-head"><div><h2>最近原型</h2><p>OneBank App · 核心链路重构</p></div><button class="text-btn" data-jump="prototype">查看全部 ${icon("arrow")}</button></header>
        <div class="prototype-feature">
          ${mockPreview()}
          <div class="prototype-info">
            <span class="badge green">评审通过</span>
            <h3>新用户开户流程优化</h3>
            <p>调整实名认证、绑卡及开户完成页的信息层级</p>
            <div class="meta-row"><div class="avatar-group"><span class="avatar small">林</span><span class="avatar small">周</span><span class="avatar small">陈</span></div><span>3 人协作</span><i class="dot-sep"></i><span>今天 09:45 更新</span></div>
          </div>
        </div>
      </section>
      <section class="panel">
        <header class="panel-head"><div><h2>最近文档</h2><p>快速继续你的产品思考</p></div><button class="text-btn" data-jump="document">查看全部 ${icon("arrow")}</button></header>
        <div class="document-list">
          ${docRow("prd","开户流程优化 PRD","林晓 · OneBank App","需求文档","今天 10:24")}
          ${docRow("research","年轻用户理财偏好调研","陈晨 · 增长实验室","用户研究","昨天 17:30")}
          ${docRow("note","V3.2 版本评审纪要","周野 · OneBank App","会议纪要","05 月 29 日")}
        </div>
      </section>
      <section class="panel">
        <header class="panel-head"><div><h2>当前迭代</h2><p>OneBank App · Sprint 24</p></div><button class="text-btn" data-jump="iteration">进入迭代 ${icon("arrow")}</button></header>
        <div class="sprint-content">
          <div class="sprint-progress"><small>整体进度</small><strong>68%</strong><div class="progress-track"><span></span></div><div class="progress-note"><span>已完成 17</span><span>共 25 项</span></div></div>
          <div class="work-breakdown">
            <div class="work-item"><small>待处理</small><strong>4</strong></div><div class="work-item"><small>开发中</small><strong>3</strong></div><div class="work-item"><small>待验收</small><strong>1</strong></div><div class="work-item"><small>已完成</small><strong>17</strong></div>
          </div>
        </div>
      </section>
    </div>
    <aside class="side-stack">
      <section class="panel">
        <header class="panel-head"><div><h2>团队动态</h2><p>与你相关的最近更新</p></div></header>
        <div class="activity-list">
          <div class="activity-item"><span class="avatar">周</span><div><p><strong>周野</strong> 在开户流程原型中回复了你</p><small>14 分钟前</small></div></div>
          <div class="activity-item"><span class="avatar">陈</span><div><p><strong>陈晨</strong> 更新了用户研究结论</p><small>1 小时前</small></div></div>
          <div class="activity-item"><span class="avatar">许</span><div><p><strong>许宁</strong> 完成任务「接入 OCR 识别」</p><small>2 小时前</small></div></div>
          <div class="activity-item"><span class="avatar">安</span><div><p><strong>安然</strong> 提交了 V3.2 验收反馈</p><small>昨天 18:42</small></div></div>
        </div>
      </section>
      <section class="panel">
        <header class="panel-head"><div><h2>近期日程</h2><p>下一个关键节点</p></div></header>
        <div class="agenda-list">
          <div class="agenda-item"><div class="agenda-date"><small>周二</small>02</div><div><strong>开户流程需求终审</strong><p>14:00 · 会议室 3A</p></div></div>
          <div class="agenda-item"><div class="agenda-date"><small>周四</small>04</div><div><strong>Sprint 24 版本验收</strong><p>10:30 · 线上会议</p></div></div>
        </div>
      </section>
    </aside>
  </section>`;

const defaultPrototypeCards = [
  ["新用户开户流程优化","实名认证、绑卡及开户完成页优化","V2.4","green","评审通过","今天 09:45",true],
  ["理财产品详情页改版","收益展示与风险提示信息重构","V1.8","orange","评审中","昨天 16:20",true],
  ["转账结果页体验优化","补充电子回单和分享路径","V1.2","gray","草稿","05 月 28 日",false],
  ["首页资产卡片升级","多账户资产概览及快捷入口","V3.1","green","已上线","05 月 26 日",false],
  ["消息中心重构","通知分类、批量操作和消息设置","V1.0","gray","草稿","05 月 24 日",false],
  ["信用卡还款提醒","自动还款签约与提醒设置流程","V2.0","orange","评审中","05 月 21 日",false],
];
const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);
const getCreatedPrototypeCards = () => {
  try {
    return JSON.parse(localStorage.getItem("orbit-created-prototypes") || "[]");
  } catch {
    return [];
  }
};
const getPrototypeCards = () => [...getCreatedPrototypeCards(), ...defaultPrototypeCards];
const getPrototypeCount = () => 12 + getCreatedPrototypeCards().length;
const getPrototypeDraftCount = () => 3 + getCreatedPrototypeCards().length;
const savePrototypeCard = (card) => localStorage.setItem("orbit-created-prototypes", JSON.stringify([card, ...getCreatedPrototypeCards()]));

const prototypePage = () => `
  <header class="page-head"><div><h1 class="page-title">产品原型</h1><p class="page-subtitle">集中管理产品方案、版本状态和评审协作。</p></div><button class="btn primary create-btn">${icon("plus")} 新建原型文档</button></header>
  <div class="toolbar">
    <label class="toolbar-search">${icon("search")}<input class="module-search" type="search" placeholder="搜索原型名称" /></label>
    <button class="btn secondary">${icon("filter")} 筛选</button><div class="toolbar-spacer"></div>
    <button class="view-btn active" aria-label="卡片视图">${icon("card")}</button><button class="view-btn" aria-label="列表视图">${icon("list")}</button>
  </div>
  <div class="filter-tabs"><button class="filter-chip active">全部 ${getPrototypeCount()}</button><button class="filter-chip">草稿 ${getPrototypeDraftCount()}</button><button class="filter-chip">评审中 4</button><button class="filter-chip">已完成 5</button></div>
  <section class="prototype-grid">${getPrototypeCards().map(([title,desc,version,color,state,time,star]) => `
    <article class="prototype-card searchable">${mockPreview(escapeHTML(version))}<div class="prototype-card-body"><div class="card-title-row"><h3>${escapeHTML(title)}</h3><button class="star ${star ? "active" : ""}" aria-label="收藏">${icon("star")}</button></div><p>${escapeHTML(desc)}</p><footer class="card-footer"><span class="badge ${color}">${state}</span><span>${time}</span></footer></div></article>`).join("")}</section>
  <div class="empty-state"><strong>没有找到相关原型</strong><span>试试其他关键词。</span></div>`;

const documents = [
  ["prd","开户流程优化 PRD","OneBank App","需求文档","林","林晓","评审中","review","今天 10:24"],
  ["research","年轻用户理财偏好调研","增长实验室","用户研究","陈","陈晨","已完成","done","昨天 17:30"],
  ["note","V3.2 版本评审纪要","OneBank App","会议纪要","周","周野","已完成","done","05 月 29 日"],
  ["prd","首页资产卡片升级说明","OneBank App","需求文档","林","林晓","草稿","draft","05 月 28 日"],
  ["research","开户漏斗数据分析","数据中台","数据分析","安","安然","已完成","done","05 月 26 日"],
  ["note","OCR 能力接入方案","OneBank App","技术方案","许","许宁","评审中","review","05 月 24 日"],
];
const documentPage = () => `
  <header class="page-head"><div><h1 class="page-title">产品文档</h1><p class="page-subtitle">沉淀需求、调研与决策，让产品上下文持续可用。</p></div><button class="btn primary create-btn">${icon("plus")} 新建文档</button></header>
  <div class="toolbar">
    <label class="toolbar-search">${icon("search")}<input class="module-search" type="search" placeholder="搜索文档名称" /></label>
    <button class="btn secondary">${icon("filter")} 类型筛选</button><button class="btn secondary">${icon("calendar")} 更新时间</button>
    <div class="toolbar-spacer"></div><button class="btn secondary">${icon("upload")} 导入文档</button>
  </div>
  <div class="filter-tabs"><button class="filter-chip active">全部 38</button><button class="filter-chip">需求文档 15</button><button class="filter-chip">用户研究 8</button><button class="filter-chip">会议纪要 11</button><button class="filter-chip">其他 4</button></div>
  <section class="data-panel">
    <table class="data-table"><thead><tr><th>文档名称</th><th>类型</th><th>负责人</th><th>状态</th><th>更新时间</th><th></th></tr></thead>
      <tbody>${documents.map(([type,title,space,kind,avatar,owner,status,statusClass,time]) => `<tr class="searchable"><td><div class="doc-title"><span class="doc-type ${type}">${icon("file")}</span><div><strong>${title}</strong><small>${space}</small></div></div></td><td>${kind}</td><td><span class="owner"><span class="avatar">${avatar}</span>${owner}</span></td><td><span class="status-tag ${statusClass}">${status}</span></td><td>${time}</td><td><button class="row-action" aria-label="更多操作">${icon("more")}</button></td></tr>`).join("")}</tbody>
    </table>
    <div class="empty-state"><strong>没有找到相关文档</strong><span>试试其他关键词。</span></div>
  </section>`;

const tasks = [
  ["todo","补充开户失败场景文案","需求 · ONB-242","林","high"],
  ["todo","梳理 OCR 识别异常码","需求 · ONB-246","周",""],
  ["dev","接入身份证 OCR 识别","研发 · ONB-238","许","high"],
  ["dev","调整开户完成页布局","研发 · ONB-241","赵",""],
  ["dev","补充埋点事件上报","研发 · ONB-245","安","low"],
  ["test","实名结果页验收","验收 · ONB-234","林",""],
  ["done","完成银行卡选择器","需求 · ONB-229","陈","low"],
  ["done","统一开户页顶部导航","研发 · ONB-230","赵",""],
];
const taskCard = ([,title,meta,avatar,priority]) => `<article class="task-card searchable"><p>${title}</p><small>${meta}</small><footer class="task-footer"><span class="avatar">${avatar}</span><i class="priority ${priority}"></i></footer></article>`;
const iterationPage = () => `
  <header class="page-head"><div><h1 class="page-title">迭代管理</h1><p class="page-subtitle">追踪版本节奏、事项状态和关键交付节点。</p></div><button class="btn primary create-btn">${icon("plus")} 新建迭代</button></header>
  <section class="sprint-banner"><div><h2>Sprint 24 · 开户体验优化</h2><p>05 月 25 日 - 06 月 05 日 · 还有 4 天结束</p></div><div class="progress-track"><span></span></div><strong>68%</strong><button class="btn secondary">迭代设置</button></section>
  <div class="toolbar"><label class="toolbar-search">${icon("search")}<input class="module-search" type="search" placeholder="搜索迭代事项" /></label><button class="btn secondary">${icon("filter")} 筛选</button><div class="toolbar-spacer"></div><button class="btn secondary">${icon("calendar")} 版本时间线</button></div>
  <section class="kanban">
    ${[["待处理","todo"],["开发中","dev"],["待验收","test"],["已完成","done"]].map(([name,key]) => {
      const list = tasks.filter((task) => task[0] === key);
      return `<div class="kanban-col"><header class="kanban-head"><strong>${name}</strong><span>${list.length}</span></header>${list.map(taskCard).join("")}</div>`;
    }).join("")}
  </section>
  <div class="empty-state"><strong>没有找到相关事项</strong><span>试试其他关键词。</span></div>`;

const pages = {
  dashboard: { title: "工作台", render: dashboardPage },
  prototype: { title: "产品原型", render: prototypePage },
  document: { title: "产品文档", render: documentPage },
  iteration: { title: "迭代管理", render: iterationPage },
  tools: { title: "工具箱", render: () => window.OrbitTools.render() },
};

let currentPage = "dashboard";
const root = document.querySelector("#pageRoot");
const crumb = document.querySelector("#crumbTitle");
const modal = document.querySelector("#modalBackdrop");
const modalTitle = document.querySelector("#modalTitle");
const modalDescription = document.querySelector("#modalDescription");
const createName = document.querySelector("#createName");
const createDescription = document.querySelector("#createDescription");
const createVersion = document.querySelector("#createVersion");
const prototypeFormFields = document.querySelector("#prototypeFormFields");
const toast = document.querySelector("#toast");
const loginView = document.querySelector("#loginView");
const appShell = document.querySelector("#appShell");
const loginForm = document.querySelector("#loginForm");
const loginUsername = document.querySelector("#loginUsername");
const loginPassword = document.querySelector("#loginPassword");
const loginError = document.querySelector("#loginError");
const rememberLogin = document.querySelector("#rememberLogin");

function showLogin() {
  window.OrbitTools.dispose();
  loginView.classList.remove("auth-hidden");
  appShell.classList.add("auth-hidden");
  loginPassword.value = "";
  loginError.textContent = "";
  setTimeout(() => loginUsername.focus(), 50);
}

function showWorkbench() {
  loginView.classList.add("auth-hidden");
  appShell.classList.remove("auth-hidden");
  render("dashboard");
}

function render(page) {
  window.OrbitTools.dispose();
  currentPage = page;
  root.innerHTML = pages[page].render();
  if (page === "tools") window.OrbitTools.mount(root);
  crumb.textContent = pages[page].title;
  document.querySelector('.nav-item[data-page="prototype"] b').textContent = getPrototypeCount();
  document.querySelectorAll(".nav-item[data-page]").forEach((item) => item.classList.toggle("active", item.dataset.page === page));
  root.scrollTop = 0;
}

function openModal() {
  const copy = {
    dashboard: ["新建内容", "选择你想要沉淀的产品内容，从一个清晰的名称开始。"],
    prototype: ["新建原型文档", "创建原型文档，后续可持续补充方案并关联评审状态。"],
    document: ["新建产品文档", "创建文档并持续沉淀产品决策上下文。"],
    iteration: ["新建产品迭代", "定义迭代目标和时间范围，开始推进事项。"],
  };
  [modalTitle.textContent, modalDescription.textContent] = copy[currentPage];
  createName.value = "";
  createDescription.value = "";
  createVersion.value = "V1.0";
  prototypeFormFields.classList.toggle("auth-hidden", currentPage !== "prototype");
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  setTimeout(() => createName.focus(), 50);
}
function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}
function showToast(message) {
  toast.querySelector("span").textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}
function runSearch(value) {
  const query = value.trim().toLowerCase();
  const items = [...root.querySelectorAll(".searchable")];
  let visible = 0;
  items.forEach((item) => {
    const hit = !query || item.textContent.toLowerCase().includes(query);
    item.style.display = hit ? "" : "none";
    if (hit) visible += 1;
  });
  const empty = root.querySelector(".empty-state");
  if (empty) empty.style.display = visible ? "none" : "block";
}

document.addEventListener("click", (event) => {
  const nav = event.target.closest("[data-page]");
  const jump = event.target.closest("[data-jump]");
  if (nav) render(nav.dataset.page);
  if (jump) render(jump.dataset.jump);
  if (event.target.closest(".create-btn")) openModal();
  const star = event.target.closest(".star");
  if (star) {
    star.classList.toggle("active");
    showToast(star.classList.contains("active") ? "已加入收藏" : "已取消收藏");
  }
  const chip = event.target.closest(".filter-chip");
  if (chip) {
    chip.parentElement.querySelectorAll(".filter-chip").forEach((item) => item.classList.remove("active"));
    chip.classList.add("active");
  }
});

document.addEventListener("input", (event) => {
  if (event.target.matches(".module-search")) runSearch(event.target.value);
});

document.querySelector("#modalClose").addEventListener("click", closeModal);
document.querySelector("#modalCancel").addEventListener("click", closeModal);
document.querySelector("#modalConfirm").addEventListener("click", () => {
  if (!createName.value.trim()) {
    createName.focus();
    createName.style.borderColor = "#e76d76";
    return;
  }
  createName.style.borderColor = "";
  if (currentPage === "prototype") {
    savePrototypeCard([
      createName.value.trim(),
      createDescription.value.trim() || "暂未补充原型文档说明",
      createVersion.value.trim() || "V1.0",
      "gray",
      "草稿",
      "刚刚创建",
      false,
    ]);
    render("prototype");
  }
  closeModal();
  showToast(`${createName.value.trim()} 创建成功`);
});
modal.addEventListener("click", (event) => { if (event.target === modal) closeModal(); });
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    document.querySelector("#globalSearch").focus();
  }
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (loginUsername.value.trim() === "admin" && loginPassword.value === "admin") {
    if (rememberLogin.checked) localStorage.setItem("orbit-authenticated", "true");
    else sessionStorage.setItem("orbit-authenticated", "true");
    showWorkbench();
    showToast("管理员登录成功");
    return;
  }
  loginError.textContent = "账号或密码错误，请重新输入。";
  loginPassword.focus();
});

document.querySelector("#passwordToggle").addEventListener("click", (event) => {
  const showPassword = loginPassword.type === "password";
  loginPassword.type = showPassword ? "text" : "password";
  event.currentTarget.textContent = showPassword ? "隐藏" : "显示";
});

document.querySelector("#logoutButton").addEventListener("click", () => {
  localStorage.removeItem("orbit-authenticated");
  sessionStorage.removeItem("orbit-authenticated");
  showLogin();
});

if (localStorage.getItem("orbit-authenticated") === "true" || sessionStorage.getItem("orbit-authenticated") === "true") {
  showWorkbench();
} else {
  showLogin();
}
