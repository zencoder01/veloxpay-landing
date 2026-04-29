import {
  Activity,
  ArrowRight,
  BadgeCheck,
  BellRing,
  Cable,
  ChartNoAxesCombined,
  CreditCard,
  FileText,
  KeyRound,
  Link2,
  LockKeyhole,
  RefreshCcw,
  ScrollText,
  ShieldCheck,
  Wallet,
  Webhook,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const trustSignals = [
  "Built for Zambian merchants",
  "Mobile money first",
  "Card-ready checkout",
  "Developer-friendly API",
  "Fraud-aware flows",
];

const problems = [
  "Different providers and disconnected payment rails",
  "Manual reconciliation across channels",
  "Unclear transaction statuses and delayed updates",
  "Poor checkout experience on mobile",
  "Hard integration docs and vague errors",
  "Weak merchant dashboards with limited insight",
];

const solutions = [
  { icon: Wallet, label: "Mobile money collections" },
  { icon: CreditCard, label: "Card payments" },
  { icon: ShieldCheck, label: "Hosted checkout" },
  { icon: Link2, label: "Payment links" },
  { icon: Webhook, label: "Real-time webhooks" },
  { icon: ChartNoAxesCombined, label: "Merchant dashboard" },
  { icon: RefreshCcw, label: "Transaction reconciliation" },
  { icon: FileText, label: "Refund and dispute tracking" },
];

const dashboardFeatures = [
  "Live transactions",
  "Settlement tracking",
  "Payment method performance",
  "Failed payment insights",
  "Customer payment history",
  "Exportable reports",
];

const security = [
  "PCI-conscious card handling",
  "Tokenized card flows",
  "Webhook signing",
  "Role-based access",
  "Audit logs",
  "Fraud checks",
  "3D Secure-ready card flow",
];

const prices = [
  {
    name: "Starter",
    desc: "For small businesses testing online payments",
  },
  {
    name: "Growth",
    desc: "For active merchants and ecommerce stores",
  },
  {
    name: "Scale",
    desc: "For platforms, marketplaces, and high-volume merchants",
  },
];

const developerFeatures = [
  { icon: Cable, label: "REST API" },
  { icon: Webhook, label: "Webhooks" },
  { icon: BadgeCheck, label: "Sandbox mode" },
  { icon: KeyRound, label: "API keys" },
  { icon: ScrollText, label: "Clear error codes" },
  { icon: BellRing, label: "Transaction status callbacks" },
];

export default function LandingPage() {
  const navLinks = [
    { label: "Products", href: "/product" },
    { label: "Developers", href: "/developers" },
    { label: "Pricing", href: "/pricing" },
    { label: "Security", href: "/security" },
    { label: "Contact", href: "/contact" },
  ];

  const footerLinks = [
    { label: "Product", href: "/product" },
    { label: "Developers", href: "/developers" },
    { label: "Security", href: "/security" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
    { label: "Legal", href: "/legal" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms", href: "/terms" },
  ];

  return (
    <main className="bg-[#f8faf8] text-[#111827]">
      <header className="sticky top-0 z-50 border-b border-[#e5e7eb]/90 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="text-lg font-semibold tracking-tight">VeloxPay</div>
          <nav className="hidden items-center gap-8 text-sm text-[#374151] md:flex">
            {navLinks.map((item) => (
              <a key={item.label} href={item.href} className="hover:text-[#111827]">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/signin">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Get started</Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-12 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-2 lg:px-8 lg:pt-20">
        <div className="space-y-7">
          <Badge className="w-fit">Zambia first, Africa-ready</Badge>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[#0f172a] sm:text-5xl">
            Accept MoMo and card payments from one clean checkout.
          </h1>
          <p className="max-w-xl text-lg text-[#374151]">
            VeloxPay helps Zambian businesses collect payments through mobile
            money and cards, track transactions in real time, and build faster
            with a developer-friendly API.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/signup">
              <Button size="lg">
                Start building <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
            <Link href="/developers">
              <Button size="lg" variant="outline">
                View API docs
              </Button>
            </Link>
          </div>
        </div>

        <Card className="relative overflow-hidden border-[#d1d5db]">
          <div className="border-b border-[#e5e7eb] bg-[#f9fafb] px-5 py-3 text-sm font-medium">
            Checkout Preview
          </div>
          <div className="space-y-5 p-5">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs text-[#6b7280]">Payment amount</p>
                <p className="text-2xl font-semibold">ZMW 850.00</p>
              </div>
              <Badge variant="neutral">Successful</Badge>
            </div>

            <div className="space-y-2">
              {[
                "MTN MoMo",
                "Airtel Money",
                "Zamtel Kwacha",
                "Visa",
                "Mastercard",
              ].map((method) => (
                <div
                  key={method}
                  className="flex items-center justify-between border border-[#e5e7eb] px-3 py-2 text-sm"
                >
                  <span>{method}</span>
                  <span className="text-[#6b7280]">Available</span>
                </div>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Card className="border-[#e5e7eb] bg-[#fcfffc] p-3 text-sm">
                <p className="text-[#6b7280]">Settlement</p>
                <p className="font-medium">Next business day</p>
              </Card>
              <Card className="border-[#e5e7eb] bg-[#fcfffc] p-3 text-sm">
                <p className="text-[#6b7280]">API status</p>
                <p className="font-medium text-[#14532d]">200 OK</p>
              </Card>
            </div>

            <Card className="border-[#d1fae5] bg-[#f0fdf4] p-3">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[#14532d]">
                API response preview
              </p>
              <code className="block whitespace-pre-wrap font-mono text-xs text-[#14532d]">
                {`{"status":"successful","reference":"VPX_19384","settlement":"next_business_day"}`}
              </code>
            </Card>
          </div>
        </Card>
      </section>

      <section className="border-y border-[#e5e7eb] bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 py-8 sm:grid-cols-3 sm:px-6 lg:grid-cols-5 lg:px-8">
          {trustSignals.map((item) => (
            <div
              key={item}
              className="text-sm font-medium text-[#374151] sm:text-center"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight">
          Payments in Zambia should not feel like duct tape.
        </h2>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {problems.map((item) => (
            <Card key={item} className="border-[#e5e7eb] bg-white p-4">
              <p className="text-[#1f2937]">{item}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-[#e5e7eb] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight">
            One gateway. One dashboard. One integration.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.map(({ icon: Icon, label }) => (
              <Card key={label} className="p-4">
                <Icon className="mb-3 size-5 text-[#14532d]" />
                <p className="text-sm font-medium">{label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">
            Built for developers who hate vague documentation.
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-[#374151]">
            {developerFeatures.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="size-4 text-[#14532d]" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
        <Card className="overflow-hidden">
          <div className="border-b border-[#e5e7eb] bg-[#f9fafb] px-4 py-2 text-xs font-medium uppercase tracking-wide text-[#4b5563]">
            payments.ts
          </div>
          <pre className="overflow-x-auto bg-[#0b1220] p-4 text-xs leading-6 text-[#d1fae5]">
            {`await veloxpay.payments.create({
  amount: 85000,
  currency: "ZMW",
  method: "mobile_money",
  provider: "mtn",
  customer: {
    phone: "+260XXXXXXXXX"
  },
  callbackUrl: "https://example.com/webhooks/veloxpay"
});`}
          </pre>
        </Card>
      </section>

      <section className="border-y border-[#e5e7eb] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight">
            Merchant visibility, without spreadsheet cleanup.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dashboardFeatures.map((item) => (
              <Card key={item} className="flex items-center gap-3 p-4">
                <Activity className="size-4 text-[#14532d]" />
                <span className="text-sm">{item}</span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight">
          Security is not a feature. It is the floor.
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {security.map((item) => (
            <Card key={item} className="flex items-center gap-3 p-4">
              <LockKeyhole className="size-4 text-[#14532d]" />
              <span className="text-sm">{item}</span>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-[#e5e7eb] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight">Pricing</h2>
          <p className="mt-3 text-[#4b5563]">Custom pricing coming soon.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {prices.map((tier) => (
              <Card key={tier.name} className="p-6">
                <h3 className="text-xl font-semibold">{tier.name}</h3>
                <p className="mt-3 text-sm text-[#4b5563]">{tier.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <Card className="border-[#14532d] bg-[#14532d] p-8 text-white">
          <h2 className="text-3xl font-semibold tracking-tight">
            Ready to make payments less painful?
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/signup">
              <Button variant="outline" className="border-white bg-white text-[#14532d]">
                Join waitlist
              </Button>
            </Link>
            <Link href="/contact">
              <Button className="border border-[#bbf7d0] bg-[#14532d] hover:bg-[#0f3f23]">
                Talk to us
              </Button>
            </Link>
          </div>
        </Card>
      </section>

      <footer className="border-t border-[#e5e7eb] bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-lg font-semibold">VeloxPay</p>
            <p className="mt-2 text-sm text-[#4b5563]">
              Accept MoMo and card payments in Zambia.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm text-[#374151] sm:grid-cols-4">
            {footerLinks.map((item) => (
              <a key={item.label} href={item.href} className="hover:text-[#111827]">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
