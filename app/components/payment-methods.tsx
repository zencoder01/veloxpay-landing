'use client';

import { useState } from 'react';
import { Smartphone, CreditCard, TrendingUp } from 'lucide-react';

export default function PaymentMethods() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const methods = [
    {
      name: 'MTN Mobile Money',
      icon: Smartphone,
      fee: '1.5%',
      time: '< 30s',
      success: '99.5%',
      volume: '40M+ ZMW/month',
      integration: 'Easy',
      color: 'mtn-orange',
    },
    {
      name: 'Airtel Money',
      icon: Smartphone,
      fee: '1.8%',
      time: '< 45s',
      success: '98.8%',
      volume: '8M+ ZMW/month',
      integration: 'Easy',
      color: 'airtel-red',
    },
    {
      name: 'Visa / Mastercard',
      icon: CreditCard,
      fee: '2.5%',
      time: '< 5s',
      success: '99.9%',
      volume: '2M+ ZMW/month',
      integration: 'Medium',
      color: 'accent-lime',
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-b border-line">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">Payment Methods</h2>
        <p className="text-secondary mb-16 max-w-2xl">
          Support every payment method your customers use.
        </p>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {methods.map((method, idx) => {
            const Icon = method.icon;
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={idx}
                className="border border-line p-8 bg-bg-secondary/30 transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                  borderColor: isHovered ? 'var(--color-accent-lime)' : 'var(--color-border)',
                  boxShadow: isHovered ? '0 0 20px rgba(0, 255, 0, 0.1)' : 'none',
                }}
              >
                {/* Icon */}
                <div className="mb-6">
                  <Icon size={48} className="text-accent-lime" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-6">{method.name}</h3>

                {/* Stats Grid */}
                <div className="space-y-4 mb-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-widest font-mono text-secondary">Fee</p>
                      <p className="text-lg font-bold text-accent-lime mt-1">{method.fee}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest font-mono text-secondary">Processing</p>
                      <p className="text-lg font-bold text-accent-lime mt-1">{method.time}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest font-mono text-secondary">Success Rate</p>
                      <p className="text-lg font-bold text-accent-lime mt-1">{method.success}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest font-mono text-secondary">Integration</p>
                      <p className="text-lg font-bold text-accent-lime mt-1">{method.integration}</p>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="border-t border-line pt-4">
                  <p className="text-sm text-secondary font-mono">Monthly Volume</p>
                  <p className="text-lg font-bold mt-2 text-accent-lime">{method.volume}</p>
                </div>

                {/* Expanded Details */}
                {isHovered && (
                  <div className="mt-6 pt-6 border-t border-line animate-slideInUp">
                    <p className="text-xs uppercase tracking-widest font-mono text-secondary mb-3">Documentation</p>
                    <p className="text-sm text-accent-lime cursor-pointer hover:underline">
                      View API Docs →
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Feature Comparison Summary */}
        <div className="mt-16 pt-12 border-t border-line">
          <p className="text-sm uppercase tracking-widest font-mono text-secondary mb-6">
            All Methods Include
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              'Real-time webhooks',
              'Instant settlement batching',
              '24/7 monitoring',
              'Fallback routing',
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent-lime" />
                <p className="text-sm">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
