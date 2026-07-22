import { motion } from "framer-motion";
import { DemoStage, HouseGlyph, VerdictChip } from "./guidePrimitives";
import { useDemoPhase } from "./useDemoPhase";

// Viewfinder. Phase 0 fits the whole facade, the door and the ground it stands
// on; phase 1 crops in until the door and the base of the wall are gone.
export function FramingDemo() {
  const phase = useDemoPhase(2, 2400);
  const ok = phase === 0;

  return (
    <DemoStage>
      <VerdictChip ok={ok} text={ok ? "Door in frame" : "Door cut off"} />

      <div className="absolute inset-5 overflow-hidden rounded-2xl bg-[#0a1626]">
        <motion.div
          className="absolute inset-0 flex items-end justify-center pb-7"
          animate={{ scale: ok ? 1 : 2.1, y: ok ? 0 : 46 }}
          transition={{ type: "spring", stiffness: 70, damping: 16 }}
        >
          <div className="text-cyan-200/70">
            <HouseGlyph className="h-28 w-28" highlightDoor={ok} />
          </div>
        </motion.div>

        {/* The line the water gets drawn against. */}
        <div
          className={[
            "absolute inset-x-0 bottom-6 border-t transition-colors",
            ok ? "border-emerald-300/60" : "border-white/8",
          ].join(" ")}
        />
        <span
          className={[
            "absolute bottom-1.5 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-widest transition-colors",
            ok ? "text-emerald-200/80" : "text-white/20",
          ].join(" ")}
        >
          Ground line
        </span>
      </div>

      {/* Viewfinder brackets. */}
      <Bracket className="left-4 top-4 border-l-2 border-t-2" />
      <Bracket className="right-4 top-4 border-r-2 border-t-2" />
      <Bracket className="bottom-4 left-4 border-b-2 border-l-2" />
      <Bracket className="bottom-4 right-4 border-b-2 border-r-2" />
    </DemoStage>
  );
}

function Bracket({ className }: { className: string }) {
  return (
    <div
      className={`pointer-events-none absolute h-5 w-5 rounded-[3px] border-white/35 ${className}`}
    />
  );
}
