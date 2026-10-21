import { unzipSync, strFromU8, strToU8 } from "fflate";
import svgpath from "svgpath";
import { SceneGraph } from "@open-pencil/scene-graph";
import { parseSVGPath } from "@open-pencil/scene-graph/parse-path";
import { encodePathCommandsBlob } from "@open-pencil/fig/node-change";

export const MAX_FILE = 100 * 1024 * 1024;
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
  if (bytes.byteLength > MAX_FILE) throw new Error("文件超过 100 MB，请拆分后转换。");
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
    add(code, message, name = "") {
      const issue = issues.get(code) || { code, message, count: 0, examples: [] };
      issue.count++;
      if (name && issue.examples.length < 3 && !issue.examples.includes(name)) issue.examples.push(name.slice(0, 100));
      issues.set(code, issue);
    },
    list() { return [...issues.values()]; },
  };
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
    if (target === "xd" && node.fills.filter((f) => f.visible).length > 1) report.add("multiple-fills", "XD 仅保留最上层可见填充。", node.name);
    if (target === "xd" && node.strokes.filter((s) => s.visible).length > 1) report.add("multiple-strokes", "XD 仅保留最上层可见描边。", node.name);
    for (const fill of node.fills) if (!["SOLID", "IMAGE", "GRADIENT_LINEAR", "GRADIENT_RADIAL"].includes(fill.type)) report.add("paint-approximation", "部分填充类型按基础颜色或线性渐变近似。", node.name);
    if (node.isMask) report.add("mask", "复杂蒙版需要在目标软件中检查。", node.name);
    if (node.clipsContent && graph.getNode(node.parentId)?.type !== "CANVAS" && target !== "fig") report.add("nested-clip", "嵌套画框的裁切范围可能发生变化，请检查溢出内容。", node.name);
    if (node.type === "BOOLEAN_OPERATION") report.add("boolean", "布尔组合按可编辑子图层保留，相减和相交效果需要检查。", node.name);
    if (["CONNECTOR", "SHAPE_WITH_TEXT"].includes(node.type)) report.add("special-node", "部分特殊图层仅保留可读取的子图层和基础外观。", node.name);
    for (const fill of node.fills) if (fill.type === "IMAGE" && (fill.imageTransform || fill.imageScaleMode === "CROP")) report.add("image-crop", "图片保留原始资源，裁剪和局部变换需要检查。", node.name);
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
