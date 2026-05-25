import { Headphones } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";

export const metadata = { title: "配音与音效" };

export default function AudioPage() {
  return (
    <DashboardLayout>
      <div className="space-y-10">
        {/* ────────── Header ────────── */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground tracking-tight sm:text-3xl flex items-center gap-2">
            <Headphones className="size-6 text-primary" /> 配音、BGM 与音效
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
            AI 漫剧的灵魂不只在画面，更在声音。配音赋予角色生命，BGM 传递情绪，音效增加沉浸感。
            本章从工具选择到实操流程，手把手教你搞定声音层。
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            Section 1: 配音工具对比
        ═══════════════════════════════════════════════════════════════ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">
            配音工具对比
          </h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="px-4 py-3 text-left font-semibold text-foreground">工具</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">价格</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">中文效果</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">免费额度</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">特点</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-xs">
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">豆包 TTS</td>
                  <td className="px-4 py-3 text-muted-foreground">免费</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-0.5">
                      {[1,2,3,4].map(i => <span key={i} className="text-amber-500">{"★"}</span>)}
                      <span className="text-muted-foreground/30">{"★"}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">无限制</td>
                  <td className="px-4 py-3 text-muted-foreground">日常配音首选，音色丰富，在线生成秒出</td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors bg-primary/5">
                  <td className="px-4 py-3 font-medium text-primary">讯飞配音</td>
                  <td className="px-4 py-3 text-muted-foreground">¥30/月起</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(i => <span key={i} className="text-amber-500">{"★"}</span>)}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">3000 字/天</td>
                  <td className="px-4 py-3 text-muted-foreground">专业旁白最佳，情感表达细腻，商用授权</td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">Fish Audio</td>
                  <td className="px-4 py-3 text-muted-foreground">~$1/1000 字符</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-0.5">
                      {[1,2,3].map(i => <span key={i} className="text-amber-500">{"★"}</span>)}
                      {[4,5].map(i => <span key={i} className="text-muted-foreground/30">{"★"}</span>)}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">1 万字符/月</td>
                  <td className="px-4 py-3 text-muted-foreground">声线克隆（上传一段音频就能克隆），适合自定义角色音</td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">CosyVoice 2</td>
                  <td className="px-4 py-3 text-muted-foreground">开源免费</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-0.5">
                      {[1,2,3,4].map(i => <span key={i} className="text-amber-500">{"★"}</span>)}
                      <span className="text-muted-foreground/30">{"★"}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">无限（本地运行）</td>
                  <td className="px-4 py-3 text-muted-foreground">阿里开源，需本地部署 GPU，效果逼近商用</td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">MiniMax T2A</td>
                  <td className="px-4 py-3 text-muted-foreground">按量计费</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-0.5">
                      {[1,2,3,4].map(i => <span key={i} className="text-amber-500">{"★"}</span>)}
                      <span className="text-muted-foreground/30">{"★"}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">新用户赠送额度</td>
                  <td className="px-4 py-3 text-muted-foreground">API 调用，情感控制好，支持 SSML 标签精细控制</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
            <p className="text-sm font-medium text-foreground mb-1">推荐组合</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>新手起步：</strong>豆包 TTS（免费，音色多，足够做前几集试水）。<br />
              <strong>稳定出品：</strong>讯飞配音做旁白 + 豆包做对话（性价比最高的组合）。<br />
              <strong>自定义需求：</strong>Fish Audio 克隆特定声线，或 CosyVoice 2 本地部署无限用。
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            Section 2: 角色音色选择指南
        ═══════════════════════════════════════════════════════════════ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">
            角色音色选择指南
          </h2>
          <p className="text-sm text-foreground/90 leading-relaxed">
            不同角色类型对应不同的音色特征。选对了音色，角色立刻有了生命力；选错了，观众出戏。
          </p>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="px-4 py-3 text-left font-semibold text-foreground">角色类型</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">推荐音色特征</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">推荐工具 / 音色名</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-xs">
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">霸总男主</td>
                  <td className="px-4 py-3 text-muted-foreground">低沉、沉稳、有磁性</td>
                  <td className="px-4 py-3 text-muted-foreground">豆包-&quot;浩然&quot; / 讯飞-&quot;商务男声&quot;</td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">温柔女主</td>
                  <td className="px-4 py-3 text-muted-foreground">轻柔、甜美、有亲和力</td>
                  <td className="px-4 py-3 text-muted-foreground">豆包-&quot;晓晓&quot; / 讯飞-&quot;柔美女声&quot;</td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">反派</td>
                  <td className="px-4 py-3 text-muted-foreground">阴沉、冷酷、有压迫感</td>
                  <td className="px-4 py-3 text-muted-foreground">讯飞-&quot;沉稳男声&quot;（语速放慢 10%）</td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">旁白</td>
                  <td className="px-4 py-3 text-muted-foreground">清晰、中性、有故事感</td>
                  <td className="px-4 py-3 text-muted-foreground">讯飞-&quot;纪录片男声&quot; / 豆包-&quot;云健&quot;</td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">少年热血</td>
                  <td className="px-4 py-3 text-muted-foreground">清亮、有朝气、语速偏快</td>
                  <td className="px-4 py-3 text-muted-foreground">豆包-&quot;云扬&quot; / 讯飞-&quot;活力男声&quot;</td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">古风角色</td>
                  <td className="px-4 py-3 text-muted-foreground">温润、古典、吐字清晰</td>
                  <td className="px-4 py-3 text-muted-foreground">Fish Audio 自定义克隆 / 讯飞-&quot;古风男/女声&quot;</td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">御姐 / 强势女性</td>
                  <td className="px-4 py-3 text-muted-foreground">低沉、干练、有气场</td>
                  <td className="px-4 py-3 text-muted-foreground">豆包-&quot;晓梦&quot; / 讯飞-&quot;知性女声&quot;</td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">搞笑配角</td>
                  <td className="px-4 py-3 text-muted-foreground">夸张、有喜感、语调多变</td>
                  <td className="px-4 py-3 text-muted-foreground">豆包-&quot;欢乐哥&quot; / 自定义调高语速+音调</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
            <p className="text-xs text-amber-900 leading-relaxed">
              <strong>重要：</strong>选定每个角色的音色后，整部剧保持不变。
              中途换声音等于换演员，观众会混乱。建议在制作第一集前就确定好所有角色的音色配置表。
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            Section 3: BGM 选择
        ═══════════════════════════════════════════════════════════════ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">
            BGM 选择
          </h2>
          <p className="text-sm text-foreground/90 leading-relaxed">
            BGM 是&quot;情绪底色&quot;。对的 BGM 让观众不知不觉代入情绪，错的 BGM 让人出戏。
            按情绪分类推荐如下：
          </p>

          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="px-4 py-3 text-left font-semibold text-foreground">情绪</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">推荐曲风</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">免费来源</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">搜索关键词</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-xs">
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">燃 / 热血</td>
                  <td className="px-4 py-3 text-muted-foreground">电子摇滚、管弦乐、史诗交响</td>
                  <td className="px-4 py-3 text-muted-foreground">Pixabay / Suno 生成</td>
                  <td className="px-4 py-3 font-mono text-primary">epic orchestral, action rock, intense</td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">虐 / 悲伤</td>
                  <td className="px-4 py-3 text-muted-foreground">钢琴独奏、弦乐四重奏</td>
                  <td className="px-4 py-3 text-muted-foreground">Pixabay / Suno</td>
                  <td className="px-4 py-3 font-mono text-primary">sad piano, melancholic strings, emotional</td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">甜 / 温馨</td>
                  <td className="px-4 py-3 text-muted-foreground">轻快吉他、温暖钢琴、ukulele</td>
                  <td className="px-4 py-3 text-muted-foreground">Pixabay / Suno</td>
                  <td className="px-4 py-3 font-mono text-primary">sweet guitar, warm piano, happy ukulele</td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">悬疑 / 紧张</td>
                  <td className="px-4 py-3 text-muted-foreground">电子 ambient、低频嗡鸣</td>
                  <td className="px-4 py-3 text-muted-foreground">Pixabay / Suno</td>
                  <td className="px-4 py-3 font-mono text-primary">dark ambient, suspense, tension drone</td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">日常 / 轻松</td>
                  <td className="px-4 py-3 text-muted-foreground">轻爵士、lo-fi、轻快节奏</td>
                  <td className="px-4 py-3 text-muted-foreground">Pixabay / Suno</td>
                  <td className="px-4 py-3 font-mono text-primary">lofi chill, light jazz, casual background</td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">古风 / 仙侠</td>
                  <td className="px-4 py-3 text-muted-foreground">古筝、笛子、琵琶、空灵人声</td>
                  <td className="px-4 py-3 text-muted-foreground">Pixabay / Suno / 爱给网</td>
                  <td className="px-4 py-3 font-mono text-primary">Chinese traditional, guzheng, bamboo flute</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Suno 生成 BGM */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-foreground">用 Suno 生成自定义 BGM</h3>
            <p className="text-sm text-foreground/90 leading-relaxed">
              找不到合适的免费 BGM？用 Suno AI 自己生成。Suno 可以根据文字描述生成完整音乐，每月有免费额度。
            </p>
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Prompt 写法示例：</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-border p-3 space-y-1">
                  <p className="text-xs font-medium text-foreground">悲伤钢琴 BGM</p>
                  <code className="block text-xs bg-muted/50 rounded p-2 text-primary font-mono leading-relaxed">
                    Melancholic piano solo, slow tempo, minor key, emotional and cinematic, no vocals, 120 seconds
                  </code>
                </div>
                <div className="rounded-lg border border-border p-3 space-y-1">
                  <p className="text-xs font-medium text-foreground">热血战斗 BGM</p>
                  <code className="block text-xs bg-muted/50 rounded p-2 text-primary font-mono leading-relaxed">
                    Epic orchestral battle music, fast tempo, drums and strings, intense and powerful, no vocals, 90 seconds
                  </code>
                </div>
                <div className="rounded-lg border border-border p-3 space-y-1">
                  <p className="text-xs font-medium text-foreground">温馨日常 BGM</p>
                  <code className="block text-xs bg-muted/50 rounded p-2 text-primary font-mono leading-relaxed">
                    Light acoustic guitar with soft piano, warm and cozy, moderate tempo, no vocals, background music, 120 seconds
                  </code>
                </div>
                <div className="rounded-lg border border-border p-3 space-y-1">
                  <p className="text-xs font-medium text-foreground">古风 BGM</p>
                  <code className="block text-xs bg-muted/50 rounded p-2 text-primary font-mono leading-relaxed">
                    Traditional Chinese guzheng with bamboo flute, ethereal and peaceful, slow tempo, no vocals, 120 seconds
                  </code>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Suno 推荐参数：选&quot;Instrumental&quot;模式（纯音乐无人声），时长 2 分钟以上可循环使用。每首生成 2 个版本，挑节奏稳定的那个。
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            Section 4: 音效素材
        ═══════════════════════════════════════════════════════════════ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">
            音效素材
          </h2>
          <p className="text-sm text-foreground/90 leading-relaxed">
            音效是画面的&quot;点睛之笔&quot;。一个恰到好处的&quot;啪&quot;声配合打脸画面，效果提升 10 倍。
            以下是 AI 漫剧中最高频使用的 30 个音效场景：
          </p>

          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="px-3 py-3 text-left font-semibold text-foreground w-8">#</th>
                  <th className="px-3 py-3 text-left font-semibold text-foreground">场景</th>
                  <th className="px-3 py-3 text-left font-semibold text-foreground">音效描述</th>
                  <th className="px-3 py-3 text-left font-semibold text-foreground">免费来源</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-xs">
                <tr><td className="px-3 py-2">1</td><td className="px-3 py-2 font-medium">打脸</td><td className="px-3 py-2 text-muted-foreground">清脆的&quot;啪&quot;一声巴掌</td><td className="px-3 py-2 text-muted-foreground">爱给网 / Freesound</td></tr>
                <tr><td className="px-3 py-2">2</td><td className="px-3 py-2 font-medium">震惊</td><td className="px-3 py-2 text-muted-foreground">玻璃碎裂 / 雷声 / &quot;叮&quot;的一声</td><td className="px-3 py-2 text-muted-foreground">爱给网 / Freesound</td></tr>
                <tr><td className="px-3 py-2">3</td><td className="px-3 py-2 font-medium">推门</td><td className="px-3 py-2 text-muted-foreground">吱呀开门声 / 沉重关门声</td><td className="px-3 py-2 text-muted-foreground">Freesound</td></tr>
                <tr><td className="px-3 py-2">4</td><td className="px-3 py-2 font-medium">脚步</td><td className="px-3 py-2 text-muted-foreground">高跟鞋 / 皮鞋 / 拖鞋走路声</td><td className="px-3 py-2 text-muted-foreground">Freesound</td></tr>
                <tr><td className="px-3 py-2">5</td><td className="px-3 py-2 font-medium">心跳</td><td className="px-3 py-2 text-muted-foreground">砰砰心跳，从慢到快</td><td className="px-3 py-2 text-muted-foreground">Freesound / Pixabay</td></tr>
                <tr><td className="px-3 py-2">6</td><td className="px-3 py-2 font-medium">手机震动 / 来电</td><td className="px-3 py-2 text-muted-foreground">手机铃声、震动嗡嗡声</td><td className="px-3 py-2 text-muted-foreground">Freesound</td></tr>
                <tr><td className="px-3 py-2">7</td><td className="px-3 py-2 font-medium">雨声</td><td className="px-3 py-2 text-muted-foreground">小雨淅沥 / 大雨倾盆 / 雷阵雨</td><td className="px-3 py-2 text-muted-foreground">Freesound / Pixabay</td></tr>
                <tr><td className="px-3 py-2">8</td><td className="px-3 py-2 font-medium">风声</td><td className="px-3 py-2 text-muted-foreground">微风 / 狂风呼啸</td><td className="px-3 py-2 text-muted-foreground">Freesound</td></tr>
                <tr><td className="px-3 py-2">9</td><td className="px-3 py-2 font-medium">杯子/碗碎</td><td className="px-3 py-2 text-muted-foreground">陶瓷摔碎声</td><td className="px-3 py-2 text-muted-foreground">Freesound</td></tr>
                <tr><td className="px-3 py-2">10</td><td className="px-3 py-2 font-medium">拍桌子</td><td className="px-3 py-2 text-muted-foreground">用力拍桌子的&quot;砰&quot;声</td><td className="px-3 py-2 text-muted-foreground">Freesound</td></tr>
                <tr><td className="px-3 py-2">11</td><td className="px-3 py-2 font-medium">车门</td><td className="px-3 py-2 text-muted-foreground">汽车开门 / 关门声</td><td className="px-3 py-2 text-muted-foreground">Freesound</td></tr>
                <tr><td className="px-3 py-2">12</td><td className="px-3 py-2 font-medium">引擎声</td><td className="px-3 py-2 text-muted-foreground">跑车引擎启动 / 开走</td><td className="px-3 py-2 text-muted-foreground">Freesound</td></tr>
                <tr><td className="px-3 py-2">13</td><td className="px-3 py-2 font-medium">人群嘈杂</td><td className="px-3 py-2 text-muted-foreground">餐厅 / 办公室背景人声</td><td className="px-3 py-2 text-muted-foreground">Freesound / Pixabay</td></tr>
                <tr><td className="px-3 py-2">14</td><td className="px-3 py-2 font-medium">鼓掌</td><td className="px-3 py-2 text-muted-foreground">掌声 / 欢呼声</td><td className="px-3 py-2 text-muted-foreground">Freesound</td></tr>
                <tr><td className="px-3 py-2">15</td><td className="px-3 py-2 font-medium">键盘打字</td><td className="px-3 py-2 text-muted-foreground">快速打字声 / 单击回车</td><td className="px-3 py-2 text-muted-foreground">Freesound</td></tr>
                <tr><td className="px-3 py-2">16</td><td className="px-3 py-2 font-medium">翻页/信封</td><td className="px-3 py-2 text-muted-foreground">纸张翻动声 / 拆信封</td><td className="px-3 py-2 text-muted-foreground">Freesound</td></tr>
                <tr><td className="px-3 py-2">17</td><td className="px-3 py-2 font-medium">倒水</td><td className="px-3 py-2 text-muted-foreground">水流入杯中</td><td className="px-3 py-2 text-muted-foreground">Freesound</td></tr>
                <tr><td className="px-3 py-2">18</td><td className="px-3 py-2 font-medium">电梯</td><td className="px-3 py-2 text-muted-foreground">电梯&quot;叮&quot;声 / 门开关</td><td className="px-3 py-2 text-muted-foreground">Freesound</td></tr>
                <tr><td className="px-3 py-2">19</td><td className="px-3 py-2 font-medium">哭泣</td><td className="px-3 py-2 text-muted-foreground">抽泣声 / 啜泣声（用 TTS 单独生成也行）</td><td className="px-3 py-2 text-muted-foreground">Freesound</td></tr>
                <tr><td className="px-3 py-2">20</td><td className="px-3 py-2 font-medium">笑声</td><td className="px-3 py-2 text-muted-foreground">轻笑 / 大笑 / 嘲讽冷笑</td><td className="px-3 py-2 text-muted-foreground">Freesound</td></tr>
                <tr><td className="px-3 py-2">21</td><td className="px-3 py-2 font-medium">叹气</td><td className="px-3 py-2 text-muted-foreground">深深叹息一声</td><td className="px-3 py-2 text-muted-foreground">Freesound</td></tr>
                <tr><td className="px-3 py-2">22</td><td className="px-3 py-2 font-medium">拳头握紧</td><td className="px-3 py-2 text-muted-foreground">骨节咔咔声（可用衣服褶皱声代替）</td><td className="px-3 py-2 text-muted-foreground">Freesound</td></tr>
                <tr><td className="px-3 py-2">23</td><td className="px-3 py-2 font-medium">刀剑出鞘</td><td className="px-3 py-2 text-muted-foreground">金属摩擦声 / 拔剑声</td><td className="px-3 py-2 text-muted-foreground">Freesound / 爱给网</td></tr>
                <tr><td className="px-3 py-2">24</td><td className="px-3 py-2 font-medium">爆炸</td><td className="px-3 py-2 text-muted-foreground">爆炸轰鸣声</td><td className="px-3 py-2 text-muted-foreground">Freesound / Pixabay</td></tr>
                <tr><td className="px-3 py-2">25</td><td className="px-3 py-2 font-medium">门铃</td><td className="px-3 py-2 text-muted-foreground">&quot;叮咚&quot;门铃声</td><td className="px-3 py-2 text-muted-foreground">Freesound</td></tr>
                <tr><td className="px-3 py-2">26</td><td className="px-3 py-2 font-medium">闹钟</td><td className="px-3 py-2 text-muted-foreground">清晨闹钟响 / 手机闹铃</td><td className="px-3 py-2 text-muted-foreground">Freesound</td></tr>
                <tr><td className="px-3 py-2">27</td><td className="px-3 py-2 font-medium">转场音效</td><td className="px-3 py-2 text-muted-foreground">&quot;嗖&quot;的快速过渡音 / &quot;whoosh&quot;</td><td className="px-3 py-2 text-muted-foreground">Freesound / Pixabay</td></tr>
                <tr><td className="px-3 py-2">28</td><td className="px-3 py-2 font-medium">回忆闪回</td><td className="px-3 py-2 text-muted-foreground">梦幻回声效果 / 时钟倒转声</td><td className="px-3 py-2 text-muted-foreground">Freesound</td></tr>
                <tr><td className="px-3 py-2">29</td><td className="px-3 py-2 font-medium">鸟鸣</td><td className="px-3 py-2 text-muted-foreground">清晨鸟叫声（户外场景环境音）</td><td className="px-3 py-2 text-muted-foreground">Freesound / Pixabay</td></tr>
                <tr><td className="px-3 py-2">30</td><td className="px-3 py-2 font-medium">城市街道</td><td className="px-3 py-2 text-muted-foreground">车辆经过、喇叭声、行人（都市环境音）</td><td className="px-3 py-2 text-muted-foreground">Freesound / Pixabay</td></tr>
              </tbody>
            </table>
          </div>

          <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
            <p className="text-sm font-medium text-foreground mb-1">音效素材网站速查</p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p><strong>Freesound.org</strong> —— 全球最大的免费音效库，需注册，CC 协议（注意选 CC0 的可商用）</p>
              <p><strong>Pixabay.com/sound-effects</strong> —— 免费商用，无需署名，数量较少但质量高</p>
              <p><strong>爱给网 (aigei.com)</strong> —— 中文音效库，有大量中文场景音效，部分需付费</p>
              <p><strong>剪映自带音效库</strong> —— 在剪映编辑器内搜索音效，方便但种类有限</p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            Section 5: 音量平衡黄金法则
        ═══════════════════════════════════════════════════════════════ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">
            音量平衡黄金法则
          </h2>
          <p className="text-sm text-foreground/90 leading-relaxed">
            声音层次的核心原则：<strong>人声 &gt; 音效 &gt; BGM &gt; 环境音</strong>。
            观众首先要听清台词，其次感受音效冲击，再然后才是 BGM 和环境氛围。
          </p>

          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="px-4 py-3 text-left font-semibold text-foreground">声音层</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">推荐音量</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">在剪映中的设置</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">说明</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-xs">
                <tr className="bg-primary/5">
                  <td className="px-4 py-3 font-medium text-primary">人声（配音）</td>
                  <td className="px-4 py-3 font-semibold">-6dB 到 -3dB</td>
                  <td className="px-4 py-3 text-muted-foreground">音量滑块 80-100%</td>
                  <td className="px-4 py-3 text-muted-foreground">最大声，必须清晰可辨</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-foreground">音效</td>
                  <td className="px-4 py-3 font-semibold">-12dB 到 -8dB</td>
                  <td className="px-4 py-3 text-muted-foreground">音量滑块 40-60%</td>
                  <td className="px-4 py-3 text-muted-foreground">明显可闻但不压过人声</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-foreground">BGM</td>
                  <td className="px-4 py-3 font-semibold">-18dB 到 -20dB</td>
                  <td className="px-4 py-3 text-muted-foreground">音量滑块 15-25%</td>
                  <td className="px-4 py-3 text-muted-foreground">能感受到但不干扰台词</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-foreground">环境音</td>
                  <td className="px-4 py-3 font-semibold">-24dB 到 -18dB</td>
                  <td className="px-4 py-3 text-muted-foreground">音量滑块 10-20%</td>
                  <td className="px-4 py-3 text-muted-foreground">若有若无地增加沉浸感</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-border p-4 space-y-2">
              <p className="text-sm font-semibold text-foreground">有人声对话时</p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
                <li>BGM 自动降到 15-20%（剪映可设&quot;闪避&quot;自动降低）</li>
                <li>音效如打脸、摔杯可以短暂超过人声音量</li>
                <li>环境音保持最低，避免喧宾夺主</li>
              </ul>
            </div>
            <div className="rounded-lg border border-border p-4 space-y-2">
              <p className="text-sm font-semibold text-foreground">无对话的纯画面段</p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
                <li>BGM 可以提升到 30-40%，成为情绪主导</li>
                <li>环境音可以提升增加氛围</li>
                <li>典型场景：雨中独行、夕阳回忆、城市空镜</li>
              </ul>
            </div>
          </div>

          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
            <p className="text-xs text-amber-900 leading-relaxed">
              <strong>剪映&quot;音频闪避&quot;功能：</strong>选中 BGM 轨道 → 右键 → 音频闪避 → 设置闪避量 -6dB 到 -10dB。
              这样当配音轨有声音时，BGM 会自动降低，配音停止时 BGM 自动恢复。这是最省事的混音方式。
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            Section 6: 配音实操流程
        ═══════════════════════════════════════════════════════════════ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">
            配音实操流程
          </h2>
          <p className="text-sm text-foreground/90 leading-relaxed">
            以下是从剧本台词到成品音频的完整工作流：
          </p>

          <div className="space-y-3">
            {[
              {
                step: 1,
                title: "按角色分组台词",
                desc: "把剧本中的台词提取出来，按角色分组。例如：男主台词 20 句、女主台词 15 句、旁白 10 句、反派 5 句。每个角色的台词整理成一个文档，方便批量生成。",
              },
              {
                step: 2,
                title: "为每个角色选定音色",
                desc: "参考「角色音色选择指南」，在 TTS 工具中试听不同音色，选择最匹配角色气质的。建议制作一张「角色-音色对照表」，记录每个角色使用的工具和音色名。",
              },
              {
                step: 3,
                title: "在 TTS 工具中生成",
                desc: "将台词逐句输入 TTS 工具，调整语速（通常 0.9-1.1 倍速）、语调（情绪激动的台词可以调高）。注意标点符号会影响停顿：逗号短停，句号长停，省略号拉长。",
              },
              {
                step: 4,
                title: "导出音频文件",
                desc: "导出格式选 .wav（无损质量最好）或 .mp3（文件小，质量够用）。采样率选 44100Hz 或 48000Hz。命名规则：角色名_序号_台词摘要.wav，如 male_01_你好.wav。",
              },
              {
                step: 5,
                title: "在剪映中导入配音",
                desc: "打开剪映 → 导入所有音频文件 → 拖到音频轨（配音轨）→ 按镜头时间线逐条对齐。技巧：先放好视频段，再根据口型（虽然是动画但节奏要对）放配音。",
              },
              {
                step: 6,
                title: "调整音量和时间对齐",
                desc: "配音放到 80-100% 音量 → BGM 放到 15-25% → 音效逐个对准画面（打脸声对上巴掌画面等）。最后整体试听 2-3 遍，确保没有声音断层或音量突变。",
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

          <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
            <p className="text-sm font-medium text-foreground mb-2">TTS 配音小技巧</p>
            <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-4 leading-relaxed">
              <li>同一句台词生成 2-3 次，挑语气最自然的。TTS 每次生成有微小差异。</li>
              <li>感叹句/问句在句尾加&quot;！&quot;或&quot;？&quot;，TTS 会自动调整语调上扬。</li>
              <li>台词之间需要停顿？在两句之间加&quot;......&quot;（省略号），TTS 会插入自然停顿。</li>
              <li>角色说话速度不同：霸总慢而沉稳（0.85x），少年快而有力（1.1x），旁白中速从容（1.0x）。</li>
              <li>避免一大段台词连续生成，拆成单句/双句效果更好，也方便后期调整。</li>
              <li>如果某句 TTS 怎么都读不自然，试试改写台词——有时候换个说法就好了。</li>
            </ul>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
