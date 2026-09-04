// Work on a copy of the composited frame, never on the GIF disposal canvas.
export function cleanEdges(image, mode, trim = 1.5) {
  if (mode === "none") return false;
  if (mode === "white") return trimAndSmooth(image, trim);
  const { width, height, data } = image;
  const count = width * height;
  const distance = new Uint8Array(count);
  let transparent = 0;
  for (let i = 0; i < count; i++) {
    const empty = data[i * 4 + 3] <= 8;
    distance[i] = empty ? 0 : 3;
    if (empty) transparent++;
  }
  if (!transparent || transparent === count) return false;
  // Distance to actual transparency; canvas borders alone are not treated as cutouts.
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    const i = y * width + x;
    distance[i] = Math.min(distance[i], x ? distance[i - 1] + 1 : 3, y ? distance[i - width] + 1 : 3);
  }
  for (let y = height - 1; y >= 0; y--) for (let x = width - 1; x >= 0; x--) {
    const i = y * width + x;
    distance[i] = Math.min(distance[i], x + 1 < width ? distance[i + 1] + 1 : 3, y + 1 < height ? distance[i + width] + 1 : 3);
  }
  const corrected = new Uint8ClampedArray(data);
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    const i = y * width + x;
    if (distance[i] >= 3) continue;
    let alpha = 0, weightSum = 0, red = 0, green = 0, blue = 0;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
      const n = (ny * width + nx) * 4;
      const weight = (dx ? 1 : 2) * (dy ? 1 : 2);
      const weightedAlpha = corrected[n + 3] * weight;
      alpha += weightedAlpha;
      weightSum += weight;
      red += corrected[n] * weightedAlpha;
      green += corrected[n + 1] * weightedAlpha;
      blue += corrected[n + 2] * weightedAlpha;
    }
    const p = i * 4;
    data[p + 3] = Math.round(corrected[p + 3] * 0.65 + alpha / weightSum * 0.35);
    // Extend foreground color into newly softened transparency without a black/white halo.
    if (!corrected[p + 3] && alpha) {
      data[p] = red / alpha; data[p + 1] = green / alpha; data[p + 2] = blue / alpha;
    }
    if (!data[p + 3]) data[p] = data[p + 1] = data[p + 2] = 0;
  }
  return true;
}

function trimAndSmooth({ width, height, data }, trim) {
  const count = width * height;
  let alpha = new Float32Array(count);
  let hasTransparent = false, hasContent = false;
  for (let i = 0; i < count; i++) {
    alpha[i] = data[i * 4 + 3];
    hasTransparent ||= alpha[i] <= 8;
    hasContent ||= alpha[i] > 8;
  }
  if (!hasTransparent || !hasContent) return false;
  const amount = Math.max(1, Math.min(2, Number(trim) || 1.5));
  // Choke at the final output resolution. This removes actual fringe pixels,
  // including neutral flecks which a white-matte color fit cannot recognize.
  for (let pass = 0; pass < Math.ceil(amount); pass++) {
    const next = new Float32Array(count);
    const strength = Math.min(1, amount - pass);
    for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
      let minimum = 255;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        const nx = Math.max(0, Math.min(width - 1, x + dx));
        const ny = Math.max(0, Math.min(height - 1, y + dy));
        minimum = Math.min(minimum, alpha[ny * width + nx]);
      }
      const i = y * width + x;
      next[i] = alpha[i] + (minimum - alpha[i]) * strength;
    }
    alpha = next;
  }
  const original = data.slice();
  const trimmed = alpha.slice();
  // Retain narrow colored strokes with no substantial interior nearby (for
  // example a baseline or cord), rather than erasing them with the fringe.
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    const i = y * width + x, p = i * 4;
    if (!original[p + 3] || alpha[i] === original[p + 3]) continue;
    const maximum = Math.max(original[p], original[p + 1], original[p + 2]);
    const minimum = Math.min(original[p], original[p + 1], original[p + 2]);
    if (maximum - minimum < 40 && maximum >= 100) continue;
    let supported = false;
    for (let dy = -3; dy <= 3 && !supported; dy++) for (let dx = -3; dx <= 3; dx++) {
      const nx = x + dx, ny = y + dy;
      if (nx >= 0 && ny >= 0 && nx < width && ny < height && trimmed[ny * width + nx] >= 250) { supported = true; break; }
    }
    if (!supported) alpha[i] = original[p + 3];
  }
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    let coverage = 0, red = 0, green = 0, blue = 0;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const nx = Math.max(0, Math.min(width - 1, x + dx));
      const ny = Math.max(0, Math.min(height - 1, y + dy));
      const n = ny * width + nx;
      const weight = (dx ? 1 : 2) * (dy ? 1 : 2);
      const contribution = alpha[n] * weight;
      coverage += contribution;
      red += original[n * 4] * contribution;
      green += original[n * 4 + 1] * contribution;
      blue += original[n * 4 + 2] * contribution;
    }
    const p = (y * width + x) * 4;
    const opacity = Math.round(coverage / 16);
    data[p + 3] = opacity;
    if (!opacity) {
      data[p] = data[p + 1] = data[p + 2] = 0;
    } else if (opacity < 255) {
      // Filter premultiplied color with the cleaned mask, never blend the old
      // white RGB back into the new antialiased contour. Interior RGB stays exact.
      data[p] = red / coverage;
      data[p + 1] = green / coverage;
      data[p + 2] = blue / coverage;
    }
  }
  return true;
}
