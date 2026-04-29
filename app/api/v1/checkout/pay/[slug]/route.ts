import { NextRequest, NextResponse } from "next/server";
import { createTransaction } from "@/lib/veloxpay/store";
import { getPaymentLinkBySlug } from "@/lib/veloxpay/payment-links";
import { env } from "@/lib/veloxpay/env";

type Params = {
  params: Promise<{ slug: string }>;
};

export async function POST(req: NextRequest, { params }: Params) {
  const { slug } = await params;
  const link = await getPaymentLinkBySlug(slug);
  if (!link || !link.active) {
    return NextResponse.json({ error: "Payment link not found." }, { status: 404 });
  }

  const body = (await req.json().catch(() => null)) as
    | { provider?: "mtn" | "airtel" | "zamtel" | "visa" | "mastercard"; phone?: string; email?: string }
    | null;

  const provider = body?.provider ?? "mtn";
  const method = provider === "visa" || provider === "mastercard" ? "card" : "mobile_money";
  if (method === "mobile_money" && !body?.phone) {
    return NextResponse.json({ error: "phone is required for mobile money." }, { status: 400 });
  }

  const tx = await createTransaction(
    {
      amount: link.amount,
      currency: "ZMW",
      method,
      provider,
      customer: {
        phone: body?.phone,
        email: body?.email,
      },
      reference: `LINK_${link.slug}_${Date.now()}`,
    },
    link.merchantId
  );

  const simulatedStatus = env.pocMode
    ? tx.reference.charCodeAt(tx.reference.length - 1) % 5 === 0
      ? "failed"
      : "successful"
    : tx.status;

  return NextResponse.json({
    id: tx.id,
    reference: tx.reference,
    status: simulatedStatus,
    amount: tx.amount,
    currency: tx.currency,
    sandbox_simulated: env.pocMode,
  });
}
