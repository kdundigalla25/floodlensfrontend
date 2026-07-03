import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  imageSource: string;
};

export function ResultsHeader({ imageSource }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="relative mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
    >
      <div>
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100">
          <Sparkles className="h-4 w-4 text-cyan-300" />
          Preview from {imageSource}
        </div>

        <h1 className="max-w-3xl text-4xl font-bold leading-[1.02] text-white md:text-5xl lg:text-6xl">
          Here is how high the water could reach.
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
          We turned image scale, elevation, and flood data into a visual
          waterline on your home.
        </p>
      </div>

      <Link
        to="/upload"
        className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-linear-to-r from-cyan-300 to-blue-500 px-6 py-3.5 font-bold text-slate-950 shadow-lg shadow-cyan-500/25 transition hover:scale-[1.03] active:scale-[0.98]"
      >
        Check another home
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
      </Link>
    </motion.div>
  );
}
