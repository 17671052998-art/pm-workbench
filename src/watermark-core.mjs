const TILE = 24;
const BLOCK = 1536;
const HALO = 288;

function validate(image) {
  const { width, height, data } = image;
  if (!Number.isSafeInteger(width) || !Number.isSafeInteger(height) || width < 1 || height < 1 || !Number.isSafeInteger(width * height * 4) || data?.length !== width * height * 4) throw new Error("图片尺寸或像素数据无效，请重新读取原图。");
}

function dominant(samples) {
  const bins = new Map();
  let total = 0;
  for (const [r, g, b] of samples) {
    const key = (r >> 3) * 1024 + (g >> 3) * 32 + (b >> 3);
    const bin = bins.get(key) || [0, 0, 0, 0];
    bin[0]++; bin[1] += r; bin[2] += g; bin[3] += b; total++;
    bins.set(key, bin);
  }
  let best;
  for (const bin of bins.values()) if (!best || bin[0] > best[0]) best = bin;
  return best ? { color: best.slice(1).map((value) => Math.round(value / best[0])), share: best[0] / total } : { color: [0, 0, 0], share: 0 };
}

function backgrounds(image) {
  const cols = Math.ceil(image.width / TILE), rows = Math.ceil(image.height / TILE), cells = [];
  for (let ty = 0; ty < rows; ty++) for (let tx = 0; tx < cols; tx++) {
    const samples = [];
    for (let y = ty * TILE; y < Math.min(image.height, (ty + 1) * TILE); y += 2) for (let x = tx * TILE; x < Math.min(image.width, (tx + 1) * TILE); x += 2) {
      const i = (y * image.width + x) * 4;
      if (image.data[i + 3] >= 240) samples.push([image.data[i], image.data[i + 1], image.data[i + 2]]);
    }
    cells.push(dominant(samples));
  }
  return { cols, cells };
}

function components(mask, width, height, queue, visit) {
  for (let seed = 0; seed < mask.length; seed++) {
    if (!mask[seed]) continue;
    let count = 1, front = 0, left = width, top = height, right = 0, bottom = 0;
    queue[0] = seed; mask[seed] = 0;
    while (front < count) {
      const index = queue[front++], x = index % width, y = Math.floor(index / width);
      left = Math.min(left, x); right = Math.max(right, x); top = Math.min(top, y); bottom = Math.max(bottom, y);
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        if ((!dx && !dy) || x + dx < 0 || x + dx >= width || y + dy < 0 || y + dy >= height) continue;
        const next = index + dy * width + dx;
        if (mask[next]) { mask[next] = 0; queue[count++] = next; }
      }
    }
    visit(queue.subarray(0, count), { x: left, y: top, width: right - left + 1, height: bottom - top + 1 });
  }
}

export function detectWatermarks(image, options = {}) {
  validate(image);
  if (image.width <= BLOCK && image.height <= BLOCK) return detectBlock(image, options);
  const { width, height, data } = image, regions = [];
  let labels = new Uint16Array(width * height);
  // Overlap includes whole glyph groups and protection fringes; copy only each block's core.
  for (let top = 0; top < height; top += BLOCK) for (let left = 0; left < width; left += BLOCK) {
    const x = Math.max(0, left - HALO), y = Math.max(0, top - HALO);
    const right = Math.min(width, left + BLOCK), bottom = Math.min(height, top + BLOCK);
    const blockWidth = Math.min(width, right + HALO) - x, blockHeight = Math.min(height, bottom + HALO) - y;
    const pixels = new Uint8ClampedArray(blockWidth * blockHeight * 4);
    for (let row = 0; row < blockHeight; row++) pixels.set(data.subarray(((y + row) * width + x) * 4, ((y + row) * width + x + blockWidth) * 4), row * blockWidth * 4);
    const detected = detectBlock({ width: blockWidth, height: blockHeight, data: pixels }, options), ids = new Map();
    for (let py = top; py < bottom; py++) for (let px = left; px < right; px++) {
      const localId = detected.labels[(py - y) * blockWidth + px - x];
      if (!localId) continue;
      let id = ids.get(localId);
      if (!id) {
        const region = detected.regions[localId - 1], rx = Math.max(left, x + region.x - 1), ry = Math.max(top, y + region.y - 1);
        id = regions.length + 1; ids.set(localId, id);
        if (id > 65535 && labels instanceof Uint16Array) labels = new Uint32Array(labels);
        regions.push({ ...region, id, x: rx, y: ry, width: Math.min(right, x + region.x + region.width + 1) - rx, height: Math.min(bottom, y + region.y + region.height + 1) - ry, pixels: 0 });
      }
      labels[py * width + px] = id; regions[id - 1].pixels++;
    }
  }
  return { labels, regions, tiled: true };
}

function detectBlock(image, options) {
  const { width, height, data } = image, length = width * height;
  const threshold = Math.max(15, Math.min(100, Number(options.strength) || 55));
  const model = backgrounds(image), candidates = new Uint8Array(length), ink = new Uint8Array(length), protect = new Uint8Array(length), queue = new Uint32Array(length);
  const overall = dominant(model.cells.filter((cell) => cell.share >= 0.42).map((cell) => cell.color));
  for (let i = 0; i < length; i++) {
    if (data[i * 4 + 3] < 240) continue;
    const bg = model.cells[Math.floor(i / width / TILE) * model.cols + Math.floor(i % width / TILE)];
    if (bg.share < 0.42) continue;
    const delta = bg.color.map((value, c) => data[i * 4 + c] - value), contrast = Math.max(...delta.map(Math.abs));
    const foregroundBase = overall.share > 0.35 ? overall.color : bg.color;
    if (foregroundBase.some((v, c) => Math.abs(data[i * 4 + c] - v) > threshold + 12)) ink[i] = 1;
    const neutral = Math.max(...delta) - Math.min(...delta) <= 18;
    const direction = options.direction === "light" ? Math.max(...delta) > 0 : options.direction === "dark" ? Math.min(...delta) < 0 : true;
    if (contrast >= 5 && contrast <= threshold && neutral && direction) candidates[i] = 1;
  }
  // Protect compact, high-contrast foreground marks, not the image's large border surfaces.
  if (options.protectText !== false) components(ink, width, height, queue, (pixels, box) => {
    if (box.width > Math.max(128, width * 0.5) || box.height > 128 || pixels.length > 30000) return;
    for (const index of pixels) {
      const x = index % width, y = Math.floor(index / width);
      for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) if (x + dx >= 0 && x + dx < width && y + dy >= 0 && y + dy < height) protect[index + dy * width + dx] = 1;
    }
  });
  for (let i = 0; i < length; i++) if (protect[i]) candidates[i] = 0;
  // JPEG border fringes can join distant glyphs into one full-width component.
  for (let y = 0; y < height; y++) {
    let count = 0;
    for (let x = 0; x < width; x++) count += candidates[y * width + x];
    if (count > width * 0.4) candidates.fill(0, y * width, (y + 1) * width);
  }
  for (let x = 0; x < width; x++) {
    let count = 0;
    for (let y = 0; y < height; y++) count += candidates[y * width + x];
    if (count > height * 0.7) for (let y = 0; y < height; y++) candidates[y * width + x] = 0;
  }
  const parts = [];
  components(candidates, width, height, queue, (pixels, box) => {
    if (pixels.length < 2 || pixels.length > 5000 || box.width > 240 || box.height > 96 || box.width <= 2 && box.height > 16 || box.height < 8 && box.width > box.height * 16) return;
    parts.push({ ...box, pixels: pixels.slice(), parent: parts.length });
    if (parts.length > 6000) throw new Error("疑似区域过多，请降低识别强度，或改用手动框选。");
  });
  const find = (index) => {
    while (parts[index].parent !== index) { parts[index].parent = parts[parts[index].parent].parent; index = parts[index].parent; }
    return index;
  };
  const order = parts.map((_, i) => i).sort((a, b) => parts[a].x - parts[b].x);
  const bounds = parts.map((part) => ({ left: part.x, top: part.y, right: part.x + part.width, bottom: part.y + part.height }));
  for (let a = 0; a < order.length; a++) {
    const first = parts[order[a]];
    for (let b = a + 1; b < order.length; b++) {
      const second = parts[order[b]];
      if (second.x > first.x + first.width + 52) break;
      if (second.y > first.y + first.height + 16 || first.y > second.y + second.height + 16) continue;
      const aRoot = find(order[a]), bRoot = find(order[b]);
      const merged = { left: Math.min(bounds[aRoot].left, bounds[bRoot].left), top: Math.min(bounds[aRoot].top, bounds[bRoot].top), right: Math.max(bounds[aRoot].right, bounds[bRoot].right), bottom: Math.max(bounds[aRoot].bottom, bounds[bRoot].bottom) };
      if (merged.right - merged.left > 240 || merged.bottom - merged.top > 128) continue;
      parts[bRoot].parent = aRoot; bounds[aRoot] = merged;
    }
  }
  const groups = new Map();
  parts.forEach((part, index) => {
    const root = find(index), group = groups.get(root) || { x: width, y: height, right: 0, bottom: 0, parts: [], pixels: 0 };
    group.x = Math.min(group.x, part.x); group.y = Math.min(group.y, part.y); group.right = Math.max(group.right, part.x + part.width); group.bottom = Math.max(group.bottom, part.y + part.height);
    group.parts.push(part); group.pixels += part.pixels.length; groups.set(root, group);
  });
  const labels = new Uint16Array(length), regions = [];
  for (const group of [...groups.values()].sort((a, b) => a.y - b.y || a.x - b.x)) {
    if (group.pixels < 8 || group.right - group.x <= 2 || group.right - group.x > Math.max(320, width * 0.75) || group.bottom - group.y > 128) continue;
    const id = regions.length + 1;
    for (const part of group.parts) for (const index of part.pixels) labels[index] = id;
    const base = dominant(group.parts.flatMap((part) => Array.from(part.pixels, (i) => model.cells[Math.floor(i / width / TILE) * model.cols + Math.floor(i % width / TILE)].color)));
    const x = Math.max(0, group.x - 10), y = Math.max(0, group.y - 4), right = Math.min(width, group.right + 10), bottom = Math.min(height, group.bottom + 4);
    regions.push({ id, x, y, width: right - x, height: bottom - y, pixels: group.pixels, color: base.color });
    for (let py = y; py < bottom; py++) for (let px = x; px < right; px++) {
      const i = py * width + px;
      if (!protect[i] && data[i * 4 + 3] >= 240 && base.color.every((v, c) => Math.abs(data[i * 4 + c] - v) <= threshold)) labels[i] ||= id;
    }
  }
  // Include the faint one-pixel fringes around detected glyphs without touching protected text.
  const expanded = labels.slice();
  for (let i = 0; i < length; i++) if (labels[i]) {
    const x = i % width, y = Math.floor(i / width), bg = model.cells[Math.floor(y / TILE) * model.cols + Math.floor(x / TILE)];
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      if (x + dx < 0 || x + dx >= width || y + dy < 0 || y + dy >= height) continue;
      const next = i + dy * width + dx;
      if (!protect[next] && data[next * 4 + 3] >= 240 && bg.color.every((v, c) => Math.abs(data[next * 4 + c] - v) <= threshold + 4)) expanded[next] ||= labels[i];
    }
  }
  return { labels: expanded, regions, model };
}

export function repairWatermarks(image, analysis, selected = [], rectangles = []) {
  validate(image);
  if (analysis.labels.length !== image.width * image.height) throw new Error("选区与图片不匹配，请重新识别。");
  const { width, height, data } = image, length = width * height, output = new Uint8ClampedArray(data), mask = new Uint8Array(length), pending = new Uint8Array(length);
  const ids = new Set(selected);
  const colors = new Map(analysis.regions.map((region) => [region.id, region.color]));
  for (let i = 0; i < length; i++) if (ids.has(analysis.labels[i]) && analysis.labels[i]) {
    mask[i] = 1;
    const background = colors.get(analysis.labels[i]);
    for (let c = 0; c < 3; c++) output[i * 4 + c] = background[c];
  }
  const boxes = rectangles.map((box) => {
    if (![box.x, box.y, box.width, box.height].every(Number.isFinite) || box.width <= 0 || box.height <= 0) throw new Error("手动选区无效，请重新框选。");
    return { x: Math.max(0, Math.floor(box.x)), y: Math.max(0, Math.floor(box.y)), right: Math.min(width, Math.ceil(box.x + box.width)), bottom: Math.min(height, Math.ceil(box.y + box.height)) };
  });
  for (const box of boxes) for (let y = box.y; y < box.bottom; y++) for (let x = box.x; x < box.right; x++) mask[y * width + x] = pending[y * width + x] = 1;
  const count = mask.reduce((sum, value) => sum + value, 0);
  if (!count) throw new Error("请先勾选水印区域，或手动框选。");
  if (count > length * 0.65) throw new Error("选区覆盖过多，请缩小范围，保留足够的周围背景用于修复。");
  for (const box of boxes) {
    const samples = [];
    for (let y = Math.max(0, box.y - 4); y < Math.min(height, box.bottom + 4); y++) for (let x = Math.max(0, box.x - 4); x < Math.min(width, box.right + 4); x++) {
      const i = y * width + x;
      if (!mask[i] && data[i * 4 + 3] >= 240) samples.push([data[i * 4], data[i * 4 + 1], data[i * 4 + 2]]);
    }
    const bg = dominant(samples);
    if (bg.share < 0.55) continue;
    for (let y = box.y; y < box.bottom; y++) for (let x = box.x; x < box.right; x++) {
      const i = y * width + x; pending[i] = 0;
      for (let c = 0; c < 3; c++) output[i * 4 + c] = bg.color[c];
    }
  }
  if (!pending.some(Boolean)) return { width, height, data: output, pixels: count };
  const queue = new Uint32Array(length), queued = new Uint8Array(length), interpolated = pending.slice();
  let front = 0, back = 0;
  const neighbors = (i) => [i % width ? i - 1 : -1, i % width + 1 < width ? i + 1 : -1, i >= width ? i - width : -1, i + width < length ? i + width : -1].filter((v) => v >= 0);
  for (let i = 0; i < length; i++) if (pending[i] && neighbors(i).some((v) => !pending[v] && data[v * 4 + 3] >= 16)) { queue[back++] = i; queued[i] = 1; }
  while (front < back) {
    const i = queue[front++], known = neighbors(i).filter((v) => !pending[v] && data[v * 4 + 3] >= 16);
    if (!known.length) continue;
    for (let c = 0; c < 3; c++) output[i * 4 + c] = Math.round(known.reduce((sum, v) => sum + output[v * 4 + c], 0) / known.length);
    pending[i] = 0;
    for (const next of neighbors(i)) if (pending[next] && !queued[next]) { queued[next] = 1; queue[back++] = next; }
  }
  if (pending.some(Boolean)) throw new Error("选区周围没有可用背景，请缩小选区后重试。");
  for (let pass = 0; pass < 8; pass++) for (let i = 0; i < length; i++) if (interpolated[i]) {
    const near = neighbors(i);
    for (let c = 0; c < 3; c++) output[i * 4 + c] = Math.round(near.reduce((sum, v) => sum + output[v * 4 + c], 0) / near.length);
  }
  return { width, height, data: output, pixels: count };
}
