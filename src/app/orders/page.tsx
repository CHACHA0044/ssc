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
  AlertCircle
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

  const selectClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500/40 transition-all appearance-none cursor-pointer hover:bg-white/10";

  return (
    <div className="min-h-screen pt-32 pb-16 px-6 relative">
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-5xl font-black text-white mb-4 tracking-tighter">Create Order</h1>
          <p className="text-slate-400 text-lg font-medium">Simulate incoming logistics requests and observe intelligent routing</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="glass-card p-10 space-y-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <Plus size={20} className="text-white" />
                </div>
                New Order
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Pickup Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <select value={pickup} onChange={(e) => setPickup(e.target.value)} className={cn(selectClass, "pl-12")}>
                      <option value="" className="bg-[#0A0E17]">Select location...</option>
                      {PICKUP_LOCATIONS.map((l) => <option key={l} value={l} className="bg-[#0A0E17]">{l}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Drop Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <select value={drop} onChange={(e) => setDrop(e.target.value)} className={cn(selectClass, "pl-12")}>
                      <option value="" className="bg-[#0A0E17]">Select location...</option>
                      {DROP_LOCATIONS.map((l) => <option key={l} value={l} className="bg-[#0A0E17]">{l}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Priority</label>
                  <div className="grid grid-cols-2 gap-3">
                    {(["normal", "express"] as const).map((p) => (
                      <button key={p} type="button" onClick={() => setPriority(p)}
                        className={cn("px-4 py-3 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-2",
                          priority === p ? "bg-indigo-500/10 border-indigo-500/40 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.1)]" : "bg-white/5 border-white/5 text-slate-500 hover:border-white/10 hover:text-slate-300")}>
                        {p === "express" && <Zap size={14} />}
                        {p.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Package Type</label>
                  <div className="grid grid-cols-3 gap-3">
                    {(["standard", "fragile", "heavy"] as const).map((t) => (
                      <button key={t} type="button" onClick={() => setPackageType(t)}
                        className={cn("px-3 py-3 rounded-xl text-[10px] font-black border transition-all cursor-pointer flex flex-col items-center gap-2",
                          packageType === t ? "bg-indigo-500/10 border-indigo-500/40 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.1)]" : "bg-white/5 border-white/5 text-slate-500 hover:border-white/10 hover:text-slate-300")}>
                        {t === "fragile" ? <Sparkles size={16} /> : t === "heavy" ? <Package size={16} /> : <ClipboardList size={16} />}
                        {t.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full py-5 rounded-2xl bg-indigo-600 text-white font-black text-sm shadow-xl shadow-indigo-500/20 disabled:opacity-50 cursor-pointer hover:bg-indigo-500 transition-colors">
                {isSubmitting ? <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />SUBMITTING...</span> : "SUBMIT ORDER"}
              </motion.button>

              <div className="flex gap-4 pt-4 border-t border-white/5">
                <motion.button type="button" onClick={generateRandom} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="flex-1 py-3 rounded-xl bg-white/5 border border-white/5 text-slate-400 text-[10px] font-black tracking-widest hover:bg-white/10 hover:text-white cursor-pointer transition-all flex items-center justify-center gap-2">
                  <Dices size={14} /> RANDOM
                </motion.button>
                <motion.button type="button" onClick={toggleAutoGenerate} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className={cn("flex-1 py-3 rounded-xl border text-[10px] font-black tracking-widest cursor-pointer transition-all flex items-center justify-center gap-2",
                    autoGenerate ? "border-amber-500/40 text-amber-400 bg-amber-500/10" : "border-white/5 bg-white/5 text-slate-400 hover:text-white")}>
                  {autoGenerate ? <><Pause size={14} /> STOP</> : <><Play size={14} /> AUTO</>}
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Live Log */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-3">
            <div className="glass-card p-10 h-full flex flex-col">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] pulse-glow" />
                  Live Order Log
                </h2>
                <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-slate-400 tracking-widest">
                  {submittedOrders.length} SHIPMENTS
                </div>
              </div>

              {submittedOrders.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-600 py-20">
                  <div className="w-20 h-20 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center justify-center mb-6">
                    <Box size={40} className="opacity-20" />
                  </div>
                  <p className="text-lg font-bold tracking-tight">No active shipments</p>
                  <p className="text-sm font-medium mt-1">Submit an order to start simulation</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[700px] overflow-y-auto pr-4 custom-scrollbar">
                  <AnimatePresence mode="popLayout">
                    {submittedOrders.map((order) => (
                      <motion.div key={order.order_id} initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }} layout
                        className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.05] hover:border-white/10 transition-all group">
                        <div className="flex items-start justify-between mb-5">
                          <div className="flex items-center gap-4">
                            <div className="px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 text-xs font-black font-mono">
                              #{order.order_id}
                            </div>
                            <span className={cn("px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border", getStatusBgColor(order.status))}>
                              {order.status.replace("_", " ")}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-500 font-mono text-[10px] font-bold bg-black/20 px-2 py-1 rounded-md">
                            <Clock size={10} /> {formatTimestamp(order.timestamp)}
                          </div>
                        </div>

                        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6 mb-6">
                          <div>
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">ORIGIN</span>
                            <p className="text-white font-bold truncate text-sm">{order.pickup_location}</p>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center">
                            <ArrowRight size={14} className="text-indigo-500" />
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">DESTINATION</span>
                            <p className="text-white font-bold truncate text-sm">{order.drop_location}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 pt-5 border-t border-white/5">
                          <div className="flex items-center gap-2">
                            {order.priority === "express" ? <Zap size={14} className="text-amber-500" /> : <Clock size={14} className="text-slate-500" />}
                            <span className={cn("text-[10px] font-black tracking-widest uppercase", order.priority === "express" ? "text-amber-500" : "text-slate-500")}>
                              {order.priority}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Package size={14} className="text-slate-500" />
                            <span className="text-[10px] font-black tracking-widest uppercase text-slate-500">
                              {order.package_type}
                            </span>
                          </div>
                          <div className="ml-auto flex items-center gap-3">
                            <div className="text-right">
                              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">RISK FACTOR</span>
                              <span className={cn("text-sm font-black", 
                                order.risk_score >= 70 ? "text-red-500" : 
                                order.risk_score >= 40 ? "text-amber-500" : "text-emerald-500")}>
                                {order.risk_score}%
                              </span>
                            </div>
                            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-indigo-500/10 transition-colors">
                              <AlertCircle size={18} className={cn(
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
