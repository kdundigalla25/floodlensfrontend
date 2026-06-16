import { motion } from "framer-motion";

type Props = {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone: "cyan" | "blue" | "rose" | "emerald";
};

const toneStyles = {
  cyan: {
    border: "rgba(34,211,238,0.15)",
    iconBg: "rgba(34,211,238,0.1)",
    iconColor: "#67e8f9",
  },
  blue: {
    border: "rgba(96,165,250,0.15)",
    iconBg: "rgba(96,165,250,0.1)",
    iconColor: "#93c5fd",
  },
  rose: {
    border: "rgba(251,113,133,0.15)",
    iconBg: "rgba(251,113,133,0.1)",
    iconColor: "#fda4af",
  },
  emerald: {
    border: "rgba(52,211,153,0.15)",
    iconBg: "rgba(52,211,153,0.1)",
    iconColor: "#6ee7b7",
  },
};

export function ResultMetricCard({ icon, label, value, tone }: Props) {
  const styles = toneStyles[tone];

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.18 }}
      className="rounded-3xl border bg-[#0d1a2b] p-5 shadow-lg"
      style={{ borderColor: styles.border }}
    >
      <div
        className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
        style={{ background: styles.iconBg, color: styles.iconColor }}
      >
        {icon}
      </div>

      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-1 text-xl font-bold text-white">{value}</p>
    </motion.div>
  );
}
