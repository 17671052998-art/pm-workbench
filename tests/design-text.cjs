const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const { unzipSync, strFromU8 } = require("fflate");

module.exports = async function testText() {
  const { createGraph, addNode, solid, color, stats, xdMatrix, EMPTY_PNG } = await import("../src/design/common.mjs");
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
  const { xdTextLayout } = await import("../src/design/xd-text-layout.mjs");
  const cached = addNode(graph, "TEXT", board.id, { name: "Saved Figma baselines", x: 18, y: 7, width: 200, height: 120, fontFamily: "PingFang SC", fontPostscript: "PingFangSC-Regular", fontSize: 28, text: "Left wrap\nRight", textAlignVertical: "CENTER", paragraphSpacing: 3, fills: [solid(color())] });
  Object.assign(cached.source, { format: "fig", editedFields: [], fig: { rawSize: { x: 200, y: 120 }, rawNodeFields: { textData: { characters: cached.text }, derivedTextData: { baselines: [
    { firstCharacter: 0, endCharacter: 5, position: { x: 12, y: 29.58 }, width: 120, lineHeight: 39.2 },
    { firstCharacter: 5, endCharacter: 10, position: { x: 20, y: 68.78 }, width: 80, lineHeight: 39.2 },
    { firstCharacter: 10, endCharacter: 15, position: { x: 40, y: 110.98 }, width: 100, lineHeight: 39.2 },
  ] } } } });
  const layoutSnapshot = structuredClone(cached);
  const expectedLines = [{ from: 0, to: 5, x: 12, y: 29.58, width: 120 }, { from: 5, to: 9, x: 20, y: 68.78, width: 80 }, { from: 10, to: 15, x: 40, y: 110.98, width: 100 }];
  const getLines = (layout) => layout.paragraphs.flatMap((paragraph) => paragraph.lines);
  assert.deepEqual(getLines(xdTextLayout(cached)), expectedLines);
  cached.source.editedFields = ["fontSize"];
  assert.equal(xdTextLayout(cached).origin, "estimated", "stale layout must not survive font edits");
  cached.source.editedFields = [];
  cached.source.fig.rawNodeFields.textData.characters = "old text";
  assert.equal(xdTextLayout(cached).origin, "estimated", "stale character indexes must not be used");
  cached.source.fig.rawNodeFields.textData.characters = cached.text;
  cached.width = 220;
  assert.equal(xdTextLayout(cached).origin, "estimated", "resized text must not reuse old wrapping");
  cached.width = 200;
  const centered = addNode(graph, "TEXT", board.id, { name: "Rotated centered baseline", text: "Anchor", x: 40, y: 35, width: 100, height: 28, fontSize: 20, textAlignHorizontal: "CENTER", rotation: 30, fills: [solid(color())] });
  Object.assign(centered.source, { format: "fig", editedFields: [], fig: { rawSize: { x: 100, y: 28 }, rawNodeFields: { textData: { characters: centered.text }, derivedTextData: { baselines: [{ firstCharacter: 0, endCharacter: 6, position: { x: 17.5, y: 21.2 }, width: 65, lineHeight: 28 }] } } } });
  const positionedResult = await convertDesign(parsed, "xd");
  let positioned, centeredRaw;
  const ids = new Set();
  function findPositioned(n) {
    if (n.name === cached.name) positioned = n;
    if (n.name === centered.name) centeredRaw = n;
    if (n.id) { assert.ok(!ids.has(n.id), "group, backup and line IDs must be unique"); ids.add(n.id); }
    for (const c of n.children || n.artboard?.children || n.group?.children || []) findPositioned(c);
  }
  for (const [name, bytes] of Object.entries(unzipSync(positionedResult.bytes))) if (name.startsWith("artwork/") && name.endsWith(".agc")) findPositioned(JSON.parse(strFromU8(bytes)));
  assert.equal(positioned.type, "group");
  const savedText = positioned.group.children.find((child) => child.name?.includes("完整原文备份"));
  const editableLines = positioned.group.children.filter((child) => child.type === "text" && child.visible);
  assert.equal(savedText.visible, false);
  assert.equal(savedText.text.rawText, cached.text);
  assert.equal(savedText.text.paragraphs.length, 2);
  assert.equal(savedText.style.textAttributes.lineHeight, 39.2);
  assert.deepEqual(editableLines.map((child) => child.text.rawText), ["Left ", "wrap", "Right"]);
  assert.deepEqual(editableLines.map((child) => child.transform.ty), [29.58, 68.78, 110.98]);
  assert.ok(editableLines.every((child) => child.text.paragraphs[0].lines[0][0].y === 0));
  assert.equal(positioned.transform.ty, 7, "the parent retains the source text-box origin");
  const matrix = xdMatrix(centered);
  assert.deepEqual(centeredRaw.meta.ux.orbitTextLayout.anchor, { x: 50, y: 21.2 });
  assert.ok(Math.abs(centeredRaw.transform.tx - (matrix.tx + matrix.a * 50 + matrix.c * 21.2)) < 1e-8);
  assert.ok(Math.abs(centeredRaw.transform.ty - (matrix.ty + matrix.b * 50 + matrix.d * 21.2)) < 1e-8);
  const roundTrip = await readDesign(positionedResult.bytes, positionedResult.filename);
  const restored = [...roundTrip.graph.nodes.values()].find((n) => n.name === cached.name);
  assert.equal(restored.y, 7);
  assert.equal(restored.x, 18);
  const restoredText = [...roundTrip.graph.nodes.values()].find((n) => n.name === savedText.name);
  assert.equal(restoredText.textAlignVertical, "CENTER");
  assert.equal(restoredText.paragraphSpacing, 3);
  assert.equal(restoredText.x, 0);
  assert.equal(restoredText.y, 0);
  assert.deepEqual(getLines(xdTextLayout(restoredText)), expectedLines);
  assert.deepEqual(cached, layoutSnapshot);
  await fs.writeFile("/tmp/pm-workbench-text-baselines.xd", positionedResult.bytes);
  console.log("PASS: source baselines use native XD baseline anchors, multiline text keeps individually editable lines and the original full-text backup, re-import avoids origin drift, and stale layout caches are ignored.");
  console.log("PASS: editable XD text ranges retain local font, color, alpha, spacing, decorations and case; unsupported range properties remain blocked.");
};
