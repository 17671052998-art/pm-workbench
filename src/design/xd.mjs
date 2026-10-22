import { zipSync } from "fflate";
import svgpath from "svgpath";
import { linearGradientTransform, ellipticalGradientTransform, gradientPoint } from "@open-pencil/scene-graph/gradient";
import { createGraph, addNode, addImage, jsonEntry, unpack, finite, color, solid, fontWeight, fontStyle, uid, encoder, vectorProps, nodePath, pathBounds, transformProps, xdMatrix, EMPTY_PNG, scaleTree, reportMissingLayers, imageDimensions, hasImageTransform, xdImageTransform, xdMaskSupported, xdResponsivePair, xdVectorMaskPlan, xdStandaloneComponent } from "./common.mjs";
import { vectorMaskPath } from "./pathops.mjs";

function readColor(c = {}) {
  if (typeof c.value === "number") return color((c.value >>> 16 & 255) / 255, (c.value >>> 8 & 255) / 255, (c.value & 255) / 255, (c.value >>> 24) / 255);
  return color((c.value?.r ?? c.r ?? 0) / 255, (c.value?.g ?? c.g ?? 0) / 255, (c.value?.b ?? c.b ?? 0) / 255, c.alpha ?? 1);
}
const writeColor = (c) => ({ mode: "RGB", value: { r: Math.round(c.r * 255), g: Math.round(c.g * 255), b: Math.round(c.b * 255) }, alpha: c.a });
const writeRangeColor = (c) => ({ value: ((Math.round(c.a * 255) << 24) | (Math.round(c.r * 255) << 16) | (Math.round(c.g * 255) << 8) | Math.round(c.b * 255)) >>> 0 });
const childrenOf = (node) => node.children || node.artboard?.children || node.group?.children || node.shape?.children || [];
const readBlend = (value) => String(value || "normal").replace(/-/g, "_").toUpperCase();
const writeBlend = (value) => String(value === "PASS_THROUGH" ? "normal" : value || "normal").toLowerCase().replace(/_/g, "-");
const textTransforms = { ORIGINAL: "none", UPPER: "uppercase", LOWER: "lowercase", TITLE: "titlecase" };
const textCases = Object.fromEntries(Object.entries(textTransforms).map(([key, value]) => [value, key]));
function readTextStyle(font = {}, attrs = {}) {
  return { fontFamily: font.family || "Arial", fontWeight: fontWeight(font.style), italic: /italic|oblique/i.test(font.style || ""), fontSize: finite(font.size, 14), letterSpacing: finite(attrs.letterSpacing) * finite(font.size, 14) / 1000, textDecoration: attrs.decoration?.includes("underline") ? "UNDERLINE" : attrs.decoration?.includes("line-through") ? "STRIKETHROUGH" : "NONE", textCase: textCases[attrs.textTransform] || "ORIGINAL" };
}
function writeTextStyle(node) {
  const style = fontStyle(node.fontWeight, node.italic).replace(/^Regular Italic$/, "Italic");
  const postscript = node.fontFamily === "Arial" ? `Arial${node.fontWeight >= 700 ? node.italic ? "-BoldItalic" : "-Bold" : node.italic ? "-Italic" : ""}MT` : `${node.fontFamily.replace(/\s+/g, "")}-${style.replace(/\s+/g, "")}`;
  return { font: { family: node.fontFamily, style, postscriptName: node.fontPostscript || postscript, size: node.fontSize }, textAttributes: { letterSpacing: node.fontSize ? node.letterSpacing / node.fontSize * 1000 : 0, decoration: node.textDecoration === "UNDERLINE" ? ["underline"] : node.textDecoration === "STRIKETHROUGH" ? ["line-through"] : [], textTransform: textTransforms[node.textCase] || "none" } };
}

function textRanges(node) {
  const end = node.text.length, boundaries = new Set([0, end]);
  for (const run of node.styleRuns) { boundaries.add(Math.max(0, Math.min(end, run.start))); boundaries.add(Math.max(0, Math.min(end, run.start + run.length))); }
  const sorted = [...boundaries].sort((a, b) => a - b), ranges = [];
  for (let i = 0; i < sorted.length - 1; i++) {
    const from = sorted[i], to = sorted[i + 1], style = { ...node };
    for (const run of node.styleRuns) if (run.start <= from && run.start + run.length >= to) {
      if (["fontFamily", "fontWeight", "italic"].some((key) => run.style[key] !== undefined && run.style[key] !== style[key])) delete style.fontPostscript;
      Object.assign(style, run.style);
    }
    ranges.push({ from, to, node: style });
  }
  return ranges;
}

export async function readXD(bytes, report) {
  const archive = unpack(bytes);
  const manifest = jsonEntry(archive, "manifest");
  if (!String(manifest.type || "").includes("sparkler")) throw new Error("不是受支持的 Adobe XD 设计文件。");
  const roots = Object.entries(archive).filter(([path]) => path.endsWith("graphicContent.agc")).map(([path, bytes]) => ({ path, data: JSON.parse(new TextDecoder().decode(bytes)) }));
  const global = roots.find((r) => r.path === "resources/graphics/graphicContent.agc")?.data || {};
  const graph = createGraph(), page = graph.addPage(manifest.name || "XD 设计");
  const images = new Map();
  for (const [path, data] of Object.entries(archive)) if (/^resources\/[^/]+$/.test(path) && data.length) images.set(path.slice(10), await addImage(graph, data));
  const references = new Map();
  function index(value, depth = 0) {
    if (!value || typeof value !== "object" || depth > 128) return;
    if (value.type && value.type !== "syncRef") {
      for (const key of [value.id, value.guid, value.syncSourceGuid, value.meta?.ux?.symbolId]) if (key && !references.has(key)) references.set(key, value);
    }
    for (const child of Object.values(value)) if (child && typeof child === "object") index(child, depth + 1);
  }
  roots.forEach((r) => index(r.data));
  function paint(p, name, w, h) {
    if (!p || p.type === "none") return [];
    let fill = solid(readColor(p.color), p.opacity ?? 1);
    fill.visible = p.visible !== false;
    if (p.type === "pattern") {
      const pattern = p.pattern || {}, hash = images.get(pattern.meta?.ux?.uid || pattern.uid || pattern.href?.replace(/^.*\//, ""));
      if (!hash) { report.add("missing-image", "XD 文件中的部分图片资源缺失。", name); return []; }
      fill = { ...fill, type: "IMAGE", imageHash: hash, imageScaleMode: pattern.meta?.ux?.scaleBehavior === "fit" ? "FIT" : "FILL" };
    } else if (p.type === "gradient") {
      const resource = p.gradient?.ref ? global.resources?.gradients?.[p.gradient.ref] : p.gradient || p;
      const g = resource?.meta?.ux?.gradientResources || resource || {};
      const start = g.from || { x: p.x1 ?? g.x1 ?? 0, y: p.y1 ?? g.y1 ?? 0 }, end = g.to || { x: p.x2 ?? g.x2 ?? 1, y: p.y2 ?? g.y2 ?? 0 };
      const radial = g.type === "radial";
      const cx = p.cx ?? 0.5, cy = p.cy ?? 0.5, radius = p.r ?? 0.5;
      fill = { ...fill, type: radial ? "GRADIENT_RADIAL" : "GRADIENT_LINEAR", gradientStops: (g.stops || []).map((s) => ({ color: readColor(s.color), position: s.offset ?? s.position ?? 0 })), gradientTransform: radial ? ellipticalGradientTransform({ x: cx, y: cy }, { x: cx + radius, y: cy }, { x: cx, y: cy + radius }) : linearGradientTransform(start, end, w || 1, h || 1) };
      if (g.type && !["linear", "linearGradient", "radial"].includes(g.type)) report.add("xd-gradient", "部分 XD 渐变按线性渐变转换。", name);
      if (radial && (p.fx !== undefined && p.fx !== cx || p.fy !== undefined && p.fy !== cy)) report.add("xd-gradient-focus", "偏心径向渐变的焦点尚不能等价转换。", name);
    }
    return [fill];
  }
  function readNode(raw, parent, origin = { x: 0, y: 0 }, depth = 0, chain = [], preservingMaster = false) {
    if (depth > 128) throw new Error("XD 图层嵌套过深。");
    if (raw.meta?.ux?.orbitLayoutBounds) return;
    if (raw.type === "syncRef") {
      const key = raw.ref || raw.syncSourceGuid;
      if (chain.includes(key)) { report.add("xd-symbol-cycle", "循环组件引用已停止展开。"); return; }
      const source = references.get(key);
      if (!source) { report.add("missing-symbol", "部分 XD 组件定义缺失，无法展开。", raw.name); return; }
      raw = { ...structuredClone(source), ...raw, type: source.type, group: raw.group || source.group, artboard: raw.artboard || source.artboard };
      chain = [...chain, key];
      if (!preservingMaster) report.add("xd-component", "XD 组件按当前外观展开为可编辑图层，组件状态不保留。", raw.name);
    }
    const shape = raw.shape || {}, text = raw.text || {}, art = global.artboards?.[raw.artboard?.ref || raw.id] || {};
    let type = raw.type === "artboard" ? "FRAME" : raw.type === "text" ? "TEXT" : raw.type === "group" ? "GROUP" : "RECTANGLE";
    if (raw.meta?.ux?.orbitStandaloneComponent && raw.meta.ux.isMaster) { type = "COMPONENT"; preservingMaster = true; }
    let w = finite(shape.width ?? art.width ?? raw.width ?? raw.meta?.ux?.width), h = finite(shape.height ?? art.height ?? raw.height ?? raw.meta?.ux?.height);
    let ox = finite(shape.x), oy = finite(shape.y), path = "";
    if (["circle", "ellipse"].includes(shape.type)) { type = "ELLIPSE"; w = 2 * finite(shape.rx ?? shape.r); h = 2 * finite(shape.ry ?? shape.r); ox = finite(shape.cx) - w / 2; oy = finite(shape.cy) - h / 2; }
    if (["path", "compound", "polygon", "line"].includes(shape.type)) {
      type = "VECTOR";
      path = shape.path || (shape.type === "line" ? `M${shape.x1 || 0} ${shape.y1 || 0} L${shape.x2 || 0} ${shape.y2 || 0}` : shape.points?.length ? `M${shape.points.map((p) => `${p.x} ${p.y}`).join(" L")} Z` : "");
      if (path) { const box = pathBounds(path); w = box.width; h = box.height; ox = box.x; oy = box.y; path = svgpath(path).translate(-ox, -oy).toString(); }
    }
    const s = raw.style || {};
    const font = s.font || {};
    if (type === "TEXT") {
      const lines = (text.paragraphs || []).flatMap((p) => p.lines || []).flat();
      const size = finite(font.size, 14);
      const first = lines[0] || {};
      ox = finite(first.x); oy = finite(first.y) - size * 0.8;
      w = finite(text.frame?.width, Math.max(1, ...String(text.rawText || "").split("\n").map((line) => line.length * size * 0.6)));
      h = finite(text.frame?.height, Math.max(1, (text.paragraphs || []).flatMap((p) => p.lines || []).length) * size * 1.2);
    }
    const t = { a: 1, b: 0, c: 0, d: 1, tx: 0, ty: 0, ...raw.transform };
    t.tx += t.a * ox + t.c * oy - origin.x;
    t.ty += t.b * ox + t.d * oy - origin.y;
    const props = { name: raw.name || art.name || raw.type, ...transformProps(t, w, h, report, raw.name), fills: paint(s.fill, raw.name, w, h), strokes: paint(s.stroke, raw.name, w, h).map((p) => ({ ...p, weight: finite(s.stroke.width, 1), align: String(s.stroke.align || "center").toUpperCase() })), visible: raw.visible !== false, opacity: s.opacity ?? raw.opacity ?? 1, blendMode: s.isolation === "auto" ? "PASS_THROUGH" : readBlend(s.blendMode), locked: !!raw.meta?.ux?.locked, clipsContent: raw.type === "artboard", dashPattern: s.stroke?.dash || [], strokeCap: s.stroke?.cap === "butt" ? "NONE" : String(s.stroke?.cap || "none").toUpperCase(), strokeJoin: String(s.stroke?.join || "miter").toUpperCase() };
    const layoutBounds = childrenOf(raw).find((child) => child.meta?.ux?.orbitLayoutBounds)?.shape;
    if (layoutBounds) Object.assign(props, { width: finite(layoutBounds.width, w), height: finite(layoutBounds.height, h) });
    const layout = raw.meta?.ux?.orbitResponsivePair;
    if (layout && ["HORIZONTAL", "VERTICAL"].includes(layout.layoutMode)) {
      type = "FRAME";
      Object.assign(props, { layoutMode: layout.layoutMode, layoutWrap: "NO_WRAP", primaryAxisAlign: "SPACE_BETWEEN", counterAxisAlign: "CENTER", primaryAxisSizing: "FIXED", counterAxisSizing: "FIXED", width: finite(layoutBounds?.width ?? raw.meta.ux.width, w), height: finite(layoutBounds?.height ?? raw.meta.ux.height, h) });
    }
    if (shape.type === "compound" && shape.children?.length) { type = "BOOLEAN_OPERATION"; props.booleanOperation = String(shape.operation || "union").toUpperCase(); }
    if (raw.type === "artboard") Object.assign(props, { x: finite(art.x), y: finite(art.y), width: w, height: h });
    if (path) Object.assign(props, vectorProps(svgpath(path).scale(w ? props.width / w : 1, h ? props.height / h : 1).toString()));
    if (shape.r !== undefined) {
      const radii = Array.isArray(shape.r) ? shape.r.map((value) => finite(value)) : Array(4).fill(finite(shape.r));
      Object.assign(props, { cornerRadius: radii[0], independentCorners: radii.some((radius) => radius !== radii[0]), topLeftRadius: radii[0], topRightRadius: radii[1] ?? radii[0], bottomRightRadius: radii[2] ?? radii[0], bottomLeftRadius: radii[3] ?? radii[0] });
    }
    if (type === "TEXT") {
      Object.assign(props, readTextStyle(font, s.textAttributes), { text: text.rawText || "", textAutoResize: "NONE", textAlignHorizontal: String(s.textAttributes?.textAlign || text.textAlign || "left").toUpperCase(), lineHeight: s.textAttributes?.lineHeight || null });
      const ranges = raw.meta?.ux?.rangedStyles;
      if (ranges?.length) {
        let start = 0;
        props.styleRuns = ranges.map((range) => {
          const length = Math.min(finite(range.length), Math.max(0, props.text.length - start));
          const run = { start, length, style: { ...readTextStyle({ family: range.fontFamily, style: range.fontStyle, size: range.fontSize }, { letterSpacing: range.charSpacing, decoration: range.underline ? ["underline"] : range.strikethrough ? ["line-through"] : [], textTransform: range.textTransform }), fills: [solid(readColor(range.fill))] } };
          start += length;
          return run;
        }).filter((run) => run.length > 0);
      } else {
        props.styleRuns = (text.paragraphs || []).flatMap((paragraph) => paragraph.lines || []).flat().filter((run) => run.style && run.to > run.from).map((run) => ({ start: run.from, length: run.to - run.from, style: { ...readTextStyle({ ...font, ...run.style.font }, { ...s.textAttributes, ...run.style.textAttributes }), fills: paint(run.style.fill || s.fill, raw.name, w, h) } }));
      }
    }
    props.effects = (s.filters || s.effects || []).flatMap((effect) => {
      const list = effect.params?.dropShadows || effect.params?.innerShadows;
      return (list || [effect.params || {}]).map((params) => ({ type: effect.type === "dropShadow" ? "DROP_SHADOW" : effect.type === "uxdesign#innerShadow" ? "INNER_SHADOW" : params.backgroundEffect ? "BACKGROUND_BLUR" : "LAYER_BLUR", color: readColor(params.color), radius: list ? finite(params.r) * 2 : finite(params.blurAmount ?? params.r ?? params.blur), spread: finite(params.spread), offset: { x: finite(params.dx ?? params.x), y: finite(params.dy ?? params.y) }, visible: effect.visible !== false }));
    });
    const node = addNode(graph, type, parent, props);
    if (!['artboard', 'group', 'shape', 'text'].includes(raw.type)) report.add("xd-node", "部分 XD 专属图层按基础图形转换。", raw.name);
    if (raw.meta?.ux?.interactions?.length) report.add("prototype", "原型交互暂不参与格式转换。", raw.name);
    const maskSource = childrenOf(raw).find((child) => child.id === raw.meta?.ux?.orbitVectorMaskSource);
    const originalClip = raw.meta?.ux?.orbitVectorMaskGeometry;
    const currentClip = raw.meta?.ux?.clipPathResources?.children?.[0];
    const restoreSource = maskSource && (!originalClip || JSON.stringify({ shape: currentClip?.shape, transform: currentClip?.transform }) === JSON.stringify(originalClip));
    const sourceMaskId = restoreSource ? maskSource.id : null;
    if (maskSource && !restoreSource) report.add("xd-mask-edited", "使用 XD 中修改后的矢量裁切；原始蒙版源图层仍保留，不会覆盖当前裁切。", raw.name, "info");
    const clips = sourceMaskId ? [] : raw.meta?.ux?.clipPathResources?.children || [];
    if (clips.length) {
      const clip = clips.length === 1 ? clips[0] : { type: "group", name: "裁切形状", group: { children: clips } };
      const mask = readNode(clip, node.id, { x: 0, y: 0 }, depth + 1, chain, preservingMaster);
      if (mask) { mask.isMask = true; mask.maskType = maskSource && !restoreSource ? "VECTOR" : raw.meta.ux.orbitMaskType || "VECTOR"; }
    }
    const children = childrenOf(raw);
    children.forEach((child) => {
      const isSource = child.id === sourceMaskId;
      const restored = readNode(isSource ? { ...child, visible: child.meta?.ux?.orbitMaskSourceVisible !== false } : child, node.id, raw.type === "artboard" ? { x: art.x || 0, y: art.y || 0 } : shape.type === "compound" ? { x: ox, y: oy } : { x: 0, y: 0 }, depth + 1, chain, preservingMaster);
      if (isSource && restored) { restored.isMask = true; restored.maskType = raw.meta.ux.orbitMaskType; }
    });
    if (["GROUP", "COMPONENT"].includes(type) && children.length) {
      node.width = layoutBounds ? finite(layoutBounds.width) : Math.max(0, ...graph.getChildren(node.id).map((c) => c.x + c.width));
      node.height = layoutBounds ? finite(layoutBounds.height) : Math.max(0, ...graph.getChildren(node.id).map((c) => c.y + c.height));
      const sx = Math.hypot(t.a, t.b) || 1, sy = Math.abs(t.a * t.d - t.b * t.c) / sx;
      if (Math.abs(sx - 1) > 0.001 || Math.abs(sy - 1) > 0.001) graph.getChildren(node.id).forEach((child) => scaleTree(graph, child, sx, sy, report));
      Object.assign(node, transformProps(t, node.width, node.height, report, raw.name));
    }
    return node;
  }
  roots.filter((r) => r.path.startsWith("artwork/")).forEach((r) => (r.data.children || []).forEach((node) => {
    if (node.meta?.ux?.orbitComponentCanvas) childrenOf(node).forEach((child) => readNode(child, page.id));
    else readNode(node, page.id);
  }));
  if (!graph.getChildren(page.id).length) throw new Error("XD 文件没有可读取的画板或图层。");
  const interactions = jsonEntry(archive, "interactions/interactions.json", {});
  if (Object.entries(interactions).some(([key, value]) => key !== "version" && value && typeof value === "object" && Object.keys(value).length)) report.add("prototype", "XD 原型交互暂不参与格式转换。");
  return { graph, thumbnail: archive["preview.png"] || archive["thumbnail.png"] };
}

export async function writeXD(graph, name, thumbnail, report) {
  thumbnail ||= EMPTY_PNG;
  const archive = { mimetype: [encoder("application/vnd.adobe.sparkler.project+dcxucf"), { level: 0 }] };
  const rootID = uid(), boards = {}, artwork = [], resources = [], symbols = [];
  const written = new Set();
  const imageSizes = new Map();
  const vectorMasks = new Map();
  for (const node of graph.nodes.values()) if (node.isMask && (node.type === "GROUP" || node.strokes.some((stroke) => stroke.visible))) {
    const plan = xdVectorMaskPlan(graph, node);
    if (plan) {
      try {
        const path = await vectorMaskPath(plan);
        if (!path) throw new Error("empty mask");
        vectorMasks.set(node.id, path);
      }
      catch { report.add("xd-mask-path", "此蒙版的矢量轮廓计算失败，未导出不完整结果。", node.name); }
    }
  }
  const component = (path, type, rel = "primary", extras = {}) => ({ rel, type, id: uid(), state: "unmodified", name: path, path, ...extras });
  const folder = (path, children = [], components = [], extras = {}) => ({ id: uid(), name: path, path, children, components, ...extras });
  for (const [hash, data] of graph.images) {
    imageSizes.set(hash, imageDimensions(data));
    archive[`resources/${hash}`] = [data, { level: 0 }];
    resources.push(component(hash, data[0] === 0x89 ? "image/png" : data[0] === 0xff ? "image/jpeg" : "application/octet-stream"));
  }
  function paint(fill, node) {
    if (!fill || !fill.visible) return { type: "none" };
    if (fill.type === "IMAGE") {
      const size = imageSizes.get(fill.imageHash);
      if (!size) report.add("image-dimensions", "无法读取此图片的原始尺寸，填充比例不能保证一致。", node.name);
      return { type: "pattern", pattern: { width: size?.width || node.width, height: size?.height || node.height, href: "", meta: { ux: { scaleBehavior: fill.imageScaleMode === "FIT" ? "fit" : "fill", uid: fill.imageHash } } }, opacity: fill.opacity };
    }
    if (fill.type.startsWith("GRADIENT")) {
      const from = fill.gradientTransform ? gradientPoint(fill.gradientTransform, { x: 0, y: 0.5 }) : { x: 0, y: 0 };
      const to = fill.gradientTransform ? gradientPoint(fill.gradientTransform, { x: 1, y: 0.5 }) : { x: 1, y: 0 };
      return { type: "gradient", gradient: { meta: { ux: { gradientResources: { type: "linear", stops: (fill.gradientStops || []).map((s) => ({ offset: s.position, color: writeColor(s.color) })) } } } }, x1: from.x, y1: from.y, x2: to.x, y2: to.y, units: "objectBoundingBox" };
    }
    return { type: "solid", color: writeColor({ ...fill.color, a: fill.color.a * fill.opacity }) };
  }
  function style(node) {
    const fill = node.fills.at(-1), stroke = node.strokes.at(-1);
    const filters = [];
    for (const [kind, type, key] of [["DROP_SHADOW", "dropShadow", "dropShadows"], ["INNER_SHADOW", "uxdesign#innerShadow", "innerShadows"]]) {
      for (const visible of [true, false]) {
        const effects = node.effects.filter((effect) => effect.type === kind && (effect.visible !== false) === visible);
        if (effects.length) filters.push({ type, global: true, visible, params: { [key]: effects.map((effect) => ({ color: writeColor(effect.color), dx: effect.offset.x, dy: effect.offset.y, r: effect.radius / 2, spread: effect.spread })) } });
      }
    }
    for (const effect of node.effects.filter((effect) => effect.type.includes("BLUR"))) filters.push({ type: "uxdesign#blur", global: true, visible: effect.visible, params: { blurAmount: effect.radius, brightnessAmount: 0, fillOpacity: 0, backgroundEffect: effect.type === "BACKGROUND_BLUR" } });
    return {
      opacity: node.opacity,
      blendMode: writeBlend(node.blendMode),
      isolation: node.blendMode === "PASS_THROUGH" ? "auto" : "isolate",
      fill: paint(fill, node),
      stroke: stroke && stroke.visible ? { ...paint(stroke, node), width: stroke.weight, align: stroke.align.toLowerCase(), cap: (stroke.cap || node.strokeCap) === "NONE" ? "butt" : (stroke.cap || node.strokeCap).toLowerCase(), join: (stroke.join || node.strokeJoin).toLowerCase(), dash: stroke.dashPattern || node.dashPattern } : { type: "none" },
      filters,
    };
  }
  function localPaintNode(node, name, fills, strokes) {
    return { ...node, name, x: 0, y: 0, rotation: 0, flipX: false, flipY: false, opacity: 1, visible: true, locked: false, fills, strokes, effects: [], blendMode: "NORMAL" };
  }
  function keepBounds(value, node) {
    if (value.type !== "group") return;
    const bounds = { type: "shape", name: `${node.name} / 布局尺寸`, id: uid(), meta: { ux: { orbitLayoutBounds: true, customConstraints: true, constraintLeft: true, constraintRight: true, constraintTop: true, constraintBottom: true } }, shape: { type: "rect", x: 0, y: 0, width: node.width, height: node.height }, style: { fill: { type: "solid", color: writeColor(color(0, 0, 0, 0)) }, stroke: { type: "none" } } };
    value.group.children.unshift(bounds);
  }
  function componentMaster(value, node) {
    const symbolId = uid(), definition = structuredClone(value), syncMap = {};
    definition.id = uid(); delete definition.transform;
    Object.assign(definition.meta.ux, { symbolId, width: node.width, height: node.height, componentType: "componentNoBounds" });
    function reference(source) {
      const guid = uid(); syncMap[source.id] = guid;
      const ref = { type: "syncRef", syncSourceGuid: source.id, guid };
      if (source.group) ref.group = { children: source.group.children.map(reference) };
      return ref;
    }
    value.group.children = definition.group.children.map(reference);
    Object.assign(value.meta.ux, { symbolId, isMaster: true, componentType: "componentNoBounds", orbitStandaloneComponent: true, syncMap });
    symbols.push(definition);
    report.add("xd-component-master", "独立组件已保留为 XD 原生主组件，可继续编辑并创建关联实例。", node.name, "info");
  }
  function clipGroup(name, mask, children, transform = { a: 1, b: 0, c: 0, d: 1, tx: 0, ty: 0 }, maskType = "VECTOR") {
    return { type: "group", name, id: uid(), transform, meta: { ux: { hasCustomName: true, orbitMaskType: maskType, clipPathResources: { type: "clipPath", children: [mask] } } }, group: { children } };
  }
  function children(nodes, extraX = 0, extraY = 0) {
    const output = [];
    let destination = output, x = extraX, y = extraY;
    for (const node of nodes) {
      if (node.isMask && xdMaskSupported(graph, node)) {
        const source = layer(node);
        let mask = source, sourceLayers = [];
        if (vectorMasks.has(node.id)) {
          mask = { type: "shape", name: `${node.name} / 矢量裁切`, id: uid(), transform: xdMatrix(node), shape: { type: "path", path: vectorMasks.get(node.id) }, style: { fill: { type: "solid", color: writeColor(color()) }, stroke: { type: "none" } } };
          source.visible = false;
          source.meta.ux.orbitMaskSourceVisible = node.visible;
          sourceLayers = [source];
          report.add("xd-vector-mask", "黑白或带描边蒙版已映射为可编辑矢量裁切；原始蒙版图层和描边参数保留在隐藏的可编辑源图层中。", node.name, "info");
        }
        const group = clipGroup(`${node.name} / 蒙版`, mask, sourceLayers, { a: 1, b: 0, c: 0, d: 1, tx: x, ty: y }, node.maskType);
        if (sourceLayers.length) Object.assign(group.meta.ux, { orbitVectorMaskSource: source.id, orbitVectorMaskGeometry: { shape: mask.shape, transform: mask.transform } });
        destination.push(group);
        destination = group.group.children;
        x = y = 0;
      } else destination.push(layer(node, x, y));
    }
    return output;
  }
  const needsImageTransform = (fill) => fill.type === "IMAGE" && (hasImageTransform(fill) || ["CROP", "STRETCH"].includes(fill.imageScaleMode));
  function layer(node, extraX = 0, extraY = 0) {
    written.add(node.id);
    const id = uid(), transform = xdMatrix(node);
    transform.tx += extraX; transform.ty += extraY;
    const value = { type: "shape", name: node.name, id, transform, visible: node.visible, meta: { ux: { hasCustomName: true, locked: !!node.locked } }, style: style(node) };
    const isLeaf = ["TEXT", "ELLIPSE", "RECTANGLE", "ROUNDED_RECTANGLE", "LINE", "VECTOR", "STAR", "POLYGON", "BOOLEAN_OPERATION"].includes(node.type);
    if (isLeaf && (node.fills.length > 1 || node.strokes.length > 1 || node.strokes.length && node.fills.some(needsImageTransform) || [...node.fills, ...node.strokes].some((paint) => !paint.visible || paint.opacity !== 1 || paint.blendMode && !["NORMAL", "PASS_THROUGH"].includes(paint.blendMode)))) {
      // XD has one native fill/stroke; keep every paint in an editable layer stack.
      const paints = [
        ...node.fills.map((fill, index) => ({ node: { ...localPaintNode(node, `${node.name} / 填充 ${index + 1}`, [{ ...fill, opacity: 1, blendMode: "NORMAL" }], []), opacity: fill.opacity, blendMode: fill.blendMode || "NORMAL" }, visible: fill.visible })),
        ...node.strokes.map((stroke, index) => ({ node: { ...localPaintNode(node, `${node.name} / 描边 ${index + 1}`, [], [{ ...stroke, opacity: 1, blendMode: "NORMAL" }]), opacity: stroke.opacity, blendMode: stroke.blendMode || "NORMAL" }, visible: stroke.visible })),
      ];
      value.type = "group";
      value.style.fill = value.style.stroke = { type: "none" };
      value.meta.ux.width = node.width; value.meta.ux.height = node.height;
      value.group = { children: paints.map(({ node: paintNode, visible }) => {
        const child = layer({ ...paintNode, fills: paintNode.fills.map((fill) => ({ ...fill, visible: true })), strokes: paintNode.strokes.map((stroke) => ({ ...stroke, visible: true })) });
        child.visible = visible;
        return child;
      }) };
      report.add("xd-paint-layers", "多重填充、描边或隐藏的绘制属性已拆为可编辑子图层保留。", node.name, "info");
      return value;
    }
    const imageFill = node.fills[0];
    const size = imageFill && imageSizes.get(imageFill.imageHash);
    const imageMatrix = imageFill && needsImageTransform(imageFill) && xdImageTransform(node, imageFill, size);
    if (imageMatrix) {
      const mask = layer(localPaintNode(node, `${node.name} / 裁切形状`, [solid(color())], []));
      const image = { type: "shape", name: `${node.name} / 原图`, id: uid(), transform: imageMatrix, shape: { type: "rect", x: 0, y: 0, width: size.width, height: size.height }, style: { fill: paint({ ...imageFill, imageScaleMode: "FILL" }, node) } };
      const crop = clipGroup(`${node.name} / 图片裁剪`, mask, [image]);
      value.type = "group"; value.group = { children: [crop] };
      value.meta.ux.width = node.width; value.meta.ux.height = node.height;
      value.style.fill = value.style.stroke = { type: "none" };
      report.add("xd-image-crop", "图片原始资源与裁剪变换已保留为可编辑的图片和裁切形状。", node.name, "info");
    } else if (node.type === "TEXT") {
      value.type = "text";
      Object.assign(value.style, writeTextStyle(node));
      Object.assign(value.style.textAttributes, { textAlign: node.textAlignHorizontal.toLowerCase(), paragraphAfterSpacing: node.paragraphSpacing, lineHeight: node.lineHeight || node.fontSize * 1.2 });
      const ranges = textRanges(node);
      value.meta.ux.singleTextObject = true;
      value.meta.ux.rangedStyles = ranges.map(({ from, to, node: run }) => {
        const native = writeTextStyle(run), fill = run.fills.at(-1);
        return { length: to - from, fontFamily: run.fontFamily, fontStyle: native.font.style, fontSize: run.fontSize, charSpacing: native.textAttributes.letterSpacing, underline: run.textDecoration === "UNDERLINE", strikethrough: run.textDecoration === "STRIKETHROUGH", textTransform: native.textAttributes.textTransform, textScript: "none", fill: writeRangeColor(fill?.color ? { ...fill.color, a: fill.color.a * fill.opacity } : { r: 0, g: 0, b: 0, a: 1 }) };
      });
      let from = 0;
      value.text = { frame: { type: "positioned", width: node.width, height: node.height }, rawText: node.text, paragraphs: node.text.split("\n").map((line, index) => {
        const start = from, end = start + line.length;
        from = end + 1;
        const runs = ranges.filter((range) => range.from < end && range.to > start).map((range, i) => ({ from: Math.max(start, range.from), to: Math.min(end, range.to), ...(i === 0 ? { x: 0 } : {}), y: node.fontSize * 0.8 + index * (node.lineHeight || node.fontSize * 1.2), style: { ...writeTextStyle(range.node), fill: paint(range.node.fills.at(-1), range.node) } }));
        return { lines: [runs.length ? runs : [{ from: start, to: end, x: 0, y: node.fontSize * 0.8 + index * (node.lineHeight || node.fontSize * 1.2) }]] };
      }) };
    } else if (node.type === "BOOLEAN_OPERATION") {
      value.shape = { type: "compound", path: nodePath(node), operation: String(node.booleanOperation || "UNION").toLowerCase(), children: graph.getChildren(node.id).map((child) => layer(child)) };
    } else if (["ELLIPSE"].includes(node.type)) value.shape = { type: "ellipse", cx: node.width / 2, cy: node.height / 2, rx: node.width / 2, ry: node.height / 2 };
    else if (["RECTANGLE", "ROUNDED_RECTANGLE"].includes(node.type)) value.shape = { type: "rect", x: 0, y: 0, width: node.width, height: node.height, r: node.independentCorners ? [node.topLeftRadius, node.topRightRadius, node.bottomRightRadius, node.bottomLeftRadius] : Array(4).fill(node.cornerRadius) };
    else if (node.type === "LINE") value.shape = { type: "line", x1: 0, y1: 0, x2: node.width, y2: node.height };
    else if (["VECTOR", "STAR", "POLYGON"].includes(node.type)) {
      const path = nodePath(node);
      value.shape = { type: "path", path };
      if (!path) report.add("vector-empty", "部分矢量没有可读取的轮廓。", node.name);
    } else {
      value.type = "group";
      const responsive = xdResponsivePair(graph, node);
      let content = children(graph.getChildren(node.id));
      if (responsive) {
        content.forEach((child, index) => {
          keepBounds(child, responsive.children[index]);
          Object.assign(child.meta.ux, { customConstraints: true, constraintWidth: true, constraintHeight: true, constraintLeft: responsive.horizontal && index === 0, constraintRight: responsive.horizontal && index === 1, constraintTop: !responsive.horizontal && index === 0, constraintBottom: !responsive.horizontal && index === 1 });
        });
        value.meta.ux.orbitResponsivePair = { layoutMode: node.layoutMode };
        report.add("xd-responsive-pair", "两端分布、居中对齐和固定子元素尺寸已映射为 XD 原生响应式约束。", node.name, "info");
      }
      if (node.clipsContent) {
        const mask = layer({ ...localPaintNode(node, `${node.name} / 画框裁切`, [solid(color())], []), type: "RECTANGLE" });
        content = [clipGroup(`${node.name} / 裁切内容`, mask, content)];
      }
      value.group = { children: content };
      value.meta.ux.width = node.width; value.meta.ux.height = node.height;
      if (node.fills.length) value.group.children.unshift(layer({ ...localPaintNode(node, `${node.name} 背景`, node.fills, []), type: "RECTANGLE" }));
      if (node.strokes.length) value.group.children.push(layer({ ...localPaintNode(node, `${node.name} 描边`, [], node.strokes), type: "RECTANGLE" }));
      if (responsive) keepBounds(value, node);
      value.style.fill = value.style.stroke = { type: "none" };
    }
    if (xdStandaloneComponent(graph, node)) componentMaster(value, node);
    return value;
  }
  const sourcePages = graph.getPages(true);
  if (sourcePages.length > 1) report.add("xd-pages", "XD 不支持多页，所有页面及内部资源页的图层已分区排放。", "", "info");
  let pageOffset = 0;
  for (const page of sourcePages) {
    const roots = graph.getChildren(page.id);
    const frames = roots.filter((n) => n.type === "FRAME" || n.type === "COMPONENT");
    const free = roots.filter((n) => !frames.includes(n));
    const sourceBoards = [...frames.map((node) => xdStandaloneComponent(graph, node) ? { componentCanvas: true, node: { ...node, name: `${node.name} / 组件画布`, opacity: 1, fills: [], strokes: [], effects: [] }, items: [{ ...node, x: 0, y: 0 }] } : { node, items: graph.getChildren(node.id) }), ...(free.length ? [{ node: { ...page, name: `${page.name} / 画布`, x: 0, y: 0, width: Math.max(1, ...free.map((n) => n.x + n.width)), height: Math.max(1, ...free.map((n) => n.y + n.height)) }, items: free }] : [])];
    let pageRight = 0;
    for (const { node, items, componentCanvas } of sourceBoards) {
      written.add(node.id);
      const id = uid(), x = node.x + pageOffset, y = node.y;
      boards[id] = { width: node.width || 1, height: node.height || 1, name: node.name, x, y };
      pageRight = Math.max(pageRight, node.x + node.width);
      const boardStyle = style(node);
      const boardChildren = children(items, x, y);
      if (node.fills.length > 1 || node.strokes.length || node.independentCorners || node.cornerRadius) {
        boardChildren.unshift(layer({ ...localPaintNode(node, `${node.name} 背景`, node.fills, node.strokes), type: "RECTANGLE", x, y }));
        boardStyle.fill = boardStyle.stroke = { type: "none" };
      }
      const content = { version: "1.5.0", children: [{ type: "artboard", id, name: node.name, visible: node.visible, meta: { ux: { hasCustomName: true, locked: !!node.locked, ...(componentCanvas ? { orbitComponentCanvas: true } : {}) } }, style: boardStyle, artboard: { children: boardChildren, ref: id, meta: { ux: { path: id } } } }], resources: { href: "/resources/graphics/graphicContent.agc" }, artboards: { href: "/resources/graphics/graphicContent.agc" } };
      const path = `artboard-${id}`;
      archive[`artwork/${path}/graphics/graphicContent.agc`] = encoder(JSON.stringify(content));
      artwork.push(folder(path, [folder("graphics", [], [component("graphicContent.agc", "application/vnd.adobe.agc.graphicsTree+json")])], [], { "uxdesign#bounds": boards[id] }));
    }
    pageOffset += pageRight + 300;
  }
  archive["resources/graphics/graphicContent.agc"] = encoder(JSON.stringify({ version: "1.5.0", children: [], resources: { gradients: {}, clipPaths: {}, meta: { ux: { symbols, symbolsMetadata: { usingNestedSymbolSyncing: true }, colorSwatches: [], documentLibrary: { version: 5, isStickerSheet: false, hashedMetadata: { publishedDocLibId: null }, elements: [], groupData: { groups: [] } }, gridDefaults: { defaultGrid: null, layoutOverrides: null }, colorProfile: "srgb" } } }, artboards: boards }));
  archive["artwork/pasteboard/graphics/graphicContent.agc"] = encoder(JSON.stringify({ version: "1.5.0", children: [], resources: { href: "/resources/graphics/graphicContent.agc" }, artboards: { href: "/resources/graphics/graphicContent.agc" } }));
  artwork.unshift(folder("pasteboard", [folder("graphics", [], [component("graphicContent.agc", "application/vnd.adobe.agc.graphicsTree+json")])]));
  archive["interactions/interactions.json"] = encoder('{"version":"0.24"}');
  archive["sharing/sharing.json"] = encoder('{"version":"0.3","selectedLink":-1}');
  const docID = uid(), now = new Date().toISOString();
  archive["META-INF/metadata.xml"] = encoder(`<?xml version="1.0" encoding="UTF-8"?><x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Description rdf:about="" xmlns:xmp="http://ns.adobe.com/xap/1.0/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xmpMM="http://ns.adobe.com/xap/1.0/mm/" xmp:CreatorTool="Orbit" xmp:CreateDate="${now}" xmp:ModifyDate="${now}" dc:format="application/vnd.adobe.sparkler.project+dcx" xmpMM:DocumentID="${rootID}" xmpMM:InstanceID="${uid()}"/></rdf:RDF></x:xmpmeta>`);
  const rootComponents = [component("META-INF/metadata.xml", "application/rdf+xml", "metadata")];
  if (thumbnail) {
    archive["thumbnail.png"] = [thumbnail, { level: 0 }]; archive["preview.png"] = [thumbnail, { level: 0 }];
    const view = new DataView(thumbnail.buffer, thumbnail.byteOffset, thumbnail.byteLength);
    const size = { width: view.getUint32(16), height: view.getUint32(20) };
    rootComponents.push(component("thumbnail.png", "image/png", "thumbnail", size), component("preview.png", "image/png", "preview", size));
  }
  archive.manifest = encoder(JSON.stringify({ state: "unmodified", "manifest-format-version": 6, name, "uxdesign#applicationVersion": "57.1.12.2", type: "application/vnd.adobe.sparkler.project+dcx", "uxdesign#serializationId": uid(), "uxdesign#id": docID, "uxdesign#parentDocId": docID, id: rootID, "uxdesign#compositeID": rootID, "uxdesign#version": "2.33", components: rootComponents, children: [folder("artwork", artwork), folder("resources", [folder("graphics", [], [component("graphicContent.agc", "application/vnd.adobe.agc.graphicsTree+json")])], resources), folder("interactions", [], [component("interactions.json", "application/vnd.adobe.uxdesign.interactions+json")]), folder("sharing", [], [component("sharing.json", "application/vnd.adobe.uxdesign.sharing+json")])] }));
  reportMissingLayers(graph, written, report);
  return zipSync(archive);
}
