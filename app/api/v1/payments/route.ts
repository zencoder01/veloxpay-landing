import { NextRequest, NextResponse } from "next/server";
import { getMerchantContext } from "@/lib/veloxpay/auth";
import { createTransaction } from "@/lib/veloxpay/store";
import { validateCreatePaymentPayload } from "@/lib/veloxpay/validators";

export async function POST(req: NextRequest) {
  const merchant = await getMerchantContext(req);
  if (!merchant.ok) {
    return NextResponse.json({ error: merchant.error }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const validation = validateCreatePaymentPayload(body);
  if (!validation.valid) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const tx = await createTransaction(validation.data, merchant.merchantId);

  return NextResponse.json(
    {
      id: tx.id,
      reference: tx.reference,
      status: tx.status,
      amount: tx.amount,
      currency: tx.currency,
      method: tx.method,
      provider: tx.provider,
      settlement: "next_business_day",
      createdAt: tx.createdAt,
    },
    { status: 201 }
  );
}
