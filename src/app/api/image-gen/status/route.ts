export const runtime = "edge";

import { NextResponse } from "next/server";
import { createSignedRequest } from "@/lib/volcengine-sign";

/* ------------------------------------------------------------------ */
/* GET /api/image-gen/status — Poll task status (kling/wanxiang/zhipu) */
/* POST /api/image-gen/status — Poll task status (jimeng, 需要签名)     */
/* ------------------------------------------------------------------ */

export async function GET(req: Request) {
  const url = new URL(req.url);
  const taskId = url.searchParams.get("taskId");
  const apiKey = url.searchParams.get("apiKey");
  const provider = url.searchParams.get("provider") || "kling";

  if (!taskId || !apiKey) {
    return NextResponse.json(
      { error: "缺少 taskId 或 apiKey 参数" },
      { status: 400 }
    );
  }

  if (provider === "kling" || provider === "kling-image" || provider === "wanxiang") {
    // 可灵 / 通义万相 via DashScope — query task status
    try {
      const response = await fetch(
        `https://dashscope.aliyuncs.com/api/v1/tasks/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
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
        { error: `查询任务状态失败: ${message}` },
        { status: 502 }
      );
    }
  }

  /* ------------------------------------------------------------------ */
  /* 智谱 CogView / CogVideoX — async result polling                     */
  /* ------------------------------------------------------------------ */
  if (provider === "zhipu-image" || provider === "zhipu-video") {
    try {
      const response = await fetch(
        `https://open.bigmodel.cn/api/paas/v4/async-results/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
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

      // Normalize to DashScope-like structure for the frontend
      const taskStatus = data.task_status || data.status || "UNKNOWN";

      if (taskStatus === "SUCCESS" || taskStatus === "SUCCEEDED" || taskStatus === 3) {
        // Extract result URL
        let url = "";
        if (provider === "zhipu-video") {
          // Video result
          url = data.video_result?.[0]?.url || data.video_result?.url || "";
        } else {
          // Image result
          url = data.data?.[0]?.url || data.image_result?.[0]?.url || "";
        }
        return NextResponse.json({
          output: {
            task_id: taskId,
            task_status: "SUCCEEDED",
            results: [{ url }],
          },
        });
      }

      if (taskStatus === "FAIL" || taskStatus === "FAILED" || taskStatus === 4) {
        return NextResponse.json({
          output: {
            task_id: taskId,
            task_status: "FAILED",
            message: data.message || "生成失败",
          },
        });
      }

      // Still processing
      return NextResponse.json({
        output: {
          task_id: taskId,
          task_status: taskStatus === "PROCESSING" || taskStatus === 2 ? "RUNNING" : "PENDING",
        },
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "网络错误";
      return NextResponse.json(
        { error: `查询智谱任务状态失败: ${message}` },
        { status: 502 }
      );
    }
  }

  return NextResponse.json(
    { error: "不支持的 provider" },
    { status: 400 }
  );
}

/* ------------------------------------------------------------------ */
/* POST /api/image-gen/status — 即梦 polling (需要 AK/SK 签名)          */
/* ------------------------------------------------------------------ */

export async function POST(req: Request) {
  const body = (await req.json()) as any;
  const { taskId, provider, ak, sk } = body;

  if (provider !== "jimeng") {
    return NextResponse.json(
      { error: "POST 仅支持 jimeng provider" },
      { status: 400 }
    );
  }

  if (!taskId || !ak || !sk) {
    return NextResponse.json(
      { error: "缺少 taskId、ak 或 sk 参数" },
      { status: 400 }
    );
  }

  try {
    const reqBody = JSON.stringify({
      req_key: "high_aes_general_v30l_zt2i",
      task_id: taskId,
      req_json: JSON.stringify({
        return_url: true,
        logo_info: { add_logo: false },
      }),
    });

    const signed = await createSignedRequest(
      ak,
      sk,
      "CVSync2AsyncGetResult",
      reqBody
    );

    const response = await fetch(
      "https://visual.volcengineapi.com/?Action=CVSync2AsyncGetResult&Version=2022-08-31",
      {
        method: "POST",
        headers: signed.headers,
        body: signed.body,
      }
    );

    const data = (await response.json()) as any;

    if (data.code === 10000 && data.data) {
      const rawStatus = data.data.status as string | undefined;
      const status =
        rawStatus === "done"
          ? "SUCCEEDED"
          : rawStatus === "failed"
            ? "FAILED"
            : "RUNNING";

      return NextResponse.json({
        output: {
          task_id: taskId,
          task_status: status,
          results: data.data.image_urls
            ? data.data.image_urls.map((url: string) => ({ url }))
            : [],
        },
      });
    }

    // Not done yet — return RUNNING
    return NextResponse.json({
      output: { task_id: taskId, task_status: "RUNNING" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "网络错误";
    return NextResponse.json(
      { error: `查询即梦任务状态失败: ${message}` },
      { status: 502 }
    );
  }
}
