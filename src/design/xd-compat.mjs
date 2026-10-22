import { canvasSurface, decodeImage } from "#design-canvas";
import svgpath from "svgpath";
import { gradientPoint } from "@open-pencil/scene-graph/gradient";
import { nodePath, decodePath, xdMatrix, xdImageTransform, imageDimensions } from "./common.mjs";
import { tightPathBounds } from "./pathops.mjs";
import { compatibilityMask, compatibilityShadow, compatibilityText } from "./xd-compat-plan.mjs";

export function shapePath(node) {
  if (node.type === "VECTOR") return nodePath(node);
  if (node.type === "ELLIPSE") return `M${node.width / 2} 0 A${node.width / 2} ${node.height / 2} 0 1 1 ${node.width / 2} ${node.height} A${node.width / 2} ${node.height / 2} 0 1 1 ${node.width / 2} 0 Z`;
  const w = node.width, h = node.height;
  const radii = node.independentCorners ? [node.topLeftRadius, node.topRightRadius, node.bottomRightRadius, node.bottomLeftRadius] : Array(4).fill(node.cornerRadius);
  const [a, b, c, d] = radii.map((radius) => Math.max(0, Math.min(radius, w / 2, h / 2)));
  const arc = (r, x, y) => r ? `A${r} ${r} 0 0 1 ${x} ${y}` : `L${x} ${y}`;
  return `M${a} 0 L${w - b} 0 ${arc(b, w, b)} L${w} ${h - c} ${arc(c, w - c, h)} L${d} ${h} ${arc(d, 0, h - d)} L0 ${a} ${arc(a, a, 0)} Z`;
}

const product = (a, b) => ({ a: a.a * b.a + a.c * b.b, b: a.b * b.a + a.d * b.b, c: a.a * b.c + a.c * b.d, d: a.b * b.c + a.d * b.d, tx: a.a * b.tx + a.c * b.ty + a.tx, ty: a.b * b.tx + a.d * b.ty + a.ty });
function inverse(m) {
  const d = m.a * m.d - m.b * m.c;
  if (Math.abs(d) < 1e-12) throw new Error("图片或蒙版变换不可逆。");
  return { a: m.d / d, b: -m.b / d, c: -m.c / d, d: m.a / d, tx: (m.c * m.ty - m.d * m.tx) / d, ty: (m.b * m.tx - m.a * m.ty) / d };
}

function imageMatrix(node, fill, size) {
  if (["CROP", "STRETCH"].includes(fill.imageScaleMode) || fill.imageTransform && Object.entries({ m00: 1, m01: 0, m02: 0, m10: 0, m11: 1, m12: 0 }).some(([key, value]) => Math.abs((fill.imageTransform[key] ?? value) - value) > 1e-6)) return xdImageTransform(node, fill, size);
  const scale = Math[fill.imageScaleMode === "FIT" ? "min" : "max"](node.width / size.width, node.height / size.height);
  return { a: scale, b: 0, c: 0, d: scale, tx: (node.width - size.width * scale) / 2, ty: (node.height - size.height * scale) / 2 };
}

function alphaPaint(ctx, fill, node) {
  if (fill.type === "SOLID") return `rgba(255,255,255,${fill.color.a})`;
  const from = fill.gradientTransform ? gradientPoint(fill.gradientTransform, { x: 0, y: 0.5 }) : { x: 0, y: 0 };
  const to = fill.gradientTransform ? gradientPoint(fill.gradientTransform, { x: 1, y: 0.5 }) : { x: 1, y: 0 };
  const gradient = ctx.createLinearGradient(from.x * node.width, from.y * node.height, to.x * node.width, to.y * node.height);
  for (const stop of fill.gradientStops) gradient.addColorStop(Math.max(0, Math.min(1, stop.position)), `rgba(255,255,255,${stop.color.a})`);
  return gradient;
}

async function maskedImage(graph, mask, node, cache) {
  const fill = node.fills[0], bytes = graph.images.get(fill.imageHash), size = imageDimensions(bytes);
  const m = product(inverse(product(xdMatrix(node), imageMatrix(node, fill, size))), xdMatrix(mask));
  const key = JSON.stringify({ image: fill.imageHash, path: shapePath(mask), fills: mask.fills, strokes: mask.strokes, opacity: mask.opacity, m });
  if (cache.has(key)) return cache.get(key);
  const surface = canvasSurface(size.width, size.height), { ctx } = surface;
  ctx.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty);
  const path = surface.path(shapePath(mask));
  for (const paint of mask.fills.filter((paint) => paint.visible)) {
    ctx.globalAlpha = paint.opacity;
    ctx.fillStyle = alphaPaint(ctx, paint, mask);
    ctx.fill(path, mask.fillGeometry[0]?.windingRule === "EVENODD" ? "evenodd" : "nonzero");
  }
  for (const paint of mask.strokes.filter((paint) => paint.visible && paint.weight > 0)) {
    ctx.save();
    ctx.globalAlpha = paint.opacity;
    ctx.strokeStyle = alphaPaint(ctx, paint, mask);
    ctx.lineWidth = paint.weight * (paint.align === "CENTER" ? 1 : 2);
    ctx.lineJoin = (paint.join || mask.strokeJoin).toLowerCase();
    ctx.lineCap = (paint.cap || mask.strokeCap) === "NONE" ? "butt" : (paint.cap || mask.strokeCap).toLowerCase();
    ctx.miterLimit = mask.strokeMiterLimit || 4;
    if (paint.align === "INSIDE") ctx.clip(path);
    if (paint.align === "OUTSIDE") {
      const extent = 100000;
      const outside = surface.path(`M${-extent} ${-extent} H${extent} V${extent} H${-extent} Z ${shapePath(mask)}`);
      ctx.clip(outside, "evenodd");
    }
    ctx.stroke(path);
    ctx.restore();
  }
  ctx.resetTransform(); ctx.globalAlpha = 1;
  const alpha = ctx.getImageData(0, 0, size.width, size.height).data;
  ctx.clearRect(0, 0, size.width, size.height);
  const image = await decodeImage(bytes);
  try { ctx.drawImage(image, 0, 0); } finally { image.close?.(); }
  const original = ctx.getImageData(0, 0, size.width, size.height);
  for (let i = 3; i < original.data.length; i += 4) original.data[i] = Math.round(original.data[i] * alpha[i] / 255 * mask.opacity);
  ctx.putImageData(original, 0, 0);
  const result = await surface.png();
  cache.set(key, result);
  return result;
}

async function shadowImage(node, effect) {
  const scale = 3, width = Math.max(1, Math.ceil(node.width * scale)), height = Math.max(1, Math.ceil(node.height * scale));
  if (width * height > 16 * 1024 * 1024) throw new Error("阴影区域过大，请缩小素材后重试。");
  const padding = Math.ceil((effect.radius * 3 + effect.spread + Math.abs(effect.offset.x) + Math.abs(effect.offset.y) + 2) * scale);
  if (!Number.isFinite(padding) || (width + padding * 2) * (height + padding * 2) > 16 * 1024 * 1024) throw new Error("阴影扩展范围过大，请减小模糊或扩展值后重试。");
  const surface = canvasSurface(width, height), buffer = canvasSurface(width + padding * 2, height + padding * 2), { ctx } = buffer;
  const spread = effect.spread;
  const inner = { ...node, width: Math.max(0, node.width - spread * 2), height: Math.max(0, node.height - spread * 2), cornerRadius: Math.max(0, node.cornerRadius - spread), topLeftRadius: Math.max(0, node.topLeftRadius - spread), topRightRadius: Math.max(0, node.topRightRadius - spread), bottomLeftRadius: Math.max(0, node.bottomLeftRadius - spread), bottomRightRadius: Math.max(0, node.bottomRightRadius - spread) };
  ctx.scale(scale, scale);
  ctx.fillStyle = "white"; ctx.fillRect(0, 0, buffer.canvas.width / scale, buffer.canvas.height / scale);
  ctx.globalCompositeOperation = "destination-out";
  ctx.translate(padding / scale + spread + effect.offset.x, padding / scale + spread + effect.offset.y);
  ctx.fill(buffer.path(shapePath(inner)));
  const target = surface.ctx;
  target.filter = `blur(${effect.radius / 2 * scale}px)`;
  target.drawImage(buffer.canvas, -padding, -padding);
  target.filter = "none";
  const pixels = target.getImageData(0, 0, width, height);
  const c = effect.color;
  for (let i = 0; i < pixels.data.length; i += 4) { pixels.data[i] = Math.round(c.r * 255); pixels.data[i + 1] = Math.round(c.g * 255); pixels.data[i + 2] = Math.round(c.b * 255); pixels.data[i + 3] = Math.round(pixels.data[i + 3] * c.a); }
  target.putImageData(pixels, 0, 0);
  target.globalCompositeOperation = "destination-in";
  target.scale(scale, scale); target.fillStyle = "white"; target.fill(surface.path(shapePath(node)));
  return surface.png();
}

export async function prepareXDCompatibility(graph) {
  const masks = new Map(), images = new Map(), shadows = new Map(), texts = new Map(), resources = new Map(), cache = new Map();
  async function resource(bytes) {
    const hash = [...new Uint8Array(await crypto.subtle.digest("SHA-1", bytes))].map((value) => value.toString(16).padStart(2, "0")).join("");
    resources.set(hash, bytes);
    return hash;
  }
  for (const node of graph.nodes.values()) {
    const items = compatibilityMask(graph, node);
    if (items) {
      masks.set(node.id, items.map((item) => item.id));
      for (const item of items) images.set(item.id, await resource(await maskedImage(graph, node, item, cache)));
    }
    if (compatibilityText(node)) {
      const path = node.derivedTextGlyphs.map((glyph) => svgpath(decodePath(glyph.commandsBlob)).scale(glyph.fontSize).rotate((glyph.rotation || 0) * 180 / Math.PI).scale(glyph.scaleX ?? 1, glyph.scaleY ?? 1).translate(glyph.x, glyph.y).toString()).join(" ");
      const bounds = path.trim() ? await tightPathBounds(path) : null;
      if (!bounds || !Number.isFinite(bounds.width) || !Number.isFinite(bounds.height) || bounds.width <= 0 || bounds.height <= 0) throw new Error(`文字“${node.name}”的字形缓存无有效轮廓，不能生成缺失文字的结果。`);
      texts.set(node.id, { path, bounds });
    }
    if (node.effects.some((effect) => effect.spread) && compatibilityShadow(node)) {
      const effects = [];
      for (const effect of node.effects.filter((effect) => effect.spread)) effects.push({ effect, hash: await resource(await shadowImage(node, effect)) });
      shadows.set(node.id, effects);
    }
  }
  return { masks, images, shadows, texts, resources };
}
