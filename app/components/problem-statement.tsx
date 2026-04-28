'use client';

export default function ProblemStatement() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-b border-line bg-bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Large Quote Marks Background */}
          <div className="absolute -top-8 -left-12 text-accent-lime/10 font-bold text-9xl font-mono">
            "
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl font-bold mb-8 leading-tight">
              Why veloxpay Exists
            </h2>

            <div className="space-y-6 text-lg leading-relaxed font-roboto">
              <p>
                Zambian startups have a payment problem.
              </p>

              <p className="text-accent-orange font-bold border-l-4 border-accent-orange pl-6">
                Your customers use mtn momo and airtel money. But payment gateways treat africa like an afterthought. Stripe takes weeks. Flutterwave doesn't integrate with local networks. Generic solutions cost you 3-5% in fees + integration headaches.
              </p>

              <p className="text-accent-lime">
                veloxpay is different. We built for zambia first. Western integrations came second.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 pt-8 border-t border-line">
                <div>
                  <p className="text-sm uppercase tracking-widest font-mono text-secondary mb-3">Problem</p>
                  <ul className="space-y-2 text-accent-orange">
                    <li>• 3-5% fees on every transaction</li>
                    <li>• Weeks to go live</li>
                    <li>• No local network support</li>
                    <li>• Poor customer support</li>
                  </ul>
                </div>

                <div>
                  <p className="text-sm uppercase tracking-widest font-mono text-secondary mb-3">Solution</p>
                  <ul className="space-y-2 text-accent-lime">
                    <li>• 1.5-2.5% transparent fees</li>
                    <li>• Live in 5 minutes</li>
                    <li>• Direct MTN & Airtel integration</li>
                    <li>• Dedicated support (lusaka-based)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Closing Quote Mark */}
          <div className="absolute -bottom-12 -right-12 text-accent-lime/10 font-bold text-9xl font-mono">
            "
          </div>
        </div>
      </div>
    </section>
  );
}
