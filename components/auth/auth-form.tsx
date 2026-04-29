"use client";

import Link from "next/link";
import { useState } from "react";

type AuthMode = "signup" | "signin";

type AuthFormProps = {
  mode: AuthMode;
};

export default function AuthForm({ mode }: AuthFormProps) {
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isSignup = mode === "signup";

  async function submit() {
    setLoading(true);
    setOutput(null);
    const endpoint = isSignup ? "/api/v1/merchants/signup" : "/api/v1/merchants/login";
    const payload = isSignup
      ? { businessName, email, password }
      : { email, password };
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setOutput(JSON.stringify(data, null, 2));
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#f8faf8] text-[#111827]">
      <div className="mx-auto max-w-md px-4 py-16">
        <h1 className="text-3xl font-semibold">
          {isSignup ? "Create merchant account" : "Sign in"}
        </h1>
        <p className="mt-2 text-sm text-[#4b5563]">
          {isSignup
            ? "Create a trial merchant and get your test API key."
            : "Access your trial account."}
        </p>

        <div className="mt-8 space-y-4 rounded border border-[#e5e7eb] bg-white p-5">
          {isSignup ? (
            <>
              <label className="block text-sm">Business name</label>
              <input
                className="w-full border border-[#d1d5db] p-2"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Acme Zambia"
              />
            </>
          ) : null}

          <label className="block text-sm">Email</label>
          <input
            className="w-full border border-[#d1d5db] p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="owner@acme.co.zm"
          />

          <label className="block text-sm">Password</label>
          <input
            type="password"
            className="w-full border border-[#d1d5db] p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="StrongPass123!"
          />

          <button
            type="button"
            disabled={loading}
            onClick={submit}
            className="w-full border border-[#14532d] bg-[#14532d] px-4 py-2 text-white"
          >
            {loading ? "Please wait..." : isSignup ? "Create account" : "Sign in"}
          </button>

          <p className="text-sm text-[#4b5563]">
            {isSignup ? "Already have an account? " : "Need an account? "}
            <Link className="text-[#14532d] underline" href={isSignup ? "/signin" : "/signup"}>
              {isSignup ? "Sign in" : "Create one"}
            </Link>
          </p>
        </div>

        {output ? (
          <pre className="mt-6 overflow-x-auto rounded border border-[#e5e7eb] bg-white p-4 text-xs">
            {output}
          </pre>
        ) : null}
      </div>
    </main>
  );
}
