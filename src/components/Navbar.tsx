"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "circOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-4 pt-4 sm:px-6",
        scrolled ? "pt-2" : "pt-4"
      )}
    >
      <div 
        className={cn(
          "max-w-7xl mx-auto rounded-2xl transition-all duration-500",
          scrolled 
            ? "bg-[#06080F]/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-indigo-500/10" 
            : "bg-transparent border border-transparent"
        )}
      >
        <div className="px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group relative">
            <div className="absolute -inset-2 bg-indigo-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300 group-hover:rotate-6">
              SC
            </div>
            <span className="relative text-xl font-bold text-white tracking-tight hidden sm:block">
              Supply<span className="text-indigo-400">Chain</span>
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
                      "relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer group",
                      isActive
                        ? "text-white"
                        : "text-slate-400 hover:text-white"
                    )}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active"
                        className="absolute inset-0 bg-white/5 border border-white/10 rounded-xl"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <Icon 
                        size={16} 
                        className={cn(
                          "transition-transform duration-300 group-hover:scale-110",
                          isActive ? "text-indigo-400" : "opacity-60"
                        )} 
                      />
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
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-slate-300 hover:text-white transition-colors"
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
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden border-t border-white/5 bg-[#06080F]/90 backdrop-blur-2xl rounded-b-2xl"
            >
              <div className="px-4 py-4 space-y-2">
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
                          "px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-3",
                          isActive
                            ? "bg-indigo-500/10 text-white border border-indigo-500/20"
                            : "text-slate-400 hover:text-white hover:bg-white/5"
                        )}
                      >
                        <Icon size={18} className={isActive ? "text-indigo-400" : "opacity-60"} />
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
