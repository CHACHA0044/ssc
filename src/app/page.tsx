"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: "easeOut" as const },
};

const stagger = {
  whileInView: { transition: { staggerChildren: 0.12 } },
  viewport: { once: true },
};

const FEATURES = [
  {
    icon: "🔮",
    title: "Predictive Disruption Detection",
    description:
      "ML-powered forecasting identifies supply chain disruptions 24-72 hours before they impact operations.",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: "⚡",
    title: "Real-Time Route Optimization",
    description:
      "Dynamic rerouting algorithms find optimal paths through the network in under 200ms.",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    icon: "🛡️",
    title: "Bottleneck Prevention",
    description:
      "Intelligent load balancing prevents cascading failures across interconnected supply nodes.",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: "📡",
    title: "Streaming Architecture",
    description:
      "Event-driven pipelines process millions of logistics events in real-time with sub-second latency.",
    gradient: "from-amber-500 to-orange-600",
  },
];

const PROBLEMS = [
  {
    icon: "⏰",
    stat: "72%",
    title: "Late Detection",
    description:
      "Traditional systems detect disruptions only after delays have already cascaded through the network.",
  },
  {
    icon: "🔗",
    stat: "3.2x",
    title: "Cascading Failures",
    description:
      "A single bottleneck amplifies into multi-point failures, multiplying delay impact by 3.2x on average.",
  },
  {
    icon: "📊",
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
    icon: "📡",
  },
  {
    step: "02",
    title: "Predictive Risk Scoring",
    description:
      "Each route and shipment receives a dynamic risk score updated every 30 seconds.",
    icon: "🎯",
  },
  {
    step: "03",
    title: "Dynamic Rerouting",
    description:
      "When risk thresholds are breached, the system automatically calculates and executes optimal alternatives.",
    icon: "🔄",
  },
];

export default function LandingPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <div className="min-h-screen">
      {/* ── Hero Section ────────────────────────────────── */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 animated-gradient" />
        <div className="absolute inset-0 grid-pattern" />

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.08)_0%,_transparent_70%)]" />

        {/* Floating orbs */}
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 20, -40, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-3xl"
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-400 pulse-glow" />
            Intelligent Logistics Platform
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight"
          >
            <span className="text-white">Autonomous</span>
            <br />
            <span className="gradient-text">Supply Chain</span>
            <br />
            <span className="text-white">Orchestrator</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Predicting disruptions before they happen and dynamically optimizing
            logistics in real-time.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link href="/orders">
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(99,102,241,0.3)" }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-base shadow-xl shadow-indigo-500/25 cursor-pointer transition-shadow"
              >
                Start Simulation →
              </motion.button>
            </Link>
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-xl border border-indigo-500/30 text-indigo-300 font-semibold text-base hover:bg-indigo-500/10 cursor-pointer transition-colors"
              >
                View Dashboard
              </motion.button>
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-20"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 rounded-full border-2 border-slate-600 mx-auto flex items-start justify-center p-1.5"
            >
              <motion.div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── Problem Section ──────────────────────────────── */}
      <section className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(239,68,68,0.04)_0%,_transparent_50%)]" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="text-red-400 text-sm font-semibold tracking-widest uppercase">
              The Problem
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-6">
              Traditional Systems Are{" "}
              <span className="text-red-400">Broken</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Legacy supply chain management relies on reactive monitoring,
              leaving businesses vulnerable to cascading disruptions.
            </p>
          </motion.div>

          <motion.div
            {...stagger}
            className="grid md:grid-cols-3 gap-6"
          >
            {PROBLEMS.map((problem, i) => (
              <motion.div
                key={i}
                variants={{
                  initial: { opacity: 0, y: 30 },
                  whileInView: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
                className="glass-card glass-card-hover p-8 text-center group border-red-500/10 hover:border-red-500/20"
              >
                <div className="text-4xl mb-4">{problem.icon}</div>
                <div className="text-4xl font-bold text-red-400 mb-2">
                  {problem.stat}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {problem.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {problem.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Solution Section ─────────────────────────────── */}
      <section className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(16,185,129,0.04)_0%,_transparent_50%)]" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="text-emerald-400 text-sm font-semibold tracking-widest uppercase">
              The Solution
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-6">
              Intelligent{" "}
              <span className="text-emerald-400">Autonomous</span> Response
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Our three-stage pipeline transforms reactive logistics into
              predictive, self-healing supply chains.
            </p>
          </motion.div>

          <div className="space-y-8">
            {SOLUTIONS.map((solution, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="glass-card glass-card-hover p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 border-emerald-500/10 hover:border-emerald-500/20"
              >
                <div className="flex items-center gap-5 shrink-0">
                  <span className="text-4xl">{solution.icon}</span>
                  <span className="text-5xl font-bold text-emerald-500/20">
                    {solution.step}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {solution.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {solution.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Section ─────────────────────────────── */}
      <section className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.04)_0%,_transparent_50%)]" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="text-indigo-400 text-sm font-semibold tracking-widest uppercase">
              Core Capabilities
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-6">
              Built for <span className="gradient-text">Scale</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Enterprise-grade infrastructure designed to handle millions of
              logistics events per second.
            </p>
          </motion.div>

          <motion.div
            {...stagger}
            className="grid sm:grid-cols-2 gap-6"
          >
            {FEATURES.map((feature, i) => (
              <motion.div
                key={i}
                variants={{
                  initial: { opacity: 0, y: 30 },
                  whileInView: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
                className="glass-card glass-card-hover p-8 group relative overflow-hidden"
              >
                {/* Gradient accent line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${feature.gradient} opacity-40 group-hover:opacity-100 transition-opacity`}
                />

                <div className="text-4xl mb-5">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA Section ──────────────────────────────────── */}
      <section className="py-32 px-6">
        <motion.div
          {...fadeInUp}
          className="max-w-4xl mx-auto text-center glass-card p-16 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-cyan-500/5" />
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 to-cyan-500" />

          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready to <span className="gradient-text">Transform</span> Your
              Supply Chain?
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
              Experience the future of autonomous logistics orchestration.
            </p>
            <Link href="/orders">
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0 0 50px rgba(99,102,241,0.3)" }}
                whileTap={{ scale: 0.97 }}
                className="px-10 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-lg shadow-xl shadow-indigo-500/25 cursor-pointer"
              >
                Launch Simulation
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="border-t border-indigo-500/10 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-white text-xs font-bold">
              SC
            </div>
            <span>SupplyChain Orchestrator</span>
          </div>
          <span>Smart Supply Chain Simulation System</span>
        </div>
      </footer>
    </div>
  );
}
