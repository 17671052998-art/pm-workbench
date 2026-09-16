const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const http = require("node:http");
const path = require("node:path");
const { chromium } = require("playwright");

async function main() {
  const project = path.resolve(__dirname, "..");
  const server = http.createServer(async (request, response) => {
    try {
      const pathname = new URL(request.url, "http://localhost").pathname;
      if (!pathname.startsWith("/pm-workbench/")) throw new Error("Not found");
      const filename = path.resolve(project, pathname.slice("/pm-workbench/".length) || "index.html");
      if (!filename.startsWith(project + path.sep)) throw new Error("Not found");
      const types = { ".html": "text/html", ".js": "application/javascript", ".css": "text/css" };
      response.writeHead(200, { "Content-Type": types[path.extname(filename)] || "application/octet-stream" });
      response.end(await fs.readFile(filename));
    } catch {
      response.writeHead(404);
      response.end();
    }
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  let browser;
  try {
    browser = await chromium.launch({ channel: "chrome", headless: true });
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, acceptDownloads: true });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.route("https://fonts.**/*", (route) => route.abort());
    await page.goto(`http://127.0.0.1:${server.address().port}/pm-workbench/`);
    await page.locator("#loginUsername").fill("admin");
    await page.locator("#loginPassword").fill("admin");
    await page.locator("#loginForm").evaluate((form) => form.requestSubmit());
    await page.locator('[data-page="tools"]').click();
    assert.equal(await page.locator("#bgWorkspace").isVisible(), false);
    assert.equal(await page.locator(".tool-card").count(), 2);
    await page.screenshot({ path: "/tmp/pm-workbench-tool-catalog.png", fullPage: true });
    await page.locator("#bgToolOpen").click();
    assert.equal(await page.locator("#bgWorkspace").isVisible(), true);
    const imageBase64 = await page.evaluate(() => {
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 100;
      const context = canvas.getContext("2d");
      context.fillStyle = "#fff";
      context.fillRect(0, 0, 100, 100);
      context.fillStyle = "#e02040";
      context.fillRect(30, 30, 40, 40);
      return canvas.toDataURL("image/png").split(",")[1];
    });
    await page.locator("#bgFile").setInputFiles({ name: "subject.png", mimeType: "image/png", buffer: Buffer.from(imageBase64, "base64") });
    await page.waitForFunction(() => document.querySelector("#bgStatus").textContent.includes("已移除"));
    const pixel = (x, y) => page.locator("#bgCanvas").evaluate((canvas, point) => Array.from(canvas.getContext("2d").getImageData(point.x, point.y, 1, 1).data), { x, y });
    assert.equal((await pixel(5, 5))[3], 0);
    assert.deepEqual(await pixel(50, 50), [224, 32, 64, 255]);
    await page.locator("#bgUndo").click();
    assert.equal((await pixel(5, 5))[3], 255);
    await page.locator("#bgAuto").click();
    assert.equal((await pixel(5, 5))[3], 0);

    await page.locator("#bgReset").click();
    await page.locator("#bgIntentInput").fill("去掉人物");
    await page.locator("#bgAnalyzeIntent").click();
    assert.match(await page.locator("#bgIntentError").textContent(), /无法可靠定位/);
    assert.equal(await page.locator("#bgIntentPlan").isVisible(), false);
    assert.equal((await pixel(50, 50))[3], 255);
    await page.locator("#bgIntentInput").fill("我想保留左边的白色背景");
    await page.locator("#bgAnalyzeIntent").click();
    assert.equal(await page.locator("#bgIntentPlan").isVisible(), false);
    await page.locator("#bgIntentInput").fill("不要去掉白色背景");
    await page.locator("#bgAnalyzeIntent").click();
    assert.equal(await page.locator("#bgIntentPlan").isVisible(), false);
    await page.locator("#bgIntentInput").fill("去掉人物后面的背景");
    await page.locator("#bgAnalyzeIntent").click();
    assert.match(await page.locator("#bgIntentError").textContent(), /无法可靠定位/);
    await page.locator("#bgIntentInput").fill("去掉左侧 101%");
    await page.locator("#bgAnalyzeIntent").click();
    assert.match(await page.locator("#bgIntentError").textContent(), /1%-100%/);
    await page.locator("#bgIntentInput").fill("保留人物，去掉白色背景");
    await page.locator("#bgAnalyzeIntent").click();
    assert.match(await page.locator("#bgIntentWarning").textContent(), /语义识别/);
    assert.equal(await page.locator("#bgIntentSteps li").count(), 1);

    await page.locator("#bgIntentInput").fill("去掉白色背景，然后擦除左侧 40%");
    await page.locator("#bgAnalyzeIntent").click();
    assert.equal(await page.locator("#bgIntentSteps li").count(), 2);
    assert.match(await page.locator("#bgIntentSteps").textContent(), /左侧40%/);
    assert.match(await page.locator("#bgIntentSteps").textContent(), /预计覆盖/);
    assert.ok(await page.locator("#bgOverlay").evaluate((canvas) => canvas.getContext("2d").getImageData(5, 5, 1, 1).data[3]) > 0);
    await page.screenshot({ path: "/tmp/pm-workbench-background-intent-plan.png", fullPage: true });
    await page.locator("#bgExecuteIntent").click();
    assert.equal(await page.locator("#bgOverlay").evaluate((canvas) => canvas.getContext("2d").getImageData(5, 5, 1, 1).data[3]), 0);
    assert.equal((await pixel(5, 5))[3], 0);
    assert.equal((await pixel(35, 50))[3], 0);
    assert.equal((await pixel(50, 50))[3], 255);
    await page.locator("#bgUndo").click();
    assert.equal((await pixel(5, 5))[3], 255);
    assert.equal((await pixel(35, 50))[3], 255);

    await page.locator("#bgIntentInput").fill("去掉左上角白色区域");
    await page.locator("#bgAnalyzeIntent").click();
    await page.locator("#bgExecuteIntent").click();
    assert.equal((await pixel(5, 5))[3], 0);
    assert.equal((await pixel(95, 5))[3], 255);
    assert.equal((await pixel(50, 50))[3], 255);
    await page.locator("#bgReset").click();
    await page.locator("#bgAuto").click();
    await page.locator("#bgIntentInput").fill("恢复左侧 20%");
    await page.locator("#bgAnalyzeIntent").click();
    await page.locator("#bgExecuteIntent").click();
    assert.equal((await pixel(5, 5))[3], 255);
    await page.locator("#bgUndo").click();
    assert.equal((await pixel(5, 5))[3], 0);

    const overlay = await page.locator("#bgOverlay").boundingBox();
    const at = (x, y) => ({ x: overlay.x + overlay.width * x / 100, y: overlay.y + overlay.height * y / 100 });
    await page.locator('[data-bg-mode="restore"]').click();
    await page.mouse.move(at(10, 10).x, at(10, 10).y);
    await page.mouse.down();
    await page.mouse.move(at(18, 10).x, at(18, 10).y);
    await page.mouse.up();
    assert.equal((await pixel(10, 10))[3], 255);

    await page.locator('[data-bg-mode="erase"]').click();
    await page.mouse.move(at(50, 50).x, at(50, 50).y);
    await page.mouse.down();
    await page.mouse.up();
    assert.equal((await pixel(50, 50))[3], 0);
    await page.locator("#bgUndo").click();
    assert.equal((await pixel(50, 50))[3], 255);

    await page.locator('[data-bg-mode="lasso"]').click();
    await page.mouse.move(at(42, 42).x, at(42, 42).y);
    await page.mouse.down();
    await page.mouse.move(at(59, 42).x, at(59, 42).y, { steps: 4 });
    await page.mouse.move(at(59, 59).x, at(59, 59).y, { steps: 4 });
    await page.mouse.move(at(42, 59).x, at(42, 59).y, { steps: 4 });
    await page.mouse.up();
    assert.equal((await pixel(50, 50))[3], 0);
    await page.locator("#bgUndo").click();
    assert.equal((await pixel(50, 50))[3], 255);

    await page.locator('[data-bg-mode="wand"]').click();
    await page.mouse.click(at(50, 50).x, at(50, 50).y);
    assert.equal((await pixel(50, 50))[3], 0);
    await page.locator("#bgReset").click();
    assert.equal((await pixel(5, 5))[3], 255);
    assert.equal((await pixel(50, 50))[3], 255);
    await page.locator("#bgAuto").click();
    const downloadEvent = page.waitForEvent("download");
    await page.locator("#bgDownload").click();
    const download = await downloadEvent;
    assert.equal(download.suggestedFilename(), "subject-transparent.png");
    const bytes = await fs.readFile(await download.path());
    assert.equal(bytes.subarray(1, 4).toString("ascii"), "PNG");
    const exported = await page.evaluate(async (base64) => {
      const image = new Image();
      image.src = `data:image/png;base64,${base64}`;
      await image.decode();
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 100;
      const context = canvas.getContext("2d");
      context.drawImage(image, 0, 0);
      return [context.getImageData(5, 5, 1, 1).data[3], context.getImageData(50, 50, 1, 1).data[3]];
    }, bytes.toString("base64"));
    assert.deepEqual(exported, [0, 255]);
    await page.screenshot({ path: "/tmp/pm-workbench-background-tool.png", fullPage: true });

    const blueBase64 = await page.evaluate(() => {
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 100;
      const context = canvas.getContext("2d");
      context.fillStyle = "#0000ff";
      context.fillRect(0, 0, 100, 100);
      context.fillStyle = "#ffdf00";
      context.fillRect(30, 30, 40, 40);
      return canvas.toDataURL("image/png").split(",")[1];
    });
    await page.locator("#bgFile").setInputFiles({ name: "blue.png", mimeType: "image/png", buffer: Buffer.from(blueBase64, "base64") });
    await page.waitForFunction(() => document.querySelector("#bgFileName").textContent.startsWith("blue.png"));
    await page.locator("#bgReset").click();
    await page.locator("#bgIntentInput").fill("去掉蓝色背景");
    await page.locator("#bgAnalyzeIntent").click();
    await page.locator("#bgExecuteIntent").click();
    assert.equal((await pixel(5, 5))[3], 0);
    assert.equal((await pixel(50, 50))[3], 255);
    await page.locator("#bgReset").click();
    await page.locator("#bgIntentInput").fill("去掉 #0000FF 背景");
    await page.locator("#bgAnalyzeIntent").click();
    await page.locator("#bgExecuteIntent").click();
    assert.equal((await pixel(5, 5))[3], 0);
    await page.locator("#bgToolBack").click();
    assert.equal(await page.locator("#toolCatalog").isVisible(), true);
    await page.locator("#gifToolOpen").click();
    assert.equal(await page.locator("#toolWorkspace").isVisible(), true);
    assert.deepEqual(errors, []);
    console.log("PASS: local intent recognition, multi-step plans, unsupported-object guard, region/color removal and restoration, single-step undo, manual editing, PNG export and GIF coexistence.");
  } finally {
    await browser?.close();
    await new Promise((resolve) => server.close(resolve));
  }
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
