const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const { unzipSync, strFromU8 } = require("fflate");

module.exports = async function testText() {
  const { createGraph, addNode, solid, color, stats, EMPTY_PNG } = await import("../src/design/common.mjs");
  const { readDesign, convertDesign } = await import("../src/design/convert.mjs");
  const graph = createGraph(), page = graph.addPage("Text");
  const board = addNode(graph, "FRAME", page.id, { name: "Text Board", width: 360, height: 130, fills: [solid(color(1, 1, 1))] });
  const node = addNode(graph, "TEXT", board.id, { name: "Mixed editable text", x: 20, y: 20, width: 320, height: 80, text: "AlphaBold small\nNext", fontFamily: "Arial", fontSize: 20, fontWeight: 400, letterSpacing: -0.4, lineHeight: 32, fills: [solid(color())], styleRuns: [
    { start: 5, length: 4, style: { fontWeight: 700, letterSpacing: 2, fills: [solid(color(1, 0, 0, 0.6))] } },
    { start: 9, length: 6, style: { fontSize: 14, letterSpacing: 0, textDecoration: "UNDERLINE" } },
    { start: 16, length: 4, style: { italic: true, textDecoration: "STRIKETHROUGH", textCase: "UPPER" } },
  ] });
  const parsed = { graph, source: "fig", filename: "text.fig", thumbnail: EMPTY_PNG, issues: [], stats: stats(graph) };
  const snapshot = structuredClone([...graph.nodes.values()]);
  const result = await convertDesign(parsed, "xd");
  assert.ok(result.issues.every((issue) => issue.severity === "info"));
  assert.deepEqual([...graph.nodes.values()], snapshot);
  let raw;
  function walk(n) { if (n.type === "text") raw = n; for (const c of n.children || n.artboard?.children || n.group?.children || []) walk(c); }
  for (const [name, bytes] of Object.entries(unzipSync(result.bytes))) if (name.startsWith("artwork/") && name.endsWith(".agc")) walk(JSON.parse(strFromU8(bytes)));
  assert.equal(raw.style.textAttributes.letterSpacing, -20);
  assert.equal(raw.meta.ux.rangedStyles.reduce((total, run) => total + run.length, 0), node.text.length);
  const bold = raw.meta.ux.rangedStyles.find((range) => range.fontStyle === "Bold");
  assert.equal(bold.charSpacing, 100);
  assert.equal(bold.fill.value >>> 24, 153);
  assert.equal(raw.text.paragraphs[0].lines[0].length, 3);
  assert.equal(raw.text.paragraphs[0].lines[0][1].x, undefined);
  assert.equal(raw.text.paragraphs[0].lines[0][1].style.font.size, 20);
  assert.equal(raw.text.paragraphs[0].lines[0][2].style.font.size, 14);
  assert.equal(raw.text.paragraphs[1].lines[0][0].style.font.postscriptName, "Arial-ItalicMT");
  const output = await readDesign(result.bytes, result.filename);
  const text = [...output.graph.nodes.values()].find((n) => n.name === node.name);
  assert.equal(text.type, "TEXT");
  assert.equal(text.text, node.text);
  assert.equal(text.letterSpacing, -0.4);
  const runAt = (index) => text.styleRuns.find((run) => run.start <= index && run.start + run.length > index).style;
  assert.equal(runAt(5).fontWeight, 700);
  assert.equal(runAt(5).letterSpacing, 2);
  assert.equal(runAt(5).fills[0].color.a, 0.6);
  assert.equal(runAt(9).fontSize, 14);
  assert.equal(runAt(9).textDecoration, "UNDERLINE");
  assert.equal(runAt(16).italic, true);
  assert.equal(runAt(16).textCase, "UPPER");
  assert.equal(runAt(16).textDecoration, "STRIKETHROUGH");
  const style = node.styleRuns[0].style;
  for (const extra of [{ lineHeight: 28 }, { fontFeatures: [{ tag: "liga", value: 0 }] }, { fills: [{ ...solid(color()), type: "GRADIENT_LINEAR" }] }]) {
    node.styleRuns[0].style = { ...style, ...extra };
    await assert.rejects(convertDesign(parsed, "xd"), (error) => error.code === "PRESERVATION_REQUIRED" && error.issues.some((issue) => issue.code === "xd-text-runs"));
  }
  node.styleRuns[0].style = style;
  await fs.writeFile("/tmp/pm-workbench-native-text.xd", result.bytes);
  console.log("PASS: editable XD text ranges retain local font, color, alpha, spacing, decorations and case; unsupported range properties remain blocked.");
};
