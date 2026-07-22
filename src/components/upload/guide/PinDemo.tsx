import { motion } from "framer-motion";
import { Camera, MapPin } from "lucide-react";
import { DemoStage, VerdictChip } from "./guidePrimitives";
import { useDemoPhase } from "./useDemoPhase";

// Top-down map. The pin slides between the camera position (correct) and the
// middle of the roof (the intuitive but wrong place to put it).
const CAMERA_Y = 168;
const HOUSE_Y = 64;

export function PinDemo() {
  const phase = useDemoPhase(2, 2200);
  const ok = phase === 0;

  return (
    <DemoStage>
      <VerdictChip
        ok={ok}
        text={ok ? "Where you stood" : "On the house"}
      />

      {/* Lots and driveways, kept faint so the pin stays the subject. */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute left-8 top-0 h-full w-px bg-white/8" />
        <div className="absolute right-8 top-0 h-full w-px bg-white/8" />
      </div>

      {/* House footprint, door edge facing the street. */}
      <div className="absolute left-1/2 top-6 h-20 w-32 -translate-x-1/2 rounded-lg border border-cyan-200/25 bg-cyan-200/8">
        <div className="absolute -bottom-px left-1/2 h-1 w-7 -translate-x-1/2 rounded-full bg-cyan-200/70" />
        <span className="absolute inset-x-0 top-3 text-center text-[10px] font-black uppercase tracking-widest text-cyan-100/35">
          House
        </span>
      </div>

      {/* Street. */}
      <div className="absolute inset-x-0 bottom-10 h-8 bg-white/5">
        <div className="absolute inset-x-6 top-1/2 border-t border-dashed border-white/20" />
      </div>

      {/* Line of sight from the camera to the front door. */}
      <div className="absolute left-1/2 top-[104px] h-16 border-l border-dashed border-cyan-200/25" />

      {/* The spot the photo was taken from. */}
      <div className="absolute left-1/2 top-[168px] flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-dashed border-cyan-200/50 bg-cyan-300/10 text-cyan-200">
        <Camera className="h-4 w-4" />
      </div>

      <div className="absolute left-1/2 top-0 -translate-x-1/2">
        <motion.div
          animate={{ y: ok ? CAMERA_Y : HOUSE_Y }}
          transition={{ type: "spring", stiffness: 120, damping: 16 }}
        >
          <div
            className={[
              "-translate-y-full transition-colors",
              ok ? "text-emerald-400" : "text-rose-400",
            ].join(" ")}
          >
            <MapPin
              className="h-8 w-8 drop-shadow-lg"
              fill="currentColor"
              strokeWidth={1.5}
            />
          </div>
        </motion.div>
      </div>

      <span className="absolute bottom-3 left-4 text-[10px] font-black uppercase tracking-widest text-white/25">
        Street
      </span>
    </DemoStage>
  );
}
