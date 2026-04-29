import { NextRequest, NextResponse } from "next/server";
import { loginMerchant } from "@/lib/veloxpay/merchant-auth";
import { validateLoginPayload } from "@/lib/veloxpay/merchant-validators";
import { requestId } from "@/lib/veloxpay/request";

export async function POST(req: NextRequest) {
  const reqId = requestId();
  const body = await req.json().catch(() => null);
  const error = validateLoginPayload(body);
  if (error) {
    return NextResponse.json({ error, requestId: reqId }, { status: 400 });
  }
  const data = body as { email: string; password: string };
  const result = await loginMerchant(data);
  if (!result) {
    return NextResponse.json({ error: "Invalid credentials.", requestId: reqId }, { status: 401 });
  }
  return NextResponse.json({
    requestId: reqId,
    token: result.token,
    merchant: {
      id: result.merchant.id,
      businessName: result.merchant.businessName,
      email: result.merchant.email,
      status: result.merchant.status,
      mode: result.merchant.mode,
    },
  });
}
