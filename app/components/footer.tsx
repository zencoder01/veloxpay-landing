'use client';

import { Share2, ExternalLink, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black/50 border-t border-line">
      {/* Animated Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent-lime to-transparent" />

      <div className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto">
          {/* Top Section: Branding + Newsletter */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-12 pb-12 border-b border-line">
            <div>
              <h3 className="text-2xl font-bold mb-2">veloxpay</h3>
              <p className="text-secondary">
                Fast payments for Zambian startups.
              </p>
              <p className="text-xs text-secondary/60 mt-4 font-mono">
                built in lusaka, trusted globally
              </p>
            </div>

            <div>
              <p className="text-sm uppercase tracking-widest font-mono text-secondary mb-4">
                Join 500+ startups
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 bg-bg-secondary/50 border border-line text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-accent-lime transition-colors"
                />
                <button className="px-6 py-3 bg-accent-lime text-black font-bold border border-accent-lime hover:bg-yellow-300 transition-all">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12 pb-12 border-b border-line">
            <div>
              <p className="text-xs uppercase tracking-widest font-mono text-secondary mb-4">Product</p>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-accent-lime transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent-lime transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent-lime transition-colors">
                    Status
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent-lime transition-colors">
                    Roadmap
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest font-mono text-secondary mb-4">Developer</p>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-accent-lime transition-colors">
                    API Docs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent-lime transition-colors">
                    SDKs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent-lime transition-colors">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent-lime transition-colors">
                    Postman
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest font-mono text-secondary mb-4">Company</p>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-accent-lime transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent-lime transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent-lime transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent-lime transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest font-mono text-secondary mb-4">Legal</p>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-accent-lime transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent-lime transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent-lime transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent-lime transition-colors">
                    Compliance
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section: Copyright + Social */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-xs text-secondary/60 text-center sm:text-left">
              <p>© 2024 VeloxPay. All rights reserved.</p>
              <p className="mt-2 font-mono">built in zambia</p>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-accent-lime transition-colors"
                title="Twitter"
              >
                <ExternalLink size={20} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-accent-lime transition-colors"
                title="GitHub"
              >
                <Share2 size={20} />
              </a>
              <a
                href="mailto:support@veloxpay.co.zm"
                className="text-secondary hover:text-accent-lime transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
