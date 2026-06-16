import { Camera, Waves } from "lucide-react";
import { motion } from "framer-motion";

export type StepNumber = "01" | "02" | "03";

type StepCardProps = {
  icon: React.ReactNode;
  number: StepNumber;
  title: string;
  text: string;
};

const variants: Record<
  StepNumber,
  {
    bg: string;
    iconBg: string;
    accent: string;
    image: string;
  }
> = {
  "01": {
    bg: "from-cyan-300/20 via-sky-500/10 to-[#0E1B2C]",
    iconBg: "bg-cyan-300 text-slate-950",
    accent: "bg-cyan-300",
    image: "Address",
  },
  "02": {
    bg: "from-blue-500/20 via-indigo-500/10 to-[#0E1B2C]",
    iconBg: "bg-blue-400 text-white",
    accent: "bg-blue-400",
    image: "Fallback",
  },
  "03": {
    bg: "from-rose-400/20 via-orange-400/10 to-[#0E1B2C]",
    iconBg: "bg-rose-300 text-slate-950",
    accent: "bg-rose-300",
    image: "Preview",
  },
};

export function StepCard({ icon, number, title, text }: StepCardProps) {
  const variant = variants[number];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -10,
        rotate: number === "02" ? 0 : number === "01" ? -1 : 1,
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className={`group relative min-h-105 overflow-hidden rounded-[2.25rem] border border-white/10 bg-linear-to-br ${variant.bg} p-6 shadow-2xl`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_32%)]" />
      <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-white/10 blur-3xl transition group-hover:bg-white/20" />

      <div className="relative flex items-center justify-between">
        <div
          className={`flex h-16 w-16 items-center justify-center rounded-3xl ${variant.iconBg} shadow-2xl transition group-hover:scale-110`}
        >
          {icon}
        </div>

        <p className="text-7xl font-black leading-none text-white/8">
          {number}
        </p>
      </div>

      <div className="relative mt-10">
        <div className="mb-5 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/40 p-4">
          <MockStepVisual number={number} label={variant.image} />
        </div>

        <h3 className="text-xl font-black tracking-tight text-white">
          {title}
        </h3>

        <p className="mt-4 leading-7 text-slate-300">{text}</p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
        <div
          className={`h-full ${variant.accent} transition-all duration-500 group-hover:w-full`}
          style={{
            width: number === "01" ? "33%" : number === "02" ? "66%" : "100%",
          }}
        />
      </div>
    </motion.div>
  );
}

function MockStepVisual({
  number,
  label,
}: {
  number: StepNumber;
  label: string;
}) {
  if (number === "01") {
    return (
      <div className="relative h-36 overflow-hidden rounded-2xl bg-linear-to-br from-slate-900 to-slate-800">
        <div className="absolute left-4 right-4 top-5 rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
          <p className="text-[10px] font-black uppercase tracking-wide text-cyan-100/70">
            Street address
          </p>
          <p className="mt-1 text-sm font-black text-white">
            311 W University Dr
          </p>
        </div>

        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-cyan-300 px-4 py-2 text-xs font-black text-slate-950">
          <Camera className="h-4 w-4" />
          {label}
        </div>
      </div>
    );
  }

  if (number === "02") {
    return (
      <div className="relative h-36 overflow-hidden rounded-2xl bg-linear-to-br from-slate-900 to-blue-950">
        <div className="absolute inset-4 rounded-2xl border-2 border-dashed border-cyan-300/40" />

        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
          <Camera className="h-8 w-8 text-cyan-200" />
          <p className="mt-2 text-xs font-black text-cyan-100">{label}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-36 overflow-hidden rounded-2xl bg-linear-to-br from-slate-900 to-blue-950">
      <motion.div
        animate={{ height: ["28%", "42%", "34%"] }}
        transition={{ duration: 3.5, repeat: Infinity, repeatType: "mirror" }}
        className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-blue-600/80 to-cyan-300/40"
      />

      <div className="absolute left-5 top-5 rounded-full bg-white/10 px-3 py-1 text-xs font-black text-cyan-100">
        {label}
      </div>

      <Waves className="absolute bottom-5 right-5 h-8 w-8 text-cyan-100" />
    </div>
  );
}
