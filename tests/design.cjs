const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const os = require("node:os");
const vm = require("node:vm");
const http = require("node:http");
const { execFileSync } = require("node:child_process");
const { zipSync, strToU8, unzipSync, strFromU8 } = require("fflate");
const { chromium } = require("playwright");

function fixture() {
  const c = { _class: "color", red: 0.2, green: 0.4, blue: 0.8, alpha: 1 };
  const paint = { isEnabled: true, fillType: 0, color: c };
  const base = (kind, name, x, y, width, height, extra = {}) => ({ _class: kind, do_objectID: name, name, isVisible: true, frame: { x, y, width, height }, style: { fills: [paint] }, ...extra });
  const group = base("group", "Group", 10, 20, 140, 80, { layers: [base("rectangle", "Card", 4, 6, 90, 50, { fixedRadius: 8 })] });
  const attrs = { MSAttributedStringFontAttribute: { attributes: { name: "ArialMT", size: 18 } }, MSAttributedStringColorAttribute: c };
  const text = base("text", "Title", 20, 110, 220, 30, { attributedString: { string: "中文 Orbit", attributes: [{ location: 0, length: 8, attributes: attrs }] }, textBehaviour: 2, style: { fills: [paint], textStyle: { encodedAttributes: attrs } } });
  const image = base("bitmap", "Image", 260, 20, 32, 32, { image: { _ref: "images/pixel.png" } });
  const vector = base("shapePath", "Curve", 200, 60, 40, 40, { isClosed: true, points: [{ point: "{0,0}", curveFrom: "{0.5,0}", hasCurveFrom: true }, { point: "{1,1}", curveTo: "{1,0.5}", hasCurveTo: true }, { point: "{0,1}" }] });
  const board = base("artboard", "Board", 100, 200, 320, 240, { hasBackgroundColor: true, backgroundColor: { red: 1, green: 1, blue: 1, alpha: 1 }, layers: [group, text, image, vector] });
  const page = base("page", "Page", 0, 0, 0, 0, { layers: [board] });
  const png = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=", "base64");
  return zipSync({ "document.json": strToU8(JSON.stringify({ _class: "document", pages: [{ _ref: "pages/page" }] })), "pages/page.json": strToU8(JSON.stringify(page)), "images/pixel.png": png });
}

async function main() {
  const compat = await fs.readFile(path.join(__dirname, "../src/design/compat.mjs"), "utf8");
  const legacy = vm.createContext({});
  vm.runInContext("delete Array.prototype.toSorted; delete Array.prototype.toReversed;", legacy);
  vm.runInContext(`"use strict"; { ${compat} }`, legacy);
  const evaluate = (code) => vm.runInContext(code, legacy);
  assert.equal(evaluate("JSON.stringify([10, 2, 1].toSorted())"), "[1,10,2]");
  assert.equal(evaluate("JSON.stringify([10, 2, 1].toSorted((a, b) => a - b))"), "[1,2,10]");
  assert.equal(evaluate("JSON.stringify((() => { const a = [3, 1, 2]; return [a.toSorted(), a.toReversed(), a]; })())"), "[[1,2,3],[2,1,3],[3,1,2]]");
  assert.equal(evaluate("[{id: 1, key: 0}, {id: 2, key: 0}].toSorted((a, b) => a.key - b.key).map(item => item.id).join()"), "1,2");
  for (const method of ["toSorted", "toReversed"]) {
    assert.equal(evaluate(`Object.getOwnPropertyDescriptor(Array.prototype, "${method}").enumerable`), false);
    assert.equal(evaluate(`Object.keys(Array.prototype.${method}.call({length: 2})).join()`), "0,1");
    assert.equal(evaluate(`Array.prototype.${method}.call({length: -1}).length`), 0);
    assert.throws(() => evaluate(`Array.prototype.${method}.call(null)`), { name: "TypeError" });
    assert.throws(() => evaluate(`Array.prototype.${method}.call(undefined)`), { name: "TypeError" });
  }
  assert.throws(() => evaluate("[1].toSorted(null)"), { name: "TypeError" });
  assert.equal(evaluate("JSON.stringify(Array.prototype.toSorted.call({0: 3, 1: 1, length: 2, [Symbol.iterator]() { throw new Error('must read indexed values'); }}))"), "[1,3]");
  assert.equal(evaluate("JSON.stringify((() => { const reads = []; Array.prototype.toReversed.call({ length: 2, get 0() { reads.push(0); }, get 1() { reads.push(1); } }); return reads; })())"), "[1,0]");
  evaluate("globalThis.savedSort = Array.prototype.toSorted; globalThis.savedReverse = Array.prototype.toReversed;");
  vm.runInContext(`"use strict"; { ${compat} }`, legacy);
  assert.equal(evaluate("savedSort === Array.prototype.toSorted && savedReverse === Array.prototype.toReversed"), true);
  const modern = vm.createContext({});
  vm.runInContext("globalThis.savedSort = Array.prototype.toSorted; globalThis.savedReverse = Array.prototype.toReversed;", modern);
  vm.runInContext(`"use strict"; { ${compat} }`, modern);
  assert.equal(vm.runInContext("savedSort === Array.prototype.toSorted && savedReverse === Array.prototype.toReversed", modern), true);
  console.log("PASS: legacy copying-array compatibility preserves source arrays, ordering, sparse values, property access and native methods.");

  const { readDesign, convertDesign } = await import("../src/design/convert.mjs");
  await require("./design-fidelity.cjs")();
  const { nodePath, unpack, createReport, transformProps, xdMatrix } = await import("../src/design/common.mjs");
  const source = fixture();
  const parsed = await readDesign(source, "fixture.sketch");
  assert.deepEqual(parsed.stats, { pages: 1, layers: 6, images: 1, text: 1, artboards: 1 });
  assert.equal([...parsed.graph.nodes.values()].find((n) => n.name === "Title").fontFamily, "Arial");
  const native = { sketch: source };
  for (const target of ["fig", "xd"]) native[target] = (await convertDesign(parsed, target)).bytes;
  for (const from of Object.keys(native)) {
    for (const to of Object.keys(native).filter((key) => key !== from)) {
      const input = await readDesign(native[from], `fixture.${from}`);
      const result = await convertDesign(input, to);
      const output = await readDesign(result.bytes, result.filename);
      const nodes = [...output.graph.nodes.values()];
      const board = nodes.find((n) => n.name === "Board");
      assert.deepEqual(board.fills[0].color, { r: 1, g: 1, b: 1, a: 1 });
      const card = nodes.find((n) => n.name === "Card");
      assert.ok(card, `${from} -> ${to}: rectangle retained`);
      assert.deepEqual([card.width, card.height, card.cornerRadius], [90, 50, 8]);
      assert.equal(nodes.find((n) => n.name === "Title").text, "中文 Orbit");
      assert.equal(output.graph.images.size, 1);
      assert.deepEqual([...output.graph.images.values()][0], [...parsed.graph.images.values()][0]);
      const curve = nodes.find((n) => n.name === "Curve" && n.type === "VECTOR") || nodes.find((n) => n.type === "VECTOR");
      assert.ok(curve && nodePath(curve).includes("C"), `${from} -> ${to}: editable cubic path retained`);
      if (to === "xd") {
        const archive = unzipSync(result.bytes);
        assert.equal(JSON.parse(strFromU8(archive["interactions/interactions.json"])).version, "0.24");
        assert.ok(archive["META-INF/metadata.xml"]);
      }
      await fs.writeFile(`/tmp/pm-workbench-native-${from}-to-${to}.${to}`, result.bytes);
    }
  }
  const t = { a: 0, b: 1, c: 1, d: 0, tx: 40, ty: 30 };
  const mirrored = transformProps(t, 80, 50, createReport(), "Mirror");
  const actual = xdMatrix(mirrored);
  for (const key of Object.keys(t)) assert.ok(Math.abs(t[key] - actual[key]) < 0.00001, `reflected rotation ${key}`);
  await assert.rejects(readDesign(new Uint8Array(), "empty.fig"), /文件为空/);
  await assert.rejects(readDesign(source, "file.txt"), /请选择/);
  await assert.rejects(readDesign(Uint8Array.of(1, 2, 3), "broken.fig"));
  await assert.rejects(convertDesign(parsed, "sketch"), /不同于/);
  // A small compressed entry declaring an enormous uncompressed size must be rejected before allocation.
  const bomb = zipSync({ "payload": strToU8("test") });
  const bombView = new DataView(bomb.buffer, bomb.byteOffset, bomb.byteLength);
  for (let i = 0; i < bomb.length - 46; i++) if (bombView.getUint32(i, true) === 0x02014b50) bombView.setUint32(i + 24, 500 * 1024 * 1024, true);
  assert.throws(() => unpack(bomb), /解压后/);
  // A stored padding entry exercises a real >100 MB file without a huge scene graph.
  const largeSource = zipSync({ ...unzipSync(source), "large-resource.bin": [new Uint8Array(100 * 1024 * 1024 + 1), { level: 0 }] });
  assert.ok(largeSource.byteLength > 100 * 1024 * 1024);
  const largeParsed = await readDesign(largeSource, "large.sketch");
  assert.deepEqual(largeParsed.stats, parsed.stats);
  assert.equal((await readDesign((await convertDesign(largeParsed, "fig")).bytes, "large.fig")).stats.text, 1);
  const sketchtool = "/Applications/Sketch.app/Contents/Resources/sketchtool/bin/sketchtool";
  try {
    await fs.access(sketchtool);
    const listed = execFileSync(sketchtool, ["list", "artboards", "/tmp/pm-workbench-native-fig-to-sketch.sketch"], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
    assert.equal(JSON.parse(listed).pages[0].artboards[0].name, "Board");
    console.log("PASS: exported Sketch is accepted by native Sketch tooling.");
  } catch (error) { if (error.code !== "ENOENT") throw error; }
  console.log("PASS: six native format directions retain editable content; >100 MB files convert while corrupt files, same-format requests and expanded archive bombs are rejected.");

  const project = path.resolve(__dirname, "..");
  const largeDirectory = await fs.mkdtemp(path.join(os.tmpdir(), "orbit-large-design-"));
  let legacyWorkerLoads = 0;
  const server = http.createServer(async (request, response) => {
    try {
      const url = new URL(request.url, "http://localhost");
      if (!url.pathname.startsWith("/pm-workbench/")) throw new Error("Not found");
      if (url.pathname === "/pm-workbench/auth-config.js") {
        response.writeHead(200, { "Content-Type": "application/javascript" });
        response.end('window.OrbitAuthConfig = { mode: "local", apiBase: "" };');
        return;
      }
      const filename = path.resolve(project, url.pathname.slice(14) || "index.html");
      if (!filename.startsWith(project + path.sep)) throw new Error("Not found");
      const bytes = await fs.readFile(filename);
      response.writeHead(200, { "Content-Type": ({ ".html": "text/html", ".js": "application/javascript", ".css": "text/css" })[path.extname(filename)] || "application/octet-stream" });
      if (url.pathname.endsWith("/design-worker.js") && url.searchParams.has("legacy")) {
        legacyWorkerLoads++;
        response.write("delete Array.prototype.toSorted; delete Array.prototype.toReversed;\n");
      }
      response.end(bytes);
    } catch { response.writeHead(404); response.end(); }
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  let browser;
  try {
    browser = await chromium.launch({ channel: "chrome", headless: true });
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, acceptDownloads: true });
    const errors = [], uploads = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("request", (request) => { if (["POST", "PUT"].includes(request.method())) uploads.push(request.url()); });
    await page.route("https://**/*", (route) => route.abort());
    await page.goto(`http://127.0.0.1:${server.address().port}/pm-workbench/`);
    assert.deepEqual(errors, []);
    await page.locator("#loginUsername").fill("admin"); await page.locator("#loginPassword").fill("admin");
    await page.locator("#loginForm").evaluate((form) => form.requestSubmit());
    await page.locator("#appShell").waitFor({ state: "visible" });
    await page.locator('[data-page="tools"]').click(); await page.locator("#designToolOpen").click();
    assert.equal(await page.locator("#designConvert").isDisabled(), true);
    assert.equal(await page.locator('#designWorkspace a[target="_blank"]').count(), 0);
    assert.match(await page.locator("#designDrop").textContent(), /不再限制原文件大小/);
    await page.locator("#designFile").setInputFiles({ name: "sample.sketch", mimeType: "application/octet-stream", buffer: Buffer.from(source) });
    await page.waitForFunction(() => !document.querySelector("#designConvert").disabled);
    assert.match(await page.locator("#designSourceInfo").textContent(), /6 个图层 · 1 张图片/);
    assert.equal(await page.locator("#designStrict").isChecked(), true);
    for (const target of ["fig", "xd"]) {
      await page.locator("#designTarget").selectOption(target);
      await page.locator("#designConvert").click();
      await page.locator("#designResult").waitFor({ state: "visible" });
      const downloadEvent = page.waitForEvent("download"); await page.locator("#designDownload").click();
      const download = await downloadEvent;
      assert.equal(download.suggestedFilename(), `sample.${target}`);
      const result = await readDesign(new Uint8Array(await fs.readFile(await download.path())), download.suggestedFilename());
      assert.equal(result.stats.text, 1); assert.equal(result.stats.images, 1);
    }
    await page.screenshot({ path: "/tmp/pm-workbench-design-native.png", fullPage: true });
    await page.locator("#designTarget").selectOption("fig");
    assert.equal(await page.locator("#designResult").isVisible(), false);
    await page.locator("#designFile").setInputFiles({ name: "bad.fig", mimeType: "application/octet-stream", buffer: Buffer.from([1, 2, 3]) });
    await page.waitForFunction(() => document.querySelector("#designStatus").classList.contains("is-error"));
    assert.equal(await page.locator("#designConvert").isDisabled(), true);
    await page.locator("#designFile").setInputFiles({ name: "again.fig", mimeType: "application/octet-stream", buffer: Buffer.from(native.fig) });
    await page.waitForFunction(() => !document.querySelector("#designConvert").disabled);
    await page.locator("#designTarget").selectOption("sketch");
    await page.locator("#designConvert").click();
    await page.locator("#designResult").waitFor({ state: "visible" });
    const maskEntries = unzipSync(source);
    const maskPage = JSON.parse(strFromU8(maskEntries["pages/page.json"]));
    maskPage.layers[0].layers[0].layers[0].hasClippingMask = true;
    maskEntries["pages/page.json"] = strToU8(JSON.stringify(maskPage));
    const maskSource = zipSync(maskEntries);
    await page.locator("#designFile").setInputFiles({ name: "mask.sketch", mimeType: "application/octet-stream", buffer: Buffer.from(maskSource) });
    await page.waitForFunction(() => !document.querySelector("#designConvert").disabled);
    await page.locator("#designTarget").selectOption("xd");
    await page.locator("#designConvert").click();
    await page.waitForFunction(() => document.querySelector("#designStatus").classList.contains("is-error"));
    assert.match(await page.locator("#designIssues").textContent(), /蒙版/);
    assert.equal(await page.locator("#designResult").isVisible(), false);
    assert.equal(await page.locator("#designConvert").isDisabled(), false);
    await page.locator("#designStrict").uncheck();
    await page.locator("#designConvert").click();
    await page.locator("#designResult").waitFor({ state: "visible" });
    assert.match(await page.locator("#designStatus").textContent(), /兼容模式/);
    await page.locator("#designStrict").check();
    assert.equal(await page.locator("#designResult").isVisible(), false);
    await page.locator("#designTarget").selectOption("fig");
    await page.locator("#designConvert").click();
    await page.locator("#designResult").waitFor({ state: "visible" });
    const largeFilename = path.join(largeDirectory, "large.sketch");
    await fs.writeFile(largeFilename, largeSource);
    await page.locator("#designFile").setInputFiles(largeFilename);
    await page.waitForFunction(() => !document.querySelector("#designConvert").disabled);
    assert.match(await page.locator("#designSourceInfo").textContent(), /100\.0 MB.*6 个图层/);
    await page.locator("#designTarget").selectOption("fig");
    await page.locator("#designConvert").click();
    await page.locator("#designResult").waitFor({ state: "visible" });
    const largeDownloadEvent = page.waitForEvent("download");
    await page.locator("#designDownload").click();
    const largeDownload = await largeDownloadEvent;
    assert.equal(largeDownload.suggestedFilename(), "large.fig");
    const largeOutput = await readDesign(new Uint8Array(await fs.readFile(await largeDownload.path())), "large.fig");
    assert.deepEqual(largeOutput.stats, parsed.stats);
    await page.locator("#designToolBack").click();
    assert.equal(await page.evaluate(() => document.activeElement.id), "designToolOpen");
    await page.locator('[data-page="dashboard"]').click();
    assert.equal(await page.locator("#designWorkspace").count(), 0);

    const legacyPage = await browser.newPage({ viewport: { width: 1440, height: 1000 }, acceptDownloads: true });
    legacyPage.on("pageerror", (error) => errors.push(error.message));
    legacyPage.on("request", (request) => { if (["POST", "PUT"].includes(request.method())) uploads.push(request.url()); });
    await legacyPage.route("https://**/*", (route) => route.abort());
    await legacyPage.addInitScript(() => {
      const NativeWorker = window.Worker;
      window.Worker = class extends NativeWorker {
        constructor(url, options) {
          const target = new URL(url, location.href);
          if (target.pathname.endsWith("/design-worker.js")) target.searchParams.set("legacy", "1");
          super(target, options);
        }
      };
    });
    await legacyPage.goto(`http://127.0.0.1:${server.address().port}/pm-workbench/`);
    await legacyPage.locator("#loginUsername").fill("admin"); await legacyPage.locator("#loginPassword").fill("admin");
    await legacyPage.locator("#loginForm").evaluate((form) => form.requestSubmit());
    await legacyPage.locator("#appShell").waitFor({ state: "visible" });
    await legacyPage.locator('[data-page="tools"]').click(); await legacyPage.locator("#designToolOpen").click();
    await legacyPage.locator("#designFile").setInputFiles({ name: "legacy.fig", mimeType: "application/octet-stream", buffer: Buffer.from(native.fig) });
    await legacyPage.waitForFunction(() => !document.querySelector("#designConvert").disabled);
    assert.match(await legacyPage.locator("#designSourceInfo").textContent(), /6 个图层 · 1 张图片/);
    const modernParsed = await readDesign(native.fig, "legacy.fig");
    for (const target of ["xd", "sketch"]) {
      await legacyPage.locator("#designTarget").selectOption(target);
      await legacyPage.locator("#designConvert").click();
      await legacyPage.locator("#designResult").waitFor({ state: "visible" });
      const downloadEvent = legacyPage.waitForEvent("download");
      await legacyPage.locator("#designDownload").click();
      const download = await downloadEvent;
      assert.equal(download.suggestedFilename(), `legacy.${target}`);
      const output = await readDesign(new Uint8Array(await fs.readFile(await download.path())), download.suggestedFilename());
      const expectedFile = await convertDesign(modernParsed, target);
      const expected = await readDesign(expectedFile.bytes, expectedFile.filename);
      assert.deepEqual(output.stats, expected.stats);
      assert.equal([...output.graph.nodes.values()].find((node) => node.name === "Title").text, "中文 Orbit");
      assert.deepEqual([...output.graph.images.values()], [...expected.graph.images.values()]);
    }
    assert.equal(legacyWorkerLoads, 1);
    await legacyPage.screenshot({ path: "/tmp/pm-workbench-design-legacy.png", fullPage: true });
    assert.deepEqual(uploads, []); assert.deepEqual(errors, []);
    console.log("PASS: browser worker conversion and downloads including >100 MB input, format invalidation, corrupt-file recovery, navigation cleanup and no file uploads.");
    console.log("PASS: Figma opens and exports XD/Sketch when the worker has no native toSorted/toReversed APIs.");
  } finally { await browser?.close(); await new Promise((resolve) => server.close(resolve)); await fs.rm(largeDirectory, { recursive: true, force: true }); }
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
