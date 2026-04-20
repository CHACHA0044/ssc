"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

let addToastExternal: ((message: string, type?: Toast["type"]) => void) | null =
  null;

export function showToast(message: string, type: Toast["type"] = "success") {
  addToastExternal?.(message, type);
}

export default function ToastProvider() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (message: string, type: Toast["type"] = "success") => {
      const id = Math.random().toString(36).slice(2);
      setToasts((prev) => [...prev.slice(-4), { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3500);
    },
    []
  );

  useEffect(() => {
    addToastExternal = addToast;
    return () => {
      addToastExternal = null;
    };
  }, [addToast]);

  const colorMap = {
    success: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
    error: "border-red-500/40 bg-red-500/10 text-red-300",
    info: "border-indigo-500/40 bg-indigo-500/10 text-indigo-300",
  };

  const iconMap = {
    success: "✓",
    error: "✕",
    info: "ℹ",
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={`pointer-events-auto px-5 py-3 rounded-xl border backdrop-blur-xl shadow-2xl flex items-center gap-3 text-sm font-medium ${colorMap[toast.type]}`}
          >
            <span className="text-base">{iconMap[toast.type]}</span>
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
