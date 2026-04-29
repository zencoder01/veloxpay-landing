import { NextResponse } from "next/server";
import { getTransaction } from "@/lib/veloxpay/store";

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, { params }: Params) {
  const { id } = await params;
  const tx = await getTransaction(id);

  if (!tx) {
    return NextResponse.json({ error: "Transaction not found." }, { status: 404 });
  }

  return NextResponse.json(tx);
}
