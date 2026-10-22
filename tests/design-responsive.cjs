const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const { unzipSync, zipSync, strFromU8, strToU8 } = require("fflate");

module.exports = async function testResponsive() {
  const { createGraph, addNode, solid, color, stats, EMPTY_PNG } = await import("../src/design/common.mjs");
  const { readDesign, convertDesign, inspectDesign } = await import("../src/design/convert.mjs");
  const graph = createGraph(), page = graph.addPage("Responsive");
  const board = addNode(graph, "FRAME", page.id, { name: "Responsive Board", width: 520, height: 260, fills: [solid(color(1, 1, 1))] });
  const pair = addNode(graph, "FRAME", board.id, { name: "Responsive Pair", x: 30, y: 30, width: 300, height: 60, layoutMode: "HORIZONTAL", layoutWrap: "NO_WRAP", primaryAxisAlign: "SPACE_BETWEEN", counterAxisAlign: "CENTER", primaryAxisSizing: "FIXED", counterAxisSizing: "FIXED", clipsContent: false });
  const left = addNode(graph, "FRAME", pair.id, { name: "Left fixed", width: 40, height: 60 });
  addNode(graph, "RECTANGLE", left.id, { name: "Red", width: 40, height: 60, fills: [solid(color(1, 0, 0))] });
  const right = addNode(graph, "FRAME", pair.id, { name: "Right fixed", x: 240, y: 20, width: 60, height: 20 });
  addNode(graph, "RECTANGLE", right.id, { name: "Blue", width: 60, height: 20, fills: [solid(color(0, 0, 1))] });
  const vertical = addNode(graph, "FRAME", board.id, { name: "Vertical Pair", x: 30, y: 130, width: 60, height: 100, layoutMode: "VERTICAL", layoutWrap: "NO_WRAP", primaryAxisAlign: "SPACE_BETWEEN", counterAxisAlign: "CENTER", primaryAxisSizing: "FIXED", counterAxisSizing: "FIXED", clipsContent: false });
  const top = addNode(graph, "RECTANGLE", vertical.id, { name: "Top fixed", x: 10, width: 40, height: 20, fills: [solid(color(1, 0, 0))] });
  const bottom = addNode(graph, "RECTANGLE", vertical.id, { name: "Bottom fixed", y: 70, width: 60, height: 30, fills: [solid(color(0, 0, 1))] });
  const parsed = { graph, source: "fig", filename: "responsive.fig", thumbnail: EMPTY_PNG, stats: stats(graph), issues: [] };
  const before = structuredClone([...graph.nodes.values()]);
  assert.equal(inspectDesign(parsed, "xd").some((issue) => issue.code === "layout-fixed"), false);
  const result = await convertDesign(parsed, "xd");
  assert.ok(result.issues.some((issue) => issue.code === "xd-responsive-pair" && issue.severity === "info"));
  assert.deepEqual([...graph.nodes.values()], before);
  const nodes = [];
  function walk(node) { nodes.push(node); for (const c of node.children || node.artboard?.children || node.group?.children || []) walk(c); }
  for (const [name, bytes] of Object.entries(unzipSync(result.bytes))) if (name.startsWith("artwork/") && name.endsWith(".agc")) walk(JSON.parse(strFromU8(bytes)));
  const raw = (name) => nodes.find((node) => node.name === name);
  const l = raw(left.name).meta.ux, r = raw(right.name).meta.ux;
  assert.equal(l.customConstraints, true);
  assert.equal(l.constraintLeft, true);
  assert.equal(l.constraintRight, false);
  assert.equal(r.constraintRight, true);
  for (const constraints of [l, r]) {
    assert.equal(constraints.constraintWidth, true);
    assert.equal(constraints.constraintHeight, true);
    assert.equal(constraints.constraintTop, false);
    assert.equal(constraints.constraintBottom, false);
  }
  for (const [child, first] of [[top, true], [bottom, false]]) {
    const constraints = raw(child.name).meta.ux;
    assert.equal(constraints.constraintTop, first);
    assert.equal(constraints.constraintBottom, !first);
    assert.equal(constraints.constraintLeft, false);
    assert.equal(constraints.constraintRight, false);
    assert.equal(constraints.constraintWidth, true);
    assert.equal(constraints.constraintHeight, true);
  }
  assert.equal(raw(pair.name).group.children[0].meta.ux.orbitLayoutBounds, true);
  const output = await readDesign(result.bytes, result.filename);
  const restored = [...output.graph.nodes.values()].find((node) => node.name === pair.name);
  assert.equal(restored.layoutMode, "HORIZONTAL");
  assert.equal(restored.primaryAxisAlign, "SPACE_BETWEEN");
  assert.deepEqual([restored.width, restored.height], [300, 60]);
  assert.equal([...output.graph.nodes.values()].find((node) => node.name === vertical.name).layoutMode, "VERTICAL");
  assert.equal([...output.graph.nodes.values()].some((node) => node.name.endsWith("/ 布局尺寸")), false);
  const resized = unzipSync(result.bytes);
  for (const [name, bytes] of Object.entries(resized)) if (name.startsWith("artwork/") && name.endsWith(".agc")) {
    const content = JSON.parse(strFromU8(bytes));
    function resize(node) {
      if (node.name === pair.name) Object.assign(node.group.children[0].shape, { width: 400, height: 100 });
      if (node.name === left.name) Object.assign(node.transform, { tx: 0, ty: 20 });
      if (node.name === right.name) Object.assign(node.transform, { tx: 340, ty: 40 });
      for (const child of node.children || node.artboard?.children || node.group?.children || []) resize(child);
    }
    resize(content);
    resized[name] = strToU8(JSON.stringify(content));
  }
  const edited = await readDesign(zipSync(resized), result.filename);
  const editedPair = [...edited.graph.nodes.values()].find((node) => node.name === pair.name);
  assert.deepEqual([editedPair.width, editedPair.height], [400, 100]);
  assert.deepEqual(edited.graph.getChildren(editedPair.id).map((child) => [child.x, child.y, child.width, child.height]), [[0, 20, 40, 60], [340, 40, 60, 20]]);
  for (const override of [{ layoutWrap: "WRAP" }, { primaryAxisSizing: "AUTO" }, { paddingLeft: 10 }, { counterAxisAlign: "MIN" }]) {
    const saved = Object.fromEntries(Object.keys(override).map((key) => [key, pair[key]]));
    Object.assign(pair, override);
    assert.ok(inspectDesign(parsed, "xd").some((issue) => issue.code === "layout-fixed"));
    Object.assign(pair, saved);
  }
  await fs.writeFile("/tmp/pm-workbench-responsive.xd", result.bytes);
  console.log("PASS: two-item space-between layouts use editable native XD edge constraints and fixed-size children; source layout and dimensions survive import.");
};
