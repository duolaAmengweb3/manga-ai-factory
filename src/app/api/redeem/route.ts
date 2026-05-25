export const runtime = "edge";

import { NextResponse } from "next/server";

// 激活码存储：Cloudflare KV
// 本地开发用内存 Map 模拟
const localCodes = new Map<string, { tokens: number; used: boolean }>();

// 预置一些测试码（本地开发用）
if (typeof process !== "undefined" && process.env.NODE_ENV === "development") {
  localCodes.set("TEST-1000", { tokens: 1000, used: false });
  localCodes.set("TEST-50000", { tokens: 50000, used: false });
  localCodes.set("TEST-100000", { tokens: 100000, used: false });
}

async function getKV(): Promise<KVNamespace | null> {
  try {
    const { getRequestContext } = await import("@cloudflare/next-on-pages");
    const env = getRequestContext().env as unknown as Record<string, unknown>;
    return (env.CODES_KV as KVNamespace) || null;
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  const body = await req.json() as Record<string, unknown>;
  const code = (body.code as string || "").trim().toUpperCase();

  if (!code) {
    return NextResponse.json({ ok: false, error: "请输入激活码" }, { status: 400 });
  }

  const kv = await getKV();

  if (kv) {
    // Cloudflare KV 模式
    const raw = await kv.get(code);
    if (!raw) {
      return NextResponse.json({ ok: false, error: "激活码无效" }, { status: 400 });
    }

    const data = JSON.parse(raw) as { tokens: number; used: boolean };
    if (data.used) {
      return NextResponse.json({ ok: false, error: "激活码已被使用" }, { status: 400 });
    }

    // 标记已使用
    await kv.put(code, JSON.stringify({ ...data, used: true, usedAt: new Date().toISOString() }));

    return NextResponse.json({ ok: true, tokens: data.tokens });
  }

  // 本地开发模式
  const localData = localCodes.get(code);
  if (!localData) {
    return NextResponse.json({ ok: false, error: "激活码无效" }, { status: 400 });
  }
  if (localData.used) {
    return NextResponse.json({ ok: false, error: "激活码已被使用" }, { status: 400 });
  }

  localData.used = true;
  return NextResponse.json({ ok: true, tokens: localData.tokens });
}
