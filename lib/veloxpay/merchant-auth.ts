import { randomBytes } from "node:crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "@/lib/db";
import { env } from "@/lib/veloxpay/env";
import { getApiKeyPrefix, hashApiKey } from "@/lib/veloxpay/api-key";

export async function createMerchantAccount(input: {
  businessName: string;
  email: string;
  password: string;
}) {
  const passwordHash = await bcrypt.hash(input.password, 12);
  const rawApiKey = `vp_test_${randomBytes(18).toString("hex")}`;
  const merchant = await db.merchant.create({
    data: {
      businessName: input.businessName,
      email: input.email.toLowerCase(),
      passwordHash,
      apiKeyHash: hashApiKey(rawApiKey),
      apiKeyPrefix: getApiKeyPrefix(rawApiKey),
      status: "trial",
      mode: "test",
      country: "ZM",
      kycStatus: "pending",
    },
  });
  return { merchant, apiKey: rawApiKey };
}

export async function loginMerchant(input: { email: string; password: string }) {
  const merchant = await db.merchant.findUnique({
    where: { email: input.email.toLowerCase() },
  });
  if (!merchant) return null;
  const ok = await bcrypt.compare(input.password, merchant.passwordHash);
  if (!ok) return null;
  const token = jwt.sign({ merchantId: merchant.id }, env.jwtSecret, {
    expiresIn: "7d",
  });
  return { merchant, token };
}
