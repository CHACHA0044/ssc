import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ToastProvider from "@/components/Toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SupplyChain Orchestrator — Autonomous Logistics Platform",
  description:
    "Predicting disruptions before they happen and dynamically optimizing logistics in real-time. Smart Supply Chain Simulation System.",
  keywords: ["supply chain", "logistics", "AI", "predictive analytics", "route optimization"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0B0F19] text-slate-200">
        <Navbar />
        <main className="flex-1">{children}</main>
        <ToastProvider />
      </body>
    </html>
  );
}
