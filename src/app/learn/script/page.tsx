import Link from "next/link";
import { PenTool, Lightbulb, BookOpen } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "剧本创作" };

/* ───── Page ───── */

export default function ScriptPage() {
  return (
    <DashboardLayout>
      <div className="space-y-12">
        {/* ── Header ── */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/learn" className="hover:text-primary transition-colors">
              知识库
            </Link>
            <span>/</span>
            <span className="text-foreground">剧本创作</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight sm:text-3xl">
            {"\u{270F}\u{FE0F}"} 剧本创作
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
            选题决定天花板，结构决定完播率，爽点决定传播力。
            这一节从选题到完稿，手把手教你用 AI 写出能火的漫剧剧本。
          </p>
        </div>

        {/* ── Table of Contents ── */}
        <Card size="sm">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-1.5"><BookOpen className="size-4 text-primary" /> 目录</CardTitle>
          </CardHeader>
          <CardContent>
            <nav className="grid gap-1 sm:grid-cols-2 text-sm">
              <a href="#topic" className="text-primary hover:underline">
                1. 选题决定一切
              </a>
              <a href="#structure" className="text-primary hover:underline">
                2. 剧本结构
              </a>
              <a href="#ai-writing" className="text-primary hover:underline">
                3. 用 AI 写剧本
              </a>
              <a href="#hook" className="text-primary hover:underline">
                4. 爽点设计公式
              </a>
              <a href="#example" className="text-primary hover:underline">
                5. 完整剧本示例
              </a>
              <a href="#mistakes" className="text-primary hover:underline">
                6. 常见错误与避坑
              </a>
            </nav>
          </CardContent>
        </Card>

        {/* ═══════════════════════════════════
            SECTION 1: 选题决定一切
            ═══════════════════════════════════ */}
        <section id="topic">
          <h2 className="text-xl font-bold text-foreground mb-1">
            1. 选题决定一切
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            选题决定了你的天花板。题材选错，制作再精良也没用。
          </p>

          {/* Topic categories */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-foreground">
              热门题材分析
            </h3>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                          题材
                        </th>
                        <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                          核心客群
                        </th>
                        <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                          适合平台
                        </th>
                        <th className="px-4 py-2.5 text-center font-medium text-muted-foreground">
                          竞争度
                        </th>
                        <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                          特点
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="px-4 py-2.5 font-medium text-foreground">
                          都市逆袭
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          18-35岁男性
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          抖音、红果
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          <Badge variant="destructive" className="text-[10px]">
                            极高
                          </Badge>
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          小人物逆袭打脸，爽感强，容易爆但同质化严重
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 font-medium text-foreground">
                          古风宫斗
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          18-40岁女性
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          红果、抖音
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          <Badge variant="destructive" className="text-[10px]">
                            高
                          </Badge>
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          后宫争斗+爱情线，AI古风图质量高，画面有优势
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 font-medium text-foreground">
                          玄幻战神
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          15-30岁男性
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          抖音、B站
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          <Badge variant="destructive" className="text-[10px]">
                            极高
                          </Badge>
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          升级打怪流，视觉效果要求高，特效是难点
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 font-medium text-foreground">
                          校园甜宠
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          15-25岁女性
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          抖音、B站
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          <Badge variant="secondary" className="text-[10px]">
                            中
                          </Badge>
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          甜蜜恋爱向，场景单一容易制作，但天花板相对低
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 font-medium text-foreground">
                          商战复仇
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          25-45岁男性
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          抖音、快手
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          <Badge variant="secondary" className="text-[10px]">
                            中高
                          </Badge>
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          职场+复仇双线，对白质量要求高，需要商业逻辑
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 font-medium text-foreground">
                          家庭情感
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          30-50岁女性
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          快手、抖音
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          <Badge variant="outline" className="text-[10px]">
                            中低
                          </Badge>
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          婆媳/夫妻矛盾，快手特别吃这个，制作难度低
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 font-medium text-foreground">
                          悬疑推理
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          20-40岁男女
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          B站、抖音
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          <Badge variant="outline" className="text-[10px]">
                            低
                          </Badge>
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          蓝海但难度高，剧本逻辑要求严格，适合有功底的
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 font-medium text-foreground">
                          科普/教育
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          全年龄
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          B站、抖音
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          <Badge variant="outline" className="text-[10px]">
                            极低
                          </Badge>
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          用漫剧讲知识，差异化强，适合有专业背景的创作者
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Platform x Topic Match */}
            <h3 className="text-base font-semibold text-foreground mt-6">
              题材 x 平台匹配
            </h3>
            <div className="grid gap-3 sm:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">抖音</CardTitle>
                  <CardDescription>爱爽剧、快节奏</CardDescription>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground space-y-1">
                  <p>
                    前 3 秒必须抓人，每 15-20 秒要有反转。
                    都市逆袭和玄幻战神是抖音的流量密码。
                    对白要短促有力，不能拖。
                  </p>
                  <p className="text-foreground font-medium">
                    推荐：都市逆袭、玄幻战神、商战复仇
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">B站</CardTitle>
                  <CardDescription>爱叙事、重质量</CardDescription>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground space-y-1">
                  <p>
                    用户耐心更好，可以做 3-5 分钟的长集。
                    弹幕文化意味着需要设计&quot;弹幕爆发点&quot;。
                    画质和分镜要求更高。
                  </p>
                  <p className="text-foreground font-medium">
                    推荐：悬疑推理、科普、校园、二次元
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">快手</CardTitle>
                  <CardDescription>爱接地气、重共鸣</CardDescription>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground space-y-1">
                  <p>
                    下沉市场用户多，喜欢有生活气息的内容。
                    家庭伦理和情感剧在快手特别受欢迎。
                    对白要口语化、生活化。
                  </p>
                  <p className="text-foreground font-medium">
                    推荐：家庭情感、都市生活、农村题材
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Finding ideas */}
            <h3 className="text-base font-semibold text-foreground mt-6">
              怎么找灵感
            </h3>
            <Card>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                <div>
                  <p className="font-medium text-foreground mb-1">
                    1. 番茄小说/七猫热榜
                  </p>
                  <p>
                    打开番茄小说 App，看&quot;畅销榜&quot;和&quot;飙升榜&quot;。前 20 名的题材就是当前用户最爱。
                    重点看标题和前三章——这就是你的选题池。
                    注意：不要照搬内容（侵权），只参考题材和冲突模式。
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">
                    2. 抖音漫剧热搜
                  </p>
                  <p>
                    搜索&quot;AI漫剧&quot;&quot;漫改短剧&quot;，按点赞数排序。
                    看评论区——用户在追更的、在催更的、在讨论的题材就是有需求的。
                    记录爆款的标题格式和钩子结构。
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">
                    3. 竞品拆解
                  </p>
                  <p>
                    找到 3-5 个同赛道做得好的账号，逐集拆解：第一集钩子怎么设？
                    每集几个反转？悬念怎么设置？对白风格如何？
                    拆解 10 个爆款，你就能总结出这个题材的&quot;公式&quot;。
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">
                    4. AI 头脑风暴
                  </p>
                  <p>
                    直接让 AI 帮你想：
                  </p>
                  <pre className="mt-2 p-3 rounded-lg bg-muted text-xs font-mono overflow-x-auto whitespace-pre-wrap">
{`请给我 10 个适合 AI 漫剧的选题方向，要求：
1. 在抖音有流量潜力
2. 目标用户：18-30岁男性
3. 场景数量控制在 3-5 个（减少出图工作量）
4. 每个选题给出：核心冲突、主角设定、前3秒钩子示例`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ═══════════════════════════════════
            SECTION 2: 剧本结构
            ═══════════════════════════════════ */}
        <section id="structure">
          <h2 className="text-xl font-bold text-foreground mb-1">
            2. 剧本结构
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            结构对了，完播率就有保障
          </p>

          <div className="space-y-4">
            {/* Single episode structure */}
            <h3 className="text-base font-semibold text-foreground">
              单集结构（黄金公式）
            </h3>
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="px-4 py-2.5 text-left font-medium text-muted-foreground w-24">
                          时间段
                        </th>
                        <th className="px-4 py-2.5 text-left font-medium text-muted-foreground w-24">
                          功能
                        </th>
                        <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                          说明
                        </th>
                        <th className="px-4 py-2.5 text-left font-medium text-muted-foreground w-20">
                          镜头数
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr className="bg-primary/5">
                        <td className="px-4 py-2.5 font-medium text-primary">
                          0-3秒
                        </td>
                        <td className="px-4 py-2.5 font-medium text-foreground">
                          钩子
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          决定用户是否继续看。用视觉冲击/悬念/数字/反差抓住注意力。
                          这 3 秒决定了你 80% 的流量。
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          1-2
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 font-medium text-foreground">
                          3-20秒
                        </td>
                        <td className="px-4 py-2.5 font-medium text-foreground">
                          铺垫
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          快速建立情境：谁、在哪、发生了什么。不要废话，每句台词都要推进剧情。
                          让观众在 20 秒内理解基本冲突。
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          3-5
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 font-medium text-foreground">
                          20-40秒
                        </td>
                        <td className="px-4 py-2.5 font-medium text-foreground">
                          反转1
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          第一个小高潮。打破观众预期，激发好奇心。
                          例如：被嘲笑的小人物突然展现出隐藏实力。
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          3-5
                        </td>
                      </tr>
                      <tr className="bg-primary/5">
                        <td className="px-4 py-2.5 font-medium text-primary">
                          40-80秒
                        </td>
                        <td className="px-4 py-2.5 font-medium text-foreground">
                          高潮
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          本集最爽的部分。主角发力、反派被打脸、真相揭露。
                          这个段落要让观众有&quot;看爽了&quot;的感觉。密集安排台词和动作。
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          5-8
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 font-medium text-foreground">
                          80-100秒
                        </td>
                        <td className="px-4 py-2.5 font-medium text-foreground">
                          反转2
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          以为结束了？再来一个反转。这个反转引出下一集的悬念。
                          例如：打完小 Boss 发现背后还有大 Boss。
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          2-3
                        </td>
                      </tr>
                      <tr className="bg-amber-50/50">
                        <td className="px-4 py-2.5 font-medium text-amber-700">
                          100-120秒
                        </td>
                        <td className="px-4 py-2.5 font-medium text-foreground">
                          悬念结尾
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          留下钩子让观众想看下一集。最后一个镜头要有&quot;未完待续&quot;的感觉。
                          可以是一句悬念台词、一个意外人物出场、一个未解之谜。
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          1-2
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Series structure */}
            <h3 className="text-base font-semibold text-foreground mt-6">
              连续剧结构
            </h3>
            <Card>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                <div>
                  <p className="font-medium text-foreground mb-1">
                    标准集数：10 集
                  </p>
                  <p>
                    10 集是目前 AI 漫剧的黄金集数。太短（3-5集）养不起粉丝粘性，
                    太长（20+集）制作周期拖不起，而且容易角色崩脸。
                    建议先做 10 集试水，反响好再续。
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">
                    前 3 集定生死
                  </p>
                  <p>
                    第 1 集决定用户会不会关注，第 2 集决定会不会追更，第 3 集决定会不会分享。
                    前 3 集的质量必须是全剧最高的。宁可后面略降，前面绝不能马虎。
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">
                    双线结构
                  </p>
                  <p>
                    每集要有两条线：
                    <strong className="text-foreground">单集爽点线</strong>（本集看完就爽） +
                    <strong className="text-foreground">跨集悬念线</strong>（看完想追下一集）。
                    单集爽点解决完播率，跨集悬念解决追更率。
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Shot breakdown rules */}
            <h3 className="text-base font-semibold text-foreground mt-6">
              镜头拆分规则
            </h3>
            <Card>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                <p>
                  每集控制在 <strong className="text-foreground">15-25 个镜头</strong>。
                  低于 15 个镜头节奏太慢，超过 25 个镜头出图工作量爆炸（每个镜头至少生成 3-5 张图才能选到满意的）。
                </p>
                <p className="font-medium text-foreground">
                  每个镜头必须标注以下信息：
                </p>
                <Card className="bg-muted/50">
                  <CardContent>
                    <pre className="text-xs font-mono whitespace-pre-wrap">
{`镜头编号：#03
景别：中景（腰部以上）
场景：现代办公室，落地窗，城市天际线
人物：林远（主角）、王总（反派）
动作：林远站起来，把合同摔在桌上
表情：林远 → 冷笑；王总 → 震惊
台词：林远："这份合同，从第一页就是伪造的。"
旁白：（无）
特效/转场：无`}
                    </pre>
                  </CardContent>
                </Card>
                <p>
                  景别速查：
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                          景别
                        </th>
                        <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                          范围
                        </th>
                        <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                          适合场景
                        </th>
                        <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                          英文 Prompt
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="px-3 py-2 font-medium text-foreground">
                          大远景
                        </td>
                        <td className="px-3 py-2">整个场景+人物很小</td>
                        <td className="px-3 py-2">建立环境、转场</td>
                        <td className="px-3 py-2 font-mono">
                          extreme wide shot
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-medium text-foreground">
                          远景
                        </td>
                        <td className="px-3 py-2">人物全身可见</td>
                        <td className="px-3 py-2">展示场景关系</td>
                        <td className="px-3 py-2 font-mono">wide shot</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-medium text-foreground">
                          全景
                        </td>
                        <td className="px-3 py-2">人物全身+少量环境</td>
                        <td className="px-3 py-2">动作戏、走位</td>
                        <td className="px-3 py-2 font-mono">full shot</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-medium text-foreground">
                          中景
                        </td>
                        <td className="px-3 py-2">腰部以上</td>
                        <td className="px-3 py-2">对话、互动</td>
                        <td className="px-3 py-2 font-mono">medium shot</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-medium text-foreground">
                          近景
                        </td>
                        <td className="px-3 py-2">胸部以上</td>
                        <td className="px-3 py-2">表情、情感传递</td>
                        <td className="px-3 py-2 font-mono">close-up shot</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-medium text-foreground">
                          特写
                        </td>
                        <td className="px-3 py-2">脸部/手部/物品</td>
                        <td className="px-3 py-2">关键道具、强烈情感</td>
                        <td className="px-3 py-2 font-mono">
                          extreme close-up
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ═══════════════════════════════════
            SECTION 3: 用 AI 写剧本
            ═══════════════════════════════════ */}
        <section id="ai-writing">
          <h2 className="text-xl font-bold text-foreground mb-1">
            3. 用 AI 写剧本
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            AI 写剧本不难，难的是会&quot;调&quot;——用正确的 prompt 引导 AI 输出你想要的结果
          </p>

          <div className="space-y-4">
            <h3 className="text-base font-semibold text-foreground">
              推荐工具
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">豆包</CardTitle>
                  <CardDescription>首选，免费且中文能力强</CardDescription>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground">
                  字节跳动出品，对中文网文风格理解最好。
                  写&quot;爽文&quot;类剧本的首选。支持长对话上下文，可以逐集推进。
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">DeepSeek-R1</CardTitle>
                  <CardDescription>复杂逻辑和长剧本</CardDescription>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground">
                  推理能力强，适合需要复杂逻辑的悬疑/推理题材。
                  可以一次生成完整的 10 集大纲，逻辑连贯性好。
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Kimi</CardTitle>
                  <CardDescription>超长上下文</CardDescription>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground">
                  上下文窗口大，适合在聊天中逐步完善剧本。
                  可以把整个系列大纲和前几集剧本都贴进去，保证后续集数的连贯性。
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">ChatGPT</CardTitle>
                  <CardDescription>英文 prompt 优化</CardDescription>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground">
                  中文剧本写完后，用 ChatGPT 把镜头描述翻译成高质量英文 prompt。
                  GPT 对 Midjourney/SD 的 prompt 格式理解最好。
                </CardContent>
              </Card>
            </div>

            {/* Full prompt template */}
            <h3 className="text-base font-semibold text-foreground mt-6">
              完整 Prompt 模板
            </h3>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">
                  Step 1：生成系列大纲
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="p-3 rounded-lg bg-muted text-xs font-mono overflow-x-auto whitespace-pre-wrap">
{`你是一个专业的短剧编剧。请为我创作一部 AI 漫剧的完整大纲：

基本设定：
- 题材：都市逆袭
- 总集数：10集
- 每集时长：约2分钟（500-800字）
- 主角：林远，25岁，被公司陷害的金融天才，外表平凡但内心坚韧
- 女主：苏晚，28岁，某投资公司VP，冷面御姐，后期成为盟友
- 反派：王耀辉，40岁，林远前公司CEO，陷害林远的幕后主使

请输出：
1. 每集的核心冲突（一句话）
2. 每集的爽点设计（什么时候爽、怎么爽）
3. 每集的悬念结尾（钩子是什么）
4. 跨集的主线推进（大阴谋揭露进度）`}
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">
                  Step 2：生成单集剧本
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="p-3 rounded-lg bg-muted text-xs font-mono overflow-x-auto whitespace-pre-wrap">
{`基于上面的大纲，请写出第1集的完整剧本。

要求：
1. 每个镜头单独编号（#01, #02, ...）
2. 每个镜头必须标注：
   - 景别（大远景/远景/全景/中景/近景/特写）
   - 场景（具体环境描述）
   - 人物（出场人物及位置关系）
   - 动作（人物的具体动作）
   - 表情（人物的面部表情）
   - 台词（角色说的话，用引号标注）
   - 旁白（如果有旁白的话）
3. 全集控制在 18-22 个镜头
4. 全集字数控制在 500-800 字
5. 前3秒必须有视觉钩子
6. 每 20 秒安排一个小反转或爽点
7. 结尾必须有悬念

语言风格：
- 台词要口语化，像真人说话
- 不要用文学化的描述
- 反派要"欠揍"，观众恨他才对
- 主角要"隐忍"，观众心疼他才对`}
                </pre>
              </CardContent>
            </Card>

            {/* How to adjust AI output */}
            <h3 className="text-base font-semibold text-foreground mt-6">
              AI 输出调整技巧
            </h3>
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                          问题
                        </th>
                        <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                          调整 Prompt
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="px-4 py-2.5 text-foreground font-medium">
                          剧本太长，超过 800 字
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          &quot;请精简到 20 个镜头以内，每个镜头的台词不超过 2 句话，删掉所有不推进剧情的对白&quot;
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 text-foreground font-medium">
                          不够爽，太平淡
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          &quot;在第 X 个镜头后加一个反转：原来 XX 是 XX。每 20 秒要有一个让观众&apos;卧槽&apos;的瞬间&quot;
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 text-foreground font-medium">
                          对白太书面化
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          &quot;把所有台词改成口语，像 20 岁年轻人日常说话的方式。不要用&apos;然而&apos;&apos;此刻&apos;&apos;殊不知&apos;这类书面词&quot;
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 text-foreground font-medium">
                          没有标注景别
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          &quot;请为每个镜头补充景别标注（大远景/远景/全景/中景/近景/特写），并确保相邻两个镜头景别有变化&quot;
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 text-foreground font-medium">
                          角色太单薄
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          &quot;给反派加一个&apos;小动作&apos;来体现他的性格，比如他说话时总喜欢转笔/整理袖扣。给主角加一个&apos;标志性台词&apos;&quot;
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 text-foreground font-medium">
                          前 3 秒没钩子
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          &quot;第一个镜头必须是全剧最有冲击力的画面或台词，可以用倒叙法——先给高潮画面，再回到开头讲故事&quot;
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 text-foreground font-medium">
                          结尾没悬念
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          &quot;最后一个镜头要留悬念。选一个：A. 新角色出场说一句意味深长的话 B. 主角发现一个惊人秘密 C. 反派露出真面目&quot;
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ═══════════════════════════════════
            SECTION 4: 爽点设计公式
            ═══════════════════════════════════ */}
        <section id="hook">
          <h2 className="text-xl font-bold text-foreground mb-1">
            4. 爽点设计公式
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            爽点不是玄学，是可以公式化生产的
          </p>

          <div className="space-y-4">
            {/* Opening hook types */}
            <h3 className="text-base font-semibold text-foreground">
              前 3 秒钩子类型
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">反差型</CardTitle>
                  <CardDescription>
                    用视觉或信息的强烈反差抓注意力
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground space-y-2">
                  <p className="italic text-foreground">
                    &quot;一个穿着保安制服的人，坐在总裁办公室里签署了一份 10 亿的合同。&quot;
                  </p>
                  <p className="italic text-foreground">
                    &quot;所有人都在嘲笑他是废物，直到他掏出了那张黑卡。&quot;
                  </p>
                  <p className="italic text-foreground">
                    &quot;她穿着清洁工的制服走进董事会，所有人都愣住了。&quot;
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">数字型</CardTitle>
                  <CardDescription>
                    用具体数字制造冲击感
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground space-y-2">
                  <p className="italic text-foreground">
                    &quot;三天前他还是个月薪 3000 的实习生，三天后他的账户多了 3 个亿。&quot;
                  </p>
                  <p className="italic text-foreground">
                    &quot;她用 72 小时，搞垮了一个经营了 20 年的集团。&quot;
                  </p>
                  <p className="italic text-foreground">
                    &quot;1 分钟前他被开除，1 分钟后对面公司出价 500 万请他加入。&quot;
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">悬念型</CardTitle>
                  <CardDescription>
                    抛出一个让人忍不住想知道答案的问题
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground space-y-2">
                  <p className="italic text-foreground">
                    &quot;如果你发现你的妻子，和你最好的朋友，在密谋着什么...&quot;
                  </p>
                  <p className="italic text-foreground">
                    &quot;他死了三次，每次醒来都在同一天早上。&quot;
                  </p>
                  <p className="italic text-foreground">
                    &quot;这封信是三年前寄出的。但寄信人......是未来的她自己。&quot;
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">震惊型</CardTitle>
                  <CardDescription>
                    直接用高能画面或台词开场
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground space-y-2">
                  <p className="italic text-foreground">
                    &quot;跪下。——她对着全公司 300 人说。&quot;
                  </p>
                  <p className="italic text-foreground">
                    &quot;今天，我要让你们付出代价。——他站在天台上，俯瞰整座城市。&quot;
                  </p>
                  <p className="italic text-foreground">
                    &quot;你被解雇了。——第三家公司了，这个月。&quot;
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Mid reversal techniques */}
            <h3 className="text-base font-semibold text-foreground mt-6">
              中间反转技巧
            </h3>
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                          反转类型
                        </th>
                        <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                          原理
                        </th>
                        <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                          示例
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="px-4 py-2.5 font-medium text-foreground">
                          身份反转
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          揭示角色的隐藏身份
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          被嘲笑的外卖员其实是隐退富豪的独子
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 font-medium text-foreground">
                          能力觉醒
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          主角突然展现出惊人能力
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          被围攻的实习生一眼看穿了财报造假
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 font-medium text-foreground">
                          背叛揭露
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          揭示信任之人的背叛
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          最好的朋友其实是反派安插的卧底
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 font-medium text-foreground">
                          真相浮出
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          一个关键信息改变一切
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          合同上的签名是伪造的，真正的文件在保险柜里
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 font-medium text-foreground">
                          物品/道具反转
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          一个不起眼的物品改变局势
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          那枚&quot;假&quot;戒指其实是价值千万的古董
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Ending suspense */}
            <h3 className="text-base font-semibold text-foreground mt-6">
              结尾悬念模板
            </h3>
            <Card>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                <div>
                  <p className="font-medium text-foreground mb-1">
                    下一集预告型
                  </p>
                  <p>
                    &quot;明天，他将走进那扇门。而门后面的东西，比他想象的还要可怕。&quot;
                    ——用旁白直接引导观众期待下一集。简单粗暴但有效。
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">
                    反派出场型
                  </p>
                  <p>
                    主角以为赢了，镜头拉远，暗处一个人影拿起电话：&quot;让他先得意。真正的游戏......还没开始。&quot;
                    ——用新威胁制造期待。
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">
                    新角色型
                  </p>
                  <p>
                    最后一个镜头：一个从未出现过的角色推门而入，所有人都变了脸色。
                    不解释是谁，让观众猜。下一集开头再揭晓。
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">
                    信息炸弹型
                  </p>
                  <p>
                    主角在收拾战场时无意间发现了一个信息（一张照片/一条短信/一份文件），
                    这个信息彻底改变了他对所有事情的理解。画面定格，留白。
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Pacing rule */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="text-sm">
                <p className="font-semibold text-foreground mb-2">
                  <Lightbulb className="size-4 text-primary inline" /> 节奏控制铁律：每 20 秒一个小高潮
                </p>
                <p className="text-muted-foreground">
                  以 2 分钟（120秒）一集为例：你需要至少 6 个&quot;爽点&quot;——
                  0秒 钩子 → 20秒 第一个反转 → 40秒 新冲突 → 60秒 高潮铺垫 →
                  80秒 大高潮 → 100秒 反转 → 120秒 悬念。
                  观众在任何一个 20 秒没有被吸引，就会划走。
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ═══════════════════════════════════
            SECTION 5: 完整剧本示例
            ═══════════════════════════════════ */}
        <section id="example">
          <h2 className="text-xl font-bold text-foreground mb-1">
            5. 完整剧本示例
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            以都市逆袭题材为例，展示一集完整剧本的标准格式
          </p>

          <Card>
            <CardHeader>
              <CardTitle>
                《暗棋》第1集 —— 被陷害的天才
              </CardTitle>
              <CardDescription>
                题材：都市逆袭 | 时长：约2分钟 | 镜头数：18
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div className="p-3 rounded-lg bg-muted/50 space-y-3 font-mono text-xs">
                  <div>
                    <p className="text-primary font-semibold">#01 特写</p>
                    <p>
                      <strong>场景：</strong>黑屏渐亮，一只手在玻璃桌面上慢慢握紧
                    </p>
                    <p>
                      <strong>旁白：</strong>&quot;三天前，我还是这个城市最年轻的基金经理。&quot;
                    </p>
                  </div>
                  <div className="border-t border-border pt-3">
                    <p className="text-primary font-semibold">#02 远景</p>
                    <p>
                      <strong>场景：</strong>现代写字楼大厅，人来人往
                    </p>
                    <p>
                      <strong>人物：</strong>林远（主角），穿着褶皱的白衬衫，手提纸箱
                    </p>
                    <p>
                      <strong>旁白：</strong>&quot;三天后，我被以&apos;挪用公款&apos;的名义扫地出门。&quot;
                    </p>
                  </div>
                  <div className="border-t border-border pt-3">
                    <p className="text-primary font-semibold">#03 中景</p>
                    <p>
                      <strong>场景：</strong>公司门口，保安拦住林远
                    </p>
                    <p>
                      <strong>动作：</strong>保安一把夺过林远的工牌
                    </p>
                    <p>
                      <strong>表情：</strong>保安 → 不屑；林远 → 隐忍
                    </p>
                    <p>
                      <strong>保安：</strong>&quot;林经理？哦不，现在该叫你......林同志了。&quot;
                    </p>
                  </div>
                  <div className="border-t border-border pt-3">
                    <p className="text-primary font-semibold">#04 近景</p>
                    <p>
                      <strong>场景：</strong>公司门口
                    </p>
                    <p>
                      <strong>人物：</strong>一群前同事在旁边窃窃私语
                    </p>
                    <p>
                      <strong>表情：</strong>嘲讽、幸灾乐祸
                    </p>
                    <p>
                      <strong>同事A（画外音）：</strong>&quot;听说他偷了800万。&quot;
                    </p>
                    <p>
                      <strong>同事B（画外音）：</strong>&quot;活该，装什么清高。&quot;
                    </p>
                  </div>
                  <div className="border-t border-border pt-3">
                    <p className="text-primary font-semibold">#05 特写</p>
                    <p>
                      <strong>场景：</strong>林远的手握紧了纸箱边缘
                    </p>
                    <p>
                      <strong>表情：</strong>眼神从屈辱变为坚定
                    </p>
                    <p>
                      <strong>林远（内心独白）：</strong>&quot;800万？他们不知道的是......那笔钱，我根本不需要偷。&quot;
                    </p>
                  </div>
                  <div className="border-t border-border pt-3">
                    <p className="text-amber-600 font-semibold">
                      ... 中间 #06-#15 省略（完整版可在工具中生成）...
                    </p>
                  </div>
                  <div className="border-t border-border pt-3">
                    <p className="text-primary font-semibold">#16 中景</p>
                    <p>
                      <strong>场景：</strong>破旧出租屋，林远打开笔记本电脑
                    </p>
                    <p>
                      <strong>动作：</strong>手指快速在键盘上敲击
                    </p>
                    <p>
                      <strong>林远：</strong>&quot;王耀辉，你以为删了服务器记录就完了？&quot;
                    </p>
                  </div>
                  <div className="border-t border-border pt-3">
                    <p className="text-primary font-semibold">#17 特写</p>
                    <p>
                      <strong>场景：</strong>电脑屏幕，显示一串加密数据被解锁
                    </p>
                    <p>
                      <strong>林远（画外音）：</strong>&quot;你忘了......这套系统，是我写的。&quot;
                    </p>
                  </div>
                  <div className="border-t border-border pt-3">
                    <p className="text-amber-700 font-semibold">#18 远景 【悬念结尾】</p>
                    <p>
                      <strong>场景：</strong>豪华办公室，王耀辉正在庆功宴上举杯
                    </p>
                    <p>
                      <strong>动作：</strong>手机突然震动，王耀辉低头看屏幕，笑容凝固
                    </p>
                    <p>
                      <strong>屏幕文字（特写切入）：</strong>&quot;你的操盘记录，我备份了。&quot;
                    </p>
                    <p>
                      <strong>旁白：</strong>&quot;游戏，才刚刚开始。&quot;
                    </p>
                    <p className="text-foreground font-medium mt-1">
                      —— 第1集 完 ——
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ═══════════════════════════════════
            SECTION 6: 常见错误
            ═══════════════════════════════════ */}
        <section id="mistakes">
          <h2 className="text-xl font-bold text-foreground mb-1">
            6. 常见错误与避坑
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            新手写剧本最常犯的错误，提前避开
          </p>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                        错误
                      </th>
                      <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                        后果
                      </th>
                      <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                        正确做法
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="px-4 py-2.5 font-medium text-foreground">
                        剧本太长（超过 800 字/集）
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        镜头数暴增→出图工作量翻倍→制作周期拉长→容易弃坑
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        严格控制 500-800 字，18-22 个镜头。宁可删台词也不能加镜头
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-medium text-foreground">
                        没有镜头分级
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        写了一大段描述但没标景别→出图时不知道画什么构图→来回返工
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        每个镜头必标景别，相邻镜头景别要有变化（远→近→远）
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-medium text-foreground">
                        对白太书面化
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        AI 默认输出文学语言（&quot;然而此刻他&quot;）→配音时听着假→完播率低
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        出稿后大声读一遍，不像说话的全改。用&quot;说人话&quot;原则调整
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-medium text-foreground">
                        前 3 秒没钩子
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        用户直接划走→完播率低于 10%→平台不推流→没有播放量
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        第一个镜头就是最有冲击力的画面或台词，可以用倒叙
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-medium text-foreground">
                        场景太多太复杂
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        每个新场景都需要重新出图→工作量翻倍→且场景间风格可能不一致
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        一集控制在 3-5 个场景。能在同一场景解决的冲突就不换场景
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-medium text-foreground">
                        只有旁白没有对白
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        整集都是旁白叙述→像PPT配音→观众没有代入感
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        旁白和对白 3:7 比例。关键情节用对白推进，旁白只做过渡和内心独白
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-medium text-foreground">
                        没有结尾悬念
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        观众看完觉得&quot;完了&quot;→不追更→连续剧播放量逐集下跌
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        最后一个镜头必须留钩子。用&quot;反派出场/新信息/未解之谜&quot;三选一
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4 border-amber-200 bg-amber-50/50">
            <CardContent className="text-sm">
              <p className="font-semibold text-foreground mb-2">
                {"\u{26A0}\u{FE0F}"} 新手最大的坑：完美主义
              </p>
              <p className="text-muted-foreground">
                不要试图第一集就写出完美剧本。先快速出一版，跑通全流程（从剧本到发布），
                看到数据反馈后再优化。很多人卡在剧本阶段改了十几版，结果一集都没发出去。
                <strong className="text-foreground">
                  完成比完美重要 100 倍。
                </strong>
              </p>
            </CardContent>
          </Card>
        </section>

        {/* ── Navigation ── */}
        <div className="border-t border-border pt-6">
          <div className="grid gap-3 sm:grid-cols-2">
            <Link href="/learn" className="block group">
              <Card className="h-full transition-colors group-hover:ring-primary/30">
                <CardContent className="flex items-center gap-3">
                  <span className="text-muted-foreground">{"\u{2190}"}</span>
                  <div>
                    <p className="text-xs text-muted-foreground">上一节</p>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      AI漫剧入门
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/learn/characters" className="block group">
              <Card className="h-full transition-colors group-hover:ring-primary/30">
                <CardContent className="flex items-center gap-3 justify-end text-right">
                  <div>
                    <p className="text-xs text-muted-foreground">下一节</p>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      角色与一致性
                    </p>
                  </div>
                  <span className="text-muted-foreground">{"\u{2192}"}</span>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
