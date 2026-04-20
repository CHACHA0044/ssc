"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home", icon: "◈" },
  { href: "/orders", label: "Create Order", icon: "⊞" },
  { href: "/dashboard", label: "Dashboard", icon: "◫" },
  { href: "/demo", label: "Demo", icon: "◉" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-4 mt-4 rounded-2xl bg-[#0B0F19]/70 backdrop-blur-xl border border-indigo-500/10 shadow-lg shadow-indigo-500/5">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-shadow">
              SC
            </div>
            <span className="text-lg font-semibold text-white hidden sm:block">
              Supply<span className="text-indigo-400">Chain</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.href} href={link.href}>
                  <motion.div
                    className={cn(
                      "relative px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer",
                      isActive
                        ? "text-white"
                        : "text-slate-400 hover:text-slate-200"
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active"
                        className="absolute inset-0 bg-indigo-500/15 border border-indigo-500/25 rounded-xl"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <span className="text-xs opacity-60">{link.icon}</span>
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
            className="md:hidden text-slate-400 hover:text-white transition-colors p-2"
            aria-label="Toggle menu"
          >
            <motion.div
              animate={mobileOpen ? "open" : "closed"}
              className="w-5 h-5 flex flex-col justify-center gap-1"
            >
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 4 },
                }}
                className="block w-5 h-0.5 bg-current origin-center"
              />
              <motion.span
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
                className="block w-5 h-0.5 bg-current"
              />
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -4 },
                }}
                className="block w-5 h-0.5 bg-current origin-center"
              />
            </motion.div>
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden border-t border-indigo-500/10"
            >
              <div className="px-4 py-3 space-y-1">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                    >
                      <div
                        className={cn(
                          "px-4 py-3 rounded-xl text-sm font-medium transition-all",
                          isActive
                            ? "bg-indigo-500/15 text-white border border-indigo-500/25"
                            : "text-slate-400 hover:text-white hover:bg-white/5"
                        )}
                      >
                        <span className="flex items-center gap-3">
                          <span className="text-base">{link.icon}</span>
                          {link.label}
                        </span>
                      </div>
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
