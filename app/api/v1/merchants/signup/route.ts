import { NextRequest, NextResponse } from "next/server";
import { createMerchantAccount } from "@/lib/veloxpay/merchant-auth";
import { validateSignupPayload } from "@/lib/veloxpay/merchant-validators";
import { requestId } from "@/lib/veloxpay/request";
import { writeAuditLog } from "@/lib/veloxpay/audit";

export async function POST(req: NextRequest) {
  const reqId = requestId();
  const body = await req.json().catch(() => null);
  const error = validateSignupPayload(body);
  if (error) {
    return NextResponse.json({ error, requestId: reqId }, { status: 400 });
  }
  const data = body as { businessName: string; email: string; password: string };
  try {
    const { merchant, apiKey } = await createMerchantAccount(data);
    await writeAuditLog({
      merchantId: merchant.id,
      actor: merchant.email,
      action: "merchant.signup",
      target: merchant.id,
      metadata: { mode: merchant.mode, status: merchant.status },
    });
    return NextResponse.json(
      {
        requestId: reqId,
        merchant: {
          id: merchant.id,
          businessName: merchant.businessName,
          email: merchant.email,
          status: merchant.status,
          mode: merchant.mode,
        },
        apiKey,
        message: "Store this API key now. It will not be shown again.",
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Unable to create merchant account.", requestId: reqId },
      { status: 400 }
    );
  }
}
