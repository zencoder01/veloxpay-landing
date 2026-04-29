'use client';

export default function IntegrationExample() {
  return (
    <section className="px-8 py-16 border-b border-[#1e293b]">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-mono mb-12">Simple integration</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Code Block */}
          <div>
            <p className="text-xs uppercase tracking-widest text-[#94a3b8] mb-3">
              Code
            </p>
            <pre className="bg-[#151b3d] border border-[#1e293b] p-4 overflow-x-auto text-xs font-mono text-[#e2e8f0]">
{`const client = veloxpay.createClient()
const payment = await client.transactions.initiate({
  reference: "order_12345",
  amount: 50000,
  paymentMethod: "mtn_momo",
  payerPhone: "+260976543210"
})`}
            </pre>
          </div>

          {/* Response Block */}
          <div>
            <p className="text-xs uppercase tracking-widest text-[#94a3b8] mb-3">
              Response
            </p>
            <pre className="bg-[#151b3d] border border-[#1e293b] p-4 overflow-x-auto text-xs font-mono text-[#e2e8f0]">
{`✓ Transaction created
> txn_abc123xyz
✓ USSD sent
> customer prompt active
✓ Webhook ready
> awaiting completion
✓ Payment completed
> 2024-04-29T10:15:30Z`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
