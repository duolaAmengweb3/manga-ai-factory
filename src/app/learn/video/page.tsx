import { Video } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";

export const metadata = { title: "视频生成" };

export default function VideoPage() {
  return (
    <DashboardLayout>
      <div className="space-y-10">
        {/* ────────── Header ────────── */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground tracking-tight sm:text-3xl flex items-center gap-2">
            <Video className="size-6 text-primary" /> 视频生成指南
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
            分镜图做好之后，下一步是让静态画面&quot;动起来&quot;。本章详细讲解视频生成工具的选择、
            即梦 Seedance 2.0 与可灵 3.0 的实操流程，以及提升视频质量的关键技巧。
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            Section 1: 视频生成工具对比
        ═══════════════════════════════════════════════════════════════ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">
            视频生成工具对比
          </h2>
          <p className="text-sm text-foreground/90 leading-relaxed">
            2024-2025 年是 AI 视频元年，多家平台推出了图生视频 / 文生视频能力。
            以下是目前最主流的 5 个工具横向对比：
          </p>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="px-4 py-3 text-left font-semibold text-foreground">工具</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">背景</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">价格</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">最长时长</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">画质</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">特点</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-xs">
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">即梦 Seedance 2.0</td>
                  <td className="px-4 py-3 text-muted-foreground">字节跳动</td>
                  <td className="px-4 py-3 text-muted-foreground">免费 66 积分/日，会员 ¥69-499/月</td>
                  <td className="px-4 py-3 text-muted-foreground">10 秒/段</td>
                  <td className="px-4 py-3"><span className="text-primary font-semibold">高</span></td>
                  <td className="px-4 py-3 text-muted-foreground">中文优化最好，国内直接用，支持角色参考</td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">可灵 3.0</td>
                  <td className="px-4 py-3 text-muted-foreground">快手</td>
                  <td className="px-4 py-3 text-muted-foreground">灵感值计费，会员 ¥66-666/月</td>
                  <td className="px-4 py-3 text-muted-foreground">10 秒/段</td>
                  <td className="px-4 py-3"><span className="text-primary font-semibold">最高</span></td>
                  <td className="px-4 py-3 text-muted-foreground">1080p 高清输出，运动自然度领先</td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">Vidu</td>
                  <td className="px-4 py-3 text-muted-foreground">生数科技</td>
                  <td className="px-4 py-3 text-muted-foreground">免费体验，付费按量</td>
                  <td className="px-4 py-3 text-muted-foreground">8 秒/段</td>
                  <td className="px-4 py-3"><span className="text-primary font-semibold">高</span></td>
                  <td className="px-4 py-3 text-muted-foreground">Sora 对标产品，物理引擎模拟好</td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">Sora</td>
                  <td className="px-4 py-3 text-muted-foreground">OpenAI</td>
                  <td className="px-4 py-3 text-muted-foreground">ChatGPT Plus $20/月含</td>
                  <td className="px-4 py-3 text-muted-foreground">20 秒/段</td>
                  <td className="px-4 py-3"><span className="text-primary font-semibold">高</span></td>
                  <td className="px-4 py-3 text-muted-foreground">需翻墙，生成速度慢，单次 20 秒较长</td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">Runway Gen-3</td>
                  <td className="px-4 py-3 text-muted-foreground">Runway</td>
                  <td className="px-4 py-3 text-muted-foreground">$12/月起</td>
                  <td className="px-4 py-3 text-muted-foreground">10 秒/段</td>
                  <td className="px-4 py-3"><span className="text-primary font-semibold">高</span></td>
                  <td className="px-4 py-3 text-muted-foreground">国际化，运镜控制优秀，需翻墙</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
            <p className="text-sm font-medium text-foreground mb-1">推荐选择</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>新手首选即梦</strong>：无需翻墙、中文界面、免费额度够用来练手。
              <strong>追求画质选可灵</strong>：1080p 输出、运动自然度最高。
              如果你已经有翻墙条件且预算充足，Sora 的 20 秒单段时长可以减少拼接次数。
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            Section 2: 即梦 Seedance 2.0 详细教程
        ═══════════════════════════════════════════════════════════════ */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">
            即梦 Seedance 2.0 详细教程
          </h2>

          {/* 注册登录 */}
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-foreground">注册 + 登录</h3>
            <ol className="list-decimal pl-6 text-sm text-foreground/90 space-y-1.5 leading-relaxed">
              <li>打开 <code className="text-primary bg-muted/50 px-1.5 py-0.5 rounded text-xs font-mono">jimeng.jianying.com</code>（即梦官网），或在剪映 App 内找到&quot;即梦 AI&quot;入口</li>
              <li>用抖音 / 手机号注册登录</li>
              <li>新用户有免费体验积分，每日签到也可领取积分</li>
              <li>进入后选择左侧&quot;视频生成&quot;功能区</li>
            </ol>
          </div>

          {/* 基础操作 */}
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-foreground">基础操作：文生视频 vs 图生视频</h3>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="px-4 py-3 text-left font-semibold text-foreground">模式</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">输入</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">优点</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">缺点</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">推荐场景</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-xs">
                  <tr>
                    <td className="px-4 py-3 font-medium text-foreground">文生视频</td>
                    <td className="px-4 py-3 text-muted-foreground">纯文本 prompt</td>
                    <td className="px-4 py-3 text-muted-foreground">最灵活，想什么写什么</td>
                    <td className="px-4 py-3 text-muted-foreground">画面不可控，人物一致性差</td>
                    <td className="px-4 py-3 text-muted-foreground">测试概念、风景空镜</td>
                  </tr>
                  <tr className="bg-primary/5">
                    <td className="px-4 py-3 font-medium text-primary">图生视频（推荐）</td>
                    <td className="px-4 py-3 text-muted-foreground">分镜图 + 运动提示词</td>
                    <td className="px-4 py-3 text-muted-foreground">画面一致性好，角色稳定</td>
                    <td className="px-4 py-3 text-muted-foreground">需要先准备好分镜图</td>
                    <td className="px-4 py-3 text-muted-foreground">AI 漫剧制作（我们的主流程）</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground">
              做 AI 漫剧，<strong>强烈推荐「图生视频」</strong>模式。先用 prompt 在即梦/MJ 生成分镜图，再把分镜图传入视频生成，这样角色外貌、场景一致性最好。
            </p>
          </div>

          {/* 角色参考 */}
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-foreground">角色参考功能</h3>
            <div className="text-sm text-foreground/90 space-y-1.5 leading-relaxed">
              <p>
                即梦支持&quot;角色参考&quot;功能，上传角色的正面定妆照后，生成的视频会尽量保持角色外貌一致。
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>在图生视频界面，点击&quot;角色参考&quot;上传角色照片</li>
                <li>参考强度推荐设 <strong>0.6-0.8</strong>（太高会限制动作自由度，太低不像）</li>
                <li>每个视频段只参考一个主角，不要同时参考多人</li>
                <li>角色参考图最好是 <strong>正面、清晰、纯色背景</strong> 的半身照</li>
              </ul>
            </div>
          </div>

          {/* 动作提示词 */}
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-foreground">动作提示词怎么写</h3>
            <p className="text-sm text-foreground/90 leading-relaxed">
              图生视频时，你需要附加一段&quot;运动描述&quot;告诉 AI 画面该怎么动。以下是常用动作词库：
            </p>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="px-4 py-3 text-left font-semibold text-foreground">动作类别</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">提示词（英文）</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">说明</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-xs">
                  <tr><td className="px-4 py-2.5 font-medium">头发飘动</td><td className="px-4 py-2.5 font-mono text-primary">hair flowing in the wind, hair gently swaying</td><td className="px-4 py-2.5 text-muted-foreground">最简单最安全的动态效果</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium">衣摆飘动</td><td className="px-4 py-2.5 font-mono text-primary">clothes fluttering, coat swaying in breeze</td><td className="px-4 py-2.5 text-muted-foreground">配合站立pose效果好</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium">转头</td><td className="px-4 py-2.5 font-mono text-primary">slowly turning head to face camera, head turn</td><td className="px-4 py-2.5 text-muted-foreground">适合角色出场、回眸</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium">走路</td><td className="px-4 py-2.5 font-mono text-primary">walking forward slowly, stepping ahead</td><td className="px-4 py-2.5 text-muted-foreground">配合全景效果好，中景可能穿帮</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium">眨眼/微笑</td><td className="px-4 py-2.5 font-mono text-primary">blinking, subtle smile forming, eyes opening</td><td className="px-4 py-2.5 text-muted-foreground">特写镜头微表情，很有感染力</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium">抬手</td><td className="px-4 py-2.5 font-mono text-primary">slowly raising hand, reaching out</td><td className="px-4 py-2.5 text-muted-foreground">简单手部动作OK，复杂手势容易崩</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium">环境动态</td><td className="px-4 py-2.5 font-mono text-primary">leaves falling, rain drops, snow particles floating</td><td className="px-4 py-2.5 text-muted-foreground">给静态画面加氛围感</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium">光影变化</td><td className="px-4 py-2.5 font-mono text-primary">light flickering, shadows moving, sun rays shifting</td><td className="px-4 py-2.5 text-muted-foreground">增强电影感</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 运镜控制 */}
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-foreground">运镜控制</h3>
            <p className="text-sm text-foreground/90 leading-relaxed">
              运镜 = 虚拟摄影机的移动方式。合理运镜让画面有电影感，不合理运镜让观众头晕。
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-border p-4 space-y-1.5">
                <p className="font-medium text-foreground text-sm">推进 Zoom In</p>
                <code className="text-xs font-mono text-primary">slowly zooming in, camera pushing forward</code>
                <p className="text-xs text-muted-foreground">从全景推到中景/特写，制造紧张感或聚焦</p>
              </div>
              <div className="rounded-lg border border-border p-4 space-y-1.5">
                <p className="font-medium text-foreground text-sm">拉远 Zoom Out</p>
                <code className="text-xs font-mono text-primary">slowly zooming out, camera pulling back</code>
                <p className="text-xs text-muted-foreground">从特写拉到全景，揭示环境或制造孤独感</p>
              </div>
              <div className="rounded-lg border border-border p-4 space-y-1.5">
                <p className="font-medium text-foreground text-sm">横摇 Pan</p>
                <code className="text-xs font-mono text-primary">camera panning left/right, horizontal pan</code>
                <p className="text-xs text-muted-foreground">水平移动展示宽广场景，如扫视人群</p>
              </div>
              <div className="rounded-lg border border-border p-4 space-y-1.5">
                <p className="font-medium text-foreground text-sm">上摇 Tilt Up</p>
                <code className="text-xs font-mono text-primary">camera tilting up, vertical pan upward</code>
                <p className="text-xs text-muted-foreground">从脚部扫到头部，展示角色全貌</p>
              </div>
              <div className="rounded-lg border border-border p-4 space-y-1.5">
                <p className="font-medium text-foreground text-sm">环绕 Orbit</p>
                <code className="text-xs font-mono text-primary">camera orbiting around subject, 360 rotation</code>
                <p className="text-xs text-muted-foreground">绕角色旋转拍摄，很炫但容易崩，谨慎使用</p>
              </div>
              <div className="rounded-lg border border-border p-4 space-y-1.5">
                <p className="font-medium text-foreground text-sm">静止 Static</p>
                <code className="text-xs font-mono text-primary">static camera, fixed camera angle</code>
                <p className="text-xs text-muted-foreground">摄影机不动，只有角色/环境运动，最稳定</p>
              </div>
            </div>
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
              <p className="text-xs text-amber-900 leading-relaxed">
                <strong>重要：</strong>每段视频只用一种运镜，不要同时写&quot;zoom in + pan left + tilt up&quot;，
                AI 会混乱导致画面抖动。想要复合运镜？拆成多段分别生成再拼接。
              </p>
            </div>
          </div>

          {/* 最佳实践 */}
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-foreground">最佳实践</h3>
            <ul className="list-disc pl-6 text-sm text-foreground/90 space-y-1.5 leading-relaxed">
              <li><strong>每段 5-10 秒</strong>：不要贪长。5 秒的高质量视频远好于 10 秒的拉伸变形视频</li>
              <li><strong>生成 4 个候选</strong>：每次生成 4 个版本，挑最好的那个，这是 AI 视频的标准流程</li>
              <li><strong>动作越简单越好</strong>：头发飘动、微笑、转头这类微动作成功率最高</li>
              <li><strong>避免快速运动</strong>：跑步、打斗、跳跃等快速动作目前 AI 处理得还不好</li>
              <li><strong>背景尽量简洁</strong>：纯色/虚化背景 + 前景角色动态 = 最稳组合</li>
            </ul>
          </div>

          {/* 价格计算 */}
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-foreground">价格计算</h3>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="px-4 py-3 text-left font-semibold text-foreground">类型</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">额度</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">说明</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-xs">
                  <tr>
                    <td className="px-4 py-2.5 font-medium text-foreground">免费额度</td>
                    <td className="px-4 py-2.5 text-muted-foreground">66 积分/日</td>
                    <td className="px-4 py-2.5 text-muted-foreground">约生成 6-10 段视频（含失败重试），够日常练手</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 font-medium text-foreground">基础会员</td>
                    <td className="px-4 py-2.5 text-muted-foreground">¥69/月，3000 积分</td>
                    <td className="px-4 py-2.5 text-muted-foreground">约 300 段视频，够做 10-15 集</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 font-medium text-foreground">专业会员</td>
                    <td className="px-4 py-2.5 text-muted-foreground">¥169/月，8000 积分</td>
                    <td className="px-4 py-2.5 text-muted-foreground">约 800 段视频，日更节奏首选</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 font-medium text-foreground">旗舰会员</td>
                    <td className="px-4 py-2.5 text-muted-foreground">¥499/月，30000 积分</td>
                    <td className="px-4 py-2.5 text-muted-foreground">工作室级别，多账号多平台同步更新</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground">
              建议：先用免费额度练手 1-2 周，确定稳定出片后再升级。推荐从基础会员开始。
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            Section 3: 可灵 3.0 教程
        ═══════════════════════════════════════════════════════════════ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">
            可灵 3.0 教程
          </h2>

          <div className="space-y-3">
            <h3 className="text-base font-semibold text-foreground">可灵 vs 即梦的区别</h3>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="px-4 py-3 text-left font-semibold text-foreground">维度</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">即梦 Seedance 2.0</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">可灵 3.0</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-xs">
                  <tr><td className="px-4 py-2.5 font-medium">画质上限</td><td className="px-4 py-2.5 text-muted-foreground">720p-1080p</td><td className="px-4 py-2.5 text-muted-foreground">原生 1080p，细节更锐利</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium">运动自然度</td><td className="px-4 py-2.5 text-muted-foreground">好</td><td className="px-4 py-2.5 text-muted-foreground">更好，人物走路/转身更流畅</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium">免费额度</td><td className="px-4 py-2.5 text-muted-foreground">66 积分/日</td><td className="px-4 py-2.5 text-muted-foreground">新用户赠送灵感值，之后较少</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium">生成速度</td><td className="px-4 py-2.5 text-muted-foreground">约 2-5 分钟</td><td className="px-4 py-2.5 text-muted-foreground">约 3-8 分钟</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium">角色一致性</td><td className="px-4 py-2.5 text-muted-foreground">有角色参考功能</td><td className="px-4 py-2.5 text-muted-foreground">有角色参考功能，支持多角色</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium">适合场景</td><td className="px-4 py-2.5 text-muted-foreground">日常批量生产，高性价比</td><td className="px-4 py-2.5 text-muted-foreground">重要镜头、高光场景、追求画质</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-foreground">可灵使用流程</h3>
            <ol className="list-decimal pl-6 text-sm text-foreground/90 space-y-1.5 leading-relaxed">
              <li>访问 <code className="text-primary bg-muted/50 px-1.5 py-0.5 rounded text-xs font-mono">klingai.kuaishou.com</code>，用快手/手机号登录</li>
              <li>进入&quot;AI 视频&quot;模块，选择&quot;图生视频&quot;</li>
              <li>上传分镜图，在下方文本框填写运动描述（同即梦的动作提示词）</li>
              <li>选择画质（推荐&quot;高质量&quot;模式，虽然慢但效果明显更好）</li>
              <li>点击生成，等待 3-8 分钟</li>
              <li>预览 → 选最佳 → 下载 MP4</li>
            </ol>
          </div>

          <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
            <p className="text-sm font-medium text-foreground mb-1">实战建议</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              日常生产用即梦（性价比高、速度快），关键名场面用可灵（画质拉满）。
              很多 AI 漫剧创作者会两个平台配合使用：即梦做 80% 的普通镜头，可灵做 20% 的高光镜头。
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            Section 4: 从分镜图到视频的完整流程
        ═══════════════════════════════════════════════════════════════ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">
            从分镜图到视频的完整流程
          </h2>
          <p className="text-sm text-foreground/90 leading-relaxed">
            以下是标准的 AI 漫剧视频生成工作流，5 步完成从静态分镜到动态视频的转化：
          </p>

          <div className="space-y-3">
            {[
              {
                step: 1,
                title: "准备分镜图",
                desc: "用分镜 Prompt（参考「分镜与 Prompt」章节）在即梦/MJ 生成 16:9 横屏分镜图。每个镜头生成 4 张，选最满意的一张。确保同一集内角色外貌一致（使用角色参考功能）。",
              },
              {
                step: 2,
                title: "选择图生视频模式",
                desc: "打开即梦/可灵，选择「图生视频」，上传分镜图。如果有角色参考照，在角色参考区域上传，设置强度 0.6-0.8。",
              },
              {
                step: 3,
                title: "添加运动提示词",
                desc: "在文本框填写动作描述，如 'hair flowing in wind, slowly turning head, soft smile forming, camera slowly zooming in'。注意：只描述动态变化，不要重复图片已有的内容（如服装、背景）。",
              },
              {
                step: 4,
                title: "生成 + 筛选",
                desc: "点击生成，等待 2-8 分钟。建议每个镜头生成 4 个候选视频。筛选标准：(1) 动作自然不扭曲 (2) 人脸没有变形 (3) 手指数量正确 (4) 运镜平稳。",
              },
              {
                step: 5,
                title: "下载 + 整理",
                desc: "下载选中的 MP4 文件，按镜头编号命名（如 ep01_shot01.mp4, ep01_shot02.mp4），方便后续在剪映中拼接。建议建立文件夹结构：项目名/集数/镜头号/。",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 items-start rounded-xl border border-border p-4">
                <span className="flex shrink-0 items-center justify-center size-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  {item.step}
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            Section 5: 视频生成技巧
        ═══════════════════════════════════════════════════════════════ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">
            视频生成技巧
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border p-4 space-y-2">
              <p className="text-sm font-semibold text-foreground">1. 控制时长</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                不要一次生成超过 10 秒。5 秒段的质量 &gt; 10 秒段。
                如果需要长镜头，把最后一帧作为下一段的起始图，实现&quot;接力生成&quot;。
              </p>
            </div>
            <div className="rounded-xl border border-border p-4 space-y-2">
              <p className="text-sm font-semibold text-foreground">2. 简化动作</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                走路、转头、微笑 = 安全动作（成功率 80%+）。
                打斗、跳跃、舞蹈 = 高风险动作（成功率 30-50%）。
                如果剧情需要打斗，用快速剪辑 + 特效代替逐帧生成。
              </p>
            </div>
            <div className="rounded-xl border border-border p-4 space-y-2">
              <p className="text-sm font-semibold text-foreground">3. 运镜保持简单</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                一段视频只用一种运镜（推 / 拉 / 摇），不要同时旋转 + 推进 + 仰角变化。
                如果需要复杂运镜，拆成多段分别生成。
              </p>
            </div>
            <div className="rounded-xl border border-border p-4 space-y-2">
              <p className="text-sm font-semibold text-foreground">4. 多候选挑选</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                每个镜头生成 4 个候选，挑最好的。这不是浪费，这是 AI 视频制作的标准流程。
                专业创作者的选用率通常只有 25-30%。
              </p>
            </div>
            <div className="rounded-xl border border-border p-4 space-y-2">
              <p className="text-sm font-semibold text-foreground">5. 首尾帧控制</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                如果平台支持&quot;首帧 + 尾帧&quot;模式（可灵支持），可以上传两张图作为起止画面，
                AI 会自动补间动画。这对镜头衔接非常有用。
              </p>
            </div>
            <div className="rounded-xl border border-border p-4 space-y-2">
              <p className="text-sm font-semibold text-foreground">6. 后期修复</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                视频偶尔出现闪烁、抖动？用剪映的&quot;画面增强&quot;功能或 Topaz Video AI 做后期修复。
                轻微的画面不稳定，加上配音和 BGM 后观众基本不会注意到。
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
            <p className="text-sm font-medium text-foreground mb-1">一集视频的时间成本参考</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs mt-2">
                <thead>
                  <tr className="border-b border-primary/20">
                    <th className="px-3 py-2 text-left font-medium text-foreground">环节</th>
                    <th className="px-3 py-2 text-left font-medium text-foreground">时间</th>
                    <th className="px-3 py-2 text-left font-medium text-foreground">说明</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/10">
                  <tr><td className="px-3 py-2">生成分镜图</td><td className="px-3 py-2 text-muted-foreground">1-2 小时</td><td className="px-3 py-2 text-muted-foreground">20 个镜头，每个生成 4 张选 1 张</td></tr>
                  <tr><td className="px-3 py-2">图生视频</td><td className="px-3 py-2 text-muted-foreground">2-4 小时</td><td className="px-3 py-2 text-muted-foreground">20 段视频，含等待 + 筛选</td></tr>
                  <tr><td className="px-3 py-2">视频筛选整理</td><td className="px-3 py-2 text-muted-foreground">30 分钟</td><td className="px-3 py-2 text-muted-foreground">预览所有候选，选择最佳版本</td></tr>
                  <tr className="font-medium"><td className="px-3 py-2">合计</td><td className="px-3 py-2 text-primary">3.5-6.5 小时</td><td className="px-3 py-2 text-muted-foreground">不含配音和剪辑</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
