import { motion, useReducedMotion } from "framer-motion";
import { heroImage } from "./homeContent";
import { MiniMetric } from "./MiniMetric";

export function HeroPreview() {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 44, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="relative hidden w-full max-w-lg justify-self-end lg:block"
    >
      {/* Glow behind card */}
      <div className="absolute -inset-10 rounded-[3rem] bg-linear-to-br from-cyan-400/12 to-blue-700/12 blur-3xl" />

      {/* Card shell */}
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#091522]/95 shadow-[0_32px_80px_rgba(0,0,0,0.6)] backdrop-blur-2xl">

        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
          <div>
            <p className="text-[13px] font-black text-white">FloodLens Preview</p>
          </div>
          <motion.div
            animate={
              prefersReduced
                ? {}
                : { opacity: [1, 0.6, 1] }
            }
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-1.5 rounded-full bg-emerald-400/12 px-3 py-1.5 text-[11px] font-black text-emerald-300"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Analysis ready
          </motion.div>
        </div>

        {/* Image + overlay area */}
        <div className="relative aspect-[4/3.6] overflow-hidden bg-[#07111F]">

          {/* House photo */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          />

          {/* Subtle darkening scrim */}
          <div className="absolute inset-0 bg-[#07111F]/18" />

          {/* Gradient at bottom for depth */}
          <div className="absolute inset-0 bg-linear-to-t from-[#07111F]/65 via-transparent to-transparent" />

          {/* Scan line — sweeps top to bottom, loops every ~7 s */}
          {!prefersReduced && (
            <motion.div
              initial={{ y: "0%" }}
              animate={{ y: ["0%", "105%"] }}
              transition={{
                duration: 2.2,
                delay: 0.6,
                repeat: Infinity,
                repeatDelay: 4.8,
                ease: "linear",
              }}
              className="pointer-events-none absolute left-0 right-0 z-20"
            >
              <div className="h-px w-full bg-linear-to-r from-transparent via-cyan-300/55 to-transparent" />
              <div className="h-6 w-full bg-linear-to-b from-cyan-300/8 to-transparent" />
            </motion.div>
          )}

          {/* Flood water — rises from 0 then oscillates */}
          <motion.div
            initial={{ height: "0%" }}
            animate={{ height: prefersReduced ? "24%" : ["0%", "24%"] }}
            transition={
              prefersReduced
                ? { duration: 0 }
                : { duration: 1.3, delay: 2.0, ease: [0.16, 1, 0.3, 1] }
            }
            className="absolute bottom-0 left-0 right-0 overflow-hidden"
          >
            {/* Wave surface */}
            {!prefersReduced && (
              <motion.div
                animate={{ x: ["-6%", "6%", "-6%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-2 left-[-6%] right-[-6%] h-5 rounded-[50%] bg-blue-400/35 blur-[6px]"
              />
            )}

            {/* Water body gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-blue-900/92 via-blue-600/65 to-cyan-400/35" />

            {/* Shimmer reflection */}
            {!prefersReduced && (
              <motion.div
                animate={{ opacity: [0.08, 0.22, 0.08] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-linear-to-b from-white/15 to-transparent"
              />
            )}
          </motion.div>

          {/* Flood depth card — slides in after water rises */}
          <motion.div
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: prefersReduced ? 0 : 2.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-4 top-4 rounded-2xl bg-white/96 px-5 py-4 text-slate-950 shadow-2xl"
          >
            <p className="text-[9px] font-black uppercase tracking-wider text-blue-600">
              Estimated depth
            </p>
            <p className="mt-1 text-3xl font-black leading-none tabular-nums text-slate-900">
              2.4 ft
            </p>
          </motion.div>
        </div>

        {/* Bottom metrics strip */}
        <div className="grid grid-cols-3 gap-2 p-3">
          <MiniMetric label="Risk" value="Moderate" />
          <MiniMetric label="Detection" value="Door" />
          <MiniMetric label="Source" value="Street View" />
        </div>
      </div>
    </motion.div>
  );
}
