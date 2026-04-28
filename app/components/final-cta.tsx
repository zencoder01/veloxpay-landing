'use client';

import { ArrowRight } from 'lucide-react';

export default function FinalCTA({ onWaitlistClick }: { onWaitlistClick: () => void }) {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 border-b border-line">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Start Collecting Payments the Smarter Way
        </h2>

        <p className="text-xl text-secondary mb-12 max-w-2xl mx-auto">
          Join 500+ Zambian startups using veloxpay. API keys in 5 minutes. No credit card required.
        </p>

        {/* Primary CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={onWaitlistClick}
            className="px-12 py-5 bg-accent-lime text-black font-bold text-lg border border-accent-lime hover:bg-yellow-300 transition-all transform hover:shadow-lg"
          >
            Create Free Account <ArrowRight className="inline ml-2" size={20} />
          </button>
          <button
            onClick={onWaitlistClick}
            className="px-12 py-5 bg-transparent text-accent-lime border border-accent-lime font-bold text-lg hover:bg-accent-lime hover:text-black transition-all"
          >
            View Docs
          </button>
        </div>

        {/* Trust badges */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-secondary font-mono">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent-lime rounded-full" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent-lime rounded-full" />
            <span>Live in 5 minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent-lime rounded-full" />
            <span>24/7 Lusaka support</span>
          </div>
        </div>
      </div>
    </section>
  );
}
