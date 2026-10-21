import { readDesign, convertDesign } from "./design/convert.mjs";

let parsed = null;
self.onmessage = async ({ data }) => {
  try {
    if (data.type === "read") {
      parsed = null;
      self.postMessage({ type: "progress", message: "正在解析页面、图层与图片资源…" });
      parsed = await readDesign(new Uint8Array(data.buffer), data.filename);
      const preview = parsed.thumbnail.slice();
      self.postMessage({ type: "ready", source: parsed.source, stats: parsed.stats, issues: parsed.issues, preview }, [preview.buffer]);
    } else if (data.type === "convert") {
      if (!parsed) throw new Error("请先选择设计文件。");
      self.postMessage({ type: "progress", message: "正在映射图层并生成目标设计文件…" });
      const result = await convertDesign(parsed, data.target);
      self.postMessage({ type: "done", ...result }, [result.bytes.buffer]);
    }
  } catch (error) {
    self.postMessage({ type: "error", message: error.message || "转换失败，请检查文件是否损坏或版本是否受支持。" });
  }
};
