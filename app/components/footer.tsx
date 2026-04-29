'use client';

export default function Footer() {
  const links = {
    product: [
      { label: "Pricing", href: "#" },
      { label: "API Docs", href: "#" },
      { label: "Status", href: "#" },
    ],
    company: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
    ],
    legal: [
      { label: "Terms", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Security", href: "#" },
    ],
    social: [
      { label: "Twitter", href: "#" },
      { label: "GitHub", href: "#" },
      { label: "LinkedIn", href: "#" },
    ],
  };

  return (
    <footer className="bg-[#151b3d] border-t border-[#1e293b] px-8 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-xs uppercase tracking-widest font-bold text-[#e2e8f0] mb-4 font-mono">
                {category}
              </h3>
              <ul className="space-y-3">
                {items.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="text-[#94a3b8] hover:text-[#e2e8f0] text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[#1e293b] pt-8">
          <p className="text-center text-[#94a3b8] text-sm">
            © 2024 veloxpay. built in zambia.
          </p>
        </div>
      </div>
    </footer>
  );
}
