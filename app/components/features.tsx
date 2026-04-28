'use client';

import { Smartphone, CreditCard, Code2, Clock, TrendingUp, Lock } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Smartphone,
      title: 'Mobile Money Collections',
      description: 'Accept payments from MTN, Airtel, and Zamtel directly into your business account.',
    },
    {
      icon: CreditCard,
      title: 'Card Payment Acceptance',
      description: 'Support local and international card payments with seamless integration.',
    },
    {
      icon: Code2,
      title: 'Simple API Integration',
      description: 'Developer-friendly API with clear documentation and quick implementation.',
    },
    {
      icon: Clock,
      title: 'Real-time Payment Status',
      description: 'Get instant notifications and updates on all incoming transactions.',
    },
    {
      icon: TrendingUp,
      title: 'Startup-Friendly Pricing',
      description: 'Transparent pricing with no hidden fees or complicated payment structures.',
    },
    {
      icon: Lock,
      title: 'Secure Transactions',
      description: 'Bank-level security and encryption for all payments and customer data.',
    },
  ];

  return (
    <section className="w-full bg-[#0f1629] py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Everything you need to collect payments
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Built specifically for Zambian businesses, with all the features you need to grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group p-8 bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-xl border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
              >
                <div className="mb-4">
                  <Icon className="w-10 h-10 text-cyan-400 group-hover:text-green-400 transition-colors" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
