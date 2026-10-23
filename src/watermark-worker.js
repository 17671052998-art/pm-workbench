import { detectWatermarks, repairWatermarks } from "./watermark-core.mjs";

let image, analysis;
self.onmessage = ({ data }) => {
  try {
    if (data.type === "batch") {
      const source = { width: data.width, height: data.height, data: new Uint8ClampedArray(data.buffer) };
      const detected = detectWatermarks(source, data.options);
      const result = detected.regions.length ? repairWatermarks(source, detected, detected.regions.map((region) => region.id)) : source;
      self.postMessage({ type: "batch-done", ...result, regions: detected.regions.length }, [result.data.buffer]);
    } else if (data.type === "analyze") {
      analysis = null;
      image = { width: data.width, height: data.height, data: new Uint8ClampedArray(data.buffer) };
      analysis = detectWatermarks(image, data.options);
      self.postMessage({ type: "ready", regions: analysis.regions });
    } else if (data.type === "repair") {
      if (!image || !analysis) throw new Error("请先识别图片中的水印区域。");
      const result = repairWatermarks(image, analysis, data.selected, data.rectangles);
      self.postMessage({ type: "done", ...result }, [result.data.buffer]);
    }
  } catch (error) { self.postMessage({ type: "error", message: error instanceof RangeError ? "浏览器可用内存不足，无法为这张大图分配处理空间。请关闭其他页面或更换设备后重试。" : error.message || "处理失败，请更换图片后重试。" }); }
};
