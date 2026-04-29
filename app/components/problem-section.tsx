'use client';

export default function ProblemSection() {
  return (
    <section className="px-8 py-16 border-b border-[#1e293b]">
      <div className="max-w-[700px] mx-auto">
        <h2 className="font-mono">Why veloxpay exists</h2>

        <div className="space-y-6 text-[#cbd5e1]">
          <p>
            Zambian startups have a payment problem.
          </p>

          <p>
            Your customers use mtn momo and airtel money. But payment gateways
            treat africa like an afterthought. Stripe takes weeks. Flutterwave
            doesn't integrate with local networks. Generic solutions cost you
            3-5% in fees + integration headaches.
          </p>

          <p>
            VeloxPay is different. We built for zambia first. Western
            integrations came second.
          </p>
        </div>
      </div>
    </section>
  );
}
