export interface ParameterRow {
  name: string;
  jimeng: string;
  midjourney: string;
  comfyui: string;
  riskLevel: 'safe' | 'caution' | 'danger';
  notes: string;
}

export const parameters: ParameterRow[] = [
  {
    name: '分辨率',
    jimeng: '1024×1024（默认）或 1280×720（横屏视频）',
    midjourney: '--ar 16:9 --quality 1（横屏）或 --ar 9:16（竖屏）',
    comfyui: '1280×720 或 1024×576（横屏）；配合 Hires Fix 2倍放大',
    riskLevel: 'safe',
    notes: '分辨率可以根据平台要求自由调整。横屏中视频用16:9，竖屏短视频用9:16。',
  },
  {
    name: 'CFG Scale',
    jimeng: '不可调（平台内置优化）',
    midjourney: '不可调（由 --stylize 间接控制）',
    comfyui: '推荐7-8；角色一致性场景用6-7',
    riskLevel: 'caution',
    notes: 'CFG过高（>12）画面会过度饱和、出现伪影；过低（<4）角色特征容易丢失。保持7-8是最安全的选择。',
  },
  {
    name: '采样步数',
    jimeng: '不可调（平台自动优化）',
    midjourney: '不可调（平台自动优化）',
    comfyui: '推荐25-35步；角色参考场景用30步',
    riskLevel: 'caution',
    notes: '步数越多细节越好但速度越慢。低于20步角色面部容易崩；超过40步收益递减、浪费算力。',
  },
  {
    name: '采样器',
    jimeng: '不可调',
    midjourney: '不可调',
    comfyui: '推荐 DPM++ 2M Karras（速度与质量平衡）；写实风用 Euler a',
    riskLevel: 'danger',
    notes: '更换采样器会显著改变画面风格和角色外观。一旦选定采样器，整部剧不要更换，否则角色一致性会崩。',
  },
  {
    name: 'LoRA权重',
    jimeng: '角色参考强度：0.6-0.8（平台滑块）',
    midjourney: '--cref URL --cw 80-100（角色参考权重）',
    comfyui: '推荐0.6-0.8；多LoRA叠加时单个不超过0.5',
    riskLevel: 'danger',
    notes: 'LoRA权重是角色一致性的核心参数。权重太低角色不像，太高画面僵硬。建议先用0.7测试，再微调±0.1。多LoRA叠加总权重不要超过1.2。',
  },
  {
    name: '种子策略',
    jimeng: '锁定种子（相同场景复用种子值）',
    midjourney: '--seed 固定值（同场景同种子）',
    comfyui: '固定种子；仅在需要变化时用随机种子',
    riskLevel: 'danger',
    notes: '种子是保持角色一致性的关键手段。同一角色同一场景务必锁定种子。换场景时可以换种子，但建议记录每个种子值备查。',
  },
  {
    name: '去噪强度',
    jimeng: '图生图模式：0.3-0.5（保持原图结构）',
    midjourney: '通过 --iw 控制（0.5-2.0，推荐1.0-1.5）',
    comfyui: '图生图推荐0.3-0.5；角色参考用0.2-0.4',
    riskLevel: 'caution',
    notes: '去噪强度控制"在原图基础上改多少"。值越大改变越大——角色一致性场景建议0.3-0.4，只调姿势不改脸。',
  },
  {
    name: '风格权重',
    jimeng: '风格参考强度：0.5-0.7',
    midjourney: '--stylize 100-250（默认100）；--sref URL --sw 50-100',
    comfyui: '风格LoRA权重0.4-0.6；IP-Adapter风格强度0.5-0.7',
    riskLevel: 'caution',
    notes: '风格权重决定画面的艺术风格统一度。整部剧应保持同一风格——开工前先出3-5张测试图确认风格，记录参数后全剧复用。',
  },
  {
    name: '角色参考权重',
    jimeng: '角色参考强度：0.7-0.85（推荐0.8）',
    midjourney: '--cw 80-100（推荐90）',
    comfyui: 'IP-Adapter权重0.7-0.85；FaceID权重0.8-0.9',
    riskLevel: 'danger',
    notes: '这是整套参数中最重要的一个。角色参考权重直接决定"角色像不像"。太低脸会变，太高姿势会僵。推荐从0.8开始微调。',
  },
] as const;

export interface SceneHitRate {
  scene: string;
  hitRate: string;
  tips: string;
}

export const sceneHitRates: SceneHitRate[] = [
  {
    scene: '对话场景',
    hitRate: '90%+',
    tips: '最稳定的场景类型。两人面对面/并排站立、表情清晰、背景简洁。提示词写清楚人物位置关系（left/right）和表情即可。建议作为每集的主力镜头类型，占比50-60%。',
  },
  {
    scene: '动作场景',
    hitRate: '60-70%',
    tips: '需要多次生成筛选。技巧：把复杂动作拆成"动作前"和"动作后"两张静态图，用剪辑转场连接。避免多人同时动作——AI很难处理。单人动作+速度线/特效更容易出好图。',
  },
  {
    scene: '群像场景',
    hitRate: '40-50%',
    tips: '废图率最高的类型。超过3个角色时一致性会大幅下降。解决方案：分别出单人图，用PS/剪映手动合成；或用ComfyUI的区域控制（Regional Prompting）分区生成。',
  },
  {
    scene: '特写场景',
    hitRate: '85%+',
    tips: '仅次于对话场景的高命中率类型。面部特写、手部特写、物品特写都很稳定。用于表现角色情绪变化的关键时刻——眼神、泪水、微笑等。提示词加上 "close-up, detailed face" 即可。',
  },
  {
    scene: '远景场景',
    hitRate: '75-80%',
    tips: '用于建立场景氛围——城市天际线、古代宫殿全景、战场鸟瞰等。角色占画面比例小，一致性压力低。适合用作每集的开场建立镜头和场景转换过渡。提示词重点描述环境和光影。',
  },
] as const;
