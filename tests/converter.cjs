const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const http = require("node:http");
const path = require("node:path");
const { chromium } = require("playwright");
const { GIFEncoder } = require("gifenc");

const palette = [[0, 0, 0], [255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 255, 0]];
function fixture() {
  const gif = GIFEncoder();
  gif.writeFrame(Uint8Array.from([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), 4, 3, { palette, transparent: true, delay: 100, dispose: 1 });
  gif.writeFrame(Uint8Array.from([0, 2]), 2, 1, { transparent: true, delay: 200, dispose: 2 });
  gif.writeFrame(Uint8Array.from([0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0]), 4, 3, { transparent: true, delay: 300, dispose: 3 });
  gif.writeFrame(Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4]), 4, 3, { transparent: true, delay: 100, dispose: 1 });
  gif.finish();
  return Buffer.from(gif.bytes());
}

async function main() {
  await import("./edge-cleanup.mjs");
  const project = path.resolve(__dirname, "..");
  const server = http.createServer(async (request, response) => {
    try {
      const url = new URL(request.url, "http://localhost");
      if (!url.pathname.startsWith("/pm-workbench/")) throw new Error("Not found");
      const filename = path.resolve(project, url.pathname.slice("/pm-workbench/".length) || "index.html");
      if (!filename.startsWith(project + path.sep)) throw new Error("Not found");
      const content = await fs.readFile(filename);
      const types = { ".html": "text/html", ".js": "application/javascript", ".css": "text/css" };
      response.writeHead(200, { "Content-Type": types[path.extname(filename)] || "application/octet-stream" });
      response.end(content);
    } catch {
      response.writeHead(404);
      response.end();
    }
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  let browser;
  try {
    browser = await chromium.launch({ channel: "chrome", headless: true });
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.route("https://fonts.**/*", (route) => route.abort());
    await page.goto(`http://127.0.0.1:${server.address().port}/pm-workbench/`);
    await page.locator("#loginUsername").fill("admin");
    await page.locator("#loginPassword").fill("admin");
    await page.locator("#loginForm").evaluate((form) => form.requestSubmit());
    await page.locator('[data-page="tools"]').click();
    assert.equal(await page.locator("#gifUsage").inputValue(), "emoji");
    assert.equal(await page.locator("#gifGeneralOptions").isVisible(), false);
    assert.match(await page.locator("#gifOutputHint").textContent(), /20 帧 · 1.00 秒/);
    await page.locator("#gifUsage").selectOption("general");
    assert.equal(await page.locator("#gifConvert").isDisabled(), true);
    const input = { name: "animation.gif", mimeType: "image/gif", buffer: fixture() };
    await page.locator("#gifFile").setInputFiles(input);
    await page.waitForFunction(() => !document.querySelector("#gifConvert").disabled);
    assert.match(await page.locator("#gifMetadata").textContent(), /4 帧 · 0.70 秒/);
    await page.locator("#gifConvert").click();
    await page.locator("#gifResult").waitFor({ state: "visible" });
    const downloadEvent = page.waitForEvent("download");
    await page.locator("#gifDownload").click();
    const download = await downloadEvent;
    assert.equal(download.suggestedFilename(), "animation.svga");
    assert.ok((await fs.stat(await download.path())).size > 100);

    // Validate with the independent official SVGA player, not the encoder's schema.
    await page.addScriptTag({ path: path.join(project, "node_modules/svgaplayerweb/build/svga.min.js") });
    const validation = await page.evaluate(async () => {
      const item = await new Promise((resolve, reject) => new SVGA.Parser().load(document.querySelector("#gifDownload").href, resolve, reject));
      const pixels = {};
      for (const [key, base64] of Object.entries(item.images)) {
        const image = new Image();
        image.src = "data:image/png;base64," + base64;
        await image.decode();
        const canvas = document.createElement("canvas");
        canvas.width = 4; canvas.height = 3;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0);
        pixels[key] = Array.from(ctx.getImageData(0, 0, 4, 3).data);
      }
      const host = document.createElement("div");
      host.style.cssText = "width:4px;height:3px";
      document.body.append(host);
      const player = new SVGA.Player(host);
      player.setVideoItem(item);
      player.stepToFrame(0, false);
      player.startAnimation();
      player.stopAnimation();
      player.clear();
      host.remove();
      return { width: item.videoSize.width, height: item.videoSize.height, fps: item.FPS, frames: item.frames, pixels };
    });
    assert.deepEqual([validation.width, validation.height, validation.fps, validation.frames], [4, 3, 30, 21]);
    const expected = (entries) => {
      const pixels = new Array(48).fill(0);
      for (const [index, color] of entries) pixels.splice(index * 4, 4, ...palette[color], 255);
      return pixels;
    };
    assert.deepEqual(validation.pixels.frame_0, expected([[0, 1]]));
    assert.deepEqual(validation.pixels.frame_1, expected([[0, 1], [1, 2]]));
    assert.deepEqual(validation.pixels.frame_2, expected([[2, 3]]));
    assert.deepEqual(validation.pixels.frame_3, expected([[11, 4]]));
    console.log("PASS: downloaded SVGA, official player compatibility, transparency, patch compositing, disposal 1/2/3 and variable frame timing.");

    await page.locator("#gifUsage").selectOption("emoji");
    assert.equal(await page.locator("#gifResult").isVisible(), false);
    assert.equal(await page.locator("#gifFps").isDisabled(), true);
    await page.locator("#gifConvert").click();
    await page.locator("#gifResult").waitFor({ state: "visible" });
    const emoji = await page.evaluate(async () => {
      const item = await new Promise((resolve, reject) => new SVGA.Parser().load(document.querySelector("#gifDownload").href, resolve, reject));
      return { version: item.version, FPS: item.FPS, frames: item.frames, videoSize: item.videoSize, timeline: Array.from({ length: item.frames }, (_, frame) => item.sprites.filter((sprite) => sprite.frames[frame].alpha > 0).map((sprite) => sprite.imageKey)) };
    });
    assert.deepEqual({ ...emoji, timeline: undefined }, { version: "2.0", FPS: 20, frames: 20, videoSize: { width: 240, height: 240 }, timeline: undefined });
    assert.deepEqual(emoji.timeline, [ ...Array(3).fill(["frame_0"]), ...Array(6).fill(["frame_1"]), ...Array(8).fill(["frame_2"]), ...Array(3).fill(["frame_3"]) ]);
    assert.match(await page.locator("#gifResultInfo").textContent(), /240 × 240 px · 20 帧 · 20 FPS · 1.00 秒/);
    await page.screenshot({ path: "/tmp/pm-workbench-emoji.png", fullPage: true });
    await page.locator("#gifUsage").selectOption("general");
    assert.equal(await page.locator("#gifFps").inputValue(), "30");
    assert.equal(await page.locator("#gifFps").isDisabled(), false);
    console.log("PASS: emoji default and exact SVGA 2.0 / 20 FPS / 20 frames / 240 square, proportional timing, preset invalidation and general settings restoration.");

    // Optional local regression assets stay outside the public repository.
    if (process.env.EDGE_ORIGINAL_SVGA && process.env.EDGE_FIXED_SVGA) {
      const originalBytes = Array.from(await fs.readFile(process.env.EDGE_ORIGINAL_SVGA));
      const fixedBytes = Array.from(await fs.readFile(process.env.EDGE_FIXED_SVGA));
      const actual = await page.evaluate(async ({ originalBytes, fixedBytes }) => {
        async function load(bytes) {
          const url = URL.createObjectURL(new Blob([Uint8Array.from(bytes)]));
          try { return await new Promise((resolve, reject) => new SVGA.Parser().load(url, resolve, reject)); }
          finally { URL.revokeObjectURL(url); }
        }
        async function pixels(base64) {
          const image = new Image();
          image.src = "data:image/png;base64," + base64;
          await image.decode();
          const canvas = document.createElement("canvas");
          canvas.width = image.width; canvas.height = image.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(image, 0, 0);
          return { data: ctx.getImageData(0, 0, image.width, image.height).data, width: image.width, height: image.height };
        }
        function fringe({ data, width, height }) {
          let total = 0;
          for (let y = 2; y < height - 2; y++) for (let x = 2; x < width - 2; x++) {
            const p = (y * width + x) * 4;
            const max = Math.max(data[p], data[p + 1], data[p + 2]), min = Math.min(data[p], data[p + 1], data[p + 2]);
            if (min < 120 || max - min > 35 || data[p + 3] < 8) continue;
            let near = false;
            for (let dy = -2; dy <= 2 && !near; dy++) for (let dx = -2; dx <= 2; dx++) if (data[((y + dy) * width + x + dx) * 4 + 3] < 8) { near = true; break; }
            if (near) total += data[p + 3] / 255;
          }
          return total;
        }
        const original = await load(originalBytes), fixed = await load(fixedBytes);
        const frames = [];
        for (const key of Object.keys(original.images)) frames.push({ key, before: fringe(await pixels(original.images[key])), after: fringe(await pixels(fixed.images[key])) });
        const playerHost = document.createElement("div");
        playerHost.style.cssText = "width:240px;height:240px";
        document.body.append(playerHost);
        const player = new SVGA.Player(playerHost);
        player.setVideoItem(fixed);
        for (let i = 0; i < fixed.frames; i++) player.stepToFrame(i, false);
        player.clear(); playerHost.remove();
        return { frames, before: [original.videoSize, original.FPS, original.frames, original.sprites], after: [fixed.videoSize, fixed.FPS, fixed.frames, fixed.sprites] };
      }, { originalBytes, fixedBytes });
      assert.deepEqual(actual.after, actual.before);
      for (const frame of actual.frames) if (frame.before > 10) assert.ok(frame.after < frame.before * 0.3, JSON.stringify(frame));
      console.log("PASS: actual local animation, all-frame playback/timing and neutral fringe reduction", JSON.stringify(actual.frames));
    }

    await page.locator("#gifFps").selectOption("60");
    assert.equal(await page.locator("#gifResult").isVisible(), false);
    await page.locator("#gifConvert").click();
    await page.locator("#gifResult").waitFor({ state: "visible" });
    assert.match(await page.locator("#gifResultInfo").textContent(), /42 帧 · 60 FPS/);
    await page.screenshot({ path: "/tmp/pm-workbench-tools.png", fullPage: true });

    const large = GIFEncoder();
    large.writeFrame(new Uint8Array(800 * 400).fill(1), 800, 400, { palette, delay: 100 });
    large.finish();
    await page.locator("#gifFile").setInputFiles({ name: "wide.gif", mimeType: "image/gif", buffer: Buffer.from(large.bytes()) });
    await page.waitForFunction(() => !document.querySelector("#gifConvert").disabled);
    await page.locator("#gifSize").selectOption("240");
    await page.locator("#gifConvert").click();
    await page.locator("#gifResult").waitFor({ state: "visible" });
    assert.match(await page.locator("#gifResultInfo").textContent(), /240 × 120 px/);
    const dimensions = await page.evaluate(async () => {
      const item = await new Promise((resolve, reject) => new SVGA.Parser().load(document.querySelector("#gifDownload").href, resolve, reject));
      const image = new Image();
      image.src = "data:image/png;base64," + Object.values(item.images)[0];
      await image.decode();
      return [item.videoSize.width, item.videoSize.height, image.naturalWidth, image.naturalHeight];
    });
    assert.deepEqual(dimensions, [240, 120, 240, 120]);
    console.log("PASS: aspect-preserving resize, encoded PNG dimensions and single-frame GIF.");

    await page.locator("#gifUsage").selectOption("emoji");
    await page.locator("#gifConvert").click();
    await page.locator("#gifResult").waitFor({ state: "visible" });
    const letterbox = await page.evaluate(async () => {
      const item = await new Promise((resolve, reject) => new SVGA.Parser().load(document.querySelector("#gifDownload").href, resolve, reject));
      const image = new Image();
      image.src = "data:image/png;base64," + Object.values(item.images)[0];
      await image.decode();
      const canvas = document.createElement("canvas"); canvas.width = canvas.height = 240;
      const ctx = canvas.getContext("2d"); ctx.drawImage(image, 0, 0);
      return { size: item.videoSize, fps: item.FPS, frames: item.frames, samples: [59, 60, 179, 180].map((y) => Array.from(ctx.getImageData(120, y, 1, 1).data)) };
    });
    assert.deepEqual(letterbox, { size: { width: 240, height: 240 }, fps: 20, frames: 20, samples: [[0, 0, 0, 0], [255, 0, 0, 255], [255, 0, 0, 255], [0, 0, 0, 0]] });
    await page.locator("#gifUsage").selectOption("general");
    console.log("PASS: non-square GIF letterboxed without distortion and static GIF held for all 20 frames.");

    await page.locator("#gifEdgeMode").selectOption("white");
    await page.locator("#gifConvert").click();
    await page.locator("#gifResult").waitFor({ state: "visible" });
    assert.match(await page.locator("#gifEdgeNotice").textContent(), /未检测到/);
    const edgeGif = GIFEncoder();
    const edgeIndices = new Uint8Array(21 * 21);
    for (let y = 4; y <= 16; y++) for (let x = 4; x <= 16; x++) edgeIndices[y * 21 + x] = x === 4 || x === 16 || y === 4 || y === 16 ? 2 : 1;
    for (let y = 9; y <= 11; y++) for (let x = 9; x <= 11; x++) edgeIndices[y * 21 + x] = 3;
    edgeGif.writeFrame(edgeIndices, 21, 21, { palette: [[255, 255, 255], [20, 50, 90], [185, 194, 206], [255, 255, 255]], transparent: true, delay: 100 });
    edgeGif.finish();
    await page.locator("#gifFile").setInputFiles({ name: "white-edge.gif", mimeType: "image/gif", buffer: Buffer.from(edgeGif.bytes()) });
    await page.waitForFunction(() => !document.querySelector("#gifConvert").disabled);
    await page.locator("#gifConvert").click();
    await page.locator("#gifResult").waitFor({ state: "visible" });
    assert.match(await page.locator("#gifEdgeNotice").textContent(), /1.5 px 去边/);
    const edgePixels = await page.evaluate(async () => {
      const item = await new Promise((resolve, reject) => new SVGA.Parser().load(document.querySelector("#gifDownload").href, resolve, reject));
      const source = new Image();
      source.src = "data:image/png;base64," + Object.values(item.images)[0];
      await source.decode();
      const canvas = document.createElement("canvas");
      canvas.width = 21; canvas.height = 21;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(source, 0, 0);
      const pixels = Array.from(ctx.getImageData(0, 0, 21, 21).data);
      const result = document.querySelector("#gifResultPreview");
      await result.decode();
      ctx.clearRect(0, 0, 21, 21);
      ctx.drawImage(result, 0, 0);
      return { pixels, preview: Array.from(ctx.getImageData(0, 0, 21, 21).data) };
    });
    assert.deepEqual(edgePixels.preview, edgePixels.pixels);
    const edgePixel = edgePixels.pixels.slice((4 * 21 + 10) * 4, (4 * 21 + 10) * 4 + 4);
    assert.ok(edgePixel[1] < 65 && edgePixel[3] > 0 && edgePixel[3] < 160);
    assert.deepEqual(edgePixels.pixels.slice((10 * 21 + 10) * 4, (10 * 21 + 10) * 4 + 4), [255, 255, 255, 255]);
    await page.locator("#gifPreviewBackground").selectOption("white");
    assert.equal(await page.locator("#gifResult").isVisible(), true);
    assert.equal(await page.locator("#gifResultPreview").evaluate((img) => getComputedStyle(img.parentElement).backgroundColor), "rgb(255, 255, 255)");
    await page.locator("#gifResultFrame").selectOption("2");
    await page.locator("#gifPreviewBackground").selectOption("black");
    await page.screenshot({ path: "/tmp/pm-workbench-edge-tools.png", fullPage: true });
    await page.locator("#gifEdgeMode").selectOption("none");
    assert.equal(await page.locator("#gifResult").isVisible(), false);
    console.log("PASS: edge processing reaches exported SVGA, exact output preview, backdrop/frame controls, option invalidation and opaque-image notice.");

    await page.locator("#gifFile").setInputFiles({ ...input, buffer: input.buffer.subarray(0, input.buffer.length - 3) });
    await page.waitForFunction(() => document.querySelector("#gifStatus").classList.contains("is-error"));
    assert.match(await page.locator("#gifStatus").textContent(), /不完整/);

    await page.locator("#gifFile").setInputFiles({ name: "fake.gif", mimeType: "image/gif", buffer: Buffer.from("not a gif") });
    await page.waitForFunction(() => document.querySelector("#gifStatus").classList.contains("is-error"));
    assert.equal(await page.locator("#gifConvert").isDisabled(), true);
    assert.equal(await page.locator("#gifResult").isVisible(), false);
    await page.locator("#gifFile").setInputFiles({ name: "large.gif", mimeType: "image/gif", buffer: Buffer.alloc(21 * 1024 * 1024) });
    assert.match(await page.locator("#gifStatus").textContent(), /超过 20 MB/);

    await page.locator("#gifFile").setInputFiles(input);
    await page.waitForFunction(() => !document.querySelector("#gifConvert").disabled);
    // Start and cancel in the same task to exercise stale async callback suppression.
    await page.evaluate(() => { document.querySelector("#gifConvert").click(); document.querySelector("#gifCancel").click(); });
    assert.match(await page.locator("#gifStatus").textContent(), /已取消/);
    await page.evaluate(() => { document.querySelector("#gifConvert").click(); document.querySelector('[data-page="document"]').click(); });
    await page.locator('[data-page="tools"]').click();
    assert.equal(await page.locator("#gifConvert").isDisabled(), true);
    await page.locator("#logoutButton").click();
    assert.equal(await page.locator("#loginView").isVisible(), true);
    assert.deepEqual(errors, []);
    console.log("PASS: settings invalidation, error recovery, size limit, cancellation, navigation cleanup and logout.");
  } finally {
    await browser?.close();
    await new Promise((resolve) => server.close(resolve));
  }
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
