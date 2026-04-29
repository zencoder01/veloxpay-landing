"use client";

import { useEffect, useState } from "react";

type Merchant = {
  id: string;
  businessName: string;
  email: string;
  status: string;
  mode: string;
};

type AuditLog = {
  id: string;
  action: string;
  actor: string;
  createdAt: string;
};

export default function DashboardPage() {
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [token, setToken] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [status, setStatus] = useState<string>("loading");
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [linkOutput, setLinkOutput] = useState<string>("");
  const [title, setTitle] = useState("Test Checkout Link");
  const [amount, setAmount] = useState(85000);

  useEffect(() => {
    const merchantRaw = localStorage.getItem("veloxpay_merchant");
    if (merchantRaw) setMerchant(JSON.parse(merchantRaw) as Merchant);
    const t = localStorage.getItem("veloxpay_token") || "";
    const k = localStorage.getItem("veloxpay_api_key") || "";
    setToken(t);
    setApiKey(k);

    fetch("/api/v1/status")
      .then((r) => r.json())
      .then((d) => setStatus(d.healthy ? "healthy" : "degraded"))
      .catch(() => setStatus("offline"));

    if (t) {
      fetch("/api/v1/audit-logs", {
        headers: { authorization: `Bearer ${t}` },
      })
        .then((r) => r.json())
        .then((d) => setAuditLogs(d.logs || []))
        .catch(() => setAuditLogs([]));
    }
  }, []);

  async function createPaymentLink() {
    if (!apiKey) return;
    const res = await fetch("/api/v1/payment-links", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({ title, amount, currency: "ZMW" }),
    });
    const data = await res.json();
    const fullUrl = data.slug ? `${window.location.origin}/pay/${data.slug}` : null;
    setLinkOutput(
      JSON.stringify(
        fullUrl ? { ...data, fullCheckoutUrl: fullUrl } : data,
        null,
        2
      )
    );
  }

  return (
    <main className="min-h-screen bg-[#f8faf8] text-[#111827]">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <h1 className="text-3xl font-semibold">Merchant Dashboard</h1>
        <p className="mt-2 text-[#4b5563]">
          Public beta sandbox. No real money is moved.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded border border-[#e5e7eb] bg-white p-4">
            <p className="text-sm text-[#6b7280]">Service status</p>
            <p className="mt-1 font-semibold capitalize">{status}</p>
          </div>
          <div className="rounded border border-[#e5e7eb] bg-white p-4">
            <p className="text-sm text-[#6b7280]">Merchant</p>
            <p className="mt-1 font-semibold">{merchant?.businessName || "Not loaded"}</p>
          </div>
          <div className="rounded border border-[#e5e7eb] bg-white p-4">
            <p className="text-sm text-[#6b7280]">Mode</p>
            <p className="mt-1 font-semibold">{merchant?.mode || "test"}</p>
          </div>
        </div>

        <section className="mt-8 rounded border border-[#e5e7eb] bg-white p-5">
          <h2 className="text-xl font-semibold">Create payment link</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <input
              className="border border-[#d1d5db] p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Link title"
            />
            <input
              className="border border-[#d1d5db] p-2"
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <button
              type="button"
              onClick={createPaymentLink}
              className="border border-[#14532d] bg-[#14532d] px-4 py-2 text-white"
            >
              Create Link
            </button>
          </div>
          {linkOutput ? (
            <pre className="mt-4 overflow-x-auto rounded border border-[#e5e7eb] bg-[#f9fafb] p-3 text-xs">
              {linkOutput}
            </pre>
          ) : null}
        </section>

        <section className="mt-8 rounded border border-[#e5e7eb] bg-white p-5">
          <h2 className="text-xl font-semibold">Recent audit logs</h2>
          <div className="mt-3 space-y-2">
            {auditLogs.length === 0 ? (
              <p className="text-sm text-[#6b7280]">No logs available yet.</p>
            ) : (
              auditLogs.slice(0, 12).map((log) => (
                <div key={log.id} className="flex items-center justify-between border border-[#e5e7eb] p-3 text-sm">
                  <span>{log.action}</span>
                  <span className="text-[#6b7280]">{new Date(log.createdAt).toLocaleString()}</span>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
