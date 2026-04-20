"use client";

import { motion } from "framer-motion";
import { useState, useEffect, lazy, Suspense } from "react";
import { generateInitialOrders } from "@/lib/mock-data";
import type { Order, MetricsData } from "@/lib/types";
import { cn, getStatusBgColor, getRiskColor, getRiskLabel } from "@/lib/utils";
import MetricCard from "@/components/MetricCard";
import AnimatedCounter from "@/components/AnimatedCounter";
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

// Lazy load the network graph for performance
const NetworkGraph = lazy(() => import("@/components/NetworkGraph"));

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
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return;
    const interval = setInterval(() => {
      setOrders((prev) => {
        const updated = prev.map((o) => {
          const r = Math.random();
          if (r < 0.1) {
            const statuses: Order["status"][] = ["processing", "in_transit", "delayed", "rerouted", "delivered"];
            return { 
              ...o, 
              status: statuses[Math.floor(Math.random() * statuses.length)], 
              risk_score: Math.floor(Math.random() * 100) 
            };
          }
          return o;
        });
        setMetrics(computeMetrics(updated));
        return updated;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [loading]);

  const filteredOrders = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const statusFilters = [
    { key: "all", label: "ALL" },
    { key: "in_transit", label: "TRANSIT" },
    { key: "delayed", label: "DELAYED" },
    { key: "rerouted", label: "REROUTED" },
    { key: "delivered", label: "DELIVERED" },
  ];

  return (
    <div className="min-h-screen pt-40 pb-24 px-6 relative bg-black">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <div className="flex items-center gap-6 mb-6">
            <h1 className="text-6xl font-black text-white tracking-tighter">Live Dashboard</h1>
            <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white text-[9px] font-black tracking-[0.2em]">
              <span className="w-1.5 h-1.5 rounded-full bg-white pulse-glow" /> 
              STREAM ACTIVE
            </div>
          </div>
          <p className="text-slate-500 text-xl font-medium">Neural analytics and predictive route management desk.</p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {loading ? (
            [1, 2, 3, 4].map((i) => <div key={i} className="glass-card p-10 h-32 animate-pulse" />)
          ) : metrics && (
            <>
              <MetricCard 
                title="Total Orders" 
                value={<AnimatedCounter value={metrics.totalOrders} />} 
                icon={<Package size={22} />} 
                gradient="from-slate-200 to-slate-400" 
                change={`${metrics.activeShipments} active`} 
                changeType="neutral" 
              />
              <MetricCard 
                title="Critical Routes" 
                value={<AnimatedCounter value={metrics.highRiskRoutes} />} 
                icon={<AlertTriangle size={22} />} 
                gradient="from-red-500 to-rose-400" 
                change={`${Math.round((metrics.highRiskRoutes / Math.max(metrics.totalOrders, 1)) * 100)}% alert`} 
                changeType="negative" 
              />
              <MetricCard 
                title="Avg Latency" 
                value={<><AnimatedCounter value={metrics.avgDelay} /> <span className="text-xs text-slate-500 font-black tracking-widest ml-1">MIN</span></>} 
                icon={<Clock size={22} />} 
                gradient="from-slate-400 to-slate-600" 
              />
              <MetricCard 
                title="Rerouted" 
                value={<AnimatedCounter value={metrics.reroutedCount} />} 
                icon={<RefreshCcw size={22} />} 
                gradient="from-slate-100 to-white" 
                change={`${metrics.deliveredCount} safe`} 
                changeType="positive" 
              />
            </>
          )}
        </div>

        <div className="grid lg:grid-cols-[1fr_420px] gap-12">
          {/* Shipments List */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-10 h-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 mb-12">
              <h2 className="text-xl font-black text-white flex items-center gap-4 tracking-widest uppercase">
                <Activity size={20} className="text-white" />
                Neural Feed
              </h2>
              <div className="flex flex-wrap gap-2">
                {statusFilters.map((f) => (
                  <button key={f.key} onClick={() => setFilter(f.key)}
                    className={cn("px-4 py-2 rounded-2xl text-[9px] font-black tracking-widest border transition-all cursor-pointer",
                      filter === f.key ? "bg-white text-black border-white shadow-2xl" : "border-white/5 bg-white/[0.03] text-slate-500 hover:text-white hover:border-white/10")}>
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {loading ? <LoadingSkeleton rows={5} /> : (
              <div className="space-y-4 max-h-[650px] overflow-y-auto pr-4 custom-scrollbar">
                {filteredOrders.length === 0 ? (
                  <div className="text-center py-32 text-slate-700 font-black uppercase tracking-widest text-xs">No records found</div>
                ) : filteredOrders.map((order, i) => (
                  <motion.div key={order.order_id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.02 }}
                    className="bg-white/[0.01] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.03] hover:border-white/10 transition-all group will-change-transform">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-5">
                        <code className="text-white text-[10px] font-black font-mono bg-white/5 px-2 py-1 rounded-lg">{order.order_id}</code>
                        <span className={cn("px-4 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest border", getStatusBgColor(order.status))}>
                          {order.status.replace("_", " ")}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full shadow-lg" style={{ backgroundColor: getRiskColor(order.risk_score) }} />
                        <span className="text-[9px] font-black tracking-widest uppercase opacity-60">
                          RISK: {order.risk_score}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm font-bold text-slate-300">
                      <div className="flex items-center gap-3">
                        <MapPin size={16} className="text-slate-700" />
                        <span className="truncate max-w-[140px] tracking-tight">{order.pickup_location}</span>
                      </div>
                      <ArrowRight size={16} className="text-white opacity-20 shrink-0" />
                      <div className="flex items-center gap-3">
                        <MapPin size={16} className="text-slate-700" />
                        <span className="truncate max-w-[140px] tracking-tight">{order.drop_location}</span>
                      </div>
                    </div>

                    {order.estimated_delay > 0 && (
                      <div className="mt-8 flex items-center gap-6">
                        <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: `${Math.min(order.estimated_delay, 100)}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-full rounded-full bg-white opacity-40" 
                          />
                        </div>
                        <span className="text-[9px] font-black text-slate-600 shrink-0 tracking-widest uppercase">
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
          <div className="space-y-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Suspense fallback={<div className="glass-card p-10 h-[400px] animate-pulse" />}>
                <NetworkGraph />
              </Suspense>
            </motion.div>

            {/* Analysis Card */}
            {!loading && metrics && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="glass-card p-10">
                <div className="flex items-center gap-4 mb-10">
                  <TrendingUp size={20} className="text-white" />
                  <h3 className="text-xl font-black text-white tracking-tighter uppercase">Neural State</h3>
                </div>
                <div className="space-y-8">
                  {[
                    { label: "OPTIMAL", count: orders.filter((o) => o.risk_score < 40).length, color: "bg-white opacity-80", pct: (orders.filter((o) => o.risk_score < 40).length / Math.max(orders.length, 1)) * 100 },
                    { label: "ELEVATED", count: orders.filter((o) => o.risk_score >= 40 && o.risk_score < 70).length, color: "bg-white opacity-40", pct: (orders.filter((o) => o.risk_score >= 40 && o.risk_score < 70).length / Math.max(orders.length, 1)) * 100 },
                    { label: "CRITICAL", count: orders.filter((o) => o.risk_score >= 70).length, color: "bg-red-500", pct: (orders.filter((o) => o.risk_score >= 70).length / Math.max(orders.length, 1)) * 100 },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-[9px] font-black tracking-widest mb-3">
                        <span className="text-slate-500">{item.label}</span>
                        <span className="text-white bg-white/5 px-2 py-0.5 rounded-lg">{item.count}</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
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
