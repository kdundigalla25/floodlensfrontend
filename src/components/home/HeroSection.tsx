import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { heroImage } from "./homeContent";
import { HeroPreview } from "./HeroPreview";

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-12">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      <div className="absolute inset-0 bg-linear-to-r from-[#07111F] via-[#07111F]/85 to-[#07111F]/35" />
      <div className="absolute inset-0 bg-linear-to-t from-[#07111F] via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1 }}
        className="absolute left-10 top-20 hidden h-56 w-56 rounded-full bg-cyan-300/20 blur-3xl lg:block"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.15 }}
        className="absolute bottom-24 right-10 hidden h-72 w-72 rounded-full bg-blue-500/20 blur-3xl lg:block"
      />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-96px)] max-w-7xl items-center gap-8 px-5 py-16 md:px-8 lg:grid-cols-[1fr_0.75fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="max-w-3xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-white/10 px-4 py-2 text-sm font-bold text-cyan-100 shadow-2xl backdrop-blur-xl">
            <Sparkles className="h-4 w-4 text-cyan-300" />
            Visual flood risk for your home
          </div>

          <h1 className="text-4xl font-black leading-[0.96] tracking-tight text-white md:text-6xl lg:text-7xl">
            See flood risk before it reaches your door.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-200 md:text-lg md:leading-8">
            Enter an address or upload a front-facing photo. Then visualize how
            high flood water could reach on your actual home.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/upload"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-cyan-300 to-blue-500 px-7 py-4 font-black text-slate-950 shadow-2xl shadow-cyan-500/25 transition hover:scale-[1.03]"
            >
              Start visualization
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </Link>

            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-7 py-4 font-bold text-white shadow-2xl backdrop-blur-xl transition hover:bg-white/15"
            >
              See how it works
            </a>
          </div>
        </motion.div>

        <HeroPreview />
      </div>
    </section>
  );
}
