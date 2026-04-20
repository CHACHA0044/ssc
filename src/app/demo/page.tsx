"use client";

import { motion, AnimatePresence } from "framer-motion";
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
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" },
};

const PIPELINE_STEPS = [
  { id: 1, title: "Detection", icon: Radio, color: "bg-white text-black", description: "Continuous monitoring of all supply chain nodes, weather APIs, traffic data, and carrier systems.", details: ["Real-time data ingestion", "Event streaming via Kafka", "Sub-second alert latency", "Anomaly detection"] },
  { id: 2, title: "Prediction", icon: Sparkles, color: "bg-white/80 text-black", description: "ML models analyze patterns and assign risk scores to every active shipment and route.", details: ["Gradient-boosted decision trees", "Time-series forecasting", "Historical pattern matching", "30s refresh window"] },
  { id: 3, title: "Action", icon: Zap, color: "bg-white/60 text-black", description: "Automated rerouting, resource reallocation, and carrier notification when risk thresholds are breached.", details: ["Dynamic route optimization", "Automated notifications", "Load balancing", "Failover mechanisms"] },
];

const CASCADE_STEPS = [
  { label: "Port Delay Detected", time: "T+0min", icon: Ship, color: "text-slate-500" },
  { label: "Risk Score Elevated", time: "T+0.5min", icon: BarChart3, color: "text-slate-500" },
  { label: "Downstream Impact Predicted", time: "T+1min", icon: Sparkles, color: "text-slate-500" },
  { label: "Alternate Routes Calculated", time: "T+1.5min", icon: Map, color: "text-slate-500" },
  { label: "Shipments Rerouted", time: "T+2min", icon: RefreshCw, color: "text-slate-500" },
  { label: "Carriers Notified", time: "T+2.5min", icon: Smartphone, color: "text-slate-500" },
  { label: "Cascading Failure Prevented", time: "T+3min", icon: Shield, color: "text-white" },
];

const ARCH_LAYERS = [
  { name: "Data Ingestion", items: ["Kafka Streams", "REST APIs", "WebSocket Feeds"], icon: Database },
  { name: "Processing Engine", items: ["Risk Scoring ML", "Route Optimization", "Anomaly Detection"], icon: Cpu },
  { name: "Decision Engine", items: ["Rule Engine", "Threshold Manager", "Action Dispatcher"], icon: Network },
  { name: "Execution Layer", items: ["Auto-Rerouter", "Notification Service", "Audit Logger"], icon: Layers },
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
    }, 600);
  };

  return (
    <div className="min-h-screen pt-40 pb-32 px-6 relative bg-black">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-32 text-center">
          <span className="text-white text-[10px] font-black tracking-[0.5em] uppercase mb-8 block opacity-40">System Architecture</span>
          <h1 className="text-6xl sm:text-8xl font-black text-white mt-4 mb-8 tracking-tighter uppercase">How It Works</h1>
          <p className="text-slate-500 text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            A high-fidelity breakdown of the autonomous supply chain orchestration pipeline.
          </p>
        </motion.div>

        {/* Pipeline Steps */}
        <section className="mb-48">
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {PIPELINE_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.button key={step.id} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveStep(i)}
                  className={cn("px-10 py-5 rounded-3xl text-[10px] font-black tracking-widest uppercase border transition-all cursor-pointer flex items-center gap-4",
                    activeStep === i
                      ? "bg-white text-black border-white shadow-2xl"
                      : "bg-white/[0.03] border-white/5 text-slate-500 hover:text-white hover:border-white/10")}>
                  <Icon size={16} />{step.title}
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeStep} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="glass-card p-16 relative overflow-hidden bg-white/[0.01]">
              <div className="flex flex-col md:flex-row md:items-start gap-16">
                <div className={cn("w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl shrink-0 transition-colors duration-500", PIPELINE_STEPS[activeStep].color)}>
                  {(() => { const Icon = PIPELINE_STEPS[activeStep].icon; return <Icon size={40} />; })()}
                </div>
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-white text-[10px] font-black uppercase tracking-widest opacity-30">Phase 0{PIPELINE_STEPS[activeStep].id}</span>
                    <h3 className="text-4xl font-black text-white tracking-tighter uppercase">{PIPELINE_STEPS[activeStep].title}</h3>
                  </div>
                  <p className="text-slate-500 text-xl mb-12 leading-relaxed font-medium">{PIPELINE_STEPS[activeStep].description}</p>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {PIPELINE_STEPS[activeStep].details.map((detail, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-5 bg-white/[0.02] rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-colors">
                        <div className="w-2 h-2 rounded-full bg-white opacity-20" />
                        <span className="text-slate-300 text-sm font-bold uppercase tracking-tight">{detail}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Failure Demo */}
        <section className="mb-48">
          <motion.div {...fadeInUp} className="text-center mb-20">
            <h2 className="text-4xl font-black text-white mb-6 tracking-tighter uppercase">Neutralization Cycle</h2>
            <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto">Real-time neutralization of a cascading port disruption.</p>
          </motion.div>

          <div className="glass-card p-16 bg-white/[0.01]">
            <div className="flex justify-center mb-16">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={runCascadeDemo}
                className="px-12 py-6 rounded-3xl bg-white text-black font-black text-xs tracking-[0.2em] uppercase shadow-2xl cursor-pointer hover:bg-slate-200 transition-all flex items-center gap-4">
                <Play size={18} fill="black" /> Simulate Neutralization
              </motion.button>
            </div>

            <div className="grid gap-4 max-w-2xl mx-auto">
              {CASCADE_STEPS.map((step, i) => {
                const Icon = step.icon;
                const isActive = cascadeProgress >= i;
                const isCurrent = cascadeProgress === i;
                return (
                  <motion.div key={i}
                    animate={{ 
                      opacity: isActive ? 1 : 0.05, 
                      x: isActive ? 0 : -10
                    }}
                    className={cn("flex items-center gap-8 p-6 rounded-3xl border transition-all duration-500",
                      isActive ? "bg-white/[0.03] border-white/10" : "bg-transparent border-transparent")}>
                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500",
                      isActive ? "bg-white text-black" : "bg-white/5 text-slate-800")}>
                      <Icon size={20} />
                    </div>
                    <div className="flex-1">
                      <span className={cn("text-base font-black tracking-tight uppercase transition-colors duration-500", isActive ? "text-white" : "text-slate-800")}>
                        {step.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className={cn("text-[10px] font-black font-mono transition-colors duration-500", isActive ? "text-slate-500" : "text-slate-900")}>
                        {step.time}
                      </span>
                      {isActive && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                          className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-2xl">
                          <Check size={14} className="text-black" />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Architecture Grid */}
        <section>
          <motion.div {...fadeInUp} className="text-center mb-20">
            <h2 className="text-4xl font-black text-white mb-6 tracking-tighter uppercase">Stack Topology</h2>
            <p className="text-slate-500 text-xl font-medium">Unified event-driven architecture layers.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {ARCH_LAYERS.map((layer, i) => {
              const Icon = layer.icon;
              return (
                <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }}
                  className="glass-card p-12 group hover:bg-white/[0.02] transition-colors duration-500 border-white/5">
                  <div className="flex items-center gap-6 mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white transition-all duration-500 group-hover:bg-white group-hover:text-black">
                      <Icon size={24} />
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-600 font-black tracking-[0.3em] uppercase mb-1 block">Layer 0{i + 1}</span>
                      <h3 className="text-2xl font-black text-white tracking-tight uppercase">{layer.name}</h3>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {layer.items.map((item) => (
                      <span key={item} className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-[9px] text-slate-500 font-black tracking-widest uppercase group-hover:border-white/10 group-hover:text-white transition-all duration-500">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
