import { Frame } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";

export const metadata = { title: "分镜与 Prompt" };

export default function StoryboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-10">
        {/* ────────── Header ────────── */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground tracking-tight sm:text-3xl flex items-center gap-2">
            <Frame className="size-6 text-primary" /> 分镜设计与 Prompt 写法
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
            从剧本到画面的关键一步：学会把文字翻译成 AI 能精确执行的分镜 Prompt，
            掌握镜头语言、Prompt 结构和常见陷阱。
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            Section 1: 什么是分镜
        ═══════════════════════════════════════════════════════════════ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">
            什么是分镜
          </h2>
          <div className="space-y-3 text-sm text-foreground/90 leading-relaxed">
            <p>
              <strong>分镜 = 把剧本里的每一个镜头翻译成 AI 能理解的画面描述。</strong>
              你写剧本时用的是叙事语言（&quot;他走进办公室，看到桌上放着一封信&quot;），但 AI 画图需要的是{" "}
              <span className="text-primary font-medium">视觉指令</span>
              （&quot;a young Chinese man in a grey suit entering a modern office, a white envelope on the desk, medium shot, warm daylight&quot;）。
            </p>
            <p>
              一集短剧通常需要 <strong>15-25 个分镜</strong>，每个分镜 = 一张图 = 一个 prompt。
              如果是 2 分钟的视频，按每个镜头 5-8 秒计算，大约 15-24 个镜头；3 分钟的视频大约 22-36 个。
            </p>
            <p>
              分镜不只是描述&quot;画什么&quot;，更要描述<strong>&quot;怎么拍&quot;</strong>：
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li><strong>景别</strong>——镜头离角色多远？特写、中景、全景？</li>
              <li><strong>角度</strong>——仰拍让角色显得高大，俯拍让角色显得渺小</li>
              <li><strong>光线</strong>——暖光传递温馨，冷光传递危险，逆光塑造英雄轮廓</li>
              <li><strong>构图</strong>——角色放画面中央还是三分之一处？留白在哪边？</li>
            </ul>
            <p>
              掌握了镜头语言，你的分镜才不只是&quot;好看的图&quot;，而是<strong>有叙事节奏、有情绪起伏的故事画面</strong>。
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            Section 2: 镜头语言基础
        ═══════════════════════════════════════════════════════════════ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">
            镜头语言基础（非常重要）
          </h2>
          <p className="text-sm text-foreground/90 leading-relaxed">
            镜头语言是导演的核心工具。AI 漫剧虽然没有真实摄影机，但在 prompt 中加上景别和角度词汇，
            就相当于告诉 AI &quot;用什么镜头拍这个画面&quot;。以下是你必须掌握的 7 种常用景别/角度：
          </p>

          {/* Shot Types Table */}
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="px-4 py-3 text-left font-semibold text-foreground">景别</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">英文</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">画面范围</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">传达什么</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">适用场景</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">特写</td>
                  <td className="px-4 py-3 font-mono text-primary text-xs">close-up</td>
                  <td className="px-4 py-3 text-muted-foreground">脸部 / 物件</td>
                  <td className="px-4 py-3 text-muted-foreground">情绪、细节</td>
                  <td className="px-4 py-3 text-muted-foreground">角色震惊、哭泣、关键道具</td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">中景</td>
                  <td className="px-4 py-3 font-mono text-primary text-xs">medium shot</td>
                  <td className="px-4 py-3 text-muted-foreground">上半身</td>
                  <td className="px-4 py-3 text-muted-foreground">对话、互动</td>
                  <td className="px-4 py-3 text-muted-foreground">两人对话、日常场景</td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">全景</td>
                  <td className="px-4 py-3 font-mono text-primary text-xs">wide shot</td>
                  <td className="px-4 py-3 text-muted-foreground">全身 + 环境</td>
                  <td className="px-4 py-3 text-muted-foreground">环境、规模</td>
                  <td className="px-4 py-3 text-muted-foreground">场景建立、史诗场面</td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">仰拍</td>
                  <td className="px-4 py-3 font-mono text-primary text-xs">low angle</td>
                  <td className="px-4 py-3 text-muted-foreground">从下往上</td>
                  <td className="px-4 py-3 text-muted-foreground">威压、英雄感</td>
                  <td className="px-4 py-3 text-muted-foreground">强者出场、觉醒</td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">俯拍</td>
                  <td className="px-4 py-3 font-mono text-primary text-xs">high angle</td>
                  <td className="px-4 py-3 text-muted-foreground">从上往下</td>
                  <td className="px-4 py-3 text-muted-foreground">掌控、渺小</td>
                  <td className="px-4 py-3 text-muted-foreground">俯瞰全局、角色跪地</td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">过肩</td>
                  <td className="px-4 py-3 font-mono text-primary text-xs">over-shoulder</td>
                  <td className="px-4 py-3 text-muted-foreground">越过肩膀</td>
                  <td className="px-4 py-3 text-muted-foreground">对话参与感</td>
                  <td className="px-4 py-3 text-muted-foreground">两人面对面</td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">斜角</td>
                  <td className="px-4 py-3 font-mono text-primary text-xs">Dutch angle</td>
                  <td className="px-4 py-3 text-muted-foreground">倾斜画面</td>
                  <td className="px-4 py-3 text-muted-foreground">不安、疯狂</td>
                  <td className="px-4 py-3 text-muted-foreground">反派、危机</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Each shot type with example description */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-foreground">每种景别的场景描述示例</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-border p-4 space-y-1.5">
                <p className="font-medium text-foreground text-sm">特写 close-up</p>
                <p className="text-xs text-muted-foreground">
                  场景：女主收到分手短信，眼眶含泪
                </p>
                <code className="block text-xs bg-muted/50 rounded p-2 text-primary font-mono leading-relaxed">
                  close-up of a young Chinese woman&apos;s face, tears welling up in her eyes, biting her lower lip, phone screen glowing on her face, soft warm indoor lighting
                </code>
              </div>
              <div className="rounded-lg border border-border p-4 space-y-1.5">
                <p className="font-medium text-foreground text-sm">中景 medium shot</p>
                <p className="text-xs text-muted-foreground">
                  场景：男女主在咖啡厅对话
                </p>
                <code className="block text-xs bg-muted/50 rounded p-2 text-primary font-mono leading-relaxed">
                  medium shot of a young Chinese couple sitting across a small coffee table, the man leaning forward speaking earnestly, the woman looking down at her cup, cozy cafe interior, afternoon sunlight
                </code>
              </div>
              <div className="rounded-lg border border-border p-4 space-y-1.5">
                <p className="font-medium text-foreground text-sm">全景 wide shot</p>
                <p className="text-xs text-muted-foreground">
                  场景：男主独自站在空旷的天台
                </p>
                <code className="block text-xs bg-muted/50 rounded p-2 text-primary font-mono leading-relaxed">
                  wide shot of a lone young Chinese man standing on a rooftop, city skyline behind him, wind blowing his coat, golden hour sunset, dramatic clouds
                </code>
              </div>
              <div className="rounded-lg border border-border p-4 space-y-1.5">
                <p className="font-medium text-foreground text-sm">仰拍 low angle</p>
                <p className="text-xs text-muted-foreground">
                  场景：霸总男主从黑色豪车里走出
                </p>
                <code className="block text-xs bg-muted/50 rounded p-2 text-primary font-mono leading-relaxed">
                  low angle shot of a tall Chinese man in a black tailored suit stepping out of a luxury car, looking down with cold confidence, backlit by city lights at night
                </code>
              </div>
              <div className="rounded-lg border border-border p-4 space-y-1.5">
                <p className="font-medium text-foreground text-sm">俯拍 high angle</p>
                <p className="text-xs text-muted-foreground">
                  场景：女主在雨中蹲在地上
                </p>
                <code className="block text-xs bg-muted/50 rounded p-2 text-primary font-mono leading-relaxed">
                  high angle shot looking down at a young Chinese woman crouching on wet pavement in the rain, umbrella fallen beside her, neon reflections on the ground, night city
                </code>
              </div>
              <div className="rounded-lg border border-border p-4 space-y-1.5">
                <p className="font-medium text-foreground text-sm">过肩 over-shoulder</p>
                <p className="text-xs text-muted-foreground">
                  场景：反派和男主在办公室对峙
                </p>
                <code className="block text-xs bg-muted/50 rounded p-2 text-primary font-mono leading-relaxed">
                  over-the-shoulder shot from behind a man in a dark suit, facing a younger Chinese man standing defiantly across a large desk, tense office atmosphere, cold fluorescent lighting
                </code>
              </div>
              <div className="rounded-lg border border-border p-4 space-y-1.5">
                <p className="font-medium text-foreground text-sm">斜角 Dutch angle</p>
                <p className="text-xs text-muted-foreground">
                  场景：反派露出阴险笑容
                </p>
                <code className="block text-xs bg-muted/50 rounded p-2 text-primary font-mono leading-relaxed">
                  Dutch angle close-up of a middle-aged Chinese man with a sinister smirk, half face in shadow, red ambient lighting, dramatic contrast, unsettling atmosphere
                </code>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            Section 3: Prompt 结构公式
        ═══════════════════════════════════════════════════════════════ */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">
            Prompt 结构公式
          </h2>

          {/* Formula */}
          <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-5">
            <p className="text-sm font-semibold text-foreground mb-2">万能公式：</p>
            <code className="block text-sm font-mono text-primary leading-relaxed">
              [角色外貌+动作] + [情绪表情] + [镜头类型] + [场景环境] + [光线氛围] + [风格]
            </code>
            <p className="text-xs text-muted-foreground mt-3">
              这 6 个槽位顺序可以灵活调整，但每个都不能缺。缺了景别，构图随机；缺了光线，前后不一致；缺了风格，画风飘忽。
            </p>
          </div>

          {/* Slot 1: 角色描述 */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-foreground">槽位 1：角色描述怎么写</h3>
            <p className="text-sm text-foreground/90 leading-relaxed">
              基本结构：<code className="text-primary bg-muted/50 px-1.5 py-0.5 rounded text-xs font-mono">a [age] Chinese [gender], [appearance features], wearing [clothing]</code>
            </p>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="px-4 py-3 text-left font-semibold text-destructive w-1/2">坏的写法</th>
                    <th className="px-4 py-3 text-left font-semibold text-primary w-1/2">好的写法</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-xs font-mono">
                  <tr>
                    <td className="px-4 py-3 text-destructive/80">a beautiful girl</td>
                    <td className="px-4 py-3 text-primary/80">a 22-year-old Chinese woman with long black hair and delicate features, wearing a white blouse and grey pencil skirt</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-destructive/80">a handsome man</td>
                    <td className="px-4 py-3 text-primary/80">a 28-year-old Chinese man with sharp jawline and short black hair, wearing a tailored navy suit and silver watch</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-destructive/80">an old man</td>
                    <td className="px-4 py-3 text-primary/80">a 60-year-old Chinese man with grey temples and stern expression, wearing a traditional dark tang suit</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-destructive/80">a cute kid</td>
                    <td className="px-4 py-3 text-primary/80">a 5-year-old Chinese girl with twin ponytails and round cheeks, wearing a pink dress with white polka dots</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-destructive/80">the villain</td>
                    <td className="px-4 py-3 text-primary/80">a 45-year-old Chinese man with a scar across his left cheek, slicked-back hair, wearing a black leather coat</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground">
              核心原则：越具体越好。AI 不理解&quot;帅&quot;、&quot;漂亮&quot;这类主观词，它需要具体的五官、发型、服装描述。
            </p>
          </div>

          {/* Slot 2: 动作/情绪 */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-foreground">槽位 2：动作 / 情绪怎么写</h3>
            <p className="text-sm text-foreground/90 leading-relaxed">
              动作要<strong>具体到身体部位</strong>，不写&quot;他很生气&quot;，写
              <code className="text-primary bg-muted/50 px-1.5 py-0.5 rounded text-xs font-mono">
                clenching fists, jaw tightened, glaring forward
              </code>。
              情绪不是告诉 AI 一个抽象概念，而是<strong>描述这个情绪的外在表现</strong>。
            </p>

            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="px-4 py-3 text-left font-semibold text-foreground">情绪</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">英文描述</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">身体语言补充</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-xs">
                  <tr><td className="px-4 py-2.5 font-medium">愤怒</td><td className="px-4 py-2.5 font-mono text-primary">furious, rage</td><td className="px-4 py-2.5 text-muted-foreground">clenching fists, veins on forehead, jaw tightened</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium">悲伤</td><td className="px-4 py-2.5 font-mono text-primary">sorrowful, tearful</td><td className="px-4 py-2.5 text-muted-foreground">tears streaming down, looking down, shoulders slumped</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium">震惊</td><td className="px-4 py-2.5 font-mono text-primary">shocked, stunned</td><td className="px-4 py-2.5 text-muted-foreground">wide eyes, mouth slightly open, frozen posture</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium">开心</td><td className="px-4 py-2.5 font-mono text-primary">joyful, beaming</td><td className="px-4 py-2.5 text-muted-foreground">bright smile, eyes sparkling, relaxed posture</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium">害怕</td><td className="px-4 py-2.5 font-mono text-primary">terrified, fearful</td><td className="px-4 py-2.5 text-muted-foreground">trembling, stepping back, hands raised defensively</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium">冷漠</td><td className="px-4 py-2.5 font-mono text-primary">cold, indifferent</td><td className="px-4 py-2.5 text-muted-foreground">expressionless, arms crossed, looking away</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium">温柔</td><td className="px-4 py-2.5 font-mono text-primary">gentle, tender</td><td className="px-4 py-2.5 text-muted-foreground">soft smile, head slightly tilted, warm gaze</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium">自信</td><td className="px-4 py-2.5 font-mono text-primary">confident, assertive</td><td className="px-4 py-2.5 text-muted-foreground">chin up, steady gaze, hands in pockets or on hips</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium">绝望</td><td className="px-4 py-2.5 font-mono text-primary">desperate, hopeless</td><td className="px-4 py-2.5 text-muted-foreground">kneeling, head bowed, hands gripping hair</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium">心动</td><td className="px-4 py-2.5 font-mono text-primary">lovestruck, blushing</td><td className="px-4 py-2.5 text-muted-foreground">cheeks flushed, shy smile, avoiding eye contact</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium">傲慢</td><td className="px-4 py-2.5 font-mono text-primary">arrogant, haughty</td><td className="px-4 py-2.5 text-muted-foreground">chin raised, looking down at others, smirking</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium">紧张</td><td className="px-4 py-2.5 font-mono text-primary">anxious, nervous</td><td className="px-4 py-2.5 text-muted-foreground">biting lip, fidgeting, eyes darting around</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium">不甘</td><td className="px-4 py-2.5 font-mono text-primary">reluctant, unwilling</td><td className="px-4 py-2.5 text-muted-foreground">fists clenched at sides, gritted teeth, glaring</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium">思念</td><td className="px-4 py-2.5 font-mono text-primary">longing, nostalgic</td><td className="px-4 py-2.5 text-muted-foreground">gazing into distance, touching a keepsake, misty eyes</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium">疲惫</td><td className="px-4 py-2.5 font-mono text-primary">exhausted, weary</td><td className="px-4 py-2.5 text-muted-foreground">drooping eyelids, leaning against wall, disheveled hair</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium">惊喜</td><td className="px-4 py-2.5 font-mono text-primary">pleasantly surprised</td><td className="px-4 py-2.5 text-muted-foreground">hands covering mouth, wide sparkling eyes, slight gasp</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium">嫉妒</td><td className="px-4 py-2.5 font-mono text-primary">jealous, envious</td><td className="px-4 py-2.5 text-muted-foreground">narrowed eyes, tight lips, glancing sideways</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium">决心</td><td className="px-4 py-2.5 font-mono text-primary">determined, resolute</td><td className="px-4 py-2.5 text-muted-foreground">firm gaze, squared shoulders, clenched jaw</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium">委屈</td><td className="px-4 py-2.5 font-mono text-primary">aggrieved, wronged</td><td className="px-4 py-2.5 text-muted-foreground">pouting, eyes reddened, looking away holding back tears</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium">疯狂</td><td className="px-4 py-2.5 font-mono text-primary">manic, crazed</td><td className="px-4 py-2.5 text-muted-foreground">wild eyes, disheveled appearance, unhinged laughter</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Slot 3: 镜头 */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-foreground">槽位 3：镜头怎么写</h3>
            <p className="text-sm text-foreground/90 leading-relaxed">
              景别词 + 构图词组合使用，常见搭配：
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-border p-3 space-y-1">
                <p className="text-xs font-medium text-foreground">情绪特写</p>
                <code className="text-xs font-mono text-primary">close-up, centered composition</code>
                <p className="text-xs text-muted-foreground">角色正脸居中，最大化情绪冲击</p>
              </div>
              <div className="rounded-lg border border-border p-3 space-y-1">
                <p className="text-xs font-medium text-foreground">对话中景</p>
                <code className="text-xs font-mono text-primary">medium shot, rule of thirds</code>
                <p className="text-xs text-muted-foreground">角色偏左或偏右，留出对话空间</p>
              </div>
              <div className="rounded-lg border border-border p-3 space-y-1">
                <p className="text-xs font-medium text-foreground">环境全景</p>
                <code className="text-xs font-mono text-primary">wide shot, establishing shot</code>
                <p className="text-xs text-muted-foreground">展示整个场景，交代时间地点</p>
              </div>
              <div className="rounded-lg border border-border p-3 space-y-1">
                <p className="text-xs font-medium text-foreground">压迫仰拍</p>
                <code className="text-xs font-mono text-primary">low angle, dramatic perspective</code>
                <p className="text-xs text-muted-foreground">从下往上看，角色显得强大有威压</p>
              </div>
              <div className="rounded-lg border border-border p-3 space-y-1">
                <p className="text-xs font-medium text-foreground">渺小俯拍</p>
                <code className="text-xs font-mono text-primary">high angle, bird&apos;s eye view</code>
                <p className="text-xs text-muted-foreground">从上往下看，角色显得弱小无助</p>
              </div>
              <div className="rounded-lg border border-border p-3 space-y-1">
                <p className="text-xs font-medium text-foreground">对话过肩</p>
                <code className="text-xs font-mono text-primary">over-the-shoulder, shallow depth of field</code>
                <p className="text-xs text-muted-foreground">前景人物虚化，焦点在对面角色</p>
              </div>
            </div>
          </div>

          {/* Slot 4: 光线 */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-foreground">槽位 4：光线怎么写</h3>
            <p className="text-sm text-foreground/90 leading-relaxed">
              光线是情绪的&quot;隐形画笔&quot;。同一个角色同一个动作，换一种光线，观众感受完全不同。
            </p>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="px-4 py-3 text-left font-semibold text-foreground">情绪 / 场景</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">推荐光线</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Prompt 写法</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-xs">
                  <tr><td className="px-4 py-2.5 font-medium">温馨 / 回忆</td><td className="px-4 py-2.5 text-muted-foreground">暖黄色柔光</td><td className="px-4 py-2.5 font-mono text-primary">warm golden hour lighting, soft glow</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium">危险 / 孤独</td><td className="px-4 py-2.5 text-muted-foreground">冷蓝色调</td><td className="px-4 py-2.5 font-mono text-primary">cold blue lighting, dim atmosphere</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium">英雄 / 神秘</td><td className="px-4 py-2.5 text-muted-foreground">逆光剪影</td><td className="px-4 py-2.5 font-mono text-primary">backlit silhouette, rim lighting, dramatic contrast</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium">悬疑 / 紧张</td><td className="px-4 py-2.5 text-muted-foreground">暗调侧光</td><td className="px-4 py-2.5 font-mono text-primary">side lighting, deep shadows, chiaroscuro</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium">日常 / 平静</td><td className="px-4 py-2.5 text-muted-foreground">自然光</td><td className="px-4 py-2.5 font-mono text-primary">natural daylight, soft diffused light</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium">浪漫 / 心动</td><td className="px-4 py-2.5 text-muted-foreground">夕阳 / 粉暖调</td><td className="px-4 py-2.5 font-mono text-primary">sunset glow, romantic pink-orange tones, lens flare</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium">反派 / 阴谋</td><td className="px-4 py-2.5 text-muted-foreground">底光 / 红色</td><td className="px-4 py-2.5 font-mono text-primary">underlighting, red ambient glow, ominous atmosphere</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium">觉醒 / 爆发</td><td className="px-4 py-2.5 text-muted-foreground">强烈高光</td><td className="px-4 py-2.5 font-mono text-primary">intense bright light, volumetric rays, glowing aura</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium">夜晚 / 都市</td><td className="px-4 py-2.5 text-muted-foreground">霓虹 / 混合色</td><td className="px-4 py-2.5 font-mono text-primary">neon city lights, colorful reflections, cyberpunk glow</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium">雨天 / 沉重</td><td className="px-4 py-2.5 text-muted-foreground">灰调漫射光</td><td className="px-4 py-2.5 font-mono text-primary">overcast grey sky, muted tones, wet reflective surfaces</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Slot 5: 风格 */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-foreground">槽位 5：风格怎么写</h3>
            <p className="text-sm text-foreground/90 leading-relaxed">
              <strong>整部剧统一风格词，不要每张换。</strong>
              风格词是你的&quot;画风锚点&quot;，一旦确定就作为固定后缀加在每个 prompt 末尾。
            </p>
            <div className="rounded-lg border border-border p-4 space-y-2">
              <p className="text-sm font-medium text-foreground">推荐风格后缀（按题材选一组）：</p>
              <div className="space-y-2 text-xs">
                <div className="flex gap-2 items-start">
                  <span className="shrink-0 font-medium text-foreground w-20">现代都市：</span>
                  <code className="font-mono text-primary">anime style, modern aesthetic, clean lines, vibrant colors, 8k quality, detailed</code>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="shrink-0 font-medium text-foreground w-20">古风仙侠：</span>
                  <code className="font-mono text-primary">Chinese ink painting style, xianxia aesthetic, ethereal atmosphere, flowing robes, 8k quality, detailed</code>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="shrink-0 font-medium text-foreground w-20">暗黑悬疑：</span>
                  <code className="font-mono text-primary">dark manga style, cel shading, high contrast, moody atmosphere, cinematic, 8k quality</code>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="shrink-0 font-medium text-foreground w-20">甜宠恋爱：</span>
                  <code className="font-mono text-primary">soft anime style, pastel tones, dreamy atmosphere, shoujo manga aesthetic, 8k quality, detailed</code>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            Section 4: 10 个高质量 Prompt 实例
        ═══════════════════════════════════════════════════════════════ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">
            10 个高质量 Prompt 实例
          </h2>
          <p className="text-sm text-muted-foreground">
            以下 prompt 可直接复制到即梦 / Midjourney 使用，涵盖不同题材和镜头类型。
          </p>

          <div className="space-y-4">
            {/* Prompt 1 */}
            <div className="rounded-xl border border-border p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center size-6 rounded-full bg-primary/10 text-primary text-xs font-bold">1</span>
                <p className="text-sm font-medium text-foreground">霸总第一次出场 —— 仰拍+全身</p>
              </div>
              <code className="block text-xs bg-muted/50 rounded-lg p-3 text-primary font-mono leading-relaxed">
                low angle wide shot of a 30-year-old Chinese man in a black tailored suit, stepping out of a Maybach, one hand adjusting his cufflink, cold confident expression, city skyscraper behind him, night scene, neon reflections on wet ground, cinematic lighting, anime style, clean lines, 8k quality, detailed
              </code>
              <p className="text-xs text-muted-foreground">为什么这样写：仰拍+全身建立角色强大气场，夜景霓虹增加都市质感。</p>
            </div>

            {/* Prompt 2 */}
            <div className="rounded-xl border border-border p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center size-6 rounded-full bg-primary/10 text-primary text-xs font-bold">2</span>
                <p className="text-sm font-medium text-foreground">女主含泪特写 —— 情绪爆发</p>
              </div>
              <code className="block text-xs bg-muted/50 rounded-lg p-3 text-primary font-mono leading-relaxed">
                close-up of a 24-year-old Chinese woman with long black hair, tears rolling down her cheeks, biting her lower lip, eyes reddened, rain droplets on her face, overcast grey background, soft diffused light, sorrowful expression, anime style, clean lines, 8k quality, detailed
              </code>
              <p className="text-xs text-muted-foreground">为什么这样写：特写最大化情绪冲击，雨滴+灰调强化悲伤氛围。</p>
            </div>

            {/* Prompt 3 */}
            <div className="rounded-xl border border-border p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center size-6 rounded-full bg-primary/10 text-primary text-xs font-bold">3</span>
                <p className="text-sm font-medium text-foreground">咖啡厅偶遇 —— 中景对话</p>
              </div>
              <code className="block text-xs bg-muted/50 rounded-lg p-3 text-primary font-mono leading-relaxed">
                medium shot of a young Chinese man and woman sitting at a small round table in a cozy cafe, the man looking surprised with wide eyes, the woman smiling softly holding a coffee cup, warm afternoon sunlight through window, bokeh background, anime style, clean lines, 8k quality, detailed
              </code>
              <p className="text-xs text-muted-foreground">为什么这样写：中景展示两人互动关系，暖光+咖啡厅建立温馨基调。</p>
            </div>

            {/* Prompt 4 */}
            <div className="rounded-xl border border-border p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center size-6 rounded-full bg-primary/10 text-primary text-xs font-bold">4</span>
                <p className="text-sm font-medium text-foreground">反派阴谋 —— 斜角特写</p>
              </div>
              <code className="block text-xs bg-muted/50 rounded-lg p-3 text-primary font-mono leading-relaxed">
                Dutch angle close-up of a 50-year-old Chinese man with slicked-back grey hair, sinister smirk, half face in deep shadow, red ambient lighting from below, dark office background, ominous atmosphere, dark manga style, cel shading, high contrast, 8k quality
              </code>
              <p className="text-xs text-muted-foreground">为什么这样写：斜角+底光+红色调三重暗示反派的危险和不安定。</p>
            </div>

            {/* Prompt 5 */}
            <div className="rounded-xl border border-border p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center size-6 rounded-full bg-primary/10 text-primary text-xs font-bold">5</span>
                <p className="text-sm font-medium text-foreground">天台告白 —— 全景黄昏</p>
              </div>
              <code className="block text-xs bg-muted/50 rounded-lg p-3 text-primary font-mono leading-relaxed">
                wide shot of a young Chinese couple standing on a rooftop, the man holding the woman&apos;s hands, facing each other, city skyline in background, golden hour sunset, warm orange and pink sky, wind blowing their hair, romantic atmosphere, soft anime style, pastel tones, 8k quality, detailed
              </code>
              <p className="text-xs text-muted-foreground">为什么这样写：全景展示环境规模，黄昏暖调+城市天际线营造浪漫高光时刻。</p>
            </div>

            {/* Prompt 6 */}
            <div className="rounded-xl border border-border p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center size-6 rounded-full bg-primary/10 text-primary text-xs font-bold">6</span>
                <p className="text-sm font-medium text-foreground">办公室对峙 —— 过肩镜头</p>
              </div>
              <code className="block text-xs bg-muted/50 rounded-lg p-3 text-primary font-mono leading-relaxed">
                over-the-shoulder shot from behind a man in a dark suit, facing a 26-year-old Chinese woman standing defiantly with arms crossed, large glass office with city view, cold fluorescent lighting, tense atmosphere, shallow depth of field, anime style, clean lines, 8k quality, detailed
              </code>
              <p className="text-xs text-muted-foreground">为什么这样写：过肩镜头让观众&quot;站在&quot;一方身后，增强对峙的参与感。</p>
            </div>

            {/* Prompt 7 */}
            <div className="rounded-xl border border-border p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center size-6 rounded-full bg-primary/10 text-primary text-xs font-bold">7</span>
                <p className="text-sm font-medium text-foreground">古风仙侠 —— 御剑飞行</p>
              </div>
              <code className="block text-xs bg-muted/50 rounded-lg p-3 text-primary font-mono leading-relaxed">
                wide shot of a young Chinese man in flowing white hanfu robes, standing on a glowing sword flying above clouds, long black hair flowing in the wind, ethereal mountain peaks below, golden sunrise, volumetric light rays, Chinese ink painting style, xianxia aesthetic, 8k quality, detailed
              </code>
              <p className="text-xs text-muted-foreground">为什么这样写：全景展示仙侠世界的宏大，飘动的衣袍+云海+山峰建立意境。</p>
            </div>

            {/* Prompt 8 */}
            <div className="rounded-xl border border-border p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center size-6 rounded-full bg-primary/10 text-primary text-xs font-bold">8</span>
                <p className="text-sm font-medium text-foreground">雨中分离 —— 俯拍</p>
              </div>
              <code className="block text-xs bg-muted/50 rounded-lg p-3 text-primary font-mono leading-relaxed">
                high angle shot looking down at two people walking in opposite directions on a rain-soaked street, a red umbrella abandoned between them, neon signs reflecting on wet asphalt, night scene, melancholic atmosphere, muted desaturated colors, anime style, cinematic, 8k quality, detailed
              </code>
              <p className="text-xs text-muted-foreground">为什么这样写：俯拍暗示命运的无情俯视，红伞成为两人关系的视觉符号。</p>
            </div>

            {/* Prompt 9 */}
            <div className="rounded-xl border border-border p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center size-6 rounded-full bg-primary/10 text-primary text-xs font-bold">9</span>
                <p className="text-sm font-medium text-foreground">打脸名场面 —— 中景侧面</p>
              </div>
              <code className="block text-xs bg-muted/50 rounded-lg p-3 text-primary font-mono leading-relaxed">
                medium shot side view of a 24-year-old Chinese woman slapping a well-dressed man across the face, the man&apos;s head turning from impact, shocked onlookers in background, luxury restaurant interior, bright chandelier lighting, dynamic motion blur on the hand, anime style, clean lines, 8k quality, detailed
              </code>
              <p className="text-xs text-muted-foreground">为什么这样写：侧面中景完整展示打脸动作弧线，背景围观者增加戏剧张力。</p>
            </div>

            {/* Prompt 10 */}
            <div className="rounded-xl border border-border p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center size-6 rounded-full bg-primary/10 text-primary text-xs font-bold">10</span>
                <p className="text-sm font-medium text-foreground">道具特写 —— 戒指/信物</p>
              </div>
              <code className="block text-xs bg-muted/50 rounded-lg p-3 text-primary font-mono leading-relaxed">
                extreme close-up of a woman&apos;s slender hand holding a diamond ring between her fingers, tears dropping onto the ring, soft bokeh background of a dimly lit bedroom, warm bedside lamp glow, melancholic atmosphere, anime style, clean lines, 8k quality, detailed
              </code>
              <p className="text-xs text-muted-foreground">为什么这样写：道具特写不需要角色全脸，用细节传达情感，泪滴+戒指讲述整个故事。</p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            Section 5: 10 个常见错误
        ═══════════════════════════════════════════════════════════════ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">
            10 个常见错误
          </h2>
          <p className="text-sm text-muted-foreground">
            以下是新手最容易踩的坑，每个都附带错误写法和正确写法对比。
          </p>

          <div className="space-y-3">
            {[
              {
                num: 1,
                title: "Prompt 用中文写",
                wrong: "一个穿黑色西装的帅哥走出豪车",
                why: "主流 AI 绘图模型（Midjourney / Stable Diffusion / 即梦）对英文理解能力远强于中文，中文 prompt 出图效果不稳定。",
                right: "a handsome 28-year-old Chinese man in a black suit stepping out of a luxury car",
              },
              {
                num: 2,
                title: "描述太抽象，无法可视化",
                wrong: "he recalls his painful past",
                why: "AI 无法画「回忆」这个概念，它需要看得见的画面元素。",
                right: "close-up of a man staring at an old photograph, misty eyes, soft golden flashback lighting, faded color tones",
              },
              {
                num: 3,
                title: "Prompt 太长（200+ 词）",
                wrong: "a very very detailed scene with a young man who has black hair and brown eyes and is wearing a blue shirt with white buttons and grey pants and black leather shoes standing in a room that has wooden floors and white walls and a large window with curtains... (200+ words)",
                why: "超过 80 词后，AI 会忽略后半段描述。关键信息被淹没在无用细节里。",
                right: "a young Chinese man in a blue shirt, standing in a bright room with wooden floor, large window with sunlight, medium shot, natural daylight (控制在 50-80 词)",
              },
              {
                num: 4,
                title: "每张图换一种风格词",
                wrong: "第 1 张用 oil painting style，第 2 张用 anime style，第 3 张用 watercolor...",
                why: "风格不统一 = 剪到一起像 PPT 拼凑，观众出戏。",
                right: "确定一组风格后缀后全集统一使用，如 anime style, clean lines, vibrant colors, 8k quality, detailed",
              },
              {
                num: 5,
                title: "群像 5 人以上同框",
                wrong: "five people standing in a row, each with different expressions and outfits",
                why: "AI 生成 3 人以上的群像时，面部容易崩坏、人物粘连或缺胳膊少腿。",
                right: "拆成单人或双人镜头分开生成，后期用剪映合成到同一画面；或用全景远景模糊处理多余角色",
              },
              {
                num: 6,
                title: "同时描述复杂背景 + 复杂动作",
                wrong: "a man doing a backflip kick in a crowded marketplace with dozens of stalls and hundreds of people",
                why: "AI 的「注意力」有限，同时处理复杂动作和复杂场景，两边都会崩。",
                right: "分两步：先生成干净背景图，再用角色参考生成人物动作，最后合成；或简化其中一侧",
              },
              {
                num: 7,
                title: "使用否定词",
                wrong: "not ugly, no wrinkles, don't make it dark",
                why: "AI 经常忽略否定词，「not ugly」可能被理解为「ugly」。负面 prompt 要用 negative prompt 栏位。",
                right: "用正面描述代替：beautiful smooth skin, bright lighting。把不想要的元素放到 negative prompt 栏",
              },
              {
                num: 8,
                title: "没标景别",
                wrong: "a man standing in an office looking angry",
                why: "不写景别 = AI 随机决定远近，这次出全景下次出特写，镜头节奏全乱。",
                right: "medium shot of a man standing in an office, angry expression, clenching fists",
              },
              {
                num: 9,
                title: "没标光线",
                wrong: "a woman sitting by the window",
                why: "不写光线 = AI 随机分配光照，一组图里有的暖有的冷有的明有的暗，剪到一起严重不连贯。",
                right: "a woman sitting by the window, warm afternoon sunlight streaming through, soft golden tones",
              },
              {
                num: 10,
                title: "没加质量词",
                wrong: "a Chinese girl smiling in a park, anime style",
                why: "不加质量词，出图可能模糊、粗糙、缺少细节，需要反复重做。",
                right: "a Chinese girl smiling in a park, anime style, 8k quality, highly detailed, sharp focus",
              },
            ].map((item) => (
              <div key={item.num} className="rounded-xl border border-border p-4 space-y-2">
                <p className="text-sm font-semibold text-foreground">
                  <span className="text-primary mr-1.5">#{item.num}</span>
                  {item.title}
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="rounded-lg bg-destructive/5 border border-destructive/20 p-3">
                    <p className="text-xs font-medium text-destructive mb-1">错误写法</p>
                    <p className="text-xs font-mono text-foreground/80 break-all">{item.wrong}</p>
                  </div>
                  <div className="rounded-lg bg-primary/5 border border-primary/20 p-3">
                    <p className="text-xs font-medium text-primary mb-1">正确写法</p>
                    <p className="text-xs font-mono text-foreground/80 break-all">{item.right}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{item.why}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            Section 6: 参数基线速查
        ═══════════════════════════════════════════════════════════════ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">
            参数基线速查
          </h2>

          <h3 className="text-base font-semibold text-foreground">三平台参数对照表</h3>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="px-4 py-3 text-left font-semibold text-foreground">参数</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">即梦</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Midjourney</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">ComfyUI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-xs">
                <tr>
                  <td className="px-4 py-2.5 font-medium">图片尺寸</td>
                  <td className="px-4 py-2.5 text-muted-foreground">16:9 横屏（1920x1080）</td>
                  <td className="px-4 py-2.5 text-muted-foreground">--ar 16:9</td>
                  <td className="px-4 py-2.5 text-muted-foreground">width=1920, height=1080</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium">生成数量</td>
                  <td className="px-4 py-2.5 text-muted-foreground">4 张取最佳</td>
                  <td className="px-4 py-2.5 text-muted-foreground">默认 4 张（grid）</td>
                  <td className="px-4 py-2.5 text-muted-foreground">batch_size=4</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium">引导强度 / CFG</td>
                  <td className="px-4 py-2.5 text-muted-foreground">默认（平台自动）</td>
                  <td className="px-4 py-2.5 text-muted-foreground">--stylize 100（默认）</td>
                  <td className="px-4 py-2.5 text-muted-foreground">CFG=7（推荐 5-9）</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium">采样步数</td>
                  <td className="px-4 py-2.5 text-muted-foreground">平台自动</td>
                  <td className="px-4 py-2.5 text-muted-foreground">不可调</td>
                  <td className="px-4 py-2.5 text-muted-foreground">steps=25-30</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium">角色参考权重</td>
                  <td className="px-4 py-2.5 text-muted-foreground">参考强度 0.6-0.8</td>
                  <td className="px-4 py-2.5 text-muted-foreground">--cref [url] --cw 80</td>
                  <td className="px-4 py-2.5 text-muted-foreground">IPAdapter weight=0.6-0.8</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium">负面提示词</td>
                  <td className="px-4 py-2.5 text-muted-foreground">有专门输入框</td>
                  <td className="px-4 py-2.5 text-muted-foreground">--no [内容]</td>
                  <td className="px-4 py-2.5 text-muted-foreground">negative prompt 节点</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium">模型 / 版本</td>
                  <td className="px-4 py-2.5 text-muted-foreground">Seedance 2.0</td>
                  <td className="px-4 py-2.5 text-muted-foreground">--v 6.1</td>
                  <td className="px-4 py-2.5 text-muted-foreground">SDXL / Flux</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-base font-semibold text-foreground mt-6">场景命中率参考</h3>
          <p className="text-sm text-muted-foreground">
            不同类型的画面，AI 一次生成满意结果的概率不同。了解命中率有助于你合理安排制作时间。
          </p>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="px-4 py-3 text-left font-semibold text-foreground">场景类型</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">命中率</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">建议</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-xs">
                <tr>
                  <td className="px-4 py-2.5 font-medium">对话 / 静态场景</td>
                  <td className="px-4 py-2.5"><span className="text-primary font-semibold">90%+</span></td>
                  <td className="px-4 py-2.5 text-muted-foreground">默认参数即可，一次出 4 张基本能选到满意的</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium">动作场景</td>
                  <td className="px-4 py-2.5"><span className="text-amber-600 font-semibold">60-70%</span></td>
                  <td className="px-4 py-2.5 text-muted-foreground">CFG 降 1-2，动作描述简化到核心动作，避免同时多人动作</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium">群像（3+ 人）</td>
                  <td className="px-4 py-2.5"><span className="text-destructive font-semibold">40-50%</span></td>
                  <td className="px-4 py-2.5 text-muted-foreground">强烈建议拆成单人/双人镜头分开生成，后期合成</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium">特写</td>
                  <td className="px-4 py-2.5"><span className="text-primary font-semibold">85%+</span></td>
                  <td className="px-4 py-2.5 text-muted-foreground">角色参考权重 +0.1（如从 0.7 调到 0.8），确保人脸一致</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium">手部细节</td>
                  <td className="px-4 py-2.5"><span className="text-destructive font-semibold">30-50%</span></td>
                  <td className="px-4 py-2.5 text-muted-foreground">AI 画手依然是难点，尽量避免手部特写，或多次重跑挑选</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium">道具 / 物件特写</td>
                  <td className="px-4 py-2.5"><span className="text-primary font-semibold">80%+</span></td>
                  <td className="px-4 py-2.5 text-muted-foreground">无人物的物件特写成功率高，适合插入作为过渡镜头</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
