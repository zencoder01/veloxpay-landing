import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VeloxPay | Accept MoMo and card payments without the chaos",
  description:
    "Accept MTN Mobile Money, Airtel Money, Zamtel Kwacha, Visa, and Mastercard with one clean API built for Zambian businesses.",
  keywords: [
    "VeloxPay",
    "Zambia payments",
    "mobile money",
    "MTN Mobile Money",
    "Airtel Money",
    "Zamtel Kwacha",
    "Visa",
    "Mastercard",
    "payment gateway",
    "fintech API",
  ],
  authors: [{ name: "VeloxPay" }],
  openGraph: {
    title: "VeloxPay",
    description:
      "Accept MoMo and card payments from one clean checkout in Zambia.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
