'use client';

import { useEffect, useState, useRef } from 'react';

export default function TrustNumbers() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState({
    startups: 0,
    volume: 0,
    transactions: 0,
    uptime: 0,
    processing: 0,
    countries: 0,
    settled: 0,
    integrations: 0,
  });

  const stats = [
    { label: 'Active Startups', value: 500, format: (v: number) => `${v}+` },
    { label: 'Monthly Volume', value: 50, format: (v: number) => `${v}M+ ZMW` },
    { label: 'Transactions Yesterday', value: 12000, format: (v: number) => `${v.toLocaleString()}` },
    { label: 'Uptime (30 days)', value: 99.98, format: (v: number) => `${v}%` },
    { label: 'Avg Processing', value: 5, format: (v: number) => `<${v}s` },
    { label: 'Countries', value: 3, format: (v: number) => `${v}` },
    { label: 'Settled YTD', value: 2, format: (v: number) => `$${v}M+` },
    { label: 'Integrations', value: 14, format: (v: number) => `${v}` },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;

    const duration = 2000; // 2 seconds
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setCounts({
        startups: Math.floor(500 * progress),
        volume: Math.floor(50 * progress),
        transactions: Math.floor(12000 * progress),
        uptime: parseFloat((99.98 * progress).toFixed(2)),
        processing: Math.floor(5 * progress),
        countries: Math.floor(3 * progress),
        settled: Math.floor(2 * progress),
        integrations: Math.floor(14 * progress),
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [visible]);

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 border-b border-line bg-bg-secondary/50"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">Trust Through Numbers</h2>
        <p className="text-secondary mb-16 max-w-2xl">
          Real metrics from real payments infrastructure.
        </p>

        {/* 4x2 Asymmetric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Active Startups (featured, larger) */}
          <div className="sm:col-span-2 lg:col-span-1 border border-line p-8 bg-black/20">
            <p className="text-xs uppercase tracking-widest font-mono text-secondary mb-4">Active Startups</p>
            <p className="text-5xl font-bold text-accent-lime mb-2 font-mono">
              {counts.startups}
            </p>
            <p className="text-sm text-secondary">Using veloxpay today</p>
            <div className="mt-6 h-1 bg-accent-lime/20">
              <div
                className="h-full bg-accent-lime transition-all duration-100"
                style={{ width: `${(counts.startups / 500) * 100}%` }}
              />
            </div>
          </div>

          {/* Card 2: Monthly Volume */}
          <div className="border border-line p-6 bg-black/20">
            <p className="text-xs uppercase tracking-widest font-mono text-secondary mb-3">Monthly Volume</p>
            <p className="text-4xl font-bold text-accent-lime font-mono">
              {counts.volume}M
            </p>
            <p className="text-xs text-secondary mt-2">ZMW processed</p>
          </div>

          {/* Card 3: Transactions Yesterday */}
          <div className="border border-line p-6 bg-black/20">
            <p className="text-xs uppercase tracking-widest font-mono text-secondary mb-3">Yesterday</p>
            <p className="text-4xl font-bold text-accent-lime font-mono">
              {counts.transactions.toLocaleString()}
            </p>
            <p className="text-xs text-secondary mt-2">Transactions</p>
          </div>

          {/* Card 4: Uptime */}
          <div className="border border-line p-6 bg-black/20">
            <p className="text-xs uppercase tracking-widest font-mono text-secondary mb-3">Uptime</p>
            <p className="text-4xl font-bold text-accent-lime font-mono">
              {counts.uptime.toFixed(2)}%
            </p>
            <p className="text-xs text-secondary mt-2">30-day average</p>
          </div>

          {/* Card 5: Processing Speed */}
          <div className="border border-line p-6 bg-black/20">
            <p className="text-xs uppercase tracking-widest font-mono text-secondary mb-3">Avg Processing</p>
            <p className="text-4xl font-bold text-accent-lime font-mono">
              &lt;{counts.processing}s
            </p>
            <p className="text-xs text-secondary mt-2">End-to-end</p>
          </div>

          {/* Card 6: Countries */}
          <div className="border border-line p-6 bg-black/20">
            <p className="text-xs uppercase tracking-widest font-mono text-secondary mb-3">Countries</p>
            <p className="text-4xl font-bold text-accent-lime font-mono">
              {counts.countries}
            </p>
            <p className="text-xs text-secondary mt-2">Expansion incoming</p>
          </div>

          {/* Card 7: Settled YTD */}
          <div className="border border-line p-6 bg-black/20">
            <p className="text-xs uppercase tracking-widest font-mono text-secondary mb-3">Settled YTD</p>
            <p className="text-4xl font-bold text-accent-lime font-mono">
              ${counts.settled}M
            </p>
            <p className="text-xs text-secondary mt-2">To merchant accounts</p>
          </div>

          {/* Card 8: Integrations */}
          <div className="border border-line p-6 bg-black/20">
            <p className="text-xs uppercase tracking-widest font-mono text-secondary mb-3">Integrations</p>
            <p className="text-4xl font-bold text-accent-lime font-mono">
              {counts.integrations}
            </p>
            <p className="text-xs text-secondary mt-2">Full docs</p>
          </div>
        </div>
      </div>
    </section>
  );
}
