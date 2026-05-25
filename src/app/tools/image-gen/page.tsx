"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Loader2,
  Download,
  ImageIcon,
  Settings,
  AlertCircle,
  Palette,
} from "lucide-react";
import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  if (typeof window === "undefined") return { ...DEFAULT_VIDEO_SETTINGS };
  try {
    const raw = localStorage.getItem(VIDEO_API_STORAGE_KEY);
    return raw
      ? { ...DEFAULT_VIDEO_SETTINGS, ...JSON.parse(raw) }
      : { ...DEFAULT_VIDEO_SETTINGS };
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
  type: "image" | "video";
  sync?: boolean;
}

const IMAGE_PROVIDERS: ImageProvider[] = [
  { id: "kling-image", name: "可灵", desc: "快手 · 高质量", type: "image" },
  { id: "kling", name: "可灵视频", desc: "快手 · 图生视频", type: "video" },
  {
    id: "zhipu-image",
    name: "智谱 CogView",
    desc: "免费额度大",
    type: "image",
  },
  {
    id: "zhipu-video",
    name: "智谱 CogVideoX",
    desc: "免费额度大",
    type: "video",
  },
  {
    id: "wanxiang",
    name: "通义万相",
    desc: "阿里云 · 共用 DashScope Key",
    type: "image",
  },
  { id: "minimax-image", name: "MiniMax", desc: "图片生成", type: "image" },
  {
    id: "dalle",
    name: "DALL-E 3",
    desc: "OpenAI · 高质量",
    type: "image",
    sync: true,
  },
  {
    id: "stability",
    name: "Stability AI",
    desc: "SD3 · 开源模型",
    type: "image",
    sync: true,
  },
  { id: "jimeng", name: "即梦", desc: "火山引擎 · 高质量", type: "image" },
];

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
      return settings.jimengAk && settings.jimengSk ? settings.jimengAk : "";
    default:
      return "";
  }
}

function isImageProvider(providerId: string): boolean {
  const videoProviders = ["kling", "zhipu-video"];
  return !videoProviders.includes(providerId);
}

/* ------------------------------------------------------------------ */
/* Poll helpers                                                        */
/* ------------------------------------------------------------------ */

async function pollTaskStatus(
  taskId: string,
  apiKey: string,
  provider: string,
  onStatus: (status: string) => void,
  signal?: AbortSignal
): Promise<{ status: string; url?: string; error?: string }> {
  const maxAttempts = 120;
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
      const results = output?.results as
        | Array<Record<string, unknown>>
        | undefined;
      if (results && results.length > 0) {
        const url =
          (results[0].url as string) ||
          (results[0].video_url as string) ||
          "";
        return { status: "SUCCEEDED", url };
      }
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

    await new Promise((resolve) => setTimeout(resolve, 5000));
    attempts++;
  }

  return { status: "TIMEOUT", error: "生成超时（超过 10 分钟）" };
}

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
/* Aspect ratio options                                                */
/* ------------------------------------------------------------------ */

const ASPECT_RATIOS = [
  { value: "9:16", label: "9:16 竖屏" },
  { value: "16:9", label: "16:9 横屏" },
  { value: "1:1", label: "1:1 方形" },
];

/* ------------------------------------------------------------------ */
/* Page Component                                                      */
/* ------------------------------------------------------------------ */

export default function ImageGenPage() {
  const [prompt, setPrompt] = useState("");
  const [provider, setProvider] = useState("kling-image");
  const [aspectRatio, setAspectRatio] = useState("9:16");
  const [videoMode, setVideoMode] = useState<"std" | "pro">("std");
  const [videoDuration, setVideoDuration] = useState<5 | 10>(5);
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [settings, setSettings] = useState<VideoApiSettings>({
    ...DEFAULT_VIDEO_SETTINGS,
  });

  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    setSettings(loadVideoApiSettings());
  }, []);

  const currentProviderDef = IMAGE_PROVIDERS.find((p) => p.id === provider);
  const genMode = currentProviderDef?.type === "video" ? "video" : "image";
  const currentApiKey = getApiKeyForProvider(provider, settings);
  const hasCurrentKey = !!currentApiKey;
  const hasAnyKey =
    !!settings.kelingApiKey ||
    !!settings.zhipuApiKey ||
    !!settings.minimaxApiKey ||
    !!settings.openaiApiKey ||
    !!settings.stabilityApiKey ||
    (!!settings.jimengAk && !!settings.jimengSk);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim() || !hasCurrentKey) return;

    setLoading(true);
    setError("");
    setResult(null);
    setStatusText("PENDING");

    const isJimeng = provider === "jimeng";

    try {
      const body: Record<string, unknown> = {
        provider,
        apiKey: currentApiKey,
        prompt: prompt.trim(),
        aspectRatio,
      };

      if (isJimeng) {
        body.ak = settings.jimengAk;
        body.sk = settings.jimengSk;
        const dims =
          aspectRatio === "16:9"
            ? { width: 1920, height: 1080 }
            : aspectRatio === "1:1"
              ? { width: 1080, height: 1080 }
              : { width: 1080, height: 1920 };
        body.width = dims.width;
        body.height = dims.height;
      }

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

      // Synchronous result
      if (data.status === "SUCCEEDED") {
        const output = data.output as Record<string, unknown> | undefined;
        const results = output?.results as
          | Array<Record<string, unknown>>
          | undefined;
        const url = (results?.[0]?.url as string) || "";
        setResult(url);
        return;
      }

      // Async - poll
      const output = data.output as Record<string, unknown> | undefined;
      const taskId = (output?.task_id as string) || "";

      if (!taskId) {
        throw new Error("未获取到任务 ID");
      }

      const abortController = new AbortController();
      abortRef.current = abortController;

      const pollResult = isJimeng
        ? await pollJimengTaskStatus(
            taskId,
            settings.jimengAk,
            settings.jimengSk,
            (status) => setStatusText(status),
            abortController.signal
          )
        : await pollTaskStatus(
            taskId,
            currentApiKey,
            provider,
            (status) => setStatusText(status),
            abortController.signal
          );

      if (pollResult.status === "SUCCEEDED" && pollResult.url) {
        setResult(pollResult.url);
      } else {
        throw new Error(pollResult.error || "生成失败");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "生成失败";
      setError(message);
    } finally {
      setLoading(false);
      setStatusText("");
    }
  }, [
    prompt,
    hasCurrentKey,
    provider,
    currentApiKey,
    aspectRatio,
    settings.jimengAk,
    settings.jimengSk,
    videoMode,
    videoDuration,
  ]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <Palette className="size-5 text-primary" /> {"图片/视频生成"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {"选择 AI 厂商，输入 prompt，直接生图或生视频"}
          </p>
        </div>

        {/* No API key warning */}
        {!hasAnyKey && (
          <Card className="border-amber-200">
            <CardContent className="flex items-start gap-3">
              <AlertCircle className="size-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {
                    "需要配置图片/视频生成 API 才能使用。支持即梦、可灵、智谱、通义万相等多种服务商。"
                  }
                </p>
                <Link href="/settings">
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Settings className="size-3.5" />
                    {"去设置页面配置"}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Prompt input */}
        <Card>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                {"Prompt"}
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="输入英文 prompt，描述你想生成的图片或视频内容..."
                rows={4}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none resize-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 placeholder:text-muted-foreground"
              />
            </div>

            {/* Provider selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                {"选择生成服务"}
              </label>
              <div className="flex flex-wrap gap-2">
                {IMAGE_PROVIDERS.map((p) => {
                  const hasKey = !!getApiKeyForProvider(p.id, settings);
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => hasKey && setProvider(p.id)}
                      disabled={!hasKey}
                      className={cn(
                        "rounded-lg border px-3 py-2 text-sm transition-all",
                        provider === p.id
                          ? "border-primary bg-primary/10 text-primary font-medium"
                          : hasKey
                            ? "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground cursor-pointer"
                            : "border-border/50 text-muted-foreground/40 cursor-not-allowed"
                      )}
                      title={hasKey ? p.desc : `${p.name}: 未配置 API Key`}
                    >
                      <span>{p.name}</span>
                      {p.type === "video" && (
                        <span className="ml-1 text-xs opacity-60">
                          {"视频"}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              {!hasCurrentKey && hasAnyKey && (
                <p className="text-xs text-amber-500">
                  {"当前选中的服务未配置 API Key，请先"}
                  <Link
                    href="/settings"
                    className="text-primary hover:underline ml-0.5"
                  >
                    {"去设置页面配置"}
                  </Link>
                </p>
              )}
            </div>

            {/* Aspect ratio */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                {"画面比例"}
              </label>
              <div className="flex gap-2">
                {ASPECT_RATIOS.map((ar) => (
                  <button
                    key={ar.value}
                    type="button"
                    onClick={() => setAspectRatio(ar.value)}
                    className={cn(
                      "rounded-lg border px-4 py-2 text-sm transition-all cursor-pointer",
                      aspectRatio === ar.value
                        ? "border-primary bg-primary/10 text-primary font-medium"
                        : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                    )}
                  >
                    {ar.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Video-specific options */}
            {genMode === "video" && (
              <div className="flex flex-wrap items-center gap-4">
                {provider === "kling" && (
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">
                      {"质量"}
                    </label>
                    <select
                      value={videoMode}
                      onChange={(e) =>
                        setVideoMode(e.target.value as "std" | "pro")
                      }
                      className="h-8 rounded-lg border border-input bg-background px-2.5 text-sm outline-none"
                    >
                      <option value="std">{"标准"}</option>
                      <option value="pro">{"专业"}</option>
                    </select>
                  </div>
                )}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">
                    {"时长"}
                  </label>
                  <select
                    value={videoDuration}
                    onChange={(e) =>
                      setVideoDuration(Number(e.target.value) as 5 | 10)
                    }
                    className="h-8 rounded-lg border border-input bg-background px-2.5 text-sm outline-none"
                  >
                    <option value={5}>{"5 秒"}</option>
                    <option value={10}>{"10 秒"}</option>
                  </select>
                </div>
              </div>
            )}

            {/* Generate button */}
            <Button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim() || !hasCurrentKey}
              className="w-full gap-2"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  {statusText === "RUNNING"
                    ? "生成中..."
                    : statusText === "PENDING"
                      ? "排队中..."
                      : "处理中..."}
                </>
              ) : (
                <>
                  <ImageIcon className="size-4" />
                  {"生成"}
                  {genMode === "image" ? "图片" : "视频"}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Error */}
        {error && (
          <Card className="border-destructive/50">
            <CardContent className="flex items-start gap-3">
              <AlertCircle className="size-4 text-destructive shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Result */}
        {result && (
          <Card>
            <CardContent className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">
                {"生成结果"}
              </h3>

              <div className="rounded-lg border border-border overflow-hidden bg-muted/30">
                {isImageProvider(provider) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={result}
                    alt="生成的图片"
                    className="w-full max-h-[600px] object-contain mx-auto"
                  />
                ) : (
                  <video
                    src={result}
                    className="w-full max-h-[600px] mx-auto"
                    controls
                    playsInline
                    muted
                    autoPlay
                  />
                )}
              </div>

              <a
                href={result}
                download={`ai-gen-${Date.now()}.${isImageProvider(provider) ? "png" : "mp4"}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="w-full gap-2" size="lg">
                  <Download className="size-4" />
                  {"下载"}
                  {isImageProvider(provider) ? "图片" : "视频"}
                </Button>
              </a>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
