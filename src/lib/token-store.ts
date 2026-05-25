const TOKEN_KEY = "manga-token-balance";
const TOKEN_LOG_KEY = "manga-token-log";

export interface TokenLog {
  timestamp: string;
  type: string; // "script" | "storyboard" | "extract-characters"
  tokensUsed: number;
  projectName?: string;
}

export function getTokenBalance(): number {
  if (typeof window === "undefined") return 0;
  const raw = localStorage.getItem(TOKEN_KEY);
  return raw ? parseInt(raw, 10) : 0; // 默认 0，联系客服充值后才能用 AI 功能
}

export function setTokenBalance(balance: number): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, balance.toString());
}

export function deductTokens(
  amount: number,
  log: Omit<TokenLog, "timestamp">
): boolean {
  const balance = getTokenBalance();
  if (balance < amount) return false;
  setTokenBalance(balance - amount);
  // Log the usage
  const logs = getTokenLogs();
  logs.push({ ...log, timestamp: new Date().toISOString() });
  localStorage.setItem(TOKEN_LOG_KEY, JSON.stringify(logs));
  return true;
}

export function getTokenLogs(): TokenLog[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(TOKEN_LOG_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
