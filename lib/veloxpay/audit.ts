import { db } from "@/lib/db";

export async function writeAuditLog(input: {
  merchantId: string;
  actor: string;
  action: string;
  target?: string;
  metadata?: Record<string, string | number | boolean>;
}) {
  return db.auditLog.create({
    data: {
      merchantId: input.merchantId,
      actor: input.actor,
      action: input.action,
      target: input.target,
      metadata: input.metadata,
    },
  });
}

export async function listAuditLogs(merchantId: string, limit = 50) {
  return db.auditLog.findMany({
    where: { merchantId },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}
