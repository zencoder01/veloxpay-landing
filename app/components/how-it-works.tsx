'use client';

import { UserPlus, Link2, Zap } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: UserPlus,
      title: 'Create your VeloxPay account',
      description: 'Sign up in minutes with just your business details. No lengthy verification process.',
    },
    {
      number: '02',
      icon: Link2,
      title: 'Connect your business',
      description: 'Verify your business information and set up your payment methods.',
    },
    {
      number: '03',
      icon: Zap,
      title: 'Start collecting payments',
      description: 'Integrate the API or use our dashboard to accept payments immediately.',
    },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-[#1a2847] to-[#0f1629] py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            How it works
          </h2>
          <p className="text-gray-400 text-lg">
            Get started in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="relative">
                {/* Connector line */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-24 left-1/2 w-1/2 h-0.5 bg-gradient-to-r from-cyan-500/50 to-transparent -ml-1/2 -mr-1/2" />
                )}

                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Number circle */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-green-500/20 border-2 border-cyan-500/50 flex items-center justify-center mb-6">
                    <span className="text-2xl font-bold text-cyan-400">{step.number}</span>
                  </div>

                  {/* Icon */}
                  <Icon className="w-8 h-8 text-green-400 mb-4" />

                  {/* Content */}
                  <h3 className="text-white font-semibold text-xl mb-3">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
