"use client";

import { useState, useCallback } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  text: string;
  variant?: "compact" | "full";
  className?: string;
}

export function CopyButton({
  text,
  variant = "compact",
  className,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }, [text]);

  if (variant === "compact") {
    return (
      <Button
        variant="ghost"
        size="icon-xs"
        className={cn(
          "text-muted-foreground hover:text-foreground",
          copied && "text-green-600 hover:text-green-600",
          className,
        )}
        onClick={handleCopy}
      >
        {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
        <span className="sr-only">{copied ? "已复制" : "复制"}</span>
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        "gap-1.5 text-muted-foreground",
        copied && "text-green-600 border-green-300",
        className,
      )}
      onClick={handleCopy}
    >
      {copied ? (
        <>
          <Check className="size-3.5" />
          <span>已复制 ✓</span>
        </>
      ) : (
        <>
          <Copy className="size-3.5" />
          <span>复制</span>
        </>
      )}
    </Button>
  );
}
