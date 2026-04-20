"use client";

import { motion } from "framer-motion";

interface MetricCardProps {
  title: string;
  value: React.ReactNode;
  icon: React.ReactNode;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  gradient?: string;
}

export default function MetricCard({
  title,
  value,
  icon,
  change,
  changeType = "neutral",
  gradient = "from-indigo-500 to-purple-500",
}: MetricCardProps) {
  const changeColor = {
    positive: "text-emerald-400",
    negative: "text-red-400",
    neutral: "text-slate-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="glass-card glass-card-hover p-6 relative overflow-hidden group"
    >
      {/* Gradient accent */}
      <div
        className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${gradient} opacity-50 group-hover:opacity-100 transition-opacity`}
      />

      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-lg shadow-lg`}
        >
          {icon}
        </div>
        {change && (
          <span className={`text-xs font-medium ${changeColor[changeType]}`}>
            {change}
          </span>
        )}
      </div>

      <div className="text-3xl font-bold text-white mb-1 tracking-tight">
        {value}
      </div>
      <div className="text-sm text-slate-400">{title}</div>
    </motion.div>
  );
}
