import { NextRequest, NextResponse } from "next/server";
import { setTransactionStatus } from "@/lib/veloxpay/store";
import { verifySignature } from "@/lib/veloxpay/webhook-signature";

export async function POST(req: NextRequest) {
  const signature = req.headers.get("x-veloxpay-signature");
  const secret = process.env.VELOXPAY_WEBHOOK_SECRET;
  const raw = await req.text();

  if (!signature || !secret) {
    return NextResponse.json(
      { error: "Missing webhook signature or server secret." },
      { status: 401 }
    );
  }

  const valid = verifySignature(raw, signature, secret);
  if (!valid) {
    return NextResponse.json({ error: "Invalid webhook signature." }, { status: 401 });
  }

  const payload = JSON.parse(raw) as { transactionId?: string; status?: "successful" | "failed" };
  if (!payload.transactionId || !payload.status) {
    return NextResponse.json({ error: "Invalid webhook payload." }, { status: 400 });
  }

  const updated = setTransactionStatus(payload.transactionId, payload.status);
  if (!updated) {
    return NextResponse.json({ error: "Transaction not found." }, { status: 404 });
  }

  return NextResponse.json({ received: true, transaction: updated.id, status: updated.status });
}
