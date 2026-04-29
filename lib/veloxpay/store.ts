import { db } from "@/lib/db";
import { CreatePaymentRequest, PaymentStatus, Transaction } from "@/lib/veloxpay/types";

export async function createTransaction(input: CreatePaymentRequest, merchantId: string) {
  const reference = input.reference ?? `VPX_${Date.now()}`;

  const tx = await db.transaction.create({
    data: {
      reference,
      amount: input.amount,
      currency: input.currency,
      method: input.method,
      provider: input.provider,
      status: "pending",
      merchantId,
      callbackUrl: input.callbackUrl,
      metadata: input.metadata,
    },
  });
  await db.transactionEvent.create({
    data: {
      transactionId: tx.id,
      type: "transaction.created",
      detail: `Payment initialized via ${input.provider}.`,
    },
  });

  return mapTransaction(tx);
}

export async function getTransaction(id: string) {
  const tx = await db.transaction.findUnique({ where: { id } });
  return tx ? mapTransaction(tx) : null;
}

export async function setTransactionStatus(id: string, status: PaymentStatus) {
  const tx = await db.transaction.findUnique({ where: { id } });
  if (!tx) return null;

  const updated = await db.transaction.update({
    where: { id },
    data: { status },
  });
  await db.transactionEvent.create({
    data: {
      transactionId: id,
      type: "transaction.status_updated",
      detail: `Status changed to ${status}.`,
    },
  });

  return mapTransaction(updated);
}

export async function getTransactionTimeline(id: string) {
  return db.transactionEvent.findMany({
    where: { transactionId: id },
    orderBy: { createdAt: "asc" },
  });
}

type DbTransaction = Awaited<ReturnType<typeof db.transaction.findUnique>>;

function mapTransaction(tx: NonNullable<DbTransaction>): Transaction {
  return {
    id: tx.id,
    reference: tx.reference,
    amount: tx.amount,
    currency: tx.currency as "ZMW",
    method: tx.method as Transaction["method"],
    provider: tx.provider as Transaction["provider"],
    status: tx.status as PaymentStatus,
    merchantId: tx.merchantId,
    callbackUrl: tx.callbackUrl ?? undefined,
    metadata:
      tx.metadata && typeof tx.metadata === "object"
        ? (tx.metadata as Record<string, string | number | boolean>)
        : undefined,
    createdAt: tx.createdAt.toISOString(),
    updatedAt: tx.updatedAt.toISOString(),
  };
}
