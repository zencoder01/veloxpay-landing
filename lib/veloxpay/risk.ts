import { db } from "@/lib/db";

export async function evaluateRisk(input: {
  merchantId: string;
  amount: number;
  customerPhone?: string;
}) {
  const reasons: string[] = [];
  let decision: "allow" | "review" | "block" = "allow";

  if (input.amount > 1_500_000) {
    decision = "review";
    reasons.push("high_amount_threshold");
  }

  const lastMinute = new Date(Date.now() - 60_000);
  const recentCount = await db.transaction.count({
    where: {
      merchantId: input.merchantId,
      createdAt: { gte: lastMinute },
    },
  });
  if (recentCount >= 20) {
    decision = "block";
    reasons.push("velocity_threshold");
  }

  if (input.customerPhone && !input.customerPhone.startsWith("+260")) {
    if (decision === "allow") decision = "review";
    reasons.push("non_zm_phone");
  }

  return { decision, reasons };
}
