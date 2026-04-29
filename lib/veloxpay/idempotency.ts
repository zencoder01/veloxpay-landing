import { createHash } from "node:crypto";
import { db } from "@/lib/db";

export function hashPayload(input: unknown) {
  return createHash("sha256").update(JSON.stringify(input)).digest("hex");
}

export async function readIdempotencyRecord(merchantId: string, key: string) {
  return db.idempotencyRecord.findUnique({
    where: { merchantId_key: { merchantId, key } },
  });
}

export async function saveIdempotencyRecord(args: {
  merchantId: string;
  key: string;
  requestHash: string;
  responseStatus: number;
  responseBody: unknown;
}) {
  return db.idempotencyRecord.create({
    data: {
      merchantId: args.merchantId,
      key: args.key,
      requestHash: args.requestHash,
      responseStatus: args.responseStatus,
      responseBody: args.responseBody as object,
    },
  });
}
