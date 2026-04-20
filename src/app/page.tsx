"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Activity, 
  Clock, 
  Unlink, 
  BarChart3, 
  Radar, 
  Target, 
  RefreshCw,
  ChevronDown,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] },
};

const stagger = {
  whileInView: { transition: { staggerChildren: 0.15 } },
  viewport: { once: true },
};

const FEATURES = [
  {
    icon: Sparkles,
    title: "Predictive Disruption Detection",
    description:
      "ML-powered forecasting identifies supply chain disruptions 24-72 hours before they impact operations.",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: Zap,
    title: "Real-Time Route Optimization",
    description:
      "Dynamic rerouting algorithms find optimal paths through the network in under 200ms.",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    icon: ShieldCheck,
    title: "Bottleneck Prevention",
    description:
      "Intelligent load balancing prevents cascading failures across interconnected supply nodes.",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: Activity,
    title: "Streaming Architecture",
    description:
      "Event-driven pipelines process millions of logistics events in real-time with sub-second latency.",
    gradient: "from-amber-500 to-orange-600",
  },
];

const PROBLEMS = [
  {
    icon: Clock,
    stat: "72%",
    title: "Late Detection",
    description:
      "Traditional systems detect disruptions only after delays have already cascaded through the network.",
  },
  {
    icon: Unlink,
    stat: "3.2x",
    title: "Cascading Failures",
    description:
      "A single bottleneck amplifies into multi-point failures, multiplying delay impact by 3.2x on average.",
  },
  {
    icon: BarChart3,
    stat: "$184B",
    title: "Annual Losses",
    description:
      "Global supply chain disruptions cost businesses $184 billion annually in lost revenue and penalties.",
  },
];

const SOLUTIONS = [
  {
    step: "01",
    title: "Real-Time Analysis",
    description:
      "Continuous monitoring of all supply chain nodes, routes, and external risk factors.",
    icon: Radar,
  },
  {
    step: "02",
    title: "Predictive Risk Scoring",
    description:
      "Each route and shipment receives a dynamic risk score updated every 30 seconds.",
    icon: Target,
  },
  {
    step: "03",
    title: "Dynamic Rerouting",
    description:
      "When risk thresholds are breached, the system automatically calculates and executes optimal alternatives.",
    icon: RefreshCw,
  },
];

export default function LandingPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.9]);
  const heroY = useTransform(scrollYProgress, [0, 0.8], [0, 50]);

  return (
    <div className="min-h-screen relative">
      {/* ── Hero Section ────────────────────────────────── */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden"
      >
        {/* Background elements */}
        <div className="absolute inset-0 animated-gradient" />
        <div className="absolute inset-0 grid-pattern" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-xs font-semibold mb-10 backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 pulse-glow" />
            Intelligent Logistics Platform
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-[1.1] mb-8 tracking-tighter"
          >
            <span className="text-white drop-shadow-2xl">Autonomous</span>
            <br />
            <span className="gradient-text">Supply Chain</span>
            <br />
            <span className="text-white drop-shadow-2xl">Orchestrator</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-medium"
          >
            Predicting disruptions before they happen and dynamically optimizing
            logistics in real-time.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="flex flex-wrap justify-center gap-5"
          >
            <Link href="/orders">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-2xl bg-indigo-600 text-white font-bold text-base shadow-2xl shadow-indigo-500/40 cursor-pointer transition-all hover:bg-indigo-500"
              >
                <span className="flex items-center gap-2">
                  Start Simulation <ArrowRight size={18} />
                </span>
              </motion.button>
            </Link>
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05, y: -2, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-2xl border border-white/20 bg-white/5 text-white font-bold text-base backdrop-blur-md cursor-pointer transition-all"
              >
                View Dashboard
              </motion.button>
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Discover</span>
              <ChevronDown size={20} className="text-slate-600" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── Problem Section ──────────────────────────────── */}
      <section className="py-40 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-24">
            <span className="text-red-500 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
              The Critical Challenge
            </span>
            <h2 className="text-5xl sm:text-6xl font-bold text-white mb-8 tracking-tight">
              Traditional Systems Are <span className="text-red-500">Broken</span>
            </h2>
            <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed">
              Reactive monitoring is no longer enough. Legacy systems leave you blind to the 
              cascading effects of modern logistics disruptions.
            </p>
          </motion.div>

          <motion.div
            {...stagger}
            className="grid md:grid-cols-3 gap-8"
          >
            {PROBLEMS.map((problem, i) => {
              const Icon = problem.icon;
              return (
                <motion.div
                  key={i}
                  variants={{
                    initial: { opacity: 0, y: 40 },
                    whileInView: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="glass-card glass-card-hover p-10 group border-red-500/10 hover:border-red-500/30"
                >
                  <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="text-red-500" size={28} />
                  </div>
                  <div className="text-5xl font-bold text-white mb-2 tracking-tighter">
                    {problem.stat}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {problem.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-medium">
                    {problem.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Solution Section ─────────────────────────────── */}
      <section className="py-40 px-6 relative z-10 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-24">
            <span className="text-emerald-500 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
              Our Vision
            </span>
            <h2 className="text-5xl sm:text-6xl font-bold text-white mb-8 tracking-tight">
              Intelligent <span className="text-emerald-500">Autonomous</span> Response
            </h2>
            <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed">
              We've engineered a three-stage neural pipeline that transforms 
              reactive logistics into a self-healing, predictive network.
            </p>
          </motion.div>

          <div className="grid gap-8 max-w-4xl mx-auto">
            {SOLUTIONS.map((solution, i) => {
              const Icon = solution.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="glass-card glass-card-hover p-8 flex flex-col sm:flex-row items-center gap-8 border-emerald-500/10 hover:border-emerald-500/30"
                >
                  <div className="shrink-0 w-20 h-20 rounded-3xl bg-emerald-500/10 flex items-center justify-center relative">
                    <span className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shadow-lg">
                      {solution.step}
                    </span>
                    <Icon className="text-emerald-500" size={32} />
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                      {solution.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed font-medium">
                      {solution.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Features Section ─────────────────────────────── */}
      <section className="py-40 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-24">
            <span className="text-indigo-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
              Core Capabilities
            </span>
            <h2 className="text-5xl sm:text-6xl font-bold text-white mb-8 tracking-tight">
              Built for <span className="gradient-text">Global Scale</span>
            </h2>
            <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed">
              Enterprise-grade infrastructure designed to process millions of 
              logistics events per second with unwavering reliability.
            </p>
          </motion.div>

          <motion.div
            {...stagger}
            className="grid sm:grid-cols-2 gap-8"
          >
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  variants={{
                    initial: { opacity: 0, y: 40 },
                    whileInView: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="glass-card glass-card-hover p-12 group relative overflow-hidden"
                >
                  <div className={cn(
                    "absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500 blur-3xl",
                    feature.gradient
                  )} />
                  
                  <div className={cn(
                    "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-8 shadow-xl",
                    feature.gradient
                  )}>
                    <Icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── CTA Section ──────────────────────────────────── */}
      <section className="py-40 px-6 relative z-10">
        <motion.div
          {...fadeInUp}
          className="max-w-5xl mx-auto text-center glass-card p-20 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 opacity-50" />
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

          <div className="relative z-10">
            <h2 className="text-5xl sm:text-6xl font-bold text-white mb-8 tracking-tighter">
              Ready to <span className="gradient-text">Transform</span> Your<br/>Supply Chain?
            </h2>
            <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto font-medium">
              Join the leading organizations leveraging autonomous orchestration to 
              eliminate logistics uncertainty.
            </p>
            <Link href="/orders">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-5 rounded-2xl bg-white text-black font-black text-lg shadow-2xl cursor-pointer transition-all hover:bg-slate-100"
              >
                Launch Simulation Now
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="border-t border-white/5 py-16 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-white text-xs font-bold">
                SC
              </div>
              <span className="text-white font-bold tracking-tight text-lg">SupplyChain Orchestrator</span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs text-center md:text-left">
              Advanced predictive logistics simulation platform for the modern enterprise.
            </p>
          </div>
          
          <div className="flex gap-12 text-sm font-bold">
            <div className="flex flex-col gap-4">
              <span className="text-white uppercase tracking-widest text-[10px]">Platform</span>
              <Link href="/orders" className="text-slate-500 hover:text-white transition-colors">Simulation</Link>
              <Link href="/dashboard" className="text-slate-500 hover:text-white transition-colors">Analytics</Link>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-white uppercase tracking-widest text-[10px]">Resources</span>
              <Link href="/demo" className="text-slate-500 hover:text-white transition-colors">Documentation</Link>
              <Link href="/" className="text-slate-500 hover:text-white transition-colors">API Status</Link>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-widest font-black text-slate-600">
          <span>&copy; 2026 Smart Supply Chain Simulation System</span>
          <div className="flex gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
