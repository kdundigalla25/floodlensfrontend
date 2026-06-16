import { Camera, Upload, Waves } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export type StepNumber = "01" | "02" | "03";

type StepCardProps = {
  icon: React.ReactNode;
  number: StepNumber;
  title: string;
  text: string;
};

const config: Record<
  StepNumber,
  { iconRing: string; accent: string; bar: string }
> = {
  "01": {
    iconRing: "bg-cyan-300/12 text-cyan-300",
    accent: "from-cyan-400/10 via-transparent to-transparent",
    bar: "bg-cyan-300",
  },
  "02": {
    iconRing: "bg-blue-400/12 text-blue-300",
    accent: "from-blue-500/10 via-transparent to-transparent",
    bar: "bg-blue-400",
  },
  "03": {
    iconRing: "bg-indigo-400/12 text-indigo-300",
    accent: "from-indigo-500/10 via-transparent to-transparent",
    bar: "bg-indigo-400",
  },
};

export function StepCard({ icon, number, title, text }: StepCardProps) {
  const c = config[number];
  const prefersReduced = useReducedMotion();

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={prefersReduced ? {} : { y: -8 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative overflow-hidden rounded-3xl border border-white/8 bg-[#0d1a2a] bg-linear-to-br ${c.accent} p-7 shadow-2xl`}
    >
      {/* Corner radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.035),transparent_55%)]" />

      {/* Watermark step number */}
      <div className="absolute right-5 top-3 select-none text-[5.5rem] font-black leading-none text-white/4">
        {number}
      </div>

      {/* Icon badge */}
      <div className={`mb-7 flex h-12 w-12 items-center justify-center rounded-2xl ${c.iconRing}`}>
        {icon}
      </div>

      {/* Visual mockup */}
      <div className="mb-6 overflow-hidden rounded-2xl border border-white/8 bg-[#060f1a]">
        <MockVisual number={number} prefersReduced={!!prefersReduced} />
      </div>

      {/* Text */}
      <h3 className="text-lg font-black tracking-tight text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-500">{text}</p>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
        <div
          className={`h-full ${c.bar} transition-all duration-700 group-hover:w-full`}
          style={{
            width: number === "01" ? "33%" : number === "02" ? "66%" : "100%",
          }}
        />
      </div>
    </motion.article>
  );
}

function MockVisual({
  number,
  prefersReduced,
}: {
  number: StepNumber;
  prefersReduced: boolean;
}) {
  if (number === "01") {
    return (
      <div className="relative h-36 p-4">
        {/* Address input mockup */}
        <div className="rounded-xl border border-white/8 bg-white/5 px-4 py-3">
          <p className="text-[9px] font-black uppercase tracking-wider text-slate-600">
            Street address
          </p>
          <div className="mt-1.5 flex items-center gap-2">
            <p className="text-sm font-black text-white">311 W University Dr</p>
            <motion.span
              animate={prefersReduced ? {} : { opacity: [1, 0, 1] }}
              transition={{ duration: 0.85, repeat: Infinity }}
              className="h-4 w-[2px] bg-cyan-300"
            />
          </div>
        </div>

        {/* Lookup indicator */}
        <div className="mt-3 flex items-center gap-2">
          <motion.div
            animate={prefersReduced ? {} : { opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="h-1.5 w-1.5 rounded-full bg-cyan-300"
          />
          <p className="text-[10px] text-cyan-300/55">Checking Street View...</p>
        </div>

        {/* Bottom action */}
        <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-cyan-300/12 px-3 py-1.5 text-[10px] font-black text-cyan-300">
          <Camera className="h-3 w-3" />
          Find image
        </div>
      </div>
    );
  }

  if (number === "02") {
    return (
      <div className="relative h-36 p-3">
        <div className="grid h-full grid-cols-2 gap-2">
          {/* Street View option — active */}
          <div className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-cyan-300/35 bg-cyan-300/8">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-300/18">
              <Camera className="h-4 w-4 text-cyan-300" />
            </div>
            <p className="text-[9px] font-black text-cyan-300">Street View</p>
            <p className="text-[8px] text-cyan-300/45">Auto-detected</p>
          </div>

          {/* Upload fallback — dimmed */}
          <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-white/6 bg-white/3 opacity-50">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/8">
              <Upload className="h-4 w-4 text-slate-500" />
            </div>
            <p className="text-[9px] font-black text-slate-500">Upload</p>
            <p className="text-[8px] text-slate-600">If needed</p>
          </div>
        </div>
      </div>
    );
  }

  // 03 — Flood preview mockup
  return (
    <div className="relative h-36 overflow-hidden bg-[#060f1a]">
      {/* Sky background */}
      <div className="absolute inset-0 bg-linear-to-b from-slate-800/40 to-slate-900/60" />

      {/* Water fill */}
      <motion.div
        animate={
          prefersReduced
            ? { height: "26%" }
            : { height: ["22%", "30%", "24%"] }
        }
        transition={{
          duration: 3.2,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-blue-900/95 via-blue-600/70 to-cyan-400/38"
      />

      {/* Flood line indicator */}
      <div
        className="absolute left-0 right-0"
        style={{ bottom: "24%" }}
      >
        <div className="h-px bg-cyan-300/40" />
        <p className="absolute right-2 -top-[18px] text-[8px] font-black tracking-wider text-cyan-300/70">
          FLOOD LINE
        </p>
      </div>

      {/* Depth card */}
      <div className="absolute left-3 top-3 rounded-xl bg-white/95 px-3 py-2 shadow-lg">
        <p className="text-[8px] font-black uppercase tracking-wider text-blue-600">
          Depth
        </p>
        <p className="text-xl font-black leading-none text-slate-900">2.4 ft</p>
      </div>

      <Waves className="absolute bottom-3 right-3 h-4 w-4 text-cyan-300/40" />
    </div>
  );
}
