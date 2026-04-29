'use client';

export default function FAQ() {
  const faqs = [
    {
      question: "How long does integration take?",
      answer:
        "5-10 minutes. Get API keys, read the docs, make one API call. That's it.",
    },
    {
      question: "What happens if MTN API is down?",
      answer:
        "Fallback to Airtel. Automatic retry logic with exponential backoff. You get real-time status updates. No silent failures.",
    },
    {
      question: "Can I use this for subscriptions?",
      answer:
        "Yes. Full recurring billing support. Set it and forget it. Automatic retries for failed charges.",
    },
    {
      question: "What are your fees?",
      answer:
        "MTN: 1.5% | Airtel: 1.8% | Card: 2.5%. No hidden fees. No minimums. No monthly charges.",
    },
    {
      question: "Is my data secure?",
      answer:
        "PCI-DSS Level 1 compliant. AES-256 encryption. TLS 1.3 for all traffic. No raw card data stored. Ever.",
    },
  ];

  return (
    <section className="px-8 py-16 border-b border-[#1e293b]">
      <div className="max-w-[700px] mx-auto">
        <h2 className="font-mono mb-12">Questions</h2>

        <div className="space-y-0">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="border border-[#1e293b] border-t-0 first:border-t"
            >
              <summary className="p-6 cursor-pointer font-bold font-mono text-[#e2e8f0] hover:bg-[#151b3d] transition-colors duration-200">
                {faq.question}
              </summary>
              <div className="px-6 pb-6 text-[#cbd5e1] border-t border-[#1e293b]">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
