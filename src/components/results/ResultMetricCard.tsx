import { motion } from "framer-motion";

type Props = {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone: "cyan" | "blue" | "rose" | "emerald";
};

export function ResultMetricCard({ icon, label, value, tone }: Props) {
  const toneClasses = {
    cyan: "from-cyan-300/15 to-[#101d30] text-cyan-200",
    blue: "from-blue-400/15 to-[#101d30] text-blue-200",
    rose: "from-rose-300/15 to-[#101d30] text-rose-200",
    emerald: "from-emerald-300/15 to-[#101d30] text-emerald-200",
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.01 }}
      className={`group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-linear-to-br ${toneClasses[tone]} p-5 shadow-xl`}
    >
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/10 blur-2xl transition group-hover:bg-white/20" />

      <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
        {icon}
      </div>

      <p className="relative text-xs font-black uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="relative mt-2 text-2xl font-black text-white">{value}</p>
    </motion.div>
  );
}
