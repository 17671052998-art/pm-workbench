const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const { unzipSync, zipSync, strFromU8, strToU8 } = require("fflate");
const { chromium } = require("playwright");

module.exports = async function testMasks() {
  const { createGraph, addNode, solid, color, stats, EMPTY_PNG } = await import("../src/design/common.mjs");
  const { readDesign, convertDesign, inspectDesign } = await import("../src/design/convert.mjs");
  const graph = createGraph(), page = graph.addPage("Vector masks");
  const board = addNode(graph, "FRAME", page.id, { name: "Vector Mask Board", width: 300, height: 150, fills: [solid(color(1, 1, 1))] });
  const group = addNode(graph, "GROUP", board.id, { name: "Luminance", x: 20, y: 30, width: 80, height: 80 });
  const mask = addNode(graph, "GROUP", group.id, { name: "Black-white mask", width: 80, height: 80, isMask: true, maskType: "LUMINANCE" });
  const inner = addNode(graph, "GROUP", mask.id, { name: "Source group", width: 80, height: 80 });
  const stroke = (c, weight = 4) => ({ ...solid(c), weight, align: "CENTER", cap: "NONE", join: "MITER", dashPattern: [] });
  addNode(graph, "RECTANGLE", inner.id, { name: "White outer", width: 80, height: 80, fills: [solid(color(1, 1, 1))], strokes: [stroke(color(1, 1, 1))] });
  addNode(graph, "RECTANGLE", inner.id, { name: "Black cutout", x: 30, y: 30, width: 20, height: 20, fills: [solid(color())], strokes: [stroke(color())] });
  addNode(graph, "RECTANGLE", group.id, { name: "Blue content", x: -10, y: -10, width: 100, height: 100, fills: [solid(color(0, 0, 1))] });
  const alpha = addNode(graph, "GROUP", board.id, { name: "Alpha", x: 140, y: 30, width: 80, height: 80 });
  addNode(graph, "ELLIPSE", alpha.id, { name: "Stroke-only mask", x: 10, y: 10, width: 60, height: 60, isMask: true, maskType: "ALPHA", fills: [], strokes: [stroke(color(1, 1, 1), 12)] });
  addNode(graph, "RECTANGLE", alpha.id, { name: "Orange content", width: 80, height: 80, fills: [solid(color(1, 0.5, 0))] });
  const parsed = { graph, source: "fig", filename: "masks.fig", thumbnail: EMPTY_PNG, issues: [], stats: stats(graph) };
  const before = structuredClone([...graph.nodes.values()]);
  assert.equal(inspectDesign(parsed, "xd").some((issue) => issue.code === "mask"), false);
  const result = await convertDesign(parsed, "xd");
  assert.ok(result.issues.every((issue) => issue.severity === "info"));
  assert.equal(result.issues.find((issue) => issue.code === "xd-vector-mask").count, 2);
  assert.deepEqual([...graph.nodes.values()], before);
  const archive = unzipSync(result.bytes), nodes = [];
  function walk(n) { nodes.push(n); for (const c of n.children || n.artboard?.children || n.group?.children || n.shape?.children || []) walk(c); for (const c of n.meta?.ux?.clipPathResources?.children || []) walk(c); }
  for (const [name, bytes] of Object.entries(archive)) if (name.startsWith("artwork/") && name.endsWith(".agc")) walk(JSON.parse(strFromU8(bytes)));
  const raw = (name) => nodes.find((node) => node.name === name);
  for (const source of graph.nodes.values()) if (source.id !== graph.rootId && source.type !== "CANVAS") assert.ok(raw(source.name), `${source.name}: native source retained`);
  assert.equal(raw(mask.name).visible, false);
  assert.equal(raw("White outer").style.stroke.width, 4);
  assert.equal(raw("Black cutout").style.fill.color.value.r, 0);
  assert.equal(raw("Black cutout").style.stroke.width, 4);
  assert.equal(Object.keys(archive).some((name) => /^resources\/[^/]+$/.test(name)), false, "no rasterized mask resources");
  const output = await readDesign(result.bytes, result.filename);
  const restored = [...output.graph.nodes.values()];
  assert.equal(restored.find((node) => node.name === mask.name).visible, true);
  assert.equal(restored.find((node) => node.name === mask.name).maskType, "LUMINANCE");
  assert.equal(restored.find((node) => node.name === "Black cutout").strokes[0].weight, 4);
  const editedArchive = unzipSync(result.bytes);
  for (const [name, bytes] of Object.entries(editedArchive)) if (name.startsWith("artwork/") && name.endsWith(".agc")) {
    const content = JSON.parse(strFromU8(bytes));
    function edit(node) {
      if (node.name === `${mask.name} / 蒙版`) node.meta.ux.clipPathResources.children[0].shape.path = "M0 0 L20 0 L20 20 L0 20 Z";
      for (const child of node.children || node.artboard?.children || node.group?.children || []) edit(child);
    }
    edit(content);
    editedArchive[name] = strToU8(JSON.stringify(content));
  }
  const editedOutput = await readDesign(zipSync(editedArchive), "edited-masks.xd");
  const editedClip = [...editedOutput.graph.nodes.values()].find((node) => node.name === `${mask.name} / 矢量裁切`);
  assert.ok(editedClip.isMask);
  assert.equal(editedClip.maskType, "VECTOR");
  assert.deepEqual([editedClip.width, editedClip.height], [20, 20]);
  assert.equal([...editedOutput.graph.nodes.values()].find((node) => node.name === mask.name).visible, false);
  assert.ok(editedOutput.issues.some((issue) => issue.code === "xd-mask-edited" && issue.severity === "info"));
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  try {
    const tab = await browser.newPage();
    const pixels = await tab.evaluate(({ ring, circle }) => {
      const canvas = document.createElement("canvas"); canvas.width = 120; canvas.height = 120;
      const ctx = canvas.getContext("2d");
      ctx.translate(10, 10); ctx.fill(new Path2D(ring));
      const at = (x, y) => ctx.getImageData(x + 10, y + 10, 1, 1).data[3];
      const values = [at(-1, 40), at(10, 10), at(27, 40), at(28, 40), at(40, 40), at(52, 40), at(83, 40)];
      ctx.resetTransform(); ctx.clearRect(0, 0, 120, 120); ctx.fill(new Path2D(circle));
      values.push(ctx.getImageData(30, 1, 1, 1).data[3], ctx.getImageData(30, 30, 1, 1).data[3]);
      return values;
    }, { ring: raw(`${mask.name} / 矢量裁切`).shape.path, circle: raw("Stroke-only mask / 矢量裁切").shape.path });
    assert.deepEqual(pixels, [255, 255, 255, 0, 0, 255, 0, 255, 0]);
  } finally { await browser.close(); }
  const white = [...graph.nodes.values()].find((node) => node.name === "White outer");
  white.fills[0].color.a = 0.5;
  assert.ok(inspectDesign(parsed, "xd").some((issue) => issue.code === "mask" && issue.category === "format"));
  await assert.rejects(convertDesign(parsed, "xd"), (error) => error.code === "PRESERVATION_REQUIRED");
  await fs.writeFile("/tmp/pm-workbench-vector-masks.xd", result.bytes);
  console.log("PASS: black-white group masks and stroked alpha masks become editable vector clips with exact stroke extents, preserved native source layers and no raster images.");
};
