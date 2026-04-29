import { createHash } from "node:crypto";

export function hashApiKey(apiKey: string) {
  return createHash("sha256").update(apiKey).digest("hex");
}

export function getApiKeyPrefix(apiKey: string) {
  return apiKey.slice(0, 8);
}
