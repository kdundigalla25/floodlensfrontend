import { Home, Info, MapPin, Waves } from "lucide-react";
import { motion } from "framer-motion";
import { ResultMetricCard } from "./ResultMetricCard";
import type { FloodPreviewResult } from "../../lib/floodPreview";

type Props = {
  result: FloodPreviewResult;
  address: string;
  imageSource: string;
};

export function ResultDetailsPanel({ result, address, imageSource }: Props) {
  const floodLinePercent = Math.round(result.floodFillFromBottom * 100);

  return (
    <aside className="grid gap-4">
      {/* Flood level */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="rounded-4xl border border-white/10 bg-[#0d1a2b] p-6 shadow-xl"
      >
        <div className="mb-4 flex items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
            style={{
              background: "linear-gradient(135deg, #22d3ee, #3b82f6)",
              boxShadow: "0 0 16px rgba(34,211,238,0.28)",
            }}
          >
            <Waves className="h-[18px] w-[18px] text-white" />
          </div>
          <div>
            <p className="font-semibold text-white">Flood level estimate</p>
            <p className="text-sm text-slate-400">
              Predicted waterline coverage from ground up
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="overflow-hidden rounded-full border border-white/10 bg-white/[0.05] h-2.5">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #3b82f6, #22d3ee)" }}
            initial={{ width: "0%" }}
            animate={{ width: `${floodLinePercent}%` }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          />
        </div>

        <div className="mt-2.5 flex items-center justify-between">
          <span className="text-xs text-slate-500">Ground</span>
          <motion.span
            className="text-sm font-bold text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {floodLinePercent}%
          </motion.span>
          <span className="text-xs text-slate-500">Max</span>
        </div>
      </motion.section>

      {/* Address */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.08 }}
        className="rounded-4xl border border-white/10 bg-[#0d1a2b] p-5 shadow-xl"
      >
        <div className="flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-slate-400">
            <MapPin className="h-[18px] w-[18px]" />
          </div>

          <div className="min-w-0">
            <p className="text-sm text-slate-400">Saved address</p>
            <p className="mt-0.5 font-semibold leading-6 text-white">{address}</p>
            <p className="mt-1.5 text-xs leading-5 text-slate-500">
              Stored for road altitude and elevation lookup.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Metric cards */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.14 }}
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1"
      >
        <ResultMetricCard
          icon={<Home className="h-4 w-4" />}
          label="Image source"
          value={imageSource}
          tone="cyan"
        />

        <ResultMetricCard
          icon={<Info className="h-4 w-4" />}
          label="Next step"
          value="Cost estimate"
          tone="blue"
        />
      </motion.div>
    </aside>
  );
}
