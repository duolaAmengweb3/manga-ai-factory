"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Loader2, RotateCcw, Download, Sparkles, Check, LayoutGrid } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/copy-button";
import { ContactModal } from "@/components/contact-modal";
import { getTokenBalance } from "@/lib/token-store";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

interface Shot {
  shotNumber: number;
  shotType: string;
  scene: string;
  characters: string;
  action: string;
  emotion: string;
  dialogue: string;
}

interface PromptResult {
  shotNumber: number;
  prompt: string;
}

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

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

/** Parse SSE stream and extract text content */
async function readSSEStream(
  response: Response,
  onChunk: (text: string) => void
): Promise<string> {
  const reader = response.body?.getReader();
  if (!reader) throw new Error("No response body");

  const decoder = new TextDecoder();
  let accumulated = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    const lines = chunk.split("\n");

    for (const line of lines) {
      if (line.startsWith("data: ")) {
        const data = line.slice(6).trim();
        if (data === "[DONE]") continue;
        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) {
            accumulated += content;
            onChunk(accumulated);
          }
        } catch {
          // Skip unparseable chunks
        }
      }
    }
  }

  return accumulated;
}

/** Extract JSON array from text that may contain markdown fences */
function extractJsonArray(text: string): PromptResult[] {
  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) return parsed;
  } catch {
    // continue
  }

  const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch) {
    try {
      const parsed = JSON.parse(fenceMatch[1].trim());
      if (Array.isArray(parsed)) return parsed;
    } catch {
      // continue
    }
  }

  const bracketStart = text.indexOf("[");
  const bracketEnd = text.lastIndexOf("]");
  if (bracketStart !== -1 && bracketEnd > bracketStart) {
    try {
      const parsed = JSON.parse(text.slice(bracketStart, bracketEnd + 1));
      if (Array.isArray(parsed)) return parsed;
    } catch {
      // continue
    }
  }

  throw new Error("无法解析 AI 返回的 JSON 数据");
}

/** Simple prompt generator from character data (mirrors characters page logic) */
function generateCharacterPrompt(char: Character): string {
  const zhEnMap: Record<string, string> = {
    "男": "man", "女": "woman", "其他": "person",
    "高瘦": "tall and slim", "高": "tall", "瘦": "slim", "矮": "short",
    "胖": "heavy-set", "剑眉": "sharp eyebrows", "星目": "bright star-like eyes",
    "凤眼": "phoenix eyes", "圆脸": "round face", "瓜子脸": "oval face",
    "短发": "short hair", "长发": "long hair", "微卷": "slightly curly",
    "卷发": "curly hair", "直发": "straight hair", "黑色": "black",
    "棕色": "brown", "白色": "white", "红色": "red", "金色": "golden",
    "银色": "silver", "灰色": "gray", "蓝色": "blue", "西装": "suit",
    "古装": "ancient Chinese robes", "校服": "school uniform", "盔甲": "armor",
    "汉服": "traditional hanfu", "连衣裙": "dress", "T恤": "T-shirt",
    "卫衣": "hoodie", "风衣": "trench coat", "皮衣": "leather jacket",
    "长裙": "long skirt", "短裙": "short skirt", "衬衫": "shirt",
    "修身": "fitted", "宽松": "loose", "深灰色": "dark gray",
    "深蓝色": "dark blue", "深色": "dark-colored", "浅色": "light-colored",
    "健壮": "muscular", "娇小": "petite", "苗条": "slender",
    "马尾": "ponytail", "双马尾": "twin tails", "麻花辫": "braids",
    "丸子头": "bun hairstyle", "披肩发": "shoulder-length hair",
    "手表": "watch", "项链": "necklace", "耳环": "earrings",
    "眼镜": "glasses", "伤疤": "scar", "纹身": "tattoo",
    "戒指": "ring", "手链": "bracelet", "发簪": "hair pin",
    "头带": "headband", "帽子": "hat",
  };

  function translateZhToEn(text: string): string {
    if (!text.trim()) return "";
    let result = text;
    const sortedKeys = Object.keys(zhEnMap).sort((a, b) => b.length - a.length);
    for (const zh of sortedKeys) {
      result = result.replaceAll(zh, zhEnMap[zh]);
    }
    result = result.replace(/[，、]/g, ", ").replace(/[。]/g, "").replace(/\s+/g, " ").trim();
    return result;
  }

  const parts: string[] = [];
  const genderEn = zhEnMap[char.gender] || "person";
  const n = typeof char.age === "number" ? char.age : NaN;
  let ageDesc = "";
  if (!isNaN(n)) {
    if (n < 18) ageDesc = "teenage";
    else if (n <= 25) ageDesc = "young, early 20s";
    else if (n <= 35) ageDesc = "mid-20s to 30s";
    else if (n <= 50) ageDesc = "middle-aged";
    else ageDesc = "elderly";
  }
  parts.push(ageDesc ? `a ${ageDesc} Chinese ${genderEn}` : `a Chinese ${genderEn}`);
  const appearance = translateZhToEn(char.appearance);
  if (appearance) parts.push(appearance);
  const clothing = translateZhToEn(char.clothing);
  if (clothing) parts.push(`wearing ${clothing}`);
  const accessory = translateZhToEn(char.accessory);
  if (accessory) parts.push(accessory);
  return parts.join(", ");
}

function formatAllPrompts(results: PromptResult[]): string {
  return results
    .map((r) => `--- Shot ${String(r.shotNumber).padStart(2, "0")} ---\n${r.prompt}`)
    .join("\n\n");
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function StoryboardPage() {
  // Data sources
  const [scriptShots, setScriptShots] = useState<Shot[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedChars, setSelectedChars] = useState<Set<string>>(new Set());
  const [inputMode, setInputMode] = useState<"import" | "manual">("import");
  const [manualInput, setManualInput] = useState("");
  const [hasImportData, setHasImportData] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      const raw = localStorage.getItem("manga-script-latest");
      return raw ? JSON.parse(raw)?.length > 0 : false;
    } catch { return false; }
  });

  // Generation state
  const [loading, setLoading] = useState(false);
  const [streamText, setStreamText] = useState("");
  const [results, setResults] = useState<PromptResult[]>([]);
  const [error, setError] = useState("");
  const [elapsedSec, setElapsedSec] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const scriptRaw = localStorage.getItem("manga-script-latest");
      if (scriptRaw) {
        const parsed = JSON.parse(scriptRaw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setScriptShots(parsed);
          setHasImportData(true);
        }
      }
    } catch { /* ignore */ }

    try {
      const charsRaw = localStorage.getItem("manga-characters");
      if (charsRaw) {
        const parsed = JSON.parse(charsRaw);
        if (Array.isArray(parsed)) {
          setCharacters(parsed);
          setSelectedChars(new Set(parsed.map((c: Character) => c.id)));
        }
      }
    } catch { /* ignore */
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const startTimer = useCallback(() => {
    setElapsedSec(0);
    timerRef.current = setInterval(() => {
      setElapsedSec((prev) => prev + 1);
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const toggleChar = useCallback((id: string) => {
    setSelectedChars((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleGenerate = useCallback(async () => {
    // Determine shots to use
    let shotsToUse: Shot[] = [];

    if (inputMode === "import") {
      if (scriptShots.length === 0) {
        setError("没有可导入的剧本数据，请先使用剧本生成器生成剧本");
        return;
      }
      shotsToUse = scriptShots;
    } else {
      if (!manualInput.trim()) {
        setError("请输入镜头描述");
        return;
      }
      // Try parsing manual input as JSON, otherwise create a single-shot placeholder
      try {
        const parsed = JSON.parse(manualInput);
        if (Array.isArray(parsed)) {
          shotsToUse = parsed;
        }
      } catch {
        // Treat as plain text - create shots from lines
        const lines = manualInput
          .split("\n")
          .filter((l) => l.trim());
        shotsToUse = lines.map((line, i) => ({
          shotNumber: i + 1,
          shotType: "中景",
          scene: line,
          characters: "",
          action: "",
          emotion: "",
          dialogue: "",
        }));
      }
    }

    // Token check
    const balance = getTokenBalance();
    if (balance < 500) {
      setShowContactModal(true);
      return;
    }

    // Build character prompts
    const characterPrompts: Record<string, string> = {};
    for (const char of characters) {
      if (selectedChars.has(char.id) && char.name) {
        characterPrompts[char.name] = generateCharacterPrompt(char);
      }
    }

    setLoading(true);
    setError("");
    setResults([]);
    setStreamText("");
    startTimer();

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "storyboard",
          shots: shotsToUse,
          characterPrompts,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => null) as any;
        throw new Error(
          errData?.error || `请求失败 (${response.status})`
        );
      }

      const fullText = await readSSEStream(response, (text) => {
        setStreamText(text);
      });

      const parsed = extractJsonArray(fullText);
      setResults(parsed);
      setStreamText("");
    } catch (err) {
      const message = err instanceof Error ? err.message : "生成失败，请重试";
      setError(message);
    } finally {
      setLoading(false);
      stopTimer();
    }
  }, [
    inputMode,
    scriptShots,
    manualInput,
    characters,
    selectedChars,
    startTimer,
    stopTimer,
  ]);

  const handleReset = useCallback(() => {
    setResults([]);
    setStreamText("");
    setError("");
  }, []);

  // Find the shot info for each prompt result
  const getShotInfo = useCallback(
    (shotNumber: number): Shot | undefined => {
      return scriptShots.find((s) => s.shotNumber === shotNumber);
    },
    [scriptShots]
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-foreground tracking-tight sm:text-2xl flex items-center gap-2">
            <LayoutGrid className="size-5 text-primary" /> {"分镜 Prompt 生成"}
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {"导入剧本，AI 逐镜头生成可直接粘贴到即梦的英文 prompt"}
          </p>
        </div>

        {/* Input Section */}
        <Card>
          <CardContent className="space-y-4">
            {/* Source selector */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                {"数据来源"}
              </label>
              <div className="flex gap-2">
                <Button
                  variant={inputMode === "import" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setInputMode("import")}
                  className="gap-1.5"
                >
                  <Download className="size-3.5" />
                  {"从剧本生成器导入"}
                  {hasImportData && (
                    <Check className="size-3 text-green-600" />
                  )}
                </Button>
                <Button
                  variant={inputMode === "manual" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setInputMode("manual")}
                >
                  {"手动输入"}
                </Button>
              </div>
            </div>

            {/* Import mode */}
            {inputMode === "import" && (
              <div className="space-y-2">
                {hasImportData ? (
                  <div className="rounded-lg border border-border bg-muted/50 p-3 space-y-1">
                    <p className="text-sm text-foreground">
                      {"已加载"} {scriptShots.length} {"个镜头"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {"来自剧本生成器的最新输出"}
                    </p>
                  </div>
                ) : (
                  <div className="rounded-lg border border-border bg-muted/50 p-3">
                    <p className="text-sm text-muted-foreground">
                      {"暂无剧本数据，请先使用剧本生成器生成一集剧本"}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Manual mode */}
            {inputMode === "manual" && (
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">
                  {"镜头描述（每行一个镜头，或粘贴 JSON 格式）"}
                </label>
                <textarea
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                  placeholder={`CBD写字楼外，林远仰头看大楼，表情迷茫\n办公室内，反派老板摔文件，愤怒\n...`}
                  rows={6}
                  className="w-full rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-sm outline-none resize-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 bg-background font-mono"
                />
              </div>
            )}

            {/* Character selector */}
            {characters.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">
                  {"角色外貌（勾选后 AI 将参考角色 prompt 生成一致的外貌描述）"}
                </label>
                <div className="flex flex-wrap gap-2">
                  {characters.map((char) => {
                    const isSelected = selectedChars.has(char.id);
                    return (
                      <button
                        key={char.id}
                        type="button"
                        onClick={() => toggleChar(char.id)}
                        className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm transition-colors cursor-pointer ${
                          isSelected
                            ? "border-primary/50 bg-primary/10 text-foreground"
                            : "border-border bg-transparent text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        {isSelected && (
                          <Check className="size-3 text-primary" />
                        )}
                        <span>
                          {char.name || "未命名"} ({char.role})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <Button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full gap-2"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  {"生成中..."}
                </>
              ) : (
                <>
                  <Sparkles className="size-4" />
                  {"生成分镜 Prompt"}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Error */}
        {error && (
          <Card className="border-destructive/50">
            <CardContent>
              <p className="text-sm text-destructive">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Loading / Streaming */}
        {loading && (
          <Card>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Loader2 className="size-4 animate-spin text-primary" />
                <span className="text-sm text-foreground font-medium">
                  {"AI 正在生成分镜 Prompt..."}
                </span>
                <span className="text-xs text-muted-foreground">
                  {elapsedSec}s
                </span>
              </div>
              {streamText && (
                <div className="rounded-lg border border-border bg-muted/50 p-3 font-mono text-xs text-muted-foreground leading-relaxed max-h-40 overflow-y-auto whitespace-pre-wrap">
                  {streamText}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Output */}
        {results.length > 0 && !loading && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">
                {"分镜 Prompt"} ({results.length} {"个镜头"})
              </h2>
              <CopyButton text={formatAllPrompts(results)} variant="full" />
            </div>

            <div className="space-y-3">
              {results.map((result) => {
                const shot = getShotInfo(result.shotNumber);
                return (
                  <Card key={result.shotNumber}>
                    <CardContent className="space-y-3">
                      {/* Shot header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-foreground tabular-nums">
                            {"镜头"}{" "}
                            {String(result.shotNumber).padStart(2, "0")}
                          </span>
                          {shot && (
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Badge
                                variant="outline"
                                className="h-4 px-1 text-[10px]"
                              >
                                {shot.shotType}
                              </Badge>
                              <span>{shot.scene}</span>
                              {shot.characters && (
                                <>
                                  <span>{"/"}</span>
                                  <span>{shot.characters}</span>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                        <CopyButton text={result.prompt} variant="full" />
                      </div>

                      {/* Prompt block */}
                      <div className="rounded-lg border border-border bg-muted/50 p-3 font-mono text-xs text-foreground leading-relaxed">
                        {result.prompt}
                      </div>

                      {/* Dialogue */}
                      {shot?.dialogue && (
                        <p className="text-xs text-muted-foreground">
                          {"对白: "}
                          {'"'}
                          {shot.dialogue}
                          {'"'}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Bottom actions */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <CopyButton text={formatAllPrompts(results)} variant="full" />
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={handleReset}
              >
                <RotateCcw className="size-3.5" />
                {"重新生成"}
              </Button>
            </div>
          </div>
        )}

        <ContactModal open={showContactModal} onClose={() => setShowContactModal(false)} />
      </div>
    </DashboardLayout>
  );
}
