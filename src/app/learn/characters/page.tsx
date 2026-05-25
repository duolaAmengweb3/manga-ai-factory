import Link from "next/link";
import { Users, Lightbulb, BookOpen } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "角色与一致性" };

/* ───── Page ───── */

export default function CharactersPage() {
  return (
    <DashboardLayout>
      <div className="space-y-12">
        {/* ── Header ── */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link
              href="/learn"
              className="hover:text-primary transition-colors"
            >
              知识库
            </Link>
            <span>/</span>
            <span className="text-foreground">角色与一致性</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight sm:text-3xl flex items-center gap-2">
            <Users className="size-6 text-primary" /> 角色与一致性
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
            角色一致性是 AI 漫剧制作中最大的技术难点。
            40-50% 的返工量都花在&quot;修脸&quot;上。这一节教你如何从源头控制角色一致性，减少返工。
          </p>
        </div>

        {/* ── Table of Contents ── */}
        <Card size="sm">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-1.5"><BookOpen className="size-4 text-primary" /> 目录</CardTitle>
          </CardHeader>
          <CardContent>
            <nav className="grid gap-1 sm:grid-cols-2 text-sm">
              <a href="#why" className="text-primary hover:underline">
                1. 为什么角色一致性是最大的坑
              </a>
              <a href="#character-card" className="text-primary hover:underline">
                2. 角色卡制作
              </a>
              <a href="#mapping" className="text-primary hover:underline">
                3. 中英文特征映射表
              </a>
              <a href="#comparison" className="text-primary hover:underline">
                4. 5种一致性方案对比
              </a>
              <a href="#freeze" className="text-primary hover:underline">
                5. 参数冻结清单
              </a>
              <a href="#troubleshoot" className="text-primary hover:underline">
                6. 崩脸问题排查
              </a>
            </nav>
          </CardContent>
        </Card>

        {/* ═══════════════════════════════════
            SECTION 1: 为什么角色一致性是最大的坑
            ═══════════════════════════════════ */}
        <section id="why">
          <h2 className="text-xl font-bold text-foreground mb-1">
            1. 为什么角色一致性是最大的坑
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            理解问题的本质，才能正确地解决它
          </p>

          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-3">
              <Card className="border-destructive/20 bg-destructive/5">
                <CardContent className="text-center space-y-2">
                  <p className="text-3xl font-bold text-destructive">
                    40-50%
                  </p>
                  <p className="text-xs text-muted-foreground">
                    返工量花在修脸上
                  </p>
                </CardContent>
              </Card>
              <Card className="border-amber-200 bg-amber-50/50">
                <CardContent className="text-center space-y-2">
                  <p className="text-3xl font-bold text-amber-600">3-5x</p>
                  <p className="text-xs text-muted-foreground">
                    不做角色卡的出图量是做了的倍数
                  </p>
                </CardContent>
              </Card>
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="text-center space-y-2">
                  <p className="text-3xl font-bold text-primary">
                    #1
                  </p>
                  <p className="text-xs text-muted-foreground">
                    新手劝退原因排名
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">问题的根本原因</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                <p>
                  AI 图像生成模型（无论是 Stable Diffusion、Midjourney 还是即梦）的工作原理是：
                  根据文字描述从&quot;噪声&quot;中逐步生成图像。每次生成都是独立的随机过程。
                </p>
                <p>
                  这意味着：
                  <strong className="text-foreground">
                    即使你用完全相同的 prompt，两次生成的人脸也大概率不一样。
                  </strong>
                  第 1 张图的&quot;林远&quot;和第 15 张图的&quot;林远&quot;可能完全是两个人。
                </p>
                <p>
                  如果不做任何处理：观众看到前 5 秒的主角和后 30 秒的主角长相不同，
                  会产生强烈的违和感，直接划走。
                  <strong className="text-foreground">这是 AI 漫剧最核心的技术挑战。</strong>
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="text-sm">
                <p className="font-semibold text-foreground mb-2">
                  <Lightbulb className="size-4 text-primary inline" /> 好消息
                </p>
                <p className="text-muted-foreground">
                  2025-2026 年，各大工具都推出了&quot;角色参考&quot;功能（即梦的角色参考、可灵的角色一致性、
                  MJ 的 --cref 参数）。虽然还不完美，但已经比一年前好了 10 倍。
                  掌握正确方法后，80% 的镜头可以做到角色基本一致。
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ═══════════════════════════════════
            SECTION 2: 角色卡制作
            ═══════════════════════════════════ */}
        <section id="character-card">
          <h2 className="text-xl font-bold text-foreground mb-1">
            2. 角色卡制作
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            角色卡是一切一致性技术的基础。做好角色卡，后面的工作量减半。
          </p>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">什么是角色卡</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>
                  角色卡是一套标准化的角色参考资料，包含：
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong className="text-foreground">正面全身图</strong>（母图）——
                    所有后续生成的基准
                  </li>
                  <li>
                    <strong className="text-foreground">侧面图</strong>
                    （左 45 度、右 45 度、正侧面）
                  </li>
                  <li>
                    <strong className="text-foreground">表情图</strong>
                    （微笑、愤怒、悲伤、惊讶、冷漠、邪笑——至少 6 种）
                  </li>
                  <li>
                    <strong className="text-foreground">服装图</strong>
                    （每套服装的全身图）
                  </li>
                  <li>
                    <strong className="text-foreground">参数卡</strong>
                    （记录生成该角色时的所有参数）
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Step by step */}
            <h3 className="text-base font-semibold text-foreground mt-4">
              角色卡制作步骤（以即梦为例）
            </h3>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">
                  Step 1：写角色描述（中文）
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="p-3 rounded-lg bg-muted text-xs font-mono overflow-x-auto whitespace-pre-wrap">
{`角色名：林远
性别：男
年龄：25岁
身高体型：178cm，偏瘦但不羸弱
脸型：方脸偏窄，下颌线明显
眉毛：剑眉，微微上扬
眼睛：单眼皮，眼神锐利
鼻子：高挺直鼻
嘴唇：薄唇，嘴角微微下垂（给人冷淡感）
发型：黑色短发，偏分，额前有碎发
肤色：偏白
整体气质：外表平凡但眼神中有不甘，隐忍中带着锋芒
默认服装：白色衬衫，灰色西裤，黑色皮鞋（微旧）`}
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">
                  Step 2：转化为英文 Prompt
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <pre className="p-3 rounded-lg bg-muted text-xs font-mono overflow-x-auto whitespace-pre-wrap">
{`A 25-year-old Chinese man, 178cm, slim but not frail build.
Square-narrow face with defined jawline, sharp eyebrows slightly upturned,
single-fold eyelids with piercing gaze, high straight nose,
thin lips with slightly downturned corners giving a cold expression.
Black short hair, side-parted with bangs falling on forehead.
Fair skin tone.
Wearing a slightly worn white dress shirt, grey dress pants, black leather shoes.
Manga style, semi-realistic, high detail, clean lines.
Full body, front view, standing pose, neutral expression, white background.`}
                </pre>
                <p className="text-xs text-muted-foreground">
                  注意：Prompt 结尾加上
                  <code className="px-1 py-0.5 rounded bg-muted font-mono text-foreground">
                    white background
                  </code>
                  和
                  <code className="px-1 py-0.5 rounded bg-muted font-mono text-foreground">
                    full body, front view
                  </code>
                  ，方便后续做参考图。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">
                  Step 3：生成母图并选定
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>
                  在即梦/MJ 中用上面的 prompt 生成 4-8 张图。
                  从中选出一张<strong className="text-foreground">最符合你心中角色形象</strong>的作为&quot;母图&quot;。
                </p>
                <p>
                  选定后，<strong className="text-foreground">记录下这张图的所有参数</strong>：
                  种子值（Seed）、模型版本、采样步数、CFG 值、图片尺寸。
                  这些参数后续不能改动。
                </p>
                <p className="text-foreground font-medium">
                  母图选择标准：
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li>五官清晰、不模糊</li>
                  <li>姿势端正、不歪斜</li>
                  <li>表情中性（方便后续加表情变化）</li>
                  <li>服装完整、没有变形</li>
                  <li>风格统一（不要选那种突然变了画风的）</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">
                  Step 4：生成多角度图
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  用母图作为参考图（开启角色参考功能），生成不同角度：
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                          角度
                        </th>
                        <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                          Prompt 追加
                        </th>
                        <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                          用途
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="px-3 py-2 font-medium text-foreground">
                          正面
                        </td>
                        <td className="px-3 py-2 font-mono">
                          front view, looking at camera
                        </td>
                        <td className="px-3 py-2 text-muted-foreground">
                          对话镜头、表情镜头
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-medium text-foreground">
                          左 3/4 侧
                        </td>
                        <td className="px-3 py-2 font-mono">
                          three-quarter view from left, slight turn
                        </td>
                        <td className="px-3 py-2 text-muted-foreground">
                          最常用的叙事角度
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-medium text-foreground">
                          右 3/4 侧
                        </td>
                        <td className="px-3 py-2 font-mono">
                          three-quarter view from right, slight turn
                        </td>
                        <td className="px-3 py-2 text-muted-foreground">
                          对手戏中的反打角度
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-medium text-foreground">
                          正侧面
                        </td>
                        <td className="px-3 py-2 font-mono">
                          side profile view, looking left/right
                        </td>
                        <td className="px-3 py-2 text-muted-foreground">
                          行走、沉思、远眺
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-medium text-foreground">
                          背面
                        </td>
                        <td className="px-3 py-2 font-mono">
                          rear view, from behind
                        </td>
                        <td className="px-3 py-2 text-muted-foreground">
                          离去、面对场景、背影
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">
                  Step 5：生成表情图
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  用母图作为参考图，生成 6 种常用表情。
                  表情图用近景或特写景别（close-up）。
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                          表情
                        </th>
                        <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                          Prompt 追加
                        </th>
                        <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                          适用场景
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="px-3 py-2 font-medium text-foreground">
                          微笑
                        </td>
                        <td className="px-3 py-2 font-mono">
                          gentle smile, warm eyes, close-up portrait
                        </td>
                        <td className="px-3 py-2 text-muted-foreground">
                          日常、温馨时刻
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-medium text-foreground">
                          愤怒
                        </td>
                        <td className="px-3 py-2 font-mono">
                          angry expression, furrowed brows, clenched jaw, intense eyes
                        </td>
                        <td className="px-3 py-2 text-muted-foreground">
                          冲突、对峙
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-medium text-foreground">
                          悲伤
                        </td>
                        <td className="px-3 py-2 font-mono">
                          sad expression, teary eyes, downcast look
                        </td>
                        <td className="px-3 py-2 text-muted-foreground">
                          感情线、回忆
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-medium text-foreground">
                          惊讶
                        </td>
                        <td className="px-3 py-2 font-mono">
                          shocked expression, wide eyes, slightly open mouth
                        </td>
                        <td className="px-3 py-2 text-muted-foreground">
                          反转、揭秘
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-medium text-foreground">
                          冷漠
                        </td>
                        <td className="px-3 py-2 font-mono">
                          cold expression, emotionless, indifferent gaze, poker face
                        </td>
                        <td className="px-3 py-2 text-muted-foreground">
                          隐忍、蓄势
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-medium text-foreground">
                          邪笑/冷笑
                        </td>
                        <td className="px-3 py-2 font-mono">
                          smirk, one corner of mouth raised, cunning eyes, menacing
                        </td>
                        <td className="px-3 py-2 text-muted-foreground">
                          反击、揭穿、计划得逞
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">
                  Step 6：建立参数卡
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="p-3 rounded-lg bg-muted text-xs font-mono overflow-x-auto whitespace-pre-wrap">
{`═══ 角色参数卡 ═══
角色名：林远
母图文件：lingyuan_front_v3.png
母图 Seed：1847293650
模型/底模型：即梦 2.1 / SD XL Turbo
采样器：Euler a
采样步数：30
CFG Scale：7.0
角色参考权重：0.75
去噪强度：0.45
图片尺寸：768×1344 (9:16)
LoRA：无
负面提示词：ugly, deformed, extra fingers, blurry, low quality
备注：角色参考权重低于 0.6 会崩脸，高于 0.85 会死板
═══════════════════`}
                </pre>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ═══════════════════════════════════
            SECTION 3: 中英文特征映射表
            ═══════════════════════════════════ */}
        <section id="mapping">
          <h2 className="text-xl font-bold text-foreground mb-1">
            3. 中英文特征映射表
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            写中文角色描述后，需要转化为英文 Prompt。以下是常用映射。
          </p>

          <div className="space-y-4">
            {/* Face features */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">脸部特征</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="px-4 py-2 text-left font-medium text-muted-foreground w-1/3">
                          中文
                        </th>
                        <th className="px-4 py-2 text-left font-medium text-muted-foreground">
                          英文 Prompt
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="px-4 py-1.5 text-foreground">剑眉</td>
                        <td className="px-4 py-1.5 font-mono">
                          sharp eyebrows, upward-angled brows
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-1.5 text-foreground">
                          柳叶眉
                        </td>
                        <td className="px-4 py-1.5 font-mono">
                          thin arched eyebrows, willow-leaf brows
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-1.5 text-foreground">星目</td>
                        <td className="px-4 py-1.5 font-mono">
                          bright sparkling eyes, star-like eyes
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-1.5 text-foreground">
                          单眼皮
                        </td>
                        <td className="px-4 py-1.5 font-mono">
                          single-fold eyelids, monolid eyes
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-1.5 text-foreground">
                          双眼皮
                        </td>
                        <td className="px-4 py-1.5 font-mono">
                          double eyelids
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-1.5 text-foreground">
                          丹凤眼
                        </td>
                        <td className="px-4 py-1.5 font-mono">
                          phoenix eyes, upturned eyes
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-1.5 text-foreground">
                          杏仁眼
                        </td>
                        <td className="px-4 py-1.5 font-mono">
                          almond-shaped eyes
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-1.5 text-foreground">
                          高挺鼻梁
                        </td>
                        <td className="px-4 py-1.5 font-mono">
                          high straight nose bridge, sharp nose
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-1.5 text-foreground">
                          小巧鼻子
                        </td>
                        <td className="px-4 py-1.5 font-mono">
                          small delicate nose, petite nose
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-1.5 text-foreground">薄唇</td>
                        <td className="px-4 py-1.5 font-mono">thin lips</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-1.5 text-foreground">
                          丰满嘴唇
                        </td>
                        <td className="px-4 py-1.5 font-mono">
                          full plump lips
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-1.5 text-foreground">
                          方脸/国字脸
                        </td>
                        <td className="px-4 py-1.5 font-mono">
                          square face, strong jawline
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-1.5 text-foreground">瓜子脸</td>
                        <td className="px-4 py-1.5 font-mono">
                          oval face, V-shaped face
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-1.5 text-foreground">圆脸</td>
                        <td className="px-4 py-1.5 font-mono">
                          round face, soft facial features
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-1.5 text-foreground">
                          下颌线明显
                        </td>
                        <td className="px-4 py-1.5 font-mono">
                          defined jawline, sharp jaw
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Hair */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">发型</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="px-4 py-2 text-left font-medium text-muted-foreground w-1/3">
                          中文
                        </th>
                        <th className="px-4 py-2 text-left font-medium text-muted-foreground">
                          英文 Prompt
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="px-4 py-1.5 text-foreground">黑色短发</td>
                        <td className="px-4 py-1.5 font-mono">
                          black short hair
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-1.5 text-foreground">
                          偏分碎发
                        </td>
                        <td className="px-4 py-1.5 font-mono">
                          side-parted hair with bangs
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-1.5 text-foreground">
                          长直发
                        </td>
                        <td className="px-4 py-1.5 font-mono">
                          long straight hair
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-1.5 text-foreground">
                          高马尾
                        </td>
                        <td className="px-4 py-1.5 font-mono">
                          high ponytail
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-1.5 text-foreground">
                          双马尾
                        </td>
                        <td className="px-4 py-1.5 font-mono">twin tails, pigtails</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-1.5 text-foreground">
                          古风发髻
                        </td>
                        <td className="px-4 py-1.5 font-mono">
                          traditional Chinese hair bun, ancient hairstyle
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-1.5 text-foreground">
                          银白色头发
                        </td>
                        <td className="px-4 py-1.5 font-mono">
                          silver white hair
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-1.5 text-foreground">
                          大波浪卷
                        </td>
                        <td className="px-4 py-1.5 font-mono">
                          wavy hair, big curls
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Body & Build */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">体型与气质</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="px-4 py-2 text-left font-medium text-muted-foreground w-1/3">
                          中文
                        </th>
                        <th className="px-4 py-2 text-left font-medium text-muted-foreground">
                          英文 Prompt
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="px-4 py-1.5 text-foreground">高瘦</td>
                        <td className="px-4 py-1.5 font-mono">
                          tall slim build
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-1.5 text-foreground">
                          高大魁梧
                        </td>
                        <td className="px-4 py-1.5 font-mono">
                          tall muscular build, broad shoulders
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-1.5 text-foreground">
                          娇小纤细
                        </td>
                        <td className="px-4 py-1.5 font-mono">
                          petite slender build
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-1.5 text-foreground">
                          霸道总裁气质
                        </td>
                        <td className="px-4 py-1.5 font-mono">
                          dominant CEO aura, confident posture, sharp suit
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-1.5 text-foreground">
                          清冷气质
                        </td>
                        <td className="px-4 py-1.5 font-mono">
                          cold aloof demeanor, icy beauty
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-1.5 text-foreground">
                          温柔气质
                        </td>
                        <td className="px-4 py-1.5 font-mono">
                          gentle warm aura, soft expression
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-1.5 text-foreground">
                          少年感
                        </td>
                        <td className="px-4 py-1.5 font-mono">
                          youthful look, boyish charm
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-1.5 text-foreground">
                          白皙皮肤
                        </td>
                        <td className="px-4 py-1.5 font-mono">
                          fair skin, pale complexion
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-1.5 text-foreground">
                          小麦色皮肤
                        </td>
                        <td className="px-4 py-1.5 font-mono">
                          tan skin, wheat-colored complexion
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
            SECTION 4: 5种一致性方案对比
            ═══════════════════════════════════ */}
        <section id="comparison">
          <h2 className="text-xl font-bold text-foreground mb-1">
            4. 5 种角色一致性方案对比
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            根据你的技术水平和工具选择，挑选最适合的方案
          </p>

          <Card className="mb-4">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                        方案
                      </th>
                      <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                        适用工具
                      </th>
                      <th className="px-4 py-2.5 text-center font-medium text-muted-foreground">
                        难度
                      </th>
                      <th className="px-4 py-2.5 text-center font-medium text-muted-foreground">
                        效果
                      </th>
                      <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                        成本
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr className="bg-primary/5">
                      <td className="px-4 py-2.5 font-medium text-foreground">
                        参考图绑定
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        即梦、可灵
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <span className="text-primary">{"*"}</span>
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <span className="text-primary">{"***"}</span>
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        免费
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-medium text-foreground">
                        角色参考+种子锁定
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        即梦、MJ
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <span className="text-primary">{"**"}</span>
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <span className="text-primary">{"****"}</span>
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        免费
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-medium text-foreground">
                        四视图 UID
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        通用
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <span className="text-primary">{"**"}</span>
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <span className="text-primary">{"***"}</span>
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        免费
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-medium text-foreground">
                        IP-Adapter
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        ComfyUI
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <span className="text-primary">{"***"}</span>
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <span className="text-primary">{"****"}</span>
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        中（需显卡）
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-medium text-foreground">
                        LoRA 训练
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        ComfyUI/SD
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <span className="text-primary">{"****"}</span>
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <span className="text-primary">{"*****"}</span>
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        中（需显卡）
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Detailed explanation for each */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  方案 1：参考图绑定
                  <Badge variant="default" className="text-[10px]">
                    新手推荐
                  </Badge>
                </CardTitle>
                <CardDescription>
                  最简单的方式，适合所有在线工具
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>
                  <strong className="text-foreground">原理：</strong>
                  将角色母图上传为&quot;参考图&quot;，工具会在生成新图时参考这张图的面部特征。
                </p>
                <p>
                  <strong className="text-foreground">操作：</strong>
                  在即梦中，点击&quot;角色参考&quot;按钮 → 上传母图 → 调整参考权重到 0.7-0.8 → 正常输入 prompt 生成。
                </p>
                <p>
                  <strong className="text-foreground">优点：</strong>
                  零学习成本，30 秒上手。大部分正面/3/4 侧面镜头效果不错。
                </p>
                <p>
                  <strong className="text-foreground">缺点：</strong>
                  侧面和大角度变化时容易崩。服装变化也可能影响面部一致性。
                </p>
                <p>
                  <strong className="text-foreground">适合：</strong>
                  纯新手、场景简单的短剧、角度变化不大的对话剧。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">
                  方案 2：角色参考+种子锁定
                </CardTitle>
                <CardDescription>
                  在方案 1 基础上增加种子锁定，一致性更高
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>
                  <strong className="text-foreground">原理：</strong>
                  种子（Seed）决定了生成的随机起点。相同种子+相同参数=相似的输出。
                  配合参考图，双重保障。
                </p>
                <p>
                  <strong className="text-foreground">操作：</strong>
                  (1) 生成母图时记录种子值 → (2) 后续所有该角色的图都使用相同种子 →
                  (3) 同时开启角色参考功能 → (4) 只修改 prompt 中的动作/表情/场景部分。
                </p>
                <p>
                  <strong className="text-foreground">优点：</strong>
                  一致性比纯参考图高约 30%。免费，操作简单。
                </p>
                <p>
                  <strong className="text-foreground">缺点：</strong>
                  种子锁定会限制姿势变化的多样性。部分在线工具不支持手动指定种子。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">
                  方案 3：四视图 UID
                </CardTitle>
                <CardDescription>
                  用多角度参考图提升不同角度的一致性
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>
                  <strong className="text-foreground">原理：</strong>
                  生成角色的正面、左侧面、右侧面、背面四张图，拼成一张&quot;四视图&quot;参考图。
                  生成任何角度时，模型都能找到最匹配的参考。
                </p>
                <p>
                  <strong className="text-foreground">操作：</strong>
                  (1) 用 prompt
                  <code className="px-1 py-0.5 rounded bg-muted font-mono text-foreground mx-1">
                    character turnaround sheet, front view, side view, back view, 4 views
                  </code>
                  生成四视图 → (2) 或者分别生成四个角度后拼成一张图 → (3) 将四视图作为参考图使用。
                </p>
                <p>
                  <strong className="text-foreground">优点：</strong>
                  侧面和背面一致性大幅提升。免费方案中最均衡的。
                </p>
                <p>
                  <strong className="text-foreground">缺点：</strong>
                  四视图本身的生成质量不稳定，可能需要多次尝试。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">
                  方案 4：IP-Adapter
                </CardTitle>
                <CardDescription>
                  ComfyUI 插件，专业级角色一致性方案
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>
                  <strong className="text-foreground">原理：</strong>
                  IP-Adapter 是一个控制图像风格和角色特征的技术。
                  它能从参考图中提取&quot;角色特征向量&quot;，在生成新图时注入这个向量。
                </p>
                <p>
                  <strong className="text-foreground">操作：</strong>
                  需要在 ComfyUI 中安装 IP-Adapter 节点 → 导入参考图 → 设置 IP-Adapter 权重（推荐 0.6-0.8）→
                  配合 ControlNet 控制姿势。
                </p>
                <p>
                  <strong className="text-foreground">优点：</strong>
                  一致性效果很好，角度变化时也能保持。可以和各种 ControlNet 配合。
                </p>
                <p>
                  <strong className="text-foreground">缺点：</strong>
                  需要本地部署 ComfyUI、有一定学习成本、需要显卡（推荐 8GB+ VRAM）。
                </p>
                <p>
                  <strong className="text-foreground">适合：</strong>
                  有技术基础的创作者，追求更高一致性。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  方案 5：LoRA 训练
                  <Badge variant="outline" className="text-[10px]">
                    效果最佳
                  </Badge>
                </CardTitle>
                <CardDescription>
                  训练专属角色模型，最高一致性
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>
                  <strong className="text-foreground">原理：</strong>
                  用 10-20 张角色图片微调 Stable Diffusion 模型，让模型&quot;学会&quot;你的角色。
                  训练后只需在 prompt 中加一个触发词就能生成该角色。
                </p>
                <p>
                  <strong className="text-foreground">操作：</strong>
                  (1) 准备 10-20 张高质量角色图（不同角度、不同表情）→
                  (2) 用 Kohya_ss 或 LoRA Easy Training Scripts 训练 →
                  (3) 训练约 30-60 分钟（RTX 3060 以上）→
                  (4) 得到 .safetensors LoRA 文件，加载到 SD/ComfyUI 中使用。
                </p>
                <p>
                  <strong className="text-foreground">优点：</strong>
                  一致性最高，各种角度和表情都能保持。一次训练终身使用。
                </p>
                <p>
                  <strong className="text-foreground">缺点：</strong>
                  学习成本最高，需要显卡（推荐 12GB+ VRAM），训练数据准备有讲究。
                </p>
                <p>
                  <strong className="text-foreground">适合：</strong>
                  长期做同一角色的创作者、工作室级别生产。
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="text-sm">
                <p className="font-semibold text-foreground mb-2">
                  <Lightbulb className="size-4 text-primary inline" /> 推荐路径
                </p>
                <p className="text-muted-foreground">
                  新手先用<strong className="text-foreground">方案 1（参考图绑定）</strong>
                  跑通流程。觉得效果不够再升级到
                  <strong className="text-foreground">方案 2（+种子锁定）</strong>。
                  需要更多角度变化时用
                  <strong className="text-foreground">方案 3（四视图）</strong>。
                  技术能力允许且要做长期系列时，直接上
                  <strong className="text-foreground">方案 5（LoRA）</strong>。
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ═══════════════════════════════════
            SECTION 5: 参数冻结清单
            ═══════════════════════════════════ */}
        <section id="freeze">
          <h2 className="text-xl font-bold text-foreground mb-1">
            5. 参数冻结清单
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            哪些参数绝对不能动，哪些可以微调，哪些随便改
          </p>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                        参数
                      </th>
                      <th className="px-4 py-2.5 text-center font-medium text-muted-foreground">
                        等级
                      </th>
                      <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                        说明
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {/* Frozen */}
                    <tr className="bg-destructive/5">
                      <td className="px-4 py-2.5 font-medium text-foreground">
                        底模型/模型版本
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <Badge variant="destructive" className="text-[10px]">
                          绝不能动
                        </Badge>
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        换模型 = 角色 100% 崩。整个系列必须用同一个模型版本。
                      </td>
                    </tr>
                    <tr className="bg-destructive/5">
                      <td className="px-4 py-2.5 font-medium text-foreground">
                        采样器（Sampler）
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <Badge variant="destructive" className="text-[10px]">
                          绝不能动
                        </Badge>
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        不同采样器产出风格差异大。锁定后不要换。
                      </td>
                    </tr>
                    <tr className="bg-destructive/5">
                      <td className="px-4 py-2.5 font-medium text-foreground">
                        LoRA 文件及权重
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <Badge variant="destructive" className="text-[10px]">
                          绝不能动
                        </Badge>
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        如果用了 LoRA，版本和权重都必须固定。换 LoRA = 换角色。
                      </td>
                    </tr>
                    <tr className="bg-destructive/5">
                      <td className="px-4 py-2.5 font-medium text-foreground">
                        角色参考权重
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <Badge variant="destructive" className="text-[10px]">
                          绝不能动
                        </Badge>
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        确定好的角色参考权重不要调。推荐 0.7-0.8。
                      </td>
                    </tr>
                    <tr className="bg-destructive/5">
                      <td className="px-4 py-2.5 font-medium text-foreground">
                        负面提示词
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <Badge variant="destructive" className="text-[10px]">
                          绝不能动
                        </Badge>
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        负面提示词影响模型对&quot;不要生成什么&quot;的理解，改动会影响面部特征。
                      </td>
                    </tr>
                    {/* Adjustable */}
                    <tr>
                      <td className="px-4 py-2.5 font-medium text-foreground">
                        CFG Scale
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <Badge variant="secondary" className="text-[10px]">
                          可微调
                        </Badge>
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        范围 +-1 以内可以微调。调太大画面会变硬/过饱和，调太小细节会丢失。
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-medium text-foreground">
                        去噪强度（Denoise）
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <Badge variant="secondary" className="text-[10px]">
                          可微调
                        </Badge>
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        用于图生图时。0.3-0.5 保持角色一致，0.6+ 会产生较大变化。
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-medium text-foreground">
                        种子（Seed）
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <Badge variant="secondary" className="text-[10px]">
                          可微调
                        </Badge>
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        锁定种子可提高一致性，但要换姿势时可能需要换种子。
                      </td>
                    </tr>
                    {/* Free to change */}
                    <tr>
                      <td className="px-4 py-2.5 font-medium text-foreground">
                        图片分辨率
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <Badge variant="outline" className="text-[10px]">
                          可随意改
                        </Badge>
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        根据平台要求调整。竖屏 9:16、横屏 16:9，不影响角色一致性。
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-medium text-foreground">
                        场景/背景描述
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <Badge variant="outline" className="text-[10px]">
                          可随意改
                        </Badge>
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        场景描述不影响角色面部（前提是参考图权重足够高）。
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-medium text-foreground">
                        动作描述
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <Badge variant="outline" className="text-[10px]">
                          可随意改
                        </Badge>
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        正常修改动作描述。但极端姿势（倒挂、高速运动）可能导致面部变形。
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ═══════════════════════════════════
            SECTION 6: 崩脸问题排查
            ═══════════════════════════════════ */}
        <section id="troubleshoot">
          <h2 className="text-xl font-bold text-foreground mb-1">
            6. 崩脸问题排查
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            遇到角色不一致？按表逐项排查
          </p>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                        问题表现
                      </th>
                      <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                        可能原因
                      </th>
                      <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                        解决方案
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="px-4 py-2.5 font-medium text-foreground">
                        每张图脸都不一样
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        没有使用参考图功能
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        必须开启角色参考功能，上传母图。
                        这是最基本的一致性保障。
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-medium text-foreground">
                        同一集前后脸变了
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        生成参数不一致
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        检查是否所有图都用了相同的模型、采样器、参考图权重。
                        建立参数卡，每次生成前核对。
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-medium text-foreground">
                        侧脸和正脸差别大
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        参考图只有正面，角度泛化差
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        制作四视图参考图（正面+两侧+背面），
                        或者用 IP-Adapter 提取角色特征。
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-medium text-foreground">
                        换服装后角色不像了
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        服装描述过强，盖过了面部特征
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        提高角色参考权重（0.8-0.85）。
                        或者在换服装时，先生成一张新服装+正面的图作为新参考。
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-medium text-foreground">
                        表情变化时脸变形
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        表情 prompt 过于极端
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        使用温和的表情词汇（gentle smile 而不是 laughing hysterically）。
                        避免&quot;crying with tears&quot;等会大幅改变面部结构的词。
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-medium text-foreground">
                        偶尔有一张特别离谱
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        随机性导致的偶发问题
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        正常现象。每个镜头多生成 3-5 张，挑最一致的。
                        不要试图修复，直接重新生成更快。
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-medium text-foreground">
                        两个角色同框时互相影响
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        多角色参考互相干扰
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        分别生成单人图，然后用剪映/PS 合成。
                        或者只参考主要角色，次要角色用 prompt 控制。
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-medium text-foreground">
                        画风/色调突然变了
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        Prompt 中混入了风格描述词
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        保持风格描述词一致（如 manga style, semi-realistic），
                        不要在某些镜头加 watercolor/oil painting 等风格词。
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
                {"\u{26A0}\u{FE0F}"} 终极建议：接受不完美
              </p>
              <p className="text-muted-foreground">
                以当前 AI 的技术水平，做到 100% 角色一致是不现实的。
                目标应该是 <strong className="text-foreground">80% 一致</strong>——
                观众在正常观看速度下不会觉得&quot;换人了&quot;就够了。
                不要为了最后 20% 的一致性花 5 倍的时间去修图。
                <strong className="text-foreground">
                  记住：观众看的是故事，不是角色的痣在左边还是右边。
                </strong>
              </p>
            </CardContent>
          </Card>
        </section>

        {/* ── Navigation ── */}
        <div className="border-t border-border pt-6">
          <div className="grid gap-3 sm:grid-cols-2">
            <Link href="/learn/script" className="block group">
              <Card className="h-full transition-colors group-hover:ring-primary/30">
                <CardContent className="flex items-center gap-3">
                  <span className="text-muted-foreground">{"\u{2190}"}</span>
                  <div>
                    <p className="text-xs text-muted-foreground">上一节</p>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      剧本创作
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/learn/storyboard" className="block group">
              <Card className="h-full transition-colors group-hover:ring-primary/30">
                <CardContent className="flex items-center gap-3 justify-end text-right">
                  <div>
                    <p className="text-xs text-muted-foreground">下一节</p>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      分镜与 Prompt
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
