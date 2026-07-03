import { Link } from "react-router-dom";
import { ArrowRight, Menu, Waves, X } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/#process", label: "How it works" },
  { href: "/#why", label: "Why FloodLens" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Motion's scroll value instead of a window scroll listener (no re-render
  // per frame; state only flips when crossing the threshold).
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 24);
  });

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div className="relative">
          {/* Legibility scrim over the hero; fades out once the frost takes over. */}
          <div
            className={`absolute inset-0 bg-linear-to-b from-deep/80 to-transparent transition-opacity duration-300 ${
              scrolled ? "opacity-0" : "opacity-100"
            }`}
          />
          {/* Frosted bar that fades in on scroll. */}
          <div
            className={`absolute inset-0 bg-deep/70 backdrop-blur-xl transition-opacity duration-300 ${
              scrolled ? "opacity-100" : "opacity-0"
            }`}
          />

          <div className="relative mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 md:px-8">
            <Link to="/" className="group flex items-center gap-3">
              <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-white text-blue-600 shadow-lg transition group-hover:scale-105">
                <Waves className="h-5 w-5" />
                <motion.span
                  className="absolute inset-0 bg-linear-to-r from-transparent via-cyan-300/50 to-transparent"
                  animate={{ x: ["-120%", "120%"] }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    repeatDelay: 2.5,
                    ease: "easeInOut",
                  }}
                />
              </span>

              <span className="font-display text-lg font-bold tracking-tight text-white">
                FloodLens
              </span>
            </Link>

            <nav className="hidden items-center gap-9 md:flex">
              {NAV_LINKS.map((link) => (
                <NavLink key={link.href} href={link.href}>
                  {link.label}
                </NavLink>
              ))}

              <Link
                to="/upload"
                className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-cyan-300 to-blue-500 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/25 transition hover:scale-[1.03] active:scale-[0.98]"
              >
                Check my home
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
            </nav>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/15 md:hidden"
              aria-label="Toggle navigation"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>

          <Waterline active={scrolled} />
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-40 overflow-hidden rounded-[1.75rem] border border-white/12 bg-deep/90 p-4 shadow-2xl shadow-black/40 backdrop-blur-2xl md:hidden"
          >
            <div className="grid gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl px-5 py-4 font-semibold text-white/75 transition hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </a>
              ))}

              <Link
                to="/upload"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-cyan-300 to-blue-500 px-5 py-4 font-bold text-slate-950"
              >
                Check my home
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// The signature detail: a hairline "waterline" at the base of the bar with a
// ripple of light drifting across it. Sharpens once the bar is scrolled.
function Waterline({ active }: { active: boolean }) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 bottom-0 h-px overflow-hidden transition-colors duration-300 ${
        active ? "bg-white/12" : "bg-white/6"
      }`}
    >
      <motion.div
        className="h-full w-1/4 bg-linear-to-r from-transparent via-cyan-300 to-transparent"
        animate={{ x: ["-100%", "500%"] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="group relative py-1 text-sm font-semibold text-white/70 transition hover:text-white"
    >
      {children}
      <span className="absolute -bottom-0.5 left-0 h-0.5 w-full origin-left scale-x-0 rounded-full bg-linear-to-r from-cyan-300 to-blue-400 transition-transform duration-300 group-hover:scale-x-100" />
    </a>
  );
}
