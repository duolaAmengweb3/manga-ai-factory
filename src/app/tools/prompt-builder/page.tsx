"use client";

import { useState, useMemo, useCallback } from "react";
import { Eraser, Palette, Check, Wrench } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/copy-button";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Word bank data                                                      */
/* ------------------------------------------------------------------ */

interface Chip {
  zh: string;
  en: string;
}

interface Section {
  id: string;
  title: string;
  subtitle: string;
  chips: Chip[];
}

const sections: Section[] = [
  {
    id: "character",
    title: "① 主体描述",
    subtitle: "Character",
    chips: [
      { zh: "年轻男性（20多岁）", en: "young Chinese man, mid-20s" },
      { zh: "年轻女性（20多岁）", en: "young Chinese woman, early 20s" },
      { zh: "中年男性（40多岁）", en: "middle-aged Chinese man, 40s" },
      { zh: "老年男性（60多岁）", en: "elderly Chinese man, 60s" },
      { zh: "少女", en: "teenage Chinese girl" },
      { zh: "高瘦身材", en: "tall and slim build" },
      { zh: "健壮身材", en: "muscular build" },
      { zh: "娇小身材", en: "petite frame" },
      { zh: "穿现代西装", en: "wearing modern suit" },
      { zh: "穿古代长袍", en: "wearing ancient Chinese robes" },
      { zh: "穿校服", en: "wearing school uniform" },
      { zh: "穿休闲服", en: "wearing casual clothes" },
      { zh: "穿盔甲", en: "wearing armor" },
      { zh: "穿传统汉服", en: "wearing traditional hanfu" },
      { zh: "短黑发", en: "short black hair" },
      { zh: "长黑发飘逸", en: "long flowing black hair" },
      { zh: "马尾", en: "ponytail" },
      { zh: "轫子", en: "braids" },
      { zh: "剑眉", en: "sharp eyebrows" },
      { zh: "温柔目光", en: "gentle eyes" },
      { zh: "冷酷眼神", en: "cold stare" },
      { zh: "灸烂笑容", en: "bright smile" },
    ],
  },
  {
    id: "action",
    title: "② 动作/情绪",
    subtitle: "Action / Emotion",
    chips: [
      { zh: "双臂交叉，自信", en: "standing with arms crossed, confident" },
      { zh: "奔跑，绝望表情", en: "running, desperate expression" },
      { zh: "坐在桌前，低头", en: "sitting at desk, head bowed" },
      { zh: "战斗姿态，握拳", en: "fighting stance, fist clenched" },
      { zh: "仰望天空，泪流满面", en: "looking up at sky, tears streaming" },
      { zh: "猛然转身，震惊", en: "turning around, shocked wide eyes" },
      { zh: "背身离去", en: "walking away, back to camera" },
      { zh: "牵着手，温柔微笑", en: "holding someone's hand, gentle smile" },
      { zh: "靠墙，坏笑", en: "leaning against wall, smirking" },
      { zh: "跬在地上，失败", en: "kneeling on ground, defeated" },
      { zh: "指着对方，愤怒", en: "pointing finger, angry" },
      { zh: "读信，沉思", en: "reading a letter, contemplative" },
      { zh: "拔剑，凶猛", en: "drawing a sword, fierce" },
      { zh: "倒茶，优雅", en: "pouring tea, elegant" },
      { zh: "望向窗外，忧郁", en: "looking out window, melancholy" },
    ],
  },
  {
    id: "shot",
    title: "③ 镜头类型",
    subtitle: "Shot Type",
    chips: [
      { zh: "特写（面部细节）", en: "close-up shot, face detail" },
      { zh: "极致特写（仅眼睛）", en: "extreme close-up, eyes only" },
      { zh: "中景（上半身）", en: "medium shot, upper body" },
      { zh: "全景（全身+环境）", en: "wide shot, full body with environment" },
      { zh: "仰拍（从下往上）", en: "low angle shot, looking up" },
      { zh: "俯拍（从上往下）", en: "high angle shot, looking down" },
      { zh: "过肩镜头", en: "over-the-shoulder shot" },
      { zh: "斜角镜头（倾斜）", en: "Dutch angle, tilted frame" },
      { zh: "鸟瞰", en: "bird's eye view" },
      { zh: "侧面角度", en: "profile view, side angle" },
    ],
  },
  {
    id: "lighting",
    title: "④ 光线/氛围",
    subtitle: "Lighting",
    chips: [
      { zh: "侧光，半脸阴影", en: "dramatic side lighting, half face in shadow" },
      { zh: "温暖金色阳光", en: "warm golden hour sunlight" },
      { zh: "冷蓝月光", en: "cold blue moonlight" },
      { zh: "逆光剪影", en: "backlit, rim light silhouette" },
      { zh: "霓虹灯映照湿地", en: "neon lights reflecting on wet streets" },
      { zh: "柔和散射光", en: "soft diffused cloudy light" },
      { zh: "头顶荧光灯", en: "harsh overhead fluorescent" },
      { zh: "烛光暖影", en: "candlelight, warm flickering glow" },
      { zh: "晨雾缥缈", en: "morning fog, ethereal" },
      { zh: "日落橙紫", en: "sunset, orange and purple sky" },
      { zh: "雨天氛围", en: "rainy atmosphere, reflections" },
      { zh: "火光映照", en: "fire light, dramatic shadows" },
    ],
  },
  {
    id: "style",
    title: "⑤ 风格",
    subtitle: "Style",
    chips: [
      { zh: "动漫风格，赛璐珞着色", en: "anime style, cel shading, vibrant colors" },
      { zh: "漫画风格，高对比", en: "manga style, high contrast" },
      { zh: "水彩动漫，柔边", en: "watercolor anime, soft edges" },
      { zh: "暗黑幻想动漫", en: "dark fantasy anime, dramatic" },
      { zh: "柔美粉彩动漫", en: "pastel anime, dreamy soft tones" },
      { zh: "写实动漫混合", en: "realistic anime hybrid, cinematic" },
      { zh: "中国画风格+漫画", en: "Chinese painting style with manga aesthetics" },
      { zh: "8K 高质量", en: "8k quality" },
      { zh: "细节丰富背景", en: "detailed background" },
      { zh: "电影构图", en: "cinematic composition" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Style presets                                                       */
/* ------------------------------------------------------------------ */

interface StylePreset {
  name: string;
  description: string;
  chips: string[]; // English prompt values to auto-select
}

const stylePresets: StylePreset[] = [
  {
    name: "国风水墨",
    description: "中国画 + 金色阳光 + 细节背景",
    chips: [
      "Chinese painting style with manga aesthetics",
      "warm golden hour sunlight",
      "detailed background",
    ],
  },
  {
    name: "日系动漫",
    description: "动漫赛璐珞 + 柔和光 + 8K",
    chips: [
      "anime style, cel shading, vibrant colors",
      "soft diffused cloudy light",
      "8k quality",
    ],
  },
  {
    name: "赛博朋克",
    description: "暗黑幻想 + 霓虹灯 + 电影构图",
    chips: [
      "dark fantasy anime, dramatic",
      "neon lights reflecting on wet streets",
      "cinematic composition",
    ],
  },
  {
    name: "写实风格",
    description: "写实混合 + 侧光 + 细节背景 + 8K",
    chips: [
      "realistic anime hybrid, cinematic",
      "dramatic side lighting, half face in shadow",
      "detailed background",
      "8k quality",
    ],
  },
  {
    name: "柔美少女",
    description: "粉彩梦幻 + 柔和光 + 水彩柔边",
    chips: [
      "pastel anime, dreamy soft tones",
      "soft diffused cloudy light",
      "watercolor anime, soft edges",
    ],
  },
  {
    name: "古风宫廷",
    description: "中国画 + 烛光暖影 + 细节背景",
    chips: [
      "Chinese painting style with manga aesthetics",
      "candlelight, warm flickering glow",
      "detailed background",
    ],
  },
];

/* Helper: find which section a chip (by en value) belongs to */
function findChipSection(enValue: string): string | null {
  for (const section of sections) {
    if (section.chips.some((c) => c.en === enValue)) {
      return section.id;
    }
  }
  return null;
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function PromptBuilderPage() {
  const [selected, setSelected] = useState<Record<string, string[]>>(() => {
    const init: Record<string, string[]> = {};
    for (const s of sections) init[s.id] = [];
    return init;
  });

  const [custom, setCustom] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    for (const s of sections) init[s.id] = "";
    return init;
  });

  const [activePreset, setActivePreset] = useState<string | null>(null);

  const toggleChip = useCallback((sectionId: string, chip: string) => {
    setSelected((prev) => {
      const arr = prev[sectionId] ?? [];
      const next = arr.includes(chip)
        ? arr.filter((c) => c !== chip)
        : [...arr, chip];
      return { ...prev, [sectionId]: next };
    });
    setActivePreset(null);
  }, []);

  const setCustomText = useCallback((sectionId: string, value: string) => {
    setCustom((prev) => ({ ...prev, [sectionId]: value }));
  }, []);

  const applyPreset = useCallback((preset: StylePreset) => {
    setSelected((prev) => {
      const next = { ...prev };
      // Clear lighting and style sections
      next["lighting"] = [];
      next["style"] = [];
      // Add preset chips to their respective sections
      for (const en of preset.chips) {
        const sectionId = findChipSection(en);
        if (sectionId) {
          if (!next[sectionId].includes(en)) {
            next[sectionId] = [...next[sectionId], en];
          }
        }
      }
      return next;
    });
    setActivePreset(preset.name);
  }, []);

  const assembledPrompt = useMemo(() => {
    const parts: string[] = [];

    for (const section of sections) {
      const chips = selected[section.id] ?? [];
      const text = custom[section.id]?.trim() ?? "";
      if (chips.length > 0) parts.push(...chips);
      if (text) parts.push(text);
    }

    // Auto-append "8k quality" if not present
    const joined = parts.join(", ");
    if (joined && !joined.toLowerCase().includes("8k quality")) {
      parts.push("8k quality");
    }

    return parts.join(", ");
  }, [selected, custom]);

  const charCount = assembledPrompt.length;

  const handleClear = useCallback(() => {
    const emptySelected: Record<string, string[]> = {};
    const emptyCustom: Record<string, string> = {};
    for (const s of sections) {
      emptySelected[s.id] = [];
      emptyCustom[s.id] = "";
    }
    setSelected(emptySelected);
    setCustom(emptyCustom);
    setActivePreset(null);
  }, []);

  const totalSelected = useMemo(() => {
    let count = 0;
    for (const s of sections) {
      count += (selected[s.id] ?? []).length;
      if (custom[s.id]?.trim()) count += 1;
    }
    return count;
  }, [selected, custom]);

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-48">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-foreground tracking-tight sm:text-2xl flex items-center gap-2">
            <Wrench className="size-5 text-primary" /> Prompt {"组装器"}
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {"选词组合，生成可直接粘贴到即梦/Midjourney 的英文 prompt"}
          </p>
        </div>

        {/* Style Presets */}
        <Card>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Palette className="size-4 text-primary" />
              <h2 className="text-sm font-semibold text-foreground">
                {"风格预设"}
              </h2>
              <span className="text-xs text-muted-foreground">
                {"一键应用风格组合"}
              </span>
              {activePreset && (
                <Badge variant="secondary" className="text-xs ml-auto">
                  <Check className="size-3 mr-1" />
                  {"已应用: "}{activePreset}
                </Badge>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {stylePresets.map((preset) => {
                const isActive = activePreset === preset.name;
                return (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => applyPreset(preset)}
                    className={cn(
                      "rounded-lg border p-3 text-left transition-all duration-150 cursor-pointer select-none space-y-1",
                      isActive
                        ? "border-primary bg-primary/10 ring-1 ring-primary/30"
                        : "border-border bg-secondary/50 hover:border-primary/40 hover:bg-secondary"
                    )}
                  >
                    <div className={cn(
                      "text-sm font-medium",
                      isActive ? "text-primary" : "text-foreground"
                    )}>
                      {preset.name}
                    </div>
                    <div className="text-[10px] text-muted-foreground leading-tight">
                      {preset.description}
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Sections */}
        {sections.map((section) => (
          <Card key={section.id}>
            <CardContent className="space-y-3">
              <div className="flex items-baseline gap-2">
                <h2 className="text-sm font-semibold text-foreground">
                  {section.title}
                </h2>
                <span className="text-xs text-muted-foreground">
                  {section.subtitle}
                </span>
              </div>

              {/* Chip grid */}
              <div className="flex flex-wrap gap-2">
                {section.chips.map((chip) => {
                  const isSelected = (selected[section.id] ?? []).includes(
                    chip.en
                  );
                  return (
                    <button
                      key={chip.en}
                      type="button"
                      onClick={() => toggleChip(section.id, chip.en)}
                      className={cn(
                        "rounded-lg border px-2.5 py-2 text-left transition-all duration-150 cursor-pointer select-none",
                        isSelected
                          ? "border-primary bg-primary/15 ring-1 ring-primary/30"
                          : "border-border bg-secondary/50 hover:border-primary/40 hover:bg-secondary"
                      )}
                    >
                      <div className={cn(
                        "text-xs font-medium leading-tight",
                        isSelected ? "text-primary" : "text-foreground"
                      )}>
                        {chip.zh}
                      </div>
                      <div className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                        {chip.en}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Custom input */}
              <Input
                placeholder={"自定义补充（英文）..."}
                value={custom[section.id] ?? ""}
                onChange={(e) =>
                  setCustomText(section.id, e.target.value)
                }
                className="text-xs"
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sticky preview panel */}
      <div className="fixed bottom-0 left-0 right-0 md:left-60 z-10 border-t border-border bg-background/95 backdrop-blur-sm">
        <div className="w-full max-w-6xl mx-auto px-6 py-4 lg:px-10 space-y-3">
          {/* Stats row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="text-xs">
                {"已选"} {totalSelected} {"词"}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {charCount} {"字符"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                disabled={totalSelected === 0}
                className="text-xs gap-1"
              >
                <Eraser className="size-3" />
                {"清空"}
              </Button>
              <CopyButton
                text={assembledPrompt}
                variant="full"
                className={cn(
                  "text-xs",
                  assembledPrompt
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 border-primary"
                    : ""
                )}
              />
            </div>
          </div>

          {/* Prompt preview */}
          <div className="rounded-lg border border-border bg-muted/50 p-3 font-mono text-xs text-foreground leading-relaxed min-h-[3rem] max-h-[6rem] overflow-y-auto">
            {assembledPrompt || (
              <span className="text-muted-foreground italic">
                {"点击上方词片开始组装 prompt..."}
              </span>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
