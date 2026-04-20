"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, Suspense, lazy } from "react";
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

// Dynamic imports for potentially heavy sections
const FeaturesGrid = lazy(() => Promise.resolve({ default: FeaturesSection }));
const ProblemGrid = lazy(() => Promise.resolve({ default: ProblemSection }));

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const FEATURES = [
  { icon: Sparkles, title: "Predictive Disruption Detection", description: "ML-powered forecasting identifies supply chain disruptions 24-72 hours before they impact operations.", color: "group-hover:text-indigo-400", hoverBg: "hover:border-indigo-500/20" },
  { icon: Zap, title: "Real-Time Route Optimization", description: "Dynamic rerouting algorithms find optimal paths through the network in under 200ms.", color: "group-hover:text-cyan-400", hoverBg: "hover:border-cyan-500/20" },
  { icon: ShieldCheck, title: "Bottleneck Prevention", description: "Intelligent load balancing prevents cascading failures across interconnected supply nodes.", color: "group-hover:text-emerald-400", hoverBg: "hover:border-emerald-500/20" },
  { icon: Activity, title: "Streaming Architecture", description: "Event-driven pipelines process millions of logistics events in real-time with sub-second latency.", color: "group-hover:text-amber-400", hoverBg: "hover:border-amber-500/20" },
];

export default function LandingPage() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.98]);

  return (
    <div className="bg-black text-white selection:bg-indigo-500/30">
      {/* ── Hero Section ────────────────────────────────── */}
      <motion.section
        ref={heroRef}
        style={{ opacity, scale }}
        className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden gpu-accelerated"
      >
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="bg-spotlight top-1/4 left-1/4 opacity-40" />
        <div className="bg-spotlight bottom-1/4 right-1/4 opacity-30" style={{ background: 'radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="inline-flex items-center gap-3 px-4 py-1 rounded-full bg-white/[0.03] border border-white/10 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-12 backdrop-blur-xl"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
            Neural Logistics Core v4.0
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-[1.1] mb-8 tracking-tighter will-change-transform"
          >
            <span className="text-white">Autonomous</span>
            <br />
            <span className="text-slate-500">Supply Chain</span>
            <br />
            <span className="text-white">Orchestrator</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-14 leading-relaxed font-medium"
          >
            A high-fidelity simulation of predictive disruption management and
            dynamic neural rerouting for global enterprise logistics.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute top-140 left-1/2 -translate-x-1/2 opacity-20"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown size={24} />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── Content Sections (Lazy Loaded) ──────────────── */}
      <Suspense fallback={<div className="h-screen bg-black" />}>
        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
      </Suspense>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="border-t border-white/5 py-24 px-6 relative z-10 bg-black">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center text-sm font-black">
                SC
              </div>
              <span className="text-xl font-bold tracking-tighter">SupplyChain Orchestrator</span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
              Advanced simulation of autonomous logistics through neural graph optimization.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12">
            <div className="flex flex-col gap-4">
              <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">Platform</span>
              <Link href="/orders" className="text-slate-500 hover:text-white transition-colors text-sm">Simulator</Link>
              <Link href="/dashboard" className="text-slate-500 hover:text-white transition-colors text-sm">Dashboard</Link>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">System</span>
              <Link href="/demo" className="text-slate-500 hover:text-white transition-colors text-sm">Documentation</Link>
              <Link href="/" className="text-slate-500 hover:text-white transition-colors text-sm">Status</Link>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-widest font-black text-slate-700">
          <span>&copy; 2026 Smart Supply Chain simulation</span>
          <div className="flex gap-8">
            <span className="hover:text-slate-400 cursor-pointer">Privacy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ProblemSection() {
  return (
    <section className="py-40 px-6 relative overflow-hidden bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeInUp} className="mb-24">
          <h2 className="text-5xl sm:text-6xl font-bold text-white tracking-tighter mb-8">
            The Cost of <span className="text-slate-600">Reactive</span> Logistics
          </h2>
          <p className="text-slate-400 text-xl max-w-2xl leading-relaxed">
            Legacy systems wait for delays to happen. Our orchestrator predicts and neutralizes
            them before they impact your bottom line.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-1px bg-white/5 border border-white/5 rounded-3xl overflow-hidden">
          {[
            { stat: "72%", label: "DETECTION GAP", desc: "Most disruptions are detected only after reaching critical status." },
            { stat: "3.2X", label: "CASCADING IMPACT", desc: "Single delays amplify into multiple failure points across the network." },
            { stat: "$184B", label: "MARKET LOSS", desc: "Annual revenue lost globally due to poor disruption response." },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.02)", scale: 1.01 }}
              className="bg-black p-10 space-y-6 transition-colors duration-500"
            >
              <div className="text-5xl font-bold tracking-tighter text-white">{item.stat}</div>
              <div>
                <div className="text-[10px] font-black text-slate-500 tracking-widest mb-2">{item.label}</div>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionSection() {
  return (
    <section className="py-40 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-5xl sm:text-6xl font-bold text-white tracking-tighter mb-10">
              Self-Healing <br />Supply Networks
            </h2>
            <div className="space-y-12">
              {[
                { step: "01", title: "Neural Monitoring", desc: "Continuous event streaming across all logistics nodes with sub-second latency.", icon: Radar },
                { step: "02", title: "Predictive Analysis", desc: "Probabilistic modeling of route risks 72 hours into the future.", icon: Target },
                { step: "03", title: "Autonomous Action", desc: "Automated rerouting and resource reallocation via neural graph search.", icon: RefreshCw },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 10 }}
                  className="flex gap-8 group cursor-default"
                >
                  <div className="text-2xl font-black text-slate-800 group-hover:text-white transition-colors duration-500">{item.step}</div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-indigo-400 transition-colors duration-500">{item.title}</h3>
                    <p className="text-slate-500 leading-relaxed text-sm group-hover:text-slate-400 transition-colors duration-500">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="aspect-square rounded-3xl bg-white/[0.02] border border-white/5 flex items-center justify-center relative overflow-hidden group"
          >
            <div className="absolute inset-0 grid-pattern opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Activity size={120} className="text-white/20" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="py-40 px-6 bg-black relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          {...fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white tracking-tighter mb-6">Built for Global Scale</h2>
          <p className="text-slate-500 text-xl font-medium">Enterprise infrastructure for the modern supply chain.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-8">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, scale: 1.01 }}
                className={cn(
                  "glass-card p-12 group transition-all duration-500 will-change-transform cursor-default",
                  feature.hoverBg
                )}
              >
                <div className="relative mb-8">
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Icon size={32} className={cn("transition-colors duration-500 text-slate-600", feature.color)} />
                  </motion.div>
                  <div className="absolute -inset-4 bg-white/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-white transition-colors duration-500">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium group-hover:text-slate-400 transition-colors duration-500">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
