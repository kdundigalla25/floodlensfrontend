import { Link } from "react-router-dom";
import { ArrowRight, AlertCircle, Droplets } from "lucide-react";
import { motion } from "framer-motion";

const statVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as number[] },
  }),
};

export function WhySection() {
  return (
    <section id="why" className="bg-[#07111F] px-5 py-28 md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">
            Flood risk is often misunderstood.
          </h2>
          <p className="mt-4 max-w-lg text-base text-slate-500 md:text-lg">
            FloodLens makes it visual, personal, and actionable.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid gap-4 lg:grid-cols-[1fr_1.55fr]">

          {/* Left column — stat tiles */}
          <div className="flex flex-col gap-4">

            {/* Stat 1 */}
            <motion.div
              custom={0}
              variants={statVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="flex-1 rounded-3xl border border-white/8 bg-[#0d1a2a] p-8"
            >
              <p className="text-5xl font-black text-cyan-300">1 in 4</p>
              <p className="mt-4 text-sm font-bold leading-6 text-white">
                flood insurance claims come from outside designated high-risk zones
              </p>
              <p className="mt-2 text-xs text-slate-600">Source: FEMA NFIP data</p>
            </motion.div>

            {/* Stat 2 */}
            <motion.div
              custom={1}
              variants={statVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="flex-1 rounded-3xl border border-white/8 bg-[#0d1a2a] p-8"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-rose-400/12">
                <AlertCircle className="h-5 w-5 text-rose-300" />
              </div>
              <p className="text-sm font-bold leading-6 text-white">
                Flooding is the most common and costly natural disaster in the United States
              </p>
              <p className="mt-2 text-xs text-slate-600">Source: FEMA</p>
            </motion.div>
          </div>

          {/* Right column — CTA tile */}
          <motion.div
            custom={2}
            variants={statVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d1a2a] p-8 md:p-10"
          >
            {/* Accent glow */}
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/8 blur-3xl" />

            <div className="relative">
              <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300/12">
                <Droplets className="h-6 w-6 text-cyan-300" />
              </div>

              <h3 className="text-2xl font-black tracking-tight text-white md:text-3xl">
                Most homeowners think about flood insurance too late.
              </h3>

              <p className="mt-5 text-base leading-7 text-slate-400">
                FloodLens puts the risk in context by showing flood depth on your actual home, using real address data and AI-powered reference detection.
              </p>

              {/* Divider */}
              <div className="my-8 h-px bg-white/8" />

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  to="/upload"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-cyan-400 to-blue-500 px-7 py-4 text-sm font-black text-slate-950 shadow-[0_0_28px_rgba(34,211,238,0.2)] transition hover:shadow-[0_0_38px_rgba(34,211,238,0.35)] hover:scale-[1.02] active:scale-[0.99]"
                >
                  Check my home
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <p className="text-xs text-slate-600">Free, no signup required</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
