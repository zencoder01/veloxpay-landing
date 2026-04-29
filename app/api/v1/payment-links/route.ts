import { NextRequest, NextResponse } from "next/server";
import { getMerchantContext } from "@/lib/veloxpay/auth";
import { createPaymentLink } from "@/lib/veloxpay/payment-links";
import { requestId } from "@/lib/veloxpay/request";

export async function POST(req: NextRequest) {
  const reqId = requestId();
  const merchant = await getMerchantContext(req);
  if (!merchant.ok) {
    return NextResponse.json({ error: merchant.error, requestId: reqId }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as
    | { title?: string; amount?: number; currency?: "ZMW" }
    | null;
  if (!body?.title || !body.amount || body.amount <= 0 || body.currency !== "ZMW") {
    return NextResponse.json(
      { error: "title, positive amount, and currency=ZMW are required.", requestId: reqId },
      { status: 400 }
    );
  }

  const link = await createPaymentLink({
    merchantId: merchant.merchantId,
    title: body.title,
    amount: body.amount,
    currency: body.currency,
  });

  return NextResponse.json(
    {
      requestId: reqId,
      id: link.id,
      slug: link.slug,
      checkoutUrl: `/pay/${link.slug}`,
      title: link.title,
      amount: link.amount,
      currency: link.currency,
      active: link.active,
    },
    { status: 201 }
  );
}
