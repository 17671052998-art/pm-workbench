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

export async function convertDesign(parsed, target) {
  if (!formats[target] || target === parsed.source) throw new Error("请选择不同于原文件的目标格式。");
  const report = createReport();
  for (const issue of parsed.issues) for (let i = 0; i < issue.count; i++) report.add(issue.code, issue.message, issue.examples[i % (issue.examples.length || 1)]);
  targetReport(parsed.graph, target, report);
  const name = parsed.filename.replace(/\.(fig|xd|sketch)$/i, "");
  const bytes = await ({ fig: writeFigma, sketch: writeSketch, xd: writeXD })[target](parsed.graph, name, parsed.thumbnail, report);
  return { bytes, filename: `${name}.${target}`, source: parsed.source, target, stats: parsed.stats, issues: report.list() };
}
