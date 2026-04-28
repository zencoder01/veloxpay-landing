'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

export default function Hero({ onWaitlistClick }: { onWaitlistClick: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState([
    { label: 'Monthly Volume', value: 0, target: 50, unit: 'M+ ZMW' },
    { label: 'Uptime', value: 0, target: 99.98, unit: '%' },
    { label: 'Processing Speed', value: 0, target: 5, unit: 's (avg)' },
    { label: 'Settlement', value: 0, target: 1, unit: 'T+1' },
  ]);

  useEffect(() => {
    setMounted(true);
    // Animate stats on mount
    stats.forEach((stat, idx) => {
      if (stat.value === 0) {
        const timer = setTimeout(() => {
          setStats(prev => {
            const updated = [...prev];
            updated[idx].value = updated[idx].target;
            return updated;
          });
        }, 200 + idx * 100);
        return () => clearTimeout(timer);
      }
    });
  }, []);

  return (
    <section className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 border-b border-line">
      <div className="max-w-7xl mx-auto">
        {/* Asymmetric Grid: 60% text, 40% visual */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          {/* Left: Text (60%) */}
          <div className="lg:col-span-3" style={{ animation: mounted ? 'slideInUp 0.6s ease-out' : 'none' }}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tighter">
              Payments for Startups That Move Fast
            </h1>
            
            <p className="text-lg sm:text-xl text-secondary mb-8 leading-relaxed max-w-2xl">
              veloxpay connects your zambian business to mtn, airtel, and visa in one api. built in lusaka. trusted by 500+ startups.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={onWaitlistClick}
                className="px-8 py-4 bg-accent-lime text-black font-bold text-lg border border-accent-lime hover:bg-yellow-300 transition-all transform hover:shadow-lg"
              >
                Create Free Account <ArrowRight className="inline ml-2" size={20} />
              </button>
              <button
                onClick={onWaitlistClick}
                className="px-8 py-4 bg-transparent text-accent-lime border border-accent-lime font-bold text-lg hover:bg-accent-lime hover:text-black transition-all"
              >
                View API Docs
              </button>
            </div>

            <p className="text-xs uppercase tracking-widest text-secondary font-mono">
              ↓ scroll to explore
            </p>
          </div>

          {/* Right: Status Box & Stats (40%) */}
          <div className="lg:col-span-2 space-y-8" style={{ animation: mounted ? 'slideInRight 0.6s ease-out 0.2s both' : 'none' }}>
            {/* Processor Status */}
            <div className="border border-line p-6 bg-secondary/5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm uppercase tracking-widest font-mono text-secondary">Status</span>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-accent-lime rounded-full animate-pulse" />
                  <span className="text-xs font-mono text-accent-lime">live</span>
                </div>
              </div>
              
              <div className="space-y-3">
                {['MTN Mobile Money', 'Airtel Money', 'Visa/Mastercard'].map((service, idx) => (
                  <div key={service} className="flex items-center justify-between text-sm">
                    <span className="font-mono">{service}</span>
                    <CheckCircle size={16} className="text-accent-lime" />
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-line">
                <p className="text-xs uppercase tracking-widest font-mono text-secondary mb-3">Response Time</p>
                <div className="bg-bg-secondary/50 p-3 font-mono text-xs text-accent-lime">
                  avg: 156ms (↓ from 234ms)
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="border border-line p-4 bg-bg-secondary/30"
                  style={{
                    animation: mounted ? `slideInUp 0.6s ease-out ${0.4 + idx * 0.1}s both` : 'none',
                  }}
                >
                  <p className="text-xs uppercase tracking-widest font-mono text-secondary mb-2">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-accent-lime font-mono">
                    {Math.round(stat.value * 100) / 100}
                  </p>
                  <p className="text-xs text-secondary font-mono mt-1">{stat.unit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
