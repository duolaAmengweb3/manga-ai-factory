export const runtime = "edge";

import { NextResponse } from "next/server";

function generateCode(prefix: string): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = prefix + "-";
  for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
  code += "-";
  for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
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

async function getAdminSecret(): Promise<string> {
  try {
    const { getRequestContext } = await import("@cloudflare/next-on-pages");
    const env = getRequestContext().env as unknown as Record<string, string>;
    return env.ADMIN_SECRET || process.env.ADMIN_SECRET || "";
  } catch {
    return process.env.ADMIN_SECRET || "";
  }
}

// POST /api/admin/codes
// Headers: { "x-admin-secret": "your-secret" }
// Body: { "plan": "basic" | "pro" | "topup", "count": 1 }
export async function POST(req: Request) {
  const secret = await getAdminSecret();
  const provided = req.headers.get("x-admin-secret") || "";

  if (!secret || provided !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json() as Record<string, unknown>;
  const plan = (body.plan as string) || "topup";
  const count = Math.min((body.count as number) || 1, 50);

  const tokenMap: Record<string, number> = {
    basic: 100000,   // 基础版 10万
    pro: 500000,      // 专业版 50万
    topup: 50000,     // 充值包 5万
    trial: 2000,      // 试用 2千
  };

  const prefixMap: Record<string, string> = {
    basic: "BAS",
    pro: "PRO",
    topup: "TOP",
    trial: "TRY",
  };

  const tokens = tokenMap[plan] || 50000;
  const prefix = prefixMap[plan] || "TOP";

  const kv = await getKV();
  const codes: string[] = [];

  for (let i = 0; i < count; i++) {
    const code = generateCode(prefix);
    const data = { tokens, used: false, plan, createdAt: new Date().toISOString() };

    if (kv) {
      await kv.put(code, JSON.stringify(data));
    }

    codes.push(code);
  }

  return NextResponse.json({
    ok: true,
    codes,
    plan,
    tokensPerCode: tokens,
    note: kv ? "Saved to KV" : "KV not available (local dev mode)",
  });
}
