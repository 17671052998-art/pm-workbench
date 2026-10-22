const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const { unzipSync, strFromU8 } = require("fflate");

module.exports = async function testClipping() {
  const { createGraph, addNode, addImage, solid, color, stats, EMPTY_PNG, xdImageTransform } = await import("../src/design/common.mjs");
  const { readDesign, convertDesign } = await import("../src/design/convert.mjs");
  const graph = createGraph(), page = graph.addPage("Clipping");
  const board = addNode(graph, "FRAME", page.id, { name: "Clipping Board", width: 320, height: 120, fills: [solid(color(1, 1, 1))] });
  const hash = await addImage(graph, new Uint8Array(await fs.readFile(path.join(__dirname, "fixtures/quadrants.png"))));
  const crop = addNode(graph, "RECTANGLE", board.id, { name: "Crop", x: 10, y: 10, width: 80, height: 80, cornerRadius: 6, fills: [{ ...solid(color()), type: "IMAGE", imageHash: hash, imageScaleMode: "STRETCH", imageTransform: { m00: 0.5, m01: 0, m02: 0.5, m10: 0, m11: 1, m12: 0 } }] });
  const maskGroup = addNode(graph, "GROUP", board.id, { name: "Mask group", x: 110, y: 10, width: 80, height: 80 });
  addNode(graph, "ELLIPSE", maskGroup.id, { name: "Circle mask", x: 10, y: 10, width: 60, height: 60, isMask: true, maskType: "ALPHA", fills: [solid(color(1, 1, 1))] });
  addNode(graph, "RECTANGLE", maskGroup.id, { name: "Masked blue", width: 80, height: 80, fills: [solid(color(0, 0, 1))] });
  const frame = addNode(graph, "FRAME", board.id, { name: "Clip frame", x: 210, y: 10, width: 60, height: 60, cornerRadius: 10, clipsContent: true, fills: [solid(color(1, 1, 1))], strokes: [{ ...solid(color()), weight: 2, align: "CENTER" }] });
  addNode(graph, "RECTANGLE", frame.id, { name: "Overflow orange", x: -20, y: -20, width: 100, height: 100, fills: [solid(color(1, 0.5, 0))] });
  addNode(graph, "RECTANGLE", board.id, { name: "Unaffected sibling", x: 280, y: 10, width: 20, height: 20, fills: [solid(color(1, 0, 0))] });
  const parsed = { graph, source: "fig", filename: "clipping.fig", thumbnail: EMPTY_PNG, issues: [], stats: stats(graph) };
  const snapshot = structuredClone([...graph.nodes.values()]);
  const result = await convertDesign(parsed, "xd");
  assert.ok(result.issues.every((issue) => issue.severity === "info"));
  assert.ok(result.issues.some((issue) => issue.code === "xd-image-crop"));
  assert.deepEqual([...graph.nodes.values()], snapshot);
  const rawNodes = [];
  function walk(n) { rawNodes.push(n); for (const c of n.children || n.artboard?.children || n.group?.children || n.shape?.children || []) walk(c); for (const c of n.meta?.ux?.clipPathResources?.children || []) walk(c); }
  for (const [name, bytes] of Object.entries(unzipSync(result.bytes))) if (name.startsWith("artwork/") && name.endsWith(".agc")) walk(JSON.parse(strFromU8(bytes)));
  const raw = (name) => rawNodes.find((node) => node.name === name);
  assert.deepEqual(raw("Crop / 原图").transform, { a: 4, b: 0, c: 0, d: 4, tx: -80, ty: 0 });
  assert.deepEqual([raw("Crop / 原图").shape.width, raw("Crop / 原图").shape.height], [40, 20]);
  assert.deepEqual(raw("Crop / 裁切形状").shape.r, [6, 6, 6, 6]);
  const masked = raw("Circle mask / 蒙版");
  assert.equal(masked.meta.ux.clipPathResources.children[0].name, "Circle mask");
  assert.equal(masked.group.children[0].name, "Masked blue");
  assert.equal(raw("Clip frame / 裁切内容").meta.ux.clipPathResources.children[0].shape.width, 60);
  assert.deepEqual(raw("Clip frame").group.children.map((node) => node.name), ["Clip frame 背景", "Clip frame / 裁切内容", "Clip frame 描边"]);
  for (const node of graph.nodes.values()) if (node.id !== graph.rootId && node.type !== "CANVAS") assert.ok(raw(node.name), `${node.name}: retained as a native layer or mask`);
  const output = await readDesign(result.bytes, result.filename);
  const masks = [...output.graph.nodes.values()].filter((node) => node.isMask);
  assert.equal(masks.length, 3);
  assert.ok(masks.some((mask) => mask.name === "Circle mask"));
  const matrix = xdImageTransform(crop, { ...crop.fills[0], imageTransform: { m00: 1, m01: 0.2, m02: 0.1, m10: -0.3, m11: 0.8, m12: 0.2 } }, { width: 40, height: 20 });
  const m = { m00: 1, m01: 0.2, m02: 0.1, m10: -0.3, m11: 0.8, m12: 0.2 };
  for (const [x, y] of [[0, 0], [1, 0], [0, 1], [0.3, 0.7]]) {
    const u = m.m00 * x + m.m01 * y + m.m02, v = m.m10 * x + m.m11 * y + m.m12;
    assert.ok(Math.abs(matrix.a * u * 40 + matrix.c * v * 20 + matrix.tx - x * 80) < 1e-9);
    assert.ok(Math.abs(matrix.b * u * 40 + matrix.d * v * 20 + matrix.ty - y * 80) < 1e-9);
  }
  await fs.writeFile("/tmp/pm-workbench-native-clipping.xd", result.bytes);
  console.log("PASS: native XD crop matrices, rounded frame clipping, sibling masks and unclipped borders; mask geometry survives import and source nodes remain unchanged.");
};
