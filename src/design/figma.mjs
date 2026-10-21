import { deflateSync } from "fflate";
import { materializeFigArchive, parseFigBuffer, writeFigArchive } from "@open-pencil/fig";
import { sceneNodeToKiwi, makeDocumentNodeChange, makeCanvasNodeChange, nameImagesForFigma, figImageEntries } from "@open-pencil/fig/node-change";
import { initCodec, encodeMessage, getSchemaBytes } from "@open-pencil/kiwi/fig/codec";
import { EMPTY_PNG, MAX_NODES, unpack, xdMatrix } from "./common.mjs";

export async function readFigma(bytes, report) {
  if (bytes[0] === 0x50 && bytes[1] === 0x4b) unpack(bytes);
  const buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
  const parsed = parseFigBuffer(buffer);
  if (parsed.nodeChanges.length > MAX_NODES) throw new Error("图层超过 50,000 个，请拆分 Figma 文件。");
  const { graph } = materializeFigArchive(buffer, {
    onUnsupportedResource: () => report.add("fig-resource", "部分 Figma 专属资源没有对应的目标格式。"),
    onUnsupportedVariableExpression: () => report.add("variable", "变量表达式按当前外观转换。"),
    onUnresolvedBinding: () => report.add("binding", "未能解析的变量绑定按保存值转换。"),
  });
  for (const change of parsed.nodeChanges) {
    if (change.prototypeInteractions?.length || change.reactions?.length) report.add("prototype", "原型交互暂不参与格式转换。", change.name);
  }
  return { graph, thumbnail: parsed.thumbnailPNG || EMPTY_PNG };
}

export async function writeFigma(graph, name, thumbnail = EMPTY_PNG) {
  await initCodec();
  const ids = new Map([[graph.rootId, { sessionID: 0, localID: 0 }]]);
  let index = 1;
  for (const node of graph.nodes.values()) if (node.id !== graph.rootId) ids.set(node.id, { sessionID: 1, localID: index++ });
  const doc = ids.get(graph.rootId);
  const changes = [makeDocumentNodeChange(doc, "srgb")];
  const blobs = [];
  const counter = { value: index };
  graph.getPages().forEach((page, pageIndex) => {
    const pageID = ids.get(page.id);
    changes.push(makeCanvasNodeChange(pageID, doc, String.fromCharCode(33 + pageIndex), page.name));
    graph.getChildren(page.id).forEach((child, childIndex) => {
      changes.push(...sceneNodeToKiwi(child, pageID, childIndex, counter, graph, blobs, { nodeIdToGuid: ids }));
    });
  });
  const nodesByGuid = new Map([...ids].map(([id, guid]) => [`${guid.sessionID}:${guid.localID}`, graph.getNode(id)]));
  for (const change of changes) {
    const node = nodesByGuid.get(`${change.guid.sessionID}:${change.guid.localID}`);
    if (!node || node.id === graph.rootId || node.type === "CANVAS") continue;
    const t = xdMatrix(node);
    change.transform = { m00: t.a, m01: t.c, m02: t.tx, m10: t.b, m11: t.d, m12: t.ty };
    if (change.fontName && node.fontPostscript) change.fontName.postscript = node.fontPostscript;
  }
  const imageNames = nameImagesForFigma(changes, graph.images);
  const kiwiData = encodeMessage({ type: "NODE_CHANGES", sessionID: 0, ackID: 0, nodeChanges: changes, blobs: blobs.map((bytes) => ({ bytes })) });
  const view = thumbnail.length > 24 ? new DataView(thumbnail.buffer, thumbnail.byteOffset, thumbnail.byteLength) : null;
  const width = view?.getUint32(16) || 1, height = view?.getUint32(20) || 1;
  const metaJSON = JSON.stringify({ client_meta: { background_color: { r: 1, g: 1, b: 1, a: 1 }, thumbnail_size: { width, height }, render_coordinates: { x: 0, y: 0, width, height } }, file_name: name, developer_related_links: [], exported_at: new Date().toISOString() });
  return writeFigArchive({ schemaDeflated: deflateSync(getSchemaBytes()), kiwiData, thumbnailPNG: thumbnail, images: figImageEntries(graph.images, imageNames), metaJSON });
}
