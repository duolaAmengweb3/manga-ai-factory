import Link from "next/link";
import { TrendingUp, BarChart3, Lightbulb, Upload, BookOpen, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* ───── Data ───── */

const monetizationPaths = [
  { path: "平台流量分成", threshold: "500-1万粉", income: "¥25-60/万播放", difficulty: 1, desc: "最基础的变现方式，靠播放量赚平台广告分成。门槛低，适合新手起步。" },
  { path: "短剧CPS分销", threshold: "无", income: "佣金30-50%", difficulty: 2, desc: "推广别人的付费短剧/小说，用户付费你拿佣金。不用自己做内容，推广即可。" },
  { path: "广告商单", threshold: "1万粉+", income: "¥500-20000/条", difficulty: 3, desc: "品牌方付费在你的漫剧中植入广告。需要一定粉丝基础和稳定的数据。" },
  { path: "私域引流卖课", threshold: "粉丝基础", income: "¥99-2980/人", difficulty: 3, desc: "教别人做AI漫剧，把公域流量导入私域（微信群/社群）卖课或带货。" },
  { path: "账号交易", threshold: "粉丝量", income: "粉丝×0.3-0.8元", difficulty: 1, desc: "养号卖号，1万粉的账号约值 ¥3000-8000。适合批量矩阵运营。" },
];

const platformShareDetails = [
  { platform: "抖音中视频计划", condition: "1万粉+实名认证", format: "横屏1分钟+", rate: "约60元/万播放", note: "流量最大，竞争也最大" },
  { platform: "快手磁力聚星", condition: "500粉+实名认证", format: "不限", rate: "约40元/万播放", note: "门槛最低，适合新手" },
  { platform: "B站激励", condition: "1000粉+10万总播放", format: "不限", rate: "约25元/万播放", note: "单价低但用户粘性高" },
  { platform: "红果短剧", condition: "无粉丝门槛", format: "竖屏短剧系列", rate: "独家90%/非独家50-70%", note: "分成最高，但需要系列化内容" },
  { platform: "腾讯火龙", condition: "无粉丝门槛", format: "竖屏短剧系列", rate: "独家200%系数", note: "新平台红利期，独家系数最高" },
];

const revenueExample = [
  { platform: "抖音", calc: "100万 ÷ 1万 × 60", income: 6000 },
  { platform: "快手", calc: "100万 ÷ 1万 × 40", income: 4000 },
  { platform: "B站", calc: "100万 ÷ 1万 × 25", income: 2500 },
  { platform: "红果（独家）", calc: "100万 ÷ 1万 × 80", income: 8000 },
];

const cpsSteps = [
  { step: 1, title: "选择CPS平台", desc: "番茄小说、九州、容量、点众等。注册推广账号，获取推广链接。" },
  { step: 2, title: "选择推广内容", desc: "选热门付费短剧/小说，优先选已验证的爆款内容，转化率更高。" },
  { step: 3, title: "制作推广视频", desc: "截取精彩片段或用AI重新生成相关内容，在结尾植入推广链接。" },
  { step: 4, title: "自然融合", desc: "把推广链接放在评论区置顶或视频简介。不要太硬广，要和内容融合。" },
  { step: 5, title: "跟踪数据", desc: "关注转化率和佣金。测试不同的推广方式，找到最优解。" },
];

const douPlusBasics = [
  { item: "测试预算", value: "100元/条" },
  { item: "投放目标", value: "播放量（非涨粉）" },
  { item: "定向人群", value: "18-40岁" },
  { item: "合格标准", value: "单次播放成本 < 0.05元" },
  { item: "投放时长", value: "24小时" },
];

const investTiming = [
  { condition: "完播率 > 30%", action: "值得投，100元起步测试", signal: "good" as const },
  { condition: "完播率 20-30%", action: "观望，优化前3秒钩子后再测", signal: "caution" as const },
  { condition: "完播率 < 15%", action: "不投，回去改内容", signal: "bad" as const },
  { condition: "点赞率 > 5%", action: "优质内容信号，可以追投", signal: "good" as const },
  { condition: "评论率 > 1%", action: "互动性强，值得投", signal: "good" as const },
];

const investPhases = [
  { phase: "测试期（第1周）", budget: "每条100元，测10条", goal: "找出数据最好的内容", key: "广撒网，不要把预算集中在一条" },
  { phase: "优化期（第2-3周）", budget: "最好的3条各追投300-500元", goal: "验证内容的投放天花板", key: "关注ROI，不赚钱的立刻停" },
  { phase: "放量期（第4周+）", budget: "好的内容持续追投", goal: "最大化优质内容的收益", key: "边投边观察，数据下滑就停" },
];

const operationPhases = [
  { phase: "冷启动", time: "第1-2周", focus: "日更 + 多平台分发", target: "1000粉", detail: "测试3-5个题材方向，找到数据最好的。不投流，纯自然流量验证内容。" },
  { phase: "涨粉期", time: "第3-4周", focus: "优化内容 + 小额投流", target: "5000粉", detail: "确定主打题材，建立系列化内容。开始小额DOU+测试。开通平台分成。" },
  { phase: "变现期", time: "第2月+", focus: "开通分成 + CPS推广", target: "月入¥5K+", detail: "流量分成+CPS双线并行。开始尝试商单合作。积累案例和数据。" },
  { phase: "稳定期", time: "第3月+", focus: "矩阵化 + 商单涨价", target: "月入¥1W+", detail: "开设2-3个矩阵号，覆盖不同题材。建立稳定的商单渠道。" },
];

const coreMetrics = [
  { metric: "完播率", pass: ">25%", good: ">40%", improve: "缩短视频时长 + 前3秒加钩子 + 节奏加快" },
  { metric: "点赞率", pass: ">3%", good: ">8%", improve: "设计情绪爽点 + 反转 + 共鸣" },
  { metric: "评论率", pass: ">0.5%", good: ">2%", improve: "结尾设悬念 + 评论区引导互动 + 争议话题" },
  { metric: "转发率", pass: ">0.3%", good: ">1%", improve: "制造「你也是这样吗」的共鸣 + 实用干货" },
  { metric: "关注率", pass: ">1%", good: ">3%", improve: "系列化内容 + 稳定更新频率 + 品牌记忆点" },
];

const commonPitfalls = [
  { pitfall: "不日更", consequence: "算法忘了你，推荐量骤降", fix: "至少隔日更，建立稳定的更新节奏" },
  { pitfall: "多账号矩阵太多", consequence: "2026年检测严格，批量封号风险", fix: "最多2-3个号，每个号有差异化定位" },
  { pitfall: "只投流不优化内容", consequence: "烧钱看不到回报，ROI为负", fix: "先用自然流验证内容，数据好再投" },
  { pitfall: "不看数据", consequence: "不知道什么内容火，盲目产出", fix: "每天花10分钟看后台数据，记录分析" },
  { pitfall: "急于变现", consequence: "前1000粉就想赚钱，质量下降", fix: "前期专注作品质量和粉丝积累" },
  { pitfall: "抄袭搬运", consequence: "2026年平台检测严格，封号+清零", fix: "用AI原创，借鉴结构不抄袭内容" },
  { pitfall: "不做备案", consequence: "作品下架，严重者永久封号", fix: "第一时间办理广电备案，详见发布章节" },
  { pitfall: "忽视AI标注", consequence: "限流、下架、封号", fix: "做成固定模板，每条视频自动添加" },
];

export const metadata = { title: "变现与运营" };

/* ───── Helpers ───── */

function DifficultyStars({ level }: { level: number }) {
  return (
    <span className="text-amber-500 text-xs tracking-wider">
      {"★".repeat(level)}{"☆".repeat(3 - level)}
    </span>
  );
}

/* ───── Page ───── */

export default function MonetizationPage() {
  const totalRevenue = revenueExample.reduce((sum, r) => sum + r.income, 0);

  return (
    <DashboardLayout>
      <div className="space-y-12">
        {/* ── Header ── */}
        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-foreground tracking-tight sm:text-3xl flex items-center gap-2">
            <TrendingUp className="size-6 text-primary" /> 变现与运营
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
            5大变现路径、收入计算、投流技巧、运营节奏、核心指标
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
            做AI漫剧的终极目标是变现。本章从5条变现路径讲起，到具体的收入计算、
            投流策略、运营节奏规划、核心指标监控，以及常见踩坑。
            帮你从&quot;能做出来&quot;进化到&quot;能赚到钱&quot;。
          </p>
        </div>

        {/* ── Section: 5大变现路径 ── */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-1">
            5大变现路径
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            从最简单到最高收入，按你的阶段选择
          </p>

          <Card className="mb-4">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">路径</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">门槛</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">收入预期</th>
                      <th className="px-4 py-3 text-center font-medium text-muted-foreground">难度</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {monetizationPaths.map((m) => (
                      <tr key={m.path} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-2.5 font-medium text-foreground">{m.path}</td>
                        <td className="px-4 py-2.5 text-muted-foreground">{m.threshold}</td>
                        <td className="px-4 py-2.5 text-muted-foreground">{m.income}</td>
                        <td className="px-4 py-2.5 text-center">
                          <DifficultyStars level={m.difficulty} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            {monetizationPaths.map((m) => (
              <Card key={m.path} size="sm">
                <CardContent className="flex items-start gap-3">
                  <Badge variant="secondary" className="text-[10px] px-1.5 shrink-0 mt-0.5">
                    <DifficultyStars level={m.difficulty} />
                  </Badge>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{m.path}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{m.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ── Section: 平台流量分成详解 ── */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-1">
            平台流量分成详解
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            每个平台的开通条件、内容要求和单价
          </p>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">平台</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">开通条件</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">内容要求</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">分成单价</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">备注</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {platformShareDetails.map((p) => (
                      <tr key={p.platform} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-2.5 font-medium text-foreground">{p.platform}</td>
                        <td className="px-4 py-2.5 text-muted-foreground">{p.condition}</td>
                        <td className="px-4 py-2.5 text-muted-foreground">{p.format}</td>
                        <td className="px-4 py-2.5 text-muted-foreground">{p.rate}</td>
                        <td className="px-4 py-2.5 text-muted-foreground text-xs">{p.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ── Section: 收入计算实例 ── */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-1">
            收入计算实例
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            月播放量 100 万的账号，各平台能赚多少
          </p>

          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="text-sm">假设月播放量 100万</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">平台</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">计算方式</th>
                      <th className="px-4 py-3 text-right font-medium text-muted-foreground">月收入</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {revenueExample.map((r) => (
                      <tr key={r.platform}>
                        <td className="px-4 py-2.5 font-medium text-foreground">{r.platform}</td>
                        <td className="px-4 py-2.5 text-muted-foreground font-mono text-xs">{r.calc}</td>
                        <td className="px-4 py-2.5 text-right font-semibold text-foreground tabular-nums">
                          ¥{r.income.toLocaleString("zh-CN")}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-primary/5">
                      <td className="px-4 py-3 font-bold text-foreground">合计（全平台分发）</td>
                      <td className="px-4 py-3" />
                      <td className="px-4 py-3 text-right font-bold text-primary text-lg tabular-nums">
                        ¥{totalRevenue.toLocaleString("zh-CN")}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="text-sm">
              <p className="font-semibold text-foreground mb-2">
                <BarChart3 className="size-4 text-primary inline" /> 实际案例参考
              </p>
              <div className="text-muted-foreground space-y-2">
                <p>
                  <strong className="text-foreground">@漫剧小剧场</strong>（8.5万粉，AI漫剧账号）：
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>月发布 28 条（日更）</li>
                  <li>总播放量 420 万</li>
                  <li>流量分成收入 ¥12,600</li>
                  <li>小说CPS佣金 ¥8,300</li>
                  <li className="font-semibold text-foreground">月总收入 ¥20,900</li>
                </ul>
                <p className="text-xs mt-2">
                  以上为典型中腰部账号数据。头部账号（50万粉+）月收入可达 ¥10万+。
                  新手前3个月月收入通常在 ¥500-3000 之间。
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ── Section: CPS 短剧分销 ── */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-1">
            CPS 短剧分销
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            不用自己做剧，推广别人的付费内容赚佣金
          </p>

          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="text-sm">什么是 CPS</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>
                CPS（Cost Per Sale）= 按成交付费。你推广别人的付费短剧或小说，
                用户通过你的链接付费后，你拿 <strong className="text-foreground">30-50% 的佣金</strong>。
                主流CPS平台有：番茄小说、九州、容量、点众等。
              </p>
            </CardContent>
          </Card>

          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="text-sm">操作步骤</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {cpsSteps.map((s) => (
                  <div key={s.step} className="flex items-start gap-3 px-4 py-3">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary mt-0.5">
                      {s.step}
                    </span>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{s.title}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50/50">
            <CardContent className="text-sm">
              <p className="font-semibold text-foreground mb-1">
                <AlertTriangle className="size-4 text-amber-500 inline" /> CPS 注意事项
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">不要太硬广</strong>——直接说&quot;点击链接看全集&quot;会让用户反感且被平台限流。
                正确做法：制作相关题材的漫剧内容，在结尾自然引导&quot;想看完整版？评论区有链接&quot;。
                CPS 和自己的漫剧内容<strong className="text-foreground">题材要匹配</strong>，
                比如你做逆袭题材就推广逆袭类短剧。
              </p>
            </CardContent>
          </Card>
        </section>

        {/* ── Section: 投流技巧 ── */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-1">
            投流技巧
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            DOU+ 基础、投放时机判断、分阶段投流策略
          </p>

          {/* DOU+ 基础 */}
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="text-sm">DOU+ 基础参数</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">配置项</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">推荐值</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {douPlusBasics.map((d) => (
                      <tr key={d.item}>
                        <td className="px-4 py-2.5 font-medium text-foreground">{d.item}</td>
                        <td className="px-4 py-2.5 text-muted-foreground">{d.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* 什么时候投 */}
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="text-sm">什么时候投</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p className="mb-3">
                发布后等 <strong className="text-foreground">3-6 小时</strong>，
                让自然流跑一波数据，然后根据数据决定要不要投：
              </p>
              <div className="space-y-2">
                {investTiming.map((t) => (
                  <div key={t.condition} className="flex items-start gap-2">
                    <span className="shrink-0">
                      {t.signal === "good" ? <CheckCircle2 className="size-4 text-green-600" /> : t.signal === "caution" ? <AlertTriangle className="size-4 text-yellow-600" /> : <XCircle className="size-4 text-red-500" />}
                    </span>
                    <div>
                      <span className="font-medium text-foreground">{t.condition}</span>
                      <span className="text-muted-foreground"> → {t.action}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 投流策略 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">分阶段投流策略</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">阶段</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">预算</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">目标</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">关键要点</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {investPhases.map((p) => (
                      <tr key={p.phase}>
                        <td className="px-4 py-2.5 font-medium text-foreground whitespace-nowrap">{p.phase}</td>
                        <td className="px-4 py-2.5 text-muted-foreground">{p.budget}</td>
                        <td className="px-4 py-2.5 text-muted-foreground">{p.goal}</td>
                        <td className="px-4 py-2.5 text-muted-foreground text-xs">{p.key}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ── Section: 运营节奏 ── */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-1">
            运营节奏
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            从冷启动到月入过万的四个阶段
          </p>

          <Card className="mb-4">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">阶段</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">时间</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">重点</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">目标</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {operationPhases.map((p) => (
                      <tr key={p.phase} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-2.5 font-medium text-foreground">{p.phase}</td>
                        <td className="px-4 py-2.5 text-muted-foreground whitespace-nowrap">{p.time}</td>
                        <td className="px-4 py-2.5 text-muted-foreground">{p.focus}</td>
                        <td className="px-4 py-2.5">
                          <Badge variant="secondary" className="text-[10px] px-1.5">{p.target}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            {operationPhases.map((p) => (
              <Card key={p.phase} size="sm">
                <CardContent className="flex items-start gap-3">
                  <Badge variant="default" className="text-[10px] px-1.5 shrink-0 mt-0.5">{p.time}</Badge>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{p.phase}：{p.focus}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{p.detail}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ── Section: 起号核心指标 ── */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-1">
            起号核心指标
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            5个关键指标决定你的账号能不能起来
          </p>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">指标</th>
                      <th className="px-4 py-3 text-center font-medium text-muted-foreground">合格线</th>
                      <th className="px-4 py-3 text-center font-medium text-muted-foreground">优秀线</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">怎么提升</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {coreMetrics.map((m) => (
                      <tr key={m.metric} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-2.5 font-medium text-foreground">{m.metric}</td>
                        <td className="px-4 py-2.5 text-center">
                          <Badge variant="secondary" className="font-mono text-[10px] px-1.5">{m.pass}</Badge>
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          <Badge variant="default" className="font-mono text-[10px] px-1.5">{m.good}</Badge>
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground text-xs">{m.improve}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4 border-primary/20 bg-primary/5">
            <CardContent className="text-sm">
              <p className="font-semibold text-foreground mb-2">
                <Lightbulb className="size-4 text-primary inline" /> 数据分析习惯
              </p>
              <div className="text-muted-foreground space-y-1.5">
                <p>
                  每天花 <strong className="text-foreground">10 分钟</strong>看后台数据，记录以下内容：
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>哪条内容完播率最高？标题和内容有什么特点？</li>
                  <li>什么时间段发布的内容数据最好？</li>
                  <li>评论区用户最关心什么话题？</li>
                  <li>哪个题材方向的点赞率/关注率最高？</li>
                </ul>
                <p className="mt-1">
                  <strong className="text-foreground">数据驱动决策</strong>，
                  不要靠感觉做内容。数据好的方向加倍投入，数据差的果断放弃。
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ── Section: 常见踩坑 ── */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-1">
            常见踩坑
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            8 个最容易犯的错误，提前避开
          </p>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">踩坑行为</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">后果</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">正确做法</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {commonPitfalls.map((p) => (
                      <tr key={p.pitfall} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-2.5 font-medium text-destructive">{p.pitfall}</td>
                        <td className="px-4 py-2.5 text-muted-foreground">{p.consequence}</td>
                        <td className="px-4 py-2.5 text-muted-foreground">{p.fix}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ── Next Steps ── */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">
            相关章节
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link href="/learn/publishing" className="block group">
              <Card className="h-full transition-colors group-hover:ring-primary/30">
                <CardContent className="flex items-center gap-3">
                  <Upload className="size-5 text-muted-foreground" />
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {"←"} 发布与备案
                    </p>
                    <p className="text-xs text-muted-foreground">
                      平台规则、备案流程、AI标注、标题公式
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/learn" className="block group">
              <Card className="h-full transition-colors group-hover:ring-primary/30">
                <CardContent className="flex items-center gap-3">
                  <BookOpen className="size-5 text-muted-foreground" />
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      返回知识库首页 {"→"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      查看完整学习路线图
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
