"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Home, PlusSquare, LayoutDashboard, Info, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/orders", label: "Create Order", icon: PlusSquare },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/demo", label: "Demo", icon: Info },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-4 pt-4 sm:px-8",
        scrolled ? "pt-2" : "pt-4"
      )}
    >
      <div 
        className={cn(
          "max-w-7xl mx-auto rounded-3xl transition-all duration-700 overflow-hidden",
          scrolled 
            ? "bg-black/60 backdrop-blur-2xl border border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.4)]" 
            : "bg-transparent border border-transparent"
        )}
      >
        <div className="px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-black font-black text-lg transition-transform duration-500 group-hover:scale-105 group-hover:rotate-6">
              SC
            </div>
            <span className="text-xl font-bold text-white tracking-tighter hidden sm:block">
              Supply<span className="text-slate-500">Chain</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link key={link.href} href={link.href}>
                  <motion.div
                    className={cn(
                      "relative px-5 py-2.5 rounded-2xl text-[11px] font-black tracking-widest uppercase transition-all duration-300 cursor-pointer group",
                      isActive
                        ? "text-white"
                        : "text-slate-500 hover:text-white"
                    )}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute inset-0 bg-white/[0.05] border border-white/5 rounded-2xl"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-3">
                      <Icon size={14} className={cn("transition-transform duration-500 group-hover:scale-110", isActive ? "text-white" : "opacity-40")} />
                      {link.label}
                    </span>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-2xl bg-white/[0.03] text-slate-400 hover:text-white transition-colors border border-white/5"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden border-t border-white/5 bg-black/90 backdrop-blur-3xl"
            >
              <div className="px-6 py-8 space-y-3">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                    >
                      <motion.div
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                          "px-6 py-4 rounded-2xl text-[10px] font-black tracking-widest uppercase transition-all flex items-center gap-4 border",
                          isActive
                            ? "bg-white/5 text-white border-white/10 shadow-lg shadow-black/20"
                            : "text-slate-500 border-transparent hover:text-white hover:bg-white/5"
                        )}
                      >
                        <Icon size={16} className={isActive ? "text-white" : "opacity-30"} />
                        {link.label}
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
