'use client';

import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function Developer() {
  const [copied, setCopied] = useState(false);

  const codeSnippet = `// Initialize VeloxPay
import VeloxPay from '@veloxpay/sdk';

const veloxpay = new VeloxPay({
  apiKey: 'pk_live_xxxxxxxxxxxx',
  publicKey: 'pk_pub_xxxxxxxxxxxx'
});

// Create a payment request
const payment = await veloxpay.payments.create({
  amount: 5000,
  currency: 'ZMW',
  description: 'Premium subscription',
  customer: {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+260977123456'
  },
  methods: ['mobile_money', 'card']
});

console.log(payment.checkout_url);`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="developer" className="w-full bg-[#0f1629] py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Built for developers
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Simple, powerful API with excellent documentation. Integrate payments in minutes, not days.
            </p>

            <div className="space-y-4">
              {[
                'RESTful API with webhooks',
                'SDKs for JavaScript, Python, and PHP',
                'Comprehensive error handling',
                'Instant payment notifications',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <p className="text-gray-300">{item}</p>
                </div>
              ))}
            </div>

            <a
              href="#"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
            >
              Read API documentation →
            </a>
          </div>

          {/* Right side - Code snippet */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-green-500/20 rounded-2xl blur-xl opacity-30" />
            <div className="relative bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
              {/* Code editor header */}
              <div className="bg-gray-800 px-6 py-4 flex items-center justify-between border-b border-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-gray-400 text-sm font-mono">payment.js</span>
                <button
                  onClick={copyToClipboard}
                  className="text-gray-400 hover:text-gray-200 transition-colors"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Code content */}
              <div className="p-6 overflow-x-auto max-h-96">
                <pre className="font-mono text-sm text-gray-300 leading-relaxed">
                  <code>
                    {codeSnippet.split('\n').map((line, idx) => (
                      <div key={idx} className="hover:bg-gray-800/50 px-2 transition-colors">
                        <span className="text-gray-600">{String(idx + 1).padStart(2, '0')} </span>
                        {line}
                      </div>
                    ))}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
