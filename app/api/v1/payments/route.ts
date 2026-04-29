import { NextRequest, NextResponse } from "next/server";
import { getMerchantContext } from "@/lib/veloxpay/auth";
import { createTransaction } from "@/lib/veloxpay/store";
import { validateCreatePaymentPayload } from "@/lib/veloxpay/validators";
import { checkRateLimit } from "@/lib/veloxpay/rate-limit";
import {
  hashPayload,
  readIdempotencyRecord,
  saveIdempotencyRecord,
} from "@/lib/veloxpay/idempotency";
import { requestId } from "@/lib/veloxpay/request";
import { env } from "@/lib/veloxpay/env";

export async function POST(req: NextRequest) {
  const reqId = requestId();
  const rateKey = req.headers.get("x-forwarded-for") ?? "unknown";
  const rate = checkRateLimit(`payments:${rateKey}`);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Rate limit exceeded.", requestId: reqId },
      { status: 429 }
    );
  }

  const merchant = await getMerchantContext(req);
  if (!merchant.ok) {
    return NextResponse.json({ error: merchant.error, requestId: reqId }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const validation = validateCreatePaymentPayload(body);
  if (!validation.valid) {
    return NextResponse.json({ error: validation.error, requestId: reqId }, { status: 400 });
  }

  const idemKey = req.headers.get("idempotency-key");
  const bodyHash = hashPayload(validation.data);

  if (idemKey) {
    const existing = await readIdempotencyRecord(merchant.merchantId, idemKey);
    if (existing) {
      if (existing.requestHash !== bodyHash) {
        return NextResponse.json(
          { error: "Idempotency key reused with different payload.", requestId: reqId },
          { status: 409 }
        );
      }
      return NextResponse.json(existing.responseBody, {
        status: existing.responseStatus,
      });
    }
  }

  const tx = await createTransaction(validation.data, merchant.merchantId);
  const simulatedStatus = env.pocMode
    ? tx.reference.charCodeAt(tx.reference.length - 1) % 5 === 0
      ? "failed"
      : "successful"
    : tx.status;

  const responseBody = {
    id: tx.id,
    reference: tx.reference,
    status: simulatedStatus,
    amount: tx.amount,
    currency: tx.currency,
    method: tx.method,
    provider: tx.provider,
    settlement: "next_business_day",
    sandbox_simulated: env.pocMode,
    createdAt: tx.createdAt,
    requestId: reqId,
  };

  if (idemKey) {
    await saveIdempotencyRecord({
      merchantId: merchant.merchantId,
      key: idemKey,
      requestHash: bodyHash,
      responseStatus: 201,
      responseBody,
    });
  }

  return NextResponse.json(responseBody, { status: 201 });
}
