export const runtime = "edge";

import { NextResponse } from "next/server";
import { createSignedRequest } from "@/lib/volcengine-sign";

/* ------------------------------------------------------------------ */
/* POST /api/image-gen — Submit image/video generation task            */
/* ------------------------------------------------------------------ */

export async function POST(req: Request) {
  const body = (await req.json()) as Record<string, unknown>;
  const provider = body.provider as string;
  const apiKey = body.apiKey as string;

  /* ---------------------------------------------------------------- */
  /* 即梦 (Jimeng / Seedream) — 火山引擎 V4 签名                        */
  /* ---------------------------------------------------------------- */
  if (provider === "jimeng") {
    const ak = body.ak as string;
    const sk = body.sk as string;
    if (!ak || !sk) {
      return NextResponse.json(
        { error: "需要火山引擎 AK 和 SK，请在设置页面配置" },
        { status: 400 }
      );
    }

    const prompt = body.prompt as string;
    if (!prompt) {
      return NextResponse.json(
        { error: "缺少 prompt 参数" },
        { status: 400 }
      );
    }

    const width = (body.width as number) || 1080;
    const height = (body.height as number) || 1920;

    const reqBody = JSON.stringify({
      req_key: "high_aes_general_v30l_zt2i",
      prompt,
      width,
      height,
      seed: -1,
      use_pre_llm: false,
      scale: 2.5,
    });

    try {
      const signed = await createSignedRequest(
        ak,
        sk,
        "CVSync2AsyncSubmitTask",
        reqBody
      );

      const response = await fetch(
        "https://visual.volcengineapi.com/?Action=CVSync2AsyncSubmitTask&Version=2022-08-31",
        {
          method: "POST",
          headers: signed.headers,
          body: signed.body,
        }
      );

      const data = (await response.json()) as any;

      if (data.code === 10000 && data.data?.task_id) {
        return NextResponse.json({
          output: { task_id: data.data.task_id, task_status: "PENDING" },
        });
      }

      return NextResponse.json(
        {
          error: data.message || "即梦 API 错误",
          details: data,
        },
        { status: 502 }
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : "网络错误";
      return NextResponse.json(
        { error: `请求即梦 API 失败: ${message}` },
        { status: 502 }
      );
    }
  }

  if (!apiKey) {
    return NextResponse.json(
      { error: "需要 API Key，请在设置页面配置" },
      { status: 400 }
    );
  }

  if (provider === "kling") {
    // 可灵 via DashScope (阿里云)
    const prompt = body.prompt as string;
    if (!prompt) {
      return NextResponse.json(
        { error: "缺少 prompt 参数" },
        { status: 400 }
      );
    }

    const model =
      (body.model as string) || "kling/kling-v3-video-generation";
    const mode = (body.mode as string) || "std";
    const aspectRatio = (body.aspectRatio as string) || "9:16";
    const duration = (body.duration as number) || 5;
    const imageUrl = body.imageUrl as string | undefined;

    try {
      const response = await fetch(
        "https://dashscope.aliyuncs.com/api/v1/services/aigc/video-generation/video-synthesis",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "X-DashScope-Async": "enable",
          },
          body: JSON.stringify({
            model,
            input: {
              prompt,
              ...(imageUrl
                ? { media: [{ type: "first_frame", url: imageUrl }] }
                : {}),
            },
            parameters: {
              mode,
              aspect_ratio: aspectRatio,
              duration,
              audio: false,
              watermark: false,
            },
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const errMsg =
          (data as Record<string, unknown>)?.message ||
          `DashScope API 错误 (${response.status})`;
        return NextResponse.json(
          { error: errMsg },
          { status: response.status }
        );
      }

      return NextResponse.json(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "网络错误";
      return NextResponse.json(
        { error: `请求 DashScope 失败: ${message}` },
        { status: 502 }
      );
    }
  }

  if (provider === "kling-image") {
    // 可灵 via DashScope — text-to-image
    const prompt = body.prompt as string;
    if (!prompt) {
      return NextResponse.json(
        { error: "缺少 prompt 参数" },
        { status: 400 }
      );
    }

    const model =
      (body.model as string) || "kling/kling-v2-image-generation";
    const aspectRatio = (body.aspectRatio as string) || "9:16";
    const imageCount = (body.imageCount as number) || 1;

    try {
      const response = await fetch(
        "https://dashscope.aliyuncs.com/api/v1/services/aigc/image-generation/image-synthesis",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "X-DashScope-Async": "enable",
          },
          body: JSON.stringify({
            model,
            input: {
              prompt,
            },
            parameters: {
              aspect_ratio: aspectRatio,
              n: imageCount,
            },
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const errMsg =
          (data as Record<string, unknown>)?.message ||
          `DashScope API 错误 (${response.status})`;
        return NextResponse.json(
          { error: errMsg },
          { status: response.status }
        );
      }

      return NextResponse.json(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "网络错误";
      return NextResponse.json(
        { error: `请求 DashScope 失败: ${message}` },
        { status: 502 }
      );
    }
  }

  /* ------------------------------------------------------------------ */
  /* 智谱 CogView — 图片生成                                              */
  /* ------------------------------------------------------------------ */
  if (provider === "zhipu-image") {
    const prompt = body.prompt as string;
    if (!prompt) {
      return NextResponse.json(
        { error: "缺少 prompt 参数" },
        { status: 400 }
      );
    }

    const model = (body.model as string) || "cogview-4";
    const size = (body.size as string) || "1024x1024";

    try {
      const response = await fetch(
        "https://open.bigmodel.cn/api/paas/v4/images/generations",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model,
            prompt,
            size,
          }),
        }
      );

      const data = (await response.json()) as any;

      if (!response.ok) {
        const errMsg =
          data?.error?.message || data?.message || `智谱 API 错误 (${response.status})`;
        return NextResponse.json(
          { error: errMsg },
          { status: response.status }
        );
      }

      // CogView may return async task_id or synchronous data
      if (data.id && data.data) {
        // Synchronous response — return directly
        const url = data.data?.[0]?.url || "";
        return NextResponse.json({
          output: { task_status: "SUCCEEDED", results: [{ url }] },
          status: "SUCCEEDED",
        });
      }

      // Async — return task_id for polling
      const taskId = data.id || data.task_id || "";
      return NextResponse.json({
        output: { task_id: taskId, task_status: "PENDING" },
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "网络错误";
      return NextResponse.json(
        { error: `请求智谱 API 失败: ${message}` },
        { status: 502 }
      );
    }
  }

  /* ------------------------------------------------------------------ */
  /* 智谱 CogVideoX — 视频生成                                            */
  /* ------------------------------------------------------------------ */
  if (provider === "zhipu-video") {
    const prompt = body.prompt as string;
    if (!prompt) {
      return NextResponse.json(
        { error: "缺少 prompt 参数" },
        { status: 400 }
      );
    }

    const model = (body.model as string) || "cogvideox-v2";
    const size = (body.size as string) || "1920x1080";
    const duration = (body.duration as number) || 5;

    try {
      const response = await fetch(
        "https://open.bigmodel.cn/api/paas/v4/videos/generations",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model,
            prompt,
            size,
            duration,
          }),
        }
      );

      const data = (await response.json()) as any;

      if (!response.ok) {
        const errMsg =
          data?.error?.message || data?.message || `智谱 API 错误 (${response.status})`;
        return NextResponse.json(
          { error: errMsg },
          { status: response.status }
        );
      }

      const taskId = data.id || data.task_id || "";
      return NextResponse.json({
        output: { task_id: taskId, task_status: "PENDING" },
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "网络错误";
      return NextResponse.json(
        { error: `请求智谱 API 失败: ${message}` },
        { status: 502 }
      );
    }
  }

  /* ------------------------------------------------------------------ */
  /* 通义万相 via DashScope — 图片生成                                      */
  /* ------------------------------------------------------------------ */
  if (provider === "wanxiang") {
    const prompt = body.prompt as string;
    if (!prompt) {
      return NextResponse.json(
        { error: "缺少 prompt 参数" },
        { status: 400 }
      );
    }

    const model = (body.model as string) || "wanx2.1-t2i-turbo";
    const size = (body.size as string) || "1024*1024";
    const n = (body.imageCount as number) || 1;

    try {
      const response = await fetch(
        "https://dashscope.aliyuncs.com/api/v1/services/aigc/text2image/image-synthesis",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "X-DashScope-Async": "enable",
          },
          body: JSON.stringify({
            model,
            input: {
              prompt,
            },
            parameters: {
              size,
              n,
            },
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const errMsg =
          (data as Record<string, unknown>)?.message ||
          `DashScope API 错误 (${response.status})`;
        return NextResponse.json(
          { error: errMsg },
          { status: response.status }
        );
      }

      return NextResponse.json(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "网络错误";
      return NextResponse.json(
        { error: `请求 DashScope 失败: ${message}` },
        { status: 502 }
      );
    }
  }

  /* ------------------------------------------------------------------ */
  /* MiniMax — 图片生成                                                    */
  /* ------------------------------------------------------------------ */
  if (provider === "minimax-image") {
    const prompt = body.prompt as string;
    if (!prompt) {
      return NextResponse.json(
        { error: "缺少 prompt 参数" },
        { status: 400 }
      );
    }

    const model = (body.model as string) || "image-01";
    const width = (body.width as number) || 1024;
    const height = (body.height as number) || 1024;

    try {
      const response = await fetch(
        "https://api.minimaxi.com/v1/images/generations",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model,
            prompt,
            width,
            height,
          }),
        }
      );

      const data = (await response.json()) as any;

      if (!response.ok) {
        const errMsg =
          data?.error?.message || data?.base_resp?.status_msg || `MiniMax API 错误 (${response.status})`;
        return NextResponse.json(
          { error: errMsg },
          { status: response.status }
        );
      }

      // MiniMax returns data synchronously or with task_id
      if (data.data && data.data.length > 0) {
        const url = data.data[0]?.url || "";
        return NextResponse.json({
          output: { task_status: "SUCCEEDED", results: [{ url }] },
          status: "SUCCEEDED",
        });
      }

      // Async fallback
      const taskId = data.task_id || data.id || "";
      if (taskId) {
        return NextResponse.json({
          output: { task_id: taskId, task_status: "PENDING" },
        });
      }

      return NextResponse.json(
        { error: "MiniMax 返回格式异常" },
        { status: 502 }
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : "网络错误";
      return NextResponse.json(
        { error: `请求 MiniMax API 失败: ${message}` },
        { status: 502 }
      );
    }
  }

  /* ------------------------------------------------------------------ */
  /* OpenAI DALL-E 3 — 图片生成（同步）                                     */
  /* ------------------------------------------------------------------ */
  if (provider === "dalle") {
    const prompt = body.prompt as string;
    if (!prompt) {
      return NextResponse.json(
        { error: "缺少 prompt 参数" },
        { status: 400 }
      );
    }

    const model = (body.model as string) || "dall-e-3";
    const size = (body.size as string) || "1024x1792";
    const quality = (body.quality as string) || "standard";
    const n = 1;

    try {
      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model,
            prompt,
            size,
            quality,
            n,
          }),
        }
      );

      const data = (await response.json()) as any;

      if (!response.ok) {
        const errMsg =
          data?.error?.message || `OpenAI API 错误 (${response.status})`;
        return NextResponse.json(
          { error: errMsg },
          { status: response.status }
        );
      }

      const url = data.data?.[0]?.url || "";
      return NextResponse.json({
        output: { task_status: "SUCCEEDED", results: [{ url }] },
        status: "SUCCEEDED",
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "网络错误";
      return NextResponse.json(
        { error: `请求 OpenAI API 失败: ${message}` },
        { status: 502 }
      );
    }
  }

  /* ------------------------------------------------------------------ */
  /* Stability AI — SD3 图片生成（同步，multipart form-data）               */
  /* ------------------------------------------------------------------ */
  if (provider === "stability") {
    const prompt = body.prompt as string;
    if (!prompt) {
      return NextResponse.json(
        { error: "缺少 prompt 参数" },
        { status: 400 }
      );
    }

    const aspectRatio = (body.aspectRatio as string) || "9:16";
    const outputFormat = (body.outputFormat as string) || "png";

    try {
      const formData = new FormData();
      formData.append("prompt", prompt);
      formData.append("output_format", outputFormat);
      formData.append("aspect_ratio", aspectRatio);

      const response = await fetch(
        "https://api.stability.ai/v2beta/stable-image/generate/sd3",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            Accept: "application/json",
          },
          body: formData,
        }
      );

      const data = (await response.json()) as any;

      if (!response.ok) {
        const errMsg =
          data?.message || data?.errors?.[0] || `Stability API 错误 (${response.status})`;
        return NextResponse.json(
          { error: errMsg },
          { status: response.status }
        );
      }

      // Stability returns base64 image
      const base64 = data.image || "";
      const dataUrl = base64
        ? `data:image/${outputFormat};base64,${base64}`
        : "";

      return NextResponse.json({
        output: { task_status: "SUCCEEDED", results: [{ url: dataUrl }] },
        status: "SUCCEEDED",
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "网络错误";
      return NextResponse.json(
        { error: `请求 Stability API 失败: ${message}` },
        { status: 502 }
      );
    }
  }

  return NextResponse.json(
    { error: "不支持的 provider，当前支持: jimeng, kling, kling-image, zhipu-image, zhipu-video, wanxiang, minimax-image, dalle, stability" },
    { status: 400 }
  );
}
