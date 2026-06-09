import { Home, Info, MapPin, ShieldAlert, Waves } from "lucide-react";
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
    <aside className="grid gap-5">
      <section className="relative overflow-hidden rounded-4xl border border-white/10 bg-linear-to-br from-cyan-300/15 via-blue-500/10 to-[#101d30] p-6 shadow-2xl">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-300/20 blur-3xl" />

        <div className="relative">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-950 shadow-xl">
            <Waves className="h-7 w-7 text-blue-600" />
          </div>

          <p className="text-sm font-black uppercase tracking-wide text-cyan-100/70">
            Waterline coverage
          </p>

          <p className="mt-2 text-5xl font-black text-white">
            {floodLinePercent}%
          </p>

          <p className="mt-3 leading-7 text-slate-300">
            Approximate amount of the image filled from the bottom to the
            predicted waterline.
          </p>
        </div>
      </section>

      <AddressPanel address={address} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        <ResultMetricCard
          icon={<ShieldAlert className="h-5 w-5" />}
          label="Risk signal"
          value="Moderate"
          tone="rose"
        />

        <ResultMetricCard
          icon={<Home className="h-5 w-5" />}
          label="Image source"
          value={imageSource}
          tone="cyan"
        />

        <ResultMetricCard
          icon={<Info className="h-5 w-5" />}
          label="Next step"
          value="Cost estimate"
          tone="blue"
        />
      </div>
    </aside>
  );
}

function AddressPanel({ address }: { address: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1 }}
      className="rounded-4xl border border-white/10 bg-white/6 p-5 shadow-xl"
    >
      <div className="flex gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-300/15 text-cyan-200">
          <MapPin className="h-5 w-5" />
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-wide text-slate-400">
            Saved address
          </p>

          <p className="mt-1 font-black leading-6 text-white">{address}</p>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Stored for later road altitude and elevation lookup, even if the
            preview used an uploaded image.
          </p>
        </div>
      </div>
    </motion.section>
  );
}
