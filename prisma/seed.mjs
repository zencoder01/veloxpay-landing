import { PrismaClient } from "@prisma/client";
import { createHash } from "node:crypto";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

function hashApiKey(apiKey) {
  return createHash("sha256").update(apiKey).digest("hex");
}

async function main() {
  const apiKey = process.env.SEED_MERCHANT_API_KEY || "vp_test_key_1234567890";
  const apiKeyHash = hashApiKey(apiKey);
  const passwordHash = await bcrypt.hash(
    process.env.SEED_MERCHANT_PASSWORD || "ChangeMe123!",
    12
  );

  const merchant = await prisma.merchant.upsert({
    where: { apiKeyHash },
    update: {},
    create: {
      businessName: "VeloxPay Demo Merchant",
      email: "merchant@example.com",
      passwordHash,
      apiKeyHash,
      apiKeyPrefix: apiKey.slice(0, 8),
      country: "ZM",
      kycStatus: "pending",
      status: "trial",
      mode: "test",
    },
  });

  console.log("Seeded merchant:", merchant.id);
  console.log("Merchant API key:", apiKey);
  console.log("Merchant login email:", merchant.email);
  console.log(
    "Merchant login password:",
    process.env.SEED_MERCHANT_PASSWORD || "ChangeMe123!"
  );
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
