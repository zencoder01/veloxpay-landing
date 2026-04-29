import { NextRequest, NextResponse } from "next/server";
import { getJwtMerchantContext, requireRole } from "@/lib/veloxpay/auth-jwt";
import { listAuditLogs } from "@/lib/veloxpay/audit";

export async function GET(req: NextRequest) {
  const auth = await getJwtMerchantContext(req);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: 401 });
  }
  if (!requireRole("analyst", auth.merchant.role)) {
    return NextResponse.json({ error: "Insufficient role." }, { status: 403 });
  }
  const logs = await listAuditLogs(auth.merchant.id);
  return NextResponse.json({ logs });
}
