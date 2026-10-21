const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const { unzipSync, strFromU8 } = require("fflate");

module.exports = async function testFidelity() {
  const { createGraph, addNode, addImage, solid, color, vectorProps, stats, EMPTY_PNG, nodePath, imageDimensions } = await import("../src/design/common.mjs");
  const { readDesign, convertDesign } = await import("../src/design/convert.mjs");
  const graph = createGraph();
  assert.deepEqual(imageDimensions(EMPTY_PNG), { width: 1, height: 1 });
  const jpegHeader = Uint8Array.of(0xff, 0xd8, 0xff, 0xe0, 0, 4, 0, 0, 0xff, 0xc2, 0, 8, 8, 0, 80, 0, 160, 0);
  assert.deepEqual(imageDimensions(jpegHeader), { width: 160, height: 80 });
  assert.equal(imageDimensions(jpegHeader.subarray(0, 15)), null);
  // A browser-generated black 16 x 8 JPEG, with no user artwork or metadata.
  const jpeg = await fs.readFile(path.join(__dirname, "fixtures/solid-16x8.jpg"));
  assert.deepEqual(imageDimensions(jpeg), { width: 16, height: 8 });
  assert.deepEqual(imageDimensions(Uint8Array.of(71, 73, 70, 56, 57, 97, 16, 0, 8, 0)), { width: 16, height: 8 });
  const webp = new Uint8Array(30), webpView = new DataView(webp.buffer);
  webp.set(Buffer.from("RIFF")); webp.set(Buffer.from("WEBPVP8X"), 8);
  webpView.setUint32(24, 299, true); webp[27] = 199;
  assert.deepEqual(imageDimensions(webp), { width: 300, height: 200 });
  webp.set(Buffer.from("VP8 "), 12); webp.set([0x9d, 1, 0x2a], 23);
  webpView.setUint16(26, 16, true); webpView.setUint16(28, 8, true);
  assert.deepEqual(imageDimensions(webp), { width: 16, height: 8 });
  webp.set(Buffer.from("VP8L"), 12); webp[20] = 0x2f; webpView.setUint32(21, 15 | 7 << 14, true);
  assert.deepEqual(imageDimensions(webp), { width: 16, height: 8 });
  const page = graph.addPage("Fidelity");
  const board = addNode(graph, "FRAME", page.id, { name: "Board", x: 100, y: 200, width: 400, height: 300, opacity: 0.8, fills: [solid(color(1, 1, 1))] });
  const group = addNode(graph, "GROUP", board.id, { name: "Container", width: 300, height: 240, opacity: 0.6, blendMode: "MULTIPLY" });
  const imageHash = await addImage(graph, EMPTY_PNG);
  const jpegHash = await addImage(graph, jpeg);
  const effect = (type, visible = true) => ({ type, visible, color: color(0.2, 0.3, 0.4, 0.5), radius: 10, spread: 0, offset: { x: 2, y: 3 }, blendMode: "NORMAL" });
  const card = addNode(graph, "RECTANGLE", group.id, {
    name: "Paint stack", x: 10, y: 12, width: 100, height: 80, opacity: 0.4, locked: true,
    independentCorners: true, topLeftRadius: 2, topRightRadius: 4, bottomRightRadius: 6, bottomLeftRadius: 8,
    fills: [solid(color(1, 0, 0)), { ...solid(color(1, 1, 1), 0.35), type: "IMAGE", imageHash, imageScaleMode: "FILL", blendMode: "OVERLAY" }, { ...solid(color(0, 1, 0)), visible: false }],
    strokes: [{ ...solid(color(0, 0, 1)), weight: 2, align: "INSIDE" }, { ...solid(color(1, 1, 0), 0.5), weight: 4, align: "OUTSIDE" }],
    dashPattern: [4, 2], strokeCap: "ROUND", strokeJoin: "BEVEL",
    effects: [effect("DROP_SHADOW"), effect("INNER_SHADOW", false), effect("LAYER_BLUR")],
  });
  addNode(graph, "RECTANGLE", group.id, { name: "Hidden", width: 12, height: 10, visible: false, fills: [solid(color())] });
  addNode(graph, "RECTANGLE", board.id, { name: "JPEG fill", width: 20, height: 20, fills: [{ ...solid(color()), type: "IMAGE", imageHash: jpegHash, imageScaleMode: "FILL" }] });
  const gradient = addNode(graph, "RECTANGLE", board.id, { name: "Gradient", x: 180, y: 20, width: 100, height: 80, fills: [{ ...solid(color()), type: "GRADIENT_LINEAR", gradientTransform: { m00: 1, m01: 0, m02: 0, m10: 0, m11: 1, m12: 0 }, gradientStops: [{ position: 0, color: color(1, 0, 0, 0.2) }, { position: 1, color: color(0, 0, 1, 0.8) }] }] });
  const compound = addNode(graph, "BOOLEAN_OPERATION", board.id, { name: "Boolean", x: 200, y: 120, width: 80, height: 60, booleanOperation: "SUBTRACT", fills: [solid(color(0.2, 0.7, 0.9))], ...vectorProps("M0 0 L80 0 L80 60 L0 60 Z M20 20 L20 40 L40 40 L40 20 Z", "EVENODD") });
  addNode(graph, "RECTANGLE", compound.id, { name: "Outer", width: 80, height: 60, fills: [solid(color())] });
  addNode(graph, "RECTANGLE", compound.id, { name: "Cutout", x: 20, y: 20, width: 20, height: 20, fills: [solid(color())] });
  const internal = graph.addPage("Internal resources");
  internal.internalOnly = true;
  addNode(graph, "RECTANGLE", internal.id, { name: "Hidden resource", width: 10, height: 10, visible: false, fills: [solid(color())] });
  const parsed = { graph, filename: "fidelity.fig", source: "fig", issues: [], stats: stats(graph), thumbnail: EMPTY_PNG };
  const before = structuredClone([...graph.nodes.values()]);
  const result = await convertDesign(parsed, "xd");
  assert.ok(result.issues.every((issue) => issue.severity === "info"));
  assert.deepEqual([...graph.nodes.values()], before, "export must not mutate source attributes");
  const archive = unzipSync(result.bytes);
  const rawNodes = [];
  function walk(node) { rawNodes.push(node); for (const child of node.children || node.artboard?.children || node.group?.children || node.shape?.children || []) walk(child); }
  for (const [filename, bytes] of Object.entries(archive)) if (filename.startsWith("artwork/") && filename.endsWith(".agc")) walk(JSON.parse(strFromU8(bytes)));
  const raw = (name) => rawNodes.find((node) => node.name === name);
  for (const source of graph.nodes.values()) if (source.type !== "CANVAS" && source.id !== graph.rootId) assert.ok(raw(source.name), `${source.name}: source layer retained`);
  assert.equal(raw("Board").style.opacity, 0.8);
  assert.equal(raw("Container").style.opacity, 0.6);
  assert.equal(raw("Container").style.blendMode, "multiply");
  const stack = raw("Paint stack");
  assert.equal(stack.type, "group");
  assert.equal(stack.style.opacity, 0.4, "opacity must use XD's style.opacity, not a top-level field");
  assert.equal(stack.meta.ux.locked, true);
  assert.equal(stack.group.children.length, 5);
  assert.equal(stack.group.children[1].style.opacity, 0.35);
  assert.equal(stack.group.children[1].style.blendMode, "overlay");
  assert.equal(stack.group.children[1].style.fill.type, "pattern");
  assert.deepEqual([raw("JPEG fill").style.fill.pattern.width, raw("JPEG fill").style.fill.pattern.height], [16, 8]);
  assert.equal(stack.group.children[2].visible, false);
  assert.deepEqual(stack.group.children[0].shape.r, [2, 4, 6, 8]);
  assert.deepEqual(stack.group.children[3].style.stroke.dash, [4, 2]);
  assert.equal(stack.group.children[3].style.stroke.cap, "round");
  assert.equal(stack.group.children[3].style.stroke.join, "bevel");
  const filters = stack.style.filters;
  assert.equal(filters[0].params.dropShadows[0].r, 5, "native XD stores half the UI blur radius");
  assert.equal(filters[1].params.innerShadows[0].r, 5);
  assert.equal(filters[1].visible, false, "disabled effects keep parameters");
  assert.equal(filters[2].global, true);
  assert.equal(filters[2].params.backgroundEffect, false);
  const g = raw("Gradient").style.fill;
  assert.equal(g.units, "objectBoundingBox");
  assert.deepEqual([g.x1, g.y1, g.x2, g.y2], [0, 0.5, 1, 0.5]);
  assert.equal(g.gradient.meta.ux.gradientResources.type, "linear");
  assert.deepEqual(g.gradient.meta.ux.gradientResources.stops.map((stop) => stop.color.alpha), [0.2, 0.8]);
  assert.equal(raw("Boolean").shape.type, "compound");
  assert.equal(raw("Boolean").shape.operation, "subtract");
  assert.equal(raw("Boolean").shape.children.length, 2);
  assert.match(raw("Boolean").shape.path, /M20/);
  const output = await readDesign(result.bytes, result.filename);
  const find = (name) => [...output.graph.nodes.values()].find((node) => node.name === name);
  assert.equal(find("Paint stack").opacity, 0.4);
  assert.equal(find("Hidden").visible, false);
  assert.deepEqual(find("Paint stack").effects.map((e) => [e.type, e.visible, e.radius]), [["DROP_SHADOW", true, 10], ["INNER_SHADOW", false, 10], ["LAYER_BLUR", true, 10]]);
  assert.equal(find("Boolean").type, "BOOLEAN_OPERATION");
  assert.equal(find("Boolean").booleanOperation, "SUBTRACT");
  assert.match(nodePath(find("Boolean")), /M20/);
  assert.deepEqual(find("Gradient").fills[0].gradientStops, gradient.fills[0].gradientStops);
  assert.equal(find("Hidden resource").visible, false);
  const sketch = await convertDesign(parsed, "sketch");
  const sketchArchive = unzipSync(sketch.bytes);
  const sketchNodes = [];
  function walkSketch(node) { sketchNodes.push(node); (node.layers || []).forEach(walkSketch); }
  for (const [filename, bytes] of Object.entries(sketchArchive)) if (filename.startsWith("pages/")) walkSketch(JSON.parse(strFromU8(bytes)));
  const sketchCard = sketchNodes.find((node) => node.name === card.name);
  assert.equal(sketchCard.style.fills.length, 3);
  assert.equal(sketchCard.style.fills[1].contextSettings.blendMode, 7);
  assert.equal(sketchCard.style.blur.radius, 10);
  assert.deepEqual(sketchCard.points.map((point) => point.cornerRadius), [2, 4, 6, 8]);
  assert.equal(sketchNodes.find((node) => node.name === "Boolean")._class, "shapeGroup");
  const sketchOutput = await readDesign(sketch.bytes, sketch.filename);
  const roundCard = [...sketchOutput.graph.nodes.values()].find((node) => node.name === card.name);
  assert.equal(roundCard.opacity, 0.4);
  assert.equal(roundCard.fills.length, 3);
  assert.equal(roundCard.effects.length, 3);
  assert.equal([...sketchOutput.graph.nodes.values()].find((node) => node.name === "Boolean").booleanOperation, "SUBTRACT");

  const savedFigma = await import("../src/design/figma.mjs");
  const figBytes = await savedFigma.writeFigma(graph, "fidelity", EMPTY_PNG);
  const figOutput = await readDesign(figBytes, "fidelity.fig");
  assert.equal(figOutput.graph.getPages(true).length, 2);
  assert.ok([...figOutput.graph.nodes.values()].some((node) => node.name === "Hidden resource"));
  // Unsupported attributes must never quietly generate a supposedly lossless file.
  gradient.isMask = true;
  const image = card.fills[1];
  image.imageTransform = { m00: 0.5, m01: 0, m02: 0.1, m10: 0, m11: 1, m12: 0 };
  await assert.rejects(convertDesign(parsed, "xd"), (error) => {
    assert.equal(error.code, "PRESERVATION_REQUIRED");
    assert.ok(error.issues.some((issue) => issue.code === "mask"));
    assert.ok(error.issues.some((issue) => issue.code === "image-crop"));
    return true;
  });
  const compatible = await convertDesign(parsed, "xd", { strict: false });
  assert.ok(compatible.issues.some((issue) => issue.severity === "warning"));
  delete image.imageTransform;
  gradient.isMask = false;
  const skipped = addNode(graph, "RECTANGLE", card.id, { name: "Unexpected child", width: 5, height: 5 });
  await assert.rejects(convertDesign(parsed, "xd"), (error) => error.code === "PRESERVATION_REQUIRED" && error.issues.some((issue) => issue.code === "missing-layer"));
  graph.deleteNode(skipped.id);
  await fs.writeFile("/tmp/pm-workbench-native-fidelity.xd", result.bytes);
  await fs.writeFile("/tmp/pm-workbench-native-fidelity.sketch", sketch.bytes);
  console.log("PASS: canonical native XD opacity, gradient, shadow, paint stacks, corners, hidden layers and editable Boolean operands; Sketch attributes and internal pages retained; known losses blocked by default.");
};
