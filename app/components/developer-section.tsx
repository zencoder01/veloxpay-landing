'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function DeveloperSection() {
  const [copied, setCopied] = useState(false);

  const codeSnippet = `import { veloxpay } from '@veloxpay/sdk';

const client = veloxpay.createClient({
  apiKey: 'pk_live_abc123',
  apiSecret: 'sk_live_secret',
});

const payment = await client.transactions.initiate({
  reference: 'order_12345',
  amount: 50000,
  paymentMethod: 'mtn_momo',
  payerPhone: '+260976543210',
  metadata: { userId: 'user_123' },
});

console.log(\`Transaction: \${payment.transactionId}\`);
// > Transaction: txn_abc123xyz`;

  const terminalOutput = `✓ Transaction created (txn_abc123xyz)
✓ Customer USSD prompt sent
✓ Webhook registered
⏳ Awaiting customer authorization...
✓ Payment completed (+260976543210)
✓ Settlement batch ready (T+1 23:00 UTC)`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-b border-line">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">Developer-First</h2>
        <p className="text-secondary mb-16 max-w-2xl">
          Integrate in minutes. Real code. Real output.
        </p>

        {/* Split Screen: Code + Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Code Block */}
          <div
            className="border border-line bg-black/40"
            style={{ animation: 'slideInLeft 0.6s ease-out 0.2s both' }}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-line bg-bg-secondary/50">
              <span className="text-xs uppercase tracking-widest font-mono text-secondary">
                typescript
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 text-accent-lime hover:text-yellow-300 text-xs uppercase tracking-widest font-mono transition-colors"
              >
                {copied ? (
                  <>
                    <Check size={16} /> Copied
                  </>
                ) : (
                  <>
                    <Copy size={16} /> Copy
                  </>
                )}
              </button>
            </div>

            <pre className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
              <code className="text-accent-lime whitespace-pre-wrap break-words">
                {codeSnippet}
              </code>
            </pre>
          </div>

          {/* Terminal Output */}
          <div
            className="border border-line bg-black/40"
            style={{ animation: 'slideInRight 0.6s ease-out 0.2s both' }}
          >
            <div className="px-6 py-4 border-b border-line bg-bg-secondary/50">
              <span className="text-xs uppercase tracking-widest font-mono text-secondary">
                Terminal Output
              </span>
            </div>

            <pre className="p-6 font-mono text-sm leading-relaxed">
              <code className="text-accent-lime">
                {terminalOutput}
              </code>
            </pre>
          </div>
        </div>

        {/* Integration Stats */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="border border-line p-6 bg-bg-secondary/30">
            <p className="text-xs uppercase tracking-widest font-mono text-secondary mb-3">
              Time to Integrate
            </p>
            <p className="text-3xl font-bold text-accent-lime">5 min</p>
            <p className="text-sm text-secondary mt-2">From npm install to first payment</p>
          </div>

          <div className="border border-line p-6 bg-bg-secondary/30">
            <p className="text-xs uppercase tracking-widest font-mono text-secondary mb-3">
              API Endpoints
            </p>
            <p className="text-3xl font-bold text-accent-lime">14</p>
            <p className="text-sm text-secondary mt-2">Transactions, webhooks, settlements</p>
          </div>

          <div className="border border-line p-6 bg-bg-secondary/30">
            <p className="text-xs uppercase tracking-widest font-mono text-secondary mb-3">
              SDKs
            </p>
            <p className="text-3xl font-bold text-accent-lime">5+</p>
            <p className="text-sm text-secondary mt-2">Node, Python, Go, PHP, Ruby</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <a
            href="#"
            className="px-8 py-4 border border-accent-lime text-accent-lime font-bold hover:bg-accent-lime hover:text-black transition-all text-center"
          >
            View Full API Docs
          </a>
          <a
            href="#"
            className="px-8 py-4 border border-line text-secondary hover:border-accent-lime hover:text-accent-lime transition-all text-center"
          >
            GitHub Repo
          </a>
          <a
            href="#"
            className="px-8 py-4 border border-line text-secondary hover:border-accent-lime hover:text-accent-lime transition-all text-center"
          >
            Postman Collection
          </a>
        </div>
      </div>
    </section>
  );
}
