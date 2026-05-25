// Minimal Cloudflare KV type declarations
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
  delete(key: string): Promise<void>;
}
