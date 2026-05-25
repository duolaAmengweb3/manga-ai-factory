"use client";

import { useState } from "react";
import { Settings, Lightbulb, Check, AlertTriangle, AlertCircle } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { SectionTitle } from "@/components/section-title";
import { CopyButton } from "@/components/copy-button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { parameters } from "@/data/parameters";
import { sceneHitRates } from "@/data/parameters";

type Platform = "jimeng" | "midjourney" | "comfyui";
type SceneType = "对话" | "动作" | "群像" | "特写" | "远景";

const platforms: { key: Platform; label: string }[] = [
  { key: "jimeng", label: "即梦" },
  { key: "midjourney", label: "Midjourney" },
  { key: "comfyui", label: "ComfyUI" },
];

const sceneTypes: SceneType[] = ["对话", "动作", "群像", "特写", "远景"];

const sceneSuggestions: Record<SceneType, string> = {
  对话: "参数保持默认即可，命中率最高",
  动作: "建议 CFG 降低 1-2 点，增加动态感",
  群像: "建议拆成多个单人镜头，群像崩脸率高",
  特写: "角色参考权重可提高 0.1，确保面部稳定",
  远景: "可适当提高去噪强度，远景对一致性要求低",
};

const sceneToHitRateKey: Record<SceneType, string> = {
  对话: "对话场景",
  动作: "动作场景",
  群像: "群像场景",
  特写: "特写场景",
  远景: "远景场景",
};

function parseHitRate(hitRate: string): number {
  // Parse strings like "90%+", "60-70%", "40-50%", "85%+", "75-80%"
  const match = hitRate.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

function getHitRateColor(hitRate: string): string {
  const value = parseHitRate(hitRate);
  if (value >= 90) return "text-green-600";
  if (value >= 70) return "text-yellow-700";
  return "text-orange-600";
}

function getHitRateBg(hitRate: string): string {
  const value = parseHitRate(hitRate);
  if (value >= 90) return "bg-green-50 ring-green-200";
  if (value >= 70) return "bg-yellow-50 ring-yellow-200";
  return "bg-orange-50 ring-orange-200";
}

function getRiskBadge(level: "safe" | "caution" | "danger") {
  switch (level) {
    case "safe":
      return (
        <span className="inline-flex items-center gap-1 text-xs text-green-600">
          <Check className="size-3" />
          <span>安全</span>
        </span>
      );
    case "caution":
      return (
        <span className="inline-flex items-center gap-1 text-xs text-yellow-700">
          <AlertTriangle className="size-3" />
          <span>注意</span>
        </span>
      );
    case "danger":
      return (
        <span className="inline-flex items-center gap-1 text-xs text-red-600">
          <AlertCircle className="size-3" />
          <span>关键</span>
        </span>
      );
  }
}

export default function ParametersPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>("jimeng");
  const [selectedScene, setSelectedScene] = useState<SceneType>("对话");

  const sceneData = sceneHitRates.find(
    (s) => s.scene === sceneToHitRateKey[selectedScene]
  );

  const platformLabel = platforms.find((p) => p.key === selectedPlatform)?.label;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground tracking-tight sm:text-3xl flex items-center gap-2">
            <Settings className="size-6 text-primary" /> 参数速查
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
            选平台 + 选场景，一键查推荐参数
          </p>
        </div>

        {/* Selectors */}
        <Card>
          <CardContent className="space-y-4">
            {/* Platform Selector */}
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                选择平台
              </p>
              <div className="flex flex-wrap gap-2">
                {platforms.map((p) => (
                  <button
                    key={p.key}
                    onClick={() => setSelectedPlatform(p.key)}
                    className={cn(
                      "relative px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                      "ring-1 ring-inset",
                      selectedPlatform === p.key
                        ? "bg-primary/15 text-primary ring-primary/40 shadow-sm shadow-primary/10"
                        : "bg-secondary/50 text-muted-foreground ring-border hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scene Selector */}
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                选择场景
              </p>
              <div className="flex flex-wrap gap-2">
                {sceneTypes.map((scene) => (
                  <button
                    key={scene}
                    onClick={() => setSelectedScene(scene)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      "ring-1 ring-inset",
                      selectedScene === scene
                        ? "bg-primary/15 text-primary ring-primary/40 shadow-sm shadow-primary/10"
                        : "bg-secondary/50 text-muted-foreground ring-border hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    {scene}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Result Panel */}
        <div className="space-y-4">
          {/* Hit Rate + Scene Info */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Hit Rate Card */}
            <Card>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <SectionTitle
                    icon={Settings}
                    title={`${platformLabel} · ${selectedScene}场景`}
                  />
                </div>
                <div className="flex items-baseline gap-3">
                  <p className="text-xs text-muted-foreground">命中率</p>
                  <span
                    className={cn(
                      "text-4xl font-bold tracking-tight",
                      sceneData && getHitRateColor(sceneData.hitRate)
                    )}
                  >
                    {sceneData?.hitRate ?? "—"}
                  </span>
                </div>
                {sceneData && (
                  <div
                    className={cn(
                      "rounded-lg px-3 py-2 ring-1 ring-inset",
                      getHitRateBg(sceneData.hitRate)
                    )}
                  >
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {sceneData.tips}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Scene Suggestion Card */}
            <Card>
              <CardContent className="space-y-3">
                <SectionTitle icon={Lightbulb} title="场景调参建议" />
                <div className="rounded-lg bg-primary/5 px-4 py-3 ring-1 ring-inset ring-primary/20">
                  <p className="text-sm font-medium text-primary leading-relaxed">
                    {sceneSuggestions[selectedScene]}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  以下参数为{platformLabel}在{selectedScene}
                  场景下的推荐值，可直接使用
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Parameter List */}
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {parameters.map((param) => {
                  const value = param[selectedPlatform];
                  return (
                    <div
                      key={param.name}
                      className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-start sm:gap-4"
                    >
                      {/* Parameter Name + Risk */}
                      <div className="flex items-center gap-2 sm:w-40 sm:shrink-0">
                        <span className="text-sm font-medium text-foreground">
                          {param.name}
                        </span>
                        {getRiskBadge(param.riskLevel)}
                      </div>

                      {/* Value + Copy */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2">
                          <p className="flex-1 text-sm text-muted-foreground leading-relaxed break-all">
                            {value}
                          </p>
                          <CopyButton
                            text={value}
                            variant="compact"
                            className="shrink-0 mt-0.5"
                          />
                        </div>
                        {param.notes && (
                          <p className="mt-1.5 text-xs text-muted-foreground/70 leading-relaxed">
                            {param.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
