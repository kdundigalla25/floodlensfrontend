import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Download } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  imageSource: string;
};

export function ResultsHeader({ imageSource }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
    >
      <div>
        <Link
          to="/upload"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to upload
        </Link>

        <h1 className="max-w-3xl text-4xl font-black tracking-tight text-white md:text-5xl">
          Here's how flood water could reach your home.
        </h1>

        <p className="mt-4 max-w-xl text-base leading-7 text-slate-400">
          Preview generated from <span className="font-semibold text-slate-300">{imageSource}</span> — scale,
          elevation, and flood data combined into a waterline estimate.
        </p>
      </div>

      <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row">
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          <Download className="h-4 w-4 text-cyan-400" />
          Save report
        </button>

        <Link
          to="/upload"
          className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white transition hover:scale-[1.02]"
          style={{
            background: "linear-gradient(90deg, #22d3ee, #3b82f6)",
            boxShadow: "0 4px 20px rgba(34,211,238,0.22)",
          }}
        >
          Try another home
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
}
