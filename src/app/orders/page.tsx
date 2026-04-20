"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { PICKUP_LOCATIONS, DROP_LOCATIONS } from "@/lib/mock-data";
import type { Order } from "@/lib/types";
import { cn, getStatusBgColor, formatTimestamp } from "@/lib/utils";
import { showToast } from "@/components/Toast";
import { 
  Plus, 
  Zap, 
  Sparkles, 
  Package, 
  ClipboardList, 
  Dices, 
  Play, 
  Pause, 
  Box,
  MapPin,
  Clock,
  AlertCircle,
  ArrowRight
} from "lucide-react";

export default function OrdersPage() {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [priority, setPriority] = useState<"normal" | "express">("normal");
  const [packageType, setPackageType] = useState<"standard" | "fragile" | "heavy">("standard");
  const [submittedOrders, setSubmittedOrders] = useState<Order[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoGenerate, setAutoGenerate] = useState(false);
  const [autoIntervalId, setAutoIntervalId] = useState<NodeJS.Timeout | null>(null);

  const submitOrder = useCallback(
    async (orderData: Record<string, string>) => {
      try {
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        });
        const data = await res.json();
        if (data.success) {
          setSubmittedOrders((prev) => [data.order, ...prev].slice(0, 50));
          showToast(`Order ${data.order.order_id} created`, "success");
          return true;
        }
        showToast(data.error || "Failed", "error");
        return false;
      } catch {
        showToast("Network error", "error");
        return false;
      }
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup || !drop) { showToast("Select both locations", "error"); return; }
    if (pickup === drop) { showToast("Locations must differ", "error"); return; }
    setIsSubmitting(true);
    await submitOrder({
      order_id: uuidv4().slice(0, 8).toUpperCase(),
      pickup_location: pickup, drop_location: drop,
      priority, package_type: packageType,
      timestamp: new Date().toISOString(),
    });
    setIsSubmitting(false);
  };

  const generateRandom = async () => {
    const locs = [...PICKUP_LOCATIONS];
    const p = locs[Math.floor(Math.random() * locs.length)];
    let d = locs[Math.floor(Math.random() * locs.length)];
    while (d === p) d = locs[Math.floor(Math.random() * locs.length)];
    const pr = ["normal", "express"][Math.floor(Math.random() * 2)];
    const pt = ["standard", "fragile", "heavy"][Math.floor(Math.random() * 3)];
    await submitOrder({
      order_id: uuidv4().slice(0, 8).toUpperCase(),
      pickup_location: p, drop_location: d,
      priority: pr, package_type: pt,
      timestamp: new Date().toISOString(),
    });
  };

  const toggleAutoGenerate = () => {
    if (autoGenerate) {
      if (autoIntervalId) clearInterval(autoIntervalId);
      setAutoIntervalId(null); setAutoGenerate(false);
      showToast("Auto-generation stopped", "info");
    } else {
      setAutoGenerate(true);
      showToast("Auto-generating orders every 3s", "info");
      setAutoIntervalId(setInterval(generateRandom, 3000));
    }
  };

  const selectClass = "w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:border-white/30 transition-all appearance-none cursor-pointer hover:bg-white/[0.06]";

  return (
    <div className="min-h-screen pt-40 pb-24 px-6 relative bg-black">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="mb-16"
        >
          <h1 className="text-6xl font-black text-white mb-6 tracking-tighter">Create Order</h1>
          <p className="text-slate-500 text-xl font-medium">Input logistics data for neural path simulation.</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="glass-card p-10 space-y-10">
              <h2 className="text-xl font-black text-white flex items-center gap-4 tracking-widest uppercase">
                <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-2xl">
                  <Plus size={20} className="text-black" />
                </div>
                New Shipment
              </h2>

              <div className="space-y-8">
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Pickup Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                    <select value={pickup} onChange={(e) => setPickup(e.target.value)} className={cn(selectClass, "pl-14")}>
                      <option value="" className="bg-black">Select origin...</option>
                      {PICKUP_LOCATIONS.map((l) => <option key={l} value={l} className="bg-black">{l}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Drop Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                    <select value={drop} onChange={(e) => setDrop(e.target.value)} className={cn(selectClass, "pl-14")}>
                      <option value="" className="bg-black">Select destination...</option>
                      {DROP_LOCATIONS.map((l) => <option key={l} value={l} className="bg-black">{l}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Priority</label>
                  <div className="grid grid-cols-2 gap-4">
                    {(["normal", "express"] as const).map((p) => (
                      <button key={p} type="button" onClick={() => setPriority(p)}
                        className={cn("px-5 py-4 rounded-2xl text-[10px] font-black tracking-widest border transition-all cursor-pointer flex items-center justify-center gap-3",
                          priority === p ? "bg-white text-black border-white shadow-2xl" : "bg-white/[0.03] border-white/5 text-slate-500 hover:border-white/20 hover:text-white")}>
                        {p === "express" && <Zap size={14} />}
                        {p.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                className="w-full py-6 rounded-2xl bg-white text-black font-black text-xs tracking-[0.2em] shadow-2xl disabled:opacity-50 cursor-pointer hover:bg-slate-200 transition-colors">
                {isSubmitting ? "PROCESSING..." : "SUBMIT ORDER"}
              </motion.button>

              <div className="flex gap-4 pt-6 border-t border-white/5">
                <motion.button type="button" onClick={generateRandom} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="flex-1 py-4 rounded-2xl bg-white/[0.03] border border-white/5 text-slate-500 text-[9px] font-black tracking-widest hover:bg-white/[0.06] hover:text-white cursor-pointer transition-all flex items-center justify-center gap-3">
                  <Dices size={16} /> RANDOM
                </motion.button>
                <motion.button type="button" onClick={toggleAutoGenerate} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className={cn("flex-1 py-4 rounded-2xl border text-[9px] font-black tracking-widest cursor-pointer transition-all flex items-center justify-center gap-3",
                    autoGenerate ? "border-white/40 text-white bg-white/10 shadow-xl" : "border-white/5 bg-white/[0.03] text-slate-500 hover:text-white")}>
                  {autoGenerate ? <><Pause size={16} /> STOP</> : <><Play size={16} /> AUTO</>}
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Live Log */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-3">
            <div className="glass-card p-10 h-full flex flex-col">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-xl font-black text-white flex items-center gap-4 tracking-widest uppercase">
                  <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)] pulse-glow" />
                  Simulation Stream
                </h2>
                <div className="px-5 py-2 rounded-full bg-white/[0.03] border border-white/10 text-[9px] font-black text-slate-500 tracking-widest">
                  {submittedOrders.length} SHIPMENTS ACTIVE
                </div>
              </div>

              {submittedOrders.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-700 py-32">
                  <Box size={48} className="opacity-10 mb-8" />
                  <p className="text-sm font-black tracking-widest uppercase">Stream Offline</p>
                  <p className="text-[10px] font-bold mt-2 opacity-40 uppercase tracking-widest">Awaiting local shipments</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[750px] overflow-y-auto pr-4 custom-scrollbar">
                  <AnimatePresence mode="popLayout">
                    {submittedOrders.map((order) => (
                      <motion.div key={order.order_id} initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.4, ease: "easeOut" }} layout
                        className="bg-white/[0.01] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.03] hover:border-white/10 transition-all group will-change-transform">
                        <div className="flex items-center justify-between mb-8">
                          <div className="flex items-center gap-5">
                            <div className="text-white text-sm font-black font-mono tracking-tighter bg-white/5 px-3 py-1 rounded-xl">
                              {order.order_id}
                            </div>
                            <span className={cn("px-4 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest border", getStatusBgColor(order.status))}>
                              {order.status.replace("_", " ")}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-slate-600 font-mono text-[10px] font-bold uppercase tracking-widest">
                            <Clock size={12} /> {formatTimestamp(order.timestamp)}
                          </div>
                        </div>

                        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-10 mb-8">
                          <div>
                            <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] block mb-2">ORIGIN</span>
                            <p className="text-white font-bold text-base tracking-tight">{order.pickup_location}</p>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center">
                            <ArrowRight size={16} className="text-white opacity-40" />
                          </div>
                          <div className="text-right">
                            <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] block mb-2">DESTINATION</span>
                            <p className="text-white font-bold text-base tracking-tight">{order.drop_location}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-8 pt-8 border-t border-white/5">
                          <div className="flex items-center gap-3">
                            <Zap size={14} className={order.priority === "express" ? "text-white" : "text-slate-700"} />
                            <span className={cn("text-[9px] font-black tracking-widest uppercase", order.priority === "express" ? "text-white" : "text-slate-700")}>
                              {order.priority}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Package size={14} className="text-slate-700" />
                            <span className="text-[9px] font-black tracking-widest uppercase text-slate-700">
                              {order.package_type}
                            </span>
                          </div>
                          <div className="ml-auto flex items-center gap-6">
                            <div className="text-right">
                              <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest block mb-1">RISK</span>
                              <span className="text-sm font-black text-white">
                                {order.risk_score}%
                              </span>
                            </div>
                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/[0.02] group-hover:bg-white/5 transition-colors border border-white/5">
                              <AlertCircle size={20} className={cn(
                                order.risk_score >= 70 ? "text-red-500" : 
                                order.risk_score >= 40 ? "text-amber-500" : "text-emerald-500"
                              )} />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
