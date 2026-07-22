import { motion } from "framer-motion";
import { DemoStage, HouseGlyph, VerdictChip } from "./guidePrimitives";
import { useDemoPhase } from "./useDemoPhase";

// Side-on view of someone photographing a house. Phase 0 is level (correct),
// the others tilt the phone down and up so the mistake is obvious.
const PITCH_PHASES = [0, -20, 0, 15];

export function PitchDemo() {
  const phase = useDemoPhase(PITCH_PHASES.length, 1800);
  const pitch = PITCH_PHASES[phase];
  const level = pitch === 0;

  return (
    <DemoStage>
      <VerdictChip ok={level} text={level ? "Level" : "Tilted"} />

      {/* Eye-level reference the camera axis should sit on. */}
      <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-white/12" />
      <span className="absolute left-4 top-1/2 -mt-5 text-[10px] font-black uppercase tracking-widest text-white/25">
        Horizon
      </span>

      {/* Ground plane. */}
      <div className="absolute inset-x-0 bottom-9 border-t border-white/12" />

      <div className="absolute bottom-9 right-8 text-cyan-200/70">
        <HouseGlyph className="h-24 w-24" highlightDoor={level} />
      </div>

      {/* Phone seen edge-on, pivoting around its own centre with the camera
          axis rigidly attached — rotating the group tilts both together. */}
      <motion.div
        className="absolute left-24 top-1/2 h-0 w-0"
        animate={{ rotate: -pitch }}
        transition={{ type: "spring", stiffness: 90, damping: 15 }}
      >
        <div className="absolute left-0 top-0 h-16 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/50 bg-white/15 shadow-lg" />
        <div className="absolute left-0 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200" />

        <div
          className={[
            "absolute left-4 top-0 h-px w-42 -translate-y-1/2 bg-linear-to-r to-transparent",
            level ? "from-emerald-300/90" : "from-rose-300/90",
          ].join(" ")}
        />
      </motion.div>

      <div
        className={[
          "absolute bottom-4 left-4 rounded-xl border px-3 py-1.5 font-display text-lg font-bold tabular-nums transition-colors",
          level
            ? "border-emerald-300/30 bg-emerald-400/12 text-emerald-200"
            : "border-rose-300/30 bg-rose-400/12 text-rose-200",
        ].join(" ")}
      >
        {pitch > 0 ? "+" : ""}
        {pitch}° pitch
      </div>
    </DemoStage>
  );
}
