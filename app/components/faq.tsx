'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqs = [
    {
      q: 'How long does it take to integrate?',
      a: 'You can be live in 5 minutes. Sign up, get your API keys, run the integration example. Most developers are processing real payments the same day.',
    },
    {
      q: 'What happens if MTN API is down?',
      a: 'We have redundancy built in. If MTN times out, we automatically route to Airtel or card. Your customers never see a failed payment—only fallback options.',
    },
    {
      q: "Can I use this for subscriptions?",
      a: 'Yes. Use our recurring endpoint. We handle retries, failed payments, and renewal notifications. Full webhook support for subscription events.',
    },
    {
      q: 'What are your fees?',
      a: 'Transparent, no surprises. MTN: 1.5% | Airtel: 1.8% | Cards: 2.5%. No gateway fees, no setup fees, no monthly minimums. You only pay per transaction.',
    },
    {
      q: 'Do you support other African countries?',
      a: "We launch in Tanzania & Kenya Q3 2024. We're building for Africa first. If you need early access for another country, email us at support@veloxpay.co.zm",
    },
    {
      q: 'Is my data secure?',
      a: 'PCI-DSS Level 1 compliant. 256-bit AES encryption. Bank-grade security. We never store full card details. ISO 27001 certified.',
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-b border-line">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">Common Questions</h2>
        <p className="text-secondary mb-12">Answers to what every developer asks.</p>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-line bg-bg-secondary/30">
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-bg-secondary/50 transition-colors text-left"
              >
                <span className="font-bold text-lg">{faq.q}</span>
                <ChevronDown
                  size={20}
                  className="text-accent-lime transition-transform duration-300"
                  style={{
                    transform: openIdx === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </button>

              {openIdx === idx && (
                <div className="px-6 py-4 border-t border-line bg-black/20">
                  <p className="text-secondary leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-16 border border-line p-8 bg-bg-secondary/30 text-center">
          <p className="text-lg mb-4">Still have questions?</p>
          <p className="text-secondary mb-6">
            Our team in Lusaka responds within 2 hours. Email us or schedule a call.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@veloxpay.co.zm"
              className="px-8 py-3 border border-accent-lime text-accent-lime hover:bg-accent-lime hover:text-black transition-all font-bold"
            >
              Email Support
            </a>
            <a
              href="#"
              className="px-8 py-3 border border-line text-secondary hover:border-accent-lime hover:text-accent-lime transition-all font-bold"
            >
              Schedule Call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
