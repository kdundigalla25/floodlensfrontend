import { useEffect } from "react";
import { Waves } from "lucide-react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from "framer-motion";

type Props = {
  imageUrl: string;
  floodLine: number;
  // How far up the detected door the water reaches (0-100), or null when no
  // reference box was returned. `aboveDoor` means the water tops the door.
  doorPct: number | null;
  aboveDoor: boolean;
  referenceLabel: string;
  depthFeet: number;
};

const EASE = [0.16, 1, 0.3, 1] as const;

export function FloodPreview({
  imageUrl,
  floodLine,
  doorPct,
  aboveDoor,
  referenceLabel,
  depthFeet,
}: Props) {
  const safeFloodLine = Math.min(1, Math.max(0, floodLine));
  // Keep the waterline label away from the very top/bottom edges so it can
  // never clip out of the frame at extreme water levels.
  const labelBottom = Math.min(Math.max(safeFloodLine * 100, 6), 92);

  return (
    <motion.section
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-abyss p-4 shadow-2xl md:p-5"
    >
      <div className="relative mb-4 flex items-center gap-3 px-1">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-300/15 text-cyan-200">
          <Waves className="h-5 w-5" />
        </div>
        <div>
          <p className="font-display font-bold text-white">Visual waterline</p>
          <p className="text-sm text-slate-400">
            Predicted flood level on your home
          </p>
        </div>
      </div>

      {/* Image sized to its own box so the water overlay lines up exactly. */}
      <div className="relative mx-auto w-fit max-w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950">
        <img
          src={imageUrl}
          alt="House flood visualization"
          className="block max-h-[68vh] w-auto max-w-full"
        />

        <motion.div
          initial={{ height: "0%" }}
          animate={{ height: `${safeFloodLine * 100}%` }}
          transition={{ duration: 1.2, ease: EASE }}
          className="absolute inset-x-0 bottom-0 overflow-hidden bg-linear-to-t from-blue-800/85 via-blue-500/50 to-cyan-300/30"
        >
          <div className="absolute inset-x-0 top-0 border-t-2 border-cyan-200/90" />
          <motion.div
            animate={{ x: ["-10%", "10%", "-10%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-3 h-7 w-full rounded-full bg-cyan-200/60 blur-sm"
          />
          <motion.div
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.22),transparent_30%)]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, bottom: "6%" }}
          animate={{ opacity: 1, bottom: `${labelBottom}%` }}
          transition={{
            opacity: { duration: 0.4, delay: 0.8 },
            bottom: { duration: 1.2, ease: EASE },
          }}
          className="absolute left-4 flex -translate-y-1/2 items-center gap-2 rounded-full border border-white/15 bg-slate-950/80 px-3 py-1.5 text-xs font-bold text-white shadow-xl backdrop-blur-md"
        >
          <span className="h-2 w-2 rounded-full bg-cyan-300" />
          Predicted waterline
        </motion.div>
      </div>

      <Readout
        doorPct={doorPct}
        aboveDoor={aboveDoor}
        referenceLabel={referenceLabel}
        depthFeet={depthFeet}
      />
    </motion.section>
  );
}

function Readout({
  doorPct,
  aboveDoor,
  referenceLabel,
  depthFeet,
}: {
  doorPct: number | null;
  aboveDoor: boolean;
  referenceLabel: string;
  depthFeet: number;
}) {
  return (
    <div className="mt-4 flex items-center gap-5 rounded-2xl border border-white/10 bg-tide/60 p-5">
      <DoorGauge pct={doorPct ?? 0} above={aboveDoor} />

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-cyan-100/70">
          Relative to the {referenceLabel}
        </p>
        <p className="mt-1 font-display text-2xl font-bold leading-tight text-white md:text-3xl">
          {doorPct === null ? (
            "Predicted flood waterline shown above."
          ) : aboveDoor ? (
            <>Water rises above the {referenceLabel}.</>
          ) : doorPct === 0 ? (
            <>Water stays below the {referenceLabel}.</>
          ) : (
            <>
              Water reaches <CountUp value={doorPct} />% up the {referenceLabel}.
            </>
          )}
        </p>
        {doorPct !== null && (
          <p className="mt-1 text-sm text-slate-400">
            About {depthFeet.toFixed(1)} ft of water above the door base.
          </p>
        )}
      </div>
    </div>
  );
}

// A little door pictogram with the water rising inside it to the same level.
function DoorGauge({ pct, above }: { pct: number; above: boolean }) {
  const fill = above ? 100 : pct;
  return (
    <div className="relative h-20 w-14 shrink-0 overflow-hidden rounded-t-lg border-2 border-white/20 bg-white/5">
      <motion.div
        initial={{ height: "0%" }}
        animate={{ height: `${fill}%` }}
        transition={{ duration: 1.1, ease: EASE }}
        className="absolute inset-x-0 bottom-0 bg-linear-to-t from-blue-700/85 to-cyan-300/55"
      >
        <div className="absolute inset-x-0 top-0 border-t-2 border-cyan-200/90" />
      </motion.div>
      <span className="absolute right-1.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-white/50" />
    </div>
  );
}

// Counts the door percentage up, and animates between scenario values.
function CountUp({ value }: { value: number }) {
  const reduce = useReducedMotion();
  const mv = useMotionValue(reduce ? value : 0);
  const rounded = useTransform(mv, (v) => Math.round(v));

  useEffect(() => {
    if (reduce) {
      mv.set(value);
      return;
    }
    const controls = animate(mv, value, { duration: 0.9, ease: EASE });
    return () => controls.stop();
  }, [value, reduce, mv]);

  return <motion.span>{rounded}</motion.span>;
}
