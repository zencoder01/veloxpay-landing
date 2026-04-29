import { randomBytes } from "node:crypto";
import { db } from "@/lib/db";

export async function createPaymentLink(input: {
  merchantId: string;
  title: string;
  amount: number;
  currency: "ZMW";
}) {
  const slug = `vpl_${randomBytes(6).toString("hex")}`;
  return db.paymentLink.create({
    data: {
      merchantId: input.merchantId,
      title: input.title,
      amount: input.amount,
      currency: input.currency,
      slug,
    },
  });
}

export async function getPaymentLinkBySlug(slug: string) {
  return db.paymentLink.findUnique({ where: { slug } });
}
