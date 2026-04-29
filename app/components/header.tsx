'use client';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-[#0a0e27] border-b border-[#1e293b] z-50">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="font-mono text-lg font-bold">
          <span className="text-[#00ff00]">VELOX</span>
          <span className="text-[#e2e8f0]">PAY</span>
        </div>

        {/* CTA Button */}
        <button className="btn-primary">Get Started</button>
      </div>
    </header>
  );
}
