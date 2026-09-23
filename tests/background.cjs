const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const http = require("node:http");
const path = require("node:path");
const { chromium } = require("playwright");
const { GIFEncoder } = require("gifenc");
const { parseGIF, decompressFrame } = require("gifuct-js");

function animatedFixture() {
  const encoder = GIFEncoder();
  const palette = [[255, 255, 255], [225, 30, 65], [30, 90, 220], [55, 25, 25]];
  const makeFrame = (left, color, contourGaps = []) => {
    const pixels = new Uint8Array(20 * 20);
    for (let y = 6; y < 14; y++) for (let x = left; x < left + 6; x++) pixels[y * 20 + x] = color;
    // White foreground exits through the crop but remains enclosed by a dark contour inside it.
    for (let x = 13; x < 20; x++) { pixels[6 * 20 + x] = 3; pixels[11 * 20 + x] = 3; }
    for (let y = 6; y <= 11; y++) pixels[y * 20 + 13] = 3;
    for (const y of contourGaps) pixels[y * 20 + 13] = 0;
    return pixels;
  };
  encoder.writeFrame(makeFrame(3, 1), 20, 20, { palette, delay: 100, repeat: 2 });
  encoder.writeFrame(makeFrame(7, 2, [8]), 20, 20, { palette, delay: 200 });
  encoder.writeFrame(makeFrame(11, 1, [8, 9]), 20, 20, { palette, delay: 300 });
  encoder.finish();
  return Buffer.from(encoder.bytes());
}

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
    await page.locator("#appShell").waitFor({ state: "visible" });
    await page.locator('[data-page="tools"]').click();
    assert.equal(await page.locator("#bgWorkspace").isVisible(), false);
    assert.equal(await page.locator(".tool-card").count(), 2);
    await page.screenshot({ path: "/tmp/pm-workbench-tool-catalog.png", fullPage: true });
    await page.locator("#bgToolOpen").click();
    assert.equal(await page.locator("#bgWorkspace").isVisible(), true);
    assert.equal(await page.locator("#bgDownloadCover").isVisible(), false);
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

    await page.locator('[data-bg-mode="restore"]').click();
    await page.locator("#bgOverlay").scrollIntoViewIfNeeded();
    const overlay = await page.locator("#bgOverlay").boundingBox();
    const at = (x, y) => ({ x: overlay.x + overlay.width * x / 100, y: overlay.y + overlay.height * y / 100 });
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

    await page.locator("#bgFile").setInputFiles({ name: "sequence.gif", mimeType: "image/gif", buffer: animatedFixture() });
    await page.waitForFunction(() => document.querySelector("#bgStatus").textContent.includes("全部帧处理完成"));
    assert.equal(await page.locator("#bgIntentSection").isVisible(), false);
    assert.equal(await page.locator("#bgManualControls").isVisible(), false);
    assert.equal(await page.locator("#bgGifNotice").isVisible(), true);
    assert.equal(await page.locator("#bgBoundaryMode").inputValue(), "protect");
    assert.match(await page.locator("#bgFileName").textContent(), /20 × 20 px · 3 帧/);
    assert.match(await page.locator("#bgGifInfo").textContent(), /3 帧 · 0.60 秒 · 循环参数 2/);
    assert.equal(await page.locator("#bgDownload").textContent(), "下载透明 GIF");
    assert.equal(await page.locator("#bgDownloadCover").isVisible(), true);
    assert.equal(await page.locator("#bgDownloadCover").isDisabled(), false);
    assert.equal(await page.locator("#bgDownloadCover").textContent(), "下载封面 PNG（72 × 72）");
    assert.match(await page.locator("#bgGifPreview").getAttribute("src"), /^blob:/);
    const coverDownloadEvent = page.waitForEvent("download");
    await page.locator("#bgDownloadCover").click();
    const coverDownload = await coverDownloadEvent;
    assert.equal(coverDownload.suggestedFilename(), "sequence-cover-72x72.png");
    const coverBytes = await fs.readFile(await coverDownload.path());
    assert.equal(coverBytes.subarray(1, 4).toString("ascii"), "PNG");
    assert.equal(coverBytes.readUInt32BE(16), 72);
    assert.equal(coverBytes.readUInt32BE(20), 72);
    const coverInfo = await page.evaluate(async (base64) => {
      const image = new Image();
      image.src = `data:image/png;base64,${base64}`;
      await image.decode();
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 72;
      const context = canvas.getContext("2d");
      context.drawImage(image, 0, 0);
      const alpha = (x, y) => context.getImageData(x, y, 1, 1).data[3];
      return { width: image.width, height: image.height, corner: alpha(2, 2), subject: alpha(19, 29), whiteForeground: alpha(61, 29) };
    }, coverBytes.toString("base64"));
    assert.deepEqual(coverInfo, { width: 72, height: 72, corner: 0, subject: 255, whiteForeground: 255 });
    const gifDownloadEvent = page.waitForEvent("download");
    await page.locator("#bgDownload").click();
    const gifDownload = await gifDownloadEvent;
    assert.equal(gifDownload.suggestedFilename(), "sequence-transparent.gif");
    const gifBytes = await fs.readFile(await gifDownload.path());
    assert.equal(gifBytes.subarray(0, 6).toString("ascii"), "GIF89a");
    const parsedGif = parseGIF(gifBytes.buffer.slice(gifBytes.byteOffset, gifBytes.byteOffset + gifBytes.byteLength));
    const gifFrames = parsedGif.frames.filter((frame) => frame.image);
    assert.equal(gifFrames.length, 3);
    assert.deepEqual(gifFrames.map((frame) => frame.gce.delay), [10, 20, 30]);
    assert.deepEqual(Array.from(parsedGif.frames.find((frame) => frame.application)?.application.blocks), [1, 2, 0]);
    const outputFrames = gifFrames.map((frame) => decompressFrame(frame, parsedGif.gct, true));
    assert.deepEqual(outputFrames.map((frame) => [frame.dims.width, frame.dims.height]), [[20, 20], [20, 20], [20, 20]]);
    for (const frame of outputFrames) assert.equal(frame.patch[3], 0);
    assert.equal(outputFrames[0].patch[(8 * 20 + 5) * 4 + 3], 255);
    assert.equal(outputFrames[1].patch[(8 * 20 + 9) * 4 + 3], 255);
    assert.equal(outputFrames[2].patch[(8 * 20 + 13) * 4 + 3], 255);
    for (const frame of outputFrames) {
      assert.equal(frame.patch[(8 * 20 + 17) * 4 + 3], 255);
      assert.equal(frame.patch[(8 * 20 + 19) * 4 + 3], 255);
      assert.equal(frame.patch[(3 * 20 + 19) * 4 + 3], 0);
    }
    await page.screenshot({ path: "/tmp/pm-workbench-background-gif.png", fullPage: true });
    await page.locator("#bgTolerance").fill("28");
    assert.equal(await page.locator("#bgDownload").isDisabled(), true);
    assert.equal(await page.locator("#bgDownloadCover").isDisabled(), true);
    assert.match(await page.locator("#bgStatus").textContent(), /重新处理所有帧/);
    await page.locator("#bgAuto").click();
    await page.waitForFunction(() => document.querySelector("#bgStatus").textContent.includes("全部帧处理完成"));
    assert.equal(await page.locator("#bgDownload").isDisabled(), false);
    await page.locator("#bgBoundaryMode").selectOption("standard");
    assert.equal(await page.locator("#bgDownload").isDisabled(), true);
    assert.match(await page.locator("#bgStatus").textContent(), /主体保护方式已更新/);
    await page.locator("#bgToolBack").click();
    assert.equal(await page.locator("#toolCatalog").isVisible(), true);
    await page.locator("#gifToolOpen").click();
    assert.equal(await page.locator("#toolWorkspace").isVisible(), true);
    assert.deepEqual(errors, []);
    console.log("PASS: local intent recognition, manual static editing and PNG export, plus all-frame GIF background removal with frame timing, loop metadata, preview, reprocessing and transparent GIF export.");
  } finally {
    await browser?.close();
    await new Promise((resolve) => server.close(resolve));
  }
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
