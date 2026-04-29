"use client";

import { useState } from "react";

type HostedCheckoutProps = {
  slug: string;
  title: string;
  amount: number;
  currency: string;
};

export default function HostedCheckout({
  slug,
  title,
  amount,
  currency,
}: HostedCheckoutProps) {
  const [provider, setProvider] = useState("mtn");
  const [phone, setPhone] = useState("+260");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submitPayment() {
    setLoading(true);
    setResult(null);
    const res = await fetch(`/api/v1/checkout/pay/${slug}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ provider, phone, email }),
    });
    const data = await res.json();
    setResult(JSON.stringify(data, null, 2));
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#f8faf8] text-[#111827]">
      <div className="mx-auto max-w-xl px-4 py-16">
        <h1 className="text-3xl font-semibold">VeloxPay Checkout</h1>
        <p className="mt-2 text-[#4b5563]">{title}</p>
        <p className="mt-1 text-xl font-semibold">
          {currency} {(amount / 100).toFixed(2)}
        </p>

        <div className="mt-8 space-y-4 rounded border border-[#e5e7eb] bg-white p-5">
          <label className="block text-sm">Provider</label>
          <select
            className="w-full border border-[#d1d5db] p-2"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
          >
            <option value="mtn">MTN MoMo</option>
            <option value="airtel">Airtel Money</option>
            <option value="zamtel">Zamtel Kwacha</option>
            <option value="visa">Visa</option>
            <option value="mastercard">Mastercard</option>
          </select>

          <label className="block text-sm">Phone (for MoMo)</label>
          <input
            className="w-full border border-[#d1d5db] p-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <label className="block text-sm">Email (optional)</label>
          <input
            className="w-full border border-[#d1d5db] p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="button"
            onClick={submitPayment}
            disabled={loading}
            className="w-full border border-[#14532d] bg-[#14532d] px-4 py-2 text-white"
          >
            {loading ? "Processing..." : "Pay now"}
          </button>
        </div>

        {result ? (
          <pre className="mt-6 overflow-x-auto rounded border border-[#e5e7eb] bg-white p-4 text-xs">
            {result}
          </pre>
        ) : null}
      </div>
    </main>
  );
}
