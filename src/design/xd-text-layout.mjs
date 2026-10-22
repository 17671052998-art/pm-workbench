const layoutFields = new Set(["text", "styleRuns", "width", "height", "fontSize", "fontFamily", "fontWeight", "italic", "lineHeight", "letterSpacing", "textAlignHorizontal", "textAlignVertical", "paragraphSpacing", "paragraphIndent", "textAutoResize"]);
const sameSize = (a, b) => Number.isFinite(a) && Math.abs(a - b) < 0.01;

function savedFigmaLayout(node) {
  const source = node.source;
  if (source?.format !== "fig" || source.editedFields?.some((field) => layoutFields.has(field)) || node.textPathData) return null;
  const raw = source.fig?.rawNodeFields, data = raw?.derivedTextData;
  if (raw?.textData?.characters !== node.text || !sameSize(source.fig.rawSize?.x, node.width) || !sameSize(source.fig.rawSize?.y, node.height) || !data?.baselines?.length) return null;
  const lines = [];
  let previousEnd = 0;
  for (const baseline of data.baselines) {
    const { firstCharacter: from, endCharacter: end, position } = baseline;
    if (!Number.isInteger(from) || !Number.isInteger(end) || from < previousEnd || end < from || end > node.text.length || !Number.isFinite(position?.x) || !Number.isFinite(position?.y) || /[^\r\n]/.test(node.text.slice(previousEnd, from))) return null;
    let to = end;
    while (to > from && /[\r\n]/.test(node.text[to - 1])) to--;
    // Embedded newlines must have their own saved baseline, never one stretched line.
    if (/[\r\n]/.test(node.text.slice(from, to))) return null;
    lines.push({ from, to, x: position.x, y: position.y, width: baseline.width });
    previousEnd = end;
  }
  if (/[^\r\n]/.test(node.text.slice(previousEnd))) return null;
  const paragraphs = [];
  for (const line of lines) {
    const previous = paragraphs.at(-1)?.lines.at(-1);
    if (!previous || /[\r\n]/.test(node.text.slice(previous.to, line.from))) paragraphs.push({ lines: [] });
    paragraphs.at(-1).lines.push(line);
  }
  return { paragraphs, lineHeight: data.baselines[0].lineHeight || node.lineHeight || node.fontSize * 1.2, characterOffsets: data.logicalIndexToCharacterOffsetMap, origin: "fig-baselines" };
}

export function xdTextLayout(node) {
  const saved = node.source?.xdTextLayout;
  if (saved?.text === node.text && sameSize(saved.width, node.width) && sameSize(saved.height, node.height)) return structuredClone(saved.layout);
  const figma = savedFigmaLayout(node);
  if (figma) return figma;
  const lineHeight = node.lineHeight || node.fontSize * 1.2;
  let from = 0;
  const paragraphs = node.text.split("\n").map((line, index) => {
    const start = from; from += line.length + 1;
    return { lines: [{ from: start, to: start + line.length, x: 0, y: node.fontSize * 0.8 + index * (lineHeight + node.paragraphSpacing) }] };
  });
  return { paragraphs, lineHeight, origin: "estimated" };
}
