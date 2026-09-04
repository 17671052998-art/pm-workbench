// Work on a copy of the composited frame, never on the GIF disposal canvas.
export function cleanEdges(image, mode) {
  if (mode === "none") return false;
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
  if (mode === "white") {
    const original = new Uint8ClampedArray(data);
    for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
      const i = y * width + x;
      const p = i * 4;
      if (!distance[i] || distance[i] > 2 || !original[p + 3]) continue;
      let reference = -1;
      let bestDistance = Infinity;
      for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
        const n = ny * width + nx;
        const squared = dx * dx + dy * dy;
        if (distance[n] >= 3 && original[n * 4 + 3] === 255 && squared < bestDistance) {
          reference = n * 4;
          bestDistance = squared;
        }
      }
      if (reference < 0) continue;
      // Estimate coverage from C = alpha * foreground + (1 - alpha) * white.
      // Reject edges inconsistent with this model instead of deleting every pale pixel.
      let numerator = 0, denominator = 0;
      for (let c = 0; c < 3; c++) {
        const component = 255 - original[reference + c];
        numerator += (255 - original[p + c]) * component;
        denominator += component * component;
      }
      if (denominator < 3600) continue;
      const coverage = Math.max(0, Math.min(1, numerator / denominator));
      if (coverage > 0.97) continue;
      let error = 0;
      for (let c = 0; c < 3; c++) error = Math.max(error, Math.abs(original[p + c] - (coverage * original[reference + c] + (1 - coverage) * 255)));
      if (error > 24) continue;
      for (let c = 0; c < 3; c++) data[p + c] = original[reference + c];
      data[p + 3] = Math.round(original[p + 3] * coverage);
    }
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
