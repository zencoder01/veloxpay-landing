'use client';

import { Check } from 'lucide-react';

interface PricingProps {
  onRequestAccess: () => void;
}

export default function Pricing({ onRequestAccess }: PricingProps) {
  return (
    <section className="w-full bg-[#0f1629] py-20 sm:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
          Simple pricing for growing startups
        </h2>
        <p className="text-xl text-gray-400 mb-12">
          No heavy setup. No confusing fees.
        </p>

        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl border border-gray-700/50 p-8 sm:p-12 space-y-8">
          <div className="space-y-6">
            {[
              'Transparent, per-transaction pricing',
              'No monthly minimums or hidden charges',
              'Same rates for everyone - no volume tiers',
              'Instant settlements to your account',
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-4 justify-center">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-gray-300 text-lg">{feature}</span>
              </div>
            ))}
          </div>

          <button
            onClick={onRequestAccess}
            className="mt-8 px-8 py-4 bg-gradient-to-r from-green-400 to-cyan-400 text-[#0f1629] font-semibold rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 text-lg"
          >
            Request early access
          </button>
        </div>
      </div>
    </section>
  );
}
