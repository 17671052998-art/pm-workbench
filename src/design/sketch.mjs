import { zipSync } from "fflate";
import { linearGradientTransform, ellipticalGradientTransform, gradientPoint } from "@open-pencil/scene-graph/gradient";
import { createGraph, addNode, addImage, jsonEntry, unpack, point, finite, color, solid, fontWeight, fontStyle, uid, encoder, imageType, vectorProps, nodePath, normalizePath, reportMissingLayers } from "./common.mjs";

const readColor = (c = {}) => color(c.red, c.green, c.blue, c.alpha ?? 1);
const writeColor = (c) => ({ _class: "color", red: c.r, green: c.g, blue: c.b, alpha: c.a });
const pair = (p) => `{${p[0]}, ${p[1]}}`;
const blendModes = ["NORMAL", "DARKEN", "MULTIPLY", "COLOR_BURN", "LIGHTEN", "SCREEN", "COLOR_DODGE", "OVERLAY", "SOFT_LIGHT", "HARD_LIGHT", "DIFFERENCE", "EXCLUSION", "HUE", "SATURATION", "COLOR", "LUMINOSITY", "PLUS_DARKER", "PLUS_LIGHTER"];
const readBlend = (value) => blendModes[value] || "NORMAL";
const writeBlend = (value) => Math.max(0, blendModes.indexOf(value));
const booleanOperations = ["UNION", "SUBTRACT", "INTERSECT", "EXCLUDE"];

function sketchPath(raw, width, height) {
  const pts = (raw.points || []).map((p) => ({ ...p, p: point(p.point).map((n, i) => n * (i ? height : width)), from: point(p.curveFrom).map((n, i) => n * (i ? height : width)), to: point(p.curveTo).map((n, i) => n * (i ? height : width)) }));
  if (!pts.length) return "";
  let d = `M${pts[0].p.join(" ")}`;
  for (let i = 1; i <= pts.length - (raw.isClosed ? 0 : 1); i++) {
    const a = pts[i - 1], b = pts[i % pts.length];
    d += a.hasCurveFrom || b.hasCurveTo ? ` C${(a.hasCurveFrom ? a.from : a.p).join(" ")} ${(b.hasCurveTo ? b.to : b.p).join(" ")} ${b.p.join(" ")}` : ` L${b.p.join(" ")}`;
  }
  return d + (raw.isClosed ? " Z" : "");
}

export async function readSketch(bytes, report) {
  const archive = unpack(bytes);
  const doc = jsonEntry(archive, "document.json");
  const pages = (doc.pages || []).map((p) => p._ref ? jsonEntry(archive, `${p._ref}.json`) : p);
  if (!pages.length) throw new Error("Sketch 文件没有可读取的页面。");
  const graph = createGraph();
  const images = new Map();
  for (const [path, data] of Object.entries(archive)) if (path.startsWith("images/") && data.length) images.set(path, await addImage(graph, data));
  const symbols = new Map();
  function collect(node) { if (node.symbolID && node._class === "symbolMaster") symbols.set(node.symbolID, node); (node.layers || []).forEach(collect); }
  pages.forEach(collect);
  (doc.foreignSymbols || []).forEach((s) => s.symbolMaster && collect(s.symbolMaster));
  function paint(p, w, h, name) {
    let fill = solid(readColor(p.color), p.contextSettings?.opacity ?? 1);
    fill.blendMode = readBlend(p.contextSettings?.blendMode);
    fill.visible = p.isEnabled !== false;
    if (p.fillType === 1) {
      const g = p.gradient || {}, from = point(g.from, [0, 0.5]), to = point(g.to, [1, 0.5]);
      fill = { ...fill, type: g.gradientType === 1 ? "GRADIENT_RADIAL" : "GRADIENT_LINEAR", gradientStops: (g.stops || []).map((s) => ({ position: finite(s.position), color: readColor(s.color) })), gradientTransform: g.gradientType === 1 ? ellipticalGradientTransform({ x: from[0], y: from[1] }, { x: to[0], y: to[1] }, { x: from[0] - (to[1] - from[1]), y: from[1] + (to[0] - from[0]) }) : linearGradientTransform({ x: from[0], y: from[1] }, { x: to[0], y: to[1] }, w || 1, h || 1) };
    } else if (p.fillType === 4) {
      const hash = images.get(p.image?._ref);
      if (hash) fill = { ...fill, type: "IMAGE", imageHash: hash, imageScaleMode: p.patternFillType === 2 ? "FIT" : p.patternFillType === 0 ? "TILE" : "FILL" };
      else report.add("missing-image", "文件中的部分图片资源缺失。", name);
    } else if (p.fillType && p.fillType !== 0) report.add("sketch-fill", "部分 Sketch 专属填充按基础颜色转换。", name);
    return fill;
  }
  function style(raw, w, h) {
    const s = raw.style || {};
    const fills = (s.fills || []).map((f) => paint(f, w, h, raw.name));
    const strokes = (s.borders || []).map((f) => ({ ...paint(f, w, h, raw.name), weight: finite(f.thickness, 1), align: ["CENTER", "INSIDE", "OUTSIDE"][f.position] || "CENTER" }));
    const effects = [...(s.shadows || []).map((e) => ({ ...e, kind: "DROP_SHADOW" })), ...(s.innerShadows || []).map((e) => ({ ...e, kind: "INNER_SHADOW" }))].map((e) => ({ type: e.kind, color: readColor({ ...e.color, alpha: (e.color?.alpha ?? 1) * (e.contextSettings?.opacity ?? 1) }), radius: finite(e.blurRadius), spread: finite(e.spread), offset: { x: finite(e.offsetX), y: finite(e.offsetY) }, visible: e.isEnabled !== false, blendMode: readBlend(e.contextSettings?.blendMode) }));
    if (s.blur) {
      effects.push({ type: s.blur.type === 3 ? "BACKGROUND_BLUR" : "LAYER_BLUR", color: color(), radius: finite(s.blur.radius), spread: 0, offset: { x: 0, y: 0 }, visible: s.blur.isEnabled !== false });
      if (![0, 3].includes(s.blur.type ?? 0)) report.add("sketch-blur", "运动或缩放模糊目前只能按普通模糊转换。", raw.name);
    }
    return { fills, strokes, effects, opacity: s.contextSettings?.opacity ?? 1, blendMode: readBlend(s.contextSettings?.blendMode), dashPattern: s.borderOptions?.dashPattern || [], strokeCap: ["NONE", "ROUND", "SQUARE"][s.borderOptions?.lineCapStyle] || "NONE", strokeJoin: ["MITER", "ROUND", "BEVEL"][s.borderOptions?.lineJoinStyle] || "MITER" };
  }
  function textStyle(attrs = {}) {
    const font = attrs.MSAttributedStringFontAttribute?.attributes || {};
    const postscript = font.name || "ArialMT";
    const paragraph = attrs.paragraphStyle || {};
    const family = /^Arial(?:MT|-)/.test(postscript) ? "Arial" : postscript.replace(/[-_](Regular|Medium|Semibold|Bold|Light|Heavy|Italic|Black).*$/i, "").replace(/^(PingFang)(SC|TC|HK)/, "$1 $2");
    return { fontFamily: family, fontWeight: fontWeight(postscript), italic: /italic|oblique/i.test(postscript), fontSize: finite(font.size, 14), fills: attrs.MSAttributedStringColorAttribute ? [solid(readColor(attrs.MSAttributedStringColorAttribute))] : undefined, letterSpacing: finite(attrs.kerning), lineHeight: paragraph.maximumLineHeight || paragraph.minimumLineHeight || null, textDecoration: attrs.underlineStyle ? "UNDERLINE" : attrs.strikethroughStyle ? "STRIKETHROUGH" : "NONE" };
  }
  function readNode(raw, parent, depth = 0, sx = 1, sy = 1, chain = []) {
    if (depth > 128) throw new Error("图层嵌套过深。");
    if (raw._class === "slice") report.add("sketch-slice", "切片区域保留为无填充画框，切片导出设置不保留。", raw.name);
    const f = raw.frame || {};
    const w = finite(f.width) * sx, h = finite(f.height) * sy;
    let type = ({ page: "CANVAS", artboard: "FRAME", slice: "FRAME", symbolMaster: "FRAME", group: "GROUP", shapeGroup: "GROUP", rectangle: "RECTANGLE", oval: "ELLIPSE", text: "TEXT", bitmap: "RECTANGLE", shapePath: "VECTOR", triangle: "VECTOR", star: "VECTOR", polygon: "VECTOR", symbolInstance: "GROUP" })[raw._class];
    if (!type) { type = raw.layers ? "GROUP" : "RECTANGLE"; report.add("sketch-node", "部分 Sketch 图层按基础图形或分组转换。", raw.name); }
    const props = { name: raw.name || raw._class, x: finite(f.x) * sx, y: finite(f.y) * sy, width: w, height: h, rotation: -finite(raw.rotation), flipX: !!raw.isFlippedHorizontal, flipY: !!raw.isFlippedVertical, visible: raw.isVisible !== false, locked: !!raw.isLocked, isMask: !!raw.hasClippingMask, clipsContent: raw._class === "artboard", ...style(raw, w, h) };
    if (raw._class === "shapeGroup") {
      const operations = [...new Set((raw.layers || []).slice(1).map((child) => child.booleanOperation).filter((operation) => operation >= 0))];
      if (operations.length === 1) { type = "BOOLEAN_OPERATION"; props.booleanOperation = booleanOperations[operations[0]]; }
      else if (operations.length > 1) report.add("sketch-boolean-mixed", "一个形状组中混合了多种布尔运算，目前不能等价转换。", raw.name);
    }
    if (raw._class === "group") props.fills = [];
    if (raw.hasBackgroundColor) props.fills = [solid(readColor(raw.backgroundColor))];
    if (type === "RECTANGLE") {
      props.cornerRadius = finite(raw.fixedRadius || raw.points?.[0]?.cornerRadius) * sx;
      if (raw.points?.length === 4) {
        const radii = raw.points.map((p) => finite(p.cornerRadius, finite(raw.fixedRadius)) * sx);
        Object.assign(props, { independentCorners: radii.some((radius) => radius !== radii[0]), topLeftRadius: radii[0], topRightRadius: radii[1], bottomRightRadius: radii[2], bottomLeftRadius: radii[3] });
      }
      if (raw._class === "bitmap") {
        const hash = images.get(raw.image?._ref);
        if (hash) props.fills = [{ ...solid(color(1, 1, 1)), type: "IMAGE", imageHash: hash, imageScaleMode: "FILL" }];
        else report.add("missing-image", "文件中的部分图片资源缺失。", raw.name);
      }
    }
    if (type === "VECTOR") {
      const d = sketchPath(raw, w, h);
      if (d) Object.assign(props, vectorProps(d, raw.style?.windingRule === 0 ? "NONZERO" : "EVENODD"));
    }
    if (type === "TEXT") {
      const attributed = raw.attributedString || {};
      const base = raw.style?.textStyle?.encodedAttributes || attributed.attributes?.[0]?.attributes || {};
      const values = textStyle(base);
      if (!values.fills || props.fills.length) delete values.fills;
      Object.assign(props, values, { text: attributed.string || "", textAutoResize: raw.textBehaviour === 0 ? "WIDTH_AND_HEIGHT" : raw.textBehaviour === 1 ? "HEIGHT" : "NONE", textAlignHorizontal: ["LEFT", "RIGHT", "CENTER", "JUSTIFIED"][base.paragraphStyle?.alignment] || "LEFT", fontPostscript: base.MSAttributedStringFontAttribute?.attributes?.name });
      props.fontSize *= sy; props.letterSpacing *= sx;
      if (props.lineHeight) props.lineHeight *= sy;
      props.styleRuns = (attributed.attributes || []).map((run) => ({ start: finite(run.location), length: finite(run.length), style: textStyle(run.attributes) }));
      props.styleRuns.forEach((r) => { r.style.fontSize *= sy; r.style.letterSpacing *= sx; if (r.style.lineHeight) r.style.lineHeight *= sy; });
    }
    const node = addNode(graph, type, parent, props);
    if (raw._class === "symbolMaster" || raw._class === "symbolInstance") report.add("sketch-symbol", "Sketch 符号转换为可编辑图层，符号关联不保留。", raw.name);
    if (raw._class === "shapeGroup" && type !== "BOOLEAN_OPERATION") report.add("sketch-shape-group", "复合路径按可编辑子路径保留，合成填充规则尚不能保证等价转换。", raw.name);
    if (raw.flow?.destinationArtboardID) report.add("prototype", "原型交互暂不参与格式转换。", raw.name);
    let children = raw.layers || [];
    let childSx = sx, childSy = sy;
    if (raw._class === "symbolInstance") {
      if (chain.includes(raw.symbolID)) { report.add("symbol-cycle", "循环符号引用已停止展开。", raw.name); return; }
      const master = symbols.get(raw.symbolID);
      if (!master) { report.add("missing-symbol", "部分符号定义未包含在文件中，无法展开。", raw.name); return; }
      children = structuredClone(master.layers || []);
      const overrides = raw.overrideValues || [];
      function apply(n) {
        for (const o of overrides) {
          if (!o.overrideName?.startsWith(n.do_objectID + "_")) continue;
          if (o.overrideName.endsWith("_stringValue") && n.attributedString) n.attributedString.string = String(o.value);
          if (o.overrideName.endsWith("_image")) n.image = o.value;
          if (o.overrideName.endsWith("_symbolID")) n.symbolID = o.value;
        }
        (n.layers || []).forEach(apply);
      }
      children.forEach(apply);
      childSx = w / (master.frame?.width || w || 1);
      childSy = h / (master.frame?.height || h || 1);
      chain = [...chain, raw.symbolID];
    }
    children.forEach((child) => readNode(child, node.id, depth + 1, childSx, childSy, chain));
  }
  pages.forEach((page) => readNode(page, graph.rootId));
  return { graph, thumbnail: archive["previews/preview.png"] };
}

function baseLayer(node, type) {
  return { _class: type, do_objectID: uid(), booleanOperation: -1, isFixedToViewport: false, isFlippedHorizontal: !!node.flipX, isFlippedVertical: !!node.flipY, isLocked: node.locked, isVisible: node.visible, layerListExpandedType: 1, name: node.name, nameIsFixed: true, resizingConstraint: 63, resizingType: 0, rotation: -node.rotation, shouldBreakMaskChain: false, exportOptions: { _class: "exportOptions", includedLayerIds: [], layerOptions: 0, shouldTrim: false, exportFormats: [] }, frame: { _class: "rect", constrainProportions: false, height: node.height, width: node.width, x: node.x, y: node.y }, clippingMaskMode: 0, hasClippingMask: !!node.isMask };
}

function curvePoint(x, y, w, h) {
  const value = pair([x / (w || 1), y / (h || 1)]);
  return { _class: "curvePoint", cornerRadius: 0, curveFrom: value, curveTo: value, point: value, hasCurveFrom: false, hasCurveTo: false, curveMode: 1 };
}

function pathLayers(node, d) {
  const commands = normalizePath(d), subpaths = [];
  let current;
  for (const c of commands) {
    if (c.type === "M") { current = { points: [curvePoint(c.x, c.y, node.width, node.height)], isClosed: false }; subpaths.push(current); }
    else if (c.type === "Z") { if (current) current.isClosed = true; }
    else if (current) {
      let command = c;
      if (c.type === "Q") {
        const last = point(current.points.at(-1).point).map((v, i) => v * (i ? node.height : node.width));
        command = { type: "C", x: c.x, y: c.y, x1: last[0] + 2 / 3 * (c.x1 - last[0]), y1: last[1] + 2 / 3 * (c.y1 - last[1]), x2: c.x + 2 / 3 * (c.x1 - c.x), y2: c.y + 2 / 3 * (c.y1 - c.y) };
      }
      const next = curvePoint(command.x, command.y, node.width, node.height);
      if (command.type === "C") {
        Object.assign(current.points.at(-1), { hasCurveFrom: true, curveMode: 4, curveFrom: pair([command.x1 / (node.width || 1), command.y1 / (node.height || 1)]) });
        Object.assign(next, { hasCurveTo: true, curveMode: 4, curveTo: pair([command.x2 / (node.width || 1), command.y2 / (node.height || 1)]) });
      }
      current.points.push(next);
    }
  }
  return subpaths.map((path) => ({ ...baseLayer({ ...node, x: 0, y: 0, rotation: 0, flipX: false, flipY: false }, "shapePath"), ...path, edited: true, pointRadiusBehaviour: 1 }));
}

export function writeSketch(graph, name, thumbnail, report) {
  const archive = {};
  const written = new Set();
  const imageRefs = new Map();
  for (const [hash, bytes] of graph.images) {
    const path = `images/${hash}.${imageType(bytes)}`;
    archive[path] = [bytes, { level: 0 }];
    imageRefs.set(hash, { _class: "MSJSONFileReference", _ref_class: "MSImageData", _ref: path });
  }
  function paint(fill, border = false) {
    const start = fill.gradientTransform ? gradientPoint(fill.gradientTransform, { x: 0, y: 0.5 }) : { x: 0, y: 0.5 };
    const end = fill.gradientTransform ? gradientPoint(fill.gradientTransform, { x: 1, y: 0.5 }) : { x: 1, y: 0.5 };
    return { _class: border ? "border" : "fill", isEnabled: fill.visible, fillType: fill.type === "IMAGE" ? 4 : fill.type.startsWith("GRADIENT") ? 1 : 0, color: writeColor(fill.color), contextSettings: { _class: "graphicsContextSettings", opacity: fill.opacity, blendMode: writeBlend(fill.blendMode) }, gradient: { _class: "gradient", elipseLength: 1, from: pair([start.x, start.y]), to: pair([end.x, end.y]), gradientType: fill.type === "GRADIENT_RADIAL" ? 1 : 0, stops: (fill.gradientStops || []).map((s) => ({ _class: "gradientStop", color: writeColor(s.color), position: s.position })) }, image: imageRefs.get(fill.imageHash), patternFillType: fill.imageScaleMode === "FIT" ? 2 : fill.imageScaleMode === "TILE" ? 0 : 1, patternTileScale: 1, noiseIndex: 0, noiseIntensity: 0, ...(border ? { thickness: fill.weight, position: { CENTER: 0, INSIDE: 1, OUTSIDE: 2 }[fill.align] || 0 } : {}) };
  }
  function style(node) {
    const shadow = (e) => ({ _class: e.type === "INNER_SHADOW" ? "innerShadow" : "shadow", isEnabled: e.visible, blurRadius: e.radius, spread: e.spread, offsetX: e.offset.x, offsetY: e.offset.y, color: writeColor(e.color), contextSettings: { _class: "graphicsContextSettings", opacity: 1, blendMode: writeBlend(e.blendMode) } });
    const value = { _class: "style", do_objectID: uid(), endMarkerType: 0, startMarkerType: 0, miterLimit: 10, windingRule: 1, fills: node.fills.map((f) => paint(f)), borders: node.strokes.map((f) => paint(f, true)), shadows: node.effects.filter((e) => e.type === "DROP_SHADOW").map(shadow), innerShadows: node.effects.filter((e) => e.type === "INNER_SHADOW").map(shadow), contextSettings: { _class: "graphicsContextSettings", opacity: node.opacity, blendMode: writeBlend(node.blendMode) }, borderOptions: { _class: "borderOptions", isEnabled: true, dashPattern: node.dashPattern, lineCapStyle: { NONE: 0, ROUND: 1, SQUARE: 2 }[node.strokeCap] || 0, lineJoinStyle: { MITER: 0, ROUND: 1, BEVEL: 2 }[node.strokeJoin] || 0 } };
    const blur = node.effects.find((effect) => effect.type.includes("BLUR"));
    if (blur) value.blur = { _class: "blur", isEnabled: blur.visible, type: blur.type === "BACKGROUND_BLUR" ? 3 : 0, radius: blur.radius, center: "{0.5, 0.5}", motionAngle: 0, saturation: 1 };
    return value;
  }
  const attributes = (node) => ({ MSAttributedStringFontAttribute: { _class: "fontDescriptor", attributes: { name: node.fontPostscript || (node.fontFamily === "Arial" ? node.fontWeight >= 700 ? "Arial-BoldMT" : "ArialMT" : `${node.fontFamily.replace(/\s+/g, "")}-${fontStyle(node.fontWeight, node.italic).replace(/\s+/g, "")}`), size: node.fontSize } }, MSAttributedStringColorAttribute: writeColor(node.fills.find((f) => f.visible)?.color || color()), kerning: node.letterSpacing || 0, paragraphStyle: { _class: "paragraphStyle", alignment: { LEFT: 0, RIGHT: 1, CENTER: 2, JUSTIFIED: 3 }[node.textAlignHorizontal] || 0, ...(node.lineHeight ? { minimumLineHeight: node.lineHeight, maximumLineHeight: node.lineHeight } : {}) }, underlineStyle: node.textDecoration === "UNDERLINE" ? 1 : 0, strikethroughStyle: node.textDecoration === "STRIKETHROUGH" ? 1 : 0 });
  function layer(node) {
    written.add(node.id);
    let type = ({ CANVAS: "page", FRAME: "artboard", RECTANGLE: "rectangle", ROUNDED_RECTANGLE: "rectangle", ELLIPSE: "oval", TEXT: "text", LINE: "shapePath", VECTOR: "shapeGroup", STAR: "shapeGroup", POLYGON: "shapeGroup", BOOLEAN_OPERATION: "group", GROUP: "group", COMPONENT: "group", INSTANCE: "group", COMPONENT_SET: "group", SECTION: "group" })[node.type] || "group";
    if (type === "artboard" && graph.getNode(node.parentId)?.type !== "CANVAS") type = "group";
    const value = { ...baseLayer(node, type), style: style(node) };
    if (type === "text") {
      const runs = node.styleRuns.length ? node.styleRuns.map((r) => ({ _class: "stringAttribute", location: r.start, length: r.length, attributes: attributes({ ...node, ...r.style }) })) : [{ _class: "stringAttribute", location: 0, length: node.text.length, attributes: attributes(node) }];
      value.attributedString = { _class: "attributedString", string: node.text, attributes: runs };
      value.style.textStyle = { _class: "textStyle", encodedAttributes: attributes(node), verticalAlignment: { TOP: 0, CENTER: 1, BOTTOM: 2 }[node.textAlignVertical] || 0 };
      value.textBehaviour = node.textAutoResize === "WIDTH_AND_HEIGHT" ? 0 : node.textAutoResize === "HEIGHT" ? 1 : 2;
      value.automaticallyDrawOnUnderlyingPath = false;
      value.dontSynchroniseWithSymbol = false;
      value.lineSpacingBehaviour = 2;
      value.glyphBounds = "{{0, 0}, {0, 0}}";
    } else if (type === "rectangle") {
      value.fixedRadius = node.cornerRadius;
      value.points = [[0, 0], [1, 0], [1, 1], [0, 1]].map(([x, y], i) => ({ ...curvePoint(x * node.width, y * node.height, node.width, node.height), cornerRadius: node.independentCorners ? [node.topLeftRadius, node.topRightRadius, node.bottomRightRadius, node.bottomLeftRadius][i] : node.cornerRadius }));
      value.isClosed = true;
      value.edited = false;
      value.pointRadiusBehaviour = 1;
    } else if (type === "oval") { value.isClosed = true; value.edited = false; }
    else if (node.type === "BOOLEAN_OPERATION") {
      value._class = "shapeGroup";
      value.layers = graph.getChildren(node.id).map((child, index) => ({ ...layer(child), booleanOperation: index === 0 ? -1 : Math.max(0, booleanOperations.indexOf(node.booleanOperation)) }));
      value.windingRule = 1;
    } else if (type === "shapePath" || type === "shapeGroup") {
      const d = node.type === "LINE" ? `M0 0 L${node.width} ${node.height}` : nodePath(node);
      const paths = pathLayers(node, d);
      if (!paths.length) report.add("vector-empty", "部分矢量没有可读取的轮廓。", node.name);
      value._class = "shapeGroup";
      value.layers = paths;
      value.windingRule = 1;
    }
    if (["group", "artboard", "page"].includes(type) && node.type !== "BOOLEAN_OPERATION") {
      value.layers = graph.getChildren(node.id).map(layer);
      if (type === "group" && node.fills.some((f) => f.visible)) {
        value.layers.unshift(layer({ ...node, type: "RECTANGLE", name: `${node.name} 背景`, x: 0, y: 0, rotation: 0, flipX: false, flipY: false, strokes: [], effects: [], opacity: 1 }));
        value.style.fills = [];
      }
      value.hasClickThrough = true;
      value.groupLayout = { _class: "MSImmutableFreeformGroupLayout" };
      if (type === "artboard") {
        const fills = node.fills.filter((f) => f.visible);
        const background = fills.length === 1 && fills[0].type === "SOLID" ? fills[0] : null;
        Object.assign(value, { hasBackgroundColor: !!background, backgroundColor: writeColor(background ? { ...background.color, a: background.color.a * background.opacity } : color(1, 1, 1)), includeBackgroundColorInExport: true, resizesContent: false });
        value.style.fills = [];
        if (!background && fills.length) value.layers.unshift(layer({ ...node, type: "RECTANGLE", name: `${node.name} 背景`, x: 0, y: 0, rotation: 0, flipX: false, flipY: false, strokes: [], effects: [], opacity: 1 }));
      }
      if (type === "page") Object.assign(value, { horizontalRulerData: { _class: "rulerData", base: 0, guides: [] }, verticalRulerData: { _class: "rulerData", base: 0, guides: [] } });
    }
    return value;
  }
  const pages = graph.getPages(true).map(layer);
  const pageInfo = {};
  for (const page of pages) {
    archive[`pages/${page.do_objectID}.json`] = encoder(JSON.stringify(page));
    pageInfo[page.do_objectID] = { name: page.name, artboards: Object.fromEntries(page.layers.filter((n) => n._class === "artboard").map((n) => [n.do_objectID, { name: n.name }])) };
  }
  const document = { _class: "document", do_objectID: uid(), assets: { _class: "assetCollection", colors: [], gradients: [], images: [], colorAssets: [], gradientAssets: [] }, colorSpace: 0, currentPageIndex: 0, foreignLayerStyles: [], foreignSymbols: [], foreignTextStyles: [], layerStyles: { _class: "sharedStyleContainer", objects: [] }, layerTextStyles: { _class: "sharedTextStyleContainer", objects: [] }, pages: pages.map((p) => ({ _class: "MSJSONFileReference", _ref_class: "MSImmutablePage", _ref: `pages/${p.do_objectID}` })) };
  archive["document.json"] = encoder(JSON.stringify(document));
  archive["meta.json"] = encoder(JSON.stringify({ version: 136, compatibilityVersion: 99, app: "com.bohemiancoding.sketch3", variant: "NONAPPSTORE", appVersion: "97", build: 1, pagesAndArtboards: pageInfo, fonts: [...new Set([...graph.nodes.values()].filter((n) => n.type === "TEXT").map((n) => n.fontFamily))] }));
  archive["user.json"] = encoder("{}");
  if (thumbnail) archive["previews/preview.png"] = [thumbnail, { level: 0 }];
  reportMissingLayers(graph, written, report);
  return zipSync(archive);
}
