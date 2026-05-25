"use client";

import { useState, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { Loader2, Pencil, RotateCcw, ArrowRight, Sparkles, FileText } from "lucide-react";

const LazyJianyingExport = dynamic(
  () => import("@/components/jianying-export").then((mod) => ({ default: mod.JianyingExport })),
  { ssr: false, loading: () => null }
);
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/copy-button";
import { ContactModal } from "@/components/contact-modal";
import { cn } from "@/lib/utils";
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

const SHOT_TYPES = ["特写", "中景", "全景", "仰拍", "俯拍"];

const shotTypeColor: Record<string, string> = {
  "特写": "bg-rose-50 text-rose-700 border-rose-200",
  "中景": "bg-blue-50 text-blue-700 border-blue-200",
  "全景": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "仰拍": "bg-amber-50 text-amber-700 border-amber-200",
  "俯拍": "bg-purple-50 text-purple-700 border-purple-200",
};

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function formatShotText(shot: Shot): string {
  return `镜头 ${String(shot.shotNumber).padStart(2, "0")} | ${shot.shotType} | ${shot.scene} | ${shot.characters} | ${shot.action} | ${shot.emotion}\n台词: "${shot.dialogue}"`;
}

function formatAllShots(shots: Shot[]): string {
  return shots.map(formatShotText).join("\n\n");
}

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

/** Extract JSON array from text that may contain markdown fences or other noise */
function extractJsonArray(text: string): Shot[] {
  // Try direct parse first
  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) return parsed;
  } catch {
    // continue to extraction
  }

  // Try extracting from markdown code block
  const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch) {
    try {
      const parsed = JSON.parse(fenceMatch[1].trim());
      if (Array.isArray(parsed)) return parsed;
    } catch {
      // continue
    }
  }

  // Try finding array brackets
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

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function ScriptPage() {
  // Form state
  const [genre, setGenre] = useState("");
  const [character, setCharacter] = useState("");
  const [episode, setEpisode] = useState(1);
  const [totalEpisodes, setTotalEpisodes] = useState(10);
  const [conflict, setConflict] = useState("");

  // Generation state
  const [loading, setLoading] = useState(false);
  const [streamText, setStreamText] = useState("");
  const [shots, setShots] = useState<Shot[]>([]);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editDraft, setEditDraft] = useState<Shot | null>(null);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  const handleGenerate = useCallback(async () => {
    if (!genre.trim() || !character.trim()) {
      setError("请填写题材和主角设定");
      return;
    }

    // Token check
    const balance = getTokenBalance();
    if (balance < 500) {
      setShowContactModal(true);
      return;
    }

    setLoading(true);
    setError("");
    setShots([]);
    setStreamText("");
    setEditingId(null);
    startTimer();

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "script",
          genre: genre.trim(),
          character: character.trim(),
          episode,
          totalEpisodes,
          conflict: conflict.trim() || undefined,
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
      setShots(parsed);
      setStreamText("");

      // Save to localStorage for storyboard generator
      localStorage.setItem("manga-script-latest", JSON.stringify(parsed));
    } catch (err) {
      const message = err instanceof Error ? err.message : "生成失败，请重试";
      setError(message);
    } finally {
      setLoading(false);
      stopTimer();
    }
  }, [genre, character, episode, totalEpisodes, conflict, startTimer, stopTimer]);

  const handleReset = useCallback(() => {
    setShots([]);
    setStreamText("");
    setError("");
    setEditingId(null);
  }, []);

  const startEdit = useCallback(
    (shot: Shot) => {
      setEditingId(shot.shotNumber);
      setEditDraft({ ...shot });
    },
    []
  );

  const saveEdit = useCallback(() => {
    if (!editDraft) return;
    setShots((prev) =>
      prev.map((s) =>
        s.shotNumber === editDraft.shotNumber ? { ...editDraft } : s
      )
    );
    // Also update localStorage
    setShots((prev) => {
      localStorage.setItem("manga-script-latest", JSON.stringify(prev));
      return prev;
    });
    setEditingId(null);
    setEditDraft(null);
  }, [editDraft]);

  const cancelEdit = useCallback(() => {
    setEditingId(null);
    setEditDraft(null);
  }, []);

  const navigateToStoryboard = useCallback(() => {
    // Already saved to localStorage in handleGenerate
    window.location.href = "/tools/storyboard";
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-foreground tracking-tight sm:text-2xl flex items-center gap-2">
            <FileText className="size-5 text-primary" /> {"剧本生成器"}
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {"输入故事概要，AI 生成结构化分集剧本"}
          </p>
        </div>

        {/* Input Form */}
        <Card>
          <CardContent className="space-y-4">
            <FormField label="题材">
              <Input
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                placeholder="都市逆袭"
                className="text-sm"
              />
            </FormField>

            <FormField label="主角设定">
              <textarea
                value={character}
                onChange={(e) => setCharacter(e.target.value)}
                placeholder="林远，25岁，被公司陷害的金融天才，隐忍但内心有王者气场"
                rows={3}
                className="w-full rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-sm outline-none resize-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 bg-background"
              />
            </FormField>

            <div className="grid grid-cols-2 gap-4">
              <FormField label="集数">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground shrink-0">
                    {"第"}
                  </span>
                  <Input
                    type="number"
                    value={episode}
                    onChange={(e) => setEpisode(Number(e.target.value) || 1)}
                    min={1}
                    max={totalEpisodes}
                    className="text-sm w-16"
                  />
                  <span className="text-sm text-muted-foreground shrink-0">
                    {"集 / 共"}
                  </span>
                  <Input
                    type="number"
                    value={totalEpisodes}
                    onChange={(e) =>
                      setTotalEpisodes(Number(e.target.value) || 1)
                    }
                    min={1}
                    max={999}
                    className="text-sm w-16"
                  />
                  <span className="text-sm text-muted-foreground shrink-0">
                    {"集"}
                  </span>
                </div>
              </FormField>
            </div>

            <FormField label="核心冲突（选填）">
              <textarea
                value={conflict}
                onChange={(e) => setConflict(e.target.value)}
                placeholder="被当众侮辱后触发金手指"
                rows={2}
                className="w-full rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-sm outline-none resize-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 bg-background"
              />
            </FormField>

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
                  {"生成剧本"}
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
                  {"AI 正在生成剧本..."}
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

        {/* Output: Shot List */}
        {shots.length > 0 && !loading && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">
                {"剧本输出"} ({shots.length} {"个镜头"})
              </h2>
              <CopyButton text={formatAllShots(shots)} variant="full" />
            </div>

            <div className="space-y-2">
              {shots.map((shot) => {
                const isEditing = editingId === shot.shotNumber;
                const colorClass =
                  shotTypeColor[shot.shotType] ||
                  "bg-gray-100 text-gray-500 border-gray-200";

                if (isEditing && editDraft) {
                  return (
                    <Card key={shot.shotNumber} className="border-primary/30">
                      <CardContent className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-primary">
                            {"镜头"}{" "}
                            {String(shot.shotNumber).padStart(2, "0")}
                          </span>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="xs"
                              onClick={cancelEdit}
                            >
                              {"取消"}
                            </Button>
                            <Button size="xs" onClick={saveEdit}>
                              {"保存"}
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <EditField
                            label="景别"
                            value={editDraft.shotType}
                            onChange={(v) =>
                              setEditDraft({ ...editDraft, shotType: v })
                            }
                            options={SHOT_TYPES}
                          />
                          <EditField
                            label="场景"
                            value={editDraft.scene}
                            onChange={(v) =>
                              setEditDraft({ ...editDraft, scene: v })
                            }
                          />
                          <EditField
                            label="角色"
                            value={editDraft.characters}
                            onChange={(v) =>
                              setEditDraft({ ...editDraft, characters: v })
                            }
                          />
                          <EditField
                            label="动作"
                            value={editDraft.action}
                            onChange={(v) =>
                              setEditDraft({ ...editDraft, action: v })
                            }
                          />
                          <EditField
                            label="情绪"
                            value={editDraft.emotion}
                            onChange={(v) =>
                              setEditDraft({ ...editDraft, emotion: v })
                            }
                          />
                          <EditField
                            label="台词"
                            value={editDraft.dialogue}
                            onChange={(v) =>
                              setEditDraft({ ...editDraft, dialogue: v })
                            }
                          />
                        </div>
                      </CardContent>
                    </Card>
                  );
                }

                return (
                  <Card
                    key={shot.shotNumber}
                    className="group/shot hover:border-border/80 transition-colors"
                  >
                    <CardContent>
                      <div className="flex items-start gap-3">
                        {/* Shot number */}
                        <span className="text-sm font-bold text-foreground shrink-0 pt-0.5 tabular-nums">
                          {String(shot.shotNumber).padStart(2, "0")}
                        </span>

                        {/* Shot type badge */}
                        <Badge
                          variant="outline"
                          className={cn(
                            "shrink-0 text-[10px] h-5 px-1.5",
                            colorClass
                          )}
                        >
                          {shot.shotType}
                        </Badge>

                        {/* Details */}
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-sm text-foreground">
                            <span>{shot.scene}</span>
                            <span className="text-muted-foreground">{"/"}</span>
                            <span>{shot.characters}</span>
                            <span className="text-muted-foreground">{"/"}</span>
                            <span>{shot.action}</span>
                            <span className="text-muted-foreground">{"/"}</span>
                            <span className="text-muted-foreground italic">
                              {shot.emotion}
                            </span>
                          </div>
                          {shot.dialogue && (
                            <p className="text-sm text-primary/80 italic">
                              {'"'}
                              {shot.dialogue}
                              {'"'}
                            </p>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-0.5 shrink-0 opacity-0 group-hover/shot:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="icon-xs"
                            className="text-muted-foreground hover:text-foreground"
                            onClick={() => startEdit(shot)}
                            title="编辑镜头"
                          >
                            <Pencil className="size-3" />
                          </Button>
                          <CopyButton
                            text={formatShotText(shot)}
                            variant="compact"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Bottom actions */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <CopyButton text={formatAllShots(shots)} variant="full" />
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={navigateToStoryboard}
              >
                <ArrowRight className="size-3.5" />
                {"生成分镜 Prompt"}
              </Button>
              <LazyJianyingExport
                projectName={genre || "AI漫剧"}
                episode={episode}
                shots={shots.map((s) => ({
                  shotNumber: s.shotNumber,
                  dialogue: s.dialogue,
                  duration: 2.5,
                }))}
              />
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

function EditField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options?: string[];
}) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </label>
      {options ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-7 w-full rounded-md border border-input bg-transparent px-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 bg-background"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-sm h-7"
        />
      )}
    </div>
  );
}
