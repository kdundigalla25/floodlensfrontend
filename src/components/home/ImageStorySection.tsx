import { CheckCircle2, Home, MapPin, ShieldCheck, TrendingUp, Waves } from "lucide-react";
import { motion } from "framer-motion";
import { stormImage } from "./homeContent";
import { FeaturePill } from "./FeaturePill";

export function ImageStorySection() {
  return (
    <section id="preview" className="relative min-h-[100dvh] overflow-hidden">
      {/* Background photo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${stormImage})` }}
      />

      {/* Layered overlays */}
      <div className="absolute inset-0 bg-[#07111F]/72" />
      <div className="absolute inset-0 bg-linear-to-r from-[#07111F] via-[#07111F]/75 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-[#07111F] to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl items-center px-5 py-24 md:px-8">

        {/* Content card */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-160px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl rounded-3xl border border-white/10 bg-[#0d1a2a]/85 p-8 shadow-2xl backdrop-blur-xl md:p-10"
        >
          {/* Icon */}
          <div className="mb-7 flex h-13 w-13 items-center justify-center rounded-2xl border border-cyan-300/18 bg-cyan-300/10">
            <Home className="h-6 w-6 text-cyan-200" />
          </div>

          {/* Headline */}
          <h2 className="text-3xl font-black leading-tight tracking-tight text-white md:text-[2.6rem]">
            A picture makes risk impossible to ignore.
          </h2>

          {/* Body */}
          <p className="mt-6 text-base leading-7 text-slate-400">
            Flood zone maps and risk scores are easy to dismiss. Seeing water overlaid on your actual home makes the impact personal and immediate.
          </p>

          {/* Feature pills */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <FeaturePill icon={<CheckCircle2 className="h-4 w-4" />} text="Visual, not abstract" />
            <FeaturePill icon={<MapPin className="h-4 w-4" />} text="Address-first flow" />
            <FeaturePill icon={<ShieldCheck className="h-4 w-4" />} text="Insurance education" />
            <FeaturePill icon={<Waves className="h-4 w-4" />} text="Flood-height overlay" />
          </div>
        </motion.div>

        {/* Floating stat widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-20 right-6 hidden rounded-2xl border border-white/10 bg-[#0d1a2a]/92 p-5 shadow-2xl backdrop-blur-xl md:block lg:right-12"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-400/12">
              <TrendingUp className="h-5 w-5 text-rose-300" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Avg. NFIP flood claim
              </p>
              <p className="text-xl font-black text-white">~$52,000</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
