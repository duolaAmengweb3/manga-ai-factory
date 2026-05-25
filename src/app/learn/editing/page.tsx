import Link from "next/link";
import { Scissors, Film, FileText, Lightbulb, Upload, TrendingUp, AlertTriangle } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* ───── Data ───── */

const tools = [
  {
    name: "剪映专业版",
    price: "免费",
    pros: "上手简单、模板丰富、字幕识别好、特效多",
    cons: "高级功能有限",
    recommend: true,
    tag: "新手首选",
  },
  {
    name: "Premiere Pro",
    price: "¥154/月",
    pros: "功能全面、行业标准、插件生态丰富",
    cons: "学习曲线陡、付费",
    recommend: false,
    tag: "专业级",
  },
  {
    name: "DaVinci Resolve",
    price: "免费",
    pros: "专业调色、免费功能强大、Fusion特效",
    cons: "吃硬件、界面复杂",
    recommend: false,
    tag: "免费专业级",
  },
];

const trackLayout = [
  { icon: "V", name: "画面轨", bar: "████████████████████", desc: "分镜图片序列，按镜头号排列。每个片段对应一个分镜，时长根据镜头类型调整" },
  { icon: "A", name: "配音轨", bar: "██  ███  ██  ████", desc: "角色台词音频。对齐画面中角色说话的时间点，注意口型节奏" },
  { icon: "M", name: "BGM轨", bar: "████████████████████", desc: "背景音乐，全程铺底。音量控制在 -15dB 到 -20dB，不要盖过配音" },
  { icon: "S", name: "音效轨", bar: "█    █   █    █", desc: "关键动作的音效点。开门声、脚步声、打击音效等，点到为止" },
  { icon: "T", name: "字幕轨", bar: "██  ███  ██  ████", desc: "台词字幕+旁白字幕。与配音轨严格对齐，逐句校对" },
];

const pacingRules = [
  { type: "对话镜头", duration: "2-3秒", reason: "配合语速，让观众读完字幕" },
  { type: "动作镜头", duration: "1-1.5秒", reason: "快切制造紧张感，连续切换增加冲击力" },
  { type: "情绪镜头", duration: "3-5秒", reason: "留白让观众感受情绪，配合BGM渲染" },
  { type: "转场", duration: "0.3-0.5秒", reason: "不要太慢，保持节奏流畅" },
  { type: "全景建立镜头", duration: "2-3秒", reason: "让观众认识环境，交代时空背景" },
  { type: "特写反应镜头", duration: "1.5-2秒", reason: "强调角色情绪反应，抓住观众注意力" },
];

const transitions = [
  { type: "硬切", scene: "对话来回、动作连续", operation: "不加转场，直接拼接", usage: "70%+" },
  { type: "闪白", scene: "时间跳跃、回忆切换、反转", operation: "效果 → 基础 → 闪白，0.3秒", usage: "10%" },
  { type: "模糊推近", scene: "悬念升级、情绪加深", operation: "效果 → 基础 → 模糊，0.5秒", usage: "5%" },
  { type: "漫画翻页", scene: "日常/对话场景过渡", operation: "效果 → 特效 → 翻页", usage: "10%" },
  { type: "黑场", scene: "章节结束、重大转折", operation: "插入纯黑帧 0.5秒", usage: "5%" },
];

const subtitleStyles = [
  { type: "对白字幕", style: "白色描边字", position: "底部居中", size: "24-28", note: "最常用，清晰易读" },
  { type: "旁白字幕", style: "黄色或浅灰", position: "顶部或底部1/3处", size: "22-26", note: "区分对白，不抢画面" },
  { type: "角色名标注", style: "角色名+冒号", position: "对白字幕前", size: "20-22", note: "可选，多角色对话时建议加" },
  { type: "特效字幕", style: "放大+抖动+描边", position: "画面中心", size: "32-40", note: "爽点时用，如「你说什么？！」" },
];

const exportSettings = [
  { param: "分辨率", value: "1080×1920（竖屏）", note: "抖音/快手/红果标准竖屏比例" },
  { param: "帧率", value: "30fps", note: "够用，不需要60fps" },
  { param: "码率", value: "8-15Mbps", note: "画质与文件大小的最佳平衡" },
  { param: "格式", value: "MP4 (H.264)", note: "通用格式，所有平台都支持" },
  { param: "文件大小", value: "<500MB", note: "超过部分平台无法上传" },
];

const jianyingShortcuts = [
  { action: "导入素材", steps: "拖入素材面板，或点击「导入」按钮选择文件" },
  { action: "调整时长", steps: "选中片段 → 拖动边缘缩短/延长" },
  { action: "添加音频", steps: "音频面板 → 导入 → 拖到对应轨道位置" },
  { action: "添加字幕", steps: "文本 → 识别字幕（自动） → 逐条手动校对" },
  { action: "添加音效", steps: "音效面板 → 搜索关键词 → 拖入音效轨" },
  { action: "调音量", steps: "选中音频片段 → 属性面板 → 调节音量滑块" },
  { action: "关键帧动画", steps: "选中片段 → 右键 → 添加关键帧（做推拉/缩放效果）" },
  { action: "画面裁剪", steps: "选中片段 → 属性 → 画面 → 裁剪/缩放" },
  { action: "变速", steps: "选中片段 → 右键 → 变速 → 常规变速/曲线变速" },
  { action: "导出", steps: "右上角「导出」→ 设置参数 → 开始导出" },
];

export const metadata = { title: "剪辑合成" };

/* ───── Page ───── */

export default function EditingPage() {
  return (
    <DashboardLayout>
      <div className="space-y-12">
        {/* ── Header ── */}
        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-foreground tracking-tight sm:text-3xl flex items-center gap-2">
            <Scissors className="size-6 text-primary" /> 剪辑合成
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
            把分镜图片、视频片段、配音、BGM、字幕合成为完整的漫剧作品
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
            剪辑是整个AI漫剧流程中最关键的环节之一。好的剪辑节奏能让平庸的素材变精彩，
            差的剪辑能毁掉优秀的画面和剧本。本章详解工具选择、轨道布局、节奏控制、
            转场效果、字幕设计和导出设置。
          </p>
        </div>

        {/* ── Section: 工具选择 ── */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-1">
            工具选择
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            新手用剪映，够用且免费；进阶再考虑专业工具
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            {tools.map((tool) => (
              <Card key={tool.name} className={tool.recommend ? "ring-primary/30" : ""}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {tool.name}
                    <Badge variant={tool.recommend ? "default" : "secondary"} className="text-[10px] px-1.5">
                      {tool.tag}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">价格</span>
                    <span className="font-medium text-foreground">{tool.price}</span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      <strong className="text-emerald-600">优势：</strong>
                      {tool.pros}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <strong className="text-amber-600">不足：</strong>
                      {tool.cons}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-4 border-primary/20 bg-primary/5">
            <CardContent className="text-sm">
              <p className="font-semibold text-foreground mb-1">
                <Lightbulb className="size-4 text-primary inline" /> 推荐方案
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">新手直接用剪映专业版</strong>，
                它的功能完全够 AI 漫剧使用。字幕自动识别、丰富的转场和音效库、
                简单的关键帧动画——这些就是你需要的全部。等你产量上来、需要更精细的调色或特效时，
                再考虑 DaVinci Resolve（免费）或 Premiere Pro（付费）。
              </p>
            </CardContent>
          </Card>
        </section>

        {/* ── Section: 轨道布局 ── */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-1">
            轨道布局
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            标准 5 轨道布局，每条轨道各司其职
          </p>

          {/* Visual track layout */}
          <Card className="mb-4">
            <CardContent>
              <div className="space-y-1.5 font-mono text-xs sm:text-sm">
                {trackLayout.map((track) => (
                  <div key={track.name} className="flex items-center gap-2 sm:gap-3">
                    <span className="w-16 sm:w-20 shrink-0 text-right text-muted-foreground">
                      {track.icon} {track.name}
                    </span>
                    <span className="text-primary/70 tracking-tighter overflow-hidden whitespace-nowrap">
                      {track.bar}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            {trackLayout.map((track) => (
              <Card key={track.name} size="sm">
                <CardContent className="flex items-start gap-3">
                  <span className="text-lg shrink-0">{track.icon}</span>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{track.name}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{track.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ── Section: 节奏控制公式 ── */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-1">
            节奏控制公式
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            每种镜头类型的最佳停留时长——这是决定完播率的核心因素
          </p>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">镜头类型</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">每张图停留时长</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">理由</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {pacingRules.map((rule) => (
                      <tr key={rule.type}>
                        <td className="px-4 py-2.5 font-medium text-foreground">{rule.type}</td>
                        <td className="px-4 py-2.5">
                          <Badge variant="secondary" className="font-mono text-xs">
                            {rule.duration}
                          </Badge>
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">{rule.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4 border-amber-200 bg-amber-50/50">
            <CardContent className="text-sm">
              <p className="font-semibold text-foreground mb-2">
                <AlertTriangle className="size-4 text-amber-500 inline" /> 总时长控制
              </p>
              <div className="text-muted-foreground space-y-1.5">
                <p>
                  <strong className="text-foreground">1-3 分钟为最佳时长</strong>，
                  超过 3 分钟完播率会骤降。各平台推荐：
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong className="text-foreground">抖音：</strong>1-2 分钟最佳，前 3 秒必须有钩子</li>
                  <li><strong className="text-foreground">快手：</strong>1-3 分钟，可以稍长，用户耐心更好</li>
                  <li><strong className="text-foreground">红果短剧：</strong>2-5 分钟/集，系列剧可以更长</li>
                  <li><strong className="text-foreground">B站：</strong>3-5 分钟也可以，但需要内容密度高</li>
                </ul>
                <p className="mt-2">
                  <strong className="text-foreground">黄金法则：</strong>宁短勿长。
                  如果内容不够撑 3 分钟，就做 1 分钟精品。砍掉所有不推动剧情的画面。
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ── Section: 转场效果 ── */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-1">
            转场效果
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            硬切占 70% 以上，特效转场只在关键节点用——不要过度使用转场
          </p>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">转场类型</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">适用场景</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">剪映操作</th>
                      <th className="px-4 py-3 text-center font-medium text-muted-foreground">占比</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {transitions.map((t) => (
                      <tr key={t.type} className={t.type === "硬切" ? "bg-primary/5" : ""}>
                        <td className="px-4 py-2.5 font-medium text-foreground">{t.type}</td>
                        <td className="px-4 py-2.5 text-muted-foreground">{t.scene}</td>
                        <td className="px-4 py-2.5 text-muted-foreground font-mono text-xs">{t.operation}</td>
                        <td className="px-4 py-2.5 text-center">
                          <Badge variant={t.type === "硬切" ? "default" : "secondary"} className="text-[10px] px-1.5">
                            {t.usage}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4 border-primary/20 bg-primary/5">
            <CardContent className="text-sm">
              <p className="font-semibold text-foreground mb-1">
                <Lightbulb className="size-4 text-primary inline" /> 转场使用原则
              </p>
              <p className="text-muted-foreground">
                新手最常犯的错误就是<strong className="text-foreground">疯狂加转场特效</strong>。
                记住：转场的作用是服务叙事，不是炫技。硬切是最高效的转场方式，
                观众几乎不会注意到硬切。只有在时间跳跃、情绪转折、章节分隔等关键节点才需要特效转场。
                <strong className="text-foreground">一条 1 分钟的视频，最多用 2-3 个特效转场</strong>。
              </p>
            </CardContent>
          </Card>
        </section>

        {/* ── Section: 字幕设计 ── */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-1">
            字幕设计
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            字幕是漫剧的核心信息载体，设计好坏直接影响观看体验
          </p>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">字幕类型</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">样式</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">位置</th>
                      <th className="px-4 py-3 text-center font-medium text-muted-foreground">字号</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">说明</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {subtitleStyles.map((s) => (
                      <tr key={s.type}>
                        <td className="px-4 py-2.5 font-medium text-foreground">{s.type}</td>
                        <td className="px-4 py-2.5 text-muted-foreground">{s.style}</td>
                        <td className="px-4 py-2.5 text-muted-foreground">{s.position}</td>
                        <td className="px-4 py-2.5 text-center">
                          <Badge variant="secondary" className="font-mono text-[10px] px-1.5">{s.size}</Badge>
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">{s.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-3 sm:grid-cols-2 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">字体推荐</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <ul className="space-y-1.5">
                  <li><strong className="text-foreground">思源黑体：</strong>开源免费，清晰易读，首选</li>
                  <li><strong className="text-foreground">PingFang SC：</strong>苹果系统自带，质感好</li>
                  <li><strong className="text-foreground">阿里巴巴普惠体：</strong>免费商用，现代感强</li>
                  <li><strong className="text-foreground">站酷高端黑：</strong>免费，适合标题</li>
                </ul>
                <p className="text-xs border-t border-border pt-2">
                  <AlertTriangle className="size-4 text-amber-500 inline" /> <strong className="text-foreground">不要用花体字、书法字</strong>——影响阅读速度，
                  观众在短视频中停留时间极短，字幕必须一眼能看清。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">字幕技巧</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <ul className="space-y-1.5">
                  <li><strong className="text-foreground">描边厚度：</strong>2-3px，太薄看不清，太厚影响美观</li>
                  <li><strong className="text-foreground">每行字数：</strong>不超过 15 字，太长换行</li>
                  <li><strong className="text-foreground">显示时长：</strong>跟配音严格对齐，提前 0.2 秒出现</li>
                  <li><strong className="text-foreground">安全区域：</strong>底部留出 15% 空间，避免被平台UI遮挡</li>
                </ul>
                <p className="text-xs border-t border-border pt-2">
                  <Lightbulb className="size-4 text-primary inline" /> 剪映的<strong className="text-foreground">自动识别字幕</strong>功能虽然方便，
                  但一定要<strong className="text-foreground">逐条手动校对</strong>——错别字会让观众瞬间出戏。
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ── Section: 片头片尾 ── */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-1">
            片头片尾
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            片头 3 秒、片尾 3 秒——多一秒都是浪费
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-emerald-600">
                  <Film className="size-4 text-primary inline" /> 片头（3秒以内）
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <ul className="space-y-1.5">
                  <li><strong className="text-foreground">系列Logo/品牌名：</strong>简洁的文字或图标，建立辨识度</li>
                  <li><strong className="text-foreground">集数标题：</strong>&quot;第X集：XXXX&quot; 格式，让观众知道在看第几集</li>
                  <li><strong className="text-foreground">BGM渐入：</strong>音乐从静音渐入，0.5秒过渡</li>
                </ul>
                <p className="text-xs border-t border-border pt-2">
                  <AlertTriangle className="size-4 text-amber-500 inline" /> <strong className="text-foreground">绝对不要超过 3 秒</strong>。
                  短视频用户的耐心极低，片头越长、滑走率越高。
                  最好的片头是直接用第一个画面叠加品牌水印。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-violet-600">
                  <Film className="size-4 text-primary inline" /> 片尾（3秒以内）
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <ul className="space-y-1.5">
                  <li><strong className="text-foreground">悬念画面：</strong>下一集的关键帧，吊起好奇心</li>
                  <li><strong className="text-foreground">引导文案：</strong>&quot;下集更精彩&quot; + &quot;点击关注不迷路&quot;</li>
                  <li><strong className="text-foreground">BGM渐出：</strong>音乐淡出，0.5秒过渡到静音</li>
                </ul>
                <p className="text-xs border-t border-border pt-2">
                  <Lightbulb className="size-4 text-primary inline" /> 片尾的核心目的是<strong className="text-foreground">引导关注和追剧</strong>。
                  用下一集最劲爆的画面做预告，配合 &quot;想知道结局？关注我&quot; 这类文案。
                  不要放二维码或长段文字。
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ── Section: 导出设置 ── */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-1">
            导出设置
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            参数设对了，画质和文件大小才能平衡
          </p>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">参数</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">推荐值</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">说明</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {exportSettings.map((s) => (
                      <tr key={s.param}>
                        <td className="px-4 py-2.5 font-medium text-foreground">{s.param}</td>
                        <td className="px-4 py-2.5">
                          <Badge variant="secondary" className="font-mono text-xs">{s.value}</Badge>
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">{s.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4 border-primary/20 bg-primary/5">
            <CardContent className="text-sm">
              <p className="font-semibold text-foreground mb-1">
                <Lightbulb className="size-4 text-primary inline" /> 多平台导出技巧
              </p>
              <p className="text-muted-foreground">
                如果同时发多个平台，建议<strong className="text-foreground">只导出一个高码率版本（15Mbps）</strong>，
                然后各平台上传时让它们自己压缩。不要为每个平台单独导出——浪费时间且各平台压缩算法不同，
                你手动压缩不一定比平台自动压缩效果好。
              </p>
            </CardContent>
          </Card>
        </section>

        {/* ── Section: 剪映操作速查 ── */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-1">
            剪映操作速查
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            最常用的 10 个操作，快速上手
          </p>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">操作</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">步骤</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {jianyingShortcuts.map((s) => (
                      <tr key={s.action}>
                        <td className="px-4 py-2.5 font-medium text-foreground whitespace-nowrap">{s.action}</td>
                        <td className="px-4 py-2.5 text-muted-foreground">{s.steps}</td>
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
            下一步
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link href="/learn/publishing" className="block group">
              <Card className="h-full transition-colors group-hover:ring-primary/30">
                <CardContent className="flex items-center gap-3">
                  <Upload className="size-5 text-muted-foreground" />
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      发布与备案 {"→"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      各平台规则、AI标注要求、备案流程详解
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/learn/monetization" className="block group">
              <Card className="h-full transition-colors group-hover:ring-primary/30">
                <CardContent className="flex items-center gap-3">
                  <TrendingUp className="size-5 text-muted-foreground" />
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      变现与运营 {"→"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      5大变现路径、投流技巧、运营节奏规划
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
