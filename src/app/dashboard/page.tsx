"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { generateInitialOrders } from "@/lib/mock-data";
import type { Order, MetricsData } from "@/lib/types";
import { cn, getStatusBgColor, getRiskColor, getRiskLabel } from "@/lib/utils";
import MetricCard from "@/components/MetricCard";
import AnimatedCounter from "@/components/AnimatedCounter";
import NetworkGraph from "@/components/NetworkGraph";
import LoadingSkeleton from "@/components/LoadingSkeleton";

function computeMetrics(orders: Order[]): MetricsData {
  const highRisk = orders.filter((o) => o.risk_score >= 70).length;
  const totalDelay = orders.reduce((s, o) => s + o.estimated_delay, 0);
  return {
    totalOrders: orders.length,
    highRiskRoutes: highRisk,
    avgDelay: orders.length > 0 ? Math.round(totalDelay / orders.length) : 0,
    activeShipments: orders.filter((o) => o.status === "in_transit").length,
    deliveredCount: orders.filter((o) => o.status === "delivered").length,
    reroutedCount: orders.filter((o) => o.status === "rerouted").length,
  };
}

export default function DashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [metrics, setMetrics] = useState<MetricsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  // Initialize with mock data
  useEffect(() => {
    const timer = setTimeout(() => {
      const initial = generateInitialOrders(12);
      setOrders(initial);
      setMetrics(computeMetrics(initial));
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Live updates — cycle statuses every 4 seconds
  useEffect(() => {
    if (loading) return;
    const interval = setInterval(() => {
      setOrders((prev) => {
        const updated = prev.map((o) => {
          const r = Math.random();
          if (r < 0.15) {
            const statuses: Order["status"][] = ["processing", "in_transit", "delayed", "rerouted", "delivered"];
            return { ...o, status: statuses[Math.floor(Math.random() * statuses.length)], risk_score: Math.floor(Math.random() * 100) };
          }
          return o;
        });
        setMetrics(computeMetrics(updated));
        return updated;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [loading]);

  const filteredOrders = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const statusFilters = [
    { key: "all", label: "All" },
    { key: "in_transit", label: "In Transit" },
    { key: "delayed", label: "Delayed" },
    { key: "rerouted", label: "Rerouted" },
    { key: "processing", label: "Processing" },
    { key: "delivered", label: "Delivered" },
  ];

  return (
    <div className="min-h-screen pt-28 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-4xl font-bold text-white">Dashboard</h1>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-glow" /> Live
            </span>
          </div>
          <p className="text-slate-400 text-lg">Real-time supply chain monitoring and analytics</p>
        </motion.div>

        {/* Metrics */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="glass-card p-6 animate-pulse">
                <div className="w-11 h-11 rounded-xl bg-slate-700/50 mb-4" />
                <div className="h-8 bg-slate-700/50 rounded-lg w-1/2 mb-2" />
                <div className="h-4 bg-slate-700/30 rounded-lg w-2/3" />
              </div>
            ))}
          </div>
        ) : metrics && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <MetricCard title="Total Orders" value={<AnimatedCounter value={metrics.totalOrders} />} icon="📦" gradient="from-indigo-500 to-purple-500" change={`${metrics.activeShipments} active`} changeType="neutral" />
            <MetricCard title="High Risk Routes" value={<AnimatedCounter value={metrics.highRiskRoutes} />} icon="⚠️" gradient="from-red-500 to-rose-500" change={`${Math.round((metrics.highRiskRoutes / Math.max(metrics.totalOrders, 1)) * 100)}%`} changeType="negative" />
            <MetricCard title="Avg Delay" value={<><AnimatedCounter value={metrics.avgDelay} /> <span className="text-lg text-slate-400">min</span></>} icon="⏱️" gradient="from-amber-500 to-orange-500" />
            <MetricCard title="Rerouted" value={<AnimatedCounter value={metrics.reroutedCount} />} icon="🔄" gradient="from-cyan-500 to-teal-500" change={`${metrics.deliveredCount} delivered`} changeType="positive" />
          </div>
        )}

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Shipments List */}
          <div className="lg:col-span-3">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-xl font-semibold text-white">Active Shipments</h2>
                <div className="flex flex-wrap gap-2">
                  {statusFilters.map((f) => (
                    <button key={f.key} onClick={() => setFilter(f.key)}
                      className={cn("px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer",
                        filter === f.key ? "bg-indigo-500/15 border-indigo-500/40 text-indigo-300" : "border-slate-700 text-slate-400 hover:text-slate-300")}>
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {loading ? <LoadingSkeleton rows={5} /> : (
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                  {filteredOrders.length === 0 ? (
                    <div className="text-center py-12 text-slate-500">No shipments match filter</div>
                  ) : filteredOrders.map((order, i) => (
                    <motion.div key={order.order_id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="bg-[#111827]/50 border border-indigo-500/10 rounded-xl p-4 hover:border-indigo-500/20 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <code className="text-indigo-400 text-sm font-mono font-bold">#{order.order_id}</code>
                          <span className={cn("px-2.5 py-0.5 rounded-lg border text-xs font-medium capitalize", getStatusBgColor(order.status))}>
                            {order.status.replace("_", " ")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getRiskColor(order.risk_score) }} />
                          <span className="text-xs" style={{ color: getRiskColor(order.risk_score) }}>
                            {getRiskLabel(order.risk_score)} ({order.risk_score})
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <span className="truncate">{order.pickup_location}</span>
                        <span className="text-indigo-500">→</span>
                        <span className="truncate">{order.drop_location}</span>
                      </div>
                      {order.estimated_delay > 0 && (
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(order.estimated_delay, 100)}%` }}
                              transition={{ duration: 1, delay: i * 0.05 }}
                              className="h-full rounded-full" style={{ backgroundColor: getRiskColor(order.risk_score) }} />
                          </div>
                          <span className="text-xs text-slate-500 shrink-0">{order.estimated_delay}m delay</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Network Graph */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <NetworkGraph />
            </motion.div>

            {/* Risk Distribution */}
            {!loading && metrics && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="glass-card p-6 mt-6">
                <h3 className="text-lg font-semibold text-white mb-4">Risk Distribution</h3>
                <div className="space-y-3">
                  {[
                    { label: "Low Risk", count: orders.filter((o) => o.risk_score < 40).length, color: "bg-emerald-500", pct: (orders.filter((o) => o.risk_score < 40).length / Math.max(orders.length, 1)) * 100 },
                    { label: "Medium Risk", count: orders.filter((o) => o.risk_score >= 40 && o.risk_score < 70).length, color: "bg-amber-500", pct: (orders.filter((o) => o.risk_score >= 40 && o.risk_score < 70).length / Math.max(orders.length, 1)) * 100 },
                    { label: "High Risk", count: orders.filter((o) => o.risk_score >= 70).length, color: "bg-red-500", pct: (orders.filter((o) => o.risk_score >= 70).length / Math.max(orders.length, 1)) * 100 },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-300">{item.label}</span>
                        <span className="text-slate-400">{item.count}</span>
                      </div>
                      <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${item.pct}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full rounded-full ${item.color}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
