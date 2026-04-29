'use client';

export default function CTASection() {
  return (
    <section className="px-8 py-24 border-b border-[#1e293b]">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-mono mb-6">Ready to accept payments?</h2>

        <p className="text-[#cbd5e1] mb-8">
          Join zambian startups using veloxpay. api keys in 5 minutes.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="btn-primary">Create Account</button>
          <button className="btn-secondary">View Docs</button>
        </div>
      </div>
    </section>
  );
}
