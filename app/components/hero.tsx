'use client';

import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onWaitlistClick: () => void;
}

export default function Hero({ onWaitlistClick }: HeroProps) {
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-[#0f1629] via-[#1a2847] to-[#0f1629] text-white overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl -ml-48 -mb-48" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-32 pb-20 sm:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="flex flex-col space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                Payments built for{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                  Zambian startups
                </span>
              </h1>
            </div>

            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-xl">
              VeloxPay helps you collect mobile money and card payments from your customers with a simple, developer-friendly gateway.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={onWaitlistClick}
                className="group px-8 py-3 sm:py-4 bg-gradient-to-r from-green-400 to-cyan-400 text-[#0f1629] font-semibold rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Join the waitlist
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="#developer"
                className="px-8 py-3 sm:py-4 border-2 border-gray-600 text-white font-semibold rounded-lg hover:border-cyan-400 hover:text-cyan-400 transition-colors duration-300 text-center"
              >
                View docs
              </a>
            </div>
          </div>

          {/* Right side - Dashboard mockup */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative">
              {/* Card mockup */}
              <div className="absolute -inset-8 bg-gradient-to-r from-cyan-500/20 to-green-500/20 rounded-3xl blur-2xl opacity-50" />
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 sm:p-8 border border-gray-700 shadow-2xl w-full max-w-md">
                {/* Mock payment dashboard */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-semibold">Recent Transactions</h3>
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    </div>
                  </div>

                  {/* Mock transactions */}
                  {[
                    { name: 'MTN Mobile Money', amount: '₩ 5,000', icon: '📱' },
                    { name: 'Card Payment', amount: '₩ 12,500', icon: '💳' },
                    { name: 'Airtel Money', amount: '₩ 3,200', icon: '📱' },
                  ].map((tx, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/80 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{tx.icon}</span>
                        <div>
                          <p className="text-white text-sm font-medium">{tx.name}</p>
                          <p className="text-gray-400 text-xs">Just now</p>
                        </div>
                      </div>
                      <p className="text-green-400 font-semibold">{tx.amount}</p>
                    </div>
                  ))}
                </div>

                {/* Balance card */}
                <div className="mt-6 p-4 bg-gradient-to-br from-green-500/10 to-cyan-500/10 rounded-lg border border-green-500/30">
                  <p className="text-gray-400 text-xs mb-1">Available Balance</p>
                  <p className="text-white text-2xl font-bold">₩ 125,400</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
