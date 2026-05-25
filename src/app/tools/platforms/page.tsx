"use client";

import { useState } from "react";
import {
  ExternalLink,
  Calculator,
  TableProperties,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { SectionTitle } from "@/components/section-title";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { platformRules } from "@/data/platform-rules";

/* ───── Revenue Calculator Data ───── */

interface RevenueRow {
  label: string;
  ratePerTenThousand: number;
  exclusive?: boolean;
}

const revenueRows: RevenueRow[] = [
  { label: "抖音中视频", ratePerTenThousand: 60 },
  { label: "快手磁力聚星", ratePerTenThousand: 40 },
  { label: "B站激励", ratePerTenThousand: 25 },
  { label: "红果（独家）", ratePerTenThousand: 80, exclusive: true },
  { label: "红果（非独家）", ratePerTenThousand: 50 },
  { label: "腾讯火龙（独家）", ratePerTenThousand: 100, exclusive: true },
];

// Sum for "full exclusive" = 抖音 + 快手 + B站 + 红果独家 + 腾讯火龙独家
const exclusiveTotalKeys = [0, 1, 2, 3, 5]; // indices

function formatRevenue(value: number): string {
  if (value >= 10000) {
    const wan = value / 10000;
    return `¥${wan % 1 === 0 ? wan.toFixed(0) : wan.toFixed(1)}万`;
  }
  return `¥${value.toLocaleString("zh-CN")}`;
}

function calculateRevenue(views: number, ratePerTenThousand: number): number {
  return (views / 10000) * ratePerTenThousand;
}

/* ───── Platform Rules Table ───── */

function PlatformRulesTable() {
  return (
    <div className="space-y-4">
      <SectionTitle
        icon={TableProperties}
        title="平台对比表"
        description="6 大平台入驻规则一览"
      />
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    平台
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    粉丝门槛
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    分成比例
                  </th>
                  <th className="px-4 py-3 text-center font-medium text-muted-foreground">
                    备案
                  </th>
                  <th className="px-4 py-3 text-center font-medium text-muted-foreground">
                    AI标注
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    提现门槛
                  </th>
                  <th className="px-4 py-3 text-center font-medium text-muted-foreground">
                    入口
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {platformRules.map((platform) => (
                  <TooltipProvider key={platform.id}>
                    <tr className="group transition-colors hover:bg-muted/30">
                      <td className="px-4 py-3">
                        <Tooltip>
                          <TooltipTrigger className="text-left">
                            <span className="font-semibold text-foreground cursor-help border-b border-dashed border-muted-foreground/30">
                              {platform.name}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent
                            side="bottom"
                            className="max-w-xs"
                          >
                            {platform.notes}
                          </TooltipContent>
                        </Tooltip>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {platform.followerThreshold}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {platform.revenueShare}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {platform.filingRequired ? (
                          <Badge
                            variant="destructive"
                            className="text-[10px] px-1.5"
                          >
                            必须
                          </Badge>
                        ) : (
                          <Badge
                            variant="secondary"
                            className="text-[10px] px-1.5"
                          >
                            推荐
                          </Badge>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {platform.aiLabelRequired ? (
                          <Badge
                            variant="destructive"
                            className="text-[10px] px-1.5"
                          >
                            必须
                          </Badge>
                        ) : (
                          <Badge
                            variant="secondary"
                            className="text-[10px] px-1.5"
                          >
                            推荐
                          </Badge>
                        )}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {platform.withdrawalMin}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <a
                          href={platform.entryUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center size-7 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                        >
                          <ExternalLink className="size-3.5" />
                          <span className="sr-only">
                            前往{platform.name}
                          </span>
                        </a>
                      </td>
                    </tr>
                  </TooltipProvider>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ───── Revenue Calculator ───── */

function RevenueCalculator() {
  const [views, setViews] = useState<string>("");

  const viewCount = parseInt(views, 10) || 0;
  const hasInput = viewCount > 0;

  // Calculate revenues
  const revenues = revenueRows.map((row) => ({
    ...row,
    revenue: hasInput ? calculateRevenue(viewCount, row.ratePerTenThousand) : 0,
    formula: hasInput
      ? `${viewCount.toLocaleString("zh-CN")} ÷ 10000 × ${row.ratePerTenThousand}`
      : "—",
  }));

  // Find highest revenue index
  const maxRevenue = hasInput
    ? Math.max(...revenues.map((r) => r.revenue))
    : 0;

  // Calculate exclusive total
  const exclusiveTotal = hasInput
    ? exclusiveTotalKeys.reduce((sum, i) => sum + revenues[i].revenue, 0)
    : 0;

  return (
    <div className="space-y-4">
      <SectionTitle
        icon={Calculator}
        title="收益计算器"
        description="输入预估播放量，实时计算各平台收益"
      />

      <Card>
        <CardContent className="space-y-4">
          {/* Input */}
          <div className="space-y-2">
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              播放量
            </label>
            <Input
              type="number"
              placeholder="例如 100000"
              value={views}
              onChange={(e) => setViews(e.target.value)}
              className="h-11 text-lg font-medium"
            />
          </div>

          {/* Revenue Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-3 py-2.5 text-left font-medium text-muted-foreground">
                    平台
                  </th>
                  <th className="px-3 py-2.5 text-left font-medium text-muted-foreground hidden sm:table-cell">
                    计算方式
                  </th>
                  <th className="px-3 py-2.5 text-right font-medium text-muted-foreground">
                    预估收入
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {revenues.map((row) => {
                  const isHighest =
                    hasInput && row.revenue === maxRevenue && maxRevenue > 0;
                  return (
                    <tr
                      key={row.label}
                      className={cn(
                        "transition-colors",
                        isHighest && "bg-primary/5"
                      )}
                    >
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "font-medium",
                              isHighest
                                ? "text-primary"
                                : "text-foreground"
                            )}
                          >
                            {row.label}
                          </span>
                          {isHighest && (
                            <TrendingUp className="size-3.5 text-primary" />
                          )}
                        </div>
                      </td>
                      <td className="px-3 py-2.5 text-muted-foreground font-mono text-xs hidden sm:table-cell">
                        {row.formula}
                      </td>
                      <td
                        className={cn(
                          "px-3 py-2.5 text-right font-semibold tabular-nums text-base",
                          hasInput
                            ? isHighest
                              ? "text-primary"
                              : "text-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        {hasInput ? formatRevenue(row.revenue) : "—"}
                      </td>
                    </tr>
                  );
                })}

                {/* Total Row */}
                <tr className="bg-muted/30">
                  <td className="px-3 py-3">
                    <span className="font-bold text-foreground">
                      合计（全平台独家）
                    </span>
                  </td>
                  <td className="px-3 py-3 hidden sm:table-cell" />
                  <td className="px-3 py-3 text-right">
                    <span
                      className={cn(
                        "text-lg font-bold tabular-nums",
                        hasInput ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                      {hasInput ? formatRevenue(exclusiveTotal) : "—"}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {hasInput && (
            <p className="text-xs text-muted-foreground text-center">
              以上为预估收入，实际收入受内容质量、粉丝量、平台算法等因素影响
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

/* ───── Main Page ───── */

export default function PlatformsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground tracking-tight sm:text-3xl flex items-center gap-2">
            <BarChart3 className="size-6 text-primary" /> 平台规则
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
            6 大平台规则速查 + 收益计算器
          </p>
        </div>

        {/* Section 1: Platform Rules Table */}
        <PlatformRulesTable />

        {/* Section 2: Revenue Calculator */}
        <RevenueCalculator />
      </div>
    </DashboardLayout>
  );
}
