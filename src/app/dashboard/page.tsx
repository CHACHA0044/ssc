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
import { 
  Package, 
  AlertTriangle, 
  Clock, 
  RefreshCcw, 
  ArrowRight,
  TrendingUp,
  MapPin,
  Activity
} from "lucide-react";

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

  useEffect(() => {
    const timer = setTimeout(() => {
      const initial = generateInitialOrders(12);
      setOrders(initial);
      setMetrics(computeMetrics(initial));
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

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
    { key: "all", label: "ALL" },
    { key: "in_transit", label: "IN TRANSIT" },
    { key: "delayed", label: "DELAYED" },
    { key: "rerouted", label: "REROUTED" },
    { key: "processing", label: "PROCESSING" },
    { key: "delivered", label: "DELIVERED" },
  ];

  return (
    <div className="min-h-screen pt-32 pb-16 px-6 relative">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-5xl font-black text-white tracking-tighter">Live Dashboard</h1>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-glow shadow-[0_0_8px_rgba(52,211,153,0.8)]" /> 
              SYSTEM ONLINE
            </div>
          </div>
          <p className="text-slate-400 text-lg font-medium">Real-time supply chain monitoring and neural route analytics</p>
        </motion.div>

        {/* Metrics Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="glass-card p-8 animate-pulse">
                <div className="w-12 h-12 rounded-xl bg-white/5 mb-6" />
                <div className="h-10 bg-white/5 rounded-lg w-1/2 mb-4" />
                <div className="h-4 bg-white/5 rounded-lg w-2/3" />
              </div>
            ))}
          </div>
        ) : metrics && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <MetricCard 
              title="Total Orders" 
              value={<AnimatedCounter value={metrics.totalOrders} />} 
              icon={<Package size={24} />} 
              gradient="from-indigo-600 to-indigo-400" 
              change={`${metrics.activeShipments} active`} 
              changeType="neutral" 
            />
            <MetricCard 
              title="High Risk Routes" 
              value={<AnimatedCounter value={metrics.highRiskRoutes} />} 
              icon={<AlertTriangle size={24} />} 
              gradient="from-red-600 to-rose-400" 
              change={`${Math.round((metrics.highRiskRoutes / Math.max(metrics.totalOrders, 1)) * 100)}% risk`} 
              changeType="negative" 
            />
            <MetricCard 
              title="Avg Delay" 
              value={<><AnimatedCounter value={metrics.avgDelay} /> <span className="text-base text-slate-500 font-bold ml-1">MIN</span></>} 
              icon={<Clock size={24} />} 
              gradient="from-amber-600 to-orange-400" 
            />
            <MetricCard 
              title="Rerouted" 
              value={<AnimatedCounter value={metrics.reroutedCount} />} 
              icon={<RefreshCcw size={24} />} 
              gradient="from-cyan-600 to-teal-400" 
              change={`${metrics.deliveredCount} safe`} 
              changeType="positive" 
            />
          </div>
        )}

        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          {/* Shipments List */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-10 h-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Activity size={24} className="text-indigo-500" />
                Active Shipments
              </h2>
              <div className="flex flex-wrap gap-2">
                {statusFilters.map((f) => (
                  <button key={f.key} onClick={() => setFilter(f.key)}
                    className={cn("px-3 py-2 rounded-xl text-[10px] font-black tracking-widest border transition-all cursor-pointer",
                      filter === f.key ? "bg-indigo-500/10 border-indigo-500/40 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.1)]" : "border-white/5 bg-white/5 text-slate-500 hover:text-slate-300 hover:border-white/10")}>
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {loading ? <LoadingSkeleton rows={5} /> : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
                {filteredOrders.length === 0 ? (
                  <div className="text-center py-20 text-slate-600 font-bold">No matching shipments found</div>
                ) : filteredOrders.map((order, i) => (
                  <motion.div key={order.order_id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.04] hover:border-white/10 transition-all group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <code className="text-indigo-400 text-xs font-black font-mono bg-indigo-500/5 px-2 py-1 rounded">#{order.order_id}</code>
                        <span className={cn("px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border", getStatusBgColor(order.status))}>
                          {order.status.replace("_", " ")}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: getRiskColor(order.risk_score), boxShadow: `0 0 10px ${getRiskColor(order.risk_score)}` }} />
                        <span className="text-[10px] font-black tracking-widest uppercase" style={{ color: getRiskColor(order.risk_score) }}>
                          {getRiskLabel(order.risk_score)} RISK
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm font-bold">
                      <div className="flex items-center gap-2 text-slate-300">
                        <MapPin size={14} className="text-slate-500" />
                        <span className="truncate max-w-[150px]">{order.pickup_location}</span>
                      </div>
                      <ArrowRight size={14} className="text-indigo-500 shrink-0" />
                      <div className="flex items-center gap-2 text-slate-300">
                        <MapPin size={14} className="text-slate-500" />
                        <span className="truncate max-w-[150px]">{order.drop_location}</span>
                      </div>
                    </div>

                    {order.estimated_delay > 0 && (
                      <div className="mt-5 flex items-center gap-4">
                        <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: `${Math.min(order.estimated_delay, 100)}%` }}
                            transition={{ duration: 1.5, delay: i * 0.05, ease: "circOut" }}
                            className="h-full rounded-full" 
                            style={{ backgroundColor: getRiskColor(order.risk_score) }} 
                          />
                        </div>
                        <span className="text-[10px] font-black text-slate-500 shrink-0 tracking-widest uppercase">
                          {order.estimated_delay}M DELAY
                        </span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Network Sidebar */}
          <div className="space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <NetworkGraph />
            </motion.div>

            {/* Risk Distribution Card */}
            {!loading && metrics && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="glass-card p-8">
                <div className="flex items-center gap-3 mb-8">
                  <TrendingUp size={20} className="text-indigo-400" />
                  <h3 className="text-xl font-bold text-white tracking-tight">Risk Analysis</h3>
                </div>
                <div className="space-y-6">
                  {[
                    { label: "OPTIMAL", count: orders.filter((o) => o.risk_score < 40).length, color: "bg-emerald-500", pct: (orders.filter((o) => o.risk_score < 40).length / Math.max(orders.length, 1)) * 100 },
                    { label: "ELEVATED", count: orders.filter((o) => o.risk_score >= 40 && o.risk_score < 70).length, color: "bg-amber-500", pct: (orders.filter((o) => o.risk_score >= 40 && o.risk_score < 70).length / Math.max(orders.length, 1)) * 100 },
                    { label: "CRITICAL", count: orders.filter((o) => o.risk_score >= 70).length, color: "bg-red-500", pct: (orders.filter((o) => o.risk_score >= 70).length / Math.max(orders.length, 1)) * 100 },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-[10px] font-black tracking-widest mb-2">
                        <span className="text-slate-500">{item.label}</span>
                        <span className="text-white bg-white/5 px-2 py-0.5 rounded-md">{item.count}</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${item.pct}%` }}
                          transition={{ duration: 1.5, ease: "circOut" }}
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
