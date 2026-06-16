import { Link } from "react-router-dom";
import { ArrowRight, Menu, ShieldCheck, Waves, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-0 right-0 top-5 z-50 px-4"
      >
        <nav
          style={{
            backdropFilter: scrolled ? "blur(24px)" : "blur(12px)",
            background: scrolled ? "rgba(7,17,31,0.88)" : "rgba(7,17,31,0.42)",
            borderColor: scrolled ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.09)",
            boxShadow: scrolled
              ? "0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)"
              : "0 4px 20px rgba(0,0,0,0.2)",
            transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
          className="mx-auto flex h-[60px] max-w-5xl items-center justify-between rounded-full border px-3"
        >
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2.5 pl-1">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #22d3ee, #3b82f6)",
                boxShadow: "0 0 18px rgba(34,211,238,0.35)",
              }}
            >
              <Waves className="h-[18px] w-[18px] text-white" />
            </div>
            <span className="text-[15px] font-black tracking-tight text-white">
              FloodLens
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            <NavLink href="/#how-it-works">Process</NavLink>
            <NavLink href="/#why">Impact</NavLink>
          </div>

          {/* Desktop CTA */}
          <div className="hidden items-center pr-1 md:flex">
            <Link
              to="/upload"
              className="group inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold text-white transition-all duration-200 hover:scale-[1.03]"
              style={{
                background: "linear-gradient(90deg, #22d3ee, #3b82f6)",
                boxShadow: "0 4px 20px rgba(34,211,238,0.22)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                  "0 6px 28px rgba(34,211,238,0.38)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                  "0 4px 20px rgba(34,211,238,0.22)";
              }}
            >
              <ShieldCheck className="h-4 w-4" />
              Check my home
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((p) => !p)}
            aria-label="Toggle navigation"
            className="mr-1 flex h-9 w-9 items-center justify-center rounded-full text-white md:hidden"
            style={{ background: "rgba(255,255,255,0.09)" }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="flex"
                >
                  <X className="h-[18px] w-[18px]" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="flex"
                >
                  <Menu className="h-[18px] w-[18px]" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-4 right-4 top-[86px] z-40 overflow-hidden rounded-3xl border border-white/[0.12] p-3 shadow-2xl md:hidden"
            style={{
              background: "rgba(7,17,31,0.96)",
              backdropFilter: "blur(28px)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
            }}
          >
            <div className="grid gap-1">
              {[
                { href: "/#how-it-works", label: "Process" },
                { href: "/#why", label: "Impact" },
              ].map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.055, ease: "easeOut", duration: 0.18 }}
                  className="rounded-2xl px-5 py-3.5 text-[15px] font-semibold text-white/65 transition-colors duration-150 hover:bg-white/[0.07] hover:text-white"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.11, ease: "easeOut", duration: 0.18 }}
                className="mt-1"
              >
                <Link
                  to="/upload"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-[15px] font-bold text-white"
                  style={{
                    background: "linear-gradient(90deg, #22d3ee, #3b82f6)",
                    boxShadow: "0 4px 20px rgba(34,211,238,0.22)",
                  }}
                >
                  <ShieldCheck className="h-[18px] w-[18px]" />
                  Check my home
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="rounded-full px-4 py-2 text-sm font-semibold text-white/60 transition-all duration-150 hover:bg-white/[0.09] hover:text-white"
    >
      {children}
    </a>
  );
}
