import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VeloxPay - Fast Payment Gateway for Zambian Startups",
  description: "Accept mobile money and card payments in Zambia. VeloxPay is a simple, developer-friendly payment gateway built for Zambian startups, SaaS, and e-commerce.",
  keywords: "payments, payment gateway, mobile money, card payments, Zambia, fintech, startups",
  authors: [{ name: "VeloxPay" }],
  openGraph: {
    title: "VeloxPay - Fast Payment Gateway for Zambian Startups",
    description: "Accept mobile money and card payments in Zambia with VeloxPay",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#0f1629]">{children}</body>
    </html>
  );
}
