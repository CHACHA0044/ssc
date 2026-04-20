"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6 },
};

const PIPELINE_STEPS = [
  {
    id: 1,
    title: "Detection",
    icon: "📡",
    color: "from-blue-500 to-indigo-600",
    borderColor: "border-blue-500/30",
    description: "Continuous monitoring of all supply chain nodes, weather APIs, traffic data, and carrier systems.",
    details: [
      "Real-time data ingestion from 50+ sources",
      "Event streaming via Apache Kafka pipelines",
      "Sub-second latency for critical alerts",
      "Anomaly detection using statistical models",
    ],
  },
  {
    id: 2,
    title: "Prediction",
    icon: "🔮",
    color: "from-purple-500 to-violet-600",
    borderColor: "border-purple-500/30",
    description: "ML models analyze patterns and assign risk scores to every active shipment and route.",
    details: [
      "Gradient-boosted decision trees for risk scoring",
      "Time-series forecasting for delay prediction",
      "Historical pattern matching across 10M+ records",
      "Risk scores updated every 30 seconds",
    ],
  },
  {
    id: 3,
    title: "Action",
    icon: "⚡",
    color: "from-cyan-500 to-teal-600",
    borderColor: "border-cyan-500/30",
    description: "Automated rerouting, resource reallocation, and carrier notification when risk thresholds are breached.",
    details: [
      "Dynamic route optimization via graph algorithms",
      "Automated carrier and warehouse notifications",
      "Load balancing across distribution centers",
      "Rollback mechanisms for failed reroutes",
    ],
  },
];

const CASCADE_STEPS = [
  { label: "Port Delay Detected", time: "T+0min", icon: "🚢", color: "text-blue-400" },
  { label: "Risk Score Elevated", time: "T+0.5min", icon: "📊", color: "text-amber-400" },
  { label: "Downstream Impact Predicted", time: "T+1min", icon: "🔮", color: "text-purple-400" },
  { label: "Alternate Routes Calculated", time: "T+1.5min", icon: "🗺️", color: "text-cyan-400" },
  { label: "Shipments Rerouted", time: "T+2min", icon: "🔄", color: "text-emerald-400" },
  { label: "Carriers Notified", time: "T+2.5min", icon: "📱", color: "text-indigo-400" },
  { label: "Cascading Failure Prevented", time: "T+3min", icon: "🛡️", color: "text-green-400" },
];

const ARCH_LAYERS = [
  { name: "Data Ingestion", items: ["Kafka Streams", "REST APIs", "WebSocket Feeds"], color: "from-blue-500/20 to-blue-600/10" },
  { name: "Processing Engine", items: ["Risk Scoring ML", "Route Optimization", "Anomaly Detection"], color: "from-purple-500/20 to-purple-600/10" },
  { name: "Decision Engine", items: ["Rule Engine", "Threshold Manager", "Action Dispatcher"], color: "from-cyan-500/20 to-cyan-600/10" },
  { name: "Execution Layer", items: ["Auto-Rerouter", "Notification Service", "Audit Logger"], color: "from-emerald-500/20 to-emerald-600/10" },
];

export default function DemoPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [cascadeProgress, setCascadeProgress] = useState(-1);

  const runCascadeDemo = () => {
    setCascadeProgress(0);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= CASCADE_STEPS.length) { clearInterval(interval); return; }
      setCascadeProgress(step);
    }, 800);
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16 text-center">
          <span className="text-indigo-400 text-sm font-semibold tracking-widest uppercase">System Demo</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-4">How It Works</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A deep dive into the autonomous supply chain orchestration pipeline for judges and evaluators.
          </p>
        </motion.div>

        {/* Pipeline Steps */}
        <section className="mb-24">
          <motion.h2 {...fadeInUp} className="text-2xl font-bold text-white mb-8 text-center">
            Detection → Prediction → Action
          </motion.h2>

          {/* Tab selector */}
          <div className="flex justify-center gap-3 mb-10">
            {PIPELINE_STEPS.map((step, i) => (
              <motion.button key={step.id} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => setActiveStep(i)}
                className={cn("px-6 py-3 rounded-xl text-sm font-semibold border transition-all cursor-pointer",
                  activeStep === i
                    ? `bg-gradient-to-r ${step.color} text-white border-transparent shadow-lg`
                    : `${step.borderColor} text-slate-400 hover:text-white`)}>
                <span className="mr-2">{step.icon}</span>{step.title}
              </motion.button>
            ))}
          </div>

          {/* Active step detail */}
          <motion.div key={activeStep} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }} className="glass-card p-10">
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${PIPELINE_STEPS[activeStep].color} flex items-center justify-center text-2xl shadow-lg`}>
                {PIPELINE_STEPS[activeStep].icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{PIPELINE_STEPS[activeStep].title}</h3>
                <p className="text-slate-400 text-sm mt-1">Stage {PIPELINE_STEPS[activeStep].id} of 3</p>
              </div>
            </div>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">{PIPELINE_STEPS[activeStep].description}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {PIPELINE_STEPS[activeStep].details.map((detail, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 bg-[#111827]/50 rounded-xl p-4 border border-indigo-500/10">
                  <span className="text-indigo-400 mt-0.5">✦</span>
                  <span className="text-slate-300 text-sm">{detail}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Cascading Failure Prevention */}
        <section className="mb-24">
          <motion.div {...fadeInUp} className="text-center mb-10">
            <h2 className="text-2xl font-bold text-white mb-3">Cascading Failure Prevention</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Watch how a single disruption is detected and neutralized in under 3 minutes.
            </p>
          </motion.div>

          <div className="glass-card p-8">
            <div className="flex justify-center mb-8">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={runCascadeDemo}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-500/20 cursor-pointer">
                ▶ Run Simulation
              </motion.button>
            </div>

            <div className="space-y-4">
              {CASCADE_STEPS.map((step, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: cascadeProgress >= i ? 1 : 0.3, scale: cascadeProgress === i ? 1.02 : 1 }}
                  transition={{ duration: 0.4 }}
                  className={cn("flex items-center gap-4 p-4 rounded-xl border transition-all",
                    cascadeProgress >= i ? "bg-[#111827]/70 border-indigo-500/20" : "bg-transparent border-slate-800")}>
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0",
                    cascadeProgress >= i ? "bg-indigo-500/15" : "bg-slate-800/50")}>
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <span className={cn("font-medium text-sm", cascadeProgress >= i ? "text-white" : "text-slate-600")}>
                      {step.label}
                    </span>
                  </div>
                  <span className={cn("text-xs font-mono shrink-0", cascadeProgress >= i ? step.color : "text-slate-700")}>
                    {step.time}
                  </span>
                  {cascadeProgress >= i && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                      className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <span className="text-emerald-400 text-xs">✓</span>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Architecture */}
        <section className="mb-24">
          <motion.div {...fadeInUp} className="text-center mb-10">
            <h2 className="text-2xl font-bold text-white mb-3">System Architecture</h2>
            <p className="text-slate-400">Four-layer event-driven architecture</p>
          </motion.div>

          <div className="space-y-4">
            {ARCH_LAYERS.map((layer, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`glass-card p-6 bg-gradient-to-r ${layer.color}`}>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="shrink-0">
                    <span className="text-xs text-slate-500 font-mono">LAYER {i + 1}</span>
                    <h3 className="text-lg font-semibold text-white">{layer.name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:ml-auto">
                    {layer.items.map((item) => (
                      <span key={item} className="px-3 py-1.5 rounded-lg bg-[#0B0F19]/50 border border-indigo-500/10 text-xs text-slate-300 font-medium">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Key Metrics */}
        <motion.section {...fadeInUp} className="glass-card p-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-8">Performance Benchmarks</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "<200ms", label: "Route Calculation" },
              { value: "99.9%", label: "System Uptime" },
              { value: "72hrs", label: "Prediction Window" },
              { value: "3x", label: "Fewer Failures" },
            ].map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="text-3xl font-bold gradient-text mb-2">{m.value}</div>
                <div className="text-sm text-slate-400">{m.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
