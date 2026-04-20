"use client";

import { motion } from "framer-motion";

export default function LoadingSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          className="glass-card p-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-700/50 animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-700/50 rounded-lg w-2/3 animate-pulse" />
              <div className="h-3 bg-slate-700/30 rounded-lg w-1/2 animate-pulse" />
            </div>
            <div className="w-16 h-6 bg-slate-700/50 rounded-lg animate-pulse" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
