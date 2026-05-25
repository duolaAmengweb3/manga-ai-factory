export const runtime = "edge";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json() as Record<string, unknown>;

  let cfEnv: Record<string, string> = {};
  try {
    const { getRequestContext } = await import("@cloudflare/next-on-pages");
    cfEnv = getRequestContext().env as unknown as Record<string, string>;
  } catch { /* not on CF */ }

  const apiKey = cfEnv.MINIMAX_API_KEY || process.env.MINIMAX_API_KEY;
  const baseUrl = cfEnv.MINIMAX_BASE_URL || process.env.MINIMAX_BASE_URL || "https://api.xiaomimimo.com/v1";
  const model = cfEnv.MINIMAX_MODEL || process.env.MINIMAX_MODEL || "mimo-v2.5-pro";

  if (!apiKey) {
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 }
    );
  }

  const script = body.script;
  if (!script || typeof script !== "string") {
    return NextResponse.json(
      { error: "Missing script text" },
      { status: 400 }
    );
  }

  const systemPrompt = `分析以下漫剧剧本，提取所有出现的角色。对每个角色输出：name, gender(男/女/其他), age(数字估计), role(主角/配角/反派/路人), appearance(外貌描述), clothing(服装描述)。输出纯JSON数组，不要任何其他文字。`;

  const userPrompt = `以下是漫剧剧本内容：

${script}

请提取所有角色（纯 JSON 数组）：`;

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        stream: true,
        temperature: 0.5,
        max_tokens: 2048,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `AI API error: ${response.status}`, details: errorText },
        { status: 502 }
      );
    }

    // Forward the SSE stream to the client
    return new Response(response.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to connect to AI API", details: message },
      { status: 502 }
    );
  }
}
