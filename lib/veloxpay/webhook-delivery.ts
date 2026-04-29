import { db } from "@/lib/db";

export async function createWebhookDelivery(input: {
  transactionId: string;
  callbackUrl: string;
  payload: object;
}) {
  return db.webhookDelivery.create({
    data: {
      transactionId: input.transactionId,
      callbackUrl: input.callbackUrl,
      payload: input.payload,
      status: "pending",
      nextAttemptAt: new Date(),
    },
  });
}

export async function processPendingWebhookDeliveries(limit = 20) {
  const now = new Date();
  const deliveries = await db.webhookDelivery.findMany({
    where: {
      status: { in: ["pending", "retrying"] },
      OR: [{ nextAttemptAt: null }, { nextAttemptAt: { lte: now } }],
    },
    orderBy: { createdAt: "asc" },
    take: limit,
  });

  for (const delivery of deliveries) {
    try {
      const res = await fetch(delivery.callbackUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(delivery.payload),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      await db.webhookDelivery.update({
        where: { id: delivery.id },
        data: {
          status: "delivered",
          attemptCount: delivery.attemptCount + 1,
          deliveredAt: new Date(),
          nextAttemptAt: null,
          lastError: null,
        },
      });
    } catch (err) {
      const attempts = delivery.attemptCount + 1;
      const exhausted = attempts >= 5;
      await db.webhookDelivery.update({
        where: { id: delivery.id },
        data: {
          status: exhausted ? "failed" : "retrying",
          attemptCount: attempts,
          lastError: err instanceof Error ? err.message : "unknown error",
          nextAttemptAt: exhausted ? null : new Date(Date.now() + attempts * 60_000),
        },
      });
    }
  }

  return deliveries.length;
}
