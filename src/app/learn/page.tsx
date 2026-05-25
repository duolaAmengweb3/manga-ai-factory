import Link from "next/link";
import {
  Film,
  PenTool,
  Users,
  Frame,
  Video,
  Headphones,
  Scissors,
  Upload,
  TrendingUp,
  BookOpen,
  Map,
  TrendingUp as TrendingUpIcon,
  Lightbulb,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* ───── Data ───── */

const roadmapItems: {
  number: number;
  icon: LucideIcon;
  title: string;
  desc: string;
  href: string;
  anchor?: boolean;
}[] = [
  {
    number: 1,
    icon: Film,
    title: "AI漫剧入门",
    desc: "了解行业现状、工具生态、市场机会与制作流程",
    href: "#overview",
    anchor: true,
  },
  {
    number: 2,
    icon: PenTool,
    title: "剧本创作",
    desc: "选题方法、剧本结构、AI写本技巧、爽点设计公式",
    href: "/learn/script",
  },
  {
    number: 3,
    icon: Users,
    title: "角色与一致性",
    desc: "角色卡制作、5种一致性方案对比、崩脸排查",
    href: "/learn/characters",
  },
  {
    number: 4,
    icon: Frame,
    title: "分镜与Prompt",
    desc: "镜头语言基础、Prompt结构公式、构图技巧",
    href: "/learn/storyboard",
  },
  {
    number: 5,
    icon: Video,
    title: "视频生成",
    desc: "即梦/可灵/Seedance 2.0实操、参数调优",
    href: "/learn/video",
  },
  {
    number: 6,
    icon: Headphones,
    title: "配音与音效",
    desc: "TTS工具对比、BGM生成、音效素材库",
    href: "/learn/audio",
  },
  {
    number: 7,
    icon: Scissors,
    title: "剪辑合成",
    desc: "剪映工作流、节奏控制、字幕与特效",
    href: "/learn/editing",
  },
  {
    number: 8,
    icon: Upload,
    title: "发布与备案",
    desc: "各平台规则、AI标注要求、备案流程",
    href: "/learn/publishing",
  },
  {
    number: 9,
    icon: TrendingUp,
    title: "变现与运营",
    desc: "流量分成、CPS、投流技巧、账号矩阵",
    href: "/learn/monetization",
  },
];

const quickStats = [
  { label: "2026 市场规模", value: "220亿", unit: "元", color: "text-primary" },
  {
    label: "单集制作成本",
    value: "0-60",
    unit: "元",
    color: "text-emerald-600",
  },
  {
    label: "单人日产量",
    value: "1-3",
    unit: "集",
    color: "text-amber-600",
  },
  {
    label: "主流平台分成",
    value: "40-90",
    unit: "%",
    color: "text-violet-600",
  },
];

const pipelineSteps = [
  { step: "故事构思", tool: "豆包/DeepSeek", time: "15-30分钟", cost: "免费", ai: true },
  { step: "写剧本", tool: "豆包/Kimi/ChatGPT", time: "20-40分钟", cost: "免费", ai: true },
  { step: "设定角色", tool: "即梦/MJ + 手动调整", time: "30-60分钟", cost: "¥0-5", ai: true },
  { step: "画分镜", tool: "即梦/可灵/MJ", time: "40-90分钟", cost: "¥5-20", ai: true },
  { step: "生成视频", tool: "Seedance/可灵/Vidu", time: "30-60分钟", cost: "¥10-30", ai: true },
  { step: "配音", tool: "豆包TTS/讯飞", time: "10-20分钟", cost: "免费", ai: true },
  { step: "剪辑", tool: "剪映", time: "30-60分钟", cost: "免费", ai: false },
  { step: "发布", tool: "各平台后台", time: "10-15分钟", cost: "免费", ai: false },
];

const toolEcosystem = [
  {
    category: "剧本",
    tools: [
      { name: "豆包", purpose: "AI写剧本/改写", price: "免费" },
      { name: "DeepSeek-R1", purpose: "长文剧本/复杂逻辑", price: "免费" },
      { name: "Kimi", purpose: "长上下文剧本", price: "免费" },
      { name: "ChatGPT", purpose: "英文prompt优化", price: "$20/月" },
    ],
  },
  {
    category: "图片生成",
    tools: [
      { name: "即梦 (Dreamina)", purpose: "文生图/图生图/角色参考", price: "¥69-299/月" },
      { name: "Midjourney", purpose: "高质量漫画风格图", price: "$10-30/月" },
      { name: "可灵 (Kling)", purpose: "文生图+视频一体化", price: "¥66-399/月" },
      { name: "Stable Diffusion", purpose: "本地部署/LoRA训练", price: "免费(需显卡)" },
    ],
  },
  {
    category: "视频生成",
    tools: [
      { name: "Seedance 2.0", purpose: "图生视频/最强动态", price: "按量计费" },
      { name: "可灵 1.6", purpose: "图生视频/口型同步", price: "按量计费" },
      { name: "Vidu 2.0", purpose: "图生视频/人物动态", price: "按量计费" },
      { name: "即梦视频", purpose: "图生视频/字节生态", price: "按量计费" },
    ],
  },
  {
    category: "配音",
    tools: [
      { name: "豆包TTS", purpose: "中文语音合成", price: "免费" },
      { name: "讯飞语音", purpose: "多情感语音", price: "免费-低" },
      { name: "Fish Audio", purpose: "声音克隆/高质量", price: "免费-低" },
      { name: "ElevenLabs", purpose: "英文/多语种配音", price: "$5-22/月" },
    ],
  },
  {
    category: "音乐/音效",
    tools: [
      { name: "Suno", purpose: "AI生成BGM", price: "免费-$10/月" },
      { name: "Udio", purpose: "AI生成BGM", price: "免费-$10/月" },
      { name: "爱给网", purpose: "免费音效素材", price: "免费" },
      { name: "Pixabay Music", purpose: "免版权BGM", price: "免费" },
    ],
  },
  {
    category: "剪辑",
    tools: [
      { name: "剪映", purpose: "视频剪辑/字幕/特效", price: "免费" },
      { name: "Premiere Pro", purpose: "专业剪辑", price: "¥154/月" },
      { name: "DaVinci Resolve", purpose: "专业调色/剪辑", price: "免费" },
    ],
  },
  {
    category: "一站式平台",
    tools: [
      { name: "有戏AI", purpose: "全流程AI漫剧制作", price: "免费-¥499/月" },
      { name: "漫小芽", purpose: "模板化漫剧制作", price: "免费-低" },
      { name: "纳米AI短剧", purpose: "抖音生态漫剧工具", price: "免费" },
      { name: "星火短剧", purpose: "快手生态工具", price: "免费" },
    ],
  },
];

const costModes = [
  {
    mode: "极省模式",
    toolCost: "¥0-100/月",
    timeCost: "4-6小时/集",
    suitable: "纯新手试水",
    tools: "免费额度 + 剪映",
    desc: "用各平台免费额度拼凑，质量有限但零门槛",
  },
  {
    mode: "效率模式",
    toolCost: "¥100-500/月",
    timeCost: "2-3小时/集",
    suitable: "认真做的个人",
    tools: "即梦会员 + 可灵/Seedance + 剪映",
    desc: "主力投入图片和视频生成，性价比最高的方案",
  },
  {
    mode: "工作室模式",
    toolCost: "¥500-2000/月",
    timeCost: "1-2小时/集",
    suitable: "小团队批量生产",
    tools: "MJ + 多个视频模型 + 专业剪辑",
    desc: "多模型并行生成、批量产出、追求质量上限",
  },
];

export const metadata = { title: "AI 漫剧知识库" };

/* ───── Page ───── */

export default function LearnPage() {
  return (
    <DashboardLayout>
      <div className="space-y-12">
        {/* ── Header ── */}
        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-foreground tracking-tight sm:text-3xl flex items-center gap-2">
            <BookOpen className="size-6 text-primary" /> AI 漫剧知识库
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
            从零到一，全面掌握 AI 漫剧制作
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
            这是一份完整的 AI 漫剧制作指南。无论你是零基础新手还是有经验的创作者，
            都能在这里找到你需要的知识。每个主题都包含实操步骤、工具推荐、Prompt
            模板和避坑指南。
          </p>
        </div>

        {/* ── Quick Stats ── */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {quickStats.map((stat) => (
            <Card key={stat.label} size="sm">
              <CardContent className="text-center space-y-1">
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className={`text-2xl font-bold tabular-nums ${stat.color}`}>
                  {stat.value}
                  <span className="text-sm font-normal text-muted-foreground ml-0.5">
                    {stat.unit}
                  </span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── Table of Contents / Roadmap ── */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Map className="size-5 text-primary" /> 阅读路线图
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {roadmapItems.map((item) => (
              <Link
                key={item.number}
                href={item.href}
                className="block group"
              >
                <Card className="h-full transition-colors group-hover:ring-primary/30">
                  <CardContent className="flex items-start gap-3">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                      {item.number}
                    </span>
                    <div className="space-y-1 min-w-0">
                      <p className="font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                        <item.icon className="size-4 text-muted-foreground" /> {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="border-t border-border" />

        {/* ═══════════════════════════════════════════
            SECTION: 入门概览 (inline on /learn page)
            ═══════════════════════════════════════════ */}

        {/* ── What is AI漫剧 ── */}
        <section id="overview">
          <h2 className="text-xl font-bold text-foreground mb-1">
            什么是 AI 漫剧
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            理解 AI 漫剧的定义、形态和与传统内容的区别
          </p>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>定义</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground">AI 漫剧</strong>
                  是指用 AI 技术（文生图 + 图生视频 + TTS 配音）制作的漫画风格短剧。
                  它不是传统意义上的&quot;动画&quot;——角色不需要逐帧绘制，也不是&quot;真人短剧&quot;——不需要演员、场地和摄影设备。
                </p>
                <p>
                  典型的 AI 漫剧呈现为：竖屏 9:16 比例、每集 1-3 分钟、日更或隔日更新、
                  漫画/半写实风格、配合 AI 语音旁白和字幕。
                </p>
              </CardContent>
            </Card>

            <div className="grid gap-3 sm:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">vs 传统动画</CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground space-y-2">
                  <div className="flex justify-between">
                    <span>制作成本</span>
                    <span className="text-foreground font-medium">
                      降低 95%+
                    </span>
                  </div>
                  <p>
                    传统动画 1-10万/分钟，AI漫剧 500-2000元/分钟。
                    不需要原画师、中间帧、动画组，一个人就能完成。
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">vs 真人短剧</CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground space-y-2">
                  <div className="flex justify-between">
                    <span>启动门槛</span>
                    <span className="text-foreground font-medium">
                      几乎为零
                    </span>
                  </div>
                  <p>
                    不需要演员、场地、灯光、化妆、摄影。
                    一台电脑+几个AI工具账号即可开始。适合个人创作者。
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">vs 图文漫画</CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground space-y-2">
                  <div className="flex justify-between">
                    <span>变现效率</span>
                    <span className="text-foreground font-medium">
                      高 3-5 倍
                    </span>
                  </div>
                  <p>
                    视频形态天然适合抖音/快手分发，完播率和互动率远高于图文。
                    平台流量分成收入更高。
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* ── 2026 Market Status ── */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-1">
            2026 市场现状
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            爆发式增长中，但需要清醒认知
          </p>

          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-emerald-600 flex items-center gap-1.5">
                    <TrendingUpIcon className="size-4" /> 增长数据
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <ul className="space-y-1.5">
                    <li>
                      <strong className="text-foreground">市场规模：</strong>
                      2026年预计 220亿元，同比增长 +276%
                    </li>
                    <li>
                      <strong className="text-foreground">日上线量：</strong>
                      全网日均 470+ 部新作品上线
                    </li>
                    <li>
                      <strong className="text-foreground">用户规模：</strong>
                      短剧用户超 6 亿，AI漫剧渗透率快速提升
                    </li>
                    <li>
                      <strong className="text-foreground">头部爆款：</strong>
                      单部充值流水可达千万级别
                    </li>
                    <li>
                      <strong className="text-foreground">融资热度：</strong>
                      多家AI短剧公司获得 A 轮以上融资
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-amber-600 flex items-center gap-1.5">
                    <AlertTriangle className="size-4" /> 行业现实
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <ul className="space-y-1.5">
                    <li>
                      <strong className="text-foreground">亏损率：</strong>
                      90% 非头部项目处于亏损状态
                    </li>
                    <li>
                      <strong className="text-foreground">爆款率：</strong>
                      仅 0.16% 的作品能成为真正爆款
                    </li>
                    <li>
                      <strong className="text-foreground">同质化：</strong>
                      大量&quot;战神&quot;&quot;逆袭&quot;题材严重内卷
                    </li>
                    <li>
                      <strong className="text-foreground">技术门槛降低：</strong>
                      一站式工具普及，竞争更激烈
                    </li>
                    <li>
                      <strong className="text-foreground">政策收紧：</strong>
                      广电对AI生成内容的标注和备案要求趋严
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="text-sm">
                <p className="font-semibold text-foreground mb-2 flex items-center gap-1.5">
                  <Lightbulb className="size-4 text-primary" /> 个人创作者的机会在哪？
                </p>
                <div className="text-muted-foreground space-y-1.5">
                  <p>
                    虽然投流赚差价的模式竞争激烈，但
                    <strong className="text-foreground">轻量模式仍然跑得通</strong>：
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      <strong className="text-foreground">流量分成：</strong>
                      多平台分发，靠播放量赚广告分成。10万播放 = ¥300-600。不需要投流。
                    </li>
                    <li>
                      <strong className="text-foreground">CPS 分销：</strong>
                      不用自己做剧，帮平台推广已有短剧，按充值分成。
                    </li>
                    <li>
                      <strong className="text-foreground">知识付费：</strong>
                      教别人做AI漫剧，本身就是变现方式。
                    </li>
                    <li>
                      <strong className="text-foreground">垂直细分：</strong>
                      避开战神/逆袭红海，做教育、科普、地方文化等蓝海题材。
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">主要平台</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                          平台
                        </th>
                        <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                          特点
                        </th>
                        <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                          分成
                        </th>
                        <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                          适合
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="px-3 py-2 font-medium text-foreground">
                          抖音
                        </td>
                        <td className="px-3 py-2 text-muted-foreground">
                          流量最大、算法推荐强
                        </td>
                        <td className="px-3 py-2 text-muted-foreground">
                          ¥60/万播放
                        </td>
                        <td className="px-3 py-2 text-muted-foreground">
                          爽剧、快节奏
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-medium text-foreground">
                          快手
                        </td>
                        <td className="px-3 py-2 text-muted-foreground">
                          下沉市场、粘性高
                        </td>
                        <td className="px-3 py-2 text-muted-foreground">
                          ¥40/万播放
                        </td>
                        <td className="px-3 py-2 text-muted-foreground">
                          家庭情感、接地气
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-medium text-foreground">
                          B站
                        </td>
                        <td className="px-3 py-2 text-muted-foreground">
                          年轻用户、弹幕文化
                        </td>
                        <td className="px-3 py-2 text-muted-foreground">
                          ¥25/万播放
                        </td>
                        <td className="px-3 py-2 text-muted-foreground">
                          长叙事、二次元
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-medium text-foreground">
                          红果短剧
                        </td>
                        <td className="px-3 py-2 text-muted-foreground">
                          字节系、短剧专属
                        </td>
                        <td className="px-3 py-2 text-muted-foreground">
                          ¥50-80/万播放
                        </td>
                        <td className="px-3 py-2 text-muted-foreground">
                          连续剧、付费剧
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-medium text-foreground">
                          腾讯火龙
                        </td>
                        <td className="px-3 py-2 text-muted-foreground">
                          分成最高、独家优惠
                        </td>
                        <td className="px-3 py-2 text-muted-foreground">
                          ¥100/万播放(独家)
                        </td>
                        <td className="px-3 py-2 text-muted-foreground">
                          精品剧、高制作
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-medium text-foreground">
                          优酷
                        </td>
                        <td className="px-3 py-2 text-muted-foreground">
                          阿里系、长视频基因
                        </td>
                        <td className="px-3 py-2 text-muted-foreground">
                          约¥30-50/万播放
                        </td>
                        <td className="px-3 py-2 text-muted-foreground">
                          中长叙事
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ── Production Pipeline ── */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-1">
            一条 AI 漫剧是怎么做出来的
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            8 个步骤，从想法到发布
          </p>

          {/* Pipeline visual */}
          <Card className="mb-4">
            <CardContent>
              <div className="flex flex-wrap items-center gap-1 text-xs font-mono justify-center py-2">
                {pipelineSteps.map((s, i) => (
                  <span key={s.step} className="flex items-center gap-1">
                    <span
                      className={`px-2 py-1 rounded ${
                        s.ai
                          ? "bg-primary/10 text-primary font-medium"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {s.step}
                      {s.ai && (
                        <span className="ml-1 text-[10px] opacity-70">AI</span>
                      )}
                    </span>
                    {i < pipelineSteps.length - 1 && (
                      <span className="text-muted-foreground">{"\u{2192}"}</span>
                    )}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                        步骤
                      </th>
                      <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                        工具
                      </th>
                      <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                        耗时
                      </th>
                      <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                        成本
                      </th>
                      <th className="px-4 py-2.5 text-center font-medium text-muted-foreground">
                        AI参与
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {pipelineSteps.map((s) => (
                      <tr key={s.step}>
                        <td className="px-4 py-2.5 font-medium text-foreground">
                          {s.step}
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          {s.tool}
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          {s.time}
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          {s.cost}
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          {s.ai ? (
                            <Badge
                              variant="default"
                              className="text-[10px] px-1.5"
                            >
                              AI
                            </Badge>
                          ) : (
                            <Badge
                              variant="secondary"
                              className="text-[10px] px-1.5"
                            >
                              手动
                            </Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-3 border-primary/20 bg-primary/5">
            <CardContent className="text-sm">
              <p className="font-semibold text-foreground mb-1 flex items-center gap-1.5">
                <Lightbulb className="size-4 text-primary" /> 关键认知
              </p>
              <p className="text-muted-foreground">
                整个流程中，<strong className="text-foreground">8 个环节有 6 个可以用 AI 完成</strong>。
                剪辑和发布仍需人工，但耗时占比不到 30%。一个人完全可以独立完成全流程。
                效率模式下，单集总耗时 2-3 小时，成本 ¥15-55。
              </p>
            </CardContent>
          </Card>
        </section>

        {/* ── Tool Ecosystem ── */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-1">
            工具生态全景
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            7 大类别、30+ 工具，按需选择
          </p>

          <div className="space-y-4">
            {toolEcosystem.map((cat) => (
              <Card key={cat.category}>
                <CardHeader>
                  <CardTitle className="text-sm">
                    {cat.category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="px-4 py-2 text-left font-medium text-muted-foreground">
                            工具
                          </th>
                          <th className="px-4 py-2 text-left font-medium text-muted-foreground">
                            用途
                          </th>
                          <th className="px-4 py-2 text-left font-medium text-muted-foreground">
                            价格
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {cat.tools.map((tool) => (
                          <tr key={tool.name}>
                            <td className="px-4 py-2 font-medium text-foreground">
                              {tool.name}
                            </td>
                            <td className="px-4 py-2 text-muted-foreground">
                              {tool.purpose}
                            </td>
                            <td className="px-4 py-2 text-muted-foreground">
                              {tool.price}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ── Cost & Time ── */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-1">
            成本与时间
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            三种投入模式，按自身情况选择
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            {costModes.map((mode) => (
              <Card key={mode.mode} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{mode.mode}</CardTitle>
                  <CardDescription>{mode.desc}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 space-y-3 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">工具成本</span>
                      <span className="font-medium text-foreground">
                        {mode.toolCost}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">时间成本</span>
                      <span className="font-medium text-foreground">
                        {mode.timeCost}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">适合</span>
                      <span className="font-medium text-foreground">
                        {mode.suitable}
                      </span>
                    </div>
                  </div>
                  <div className="border-t border-border pt-2">
                    <p className="text-xs text-muted-foreground">
                      <strong className="text-foreground">推荐工具：</strong>
                      {mode.tools}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-4 border-amber-200 bg-amber-50/50">
            <CardContent className="text-sm">
              <p className="font-semibold text-foreground mb-1 flex items-center gap-1.5">
                <AlertTriangle className="size-4 text-amber-600" /> 新手建议
              </p>
              <p className="text-muted-foreground">
                强烈建议从<strong className="text-foreground">极省模式</strong>起步，
                先跑通一遍完整流程。确认自己能持续产出后，再升级到效率模式。
                不要一上来就买齐所有工具会员——很多人买完发现自己不适合做这个，白花钱。
              </p>
            </CardContent>
          </Card>
        </section>

        {/* ── Next Steps ── */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">
            下一步
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link href="/learn/script" className="block group">
              <Card className="h-full transition-colors group-hover:ring-primary/30">
                <CardContent className="flex items-center gap-3">
                  <PenTool className="size-5 text-muted-foreground shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      剧本创作 {"\u{2192}"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      学习选题方法、剧本结构和 AI 写剧本技巧
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/learn/characters" className="block group">
              <Card className="h-full transition-colors group-hover:ring-primary/30">
                <CardContent className="flex items-center gap-3">
                  <Users className="size-5 text-muted-foreground shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      角色与一致性 {"\u{2192}"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      掌握角色卡制作和防崩脸技术
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
