import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { env } from "@/lib/veloxpay/env";
import { db } from "@/lib/db";

export async function getJwtMerchantContext(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (!auth || !auth.startsWith("Bearer ")) {
    return { ok: false as const, error: "Missing Bearer token." };
  }
  const token = auth.slice("Bearer ".length);
  try {
    const decoded = jwt.verify(token, env.jwtSecret) as { merchantId: string };
    const merchant = await db.merchant.findUnique({
      where: { id: decoded.merchantId },
      select: { id: true, role: true, email: true },
    });
    if (!merchant) return { ok: false as const, error: "Merchant not found." };
    return { ok: true as const, merchant };
  } catch {
    return { ok: false as const, error: "Invalid token." };
  }
}

export function requireRole(role: string, actualRole: string) {
  if (actualRole === "owner") return true;
  return actualRole === role;
}
