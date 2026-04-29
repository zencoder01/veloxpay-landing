'use client';

export default function Hero() {
  return (
    <section className="pt-32 pb-16 px-8 border-b border-[#1e293b]">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-mono">
          Payments for startups
          <br />
          that move fast
        </h1>

        <p className="text-[#cbd5e1] max-w-2xl mb-8">
          VeloxPay connects your zambian business to mtn, airtel, and visa in
          one api. built in lusaka. trusted by 500+ startups.
        </p>

        {/* CTAs */}
        <div className="flex gap-3 mb-16">
          <button className="btn-primary">Create Account</button>
          <button className="btn-secondary">View Docs</button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Monthly Volume", value: "50M+ ZMW" },
            { label: "Uptime", value: "99.98%" },
            { label: "Processing", value: "<5s" },
            { label: "Settlement", value: "T+1" },
          ].map((stat, i) => (
            <div key={i} className="border border-[#1e293b] p-6">
              <p className="text-[#94a3b8] text-xs uppercase tracking-wide mb-2">
                {stat.label}
              </p>
              <p className="text-[#00ff00] text-2xl font-bold font-mono">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
