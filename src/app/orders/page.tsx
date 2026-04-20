"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { PICKUP_LOCATIONS, DROP_LOCATIONS } from "@/lib/mock-data";
import type { Order } from "@/lib/types";
import { cn, getStatusBgColor, formatTimestamp } from "@/lib/utils";
import { showToast } from "@/components/Toast";

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

  const selectClass = "w-full bg-[#1E293B] border border-indigo-500/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500/40 transition-colors appearance-none cursor-pointer";

  return (
    <div className="min-h-screen pt-28 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-4xl font-bold text-white mb-3">Create Order</h1>
          <p className="text-slate-400 text-lg">Simulate incoming logistics requests and observe intelligent routing</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm">⊞</span>
                New Order
              </h2>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Pickup Location</label>
                <select value={pickup} onChange={(e) => setPickup(e.target.value)} className={selectClass}>
                  <option value="" className="bg-[#1E293B]">Select location...</option>
                  {PICKUP_LOCATIONS.map((l) => <option key={l} value={l} className="bg-[#1E293B]">{l}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Drop Location</label>
                <select value={drop} onChange={(e) => setDrop(e.target.value)} className={selectClass}>
                  <option value="" className="bg-[#1E293B]">Select location...</option>
                  {DROP_LOCATIONS.map((l) => <option key={l} value={l} className="bg-[#1E293B]">{l}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Priority</label>
                <div className="grid grid-cols-2 gap-3">
                  {(["normal", "express"] as const).map((p) => (
                    <button key={p} type="button" onClick={() => setPriority(p)}
                      className={cn("px-4 py-3 rounded-xl text-sm font-medium border transition-all cursor-pointer capitalize",
                        priority === p ? "bg-indigo-500/15 border-indigo-500/40 text-indigo-300" : "bg-[#1E293B] border-slate-700 text-slate-400 hover:border-slate-600")}>
                      {p === "express" && "⚡ "}{p}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Package Type</label>
                <div className="grid grid-cols-3 gap-3">
                  {(["standard", "fragile", "heavy"] as const).map((t) => (
                    <button key={t} type="button" onClick={() => setPackageType(t)}
                      className={cn("px-3 py-3 rounded-xl text-xs font-medium border transition-all cursor-pointer capitalize",
                        packageType === t ? "bg-indigo-500/15 border-indigo-500/40 text-indigo-300" : "bg-[#1E293B] border-slate-700 text-slate-400 hover:border-slate-600")}>
                      {t === "fragile" ? "🔮 " : t === "heavy" ? "📦 " : "📋 "}{t}
                    </button>
                  ))}
                </div>
              </div>
              <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-500/20 disabled:opacity-50 cursor-pointer">
                {isSubmitting ? <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Submitting...</span> : "Submit Order"}
              </motion.button>
              <div className="flex gap-3 pt-2">
                <motion.button type="button" onClick={generateRandom} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="flex-1 py-3 rounded-xl border border-cyan-500/25 text-cyan-300 text-sm font-medium hover:bg-cyan-500/10 cursor-pointer transition-colors">🎲 Random</motion.button>
                <motion.button type="button" onClick={toggleAutoGenerate} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className={cn("flex-1 py-3 rounded-xl border text-sm font-medium cursor-pointer transition-all",
                    autoGenerate ? "border-amber-500/40 text-amber-300 bg-amber-500/10" : "border-emerald-500/25 text-emerald-300 hover:bg-emerald-500/10")}>
                  {autoGenerate ? "⏸ Stop" : "▶ Auto"}
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Live Log */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-3">
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-glow" />Live Order Log
                </h2>
                <span className="text-sm text-slate-400">{submittedOrders.length} orders</span>
              </div>
              {submittedOrders.length === 0 ? (
                <div className="text-center py-20 text-slate-500">
                  <div className="text-4xl mb-4">📦</div>
                  <p className="text-lg">No orders yet</p>
                  <p className="text-sm mt-1">Submit an order or generate random ones</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  <AnimatePresence mode="popLayout">
                    {submittedOrders.map((order) => (
                      <motion.div key={order.order_id} initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }} layout
                        className="bg-[#111827]/50 border border-indigo-500/10 rounded-xl p-4 hover:border-indigo-500/20 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <code className="text-indigo-400 text-sm font-mono font-bold">#{order.order_id}</code>
                            <span className={cn("px-2.5 py-0.5 rounded-lg border text-xs font-medium capitalize", getStatusBgColor(order.status))}>
                              {order.status.replace("_", " ")}
                            </span>
                          </div>
                          <span className="text-xs text-slate-500 font-mono">{formatTimestamp(order.timestamp)}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div><span className="text-slate-500 text-xs">From</span><p className="text-slate-300 truncate">{order.pickup_location}</p></div>
                          <div><span className="text-slate-500 text-xs">To</span><p className="text-slate-300 truncate">{order.drop_location}</p></div>
                        </div>
                        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-700/50">
                          <span className={cn("text-xs font-medium capitalize", order.priority === "express" ? "text-amber-400" : "text-slate-400")}>
                            {order.priority === "express" && "⚡ "}{order.priority}
                          </span>
                          <span className="text-xs text-slate-400 capitalize">📦 {order.package_type}</span>
                          <span className={cn("ml-auto text-xs font-medium", order.risk_score >= 70 ? "text-red-400" : order.risk_score >= 40 ? "text-amber-400" : "text-emerald-400")}>
                            Risk: {order.risk_score}%
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
            {submittedOrders.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 mt-6">
                <h3 className="text-sm font-semibold text-slate-400 mb-3">Last Submitted JSON</h3>
                <pre className="text-xs text-indigo-300 bg-[#0a0e17] rounded-xl p-4 overflow-x-auto font-mono">
                  {JSON.stringify(submittedOrders[0], null, 2)}
                </pre>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
