import "./compat.mjs";
import { EMPTY_PNG, createReport, stats, targetReport } from "./common.mjs";
import { readFigma, writeFigma } from "./figma.mjs";
import { readSketch, writeSketch } from "./sketch.mjs";
import { readXD, writeXD } from "./xd.mjs";

export const formats = { fig: "Figma", sketch: "Sketch", xd: "Adobe XD" };

export async function readDesign(bytes, filename) {
  const source = filename.split(".").at(-1).toLowerCase();
  if (!formats[source]) throw new Error("请选择 .fig、.sketch 或 .xd 文件。");
  if (!bytes.length) throw new Error("文件为空，请重新选择。");
  const report = createReport();
  const result = await ({ fig: readFigma, sketch: readSketch, xd: readXD })[source](bytes, report);
  const thumbnail = result.thumbnail?.[0] === 0x89 ? result.thumbnail : EMPTY_PNG;
  return { ...result, thumbnail, source, filename, issues: report.list(), stats: stats(result.graph) };
}

function conversionReport(parsed, target) {
  if (!formats[target] || target === parsed.source) throw new Error("请选择不同于原文件的目标格式。");
  const report = createReport();
  for (const issue of parsed.issues) for (let i = 0; i < issue.count; i++) report.add(issue.code, issue.message, issue.examples[i % (issue.examples.length || 1)], issue.severity, issue.category);
  targetReport(parsed.graph, target, report);
  return report;
}

export function inspectDesign(parsed, target) {
  return conversionReport(parsed, target).list();
}

export async function convertDesign(parsed, target) {
  const report = conversionReport(parsed, target);
  function requirePreservation() {
    const issues = report.list();
    if (issues.some((issue) => issue.severity !== "info")) {
      const error = new Error(`当前文件尚不能完整转换为 ${formats[target]}。下方已区分转换器未适配项目与目标格式限制；不会丢弃属性、合成图片或生成不完整结果。`);
      error.code = "PRESERVATION_REQUIRED";
      error.issues = issues;
      throw error;
    }
  }
  requirePreservation();
  const name = parsed.filename.replace(/\.(fig|xd|sketch)$/i, "");
  const bytes = await ({ fig: writeFigma, sketch: writeSketch, xd: writeXD })[target](parsed.graph, name, parsed.thumbnail, report);
  requirePreservation();
  return { bytes, filename: `${name}.${target}`, source: parsed.source, target, stats: parsed.stats, issues: report.list() };
}
