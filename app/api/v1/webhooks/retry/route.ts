import { NextResponse } from "next/server";
import { processPendingWebhookDeliveries } from "@/lib/veloxpay/webhook-delivery";

export async function POST() {
  const processed = await processPendingWebhookDeliveries();
  return NextResponse.json({ processed });
}
