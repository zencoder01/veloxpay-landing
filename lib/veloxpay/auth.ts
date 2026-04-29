import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { hashApiKey } from "@/lib/veloxpay/api-key";

export async function getMerchantContext(req: NextRequest) {
  const apiKey = req.headers.get("x-api-key");
  if (!apiKey) {
    return { ok: false as const, error: "Missing x-api-key header." };
  }

  const merchant = await db.merchant.findUnique({
    where: { apiKeyHash: hashApiKey(apiKey) },
    select: { id: true },
  });

  if (!merchant) {
    return { ok: false as const, error: "Invalid API key." };
  }

  return { ok: true as const, merchantId: merchant.id };
}
