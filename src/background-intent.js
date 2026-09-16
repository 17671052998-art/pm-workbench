const colors = [
  { pattern: /白(?:色|底)?|white/i, label: "白色", key: "white", rgb: [255, 255, 255] },
  { pattern: /黑(?:色|底)?|black/i, label: "黑色", key: "black", rgb: [0, 0, 0] },
  { pattern: /粉红|粉(?:色)?|pink/i, label: "粉色", key: "pink", rgb: [240, 135, 175] },
  { pattern: /红(?:色)?|red/i, label: "红色", key: "red", rgb: [220, 35, 55] },
  { pattern: /绿(?:色)?|green/i, label: "绿色", key: "green", rgb: [30, 165, 75] },
  { pattern: /蓝(?:色)?|blue/i, label: "蓝色", key: "blue", rgb: [35, 105, 220] },
  { pattern: /黄(?:色)?|yellow/i, label: "黄色", key: "yellow", rgb: [245, 215, 35] },
  { pattern: /灰(?:色)?|gray|grey/i, label: "灰色", key: "gray", rgb: [135, 135, 135] },
  { pattern: /紫(?:色)?|purple/i, label: "紫色", key: "purple", rgb: [145, 70, 180] },
  { pattern: /橙(?:色)?|orange/i, label: "橙色", key: "orange", rgb: [245, 145, 40] },
];

const regions = [
  { pattern: /左上(?:角|方)?/, name: "top-left", label: "左上角" },
  { pattern: /右上(?:角|方)?/, name: "top-right", label: "右上角" },
  { pattern: /左下(?:角|方)?/, name: "bottom-left", label: "左下角" },
  { pattern: /右下(?:角|方)?/, name: "bottom-right", label: "右下角" },
  { pattern: /四周|周围|边缘/, name: "border", label: "四周" },
  { pattern: /左侧|左边|左方|左半边/, name: "left", label: "左侧" },
  { pattern: /右侧|右边|右方|右半边/, name: "right", label: "右侧" },
  { pattern: /上方|上边|上部|顶部|上面/, name: "top", label: "上方" },
  { pattern: /下方|下边|下部|底部|下面/, name: "bottom", label: "下方" },
  { pattern: /中间|中央|中心/, name: "center", label: "中央" },
];

function readColor(text) {
  const hex = text.match(/#([\da-f]{6})\b/i);
  if (hex) {
    const value = hex[1];
    return { label: `#${value.toUpperCase()}`, key: "hex", rgb: [0, 2, 4].map((offset) => parseInt(value.slice(offset, offset + 2), 16)) };
  }
  return colors.find((item) => item.pattern.test(text)) || null;
}

function readRegion(text) {
  return regions.find((item) => item.pattern.test(text)) || null;
}

export function parseBackgroundIntent(input) {
  const clauses = String(input || "").trim().split(/[，,；;。]|然后|接着|并且|同时|再(?=去|把|将|擦|恢)/).map((part) => part.trim()).filter(Boolean);
  if (!clauses.length) return { steps: [], error: "请描述想移除的颜色或位置。" };
  if (clauses.length > 5) return { steps: [], error: "每次最多识别 5 个步骤，请拆分指令后重试。" };
  const steps = [];
  let warning = "";
  for (const clause of clauses) {
    const protect = /保留|留下|不要(?:去|删|移|扣|擦)|别(?:去|删|移|扣|擦)|不能(?:去|删|移|扣|擦)/.test(clause);
    const edit = /去掉|删除|移除|抠除|扣掉|擦除|擦掉|清除|恢复|还原|找回|补回/.test(clause);
    if (protect && !edit || /不要(?:去|删|移|扣|擦)|别(?:去|删|移|扣|擦)|不能(?:去|删|移|扣|擦)/.test(clause)) {
      warning = "保留指定物体需要语义识别；本工具只会按下方步骤处理，请检查预览并用恢复画笔修正。";
      continue;
    }
    if (protect) warning = "保留指定物体需要语义识别；本工具只会按下方步骤处理，请检查预览并用恢复画笔修正。";
    const color = readColor(clause);
    const region = readRegion(clause);
    const background = /背景|底色|底图|去背/.test(clause);
    if (/人|头发|猫|狗|动物|汽车|车子|衣服|文字|字母|商标|标志|物体/.test(clause) && (!background || /后面|后方|周围|旁边|内部|身上/.test(clause))) {
      return { steps: [], error: `“${clause}”需要识别具体物体。当前本地模式无法可靠定位，请用套索选区，或改用颜色与位置描述。` };
    }
    if (!color && !region && !background) return { steps: [], error: `无法定位“${clause}”。请改写为颜色或位置，例如“去掉左上角的白色背景”，或使用套索手动选区。` };
    const action = /恢复|还原|找回|补回/.test(clause) ? "restore" : "remove";
    const percent = clause.match(/(\d{1,3})\s*%/);
    if (percent && (!region || Number(percent[1]) < 1 || Number(percent[1]) > 100)) return { steps: [], error: `“${clause}”的百分比需要搭配位置，且在 1%-100% 之间。` };
    const fraction = region ? (percent ? Number(percent[1]) / 100 : region.name === "border" ? .15 : region.name.includes("-") || region.name === "center" ? .3 : .25) : null;
    const target = color ? "color" : background ? "background" : "region";
    if (action === "restore" && target === "background" && !region) return { steps: [], error: "恢复背景需要指定颜色或位置，例如“恢复左侧 20%”。" };
    const all = /所有|全部|整张|全图/.test(clause);
    const borderOnly = background && !all;
    const area = region ? `${region.label}${Math.round(fraction * 100)}%` : "";
    const object = color ? `${color.label}区域` : target === "background" ? "边缘连通背景" : "区域";
    const scope = area ? `${area}的${object}` : target === "color" && !borderOnly ? `全图${object}` : object;
    steps.push({ action, target, color: color?.rgb || null, colorKey: color?.key || null, region: region?.name || null, fraction, borderOnly, label: `${action === "restore" ? "恢复" : "移除"}${scope}` });
  }
  if (!steps.length) return { steps: [], error: "当前无法仅凭物体名称确定选区。请描述颜色和位置，或使用套索手动选区。" };
  return { steps, warning };
}
