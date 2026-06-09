import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Download, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  imageSource: string;
};

export function ResultsHeader({ imageSource }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className="relative mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
    >
      <div>
        <Link
          to="/upload"
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm font-bold text-cyan-100 transition hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to upload
        </Link>

        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-100">
          <Sparkles className="h-4 w-4 text-cyan-300" />
          Preview generated from {imageSource}
        </div>

        <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl">
          Here’s how flood water could reach your home.
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
          This preview turns image scale, elevation inputs, and flood data into
          a visual waterline estimate on your home.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/8 px-5 py-3 font-black text-white shadow-xl transition hover:bg-white/12"
        >
          <Download className="h-4 w-4 text-cyan-300" />
          Save report
        </button>

        <Link
          to="/upload"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-cyan-300 to-blue-500 px-5 py-3 font-black text-slate-950 shadow-xl shadow-cyan-500/20 transition hover:scale-[1.02]"
        >
          Try another home
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
}
