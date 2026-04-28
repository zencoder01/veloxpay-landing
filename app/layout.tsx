import type { Metadata } from "next";
import { IBM_Plex_Mono, Roboto } from "next/font/google";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: ["400", "500", "600", "700"],
  variable: "--font-roboto",
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
      className={`${ibmPlexMono.variable} ${roboto.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0e27] text-[#f5f5f0]">{children}</body>
    </html>
  );
}
