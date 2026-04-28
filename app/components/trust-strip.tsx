'use client';

import { Smartphone, CreditCard, Code2, Zap, MapPin } from 'lucide-react';

export default function TrustStrip() {
  const items = [
    { icon: Smartphone, label: 'Mobile Money', color: 'text-cyan-400' },
    { icon: CreditCard, label: 'Card Payments', color: 'text-green-400' },
    { icon: Code2, label: 'Developer API', color: 'text-cyan-400' },
    { icon: Zap, label: 'Fast Settlements', color: 'text-green-400' },
    { icon: MapPin, label: 'Built for Zambia', color: 'text-cyan-400' },
  ];

  return (
    <section className="w-full bg-gradient-to-r from-[#0f1629] to-[#1a2847] border-y border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex flex-col items-center gap-3 text-center">
                <Icon className={`w-8 h-8 ${item.color}`} />
                <p className="text-gray-300 text-sm font-medium">{item.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
