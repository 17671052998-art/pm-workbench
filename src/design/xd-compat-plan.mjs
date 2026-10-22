import { imageDimensions, nodePath, xdImageTransform, xdMaskSupported } from "./common.mjs";

const shapes = new Set(["RECTANGLE", "ROUNDED_RECTANGLE", "ELLIPSE", "VECTOR"]);
const normal = (value) => !value || ["NORMAL", "PASS_THROUGH"].includes(value);
const paintSupported = (paint) => ["SOLID", "GRADIENT_LINEAR"].includes(paint.type) && normal(paint.blendMode) && (paint.type === "SOLID" || paint.gradientStops?.length > 0);

export function compatibilityMask(graph, node) {
  if (!node.isMask || node.maskType !== "ALPHA" || !shapes.has(node.type) || !node.visible || node.effects.some((effect) => effect.visible) || !normal(node.blendMode)) return null;
  if (xdMaskSupported(graph, node)) return null;
  if (node.type === "VECTOR" && !nodePath(node)) return null;
  if (![...node.fills, ...node.strokes].every(paintSupported)) return null;
  if (node.dashPattern.length || node.strokes.some((stroke) => stroke.dashPattern?.length || !["CENTER", "INSIDE", "OUTSIDE"].includes(stroke.align))) return null;
  const siblings = graph.getChildren(node.parentId), index = siblings.indexOf(node), items = [];
  for (const child of siblings.slice(index + 1)) {
    if (child.isMask) break;
    if (!shapes.has(child.type) || graph.getChildren(child.id).length || child.fills.length !== 1 || child.fills[0].type !== "IMAGE" || child.effects.length || child.strokes.length) return null;
    const fill = child.fills[0], size = imageDimensions(graph.images.get(fill.imageHash));
    if (!size || size.width * size.height > 16 * 1024 * 1024 || !["FILL", "FIT", "CROP", "STRETCH"].includes(fill.imageScaleMode)) return null;
    if (["CROP", "STRETCH"].includes(fill.imageScaleMode) && !xdImageTransform(child, fill, size)) return null;
    items.push(child);
  }
  return items.length ? items : null;
}

export function compatibilityText(node) {
  return node.type === "TEXT" && node.textDecoration === "NONE" && node.derivedTextGlyphs?.length > 0 && !node.styleRuns.length && node.fills.length === 1 && node.fills[0].type === "GRADIENT_LINEAR" && normal(node.fills[0].blendMode) && node.strokes.length <= 1 && node.strokes.every((stroke) => stroke.type === "SOLID" && stroke.opacity === 1 && normal(stroke.blendMode));
}

export function compatibilityShadow(node) {
  return ["RECTANGLE", "ROUNDED_RECTANGLE", "ELLIPSE"].includes(node.type) && !node.cornerSmoothing && !node.strokes.length && node.fills.length > 0 && node.effects.length === 1 && node.effects.every((effect) => effect.type === "INNER_SHADOW" && effect.radius >= 0 && effect.spread >= 0 && normal(effect.blendMode));
}
