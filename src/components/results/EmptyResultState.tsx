import { Link } from "react-router-dom";
import { ArrowRight, Waves } from "lucide-react";
import { motion } from "framer-motion";
import { WaveBand } from "../common/WaveBand";

export function EmptyResultState() {
  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-3xl items-center px-6 pb-24 pt-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="relative isolate w-full overflow-hidden rounded-[2rem] border border-white/10 bg-tide p-8 shadow-2xl md:p-10"
      >

        <div className="relative">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-300/15 text-cyan-200">
            <Waves className="h-7 w-7" />
          </div>

          <h1 className="text-3xl font-bold text-white md:text-4xl">
            No preview yet
          </h1>

          <p className="mt-3 max-w-md leading-7 text-slate-400">
            Start from an address or a photo and we will generate a flood
            waterline for your home.
          </p>

          <Link
            to="/upload"
            className="group mt-7 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-cyan-300 to-blue-500 px-6 py-3.5 font-bold text-slate-950 shadow-lg shadow-cyan-500/25 transition hover:scale-[1.03] active:scale-[0.98]"
          >
            Check my home
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
        </div>

        <WaveBand
          className="absolute inset-x-0 bottom-0 w-full opacity-60"
          fill="#0e6ea3"
          height={70}
          seconds={16}
        />
      </motion.div>
    </main>
  );
}
