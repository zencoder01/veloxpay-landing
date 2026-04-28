'use client';

import { Store, BarChart3, BookOpen, PenTool, Calendar, RefreshCw } from 'lucide-react';

export default function UseCases() {
  const useCases = [
    { icon: Store, label: 'Online stores', desc: 'Accept payments from customers worldwide' },
    { icon: BarChart3, label: 'SaaS platforms', desc: 'Recurring subscriptions and billing' },
    { icon: BookOpen, label: 'Schools', desc: 'Tuition and fee collections' },
    { icon: PenTool, label: 'Agencies', desc: 'Client invoicing and retainers' },
    { icon: Calendar, label: 'Event organizers', desc: 'Ticket sales and registrations' },
    { icon: RefreshCw, label: 'Subscription businesses', desc: 'Recurring payment management' },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-[#0f1629] to-[#1a2847] py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Use cases
          </h2>
          <p className="text-gray-400 text-lg">
            VeloxPay works for any business that needs to collect payments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, idx) => {
            const Icon = useCase.icon;
            return (
              <div
                key={idx}
                className="group p-6 rounded-xl bg-gray-900/50 border border-gray-700/50 hover:border-green-500/50 transition-all duration-300 hover:bg-gray-800/50"
              >
                <Icon className="w-10 h-10 text-green-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-semibold text-lg mb-2">{useCase.label}</h3>
                <p className="text-gray-400 text-sm">{useCase.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
