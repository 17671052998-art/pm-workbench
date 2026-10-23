const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const http = require("node:http");
const { createCanvas, loadImage, ImageData } = require("@napi-rs/canvas");
const { chromium } = require("playwright");

function fixture(light = false) {
  const canvas = createCanvas(720, 200), ctx = canvas.getContext("2d");
  ctx.fillStyle = light ? "#fff" : "#101010"; ctx.fillRect(0, 0, 720, 200);
  ctx.fillStyle = light ? "#000" : "#fff"; ctx.font = "26px Arial"; ctx.fillText("Read the passage and the poem.", 18, 42);
  for (const x of [80, 330, 580]) {
    ctx.save(); ctx.translate(x, 155); ctx.rotate(-0.32); ctx.fillStyle = light ? "#ddd" : "#333"; ctx.font = "15px Arial";
    ctx.fillText("SAMPLE", 0, 0); ctx.fillText("MARK", 0, 17); ctx.restore();
  }
  return { canvas, image: ctx.getImageData(0, 0, 720, 200) };
}

async function unit() {
  const { detectWatermarks, repairWatermarks } = await import("../src/watermark-core.mjs");
  for (const light of [false, true]) {
    const { image } = fixture(light), original = image.data.slice();
    const analysis = detectWatermarks(image);
    assert.ok(analysis.regions.length >= 3, `repeated stamps should be found on ${light ? "white" : "black"} background`);
    const result = repairWatermarks(image, analysis, analysis.regions.map((r) => r.id));
    assert.deepEqual(image.data, original, "source pixels must never be mutated");
    for (let y = 0; y < 70; y++) assert.deepEqual(result.data.subarray(y * 720 * 4, (y + 1) * 720 * 4), original.subarray(y * 720 * 4, (y + 1) * 720 * 4), "original heading and its antialiasing remain intact");
    const background = light ? 255 : 16;
    let residual = 0;
    for (let y = 90; y < 185; y++) for (let x = 20; x < 700; x++) if (Math.abs(result.data[(y * 720 + x) * 4] - background) > 4) residual++;
    assert.ok(residual < 40, `watermark residual pixels: ${residual}`);
    const one = repairWatermarks(image, analysis, [analysis.regions[0].id]);
    for (let i = 0; i < analysis.labels.length; i++) if (analysis.labels[i] !== analysis.regions[0].id) assert.deepEqual(one.data.subarray(i * 4, i * 4 + 4), original.subarray(i * 4, i * 4 + 4), "unselected regions remain unchanged");
    assert.throws(() => repairWatermarks(image, analysis), /勾选/);
    assert.throws(() => repairWatermarks(image, analysis, [], [{ x: 0, y: 0, width: 720, height: 200 }]), /覆盖过多/);
  }
  const canvas = createCanvas(80, 40), ctx = canvas.getContext("2d");
  for (let x = 0; x < 80; x++) { ctx.fillStyle = `rgb(${x + 40},${x + 55},${x + 70})`; ctx.fillRect(x, 0, 1, 40); }
  ctx.fillStyle = "#f00"; ctx.fillRect(30, 10, 12, 14);
  const image = ctx.getImageData(0, 0, 80, 40), analysis = detectWatermarks(image);
  const repaired = repairWatermarks(image, analysis, [], [{ x: 30, y: 10, width: 12, height: 14 }]);
  assert.ok(Math.abs(repaired.data[(17 * 80 + 36) * 4] - 76) < 15, "manual repair interpolates neighboring background");
  assert.equal(repaired.data[(17 * 80 + 36) * 4 + 3], 255);
  assert.deepEqual(repaired.data.subarray(0, 80 * 4), image.data.subarray(0, 80 * 4));
  ctx.clearRect(0, 0, 80, 40);
  const transparent = ctx.getImageData(0, 0, 80, 40);
  assert.equal(detectWatermarks(transparent).regions.length, 0);
  assert.throws(() => detectWatermarks({ width: 80, height: 40, data: new Uint8Array(8) }), /尺寸无效/);
  assert.throws(() => repairWatermarks(image, analysis, [], [{ x: NaN, y: 0, width: 8, height: 8 }]), /选区无效/);
  console.log("PASS: repeated faint text detection on dark/light backgrounds, exact heading protection, independent selections, manual background repair, alpha preservation, immutable originals and safety validation.");
}

async function browserTest() {
  const project = path.resolve(__dirname, ".."), server = http.createServer(async (req, res) => {
    try {
      const pathname = new URL(req.url, "http://localhost").pathname;
      if (!pathname.startsWith("/pm-workbench/")) throw new Error("404");
      if (pathname.endsWith("/auth-config.js")) { res.writeHead(200, { "Content-Type": "application/javascript" }); res.end('window.OrbitAuthConfig={mode:"local",apiBase:""};'); return; }
      const file = path.resolve(project, pathname.slice(14) || "index.html");
      if (!file.startsWith(project + path.sep)) throw new Error("404");
      res.writeHead(200, { "Content-Type": ({ ".html": "text/html", ".js": "application/javascript", ".css": "text/css" })[path.extname(file)] || "application/octet-stream" }); res.end(await fs.readFile(file));
    } catch { res.writeHead(404); res.end(); }
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1050 }, acceptDownloads: true });
    const errors = [], writes = [];
    page.on("pageerror", (error) => errors.push(error.message)); page.on("request", (request) => { if (["POST", "PUT"].includes(request.method())) writes.push(request.url()); });
    await page.route("https://**/*", (route) => route.abort());
    await page.goto(`http://127.0.0.1:${server.address().port}/pm-workbench/`);
    await page.locator("#loginUsername").fill("admin"); await page.locator("#loginPassword").fill("admin"); await page.locator("#loginForm").evaluate((form) => form.requestSubmit());
    await page.locator("#appShell").waitFor({ state: "visible" }); await page.locator('[data-page="tools"]').click();
    assert.equal(await page.locator(".tool-card").count(), 4); await page.locator("#wmToolOpen").click();
    assert.equal(await page.locator("#wmWorkspace").isVisible(), true); assert.equal(await page.locator("#wmRepair").isDisabled(), true);
    const sample = fixture(), png = await sample.canvas.encode("png");
    const upload = () => page.locator("#wmFile").setInputFiles({ name: "sample.png", mimeType: "image/png", buffer: png });
    await upload(); await page.waitForFunction(() => !document.querySelector("#wmRepair").disabled);
    assert.ok(await page.locator("#wmRegionList input").count() >= 3);
    await page.screenshot({ path: "/tmp/pm-workbench-watermark-regions.png", fullPage: true });
    await page.locator("#wmRepair").click(); await page.locator("#wmDownload").waitFor({ state: "visible" });
    const downloadPromise = page.waitForEvent("download"); await page.locator("#wmDownload").click(); const download = await downloadPromise;
    assert.match(download.suggestedFilename(), /sample-去水印\.png/);
    const image = await loadImage(await fs.readFile(await download.path()));
    assert.equal(image.width, 720); assert.equal(image.height, 200);
    const c = createCanvas(720, 200), context = c.getContext("2d"); context.drawImage(image, 0, 0);
    const exported = context.getImageData(0, 0, 720, 200);
    assert.deepEqual(exported.data.subarray(0, 70 * 720 * 4), sample.image.data.subarray(0, 70 * 720 * 4));
    await page.screenshot({ path: "/tmp/pm-workbench-watermark-result.png", fullPage: true });
    await page.locator("#wmView").selectOption("original");
    assert.equal(await page.locator("#wmCanvas").evaluate((canvas) => canvas.getContext("2d").getImageData(0, 0, 1, 1).data[0]), 16);
    await page.locator("#wmRegionList input").first().uncheck(); assert.equal(await page.locator("#wmDownload").isVisible(), false);
    await page.locator("#wmNone").click(); assert.equal(await page.locator("#wmRepair").isDisabled(), true);
    await page.locator(".wm-coordinates summary").click();
    for (const [id, value] of [["wmX", 80], ["wmY", 135], ["wmWidth", 60], ["wmHeight", 45]]) await page.locator(`#${id}`).fill(String(value));
    await page.locator("#wmAddRect").click(); assert.equal(await page.locator("[data-wm-remove]").count(), 1);
    await page.locator("#wmZoom").selectOption("2"); await page.locator("#wmManual").click();
    const bounds = await page.locator("#wmOverlay").boundingBox();
    await page.mouse.move(bounds.x + 25, bounds.y + 25); await page.mouse.down(); await page.mouse.move(bounds.x + 80, bounds.y + 60); await page.mouse.up();
    assert.equal(await page.locator("[data-wm-remove]").count(), 2);
    await page.locator("[data-wm-remove]").last().click();
    await page.locator("#wmRepair").click(); await page.locator("#wmDownload").waitFor({ state: "visible" });
    await page.locator("#wmUndo").click(); assert.equal(await page.locator("#wmDownload").isVisible(), false);
    await page.locator("#wmStrength").evaluate((input) => { input.value = "65"; input.dispatchEvent(new Event("change", { bubbles: true })); });
    assert.equal(await page.locator("#wmRepair").isDisabled(), true); assert.equal(await page.locator("#wmRegionList input").count(), 0);
    await page.locator("#wmAnalyze").click(); await page.waitForFunction(() => !document.querySelector("#wmRepair").disabled);
    await page.locator("#wmBack").click(); assert.equal(await page.locator("#toolCatalog").isVisible(), true); await page.locator("#wmToolOpen").click();
    await page.locator("#wmFile").setInputFiles({ name: "bad.png", mimeType: "image/png", buffer: Buffer.from("broken") }); await page.waitForFunction(() => document.querySelector("#wmStatus").classList.contains("is-error"));
    assert.equal(await page.locator("#wmDownload").isVisible(), false); assert.equal(await page.locator("#wmRepair").isDisabled(), true);
    await page.locator("#wmFile").setInputFiles({ name: "animation.gif", mimeType: "image/gif", buffer: Buffer.from("GIF89a") }); assert.match(await page.locator("#wmStatus").textContent(), /静态/);
    await page.locator("#wmFile").setInputFiles({ name: "large.png", mimeType: "image/png", buffer: Buffer.alloc(40 * 1024 * 1024 + 1) }); assert.match(await page.locator("#wmStatus").textContent(), /40 MB/);
    const wide = createCanvas(8193, 1);
    await page.locator("#wmFile").setInputFiles({ name: "wide.png", mimeType: "image/png", buffer: await wide.encode("png") });
    await page.waitForFunction(() => document.querySelector("#wmStatus").textContent.includes("8192"));
    let holdWorker;
    const held = new Promise((resolve) => { holdWorker = resolve; });
    await page.route("**/watermark-worker.js?*", async (route) => { await held; await route.continue().catch(() => {}); });
    await upload(); await page.locator("#wmCancel").waitFor({ state: "visible" }); await page.locator("#wmCancel").click();
    assert.match(await page.locator("#wmStatus").textContent(), /已取消/); assert.equal(await page.locator("#wmRepair").isDisabled(), true);
    holdWorker(); await page.unroute("**/watermark-worker.js?*");
    await upload(); await page.waitForFunction(() => !document.querySelector("#wmRepair").disabled);
    await page.locator('[data-page="dashboard"]').click(); await page.locator('[data-page="tools"]').click(); await page.locator("#wmToolOpen").click();
    assert.equal(await page.locator("#wmRepair").isDisabled(), true); assert.equal(await page.locator("#wmPreview").isVisible(), false);
    assert.deepEqual(errors, []); assert.deepEqual(writes, []);
    console.log("PASS: toolbox navigation, actual local worker recognition/repair and PNG download, original comparison, manual selection at 200% zoom, selection invalidation, corrupt/animated rejection, cleanup and no image uploads.");
  } finally { await browser.close(); await new Promise((resolve) => server.close(resolve)); }
}

unit().then(browserTest).catch((error) => { console.error(error); process.exitCode = 1; });
