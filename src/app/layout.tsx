import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ToastProvider from "@/components/Toast";
import PageTransition from "@/components/PageTransition";

const cardo = localFont({
  src: [
    {
      path: "../../public/Cardo/Cardo-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/Cardo/Cardo-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/Cardo/Cardo-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-cardo",
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
      className={`${cardo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-slate-200">
        <div className="top-blur-gradient" />
        <Navbar />
        <main className="flex-1 relative z-10">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        <ToastProvider />
      </body>
    </html>
  );
}
