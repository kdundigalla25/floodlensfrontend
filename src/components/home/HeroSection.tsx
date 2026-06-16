import { Link } from "react-router-dom";
import { ArrowRight, Droplets } from "lucide-react";
import { motion } from "framer-motion";
import { HeroPreview } from "./HeroPreview";

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden">
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Ambient glow blobs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute -left-48 top-1/4 h-[560px] w-[560px] rounded-full bg-cyan-500/8 blur-[120px]"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.4 }}
        className="absolute -right-48 bottom-1/4 h-[500px] w-[500px] rounded-full bg-blue-600/8 blur-[120px]"
      />

      {/* Fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-[#07111F] to-transparent" />

      <div className="relative z-10 mx-auto grid min-h-[100dvh] max-w-7xl items-center gap-12 px-5 pb-12 pt-24 md:px-8 lg:grid-cols-[1fr_0.9fr] lg:gap-10 lg:pb-0 lg:pt-0">

        {/* Left: Text content */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Eyebrow */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-300/6 px-4 py-2 text-xs font-bold tracking-wide text-cyan-300">
            <Droplets className="h-3.5 w-3.5" />
            Visual flood risk for homeowners
          </div>

          {/* Headline */}
          <h1 className="text-5xl font-black leading-[0.94] tracking-tight text-white md:text-6xl lg:text-[4.25rem]">
            See flood risk<br />
            <span className="bg-linear-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              before it arrives.
            </span>
          </h1>

          {/* Subtext */}
          <p className="mt-6 max-w-md text-base leading-7 text-slate-400 md:text-[1.05rem]">
            Enter an address or upload a photo of your home. See where flood water could reach on your actual property in minutes.
          </p>

          {/* CTAs */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/upload"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-cyan-400 to-blue-500 px-7 py-4 text-sm font-black text-slate-950 shadow-[0_0_32px_rgba(34,211,238,0.22)] transition hover:shadow-[0_0_44px_rgba(34,211,238,0.38)] hover:scale-[1.02] active:scale-[0.99]"
            >
              Check my home
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/4 px-7 py-4 text-sm font-bold text-white/75 transition hover:bg-white/8 hover:text-white active:scale-[0.99]"
            >
              See how it works
            </a>
          </div>

          {/* Trust strip */}
          <div className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
            <span>No signup required</span>
            <span className="text-white/12">|</span>
            <span>Free to use</span>
            <span className="text-white/12">|</span>
            <span>Address and photo supported</span>
          </div>
        </motion.div>

        {/* Right: Animated preview card */}
        <HeroPreview />
      </div>
    </section>
  );
}
