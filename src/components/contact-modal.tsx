"use client";

import { useState } from "react";
import { Gem, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getTokenBalance, setTokenBalance } from "@/lib/token-store";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  onTokenUpdate?: () => void;
}

export function ContactModal({
  open,
  onClose,
  title = "需要充值 Token",
  message = "AI 功能需要 Token 才能使用。联系客服购买后，输入激活码即可充值。",
  onTokenUpdate,
}: ContactModalProps) {
  const [code, setCode] = useState("");
  const [redeemLoading, setRedeemLoading] = useState(false);
  const [redeemResult, setRedeemResult] = useState<{ ok: boolean; msg: string } | null>(null);

  if (!open) return null;

  async function handleRedeem() {
    if (!code.trim()) return;
    setRedeemLoading(true);
    setRedeemResult(null);

    try {
      const res = await fetch("/api/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim() }),
      });
      const data = await res.json() as { ok?: boolean; tokens?: number; error?: string };

      if (data.ok) {
        const current = getTokenBalance();
        setTokenBalance(current + (data.tokens || 0));
        setRedeemResult({ ok: true, msg: `充值成功！已添加 ${(data.tokens || 0).toLocaleString()} token` });
        onTokenUpdate?.();
        setTimeout(() => {
          onClose();
          setCode("");
          setRedeemResult(null);
        }, 1500);
      } else {
        setRedeemResult({ ok: false, msg: data.error || "激活码无效" });
      }
    } catch {
      setRedeemResult({ ok: false, msg: "网络错误，请重试" });
    } finally {
      setRedeemLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <Card className="w-full max-w-md mx-4 shadow-xl">
        <CardContent className="space-y-4 pt-6">
          <div className="text-center space-y-2">
            <Gem className="size-8 text-primary" />
            <h3 className="text-lg font-bold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{message}</p>
          </div>

          {/* 激活码输入 */}
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 space-y-3">
            <p className="text-sm font-medium text-foreground">输入激活码</p>
            <div className="flex gap-2">
              <Input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="输入激活码，如 PRO-XXXX-XXXX"
                className="flex-1"
                onKeyDown={(e) => e.key === "Enter" && handleRedeem()}
              />
              <Button onClick={handleRedeem} disabled={redeemLoading || !code.trim()}>
                {redeemLoading ? "验证中..." : "激活"}
              </Button>
            </div>
            {redeemResult && (
              <p className={`text-sm ${redeemResult.ok ? "text-green-600" : "text-red-600"}`}>
                {redeemResult.msg}
              </p>
            )}
          </div>

          {/* 付费方案 */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">付费方案</p>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-md bg-background p-2 border">
                <p className="font-bold text-primary">基础版</p>
                <p className="text-muted-foreground">¥49/月</p>
                <p className="text-muted-foreground">10万 token</p>
              </div>
              <div className="rounded-md bg-background p-2 border border-primary">
                <p className="font-bold text-primary">专业版</p>
                <p className="text-muted-foreground">¥149/月</p>
                <p className="text-muted-foreground">50万 token</p>
              </div>
              <div className="rounded-md bg-background p-2 border">
                <p className="font-bold text-primary">充值包</p>
                <p className="text-muted-foreground">¥29</p>
                <p className="text-muted-foreground">5万 token</p>
              </div>
            </div>
          </div>

          {/* 微信二维码 */}
          <div className="rounded-lg bg-muted p-4 text-center space-y-3">
            <p className="text-sm font-medium">扫码添加客服微信购买</p>
            <img
              src="/wechat-qr.jpg"
              alt="客服微信二维码"
              className="w-40 h-40 mx-auto rounded-lg border"
            />
            <p className="text-xs text-muted-foreground">添加后发送「购买 Token」即可</p>
          </div>

          {/* Telegram 联系 */}
          <div className="rounded-lg border border-border p-4 text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Send className="size-4 text-primary" />
              <p className="text-sm font-medium">也可以通过 Telegram 联系</p>
            </div>
            <a
              href="https://t.me/dsa885"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline font-medium"
            >
              @dsa885
            </a>
          </div>

          <Button variant="outline" className="w-full" onClick={() => { onClose(); setCode(""); setRedeemResult(null); }}>
            稍后再说
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
