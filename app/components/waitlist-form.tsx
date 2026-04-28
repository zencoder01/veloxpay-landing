'use client';

import { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';

export default function WaitlistForm({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setSuccess(true);
    setLoading(false);

    // Auto-close after 3 seconds
    setTimeout(() => {
      onClose();
      setEmail('');
      setSuccess(false);
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md mx-4 border border-line bg-bg-dark p-8 animate-slideInUp">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-secondary hover:text-accent-lime transition-colors"
        >
          <X size={24} />
        </button>

        {!success ? (
          <>
            <h2 className="text-3xl font-bold mb-2">Join the Future</h2>
            <p className="text-secondary mb-8">
              Get early access to veloxpay. API keys in 5 minutes.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-3 bg-bg-secondary/50 border border-line text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-accent-lime transition-colors disabled:opacity-50"
                />
              </div>

              {error && (
                <p className="text-sm text-accent-orange">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-accent-lime text-black font-bold border border-accent-lime hover:bg-yellow-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Account...' : 'Get Started'}
              </button>
            </form>

            <p className="text-xs text-secondary/60 mt-6 text-center">
              No credit card required. We'll send you an API key via email.
            </p>
          </>
        ) : (
          <div className="text-center py-8">
            <CheckCircle size={48} className="text-accent-lime mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Welcome!</h3>
            <p className="text-secondary">
              Check your email for your API keys. You're all set to start collecting payments.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
