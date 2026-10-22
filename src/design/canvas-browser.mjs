export function canvasSurface(width, height) {
  const canvas = new OffscreenCanvas(width, height);
  return { canvas, ctx: canvas.getContext("2d", { willReadFrequently: true }), path: (value) => new Path2D(value), png: async () => new Uint8Array(await (await canvas.convertToBlob({ type: "image/png" })).arrayBuffer()) };
}

export const decodeImage = (bytes) => createImageBitmap(new Blob([bytes]));
