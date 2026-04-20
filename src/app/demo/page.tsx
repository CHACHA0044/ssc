"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  Radio, 
  Sparkles, 
  Zap, 
  Ship, 
  BarChart3, 
  Map, 
  RefreshCw, 
  Smartphone, 
  Shield, 
  Check, 
  Star,
  Play,
  Layers,
  Cpu,
  Database,
  Network
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, ease: "easeOut" },
};

const PIPELINE_STEPS = [
  {
    id: 1,
    title: "Detection",
    icon: Radio,
    color: "from-blue-600 to-indigo-700",
    borderColor: "border-blue-500/20",
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
    icon: Sparkles,
    color: "from-purple-600 to-violet-700",
    borderColor: "border-purple-500/20",
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
    icon: Zap,
    color: "from-cyan-600 to-teal-700",
    borderColor: "border-cyan-500/20",
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
  { label: "Port Delay Detected", time: "T+0min", icon: Ship, color: "text-blue-400" },
  { label: "Risk Score Elevated", time: "T+0.5min", icon: BarChart3, color: "text-amber-400" },
  { label: "Downstream Impact Predicted", time: "T+1min", icon: Sparkles, color: "text-purple-400" },
  { label: "Alternate Routes Calculated", time: "T+1.5min", icon: Map, color: "text-cyan-400" },
  { label: "Shipments Rerouted", time: "T+2min", icon: RefreshCw, color: "text-emerald-400" },
  { label: "Carriers Notified", time: "T+2.5min", icon: Smartphone, color: "text-indigo-400" },
  { label: "Cascading Failure Prevented", time: "T+3min", icon: Shield, color: "text-green-400" },
];

const ARCH_LAYERS = [
  { name: "Data Ingestion", items: ["Kafka Streams", "REST APIs", "WebSocket Feeds"], icon: Database, color: "from-blue-500/20 to-blue-600/5" },
  { name: "Processing Engine", items: ["Risk Scoring ML", "Route Optimization", "Anomaly Detection"], icon: Cpu, color: "from-purple-500/20 to-purple-600/5" },
  { name: "Decision Engine", items: ["Rule Engine", "Threshold Manager", "Action Dispatcher"], icon: Network, color: "from-cyan-500/20 to-cyan-600/5" },
  { name: "Execution Layer", items: ["Auto-Rerouter", "Notification Service", "Audit Logger"], icon: Layers, color: "from-emerald-500/20 to-emerald-600/5" },
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
    <div className="min-h-screen pt-32 pb-24 px-6 relative">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-24 text-center">
          <span className="text-indigo-500 text-xs font-black tracking-[0.4em] uppercase mb-6 block">Architecture Breakdown</span>
          <h1 className="text-5xl sm:text-7xl font-black text-white mt-4 mb-6 tracking-tighter">How It Works</h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            A deep dive into the autonomous supply chain orchestration pipeline and our neural routing core.
          </p>
        </motion.div>

        {/* Pipeline Steps */}
        <section className="mb-40">
          <motion.div {...fadeInUp} className="flex items-center gap-4 justify-center mb-12">
            <h2 className="text-3xl font-bold text-white tracking-tight">The Three-Stage Neural Pipeline</h2>
          </motion.div>

          {/* Tab selector */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {PIPELINE_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.button key={step.id} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveStep(i)}
                  className={cn("px-8 py-4 rounded-2xl text-xs font-black tracking-widest uppercase border transition-all cursor-pointer flex items-center gap-3",
                    activeStep === i
                      ? `bg-gradient-to-r ${step.color} text-white border-transparent shadow-xl shadow-indigo-500/20`
                      : `bg-white/5 border-white/5 text-slate-500 hover:text-white hover:border-white/10`)}>
                  <Icon size={18} />{step.title}
                </motion.button>
              );
            })}
          </div>

          {/* Active step detail */}
          <AnimatePresence mode="wait">
            <motion.div key={activeStep} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "circOut" }} className="glass-card p-12 relative overflow-hidden">
              <div className={cn("absolute top-0 right-0 w-64 h-64 bg-gradient-to-br opacity-[0.03] blur-3xl", PIPELINE_STEPS[activeStep].color)} />
              
              <div className="flex flex-col md:flex-row md:items-start gap-10">
                <div className={cn("w-20 h-20 rounded-3xl bg-gradient-to-br flex items-center justify-center text-white shadow-2xl shrink-0", PIPELINE_STEPS[activeStep].color)}>
                  <PIPELINE_STEPS[activeStep].icon size={40} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-indigo-500 text-[10px] font-black uppercase tracking-widest">Stage 0{PIPELINE_STEPS[activeStep].id}</span>
                    <h3 className="text-3xl font-black text-white tracking-tighter">{PIPELINE_STEPS[activeStep].title.toUpperCase()}</h3>
                  </div>
                  <p className="text-slate-400 text-lg mb-10 leading-relaxed font-medium">{PIPELINE_STEPS[activeStep].description}</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {PIPELINE_STEPS[activeStep].details.map((detail, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-4 bg-white/[0.02] rounded-2xl p-5 border border-white/5 hover:border-white/10 transition-colors">
                        <Star className="text-indigo-500 shrink-0 mt-1" size={16} />
                        <span className="text-slate-300 text-sm font-bold">{detail}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Cascading Failure Prevention */}
        <section className="mb-40">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4 tracking-tighter uppercase">Failure Neutralization</h2>
            <p className="text-slate-400 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
              Watch our autonomous agent detect, analyze, and neutralize a port delay disruption in real-time.
            </p>
          </motion.div>

          <div className="glass-card p-12">
            <div className="flex justify-center mb-12">
              <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}
                onClick={runCascadeDemo}
                className="px-10 py-5 rounded-2xl bg-indigo-600 text-white font-black text-sm tracking-widest uppercase shadow-2xl shadow-indigo-500/20 cursor-pointer flex items-center gap-3 hover:bg-indigo-500 transition-all">
                <Play size={18} /> Run Neutralization Demo
              </motion.button>
            </div>

            <div className="grid gap-4 max-w-3xl mx-auto">
              {CASCADE_STEPS.map((step, i) => {
                const Icon = step.icon;
                const isActive = cascadeProgress >= i;
                const isCurrent = cascadeProgress === i;
                return (
                  <motion.div key={i}
                    initial={{ opacity: 0.1 }}
                    animate={{ 
                      opacity: isActive ? 1 : 0.1, 
                      scale: isCurrent ? 1.02 : 1,
                      x: isActive ? 0 : -10
                    }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                    className={cn("flex items-center gap-6 p-6 rounded-2xl border transition-all duration-500",
                      isActive ? "bg-white/[0.03] border-white/10" : "bg-transparent border-white/5")}>
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500",
                      isActive ? "bg-indigo-600 text-white shadow-lg" : "bg-white/5 text-slate-700")}>
                      <Icon size={20} />
                    </div>
                    <div className="flex-1">
                      <span className={cn("font-bold tracking-tight transition-colors duration-500", isActive ? "text-white" : "text-slate-700")}>
                        {step.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={cn("text-xs font-black font-mono transition-colors duration-500", isActive ? step.color : "text-slate-800")}>
                        {step.time}
                      </span>
                      {isActive && (
                        <motion.div initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }}
                          className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
                          <Check size={14} className="text-white" />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Architecture */}
        <section className="mb-40">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4 tracking-tighter uppercase">System Topology</h2>
            <p className="text-slate-400 text-lg font-medium leading-relaxed">Our unified event-driven stack architecture</p>
          </motion.div>

          <div className="grid gap-6">
            {ARCH_LAYERS.map((layer, i) => {
              const Icon = layer.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: "circOut" }}
                  className={cn("glass-card p-8 group overflow-hidden bg-gradient-to-r", layer.color)}>
                  <div className="flex flex-col md:flex-row md:items-center gap-8 relative z-10">
                    <div className="flex items-center gap-6 shrink-0">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400 shadow-xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                        <Icon size={24} />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 font-black tracking-[0.3em] uppercase block mb-1">LAYER 0{i + 1}</span>
                        <h3 className="text-2xl font-black text-white tracking-tight">{layer.name.toUpperCase()}</h3>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3 md:ml-auto">
                      {layer.items.map((item) => (
                        <span key={item} className="px-4 py-2 rounded-xl bg-black/40 border border-white/5 text-[10px] text-slate-400 font-black tracking-widest group-hover:border-white/20 group-hover:text-white transition-all duration-500">
                          {item.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Performance Benchmarks */}
        <motion.section {...fadeInUp} className="glass-card p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-cyan-500/5 opacity-50" />
          <h2 className="text-4xl font-black text-white mb-12 tracking-tighter uppercase relative z-10">Neural Performance Benchmarks</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
            {[
              { value: "<200ms", label: "ROUTE CALCULATION" },
              { value: "99.99%", label: "SYSTEM RELIABILITY" },
              { value: "72HRS", label: "PREDICTION WINDOW" },
              { value: "3.2X", label: "FAILURE REDUCTION" },
            ].map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 + 0.3, duration: 0.8 }}>
                <div className="text-5xl font-black gradient-text mb-3 tracking-tighter">{m.value}</div>
                <div className="text-[10px] font-black text-slate-500 tracking-[0.2em]">{m.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
