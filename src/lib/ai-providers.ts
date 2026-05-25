export interface AIProvider {
  id: string;
  name: string;
  defaultBaseUrl: string;
  models: { id: string; name: string; description: string }[];
}

export const AI_PROVIDERS: AIProvider[] = [
  {
    id: "mimo",
    name: "小米 MiMo",
    defaultBaseUrl: "https://api.xiaomimimo.com/v1",
    models: [
      { id: "mimo-v2.5-pro", name: "MiMo V2.5 Pro", description: "最新旗舰，推理能力强" },
    ],
  },
  {
    id: "minimax",
    name: "MiniMax",
    defaultBaseUrl: "https://api.minimaxi.com/v1",
    models: [
      { id: "MiniMax-M2.7-highspeed", name: "M2.7 高速版", description: "最新旗舰，速度快" },
      { id: "MiniMax-M2.7", name: "M2.7", description: "最新旗舰，质量最高" },
      { id: "MiniMax-M2.5-highspeed", name: "M2.5 高速版", description: "性价比高" },
    ],
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    defaultBaseUrl: "https://api.deepseek.com/v1",
    models: [
      { id: "deepseek-chat", name: "DeepSeek V3", description: "通用对话" },
      { id: "deepseek-reasoner", name: "DeepSeek R1", description: "深度推理" },
    ],
  },
  {
    id: "openai",
    name: "OpenAI",
    defaultBaseUrl: "https://api.openai.com/v1",
    models: [
      { id: "gpt-4o", name: "GPT-4o", description: "最强通用模型" },
      { id: "gpt-4o-mini", name: "GPT-4o Mini", description: "性价比高" },
    ],
  },
  {
    id: "anthropic",
    name: "Claude (Anthropic)",
    defaultBaseUrl: "https://api.anthropic.com/v1",
    models: [
      { id: "claude-sonnet-4-6", name: "Claude Sonnet 4.6", description: "速度与质量平衡" },
      { id: "claude-haiku-4-5", name: "Claude Haiku 4.5", description: "最快最便宜" },
    ],
  },
  {
    id: "zhipu",
    name: "智谱 AI",
    defaultBaseUrl: "https://open.bigmodel.cn/api/paas/v4",
    models: [
      { id: "glm-4-flash", name: "GLM-4 Flash", description: "免费额度大" },
      { id: "glm-4-plus", name: "GLM-4 Plus", description: "高质量" },
    ],
  },
];

export interface AISettings {
  provider: string;
  model: string;
  apiKey: string;
  baseUrl?: string;
  mode: "platform" | "byok";
}

const SETTINGS_KEY = "manga-ai-settings";

export function loadAISettings(): AISettings {
  if (typeof window === "undefined") {
    return { provider: "mimo", model: "mimo-v2.5-pro", apiKey: "", mode: "platform" };
  }
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore parse errors
  }
  return { provider: "minimax", model: "MiniMax-M2.7-highspeed", apiKey: "", mode: "platform" };
}

export function saveAISettings(settings: AISettings): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function getProviderById(id: string): AIProvider | undefined {
  return AI_PROVIDERS.find((p) => p.id === id);
}
