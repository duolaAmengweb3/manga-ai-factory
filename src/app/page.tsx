import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  FileText,
  Wand2,
  PenLine,
  MessageSquare,
  Heading,
  Image,
  Import,
  Lightbulb,
  LayoutGrid,
  Users,
  Palette,
  Film,
  Wrench,
  Mic,
  BarChart3,
  Settings,
  BookOpen,
  Send,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const standaloneTools: {
  icon: LucideIcon;
  title: string;
  description: string;
  badge: "ai" | "free";
  href: string;
}[] = [
  {
    icon: FileText,
    title: "剧本生成器",
    description: "输入故事概要，AI 生成结构化分集剧本",
    badge: "ai" as const,
    href: "/tools/script",
  },
  {
    icon: LayoutGrid,
    title: "分镜 Prompt 生成",
    description: "导入剧本 + 角色，AI 逐镜头生成英文 prompt",
    badge: "ai" as const,
    href: "/tools/storyboard",
  },
  {
    icon: Users,
    title: "角色管理器",
    description: "创建角色档案，自动生成角色 prompt 模板",
    badge: "free" as const,
    href: "/tools/characters",
  },
  {
    icon: Palette,
    title: "图片/视频生成",
    description: "8 大厂商 AI 生图/生视频，输入 prompt 直接生成",
    badge: "ai" as const,
    href: "/tools/image-gen",
  },
  {
    icon: Film,
    title: "视频合成",
    description: "上传图片+音频，浏览器端合成 MP4",
    badge: "free" as const,
    href: "/tools/composer",
  },
  {
    icon: Wrench,
    title: "Prompt 组装器",
    description: "选词拼接，生成可直接复制的英文 prompt",
    badge: "free" as const,
    href: "/tools/prompt-builder",
  },
  {
    icon: Mic,
    title: "配音工具",
    description: "台词格式化 + TTS 工具直达 + 音色推荐",
    badge: "free" as const,
    href: "/tools/tts",
  },
  {
    icon: BarChart3,
    title: "平台规则",
    description: "6 平台分成/备案规则 + 收益计算器",
    badge: "free" as const,
    href: "/tools/platforms",
  },
  {
    icon: Settings,
    title: "参数速查",
    description: "选平台+场景，一键查推荐参数",
    badge: "free" as const,
    href: "/tools/parameters",
  },
];

const workflowSteps = [
  {
    step: 1,
    title: "概要",
    subtitle: "选题材",
    detail: "AI 想故事",
    aiDoes: "根据题材自动生成故事概要、世界观、核心冲突",
    userDoes: "选择题材，或输入你的想法",
  },
  {
    step: 2,
    title: "角色",
    subtitle: "AI 设计",
    detail: "3-5 个角色",
    aiDoes: "自动设计角色外貌、性格、关系，生成角色 prompt",
    userDoes: "确认或调整角色设定",
  },
  {
    step: 3,
    title: "大纲",
    subtitle: "AI 生成",
    detail: "全集大纲",
    aiDoes: "根据概要和角色，生成完整的多集大纲",
    userDoes: "浏览大纲，决定集数和节奏",
  },
  {
    step: 4,
    title: "剧本",
    subtitle: "AI 编写",
    detail: "逐集分镜",
    aiDoes: "按大纲逐集编写完整剧本，含对白和画面描述",
    userDoes: "审阅剧本，使用 AI 工具润色或改写",
  },
  {
    step: 5,
    title: "分镜",
    subtitle: "AI 生成",
    detail: "英文 prompt",
    aiDoes: "将剧本逐镜头转化为英文绘图 prompt",
    userDoes: "确认 prompt，微调细节",
  },
  {
    step: 6,
    title: "生图",
    subtitle: "8 大厂商",
    detail: "一键出图",
    aiDoes: "调用你选择的 AI 厂商 API 批量生成图片",
    userDoes: "选择厂商和参数，查看生成结果",
  },
  {
    step: 7,
    title: "合成",
    subtitle: "浏览器端",
    detail: "直接导出",
    aiDoes: "浏览器端合成 MP4 视频，支持剪映导出",
    userDoes: "添加配音，导出成片",
  },
];

const creativeTools = [
  {
    icon: <PenLine className="size-5" />,
    title: "续写后续",
    description: "写了一半不知道后面怎么发展？AI 帮你续写剧情，保持角色和风格一致",
  },
  {
    icon: <Wand2 className="size-5" />,
    title: "改写剧情",
    description: "觉得某段太平淡？告诉 AI 你想怎么改，一键重写指定段落",
  },
  {
    icon: <Sparkles className="size-5" />,
    title: "爽点优化",
    description: "一键让 AI 加反转、钩子、高潮点，让读者停不下来",
  },
  {
    icon: <MessageSquare className="size-5" />,
    title: "台词润色",
    description: "一键去 AI 味，让对白更自然有个性，像真人在说话",
  },
  {
    icon: <Heading className="size-5" />,
    title: "标题生成",
    description: "AI 批量生成 10 个爆款标题，自带钩子和悬念",
  },
  {
    icon: <Image className="size-5" />,
    title: "封面 Prompt",
    description: "AI 根据剧情自动生成封面图 prompt，直接用来生图",
  },
];

const aiProviders = [
  { name: "即梦 Seedream", type: "文生图 / 图生视频" },
  { name: "可灵 Kling", type: "文生图 / 图生视频" },
  { name: "智谱 CogView", type: "文生图" },
  { name: "通义万相", type: "文生图" },
  { name: "MiniMax", type: "文生图" },
  { name: "DALL-E 3", type: "文生图" },
  { name: "Stability AI", type: "文生图" },
  { name: "智谱 CogVideoX", type: "文生视频" },
];

const comparisonRows = [
  {
    feature: "从零开始创作",
    us: "AI 想故事",
    usOk: true,
    youxi: false,
    manxiaoya: false,
    huobao: false,
  },
  {
    feature: "AI 厂商数量",
    us: "8 个可选",
    usOk: true,
    youxi: "1 个固定",
    manxiaoya: "1 个固定",
    huobao: "6 个",
  },
  {
    feature: "自带 API Key",
    us: "支持",
    usOk: true,
    youxi: false,
    manxiaoya: false,
    huobao: "必须自带",
  },
  {
    feature: "零部署",
    us: "打开网页即用",
    usOk: true,
    youxi: true,
    manxiaoya: true,
    huobao: "需要 Docker",
  },
  {
    feature: "AI 创作工具",
    us: "6 个",
    usOk: true,
    youxi: false,
    manxiaoya: false,
    huobao: false,
  },
  {
    feature: "导入改编",
    us: "粘贴即改编",
    usOk: true,
    youxi: false,
    manxiaoya: false,
    huobao: true,
  },
  {
    feature: "知识库教程",
    us: "9 篇深度教程",
    usOk: true,
    youxi: false,
    manxiaoya: false,
    huobao: false,
  },
  {
    feature: "视频合成",
    us: "浏览器端",
    usOk: true,
    youxi: "服务端",
    manxiaoya: true,
    huobao: true,
  },
  {
    feature: "剪映导出",
    us: "支持",
    usOk: true,
    youxi: false,
    manxiaoya: false,
    huobao: false,
  },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function CompetitorCell({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center gap-1 text-green-600 font-medium">
        <span>&#10003;</span>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center gap-1 text-red-400">
        <span>&#10005;</span>
      </span>
    );
  }
  return (
    <span className="text-muted-foreground text-xs">{value}</span>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-bold text-foreground flex items-center gap-2">
            <img src="/logo.png" alt="logo" className="h-6 w-auto" />
            <span>AI 漫剧工作台</span>
          </span>
          <div className="flex items-center gap-3">
            <a href="https://t.me/+iJbFVuAwd70yNmFl" target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Users className="size-4" />
              <span>交流群</span>
            </a>
            <a href="https://x.com/hunterweb303" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <svg className="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://t.me/dsa885" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Send className="size-4" />
            </a>
            <Link href="/projects">
              <Button>进入工作台 <ArrowRight className="size-4 ml-1" /></Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ================================================================ */}
      {/* Section 1: Hero                                                   */}
      {/* ================================================================ */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="text-sm font-medium text-primary tracking-wide uppercase">
            AI {"漫剧工作台"}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight">
            {"从一个想法到一部完整漫剧"}
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground font-medium">
            {"全程 AI 驱动，你只需要点按钮"}
          </p>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            别的工具需要你先写好剧本，我们只需要一个想法。甚至连想法都可以 AI 帮你想。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link href="/projects?new=1">
              <Button size="lg" className="h-12 px-8 text-base gap-2">
                {"开始创作"} <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Link href="/learn">
              <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                {"查看知识库"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* Section 2: 两条创作路线                                           */}
      {/* ================================================================ */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              {"两条路，都能走通"}
            </h2>
            <p className="text-muted-foreground">
              {"不管你是从零开始，还是已有素材，都有完整流程"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 从零创作 */}
            <Card className="h-full border-primary/20">
              <CardContent className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Lightbulb className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      {"从零创作"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {"只有一个想法？没问题"}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    "AI 帮你想故事概要",
                    "AI 设计角色外貌和性格",
                    "AI 生成全集大纲",
                    "AI 逐集编写剧本",
                  ].map((text) => (
                    <div key={text} className="flex items-center gap-2.5">
                      <div className="flex size-6 items-center justify-center rounded-full bg-primary/10 shrink-0">
                        <ArrowRight className="size-3 text-primary" />
                      </div>
                      <span className="text-sm text-foreground">{text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 导入改编 */}
            <Card className="h-full border-primary/20">
              <CardContent className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Import className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      {"导入改编"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {"已有小说/剧本？直接导入"}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    "粘贴文本，支持任意格式",
                    "AI 自动提取角色信息",
                    "AI 整理成大纲格式",
                    "AI 改编成漫剧分镜",
                  ].map((text) => (
                    <div key={text} className="flex items-center gap-2.5">
                      <div className="flex size-6 items-center justify-center rounded-full bg-primary/10 shrink-0">
                        <ArrowRight className="size-3 text-primary" />
                      </div>
                      <span className="text-sm text-foreground">{text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* Section 3: 7 步工作流                                             */}
      {/* ================================================================ */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              {"7 步出片，每步 AI 自动化"}
            </h2>
            <p className="text-muted-foreground">
              {"从想法到成片，全程自动化流水线"}
            </p>
          </div>

          {/* Desktop flow */}
          <div className="hidden md:grid grid-cols-7 gap-3">
            {workflowSteps.map((s, i) => (
              <div key={s.step} className="relative text-center space-y-2">
                {i < workflowSteps.length - 1 && (
                  <div className="absolute top-5 left-[calc(50%+20px)] right-[-calc(50%-20px)] w-[calc(100%-20px)] flex items-center justify-center">
                    <ArrowRight className="size-4 text-primary/40" />
                  </div>
                )}
                <div className="inline-flex items-center justify-center size-10 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                  {s.step}
                </div>
                <p className="text-sm font-semibold text-foreground">
                  {s.title}
                </p>
                <p className="text-xs text-primary font-medium">{s.subtitle}</p>
                <p className="text-xs text-muted-foreground">{s.detail}</p>
              </div>
            ))}
          </div>

          {/* Mobile & detailed cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:grid-cols-4">
            {workflowSteps.map((s) => (
              <div
                key={s.step}
                className="rounded-xl border border-border bg-card p-4 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground font-bold text-xs shrink-0">
                    {s.step}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {s.title}
                    </p>
                    <p className="text-xs text-primary font-medium">
                      {s.subtitle}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="text-[10px] border-primary/40 text-primary shrink-0 mt-0.5">
                      AI
                    </Badge>
                    <p className="text-xs text-muted-foreground">{s.aiDoes}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="text-[10px] border-green-300 text-green-600 shrink-0 mt-0.5">
                      你
                    </Badge>
                    <p className="text-xs text-muted-foreground">{s.userDoes}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* Section 4: AI 创作工具                                            */}
      {/* ================================================================ */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              {"不只是生成，还能优化"}
            </h2>
            <p className="text-muted-foreground">
              {"6 个 AI 创作工具，让你的剧本从能看到好看"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {creativeTools.map((tool) => (
              <Card key={tool.title} className="h-full">
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {tool.icon}
                    </div>
                    <h3 className="text-base font-bold text-foreground">
                      {tool.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tool.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* Section 5: 8 大 AI 厂商                                          */}
      {/* ================================================================ */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              {"8 大 AI 厂商，自由选择"}
            </h2>
            <p className="text-muted-foreground">
              {"不锁定任何厂商，用你自己的 API Key，费用透明可控"}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {aiProviders.map((provider) => (
              <div
                key={provider.name}
                className="rounded-xl border border-border bg-card p-4 text-center space-y-2 hover:border-primary/30 transition-colors"
              >
                <p className="text-sm font-semibold text-foreground">
                  {provider.name}
                </p>
                <p className="text-xs text-muted-foreground">{provider.type}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Badge variant="outline" className="text-xs px-3 py-1">
              {"文生图"}
            </Badge>
            <Badge variant="outline" className="text-xs px-3 py-1">
              {"图生视频"}
            </Badge>
            <Badge variant="outline" className="text-xs px-3 py-1">
              {"文生视频"}
            </Badge>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* Section 6: 竞品对比                                               */}
      {/* ================================================================ */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              {"为什么选择我们"}
            </h2>
            <p className="text-muted-foreground">
              {"和市面上主流工具的详细对比"}
            </p>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-3 border-b-2 border-border font-semibold text-foreground w-[160px]">
                    {"功能"}
                  </th>
                  <th className="text-center p-3 border-b-2 border-primary bg-primary/5 font-bold text-primary">
                    {"我们"}
                  </th>
                  <th className="text-center p-3 border-b-2 border-border font-semibold text-muted-foreground">
                    {"一站式平台"}
                  </th>
                  <th className="text-center p-3 border-b-2 border-border font-semibold text-muted-foreground">
                    {"免费工具"}
                  </th>
                  <th className="text-center p-3 border-b-2 border-border font-semibold text-muted-foreground">
                    {"开源方案"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, idx) => (
                  <tr
                    key={row.feature}
                    className={idx % 2 === 0 ? "bg-card" : "bg-muted/20"}
                  >
                    <td className="p-3 border-b border-border text-foreground font-medium">
                      {row.feature}
                    </td>
                    <td className="p-3 border-b border-border bg-primary/5 text-center">
                      <span className="inline-flex items-center gap-1 text-green-600 font-medium text-xs">
                        <span>&#10003;</span> {row.us}
                      </span>
                    </td>
                    <td className="p-3 border-b border-border text-center">
                      <CompetitorCell value={row.youxi} />
                    </td>
                    <td className="p-3 border-b border-border text-center">
                      <CompetitorCell value={row.manxiaoya} />
                    </td>
                    <td className="p-3 border-b border-border text-center">
                      <CompetitorCell value={row.huobao} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {comparisonRows.map((row) => (
              <div
                key={row.feature}
                className="rounded-xl border border-border bg-card p-4 space-y-2"
              >
                <p className="text-sm font-semibold text-foreground">
                  {row.feature}
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-lg bg-primary/5 p-2">
                    <p className="text-muted-foreground mb-0.5">{"我们"}</p>
                    <span className="text-green-600 font-medium">
                      &#10003; {row.us}
                    </span>
                  </div>
                  <div className="rounded-lg bg-muted/30 p-2">
                    <p className="text-muted-foreground mb-0.5">{"一站式平台"}</p>
                    <CompetitorCell value={row.youxi} />
                  </div>
                  <div className="rounded-lg bg-muted/30 p-2">
                    <p className="text-muted-foreground mb-0.5">{"免费工具"}</p>
                    <CompetitorCell value={row.manxiaoya} />
                  </div>
                  <div className="rounded-lg bg-muted/30 p-2">
                    <p className="text-muted-foreground mb-0.5">{"开源方案"}</p>
                    <CompetitorCell value={row.huobao} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* Section 7: 9 大工具一览                                           */}
      {/* ================================================================ */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              {"9 大专业工具"}
            </h2>
            <p className="text-muted-foreground">
              {"覆盖 AI 漫剧制作全流程"}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {standaloneTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group block"
              >
                <Card className="h-full transition-all duration-200 group-hover:ring-primary/30 group-hover:bg-card/80">
                  <CardContent className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
                        <tool.icon className="size-6 text-primary" />
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          tool.badge === "ai"
                            ? "text-[10px] border-primary/40 text-primary shrink-0"
                            : "text-[10px] border-green-300 text-green-600 shrink-0"
                        }
                      >
                        {tool.badge === "ai" ? "AI" : "免费"}
                      </Badge>
                    </div>
                    <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {tool.description}
                    </p>
                    <div className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>{"打开工具"}</span>
                      <ArrowRight className="size-3.5" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* Section 8: 知识库                                                 */}
      {/* ================================================================ */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="flex justify-center">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
              <BookOpen className="size-8 text-primary" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            {"配套 9 篇深度教程"}
          </h2>
          <p className="text-lg text-muted-foreground">
            {"从零到一掌握 AI 漫剧制作"}
          </p>
          <p className="text-sm text-muted-foreground">
            {"剧本 · 角色 · 分镜 · 视频 · 配音 · 剪辑 · 发布 · 变现"}
          </p>
          <div className="pt-2">
            <Link href="/learn">
              <Button variant="outline" size="lg" className="h-11 px-6 text-base gap-2">
                {"阅读知识库"} <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-10 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto text-center space-y-3">
          <p className="font-bold text-foreground flex items-center justify-center gap-2">
            <img src="/logo.png" alt="logo" className="h-6 w-auto" />
            <span>AI 漫剧工作台</span>
          </p>
          <p className="text-sm text-muted-foreground">
            {"从一个想法到一部完整漫剧"}
          </p>
          <div className="flex items-center justify-center gap-4">
            <a href="https://x.com/hunterweb303" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <span className="sr-only">X (Twitter)</span>
              <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://t.me/dsa885" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <span className="sr-only">Telegram</span>
              <Send className="size-4" />
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            {"© 2026"}
          </p>
        </div>
      </footer>
    </div>
  );
}
