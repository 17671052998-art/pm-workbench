import PathKitInit from "pathkit-wasm";
import { pathKitOptions } from "#pathkit-options";
import { nodePath, normalizePath } from "./common.mjs";

let ready;
function pathKit() {
  if (!ready) ready = PathKitInit(pathKitOptions()).catch((error) => { ready = null; throw error; });
  return ready;
}

export async function tightPathBounds(value) {
  const kit = await pathKit(), path = kit.FromSVGString(value);
  if (!path) throw new Error("无法读取字形轮廓。");
  try {
    const b = path.computeTightBounds();
    return { x: b.fLeft, y: b.fTop, width: b.fRight - b.fLeft, height: b.fBottom - b.fTop };
  } finally { path.delete(); }
}

function shapePath(node) {
  if (node.type === "ELLIPSE") return `M${node.width / 2} 0 A${node.width / 2} ${node.height / 2} 0 1 1 ${node.width / 2} ${node.height} A${node.width / 2} ${node.height / 2} 0 1 1 ${node.width / 2} 0 Z`;
  if (node.type === "LINE") return `M0 0 L${node.width} ${node.height}`;
  if (!["RECTANGLE", "ROUNDED_RECTANGLE"].includes(node.type)) return nodePath(node);
  const w = node.width, h = node.height;
  const [tl, tr, br, bl] = (node.independentCorners ? [node.topLeftRadius, node.topRightRadius, node.bottomRightRadius, node.bottomLeftRadius] : Array(4).fill(node.cornerRadius)).map((r) => Math.max(0, Math.min(r, w / 2, h / 2)));
  const corner = (r, x, y) => r ? `A${r} ${r} 0 0 1 ${x} ${y}` : `L${x} ${y}`;
  return `M${tl} 0 L${w - tr} 0 ${corner(tr, w, tr)} L${w} ${h - br} ${corner(br, w - br, h)} L${bl} ${h} ${corner(bl, 0, h - bl)} L0 ${tl} ${corner(tl, tl, 0)} Z`;
}

function nonzeroPath(kit, path) {
  const contours = [];
  let current, start, edges;
  for (const command of normalizePath(path.toSVGString())) {
    const to = { x: command.x, y: command.y };
    if (command.type === "M") { current = start = to; edges = []; contours.push(edges); }
    else if (command.type === "Z") {
      if (current.x !== start.x || current.y !== start.y) edges.push({ type: "L", from: current, to: start });
      current = start;
    } else { edges.push({ ...command, from: current, to }); current = to; }
  }
  if (contours.length > 512) throw new Error("蒙版轮廓过于复杂。");
  const encode = (list, reverse = false) => {
    if (!list.length) return "";
    const first = reverse ? list.at(-1).to : list[0].from;
    return `M${first.x} ${first.y} ` + (reverse ? [...list].reverse() : list).map((edge) => {
      const end = reverse ? edge.from : edge.to;
      if (edge.type === "C") return `C${reverse ? edge.x2 : edge.x1} ${reverse ? edge.y2 : edge.y1} ${reverse ? edge.x1 : edge.x2} ${reverse ? edge.y1 : edge.y2} ${end.x} ${end.y}`;
      if (edge.type === "Q") return `Q${edge.x1} ${edge.y1} ${end.x} ${end.y}`;
      return `L${end.x} ${end.y}`;
    }).join(" ") + " Z";
  };
  const area = (list) => list.reduce((total, edge) => {
    const coefficients = (axis) => {
      const a = edge.from[axis], b = edge.to[axis], c = edge[axis + "1"], d = edge[axis + "2"];
      return edge.type === "C" ? [a, 3 * (c - a), 3 * (a - 2 * c + d), -a + 3 * c - 3 * d + b] : edge.type === "Q" ? [a, 2 * (c - a), a - 2 * c + b] : [a, b - a];
    };
    const x = coefficients("x"), y = coefficients("y");
    for (let i = 0; i < x.length; i++) for (let j = 1; j < y.length; j++) total += (x[i] * j * y[j] - y[i] * j * x[j]) / (i + j);
    return total;
  }, 0);
  const paths = contours.map((edges) => kit.FromSVGString(encode(edges)));
  try {
    const bounds = paths.map((path) => path.computeTightBounds());
    return contours.map((edges, index) => {
      let depth = 0;
      for (let other = 0; other < paths.length; other++) {
        if (other === index) continue;
        const a = bounds[index], b = bounds[other];
        if (b.fLeft > a.fLeft || b.fTop > a.fTop || b.fRight < a.fRight || b.fBottom < a.fBottom) continue;
        const difference = kit.MakeFromOp(paths[index], paths[other], kit.PathOp.DIFFERENCE);
        if (!difference) throw new Error("无法确定蒙版孔洞方向。");
        try { if (!difference.toCmds().length) depth++; } finally { difference.delete(); }
      }
      return encode(edges, (area(edges) > 0) !== (depth % 2 === 0));
    }).join(" ");
  } finally { paths.forEach((path) => path?.delete()); }
}

export async function vectorMaskPath(plan) {
  const kit = await pathKit(), result = kit.NewPath();
  try {
    for (const { node, stroke, matrix: m, include } of plan) {
      const base = kit.FromSVGString(shapePath(node));
      if (!base) throw new Error("无法读取蒙版的矢量轮廓。");
      let shape;
      try {
        base.setFillType(node.fillGeometry[0]?.windingRule === "EVENODD" ? kit.FillType.EVENODD : kit.FillType.WINDING);
        shape = base.copy();
        if (stroke) {
          if (stroke.weight <= 0) continue;
          const cap = { NONE: kit.StrokeCap.BUTT, ROUND: kit.StrokeCap.ROUND, SQUARE: kit.StrokeCap.SQUARE }[stroke.cap || node.strokeCap];
          const join = { MITER: kit.StrokeJoin.MITER, ROUND: kit.StrokeJoin.ROUND, BEVEL: kit.StrokeJoin.BEVEL }[stroke.join || node.strokeJoin];
          if (!shape.stroke({ width: stroke.weight * (stroke.align === "CENTER" ? 1 : 2), cap, join, miter_limit: 4 })) throw new Error("无法计算蒙版描边轮廓。");
          if (stroke.align !== "CENTER" && !shape.op(base, stroke.align === "INSIDE" ? kit.PathOp.INTERSECT : kit.PathOp.DIFFERENCE)) throw new Error("无法计算蒙版描边对齐。");
        }
        shape.transform(m.a, m.c, m.tx, m.b, m.d, m.ty, 0, 0, 1);
        if (!result.op(shape, include ? kit.PathOp.UNION : kit.PathOp.DIFFERENCE)) throw new Error("无法计算蒙版的矢量布尔轮廓。");
      } finally { shape?.delete(); base.delete(); }
    }
    // PathOps returns even-odd contours; native XD clipping uses nonzero winding.
    return nonzeroPath(kit, result);
  } finally { result.delete(); }
}
