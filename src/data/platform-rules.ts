export interface PlatformRule {
  id: string;
  name: string;
  followerThreshold: string;
  revenueShare: string;
  filingRequired: boolean;
  aiLabelRequired: boolean;
  withdrawalMin: string;
  entryUrl: string;
  notes: string;
}

export const platformRules: PlatformRule[] = [
  {
    id: 'douyin',
    name: '抖音中视频',
    followerThreshold: '1万粉丝',
    revenueShare: '约60元/万次播放（横屏中视频计划）',
    filingRequired: true,
    aiLabelRequired: true,
    withdrawalMin: '¥100',
    entryUrl: 'https://creator.douyin.com',
    notes:
      '2026年抖音对AI生成内容审核趋严，必须在发布时勾选"AI生成"标签。中视频计划要求视频时长≥1分钟、横屏16:9。建议先用竖屏短视频涨粉到1万，再切横屏中视频走收益。单价波动大，情感/知识类单价更高，纯爽文类偏低。',
  },
  {
    id: 'kuaishou',
    name: '快手磁力聚星',
    followerThreshold: '500粉丝',
    revenueShare: '约40元/万次播放',
    filingRequired: true,
    aiLabelRequired: true,
    withdrawalMin: '¥50',
    entryUrl: 'https://www.kuaishou.com/brilliantCreator',
    notes:
      '快手门槛最低，500粉即可开通收益，适合新手冷启动。下沉市场用户多，都市逆袭和玄幻战神题材数据较好。注意快手对搬运和重复内容打击力度大，需保证原创度。光合计划+磁力聚星双重收益叠加，实际收益可能高于基础单价。',
  },
  {
    id: 'bilibili',
    name: 'B站激励',
    followerThreshold: '1000粉丝 + 累计10万播放',
    revenueShare: '约25元/万次播放',
    filingRequired: true,
    aiLabelRequired: true,
    withdrawalMin: '¥100',
    entryUrl: 'https://member.bilibili.com/platform/home',
    notes:
      'B站用户对内容质量要求最高，但粉丝黏性也最强。古风宫斗和校园甜宠在B站表现优异。弹幕互动是B站特色——设计剧情时可以预埋"弹幕梗"提升互动率。激励计划单价偏低，但可叠加充电、花火商单等变现渠道。长线运营价值最大。',
  },
  {
    id: 'hongguo',
    name: '红果短剧',
    followerThreshold: '无粉丝门槛',
    revenueShare: '独家签约90%分成 / 非独家50-70%分成',
    filingRequired: true,
    aiLabelRequired: true,
    withdrawalMin: '¥100',
    entryUrl: 'https://www.hongguo.com',
    notes:
      '红果是目前AI漫剧收益最高的平台之一，独家签约分成比例高达90%。零门槛入驻，按有效播放分成。但2026年起强制要求短剧备案号，未备案作品无法上架。建议走独家拿高分成，但需注意独家期内不能在其他平台发布相同内容。审核周期约1-3个工作日。',
  },
  {
    id: 'huolong',
    name: '腾讯火龙',
    followerThreshold: '无粉丝门槛',
    revenueShare: '独家签约200%系数加成（基础单价×2）',
    filingRequired: true,
    aiLabelRequired: true,
    withdrawalMin: '¥100',
    entryUrl: 'https://huolong.qq.com',
    notes:
      '腾讯火龙（原微视创作者平台）对AI漫剧友好度较高，独家签约200%系数意味着收益翻倍。平台处于拉新期，流量扶持力度大。玄幻战神和商战复仇题材在火龙数据表现突出。注意：腾讯生态内分发（微信视频号联动）是额外加分项。',
  },
  {
    id: 'youku',
    name: '优酷',
    followerThreshold: '无明确粉丝门槛（需通过创作者认证）',
    revenueShare: '独家70%分成 / 非独家50%分成',
    filingRequired: true,
    aiLabelRequired: true,
    withdrawalMin: '¥100',
    entryUrl: 'https://mp.youku.com',
    notes:
      '优酷背靠阿里生态，用户偏好长内容。AI漫剧建议做5-10分钟/集的中长篇，完播率权重高。独家70%分成在长视频平台中算高的。优酷对画质要求严格，建议上传1080P以上。可联动淘宝做IP衍生品变现（周边、课程等）。',
  },
] as const;
