'use client';

export default function HowItWorks() {
  const steps = [
    {
      num: 1,
      title: 'Merchant Initiates',
      description: 'Send a payment request via API',
      code: `POST /api/v1/transactions/initiate
{
  "amount": 50000,
  "payerPhone": "+260976543210",
  "paymentMethod": "mtn_momo"
}

→ Returns transactionId + expiryTime`,
    },
    {
      num: 2,
      title: 'Customer Authorizes',
      description: 'Customer receives USSD prompt, enters PIN',
      code: `Customer receives USSD prompt:
*555# → Enter PIN on their phone
veloxpay polls mtn api

→ Real-time status via webhook`,
    },
    {
      num: 3,
      title: 'Settlement',
      description: 'Money lands in your account next day',
      code: `Transaction completes
veloxpay batches & settles
Money lands in your account (T+1)

→ Dashboard shows full audit trail`,
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-b border-line">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">How It Works</h2>
        <p className="text-secondary mb-16 max-w-2xl">Three simple steps to start accepting payments.</p>

        {/* Vertical Staggered Steps */}
        <div className="relative">
          {/* Vertical Connector Line */}
          <div className="hidden lg:block absolute left-20 top-0 bottom-0 w-px bg-border-line" />

          <div className="space-y-12 lg:space-y-16">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16"
                style={{
                  animation: `slideInUp 0.6s ease-out ${0.2 + idx * 0.2}s both`,
                }}
              >
                {/* Step Number */}
                <div className="flex items-start">
                  <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-accent-lime text-black font-bold text-xl border border-accent-lime">
                    {step.num}
                  </div>
                </div>

                {/* Text Content */}
                <div className="lg:col-span-1">
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-secondary">{step.description}</p>
                </div>

                {/* Code Block */}
                <div className="lg:col-span-1 border border-line bg-bg-secondary/50">
                  <div className="p-4 font-mono text-sm leading-relaxed text-accent-lime whitespace-pre-wrap break-words overflow-x-auto">
                    {step.code}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Integration Summary */}
        <div className="mt-20 pt-12 border-t border-line grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="border border-line p-6 bg-bg-secondary/30">
            <p className="font-mono text-xs uppercase tracking-widest text-secondary mb-3">Setup Time</p>
            <p className="text-3xl font-bold text-accent-lime">5 min</p>
            <p className="text-sm text-secondary mt-2">From signup to first payment</p>
          </div>
          <div className="border border-line p-6 bg-bg-secondary/30">
            <p className="font-mono text-xs uppercase tracking-widest text-secondary mb-3">Time to Settlement</p>
            <p className="text-3xl font-bold text-accent-lime">T+1</p>
            <p className="text-sm text-secondary mt-2">Next business day</p>
          </div>
          <div className="border border-line p-6 bg-bg-secondary/30">
            <p className="font-mono text-xs uppercase tracking-widest text-secondary mb-3">API Endpoints</p>
            <p className="text-3xl font-bold text-accent-lime">14</p>
            <p className="text-sm text-secondary mt-2">Full payment lifecycle</p>
          </div>
        </div>
      </div>
    </section>
  );
}
