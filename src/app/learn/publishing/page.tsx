import Link from "next/link";
import { Upload, Lightbulb, TrendingUp, Scissors, AlertTriangle } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* ───── Data ───── */

const platformRules = [
  { platform: "抖音中视频", fans: "1万", share: "约60元/万播放", filing: true, aiLabel: true, withdraw: "¥100" },
  { platform: "快手磁力聚星", fans: "500", share: "约40元/万播放", filing: true, aiLabel: true, withdraw: "¥50" },
  { platform: "B站激励", fans: "1000+10万播放", share: "约25元/万播放", filing: true, aiLabel: true, withdraw: "¥100" },
  { platform: "红果短剧", fans: "无", share: "独家90%/非独家50-70%", filing: true, aiLabel: true, withdraw: "—" },
  { platform: "腾讯火龙", fans: "无", share: "独家200%系数", filing: true, aiLabel: true, withdraw: "—" },
  { platform: "优酷", fans: "—", share: "独家70%/非独家50%", filing: true, aiLabel: true, withdraw: "—" },
];

const filingSteps = [
  { step: 1, title: "登录备案系统", desc: "登录国家广电总局「重点网络视听节目信息备案系统」（https://dsj.nrta.gov.cn）" },
  { step: 2, title: "注册账号", desc: "个人或公司均可注册。个人需身份证，公司需营业执照+法人证件" },
  { step: 3, title: "填写剧目信息", desc: "剧名、集数、每集时长、题材分类、制作方信息。题材选择要准确" },
  { step: 4, title: "上传材料", desc: "剧本/故事大纲（Word或PDF）、制作承诺书（模板可在系统下载）" },
  { step: 5, title: "等待审核", desc: "通常 5-15 个工作日。期间可能会收到修改意见，需及时回复" },
  { step: 6, title: "获取备案号", desc: "审核通过后系统自动生成备案号，格式类似「网剧〔2026〕XXXX号」" },
  { step: 7, title: "标注备案号", desc: "在作品片头或简介中标注备案号。所有平台发布时都要填写" },
];

const personalVsCompany = [
  { item: "所需材料", personal: "身份证正反面", company: "营业执照 + 法人身份证" },
  { item: "审核周期", personal: "5-10 个工作日", company: "10-15 个工作日" },
  { item: "平台限制", personal: "部分平台不接受个人备案", company: "全平台通用" },
  { item: "作品数量", personal: "一般无限制", company: "无限制" },
  { item: "推荐程度", personal: "适合试水阶段", company: "认真做建议注册公司" },
];

const rejectionReasons = [
  { reason: "剧名含敏感词", detail: "涉及政治、军事、宗教等敏感词汇会被直接退回", fix: "修改剧名，避免敏感词" },
  { reason: "题材涉灰色地带", detail: "赌博、暴力血腥、色情擦边、邪教等题材", fix: "调整题材方向，参考平台内容规范" },
  { reason: "未标注AI生成内容", detail: "2026年起强制要求标注，未标注直接退回", fix: "在片头添加「本片由AI辅助生成」标注" },
  { reason: "制作主体信息不完整", detail: "联系方式、地址等信息缺失或不一致", fix: "补全所有必填信息，确保一致" },
  { reason: "剧本大纲不合格", detail: "大纲过于简略或结构混乱", fix: "按标准格式重写，至少包含人物、大纲、分集概要" },
];

const titleFormulas = [
  {
    category: "反差型",
    formulas: [
      { template: "被{低身份}当众羞辱，{高身份}笑了", example: "被实习生当面嘲笑，他掏出了黑卡" },
      { template: "全公司都以为{低评价}，直到{高表现}", example: "全公司都以为他是保安，直到董事长叫他爸" },
      { template: "穿着{普通衣服}的他，居然是{高身份}", example: "穿着地摊货的他，居然是隐藏的亿万富翁" },
      { template: "{低身份}竟然{不可能的行为}", example: "外卖员竟然一口气买下整栋楼" },
    ],
  },
  {
    category: "逆袭型",
    formulas: [
      { template: "{数字}年后归来，所有人都跪了", example: "3年后归来，曾经的前台小姐都叫我总裁" },
      { template: "从{低起点}到{高终点}，只用了{短时间}", example: "从保安到总裁，他只用了30天" },
      { template: "当年被{欺负方式}的他，如今{逆袭结果}", example: "当年被扫地出门的他，如今身价百亿" },
      { template: "{负面事件}后，他决定{逆袭行动}", example: "被退婚后，他一夜之间继承千亿家产" },
    ],
  },
  {
    category: "悬念型",
    formulas: [
      { template: "她以为嫁了个{低评价}，直到...", example: "她以为嫁了个穷小子，直到看见他的存款" },
      { template: "{角色}的真实身份，连{亲近的人}都不知道", example: "他的真实身份，连老婆都不知道" },
      { template: "当{普通人}摘下{伪装}的那一刻...", example: "当保安摘下面具的那一刻，全场沸腾" },
      { template: "{看似普通的物品}里，藏着{惊天秘密}", example: "那个破旧的挎包里，藏着一份遗嘱" },
    ],
  },
  {
    category: "数字型",
    formulas: [
      { template: "{大数字}亿身价的{身份}，竟然{反差行为}", example: "500亿身价的大佬，竟然去应聘保安" },
      { template: "月薪{低数字}的他，一夜之间{巨变}", example: "月薪3000的他，一夜之间成了集团继承人" },
      { template: "{数字}个人追她，她偏偏选了{最不可能的人}", example: "99个富二代追她，她偏偏选了那个保安" },
      { template: "第{数字}天，他终于{关键行动}", example: "第365天，他终于对前妻说出了真相" },
    ],
  },
  {
    category: "情感型",
    formulas: [
      { template: "白天是{身份A}，晚上却是{身份B}", example: "白天是被欺负的秘书，晚上却是全城最大的债主" },
      { template: "{角色}终于说出了那句话...", example: "沉默了三年，他终于说出了那句话..." },
      { template: "为了{保护对象}，他甘愿{牺牲行为}", example: "为了保护她，他甘愿放弃百亿家产" },
      { template: "那个{负面评价}的人，其实一直在{感人行为}", example: "那个被全村嘲笑的傻子，其实一直在默默守护她" },
    ],
  },
];

const publishingChecklist = [
  { item: "视频格式", detail: "竖屏 1080×1920，文件 ≤500MB" },
  { item: "AI内容标注", detail: "片头标注「AI生成」或全片水印" },
  { item: "备案号", detail: "已取得并在片头/简介标注" },
  { item: "标题", detail: "含钩子，20-30字，参考爆款公式" },
  { item: "封面图", detail: "清晰、有文字、有冲突感" },
  { item: "标签", detail: "3-5个相关标签" },
  { item: "简介", detail: "含系列引导，如「关注追更」" },
  { item: "评论区", detail: "预埋 2-3 条互动评论" },
];

const publishingStrategy = [
  { time: "12:00-13:00", reason: "午休时间，用户刷手机高峰" },
  { time: "18:00-20:00", reason: "下班通勤+晚饭时间" },
  { time: "21:00-23:00", reason: "睡前娱乐时间，最高峰" },
];

export const metadata = { title: "发布与备案" };

/* ───── Page ───── */

export default function PublishingPage() {
  return (
    <DashboardLayout>
      <div className="space-y-12">
        {/* ── Header ── */}
        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-foreground tracking-tight sm:text-3xl flex items-center gap-2">
            <Upload className="size-6 text-primary" /> 发布与备案
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
            平台规则、备案流程、AI标注要求、爆款标题公式、发布策略
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
            做完剪辑只是完成了一半——发布环节决定了你的作品能不能被看到。
            2026年的政策环境发生了重大变化：备案、AI标注成为硬性要求。
            本章帮你搞清楚所有规则，避免踩坑。
          </p>
        </div>

        {/* ── Section: 6大平台规则总览 ── */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-1">
            6大平台规则总览
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            各平台门槛、分成、备案要求一览
          </p>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">平台</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">粉丝门槛</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">分成比例</th>
                      <th className="px-4 py-3 text-center font-medium text-muted-foreground">备案</th>
                      <th className="px-4 py-3 text-center font-medium text-muted-foreground">AI标注</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">提现门槛</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {platformRules.map((p) => (
                      <tr key={p.platform} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-2.5 font-medium text-foreground">{p.platform}</td>
                        <td className="px-4 py-2.5 text-muted-foreground">{p.fans}</td>
                        <td className="px-4 py-2.5 text-muted-foreground">{p.share}</td>
                        <td className="px-4 py-2.5 text-center">
                          <Badge variant="destructive" className="text-[10px] px-1.5">必须</Badge>
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          <Badge variant="destructive" className="text-[10px] px-1.5">必须</Badge>
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">{p.withdraw}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ── Section: 备案流程 ── */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-1">
            备案流程（2026-04 新规）
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            2026年4月1日起，未备案的漫剧一律不得上线，存量作品也要补办
          </p>

          <Card className="mb-4 border-destructive/30 bg-destructive/5">
            <CardContent className="text-sm">
              <p className="font-bold text-destructive mb-2">
                <AlertTriangle className="size-4 text-red-500 inline" /> 重要提醒
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">2026年4月1日起，广电总局新规正式执行</strong>：
                所有网络微短剧（包括AI漫剧）必须完成备案才能上线。
                已上线的存量作品也需要在过渡期内补办备案。
                未备案作品将被<strong className="text-foreground">强制下架</strong>，
                严重者<strong className="text-foreground">封号处理</strong>。
              </p>
            </CardContent>
          </Card>

          {/* 广电备案步骤 */}
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>广电备案步骤</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {filingSteps.map((s) => (
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

          {/* 工信部备案 */}
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="text-sm">工信部备案（小程序分发时需要）</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>如果你的漫剧通过<strong className="text-foreground">小程序</strong>分发（如红果、番茄等IAP模式），还需要额外办理工信部ICP备案：</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>登录工信部ICP备案系统（https://beian.miit.gov.cn）</li>
                <li>提交域名/小程序信息</li>
                <li>等待审核（7-20 个工作日）</li>
              </ol>
              <p className="text-xs">
                <Lightbulb className="size-4 text-primary inline" /> 纯自媒体分发（抖音/快手/B站发视频）一般只需广电备案，不需要ICP备案。
              </p>
            </CardContent>
          </Card>

          {/* 个人 vs 公司 */}
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="text-sm">个人 vs 公司备案差异</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">对比项</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">个人</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">公司</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {personalVsCompany.map((row) => (
                      <tr key={row.item}>
                        <td className="px-4 py-2.5 font-medium text-foreground">{row.item}</td>
                        <td className="px-4 py-2.5 text-muted-foreground">{row.personal}</td>
                        <td className="px-4 py-2.5 text-muted-foreground">{row.company}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* 常见被拒原因 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-amber-600"><AlertTriangle className="size-4 text-amber-500 inline" /> 常见被拒原因与解决方案</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">被拒原因</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">详情</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">解决方案</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {rejectionReasons.map((r) => (
                      <tr key={r.reason}>
                        <td className="px-4 py-2.5 font-medium text-foreground">{r.reason}</td>
                        <td className="px-4 py-2.5 text-muted-foreground">{r.detail}</td>
                        <td className="px-4 py-2.5 text-muted-foreground">{r.fix}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ── Section: AI 标注要求 ── */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-1">
            AI 标注要求
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            2026年4月起全平台强制要求标注 AI 生成内容
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">标注规范</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <ul className="space-y-1.5">
                  <li><strong className="text-foreground">标注文案：</strong>&quot;AI生成&quot;、&quot;AIGC&quot;或&quot;本片由AI辅助生成&quot;</li>
                  <li><strong className="text-foreground">标注位置：</strong>片头显著位置，或全片添加水印</li>
                  <li><strong className="text-foreground">标注时长：</strong>至少片头 5 秒可见，推荐全片水印</li>
                  <li><strong className="text-foreground">字号要求：</strong>清晰可辨，不得故意缩小或隐藏</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-destructive/20 bg-destructive/5">
              <CardHeader>
                <CardTitle className="text-sm text-destructive">未标注后果</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <ul className="space-y-1.5">
                  <li><strong className="text-foreground">第一次：</strong>限流警告，要求补充标注</li>
                  <li><strong className="text-foreground">第二次：</strong>作品下架，暂停发布权限</li>
                  <li><strong className="text-foreground">多次违规：</strong>永久封号，所有作品下架</li>
                </ul>
                <p className="text-xs border-t border-border pt-2">
                  <Lightbulb className="size-4 text-primary inline" /> 建议在剪辑时就把 AI 标注做成<strong className="text-foreground">固定模板</strong>，
                  每次剪辑直接套用，不要每次手动加——容易忘。
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ── Section: 发布前检查清单 ── */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-1">
            发布前检查清单
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            每次发布前过一遍这个清单，避免低级错误
          </p>

          <Card>
            <CardContent className="space-y-2">
              {publishingChecklist.map((item) => (
                <div key={item.item} className="flex items-start gap-3 py-1">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded border border-border mt-0.5 text-xs text-muted-foreground">
                    {"✓"}
                  </span>
                  <div>
                    <span className="font-medium text-foreground text-sm">{item.item}</span>
                    <span className="text-muted-foreground text-sm"> — {item.detail}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* ── Section: 标题写法 ── */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-1">
            爆款标题公式
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            20条标题模板，5大类型——直接套用就能用
          </p>

          <div className="space-y-4">
            {titleFormulas.map((cat) => (
              <Card key={cat.category}>
                <CardHeader>
                  <CardTitle className="text-sm">{cat.category}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="px-4 py-2 text-left font-medium text-muted-foreground">公式模板</th>
                          <th className="px-4 py-2 text-left font-medium text-muted-foreground">示例</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {cat.formulas.map((f) => (
                          <tr key={f.template}>
                            <td className="px-4 py-2.5 text-muted-foreground font-mono text-xs">{f.template}</td>
                            <td className="px-4 py-2.5 font-medium text-foreground">{f.example}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-4 border-primary/20 bg-primary/5">
            <CardContent className="text-sm">
              <p className="font-semibold text-foreground mb-2">
                <Lightbulb className="size-4 text-primary inline" /> 标题核心原则
              </p>
              <div className="text-muted-foreground space-y-1.5">
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong className="text-foreground">制造信息差：</strong>标题暗示&quot;我知道一个你不知道的秘密&quot;</li>
                  <li><strong className="text-foreground">身份反差：</strong>低身份 vs 高身份的冲突是最有效的钩子</li>
                  <li><strong className="text-foreground">留悬念：</strong>用省略号或&quot;直到...&quot;制造未完成感</li>
                  <li><strong className="text-foreground">用具体数字：</strong>500亿比&quot;很多钱&quot;有冲击力100倍</li>
                  <li><strong className="text-foreground">控制长度：</strong>20-30字最佳，太长被截断</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ── Section: 发布策略 ── */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-1">
            发布策略
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            时间、频率、互动——每个细节都影响推荐量
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">最佳发布时间</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                {publishingStrategy.map((s) => (
                  <div key={s.time} className="flex items-start gap-2">
                    <Badge variant="secondary" className="font-mono text-[10px] px-1.5 shrink-0 mt-0.5">{s.time}</Badge>
                    <span>{s.reason}</span>
                  </div>
                ))}
                <p className="text-xs border-t border-border pt-2">
                  <Lightbulb className="size-4 text-primary inline" /> 测试 2-3 个时间段，看自己账号的数据表现。不同账号、不同粉丝群体的最佳时间可能不同。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">更新频率与节奏</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <ul className="space-y-1.5">
                  <li><strong className="text-foreground">日更1条：</strong>最理想，算法最友好，涨粉最快</li>
                  <li><strong className="text-foreground">隔日更：</strong>可接受，但涨粉速度下降 40%</li>
                  <li><strong className="text-foreground">周更：</strong>太慢，算法容易忘记你的账号</li>
                </ul>
                <p className="text-xs border-t border-border pt-2">
                  <AlertTriangle className="size-4 text-amber-500 inline" /> <strong className="text-foreground">持续性比频率更重要</strong>。
                  每天更1条坚持3个月 &gt; 每天更3条坚持2周。
                  先确保能持续产出，再追求频率。
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-sm">冷启动阶段策略</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="font-semibold text-foreground mb-1">前1000粉阶段</p>
                  <ul className="space-y-1 text-xs">
                    <li>{"•"} 纯自然流量，不要投流</li>
                    <li>{"•"} 多平台同步分发</li>
                    <li>{"•"} 重点打磨内容质量</li>
                    <li>{"•"} 测试不同题材和风格</li>
                    <li>{"•"} 每天分析数据，找到什么内容受欢迎</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">1000粉后</p>
                  <ul className="space-y-1 text-xs">
                    <li>{"•"} DOU+ 测试投放，每条 100 元起</li>
                    <li>{"•"} 选数据好的内容追投</li>
                    <li>{"•"} 开通各平台分成</li>
                    <li>{"•"} 固定更新节奏，培养观众习惯</li>
                    <li>{"•"} 开始尝试系列化内容</li>
                  </ul>
                </div>
              </div>
              <p className="text-xs border-t border-border pt-2">
                <Lightbulb className="size-4 text-primary inline" /> <strong className="text-foreground">评论互动：</strong>
                前 10 条评论自己预埋，引导讨论。比如：
                &quot;你们觉得男主该不该原谅她？&quot;、&quot;猜猜下一集会发生什么？&quot;、&quot;这种事你身边有没有遇到过？&quot;
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
            <Link href="/learn/monetization" className="block group">
              <Card className="h-full transition-colors group-hover:ring-primary/30">
                <CardContent className="flex items-center gap-3">
                  <TrendingUp className="size-5 text-muted-foreground" />
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      变现与运营 {"→"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      5大变现路径、收入计算、投流技巧、运营节奏
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/learn/editing" className="block group">
              <Card className="h-full transition-colors group-hover:ring-primary/30">
                <CardContent className="flex items-center gap-3">
                  <Scissors className="size-5 text-muted-foreground" />
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {"←"} 剪辑合成
                    </p>
                    <p className="text-xs text-muted-foreground">
                      剪映工作流、节奏控制、字幕与特效
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
