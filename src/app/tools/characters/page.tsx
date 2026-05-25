"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Plus, Copy, Trash2, User, Users } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/copy-button";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

interface Character {
  id: string;
  name: string;
  gender: string;
  age: number | "";
  role: string;
  appearance: string;
  clothing: string;
  accessory: string;
}

const STORAGE_KEY = "manga-characters";

const emptyCharacter = (): Character => ({
  id: crypto.randomUUID(),
  name: "",
  gender: "男",
  age: "",
  role: "主角",
  appearance: "",
  clothing: "",
  accessory: "",
});

/* ------------------------------------------------------------------ */
/* Chinese to English mapping                                          */
/* ------------------------------------------------------------------ */

const zhEnMap: Record<string, string> = {
  "男": "man",
  "女": "woman",
  "其他": "person",
  "高瘦": "tall and slim",
  "高": "tall",
  "瘦": "slim",
  "矮": "short",
  "胖": "heavy-set",
  "剑眉": "sharp eyebrows",
  "星目": "bright star-like eyes",
  "凤眼": "phoenix eyes",
  "丹凤眼": "almond eyes",
  "圆脸": "round face",
  "瓜子脸": "oval face",
  "短发": "short hair",
  "长发": "long hair",
  "微卷": "slightly curly",
  "卷发": "curly hair",
  "直发": "straight hair",
  "黑色": "black",
  "棕色": "brown",
  "白色": "white",
  "红色": "red",
  "金色": "golden",
  "银色": "silver",
  "灰色": "gray",
  "蓝色": "blue",
  "西装": "suit",
  "古装": "ancient Chinese robes",
  "校服": "school uniform",
  "盔甲": "armor",
  "汉服": "traditional hanfu",
  "连衣裙": "dress",
  "T恤": "T-shirt",
  "卫衣": "hoodie",
  "风衣": "trench coat",
  "皮衣": "leather jacket",
  "长裙": "long skirt",
  "短裙": "short skirt",
  "衬衫": "shirt",
  "修身": "fitted",
  "宽松": "loose",
  "深灰色": "dark gray",
  "深蓝色": "dark blue",
  "深色": "dark-colored",
  "浅色": "light-colored",
  "健壮": "muscular",
  "娇小": "petite",
  "苗条": "slender",
  "马尾": "ponytail",
  "双马尾": "twin tails",
  "麻花辫": "braids",
  "双辫": "twin braids",
  "丸子头": "bun hairstyle",
  "披肩发": "shoulder-length hair",
  "手表": "watch",
  "项链": "necklace",
  "耳环": "earrings",
  "眼镜": "glasses",
  "伤疤": "scar",
  "纹身": "tattoo",
  "戒指": "ring",
  "手链": "bracelet",
  "发簪": "hair pin",
  "头带": "headband",
  "帽子": "hat",
};

function translateZhToEn(text: string): string {
  if (!text.trim()) return "";
  let result = text;
  // Sort keys by length desc so longer matches take priority
  const sortedKeys = Object.keys(zhEnMap).sort(
    (a, b) => b.length - a.length
  );
  for (const zh of sortedKeys) {
    result = result.replaceAll(zh, zhEnMap[zh]);
  }
  // Clean up Chinese punctuation
  result = result
    .replace(/[，、]/g, ", ")
    .replace(/[。]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return result;
}

function getAgeDesc(age: number | ""): string {
  if (age === "" || isNaN(Number(age))) return "";
  const n = Number(age);
  if (n < 18) return "teenage";
  if (n <= 25) return "young, early 20s";
  if (n <= 35) return "mid-20s to 30s";
  if (n <= 50) return "middle-aged";
  return "elderly";
}

function GenderIcon() {
  return <User className="size-4 text-muted-foreground" />;
}

function generatePrompt(char: Character): string {
  const parts: string[] = [];

  // Base: "a [gender] Chinese [age_desc]"
  const genderEn = zhEnMap[char.gender] || "person";
  const ageDesc = getAgeDesc(char.age);
  if (ageDesc) {
    parts.push(`a ${ageDesc} Chinese ${genderEn}`);
  } else {
    parts.push(`a Chinese ${genderEn}`);
  }

  // Appearance
  const appearance = translateZhToEn(char.appearance);
  if (appearance) parts.push(appearance);

  // Clothing
  const clothing = translateZhToEn(char.clothing);
  if (clothing) parts.push(`wearing ${clothing}`);

  // Accessory
  const accessory = translateZhToEn(char.accessory);
  if (accessory) parts.push(accessory);

  return parts.join(", ");
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function CharactersPage() {
  const [characters, setCharacters] = useState<Character[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Character[]) : [];
    } catch { return []; }
  });
  const [activeId, setActiveId] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? (JSON.parse(raw) as Character[]) : [];
      return parsed.length > 0 ? parsed[0].id : null;
    } catch { return null; }
  });
  const [loaded] = useState(true);
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced save to localStorage
  useEffect(() => {
    if (!loaded) return;
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(characters));
    }, 300);
    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    };
  }, [characters, loaded]);

  const activeChar = useMemo(
    () => characters.find((c) => c.id === activeId) ?? null,
    [characters, activeId]
  );

  const addCharacter = useCallback(() => {
    const newChar = emptyCharacter();
    setCharacters((prev) => [newChar, ...prev]);
    setActiveId(newChar.id);
  }, []);

  const updateField = useCallback(
    (field: keyof Character, value: string | number) => {
      setCharacters((prev) =>
        prev.map((c) =>
          c.id === activeId ? { ...c, [field]: value } : c
        )
      );
    },
    [activeId]
  );

  const deleteCharacter = useCallback(
    (id: string) => {
      setCharacters((prev) => {
        const next = prev.filter((c) => c.id !== id);
        if (activeId === id) {
          setActiveId(next.length > 0 ? next[0].id : null);
        }
        return next;
      });
    },
    [activeId]
  );

  const duplicateCharacter = useCallback(
    (id: string) => {
      const original = characters.find((c) => c.id === id);
      if (!original) return;
      const dup: Character = {
        ...original,
        id: crypto.randomUUID(),
        name: original.name ? `${original.name} (副本)` : "",
      };
      setCharacters((prev) => {
        const idx = prev.findIndex((c) => c.id === id);
        const next = [...prev];
        next.splice(idx + 1, 0, dup);
        return next;
      });
      setActiveId(dup.id);
    },
    [characters]
  );

  const prompt = activeChar ? generatePrompt(activeChar) : "";

  if (!loaded) return null;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-foreground tracking-tight sm:text-2xl flex items-center gap-2">
            <Users className="size-5 text-primary" /> {"角色管理器"}
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {"创建角色档案，自动生成角色 prompt 模板，生成分镜时自动带入"}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Left panel - character list */}
          <div className="w-full md:w-60 shrink-0 space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-1.5 text-xs"
              onClick={addCharacter}
            >
              <Plus className="size-3.5" />
              {"新角色"}
            </Button>

            <div className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-x-visible pb-1 md:pb-0">
              {characters.map((char) => (
                <button
                  key={char.id}
                  type="button"
                  onClick={() => setActiveId(char.id)}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-left transition-colors shrink-0 w-full cursor-pointer",
                    char.id === activeId
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <GenderIcon />
                  <span className="truncate flex-1">
                    {char.name || "未命名"}
                  </span>
                  <Badge variant="secondary" className="text-[10px] h-4 px-1 shrink-0">
                    {char.role}
                  </Badge>
                </button>
              ))}
            </div>

            {characters.length === 0 && (
              <p className="text-xs text-muted-foreground text-center py-6 px-2">
                {"还没有角色，点击上方「+ 新角色」创建第一个"}
              </p>
            )}
          </div>

          {/* Right panel - character detail */}
          {activeChar ? (
            <div className="flex-1 space-y-4">
              <Card>
                <CardContent className="space-y-4">
                  {/* Actions row */}
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      className="text-muted-foreground hover:text-foreground"
                      onClick={() => duplicateCharacter(activeChar.id)}
                      title="复制角色"
                    >
                      <Copy className="size-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => deleteCharacter(activeChar.id)}
                      title="删除角色"
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>

                  {/* Form fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="姓名">
                      <Input
                        value={activeChar.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        placeholder="角色名"
                        className="text-sm"
                      />
                    </FormField>
                    <FormField label="性别">
                      <select
                        value={activeChar.gender}
                        onChange={(e) => updateField("gender", e.target.value)}
                        className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 bg-background"
                      >
                        <option value="男">{"男"}</option>
                        <option value="女">{"女"}</option>
                        <option value="其他">{"其他"}</option>
                      </select>
                    </FormField>
                    <FormField label="年龄">
                      <Input
                        type="number"
                        value={activeChar.age}
                        onChange={(e) =>
                          updateField(
                            "age",
                            e.target.value === "" ? "" : Number(e.target.value)
                          )
                        }
                        placeholder="例: 25"
                        min={1}
                        max={120}
                        className="text-sm"
                      />
                    </FormField>
                    <FormField label="角色">
                      <select
                        value={activeChar.role}
                        onChange={(e) => updateField("role", e.target.value)}
                        className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 bg-background"
                      >
                        <option value="主角">{"主角"}</option>
                        <option value="配角">{"配角"}</option>
                        <option value="反派">{"反派"}</option>
                        <option value="路人">{"路人"}</option>
                      </select>
                    </FormField>
                  </div>

                  <FormField label="外貌特征">
                    <textarea
                      value={activeChar.appearance}
                      onChange={(e) => updateField("appearance", e.target.value)}
                      placeholder="例: 身材高瘦，剑眉星目，黑色短发微卷"
                      rows={2}
                      className="w-full rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-sm outline-none resize-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 bg-background"
                    />
                  </FormField>

                  <FormField label="服装">
                    <textarea
                      value={activeChar.clothing}
                      onChange={(e) => updateField("clothing", e.target.value)}
                      placeholder="例: 深灰色修身西装"
                      rows={2}
                      className="w-full rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-sm outline-none resize-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 bg-background"
                    />
                  </FormField>

                  <FormField label="标志物">
                    <Input
                      value={activeChar.accessory}
                      onChange={(e) => updateField("accessory", e.target.value)}
                      placeholder="例: 左手腕银色手表"
                      className="text-sm"
                    />
                  </FormField>
                </CardContent>
              </Card>

              {/* Generated prompt */}
              <Card>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="size-4 text-primary" />
                      <h2 className="text-sm font-semibold text-foreground">
                        {"自动生成 Prompt"}
                      </h2>
                    </div>
                    <CopyButton text={prompt} variant="full" />
                  </div>
                  <div className="rounded-lg border border-border bg-muted/50 p-3 font-mono text-xs text-foreground leading-relaxed min-h-[3rem]">
                    {prompt || (
                      <span className="text-muted-foreground italic">
                        {"填写角色信息后自动生成..."}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    {"中文自动翻译为英文。无法识别的词会保留原文，可手动补充英文。"}
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center py-20">
              <div className="text-center space-y-3">
                <div className="flex justify-center">
                  <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                    <User className="size-5 text-muted-foreground" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {"还没有角色，点击左侧「+ 新角色」创建第一个"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

/* ------------------------------------------------------------------ */
/* Sub-components                                                      */
/* ------------------------------------------------------------------ */

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}
