import assert from "node:assert/strict";
import { cleanEdges } from "../src/edge-cleanup.mjs";

const width = 21, height = 21;
const data = new Uint8ClampedArray(width * height * 4);
// White RGB hidden under zero alpha must not leak into softened pixels.
for (let i = 0; i < width * height; i++) data.set([255, 255, 255, 0], i * 4);
for (let y = 4; y <= 16; y++) for (let x = 4; x <= 16; x++) {
  const edge = x === 4 || x === 16 || y === 4 || y === 16;
  data.set(edge ? [185, 194, 206, 255] : [20, 50, 90, 255], (y * width + x) * 4);
}
for (let y = 9; y <= 11; y++) for (let x = 9; x <= 11; x++) data.set([255, 255, 255, 255], (y * width + x) * 4);
const original = data.slice();
assert.equal(cleanEdges({ width, height, data }, "none"), false);
assert.deepEqual(data, original);
assert.equal(cleanEdges({ width, height, data }, "white"), true);
const pixel = (x, y) => Array.from(data.slice((y * width + x) * 4, (y * width + x) * 4 + 4));
assert.deepEqual(pixel(10, 10), [255, 255, 255, 255]);
assert.deepEqual(pixel(7, 7), [20, 50, 90, 255]);
assert.deepEqual(pixel(10, 4).slice(0, 3), [20, 50, 90]);
assert.ok(pixel(10, 4)[3] > 0 && pixel(10, 4)[3] < 160);
assert.equal(pixel(10, 3)[3], 0);
assert.deepEqual(pixel(10, 3).slice(0, 3), [0, 0, 0]);
const opaque = new Uint8ClampedArray(width * height * 4).fill(255);
const opaqueOriginal = opaque.slice();
assert.equal(cleanEdges({ width, height, data: opaque }, "white"), false);
assert.deepEqual(opaque, opaqueOriginal);
const soft = original.slice();
cleanEdges({ width, height, data: soft }, "soft");
assert.deepEqual(Array.from(soft.slice((4 * width + 10) * 4, (4 * width + 10) * 4 + 3)), [185, 194, 206]);
// A neutral fringe next to a saturated foreground did not satisfy the old color model.
const flecks = original.slice();
for (let x = 4; x <= 16; x++) flecks.set([225, 225, 225, 255], (4 * width + x) * 4);
cleanEdges({ width, height, data: flecks }, "white", 1.5);
assert.ok(flecks[(4 * width + 10) * 4] < 40);
const thin = new Uint8ClampedArray(width * height * 4);
for (let x = 0; x < width; x++) thin.set([140, 55, 60, 255], (10 * width + x) * 4);
cleanEdges({ width, height, data: thin }, "white", 1.5);
assert.ok(thin[(10 * width + 10) * 4 + 3] > 100);
console.log("PASS: neutral fringe removal, fractional alpha, colored thin strokes, interior whites, opaque no-op, mode-off exact pixels and no hidden RGB leak.");
