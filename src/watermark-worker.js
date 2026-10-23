import { detectWatermarks, repairWatermarks } from "./watermark-core.mjs";

let image, analysis;
self.onmessage = ({ data }) => {
  try {
    if (data.type === "analyze") {
      analysis = null;
      image = { width: data.width, height: data.height, data: new Uint8ClampedArray(data.buffer) };
      analysis = detectWatermarks(image, data.options);
      self.postMessage({ type: "ready", regions: analysis.regions });
    } else if (data.type === "repair") {
      if (!image || !analysis) throw new Error("请先识别图片中的水印区域。");
      const result = repairWatermarks(image, analysis, data.selected, data.rectangles);
      self.postMessage({ type: "done", ...result }, [result.data.buffer]);
    }
  } catch (error) { self.postMessage({ type: "error", message: error.message || "处理失败，请更换图片后重试。" }); }
};
