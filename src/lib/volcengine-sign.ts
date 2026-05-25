/* ------------------------------------------------------------------ */
/* 火山引擎 V4 HMAC-SHA256 签名 — Edge Runtime 兼容 (Web Crypto API)     */
/* ------------------------------------------------------------------ */

async function hmacSign(key: BufferSource, msg: string): Promise<ArrayBuffer> {
  const enc = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    key,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  return await crypto.subtle.sign("HMAC", cryptoKey, enc.encode(msg));
}

async function sha256(msg: string): Promise<string> {
  const enc = new TextEncoder();
  const hash = await crypto.subtle.digest("SHA-256", enc.encode(msg));
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function getSignatureKey(
  secretKey: string,
  date: string,
  region: string,
  service: string
): Promise<ArrayBuffer> {
  const enc = new TextEncoder();
  let key: BufferSource = enc.encode(secretKey);
  key = await hmacSign(key, date);
  key = await hmacSign(key, region);
  key = await hmacSign(key, service);
  key = await hmacSign(key, "request");
  return key;
}

/**
 * 为火山引擎 API 创建带 V4 签名的请求头和 body。
 *
 * @param ak  Access Key
 * @param sk  Secret Key
 * @param action  API Action，如 CVSync2AsyncSubmitTask
 * @param body  JSON 字符串
 * @returns  签名后的 headers + body，可直接传给 fetch()
 */
export async function createSignedRequest(
  ak: string,
  sk: string,
  action: string,
  body: string
): Promise<{ headers: Record<string, string>; body: string }> {
  const host = "visual.volcengineapi.com";
  const service = "cv";
  const region = "cn-north-1";
  const version = "2022-08-31";

  const now = new Date();
  // 格式: 20260525T120000Z
  const dateStr = now
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
  const shortDate = dateStr.slice(0, 8);

  const method = "POST";
  const uri = "/";
  const queryString = `Action=${action}&Version=${version}`;
  const contentHash = await sha256(body);

  const canonicalHeaders =
    [
      `content-type:application/json`,
      `host:${host}`,
      `x-content-sha256:${contentHash}`,
      `x-date:${dateStr}`,
    ].join("\n") + "\n";

  const signedHeaders = "content-type;host;x-content-sha256;x-date";

  const canonicalRequest = [
    method,
    uri,
    queryString,
    canonicalHeaders,
    signedHeaders,
    contentHash,
  ].join("\n");

  const credentialScope = `${shortDate}/${region}/${service}/request`;
  const stringToSign = [
    "HMAC-SHA256",
    dateStr,
    credentialScope,
    await sha256(canonicalRequest),
  ].join("\n");

  const signingKey = await getSignatureKey(sk, shortDate, region, service);
  const signatureBytes = await hmacSign(signingKey, stringToSign);
  const signature = Array.from(new Uint8Array(signatureBytes))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const authorization = `HMAC-SHA256 Credential=${ak}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  return {
    headers: {
      "Content-Type": "application/json",
      Host: host,
      "X-Date": dateStr,
      "X-Content-Sha256": contentHash,
      Authorization: authorization,
    },
    body,
  };
}
