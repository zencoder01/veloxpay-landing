import { randomUUID } from "node:crypto";
import { CreatePaymentRequest, PaymentStatus, Transaction } from "@/lib/veloxpay/types";

const transactions = new Map<string, Transaction>();

export function createTransaction(input: CreatePaymentRequest, merchantId: string) {
  const now = new Date().toISOString();
  const id = randomUUID();
  const reference = input.reference ?? `VPX_${Date.now()}`;

  const transaction: Transaction = {
    id,
    reference,
    amount: input.amount,
    currency: input.currency,
    method: input.method,
    provider: input.provider,
    status: "pending",
    merchantId,
    callbackUrl: input.callbackUrl,
    metadata: input.metadata,
    createdAt: now,
    updatedAt: now,
  };

  transactions.set(id, transaction);
  return transaction;
}

export function getTransaction(id: string) {
  return transactions.get(id) ?? null;
}

export function setTransactionStatus(id: string, status: PaymentStatus) {
  const current = transactions.get(id);
  if (!current) return null;
  const updated: Transaction = {
    ...current,
    status,
    updatedAt: new Date().toISOString(),
  };
  transactions.set(id, updated);
  return updated;
}
