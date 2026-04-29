'use client';

export default function PaymentMethods() {
  const methods = [
    {
      name: "MTN Mobile Money",
      fee: "1.5%",
      processing: "2-10s",
      status: "Live",
    },
    {
      name: "Airtel Money",
      fee: "1.8%",
      processing: "2-10s",
      status: "Live",
    },
    {
      name: "Visa / Mastercard",
      fee: "2.5%",
      processing: "1-3s",
      status: "Live",
    },
  ];

  return (
    <section className="px-8 py-16 border-b border-[#1e293b]">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-mono mb-12">Payment methods</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {methods.map((method, i) => (
            <div key={i} className="border border-[#1e293b] p-6">
              <h3 className="text-[#e2e8f0] font-mono font-bold mb-6">
                {method.name}
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#94a3b8] mb-1">
                    Fee
                  </p>
                  <p className="text-[#00ff00] font-bold font-mono">
                    {method.fee}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-[#94a3b8] mb-1">
                    Processing
                  </p>
                  <p className="text-[#e2e8f0] font-mono">
                    {method.processing}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-[#94a3b8] mb-1">
                    Status
                  </p>
                  <p className="text-[#00ff00] font-bold font-mono">
                    <span className="inline-block w-2 h-2 bg-[#00ff00] mr-2"></span>
                    {method.status}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
