"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Loader2,
  Download,
  ExternalLink,
  Copy,
  Check,
  ImageIcon,
  Settings,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Episode, GeneratedImage } from "@/lib/store";

/* ------------------------------------------------------------------ */
/* Types & helpers                                                     */
/* ------------------------------------------------------------------ */

interface VideoApiSettings {
  jimengApiKey: string;
  jimengAk: string;
  jimengSk: string;
  kelingApiKey: string;
  zhipuApiKey: string;
  minimaxApiKey: string;
  openaiApiKey: string;
  stabilityApiKey: string;
}

const DEFAULT_VIDEO_SETTINGS: VideoApiSettings = {
  jimengApiKey: "",
  jimengAk: "",
  jimengSk: "",
  kelingApiKey: "",
  zhipuApiKey: "",
  minimaxApiKey: "",
  openaiApiKey: "",
  stabilityApiKey: "",
};

const VIDEO_API_STORAGE_KEY = "manga-video-api-settings";

function loadVideoApiSettings(): VideoApiSettings {
  if (typeof window === "undefined")
    return { ...DEFAULT_VIDEO_SETTINGS };
  try {
    const raw = localStorage.getItem(VIDEO_API_STORAGE_KEY);
    return raw ? { ...DEFAULT_VIDEO_SETTINGS, ...JSON.parse(raw) } : { ...DEFAULT_VIDEO_SETTINGS };
  } catch {
    return { ...DEFAULT_VIDEO_SETTINGS };
  }
}

/* ------------------------------------------------------------------ */
/* Provider definitions                                                */
/* ------------------------------------------------------------------ */

interface ImageProvider {
  id: string;
  name: string;
  desc: string;
  type: "image" | "video" | "link";
  sync?: boolean; // true = synchronous API, no polling needed
}

const IMAGE_PROVIDERS: ImageProvider[] = [
  { id: "kling-image", name: "可灵", desc: "快手 · 高质量", type: "image" },
  { id: "kling", name: "可灵视频", desc: "快手 · 图生视频", type: "video" },
  { id: "zhipu-image", name: "智谱 CogView", desc: "免费额度大", type: "image" },
  { id: "zhipu-video", name: "智谱 CogVideoX", desc: "免费额度大", type: "video" },
  { id: "wanxiang", name: "通义万相", desc: "阿里云 · 共用 DashScope Key", type: "image" },
  { id: "minimax-image", name: "MiniMax", desc: "图片生成", type: "image" },
  { id: "dalle", name: "DALL-E 3", desc: "OpenAI · 高质量", type: "image", sync: true },
  { id: "stability", name: "Stability AI", desc: "SD3 · 开源模型", type: "image", sync: true },
  { id: "jimeng", name: "即梦", desc: "火山引擎 · 高质量", type: "image" },
];

/** Get the API key for a given provider from settings */
function getApiKeyForProvider(
  providerId: string,
  settings: VideoApiSettings
): string {
  switch (providerId) {
    case "kling":
    case "kling-image":
    case "wanxiang":
      return settings.kelingApiKey;
    case "zhipu-image":
    case "zhipu-video":
      return settings.zhipuApiKey;
    case "minimax-image":
      return settings.minimaxApiKey;
    case "dalle":
      return settings.openaiApiKey;
    case "stability":
      return settings.stabilityApiKey;
    case "jimeng":
      // jimeng uses AK/SK, not a single API key — return AK as a sentinel
      return settings.jimengAk && settings.jimengSk ? settings.jimengAk : "";
    default:
      return "";
  }
}

/** Check if jimeng has valid AK/SK configured */
function hasJimengCredentials(settings: VideoApiSettings): boolean {
  return !!settings.jimengAk && !!settings.jimengSk;
}

/** Check if a provider is a synchronous API */
function isProviderSync(providerId: string): boolean {
  const p = IMAGE_PROVIDERS.find((x) => x.id === providerId);
  return !!p?.sync;
}

/** Check if a result is an image (vs video) provider */
function isImageProvider(providerId: string): boolean {
  const videoProviders = ["kling", "zhipu-video"];
  return !videoProviders.includes(providerId);
}

/* ------------------------------------------------------------------ */
/* Poll helper — keep polling task status until done                    */
/* ------------------------------------------------------------------ */

async function pollTaskStatus(
  taskId: string,
  apiKey: string,
  provider: string,
  onStatus: (status: string) => void,
  signal?: AbortSignal
): Promise<{ status: string; url?: string; error?: string }> {
  const maxAttempts = 120; // 10 minutes max
  let attempts = 0;

  while (attempts < maxAttempts) {
    if (signal?.aborted) throw new Error("已取消");

    const res = await fetch(
      `/api/image-gen/status?taskId=${encodeURIComponent(taskId)}&apiKey=${encodeURIComponent(apiKey)}&provider=${encodeURIComponent(provider)}`
    );
    const data = (await res.json()) as Record<string, unknown>;

    if (data.error) {
      return { status: "FAILED", error: data.error as string };
    }

    const output = data.output as Record<string, unknown> | undefined;
    const taskStatus = (output?.task_status as string) || "UNKNOWN";

    onStatus(taskStatus);

    if (taskStatus === "SUCCEEDED") {
      // Extract result URL — DashScope nests results
      const results = output?.results as
        | Array<Record<string, unknown>>
        | undefined;
      if (results && results.length > 0) {
        const url = (results[0].url as string) || (results[0].video_url as string) || "";
        return { status: "SUCCEEDED", url };
      }
      // Try alternative structure
      const videoUrl = output?.video_url as string;
      if (videoUrl) {
        return { status: "SUCCEEDED", url: videoUrl };
      }
      return { status: "SUCCEEDED", url: "" };
    }

    if (taskStatus === "FAILED") {
      const errMsg =
        (output?.message as string) ||
        (output?.code as string) ||
        "生成失败";
      return { status: "FAILED", error: errMsg };
    }

    // Wait 5 seconds before next poll
    await new Promise((resolve) => setTimeout(resolve, 5000));
    attempts++;
  }

  return { status: "TIMEOUT", error: "生成超时（超过 10 分钟）" };
}

/* ------------------------------------------------------------------ */
/* Poll helper for Jimeng — uses POST (needs AK/SK for signing)        */
/* ------------------------------------------------------------------ */

async function pollJimengTaskStatus(
  taskId: string,
  ak: string,
  sk: string,
  onStatus: (status: string) => void,
  signal?: AbortSignal
): Promise<{ status: string; url?: string; error?: string }> {
  const maxAttempts = 120;
  let attempts = 0;

  while (attempts < maxAttempts) {
    if (signal?.aborted) throw new Error("已取消");

    const res = await fetch("/api/image-gen/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskId, provider: "jimeng", ak, sk }),
    });
    const data = (await res.json()) as Record<string, unknown>;

    if (data.error) {
      return { status: "FAILED", error: data.error as string };
    }

    const output = data.output as Record<string, unknown> | undefined;
    const taskStatus = (output?.task_status as string) || "UNKNOWN";

    onStatus(taskStatus);

    if (taskStatus === "SUCCEEDED") {
      const results = output?.results as
        | Array<Record<string, unknown>>
        | undefined;
      if (results && results.length > 0) {
        const url = (results[0].url as string) || "";
        return { status: "SUCCEEDED", url };
      }
      return { status: "SUCCEEDED", url: "" };
    }

    if (taskStatus === "FAILED") {
      const errMsg =
        (output?.message as string) ||
        (output?.code as string) ||
        "生成失败";
      return { status: "FAILED", error: errMsg };
    }

    await new Promise((resolve) => setTimeout(resolve, 5000));
    attempts++;
  }

  return { status: "TIMEOUT", error: "生成超时（超过 10 分钟）" };
}

/* ------------------------------------------------------------------ */
/* ImageGenerator Component                                            */
/* ------------------------------------------------------------------ */

interface ImageGeneratorProps {
  episode: Episode;
  onImagesUpdate: (images: GeneratedImage[]) => void;
}

export function ImageGenerator({
  episode,
  onImagesUpdate,
}: ImageGeneratorProps) {
  const [videoSettings, setVideoSettings] = useState<VideoApiSettings>({
    ...DEFAULT_VIDEO_SETTINGS,
  });
  const [generatingShots, setGeneratingShots] = useState<Set<number>>(
    new Set()
  );
  const [shotErrors, setShotErrors] = useState<Record<number, string>>({});
  const [shotStatuses, setShotStatuses] = useState<Record<number, string>>({});
  const [batchGenerating, setBatchGenerating] = useState(false);
  const [batchProgress, setBatchProgress] = useState("");
  const [copiedShot, setCopiedShot] = useState<number | null>(null);

  // Generation parameters
  const [selectedProvider, setSelectedProvider] = useState("kling-image");
  const [aspectRatio, setAspectRatio] = useState("9:16");
  const [videoMode, setVideoMode] = useState<"std" | "pro">("std");
  const [videoDuration, setVideoDuration] = useState<5 | 10>(5);

  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    setVideoSettings(loadVideoApiSettings());
  }, []);

  const currentProviderDef = IMAGE_PROVIDERS.find((p) => p.id === selectedProvider);
  const genMode = currentProviderDef?.type === "video" ? "video" : "image";
  const isLinkMode = currentProviderDef?.type === "link";
  const currentApiKey = getApiKeyForProvider(selectedProvider, videoSettings);
  const hasJimengKeys = hasJimengCredentials(videoSettings);
  const hasAnyKey =
    !!videoSettings.kelingApiKey ||
    !!videoSettings.zhipuApiKey ||
    !!videoSettings.minimaxApiKey ||
    !!videoSettings.openaiApiKey ||
    !!videoSettings.stabilityApiKey ||
    hasJimengKeys;
  const hasCurrentKey = !!currentApiKey;
  const images = episode.images || [];

  const getImageForShot = useCallback(
    (shotNumber: number) => images.find((img) => img.shotNumber === shotNumber),
    [images]
  );

  /* ------ Generate single shot ------ */
  const generateShot = useCallback(
    async (shotNumber: number, prompt: string) => {
      if (!hasCurrentKey && !isLinkMode) return;

      const provider = selectedProvider;
      const apiKey = currentApiKey;
      const isJimeng = provider === "jimeng";

      setGeneratingShots((prev) => new Set([...prev, shotNumber]));
      setShotErrors((prev) => {
        const next = { ...prev };
        delete next[shotNumber];
        return next;
      });
      setShotStatuses((prev) => ({ ...prev, [shotNumber]: "PENDING" }));

      try {
        const body: Record<string, unknown> = {
          provider,
          apiKey,
          prompt,
          aspectRatio,
        };

        // Jimeng uses AK/SK instead of apiKey
        if (isJimeng) {
          body.ak = videoSettings.jimengAk;
          body.sk = videoSettings.jimengSk;
          // Convert aspect ratio to width/height for jimeng
          const dims = aspectRatio === "16:9"
            ? { width: 1920, height: 1080 }
            : aspectRatio === "1:1"
              ? { width: 1080, height: 1080 }
              : { width: 1080, height: 1920 }; // 9:16 default
          body.width = dims.width;
          body.height = dims.height;
        }

        // Provider-specific params
        if (provider === "kling-image") {
          body.model = "kling/kling-v2-image-generation";
          body.imageCount = 1;
        } else if (provider === "kling") {
          body.model = "kling/kling-v3-video-generation";
          body.mode = videoMode;
          body.duration = videoDuration;
        } else if (provider === "zhipu-video") {
          body.duration = videoDuration;
        }

        const res = await fetch("/api/image-gen", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        const data = (await res.json()) as Record<string, unknown>;

        if (!res.ok || data.error) {
          throw new Error((data.error as string) || "提交任务失败");
        }

        // Check if synchronous result (DALL-E, Stability, MiniMax, CogView sync)
        if (data.status === "SUCCEEDED") {
          const output = data.output as Record<string, unknown> | undefined;
          const results = output?.results as Array<Record<string, unknown>> | undefined;
          const url = (results?.[0]?.url as string) || "";

          const finalImages = [
            ...images.filter((img) => img.shotNumber !== shotNumber),
            {
              shotNumber,
              url,
              provider,
              status: "succeeded" as const,
            },
          ].sort((a, b) => a.shotNumber - b.shotNumber);
          onImagesUpdate(finalImages);
          return;
        }

        // Async — extract task_id
        const output = data.output as Record<string, unknown> | undefined;
        const taskId = (output?.task_id as string) || "";

        if (!taskId) {
          throw new Error("未获取到任务 ID");
        }

        // Update image entry as pending
        const updatedImages = [
          ...images.filter((img) => img.shotNumber !== shotNumber),
          {
            shotNumber,
            url: "",
            provider,
            taskId,
            status: "running" as const,
          },
        ].sort((a, b) => a.shotNumber - b.shotNumber);
        onImagesUpdate(updatedImages);

        // Poll for result
        const abortController = new AbortController();
        abortRef.current = abortController;

        // Jimeng uses POST-based polling (needs AK/SK for signing)
        const result = isJimeng
          ? await pollJimengTaskStatus(
              taskId,
              videoSettings.jimengAk,
              videoSettings.jimengSk,
              (status) => {
                setShotStatuses((prev) => ({
                  ...prev,
                  [shotNumber]: status,
                }));
              },
              abortController.signal
            )
          : await pollTaskStatus(
              taskId,
              apiKey,
              provider,
              (status) => {
                setShotStatuses((prev) => ({
                  ...prev,
                  [shotNumber]: status,
                }));
              },
              abortController.signal
            );

        if (result.status === "SUCCEEDED" && result.url) {
          const finalImages = [
            ...images.filter((img) => img.shotNumber !== shotNumber),
            {
              shotNumber,
              url: result.url,
              provider,
              taskId,
              status: "succeeded" as const,
            },
          ].sort((a, b) => a.shotNumber - b.shotNumber);
          onImagesUpdate(finalImages);
        } else {
          throw new Error(result.error || "生成失败");
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "生成失败";
        setShotErrors((prev) => ({ ...prev, [shotNumber]: message }));

        // Update image status to failed
        const failedImages = [
          ...images.filter((img) => img.shotNumber !== shotNumber),
          {
            shotNumber,
            url: "",
            provider,
            status: "failed" as const,
          },
        ].sort((a, b) => a.shotNumber - b.shotNumber);
        onImagesUpdate(failedImages);
      } finally {
        setGeneratingShots((prev) => {
          const next = new Set(prev);
          next.delete(shotNumber);
          return next;
        });
        setShotStatuses((prev) => {
          const next = { ...prev };
          delete next[shotNumber];
          return next;
        });
      }
    },
    [
      hasCurrentKey,
      isLinkMode,
      selectedProvider,
      currentApiKey,
      videoSettings.jimengAk,
      videoSettings.jimengSk,
      aspectRatio,
      videoMode,
      videoDuration,
      images,
      onImagesUpdate,
    ]
  );

  /* ------ Batch generate ------ */
  const handleBatchGenerate = useCallback(async () => {
    const shotsWithPrompts = episode.prompts.filter((p) => {
      const existing = getImageForShot(p.shotNumber);
      return !existing || existing.status === "failed" || !existing.url;
    });

    if (shotsWithPrompts.length === 0) {
      setBatchProgress("所有分镜图已生成完毕");
      return;
    }

    setBatchGenerating(true);
    setBatchProgress("");
    let completed = 0;

    for (const promptItem of shotsWithPrompts) {
      setBatchProgress(
        `正在生成镜头 ${String(promptItem.shotNumber).padStart(2, "0")}...（${completed}/${shotsWithPrompts.length} 已完成）`
      );
      await generateShot(promptItem.shotNumber, promptItem.prompt);
      completed++;
    }

    setBatchGenerating(false);
    setBatchProgress(`全部 ${shotsWithPrompts.length} 个分镜生成完成`);
  }, [episode.prompts, getImageForShot, generateShot]);

  /* ------ Copy prompt to clipboard ------ */
  const handleCopyPrompt = useCallback(
    (shotNumber: number, prompt: string) => {
      navigator.clipboard.writeText(prompt);
      setCopiedShot(shotNumber);
      setTimeout(() => setCopiedShot(null), 2000);
    },
    []
  );

  /* ------ No prompts yet ------ */
  if (episode.prompts.length === 0) {
    return null;
  }

  /* ------ No API key configured ------ */
  if (!hasAnyKey) {
    return (
      <Card>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <ImageIcon className="size-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">
              {"生成分镜图/视频"}
            </h3>
          </div>

          <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4 space-y-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="size-4 text-amber-500 shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {"需要配置图片/视频生成 API 才能直接生成分镜。支持即梦、可灵、智谱、通义万相等多种服务商。"}
                </p>
                <Link href="/settings">
                  <Button variant="outline" size="sm" className="gap-1.5 mt-1">
                    <Settings className="size-3.5" />
                    {"去设置页面配置"}
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Fallback: copy prompt + open Jimeng */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">
              {"或者手动复制 prompt 到即梦生成:"}
            </p>
            <div className="flex flex-wrap gap-2">
              {episode.prompts.map((p) => (
                <div
                  key={p.shotNumber}
                  className="flex items-center gap-1"
                >
                  <Button
                    variant="outline"
                    size="xs"
                    className="gap-1 text-xs"
                    onClick={() =>
                      handleCopyPrompt(p.shotNumber, p.prompt)
                    }
                  >
                    {copiedShot === p.shotNumber ? (
                      <Check className="size-3" />
                    ) : (
                      <Copy className="size-3" />
                    )}
                    {"镜头 "}
                    {String(p.shotNumber).padStart(2, "0")}
                  </Button>
                </div>
              ))}
              <a
                href="https://jimeng.jianying.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="xs"
                  className="gap-1 text-xs"
                >
                  <ExternalLink className="size-3" />
                  {"打开即梦"}
                </Button>
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  /* ------ Main UI: API configured ------ */
  return (
    <Card>
      <CardContent className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ImageIcon className="size-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">
              {"生成分镜图/视频"}
            </h3>
          </div>
          <Badge
            variant="outline"
            className={cn(
              "text-[10px]",
              hasCurrentKey
                ? "border-green-300 text-green-600"
                : "border-amber-300 text-amber-600"
            )}
          >
            {hasCurrentKey
              ? `${currentProviderDef?.name || selectedProvider} 已配置`
              : `${currentProviderDef?.name || selectedProvider} 未配置`}
          </Badge>
        </div>

        {/* Provider selector chips */}
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground">{"选择生成服务:"}</span>
          <div className="flex flex-wrap gap-1.5">
            {IMAGE_PROVIDERS.map((p) => {
              const hasKey = !!getApiKeyForProvider(p.id, videoSettings);
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedProvider(p.id)}
                  disabled={!hasKey}
                  className={cn(
                    "rounded-lg border px-2.5 py-1.5 text-xs transition-all",
                    selectedProvider === p.id
                      ? "border-primary bg-primary/10 text-primary font-medium"
                      : hasKey
                        ? "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground cursor-pointer"
                        : "border-border/50 text-muted-foreground/40 cursor-not-allowed"
                  )}
                  title={hasKey ? p.desc : `${p.name}: 未配置 API Key`}
                >
                  <span>{p.name}</span>
                  {p.type === "video" && (
                    <span className="ml-1 text-[10px] opacity-60">{"视频"}</span>
                  )}
                </button>
              );
            })}
          </div>
          {!hasCurrentKey && (
            <p className="text-xs text-amber-500">
              {"当前选中的服务未配置 API Key，请先"}
              <Link href="/settings" className="text-primary hover:underline ml-0.5">
                {"去设置页面配置"}
              </Link>
            </p>
          )}
        </div>

        {/* Generation params */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Aspect ratio */}
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground">{"比例:"}</span>
            <select
              value={aspectRatio}
              onChange={(e) => setAspectRatio(e.target.value)}
              className="h-7 rounded-md border border-input bg-transparent px-2 text-xs outline-none bg-background"
            >
              <option value="9:16">{"9:16 竖屏"}</option>
              <option value="16:9">{"16:9 横屏"}</option>
              <option value="1:1">{"1:1 方形"}</option>
            </select>
          </div>

          {/* Video-specific options */}
          {genMode === "video" && (
            <>
              {selectedProvider === "kling" && (
                <div className="flex items-center gap-1">
                  <span className="text-xs text-muted-foreground">
                    {"质量:"}
                  </span>
                  <select
                    value={videoMode}
                    onChange={(e) =>
                      setVideoMode(e.target.value as "std" | "pro")
                    }
                    className="h-7 rounded-md border border-input bg-transparent px-2 text-xs outline-none bg-background"
                  >
                    <option value="std">{"标准"}</option>
                    <option value="pro">{"专业"}</option>
                  </select>
                </div>
              )}
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">
                  {"时长:"}
                </span>
                <select
                  value={videoDuration}
                  onChange={(e) =>
                    setVideoDuration(Number(e.target.value) as 5 | 10)
                  }
                  className="h-7 rounded-md border border-input bg-transparent px-2 text-xs outline-none bg-background"
                >
                  <option value={5}>{"5 秒"}</option>
                  <option value={10}>{"10 秒"}</option>
                </select>
              </div>
            </>
          )}
        </div>

        {/* Shot grid */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">
            {"点击「生成」按钮为每个镜头生成"}
            {genMode === "image" ? "图片" : "视频"}
            {"，或使用「批量生成」一次生成全部:"}
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {episode.prompts.map((p) => {
              const existing = getImageForShot(p.shotNumber);
              const isGenerating = generatingShots.has(p.shotNumber);
              const hasResult =
                existing?.status === "succeeded" && !!existing.url;
              const hasFailed = existing?.status === "failed";
              const statusText = shotStatuses[p.shotNumber] || "";
              const errorText = shotErrors[p.shotNumber] || "";

              return (
                <div
                  key={p.shotNumber}
                  className={cn(
                    "relative rounded-lg border p-2 text-center space-y-1 transition-colors",
                    hasResult
                      ? "border-green-300 bg-green-50/50"
                      : hasFailed
                        ? "border-red-300 bg-red-50/50"
                        : isGenerating
                          ? "border-primary/30 bg-primary/5"
                          : "border-border"
                  )}
                >
                  <span className="text-xs font-bold text-foreground tabular-nums block">
                    {String(p.shotNumber).padStart(2, "0")}
                  </span>

                  {/* Status indicator */}
                  {isGenerating ? (
                    <div className="space-y-1">
                      <Loader2 className="size-4 animate-spin text-primary mx-auto" />
                      <span className="text-[10px] text-muted-foreground block">
                        {statusText === "RUNNING"
                          ? "生成中..."
                          : statusText === "PENDING"
                            ? "排队中..."
                            : "处理中..."}
                      </span>
                    </div>
                  ) : hasResult ? (
                    <div className="space-y-1">
                      <Check className="size-4 text-green-600 mx-auto" />
                      <span className="text-[10px] text-green-600 block">
                        {"已完成"}
                      </span>
                    </div>
                  ) : hasFailed ? (
                    <div className="space-y-1">
                      <AlertCircle className="size-4 text-red-500 mx-auto" />
                      <span
                        className="text-[10px] text-red-500 block truncate"
                        title={errorText}
                      >
                        {"失败"}
                      </span>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      size="xs"
                      className="text-[10px] h-6 w-full"
                      onClick={() =>
                        generateShot(p.shotNumber, p.prompt)
                      }
                      disabled={batchGenerating || !hasCurrentKey}
                    >
                      {"生成"}
                    </Button>
                  )}

                  {/* Retry button for failed */}
                  {hasFailed && !isGenerating && (
                    <Button
                      variant="ghost"
                      size="xs"
                      className="text-[10px] h-5 w-full gap-0.5 text-muted-foreground"
                      onClick={() =>
                        generateShot(p.shotNumber, p.prompt)
                      }
                      disabled={batchGenerating}
                    >
                      <RefreshCw className="size-2.5" />
                      {"重试"}
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Batch generate */}
        <Button
          variant="outline"
          className="w-full gap-2"
          onClick={handleBatchGenerate}
          disabled={
            batchGenerating || generatingShots.size > 0 || !hasCurrentKey
          }
        >
          {batchGenerating ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              {batchProgress}
            </>
          ) : (
            <>
              <ImageIcon className="size-4" />
              {"批量生成全部分镜"}
              {genMode === "image" ? "图" : "视频"}
            </>
          )}
        </Button>

        {batchProgress && !batchGenerating && (
          <p className="text-sm text-green-600 font-medium">
            {batchProgress}
          </p>
        )}

        {/* Results gallery */}
        {images.filter((img) => img.status === "succeeded" && img.url)
          .length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-foreground">
              {"生成结果"}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {images
                .filter((img) => img.status === "succeeded" && img.url)
                .map((img) => (
                  <div
                    key={img.shotNumber}
                    className="relative rounded-lg border border-border overflow-hidden group"
                  >
                    <div className="aspect-[9/16] bg-muted/50 relative">
                      {isImageProvider(img.provider) ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={img.url}
                          alt={`镜头 ${String(img.shotNumber).padStart(2, "0")}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <video
                          src={img.url}
                          className="w-full h-full object-cover"
                          controls
                          playsInline
                          muted
                        />
                      )}
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2 flex items-end justify-between">
                      <span className="text-xs text-white font-medium">
                        {"镜头 "}
                        {String(img.shotNumber).padStart(2, "0")}
                      </span>
                      <a
                        href={img.url}
                        download={`shot-${String(img.shotNumber).padStart(2, "0")}.${isImageProvider(img.provider) ? "png" : "mp4"}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-primary-foreground transition-colors"
                        title="下载"
                      >
                        <Download className="size-4" />
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Jimeng fallback */}
        <div className="border-t border-border pt-3 space-y-2">
          <p className="text-xs text-muted-foreground">
            {"也可以手动复制 prompt 到即梦生成:"}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {episode.prompts.slice(0, 5).map((p) => (
              <Button
                key={p.shotNumber}
                variant="ghost"
                size="xs"
                className="gap-1 text-[10px] text-muted-foreground"
                onClick={() => handleCopyPrompt(p.shotNumber, p.prompt)}
              >
                {copiedShot === p.shotNumber ? (
                  <Check className="size-2.5" />
                ) : (
                  <Copy className="size-2.5" />
                )}
                {"镜头 "}
                {String(p.shotNumber).padStart(2, "0")}
              </Button>
            ))}
            {episode.prompts.length > 5 && (
              <span className="text-[10px] text-muted-foreground self-center">
                {"...等 "}{episode.prompts.length}{" 个"}
              </span>
            )}
            <a
              href="https://jimeng.jianying.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                size="xs"
                className="gap-1 text-[10px] text-muted-foreground"
              >
                <ExternalLink className="size-2.5" />
                {"打开即梦"}
              </Button>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
