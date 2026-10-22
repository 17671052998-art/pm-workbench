import { unzipSync, strFromU8, strToU8 } from "fflate";
import svgpath from "svgpath";
import { SceneGraph } from "@open-pencil/scene-graph";
import { parseSVGPath } from "@open-pencil/scene-graph/parse-path";
import { encodePathCommandsBlob } from "@open-pencil/fig/node-change";

export const MAX_EXPANDED = 400 * 1024 * 1024;
export const MAX_NODES = 50000;
export const encoder = strToU8;
export const decoder = strFromU8;
export const uid = () => crypto.randomUUID().toUpperCase();
export const finite = (value, fallback = 0) => Number.isFinite(Number(value)) ? Number(value) : fallback;
export const clamp = (value, low = 0, high = 1) => Math.max(low, Math.min(high, finite(value)));
export const point = (value, fallback = [0, 0]) => {
  const numbers = typeof value === "string" ? value.match(/[-+]?(?:\d*\.)?\d+(?:e[-+]?\d+)?/gi)?.map(Number) : null;
  return numbers?.length >= 2 ? numbers : fallback;
};
export const color = (r = 0, g = 0, b = 0, a = 1) => ({ r: clamp(r), g: clamp(g), b: clamp(b), a: clamp(a) });
export const solid = (value, opacity = 1) => ({ type: "SOLID", color: value, opacity: clamp(opacity), visible: true });
export const EMPTY_PNG = Uint8Array.from(atob("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="), (c) => c.charCodeAt(0));

export function unpack(bytes) {
  let expanded = 0;
  let entries = 0;
  return unzipSync(bytes, { filter(file) {
    expanded += file.originalSize;
    if (++entries > 50000 || expanded > MAX_EXPANDED) throw new Error("解压后内容过大，请拆分设计文件。");
    return true;
  } });
}

export function jsonEntry(archive, path, fallback) {
  const bytes = archive[path];
  if (!bytes) {
    if (fallback !== undefined) return fallback;
    throw new Error(`文件缺少必要内容：${path}`);
  }
  try { return JSON.parse(decoder(bytes)); }
  catch { throw new Error(`设计数据损坏：${path}`); }
}

export function createGraph() {
  const graph = new SceneGraph();
  graph.getPages().forEach((page) => graph.deleteNode(page.id));
  return graph;
}

export function createReport() {
  const issues = new Map();
  return {
    add(code, message, name = "", severity = "warning") {
      const issue = issues.get(code) || { code, message, count: 0, examples: [], severity };
      if (severity !== "info") issue.severity = severity;
      issue.count++;
      if (name && issue.examples.length < 3 && !issue.examples.includes(name)) issue.examples.push(name.slice(0, 100));
      issues.set(code, issue);
    },
    list() { return [...issues.values()]; },
  };
}

export function reportMissingLayers(graph, written, report) {
  for (const node of graph.nodes.values()) if (node.type !== "CANVAS" && node.id !== graph.rootId && !written.has(node.id)) report.add("missing-layer", "导出器未能写入此源图层，不能作为完整结果使用。", node.name);
}

export function hasMixedTextStyles(node) {
  const value = (key, input) => key === "fills" && input ? JSON.stringify(input.map((fill) => ({ type: fill.type, color: fill.color, opacity: fill.opacity ?? 1, visible: fill.visible ?? true, blendMode: fill.blendMode || "NORMAL" }))) : JSON.stringify(input);
  return node.styleRuns.some((run) => Object.entries(run.style).some(([key, input]) => input !== undefined && value(key, input) !== value(key, node[key])));
}

export function xdTextRunsSupported(node) {
  const fields = new Set(["fontFamily", "fontSize", "fontWeight", "italic", "letterSpacing", "textDecoration", "textCase", "fills"]);
  return node.styleRuns.every((run) => Object.entries(run.style).every(([key, value]) => {
    if (value === undefined || JSON.stringify(value) === JSON.stringify(node[key])) return true;
    if (!fields.has(key)) return false;
    if (key === "fills") return node.fills.length === 1 && node.fills[0].opacity === 1 && value.length === 1 && value[0].type === "SOLID" && value[0].visible !== false && (!value[0].blendMode || value[0].blendMode === "NORMAL");
    if (key === "textCase") return ["ORIGINAL", "UPPER", "LOWER", "TITLE"].includes(value);
    return key !== "textDecoration" || ["NONE", "UNDERLINE", "STRIKETHROUGH"].includes(value);
  }));
}

export function addNode(graph, type, parent, props = {}) {
  if (graph.nodes.size > MAX_NODES) throw new Error("图层超过 50,000 个，请按页面拆分后转换。");
  return graph.createNode(type, parent, props);
}

export function stats(graph) {
  const nodes = [...graph.nodes.values()].filter((node) => node.id !== graph.rootId && node.type !== "CANVAS");
  return { pages: graph.getPages().length, layers: nodes.length, images: graph.images.size, text: nodes.filter((n) => n.type === "TEXT").length, artboards: nodes.filter((n) => n.type === "FRAME" && graph.getNode(n.parentId)?.type === "CANVAS").length };
}

export async function addImage(graph, bytes) {
  const hash = [...new Uint8Array(await crypto.subtle.digest("SHA-1", bytes))].map((b) => b.toString(16).padStart(2, "0")).join("");
  graph.images.set(hash, bytes);
  return hash;
}

export function imageType(bytes) {
  if (bytes?.[0] === 0x89 && bytes[1] === 0x50) return "png";
  if (bytes?.[0] === 0xff && bytes[1] === 0xd8) return "jpg";
  if (bytes?.[0] === 0x47 && bytes[1] === 0x49) return "gif";
  if (bytes?.[8] === 0x57 && bytes[9] === 0x45) return "webp";
  return "bin";
}

export function imageDimensions(bytes) {
  if (!bytes) return null;
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const type = imageType(bytes);
  let width = 0, height = 0;
  if (type === "png" && bytes.length >= 24) { width = view.getUint32(16); height = view.getUint32(20); }
  else if (type === "gif" && bytes.length >= 10) { width = view.getUint16(6, true); height = view.getUint16(8, true); }
  else if (type === "jpg") {
    // JPEG dimensions belong to a Start Of Frame segment, not a fixed byte offset.
    let offset = 2;
    while (offset < bytes.length) {
      if (bytes[offset++] !== 0xff) break;
      while (offset < bytes.length && bytes[offset] === 0xff) offset++;
      const marker = bytes[offset++];
      if (marker === 0xd9 || marker === 0xda) break;
      if (marker === 0x01 || marker >= 0xd0 && marker <= 0xd8) continue;
      if (offset + 2 > bytes.length) break;
      const length = view.getUint16(offset);
      if (length < 2 || offset + length > bytes.length) break;
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker) && length >= 8) {
        height = view.getUint16(offset + 3); width = view.getUint16(offset + 5); break;
      }
      offset += length;
    }
  } else if (type === "webp" && bytes.length >= 30) {
    const chunk = decoder(bytes.subarray(12, 16));
    if (chunk === "VP8X") { width = 1 + (view.getUint32(24, true) & 0xffffff); height = 1 + (view.getUint32(26, true) >>> 8); }
    else if (chunk === "VP8 " && bytes[23] === 0x9d && bytes[24] === 1 && bytes[25] === 0x2a) { width = view.getUint16(26, true) & 0x3fff; height = view.getUint16(28, true) & 0x3fff; }
    else if (chunk === "VP8L" && bytes[20] === 0x2f) { const bits = view.getUint32(21, true); width = 1 + (bits & 0x3fff); height = 1 + (bits >>> 14 & 0x3fff); }
  }
  return width > 0 && height > 0 ? { width, height } : null;
}

export function hasImageTransform(fill) {
  const matrix = fill.imageTransform;
  return matrix && Object.entries({ m00: 1, m01: 0, m02: 0, m10: 0, m11: 1, m12: 0 }).some(([key, identity]) => Math.abs(finite(matrix[key], identity) - identity) > 0.000001);
}

export function xdImageTransform(node, fill, size) {
  if (!size || !["RECTANGLE", "ROUNDED_RECTANGLE", "ELLIPSE", "VECTOR", "BOOLEAN_OPERATION", "STAR", "POLYGON"].includes(node.type)) return null;
  const m = { m00: 1, m01: 0, m02: 0, m10: 0, m11: 1, m12: 0, ...fill.imageTransform };
  const det = m.m00 * m.m11 - m.m01 * m.m10;
  if (!Object.values(m).every(Number.isFinite) || Math.abs(det) < 1e-12) return null;
  // Figma maps a layer's unit square into the image's unit square; XD needs the inverse in pixels.
  return { a: node.width * m.m11 / det / size.width, b: -node.height * m.m10 / det / size.width, c: -node.width * m.m01 / det / size.height, d: node.height * m.m00 / det / size.height, tx: node.width * (m.m01 * m.m12 - m.m11 * m.m02) / det, ty: node.height * (m.m10 * m.m02 - m.m00 * m.m12) / det };
}

export function xdMaskSupported(graph, node, mode = node.maskType) {
  if (!node.visible || node.opacity !== 1 || node.effects.some((effect) => effect.visible)) return false;
  if (node.fills.length > 1 || node.strokes.length > 1 || [...node.fills, ...node.strokes].some((paint) => !paint.visible || paint.opacity !== 1 || paint.blendMode && !["NORMAL", "PASS_THROUGH"].includes(paint.blendMode))) return false;
  if (["GROUP", "FRAME"].includes(node.type)) return false;
  if (!["RECTANGLE", "ROUNDED_RECTANGLE", "ELLIPSE", "VECTOR", "BOOLEAN_OPERATION", "STAR", "POLYGON"].includes(node.type)) return false;
  if (["VECTOR", "BOOLEAN_OPERATION"].includes(node.type) && !nodePath(node)) return false;
  if (mode === "VECTOR") return true;
  if (node.strokes.some((stroke) => stroke.visible)) return false;
  const paints = node.fills.filter((fill) => fill.visible);
  return paints.length > 0 && paints.every((fill) => {
    const colors = fill.type === "SOLID" ? [fill.color] : fill.type.startsWith("GRADIENT") ? (fill.gradientStops || []).map((stop) => stop.color) : [];
    return fill.opacity === 1 && colors.length > 0 && colors.every((c) => c.a === 1 && (mode !== "LUMINANCE" || c.r === 1 && c.g === 1 && c.b === 1));
  });
}

export function normalizePath(d) {
  const parsed = svgpath(d).abs().unshort().unarc();
  if (parsed.err) throw new Error("无法读取矢量路径。");
  let x = 0, y = 0;
  const commands = [];
  parsed.iterate((s) => {
    if (s[0] === "H") s = ["L", s[1], y];
    if (s[0] === "V") s = ["L", x, s[1]];
    const t = s[0].toUpperCase();
    if (t === "M" || t === "L") { x = s[1]; y = s[2]; commands.push({ type: t, x, y }); }
    else if (t === "C") { x = s[5]; y = s[6]; commands.push({ type: t, x1: s[1], y1: s[2], x2: s[3], y2: s[4], x, y }); }
    else if (t === "Q") { x = s[3]; y = s[4]; commands.push({ type: t, x1: s[1], y1: s[2], x, y }); }
    else if (t === "Z") commands.push({ type: "Z" });
  });
  return commands;
}

export function pathBounds(d) {
  const coords = normalizePath(d).flatMap((c) => [[c.x, c.y], [c.x1, c.y1], [c.x2, c.y2]].filter((p) => p.every(Number.isFinite)));
  if (!coords.length) return { x: 0, y: 0, width: 0, height: 0 };
  const xs = coords.map((p) => p[0]), ys = coords.map((p) => p[1]);
  return { x: Math.min(...xs), y: Math.min(...ys), width: Math.max(...xs) - Math.min(...xs), height: Math.max(...ys) - Math.min(...ys) };
}

export function vectorProps(d, windingRule = "NONZERO") {
  return { vectorNetwork: parseSVGPath(d, windingRule, { includeOpenRegions: true }), fillGeometry: [{ windingRule, commandsBlob: encodePathCommandsBlob(normalizePath(d)) }] };
}

export function decodePath(blob) {
  const view = new DataView(blob.buffer, blob.byteOffset, blob.byteLength);
  let offset = 0;
  const parts = [];
  while (offset < blob.length) {
    const cmd = blob[offset++];
    if (cmd === 0) { parts.push("Z"); continue; }
    const count = { 1: 2, 2: 2, 3: 4, 4: 6 }[cmd];
    if (!count || offset + count * 4 > blob.length) throw new Error("无法读取矢量轮廓。");
    const values = Array.from({ length: count }, (_, i) => view.getFloat32(offset + i * 4, true) * (i % 2 ? -1 : 1));
    offset += count * 4;
    parts.push(({ 1: "M", 2: "L", 3: "Q", 4: "C" })[cmd] + values.join(" "));
  }
  return parts.join(" ");
}

export function nodePath(node) {
  if (node.fillGeometry.length) return node.fillGeometry.map((g) => decodePath(g.commandsBlob)).join(" ");
  if (node.type === "STAR" || node.type === "POLYGON") {
    const count = Math.max(3, Math.min(1000, node.pointCount || 5));
    const total = node.type === "STAR" ? count * 2 : count;
    const points = Array.from({ length: total }, (_, i) => {
      const angle = -Math.PI / 2 + i * Math.PI * 2 / total;
      const r = node.type === "STAR" && i % 2 ? node.starInnerRadius || 0.5 : 1;
      return `${node.width / 2 + Math.cos(angle) * node.width / 2 * r} ${node.height / 2 + Math.sin(angle) * node.height / 2 * r}`;
    });
    return `M${points.join(" L")} Z`;
  }
  const net = node.vectorNetwork;
  if (!net?.segments.length) return "";
  const used = new Set();
  const parts = [];
  const chains = net.regions.flatMap((r) => r.loops);
  const paths = [...chains, ...net.segments.map((_, i) => [i])];
  for (const path of paths) {
    let current = null, start = null;
    for (const index of path) {
      if (used.has(index)) continue;
      used.add(index);
      const s = net.segments[index];
      const reverse = current !== null && current === s.end;
      const from = net.vertices[reverse ? s.end : s.start], to = net.vertices[reverse ? s.start : s.end];
      const first = reverse ? s.tangentEnd : s.tangentStart, second = reverse ? s.tangentStart : s.tangentEnd;
      if (current === null || current !== (reverse ? s.end : s.start)) { parts.push(`M${from.x} ${from.y}`); start = reverse ? s.end : s.start; }
      parts.push(`C${from.x + first.x} ${from.y + first.y} ${to.x + second.x} ${to.y + second.y} ${to.x} ${to.y}`);
      current = reverse ? s.start : s.end;
    }
    if (current !== null && current === start) parts.push("Z");
  }
  return parts.join(" ");
}

export function transformProps(t, width, height, report, name) {
  const a = finite(t.a, 1), b = finite(t.b), c = finite(t.c), d = finite(t.d, 1);
  const sx = Math.hypot(a, b) || 1, sy = (a * d - b * c) / sx;
  const angle = Math.atan2(b, a);
  const w = Math.abs(width * sx), h = Math.abs(height * sy);
  const cos = Math.cos(angle), sin = Math.sin(angle);
  if (Math.abs(a * c + b * d) > 0.001) report.add("skew", "倾斜变换已近似为旋转和缩放。", name);
  const sign = sy < 0 ? -1 : 1;
  return { x: finite(t.tx) - w / 2 + cos * w / 2 - sin * sign * h / 2, y: finite(t.ty) - h / 2 + sin * w / 2 + cos * sign * h / 2, width: w, height: h, rotation: angle * 180 / Math.PI, flipY: sy < 0 };
}

export function xdMatrix(node) {
  const radians = node.rotation * Math.PI / 180, cos = Math.cos(radians), sin = Math.sin(radians);
  const sx = node.flipX ? -1 : 1, sy = node.flipY ? -1 : 1;
  const a = cos * sx, b = sin * sx, c = -sin * sy, d = cos * sy;
  return { a, b, c, d, tx: node.x + node.width / 2 - a * node.width / 2 - c * node.height / 2, ty: node.y + node.height / 2 - b * node.width / 2 - d * node.height / 2 };
}

export function fontWeight(name = "") {
  if (/black|heavy/i.test(name)) return 900;
  if (/extra.?bold/i.test(name)) return 800;
  if (/semi.?bold|demi/i.test(name)) return 600;
  if (/bold/i.test(name)) return 700;
  if (/medium/i.test(name)) return 500;
  if (/thin/i.test(name)) return 100;
  if (/extra.?light/i.test(name)) return 200;
  if (/light/i.test(name)) return 300;
  return 400;
}

export const fontStyle = (weight, italic) => `${weight >= 800 ? "Heavy" : weight >= 700 ? "Bold" : weight >= 600 ? "Semibold" : weight >= 500 ? "Medium" : weight <= 300 ? "Light" : "Regular"}${italic ? " Italic" : ""}`;

export function targetReport(graph, target, report) {
  for (const node of graph.nodes.values()) {
    if (node.type === "CANVAS" || node.id === graph.rootId) continue;
    if (["COMPONENT", "COMPONENT_SET", "INSTANCE"].includes(node.type) && target !== "fig") report.add("component-expanded", "组件按当前外观展开为可编辑分组，主实例关联不保留。", node.name);
    if (node.layoutMode !== "NONE" && target !== "fig") report.add("layout-fixed", "自动布局转换为当前固定位置。", node.name);
    for (const fill of [...node.fills, ...node.strokes]) {
      if (target !== "fig" && !["SOLID", "IMAGE", "GRADIENT_LINEAR", "GRADIENT_RADIAL"].includes(fill.type)) report.add("paint-approximation", "目标格式尚未实现此填充类型的等价转换。", node.name);
      if (target === "xd" && fill.type === "GRADIENT_RADIAL") report.add("xd-radial-gradient", "径向渐变尚不能等价导出到 XD。", node.name);
      if (target !== "fig" && fill.type === "IMAGE" && (hasImageTransform(fill) || ["CROP", "STRETCH"].includes(fill.imageScaleMode)) && (target !== "xd" || !xdImageTransform(node, fill, imageDimensions(graph.images.get(fill.imageHash))))) report.add("image-crop", "此图片裁剪或局部变换尚不能等价转换。", node.name);
    }
    if (target !== "fig" && node.isMask && (target !== "xd" || !xdMaskSupported(graph, node))) report.add("mask", "此蒙版包含透明渐变、明暗变化或其他尚不能等价转换的属性。", node.name);
    if (node.clipsContent && graph.getNode(node.parentId)?.type !== "CANVAS" && target !== "fig" && target !== "xd") report.add("nested-clip", "嵌套画框的裁切范围可能发生变化，请检查溢出内容。", node.name);
    if (target === "xd" && node.type === "BOOLEAN_OPERATION" && !nodePath(node)) report.add("boolean", "此布尔运算缺少可导出的合成轮廓，不能保证外观。", node.name);
    if (["CONNECTOR", "SHAPE_WITH_TEXT"].includes(node.type)) report.add("special-node", "部分特殊图层仅保留可读取的子图层和基础外观。", node.name);
    if (target !== "fig" && node.arcData && (node.arcData.innerRadius || Math.abs(node.arcData.endingAngle - node.arcData.startingAngle - Math.PI * 2) > 0.001)) report.add("arc-shape", "圆弧或环形的参数尚不能等价转换。", node.name);
    if (target !== "fig" && node.strokes.some((stroke) => String(stroke.cap || node.strokeCap).startsWith("ARROW"))) report.add("arrow-cap", "箭头端点尚不能等价转换。", node.name);
    if (target === "sketch" && node.effects.filter((effect) => effect.type.includes("BLUR")).length > 1) report.add("multiple-blurs", "Sketch 导出目前只能保留一个模糊效果。", node.name);
    if (target === "xd" && node.effects.some((effect) => effect.blendMode && effect.blendMode !== "NORMAL")) report.add("xd-effect-blend", "此效果的混合模式尚不能等价导出到 XD。", node.name);
    if (target === "xd" && node.effects.some((effect) => effect.spread)) report.add("xd-shadow-spread", "XD 阴影扩展参数尚不能保证等价保留。", node.name);
    if (target === "xd" && node.type === "TEXT" && node.fills.some((fill) => fill.type !== "SOLID")) report.add("xd-text-paint", "XD 可编辑文字不支持等价保留此图片或渐变填充。", node.name);
    if (target === "xd" && node.type === "TEXT" && !xdTextRunsSupported(node)) report.add("xd-text-runs", "此文字包含尚不能等价保留的局部样式，例如局部行高、字体特性或复杂填充。", node.name);
  }
}

export function scaleTree(graph, node, sx, sy, report) {
  const path = node.type === "VECTOR" ? nodePath(node) : "";
  if (path) Object.assign(node, vectorProps(svgpath(path).scale(sx, sy).toString()));
  node.x *= sx; node.y *= sy; node.width *= sx; node.height *= sy;
  node.fontSize *= sy;
  if (node.lineHeight) node.lineHeight *= sy;
  node.letterSpacing *= sx; node.cornerRadius *= Math.min(sx, sy);
  node.strokes.forEach((s) => { s.weight *= (sx + sy) / 2; });
  if (node.rotation && Math.abs(sx - sy) > 0.001) report.add("scaled-rotation", "非等比缩放与旋转的组合需要检查。", node.name);
  graph.getChildren(node.id).forEach((child) => scaleTree(graph, child, sx, sy, report));
}
