import { NextResponse } from "next/server";
import { getTransactionTimeline } from "@/lib/veloxpay/store";

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, { params }: Params) {
  const { id } = await params;
  const timeline = await getTransactionTimeline(id);
  return NextResponse.json({ transactionId: id, events: timeline });
}
