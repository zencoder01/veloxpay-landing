import { PrismaClient } from "@prisma/client";
import { createHash } from "node:crypto";

const prisma = new PrismaClient();

function hashApiKey(apiKey) {
  return createHash("sha256").update(apiKey).digest("hex");
}

async function main() {
  const apiKey = process.env.SEED_MERCHANT_API_KEY || "vp_test_key_1234567890";
  const apiKeyHash = hashApiKey(apiKey);

  const merchant = await prisma.merchant.upsert({
    where: { apiKeyHash },
    update: {},
    create: {
      businessName: "VeloxPay Demo Merchant",
      email: "merchant@example.com",
      apiKeyHash,
      apiKeyPrefix: apiKey.slice(0, 8),
      country: "ZM",
      kycStatus: "pending",
    },
  });

  console.log("Seeded merchant:", merchant.id);
  console.log("Merchant API key:", apiKey);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
