export const runtime = "edge";
import { NextResponse } from "next/server";

/* ------------------------------------------------------------------ */
/* Resolve AI credentials                                              */
/* ------------------------------------------------------------------ */

interface ResolvedConfig {
  provider: string;
  apiKey: string;
  baseUrl: string;
  model: string;
}

async function resolveConfig(body: Record<string, unknown>): Promise<ResolvedConfig> {
  const mode = (body.mode as string) || "platform";

  if (mode === "byok" && body.apiKey) {
    const provider = (body.provider as string) || "minimax";
    const apiKey = body.apiKey as string;
    const model = (body.model as string) || "deepseek-chat";

    // Determine base URL: use provided or look up default
    let baseUrl = body.baseUrl as string | undefined;
    if (!baseUrl) {
      const defaults: Record<string, string> = {
        minimax: "https://api.minimaxi.com/v1",
        deepseek: "https://api.deepseek.com/v1",
        openai: "https://api.openai.com/v1",
        anthropic: "https://api.anthropic.com/v1",
        zhipu: "https://open.bigmodel.cn/api/paas/v4",
      };
      baseUrl = defaults[provider] || "https://api.openai.com/v1";
    }

    return { provider, apiKey, baseUrl, model };
  }

  // Platform mode: use server env vars
  // On Cloudflare Pages, secrets are in getRequestContext().env, not process.env
  let cfEnv: Record<string, string> = {};
  try {
    const { getRequestContext } = await import("@cloudflare/next-on-pages");
    cfEnv = getRequestContext().env as unknown as Record<string, string>;
  } catch {
    // Not on Cloudflare, use process.env
  }
  const apiKey = cfEnv.MINIMAX_API_KEY || process.env.MINIMAX_API_KEY || "";
  const baseUrl = cfEnv.MINIMAX_BASE_URL || process.env.MINIMAX_BASE_URL || "https://api.xiaomimimo.com/v1";
  const model = cfEnv.MINIMAX_MODEL || process.env.MINIMAX_MODEL || "mimo-v2.5-pro";

  return { provider: "minimax", apiKey, baseUrl, model };
}

/* ------------------------------------------------------------------ */
/* Build prompts by type                                               */
/* ------------------------------------------------------------------ */

interface PromptPair {
  systemPrompt: string;
  userPrompt: string;
}

function buildPrompts(body: Record<string, unknown>): PromptPair | null {
  const type = body.type as string;

  if (type === "outline") {
    return {
      systemPrompt: `你是一个专业的 AI 漫剧编剧。根据用户提供的故事概要和角色信息，生成一部完整的漫剧故事大纲。

输出要求（纯 JSON）：
{
  "logline": "一句话故事概括",
  "worldSetting": "世界观/背景设定（2-3句话）",
  "mainConflict": "核心矛盾/主线冲突",
  "episodes": [
    {
      "episode": 1,
      "title": "集标题（4-6个字）",
      "coreConflict": "本集核心冲突（一句话）",
      "keyEvents": ["关键事件1", "关键事件2", "关键事件3"],
      "endingHook": "结尾悬念/钩子（一句话）"
    }
  ]
}

要求：
- 集数按用户指定的总集数
- 每集有独立的核心冲突，同时推进主线
- 前3集必须快节奏，建立观众兴趣
- 每集结尾必须有悬念钩住观众
- 整体故事有起承转合
- 只输出纯 JSON，不要任何其他文字`,
      userPrompt: `故事概要：${body.concept || ""}
题材：${body.genre || ""}
总集数：${body.totalEpisodes || 10}
角色：
${body.characters || "（未设定角色）"}

请生成完整的故事大纲（纯 JSON）。`,
    };
  }

  if (type === "script") {
    const outlineContext = body.outline
      ? `\n本集大纲：标题=${(body.outline as Record<string, unknown>).title}，核心冲突=${(body.outline as Record<string, unknown>).coreConflict}，关键事件=${Array.isArray((body.outline as Record<string, unknown>).keyEvents) ? ((body.outline as Record<string, unknown>).keyEvents as string[]).join("、") : ""}，结尾悬念=${(body.outline as Record<string, unknown>).endingHook}`
      : "";
    const prevEpisodeContext = body.previousEnding
      ? `\n上一集结尾：${body.previousEnding}`
      : "";
    return {
      systemPrompt: `你是一个专业的 AI 漫剧编剧。根据用户提供的信息，生成一集结构化的漫剧剧本。

输出要求：
- 输出纯 JSON 数组，不要任何其他文字
- 每集包含 15-20 个镜头
- 每个镜头格式：{"shotNumber": 1, "shotType": "特写|中景|全景|仰拍|俯拍", "scene": "场景", "characters": "角色", "action": "动作", "emotion": "情绪", "dialogue": "台词"}
- 镜头类型要合理交替，不要连续使用同一种
- 前 3 秒（前 1-2 个镜头）必须有钩子
- 每 20 秒左右（每 4-5 个镜头）设置一个小反转或爽点
- 结尾留悬念`,
      userPrompt: `题材：${body.genre}
主角：${body.character}
集数：第 ${body.episode} 集（共 ${body.totalEpisodes} 集）
${body.conflict ? `本集核心冲突：${body.conflict}` : "本集冲突：自由发挥"}${outlineContext}${prevEpisodeContext}

请生成剧本（纯 JSON 数组）：`,
    };
  }

  if (type === "storyboard") {
    const charDescriptions = Object.entries(
      (body.characterPrompts as Record<string, string>) || {}
    )
      .map(([name, prompt]) => `${name}: ${prompt}`)
      .join("\n");

    return {
      systemPrompt: `你是一个专业的 AI 漫剧分镜 prompt 工程师。根据每个镜头的中文描述，生成可直接粘贴到即梦/Midjourney 的英文 prompt。

角色外貌描述：
${charDescriptions || "（无角色描述，请根据场景自行描述）"}

输出要求：
- 输出纯 JSON 数组，不要任何其他文字
- 每个元素格式：{"shotNumber": 1, "prompt": "英文 prompt 文本"}
- prompt 结构：[角色外貌+动作] + [情绪表情] + [镜头类型] + [光线氛围] + [风格]
- 每个 prompt 40-80 个英文单词
- 末尾统一加 "anime style, manga aesthetic, 8k quality"
- 不要用中文`,
      userPrompt: `以下是需要生成 prompt 的镜头列表：
${JSON.stringify(body.shots, null, 2)}

请为每个镜头生成英文 prompt（纯 JSON 数组）：`,
    };
  }

  if (type === "adapt") {
    const outlineContext = body.outline
      ? `\n本集大纲：标题=${(body.outline as Record<string, unknown>).title}，核心冲突=${(body.outline as Record<string, unknown>).coreConflict}，关键事件=${Array.isArray((body.outline as Record<string, unknown>).keyEvents) ? ((body.outline as Record<string, unknown>).keyEvents as string[]).join("、") : ""}，结尾悬念=${(body.outline as Record<string, unknown>).endingHook}`
      : "";
    const prevEpisodeContext = body.previousEnding
      ? `\n上一集结尾：${body.previousEnding}`
      : "";
    return {
      systemPrompt: `你是一个专业的 AI 漫剧改编编剧。将用户提供的文本改编成一集漫剧剧本。保持原文的核心剧情和人物，但重新组织为漫剧镜头格式。

输出要求：
- 输出纯 JSON 数组，不要任何其他文字
- 每集包含 15-20 个镜头
- 每个镜头格式：{"shotNumber": 1, "shotType": "特写|中景|全景|仰拍|俯拍", "scene": "场景", "characters": "角色", "action": "动作", "emotion": "情绪", "dialogue": "台词"}
- 镜头类型要合理交替，不要连续使用同一种
- 前 3 秒（前 1-2 个镜头）必须有钩子
- 每 20 秒左右（每 4-5 个镜头）设置一个小反转或爽点
- 结尾留悬念
- 尽量保留原文的经典台词和关键情节`,
      userPrompt: `以下是需要改编的原文：
${body.sourceText || ""}

改编为第 ${body.episode} 集漫剧剧本（共 ${body.totalEpisodes} 集）。
题材：${body.genre || ""}
角色信息：${body.character || ""}${outlineContext}${prevEpisodeContext}

请改编成漫剧剧本（纯 JSON 数组）：`,
    };
  }

  if (type === "continue") {
    return {
      systemPrompt: `你是一个专业的 AI 漫剧编剧。根据用户提供的已有剧情，续写后续发展。保持角色性格一致，剧情连贯，节奏紧凑。

输出要求：
- 输出纯 JSON 数组（同 script 格式）
- 续写 15-20 个镜头
- 保持角色性格和说话风格一致
- 自然衔接已有剧情
- 加入新的反转或冲突
- 结尾留悬念`,
      userPrompt: `题材：${body.genre}
已有剧情：
${body.existingScript}

请续写后续发展（纯 JSON 数组）：`,
    };
  }

  if (type === "rewrite") {
    return {
      systemPrompt: `你是一个专业的 AI 漫剧编剧。根据用户的改写指令，重新改写提供的剧本片段。保持核心剧情但按指令调整。

输出要求：
- 输出纯 JSON 数组（同 script 格式）
- 按用户指令改写
- 保持镜头数量相近
- 改写后节奏更紧凑`,
      userPrompt: `原始剧本：
${body.originalScript}

改写指令：${body.instruction}

请改写（纯 JSON 数组）：`,
    };
  }

  if (type === "optimize") {
    return {
      systemPrompt: `你是一个 AI 漫剧爽点优化专家。分析用户的剧本，找出节奏平淡的地方，然后优化：加入反转、增强情绪冲击、添加钩子。

输出要求：
- 输出纯 JSON 数组（同 script 格式）
- 保持原有剧情主线不变
- 在关键节点加入爽点/反转
- 前3个镜头必须有强钩子
- 每5个镜头至少一个小高潮
- 结尾悬念要更强`,
      userPrompt: `题材：${body.genre}
原始剧本：
${body.originalScript}

请优化爽点后重新输出（纯 JSON 数组）：`,
    };
  }

  if (type === "polish-dialogue") {
    return {
      systemPrompt: `你是一个对白润色专家。将书面化、生硬的台词改写成自然、口语化、有个性的对白。

要求：
- 每个角色有独特的说话风格
- 台词简短有力，适合短视频节奏
- 加入语气词和口语表达
- 情绪表达要到位
- 输出纯 JSON 数组（同 script 格式，只修改 dialogue 字段）`,
      userPrompt: `角色信息：${body.characters || ""}
原始剧本：
${body.originalScript}

请润色台词后重新输出（纯 JSON 数组）：`,
    };
  }

  if (type === "titles") {
    return {
      systemPrompt: `你是一个爆款短视频标题专家。根据漫剧剧情内容，生成 10 个吸引眼球的标题。

标题要求：
- 包含数字/反差/悬念/情绪中的至少一种
- 15字以内
- 让人忍不住点进去看
- 输出纯 JSON 数组：["标题1", "标题2", ...]`,
      userPrompt: `题材：${body.genre}
第 ${body.episode} 集剧情：
${body.scriptSummary}

请生成 10 个爆款标题（纯 JSON 数组）：`,
    };
  }

  if (type === "cover-prompt") {
    return {
      systemPrompt: `你是一个 AI 漫剧封面设计专家。根据一集的剧情内容，生成一个适合做封面的英文 prompt。

封面要求：
- 1张图概括本集核心画面
- 有视觉冲击力
- 适合 9:16 竖屏
- 画面简洁聚焦
- 输出纯 JSON：{"prompt": "英文prompt", "titleText": "封面上要写的标题文字（中文，6字以内）"}`,
      userPrompt: `题材：${body.genre}
第 ${body.episode} 集剧情摘要：
${body.scriptSummary}

请生成封面 prompt（纯 JSON）：`,
    };
  }

  if (type === "concept") {
    return {
      systemPrompt: `你是一个专业的 AI 漫剧创意总监。根据用户选择的题材和关键词，生成一个引人入胜的漫剧故事概要。

要求：
- 150-300字
- 包含：主角是谁、处境如何、核心冲突是什么、有什么特殊设定（金手指/穿越/系统等）
- 有明确的情感钩子（让人想看下去）
- 适合短视频漫剧形式（节奏快、爽点密集）
- 输出纯文本，不要JSON格式`,
      userPrompt: `题材：${body.genre}
${body.keywords ? `关键词：${body.keywords}` : ""}
${body.existingConcept ? `现有构思（请在此基础上扩展）：${body.existingConcept}` : ""}

请生成一个漫剧故事概要：`,
    };
  }

  if (type === "generate-characters") {
    return {
      systemPrompt: `你是一个专业的 AI 漫剧角色设计师。根据故事概要和题材，设计 3-5 个主要角色。

每个角色要包含：
- name: 中文姓名（2-3个字）
- gender: 男/女
- age: 年龄数字
- role: 主角/配角/反派/路人
- appearance: 详细外貌描述（身材、脸型、眼睛、发型、气质，30-50字）
- clothing: 常穿服装描述（10-20字）
- personality: 性格特点（10-20字）
- relationship: 与主角的关系（10字以内）

要求：
- 必须有 1 个主角、1 个反派、1-3 个配角
- 角色之间要有戏剧冲突关系
- 外貌描述要具体到可以画出来的程度
- 不要模糊描述如"普通""一般"
- 输出纯 JSON 数组`,
      userPrompt: `故事概要：${body.concept}
题材：${body.genre}
总集数：${body.totalEpisodes}

请设计角色（纯 JSON 数组）：`,
    };
  }

  if (type === "extract-characters") {
    return {
      systemPrompt: `分析以下漫剧剧本，提取所有出现的角色。对每个角色输出 JSON：{"name": "姓名", "gender": "男/女", "age": 25, "role": "主角/配角/反派", "appearance": "外貌描述", "clothing": "服装描述"}。输出纯 JSON 数组，不要其他文字。`,
      userPrompt: body.scriptText as string,
    };
  }

  if (type === "test") {
    return {
      systemPrompt: "You are a helpful assistant.",
      userPrompt: "Hi",
    };
  }

  return null;
}

/* ------------------------------------------------------------------ */
/* Call AI provider                                                     */
/* ------------------------------------------------------------------ */

async function callAnthropic(
  config: ResolvedConfig,
  systemPrompt: string,
  userPrompt: string,
  maxTokens: number
): Promise<Response> {
  const response = await fetch(`${config.baseUrl}/messages`, {
    method: "POST",
    headers: {
      "x-api-key": config.apiKey,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: config.model,
      max_tokens: maxTokens,
      messages: [{ role: "user", content: `${systemPrompt}\n\n${userPrompt}` }],
      stream: true,
    }),
  });
  return response;
}

async function callOpenAICompatible(
  config: ResolvedConfig,
  systemPrompt: string,
  userPrompt: string,
  maxTokens: number,
  stream: boolean
): Promise<Response> {
  const response = await fetch(`${config.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: config.model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      stream,
      temperature: 0.7,
      ...(config.model.startsWith("mimo")
        ? { max_completion_tokens: maxTokens, thinking: { type: "disabled" } }
        : { max_tokens: maxTokens }),
    }),
  });
  return response;
}

/* ------------------------------------------------------------------ */
/* Anthropic SSE → OpenAI SSE transformer                              */
/* ------------------------------------------------------------------ */

function transformAnthropicStream(
  anthropicBody: ReadableStream<Uint8Array>
): ReadableStream<Uint8Array> {
  const reader = anthropicBody.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
          return;
        }

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6).trim();
            if (!data) continue;
            try {
              const parsed = JSON.parse(data);
              if (parsed.type === "content_block_delta" && parsed.delta?.text) {
                // Convert to OpenAI SSE format for consistent client parsing
                const openaiChunk = {
                  choices: [{ delta: { content: parsed.delta.text } }],
                };
                controller.enqueue(
                  encoder.encode(`data: ${JSON.stringify(openaiChunk)}\n\n`)
                );
              }
            } catch {
              // Skip unparseable chunks
            }
          }
        }
      }
    },
  });
}

/* ------------------------------------------------------------------ */
/* POST handler                                                        */
/* ------------------------------------------------------------------ */

export async function POST(req: Request) {
  const body = await req.json() as Record<string, unknown>;
  const config = await resolveConfig(body);

  if (!config.apiKey) {
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 }
    );
  }

  const prompts = buildPrompts(body);
  if (!prompts) {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  const { systemPrompt, userPrompt } = prompts;
  const isTest = body.type === "test";
  const maxTokens = isTest ? 10 : 4096;

  try {
    let response: Response;

    if (config.provider === "anthropic") {
      response = await callAnthropic(config, systemPrompt, userPrompt, maxTokens);
    } else {
      response = await callOpenAICompatible(
        config,
        systemPrompt,
        userPrompt,
        maxTokens,
        !isTest
      );
    }

    if (!response.ok) {
      const errorText = await response.text();
      // For test requests, return structured error
      if (isTest) {
        return NextResponse.json(
          { error: `API error: ${response.status}`, details: errorText },
          { status: 200 }
        );
      }
      return NextResponse.json(
        { error: `AI API error: ${response.status}`, details: errorText },
        { status: 502 }
      );
    }

    // Test requests: return simple success
    if (isTest) {
      // Consume the response body
      await response.text();
      return NextResponse.json({ ok: true });
    }

    // Streaming responses
    if (config.provider === "anthropic" && response.body) {
      // Transform Anthropic stream to OpenAI-compatible format
      const transformedStream = transformAnthropicStream(response.body);
      return new Response(transformedStream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }

    // Forward the SSE stream to the client (OpenAI-compatible format)
    return new Response(response.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    if (isTest) {
      return NextResponse.json(
        { error: "Connection failed", details: message },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { error: "Failed to connect to AI API", details: message },
      { status: 502 }
    );
  }
}
