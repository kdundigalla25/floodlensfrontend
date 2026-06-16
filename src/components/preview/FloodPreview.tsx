import { motion } from "framer-motion";
import { Maximize2, Waves } from "lucide-react";

type Props = {
  imageUrl: string;
  floodLine: number;
};

export function FloodPreview({ imageUrl, floodLine }: Props) {
  const safeFloodLine = Math.min(1, Math.max(0, floodLine));
  const floodPercent = Math.round(safeFloodLine * 100);

  return (
    <motion.section
      initial={{ opacity: 0, y: 22, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55 }}
      className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0b1626] p-4 shadow-2xl"
    >
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />
      <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="relative mb-4 flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-300/15 text-cyan-200">
            <Waves className="h-5 w-5" />
          </div>

          <div>
            <p className="font-black text-white">Visual waterline</p>
            <p className="text-sm text-slate-400">Generated flood overlay</p>
          </div>
        </div>

        <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm font-black text-white sm:flex">
          <Maximize2 className="h-4 w-4 text-cyan-300" />
          {floodPercent}% fill
        </div>
      </div>

      <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-slate-950">
        <img
          src={imageUrl}
          alt="House flood visualization"
          className="max-h-190 w-full object-contain"
        />

        <motion.div
          initial={{ height: "0%" }}
          animate={{ height: `${safeFloodLine * 100}%` }}
          transition={{ duration: 1.35, ease: "easeOut" }}
          className="absolute bottom-0 left-0 right-0 overflow-hidden bg-linear-to-t from-blue-800/85 via-blue-500/55 to-cyan-300/35"
        >
          <motion.div
            animate={{ x: ["-8%", "8%", "-8%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-3 left-0 h-8 w-full rounded-full bg-cyan-200/60 blur-sm"
          />

          <div className="absolute left-0 right-0 top-0 border-t-4 border-cyan-200/90" />

          <motion.div
            animate={{ opacity: [0.3, 0.55, 0.3] }}
            transition={{ duration: 2.4, repeat: Infinity }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.28),transparent_26%)]"
          />
        </motion.div>

        <div className="absolute bottom-5 right-5 rounded-full border border-white/15 bg-slate-950/75 px-4 py-2 text-sm font-black text-white shadow-xl backdrop-blur-xl">
          Preview result
        </div>
      </div>
    </motion.section>
  );
}
