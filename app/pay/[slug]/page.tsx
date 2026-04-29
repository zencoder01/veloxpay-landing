import { notFound } from "next/navigation";
import HostedCheckout from "@/components/landing/hosted-checkout";
import { getPaymentLinkBySlug } from "@/lib/veloxpay/payment-links";

type Params = {
  params: Promise<{ slug: string }>;
};

export default async function PayPage({ params }: Params) {
  const { slug } = await params;
  const link = await getPaymentLinkBySlug(slug);
  if (!link || !link.active) notFound();

  return (
    <HostedCheckout
      slug={link.slug}
      title={link.title}
      amount={link.amount}
      currency={link.currency}
    />
  );
}
