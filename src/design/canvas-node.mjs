import { createCanvas, loadImage, Path2D } from "@napi-rs/canvas";

export function canvasSurface(width, height) {
  const canvas = createCanvas(width, height);
  return { canvas, ctx: canvas.getContext("2d"), path: (value) => new Path2D(value), png: async () => new Uint8Array(await canvas.encode("png")) };
}

export const decodeImage = (bytes) => loadImage(Buffer.from(bytes));
