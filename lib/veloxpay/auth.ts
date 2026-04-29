import { NextRequest } from "next/server";

export function getMerchantContext(req: NextRequest) {
  const apiKey = req.headers.get("x-api-key");
  if (!apiKey) {
    return { ok: false as const, error: "Missing x-api-key header." };
  }

  // Phase 1 stub auth. Replace with DB-backed API key validation in Phase 2.
  return { ok: true as const, merchantId: `merchant_${apiKey.slice(0, 8)}` };
}
