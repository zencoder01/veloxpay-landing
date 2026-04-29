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
import { createWebhookDelivery } from "@/lib/veloxpay/webhook-delivery";
import { evaluateRisk } from "@/lib/veloxpay/risk";
import { writeAuditLog } from "@/lib/veloxpay/audit";

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
  const risk = await evaluateRisk({
    merchantId: merchant.merchantId,
    amount: validation.data.amount,
    customerPhone: validation.data.customer.phone,
  });

  if (risk.decision === "block") {
    await writeAuditLog({
      merchantId: merchant.merchantId,
      actor: "api_key",
      action: "payment.blocked_risk",
      target: tx.id,
      metadata: {
        reason: risk.reasons.join(","),
      },
    });
    return NextResponse.json(
      {
        error: "Payment blocked by risk policy.",
        reasons: risk.reasons,
        requestId: reqId,
      },
      { status: 403 }
    );
  }

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
    risk: {
      decision: risk.decision,
      reasons: risk.reasons,
    },
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

  if (validation.data.callbackUrl) {
    await createWebhookDelivery({
      transactionId: tx.id,
      callbackUrl: validation.data.callbackUrl,
      payload: {
        transactionId: tx.id,
        reference: tx.reference,
        status: simulatedStatus,
        amount: tx.amount,
        currency: tx.currency,
      },
    });
  }

  await writeAuditLog({
    merchantId: merchant.merchantId,
    actor: "api_key",
    action: "payment.created",
    target: tx.id,
    metadata: {
      amount: tx.amount,
      provider: tx.provider,
      status: simulatedStatus,
      risk: risk.decision,
    },
  });

  return NextResponse.json(responseBody, { status: 201 });
}
