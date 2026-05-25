"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Key,
  Eye,
  EyeOff,
  Check,
  Loader2,
  AlertCircle,
  Zap,
  Server,
  Video,
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  AI_PROVIDERS,
  loadAISettings,
  saveAISettings,
  getProviderById,
  type AISettings,
} from "@/lib/ai-providers";
import { cn } from "@/lib/utils";
import {
  getTokenBalance,
  getTokenLogs,
  type TokenLog,
} from "@/lib/token-store";

const VIDEO_API_STORAGE_KEY = "manga-video-api-settings";

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

function loadVideoApiSettings(): VideoApiSettings {
  if (typeof window === "undefined") return { ...DEFAULT_VIDEO_SETTINGS };
  try {
    const raw = localStorage.getItem(VIDEO_API_STORAGE_KEY);
    return raw ? { ...DEFAULT_VIDEO_SETTINGS, ...JSON.parse(raw) } : { ...DEFAULT_VIDEO_SETTINGS };
  } catch {
    return { ...DEFAULT_VIDEO_SETTINGS };
  }
}

function saveVideoApiSettings(settings: VideoApiSettings): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(VIDEO_API_STORAGE_KEY, JSON.stringify(settings));
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function SettingsPage() {
  // Settings state
  const [settings, setSettings] = useState<AISettings>({
    provider: "minimax",
    model: "MiniMax-M2.7-highspeed",
    apiKey: "",
    mode: "platform",
  });
  const [showApiKey, setShowApiKey] = useState(false);
  const [testStatus, setTestStatus] = useState<
    "idle" | "testing" | "success" | "error"
  >("idle");
  const [testMessage, setTestMessage] = useState("");
  const [saved, setSaved] = useState(false);
  // Video API state
  const [videoSettings, setVideoSettings] = useState<VideoApiSettings>({
    ...DEFAULT_VIDEO_SETTINGS,
  });
  const [showJimengAk, setShowJimengAk] = useState(false);
  const [showJimengSk, setShowJimengSk] = useState(false);
  const [showKelingKey, setShowKelingKey] = useState(false);
  const [showZhipuKey, setShowZhipuKey] = useState(false);
  const [showMinimaxKey, setShowMinimaxKey] = useState(false);
  const [showOpenaiKey, setShowOpenaiKey] = useState(false);
  const [showStabilityKey, setShowStabilityKey] = useState(false);
  const [videoSaved, setVideoSaved] = useState(false);

  // Token state
  const [tokenBalance, setTokenBalanceState] = useState(0);
  const [tokenLogs, setTokenLogs] = useState<TokenLog[]>([]);

  // Load settings on mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Loading from localStorage on mount is intentional
    setSettings(loadAISettings());
    setVideoSettings(loadVideoApiSettings());
    setTokenBalanceState(getTokenBalance());
    setTokenLogs(getTokenLogs());
  }, []);

  // Get current provider info
  const currentProvider = getProviderById(settings.provider);
  const availableModels = currentProvider?.models || [];

  // Handlers
  const handleProviderChange = useCallback(
    (providerId: string) => {
      const provider = getProviderById(providerId);
      const firstModel = provider?.models[0]?.id || "";
      const baseUrl = provider?.defaultBaseUrl || "";
      setSettings((prev) => ({
        ...prev,
        provider: providerId,
        model: firstModel,
        baseUrl,
      }));
      setTestStatus("idle");
    },
    []
  );

  const handleModelChange = useCallback((modelId: string) => {
    setSettings((prev) => ({ ...prev, model: modelId }));
    setTestStatus("idle");
  }, []);

  const handleSave = useCallback(() => {
    saveAISettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, [settings]);

  const handleTest = useCallback(async () => {
    setTestStatus("testing");
    setTestMessage("");

    try {
      const provider = getProviderById(settings.provider);
      const baseUrl = settings.baseUrl || provider?.defaultBaseUrl || "";

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "test",
          mode: "byok",
          provider: settings.provider,
          model: settings.model,
          apiKey: settings.apiKey,
          baseUrl,
        }),
      });

      const data = await res.json() as any;

      if (data.ok) {
        setTestStatus("success");
        setTestMessage("连接成功，API Key 有效");
      } else {
        setTestStatus("error");
        setTestMessage(data.error || "连接失败，请检查 API Key");
      }
    } catch {
      setTestStatus("error");
      setTestMessage("网络错误，请检查网络连接");
    }
  }, [settings]);

  const handleModeChange = useCallback(
    (value: unknown) => {
      const strVal = String(value);
      if (strVal === "video-api") return; // Video API tab doesn't change AI mode
      const mode = strVal === "byok" ? "byok" : "platform";
      setSettings((prev) => ({ ...prev, mode }));
      setTestStatus("idle");

      // Auto-save mode switch
      const updated = { ...settings, mode } as AISettings;
      saveAISettings(updated);
    },
    [settings]
  );

  const handleSaveVideoApi = useCallback(() => {
    saveVideoApiSettings(videoSettings);
    setVideoSaved(true);
    setTimeout(() => setVideoSaved(false), 2000);
  }, [videoSettings]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Key className="size-6 text-primary" />
            AI 设置
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            配置 AI 服务商和模型，支持平台 Token 或自带 API Key 两种模式
          </p>
        </div>

        {/* Mode Tabs */}
        <Tabs
          defaultValue={settings.mode}
          value={undefined}
          onValueChange={handleModeChange}
        >
          <TabsList className="w-full">
            <TabsTrigger value="platform" className="flex-1 gap-1.5">
              <Zap className="size-3.5" />
              平台 Token
            </TabsTrigger>
            <TabsTrigger value="byok" className="flex-1 gap-1.5">
              <Key className="size-3.5" />
              自带 API Key
            </TabsTrigger>
            <TabsTrigger value="video-api" className="flex-1 gap-1.5">
              <Video className="size-3.5" />
              视频 API
            </TabsTrigger>
          </TabsList>

          {/* -------------------------------------------------------- */}
          {/* Tab 1: Platform Token                                     */}
          {/* -------------------------------------------------------- */}
          <TabsContent value="platform">
            <div className="space-y-6 mt-4">
              {/* Current platform info */}
              <Card>
                <CardHeader>
                  <CardTitle>当前平台服务</CardTitle>
                  <CardDescription>
                    使用我们的 AI 服务，文字 AI（剧本/角色/分镜 prompt）按 token 消耗计费
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                      <Server className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        MiniMax M2.7 高速版
                      </p>
                      <p className="text-sm text-muted-foreground">
                        最新旗舰模型，速度快、质量高
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="ml-auto border-primary/40 text-primary"
                    >
                      当前使用
                    </Badge>
                  </div>

                  <div className="mt-4 rounded-lg border border-border bg-muted/30 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        剩余 token
                      </span>
                      <span className="text-sm font-medium text-foreground tabular-nums">
                        {tokenBalance.toLocaleString("zh-CN")}
                      </span>
                    </div>
                  </div>

                  {/* Token Usage Logs */}
                  {tokenLogs.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-foreground mb-2">
                        Token 使用记录
                      </p>
                      <div className="rounded-lg border border-border overflow-hidden">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-border bg-muted/30">
                              <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                                时间
                              </th>
                              <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                                类型
                              </th>
                              <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                                项目
                              </th>
                              <th className="px-3 py-2 text-right font-medium text-muted-foreground">
                                消耗
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                            {[...tokenLogs]
                              .reverse()
                              .slice(0, 20)
                              .map((log, idx) => (
                                <tr key={idx}>
                                  <td className="px-3 py-2 text-xs text-muted-foreground">
                                    {new Date(
                                      log.timestamp
                                    ).toLocaleString("zh-CN")}
                                  </td>
                                  <td className="px-3 py-2 text-xs text-foreground">
                                    {log.type === "script"
                                      ? "剧本生成"
                                      : log.type === "storyboard"
                                        ? "分镜 Prompt"
                                        : log.type ===
                                            "extract-characters"
                                          ? "角色提取"
                                          : log.type}
                                  </td>
                                  <td className="px-3 py-2 text-xs text-muted-foreground">
                                    {log.projectName || "-"}
                                  </td>
                                  <td className="px-3 py-2 text-xs text-right tabular-nums text-foreground">
                                    -{log.tokensUsed.toLocaleString("zh-CN")}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Activation code */}
              <Card>
                <CardHeader>
                  <CardTitle>激活码充值</CardTitle>
                  <CardDescription>
                    输入激活码充值 Token 额度
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <Input
                      type="text"
                      placeholder="输入激活码"
                      className="max-w-xs"
                    />
                    <Button variant="default" size="default">
                      激活
                    </Button>
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">
                    联系客服获取激活码
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* -------------------------------------------------------- */}
          {/* Tab 2: BYOK (Bring Your Own Key)                         */}
          {/* -------------------------------------------------------- */}
          <TabsContent value="byok">
            <div className="space-y-6 mt-4">
              {/* BYOK note */}
              <Card className="border-amber-200 bg-amber-50/50">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="size-5 shrink-0 text-amber-500 mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      自带 Key 模式仅用于文字 AI（剧本/角色/分镜 prompt）。视频生成 API 请在「视频 API」标签页配置。
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>自带 API Key</CardTitle>
                  <CardDescription>
                    填入你自己的 AI 服务 API Key，无 token 限制，按各服务商计费
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Provider selector */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      服务商
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {AI_PROVIDERS.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => handleProviderChange(p.id)}
                          className={cn(
                            "rounded-lg border px-3 py-1.5 text-sm font-medium transition-all",
                            settings.provider === p.id
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                          )}
                        >
                          {p.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Model selector */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      模型
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {availableModels.map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => handleModelChange(m.id)}
                          className={cn(
                            "rounded-lg border px-3 py-1.5 text-sm transition-all",
                            settings.model === m.id
                              ? "border-primary bg-primary/10 text-primary font-medium"
                              : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                          )}
                        >
                          <span>{m.name}</span>
                          <span className="ml-1.5 text-xs opacity-60">
                            {m.description}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* API Key input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      API Key
                    </label>
                    <div className="relative">
                      <Input
                        type={showApiKey ? "text" : "password"}
                        value={settings.apiKey}
                        onChange={(e) => {
                          setSettings((prev) => ({
                            ...prev,
                            apiKey: e.target.value,
                          }));
                          setTestStatus("idle");
                        }}
                        placeholder={
                          settings.provider === "anthropic"
                            ? "sk-ant-..."
                            : "sk-..."
                        }
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showApiKey ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      API Key 仅保存在浏览器本地，不会上传到我们的服务器
                    </p>
                  </div>

                  {/* Base URL */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Base URL
                    </label>
                    <Input
                      type="text"
                      value={
                        settings.baseUrl || currentProvider?.defaultBaseUrl || ""
                      }
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          baseUrl: e.target.value,
                        }))
                      }
                      placeholder={currentProvider?.defaultBaseUrl}
                    />
                    <p className="text-xs text-muted-foreground">
                      默认已填入官方地址，如使用代理服务可自行修改
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3">
                    <Button
                      variant="outline"
                      size="default"
                      onClick={handleTest}
                      disabled={
                        !settings.apiKey || testStatus === "testing"
                      }
                    >
                      {testStatus === "testing" ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          测试中...
                        </>
                      ) : (
                        "测试连接"
                      )}
                    </Button>

                    <Button
                      variant="default"
                      size="default"
                      onClick={handleSave}
                    >
                      {saved ? (
                        <>
                          <Check className="size-4" />
                          已保存
                        </>
                      ) : (
                        "保存设置"
                      )}
                    </Button>
                  </div>

                  {/* Test result */}
                  {testStatus === "success" && (
                    <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
                      <Check className="size-4 shrink-0" />
                      {testMessage}
                    </div>
                  )}
                  {testStatus === "error" && (
                    <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                      <AlertCircle className="size-4 shrink-0" />
                      {testMessage}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* -------------------------------------------------------- */}
          {/* Tab 3: Video API                                          */}
          {/* -------------------------------------------------------- */}
          <TabsContent value="video-api">
            <div className="space-y-6 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>视频生成 API Key</CardTitle>
                  <CardDescription>
                    配置即梦/可灵的 API Key，用于视频生成功能
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Keling / Wanxiang API Key (DashScope) */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      可灵 / 通义万相 API Key（DashScope）
                    </label>
                    <div className="relative">
                      <Input
                        type={showKelingKey ? "text" : "password"}
                        value={videoSettings.kelingApiKey}
                        onChange={(e) =>
                          setVideoSettings((prev) => ({
                            ...prev,
                            kelingApiKey: e.target.value,
                          }))
                        }
                        placeholder="sk-..."
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowKelingKey(!showKelingKey)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showKelingKey ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      同一个 DashScope Key 同时支持可灵和通义万相。获取地址:{" "}
                      <a
                        href="https://dashscope.console.aliyun.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        dashscope.console.aliyun.com
                      </a>
                    </p>
                  </div>

                  {/* Zhipu API Key */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      智谱 API Key（CogView / CogVideoX）
                    </label>
                    <div className="relative">
                      <Input
                        type={showZhipuKey ? "text" : "password"}
                        value={videoSettings.zhipuApiKey}
                        onChange={(e) =>
                          setVideoSettings((prev) => ({
                            ...prev,
                            zhipuApiKey: e.target.value,
                          }))
                        }
                        placeholder="填入智谱 API Key"
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowZhipuKey(!showZhipuKey)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showZhipuKey ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      支持 CogView 图片和 CogVideoX 视频生成，免费额度较大。获取地址:{" "}
                      <a
                        href="https://open.bigmodel.cn"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        open.bigmodel.cn
                      </a>
                    </p>
                  </div>

                  {/* MiniMax API Key */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      MiniMax API Key（图片生成）
                    </label>
                    <div className="relative">
                      <Input
                        type={showMinimaxKey ? "text" : "password"}
                        value={videoSettings.minimaxApiKey}
                        onChange={(e) =>
                          setVideoSettings((prev) => ({
                            ...prev,
                            minimaxApiKey: e.target.value,
                          }))
                        }
                        placeholder="填入 MiniMax API Key"
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowMinimaxKey(!showMinimaxKey)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showMinimaxKey ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      如果已在文字 AI 配置了 MiniMax Key，可复用同一个。获取地址:{" "}
                      <a
                        href="https://platform.minimaxi.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        platform.minimaxi.com
                      </a>
                    </p>
                  </div>

                  {/* OpenAI API Key */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      OpenAI API Key（DALL-E 3）
                    </label>
                    <div className="relative">
                      <Input
                        type={showOpenaiKey ? "text" : "password"}
                        value={videoSettings.openaiApiKey}
                        onChange={(e) =>
                          setVideoSettings((prev) => ({
                            ...prev,
                            openaiApiKey: e.target.value,
                          }))
                        }
                        placeholder="sk-..."
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowOpenaiKey(!showOpenaiKey)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showOpenaiKey ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      如果已在文字 AI 配置了 OpenAI Key，可复用同一个。获取地址:{" "}
                      <a
                        href="https://platform.openai.com/api-keys"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        platform.openai.com
                      </a>
                    </p>
                  </div>

                  {/* Stability AI API Key */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Stability AI API Key（SD3）
                    </label>
                    <div className="relative">
                      <Input
                        type={showStabilityKey ? "text" : "password"}
                        value={videoSettings.stabilityApiKey}
                        onChange={(e) =>
                          setVideoSettings((prev) => ({
                            ...prev,
                            stabilityApiKey: e.target.value,
                          }))
                        }
                        placeholder="sk-..."
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowStabilityKey(!showStabilityKey)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showStabilityKey ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Stable Diffusion 3 图片生成，开源模型。获取地址:{" "}
                      <a
                        href="https://platform.stability.ai/account/keys"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        platform.stability.ai
                      </a>
                    </p>
                  </div>

                  {/* Jimeng AK/SK (火山引擎 V4 签名) */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground">
                      即梦 Access Key / Secret Key（火山引擎）
                    </label>
                    <div className="space-y-2">
                      <div className="relative">
                        <Input
                          type={showJimengAk ? "text" : "password"}
                          value={videoSettings.jimengAk}
                          onChange={(e) =>
                            setVideoSettings((prev) => ({
                              ...prev,
                              jimengAk: e.target.value,
                            }))
                          }
                          placeholder="Access Key (AK)"
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowJimengAk(!showJimengAk)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showJimengAk ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </button>
                      </div>
                      <div className="relative">
                        <Input
                          type={showJimengSk ? "text" : "password"}
                          value={videoSettings.jimengSk}
                          onChange={(e) =>
                            setVideoSettings((prev) => ({
                              ...prev,
                              jimengSk: e.target.value,
                            }))
                          }
                          placeholder="Secret Key (SK)"
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowJimengSk(!showJimengSk)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showJimengSk ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      从火山引擎控制台获取 AK/SK:{" "}
                      <a
                        href="https://console.volcengine.com/iam/keymanage/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        console.volcengine.com &rarr; 密钥管理
                      </a>
                      。即梦使用火山引擎 V4 HMAC-SHA256 签名，AK/SK 仅保存在浏览器本地。
                    </p>
                  </div>

                  {/* Save */}
                  <Button
                    variant="default"
                    size="default"
                    onClick={handleSaveVideoApi}
                  >
                    {videoSaved ? (
                      <>
                        <Check className="size-4" />
                        已保存
                      </>
                    ) : (
                      "保存设置"
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Note */}
              <Card className="border-amber-200 bg-amber-50/50">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="size-5 shrink-0 text-amber-500 mt-0.5" />
                    <div className="text-sm text-muted-foreground">
                      <p>
                        视频生成使用你自己的 API Key，费用由你直接支付给即梦/可灵。我们不收取这部分费用。
                      </p>
                      <p className="mt-1 text-xs">
                        API Key 仅保存在浏览器本地，不会上传到我们的服务器。
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
