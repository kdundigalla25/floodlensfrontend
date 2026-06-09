import { motion } from "framer-motion";

type Props = {
  icon: React.ReactElement;
  text: string;
};

export function FeaturePill({ icon, text }: Props) {
  return (
    <motion.div
      whileHover={{ x: 4, scale: 1.02 }}
      className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm font-bold text-white shadow-lg backdrop-blur-xl transition hover:bg-white/12"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-300/15 text-cyan-200 transition group-hover:bg-cyan-300/25">
        {icon}
      </span>
      {text}
    </motion.div>
  );
}
