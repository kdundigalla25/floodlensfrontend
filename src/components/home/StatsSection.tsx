import { motion, type Variants } from "framer-motion";
import { Clock, Globe, Layers, Shield } from "lucide-react";

const stats = [
  {
    Icon: Clock,
    value: "< 5 min",
    label: "to generate your flood preview",
  },
  {
    Icon: Globe,
    value: "50 states",
    label: "address lookup coverage",
  },
  {
    Icon: Layers,
    value: "2 methods",
    label: "Street View or photo upload",
  },
  {
    Icon: Shield,
    value: "Free",
    label: "no account required",
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

export function StatsSection() {
  return (
    <section className="relative bg-[#07111F] px-5 md:px-8">
      {/* Hairline divider */}
      <div className="mx-auto max-w-7xl">
        <div className="h-px bg-linear-to-r from-transparent via-white/8 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl py-16">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {stats.map(({ Icon, value, label }) => (
            <motion.div
              key={value}
              variants={item}
              className="group flex flex-col gap-4 rounded-2xl border border-white/6 bg-white/3 p-6 transition hover:border-white/10 hover:bg-white/5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-300 transition group-hover:bg-cyan-300/15">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-black text-white">{value}</p>
                <p className="mt-1 text-sm leading-5 text-slate-500">{label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
