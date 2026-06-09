import { CheckCircle2, Home, MapPin, ShieldCheck, Waves } from "lucide-react";
import { motion } from "framer-motion";
import { stormImage } from "./homeContent";
import { FeaturePill } from "./FeaturePill";

export function ImageStorySection() {
  return (
    <section id="preview" className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${stormImage})` }}
      />

      <div className="absolute inset-0 bg-[#07111F]/70" />
      <div className="absolute inset-0 bg-linear-to-r from-[#07111F] via-[#07111F]/80 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-5 py-24 md:px-8">
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-160px" }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl rounded-4xl border border-white/10 bg-[#101e31]/80 p-7 shadow-2xl backdrop-blur-xl md:p-10"
        >
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-300/15 text-cyan-200">
            <Home className="h-7 w-7" />
          </div>

          <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">
            A picture makes risk harder to ignore.
          </h2>

          <p className="mt-6 text-base leading-8 text-slate-300 md:text-lg">
            Flood maps and numbers can be abstract. Showing water directly on a
            user’s home makes the impact more personal and easier to understand.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <FeaturePill icon={<CheckCircle2 />} text="Visual, not abstract" />
            <FeaturePill icon={<MapPin />} text="Address-first flow" />
            <FeaturePill icon={<ShieldCheck />} text="Insurance education" />
            <FeaturePill icon={<Waves />} text="Flood-height overlay" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
