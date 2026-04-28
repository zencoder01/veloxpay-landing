'use client';

import { ArrowRight } from 'lucide-react';

interface WaitlistCTAProps {
  onWaitlistClick: () => void;
}

export default function WaitlistCTA({ onWaitlistClick }: WaitlistCTAProps) {
  return (
    <section className="w-full bg-gradient-to-r from-[#0f1629] via-[#1a2847] to-[#0f1629] py-20 sm:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
          Start collecting payments the smarter way
        </h2>
        <p className="text-xl text-gray-400 mb-12">
          Join hundreds of Zambian startups building with VeloxPay
        </p>

        <button
          onClick={onWaitlistClick}
          className="group px-10 py-4 bg-gradient-to-r from-green-400 to-cyan-400 text-[#0f1629] font-semibold rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 inline-flex items-center gap-3 text-lg"
        >
          Join the VeloxPay waitlist
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}
