import { Link } from "react-router-dom";
import { ArrowRight, Menu, ShieldCheck, Waves, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="fixed left-0 right-0 top-5 z-50 px-4"
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between rounded-full border border-white/15 bg-[#07111F]/70 px-4 shadow-2xl shadow-black/30 backdrop-blur-2xl md:px-5">
          <Link to="/" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-950 shadow-lg transition group-hover:scale-105">
              <Waves className="h-5 w-5 text-blue-600" />
            </div>

            <div className="leading-tight">
              <p className="text-sm font-black tracking-tight text-white md:text-base">
                FloodLens
              </p>
              <p className="hidden text-[11px] font-semibold text-white/45 sm:block">
                Home flood visualization
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-1 rounded-full bg-white/6 p-1 text-sm font-bold text-white/65 md:flex">
            <a
              href="/#how-it-works"
              className="rounded-full px-4 py-2 transition hover:bg-white hover:text-slate-950"
            >
              Process
            </a>

            <a
              href="/#why"
              className="rounded-full px-4 py-2 transition hover:bg-white hover:text-slate-950"
            >
              Impact
            </a>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              to="/upload"
              className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-cyan-300 to-blue-500 px-5 py-2.5 text-sm font-black text-slate-950 shadow-xl shadow-cyan-500/20 transition hover:scale-[1.03]"
            >
              <ShieldCheck className="h-4 w-4" />
              Check my home
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white md:hidden"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed left-4 right-4 top-24 z-40 overflow-hidden rounded-4xl border border-white/15 bg-[#07111F]/90 p-4 shadow-2xl shadow-black/40 backdrop-blur-2xl md:hidden"
          >
            <div className="grid gap-2">
              <MobileLink
                href="/#how-it-works"
                onClick={() => setMobileOpen(false)}
              >
                Process
              </MobileLink>

              <MobileLink href="/#why" onClick={() => setMobileOpen(false)}>
                Impact
              </MobileLink>

              <Link
                to="/upload"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-cyan-300 to-blue-500 px-5 py-4 font-black text-slate-950"
              >
                <ShieldCheck className="h-5 w-5" />
                Check my home
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MobileLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="rounded-2xl px-5 py-4 font-bold text-white/75 transition hover:bg-white/10 hover:text-white"
    >
      {children}
    </a>
  );
}
