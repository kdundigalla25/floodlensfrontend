import { Camera, CloudRain, Ruler, Waves } from "lucide-react";
import { motion } from "framer-motion";
import { StepCard } from "./StepCard";

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as number[] },
  },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative bg-[#07111F] px-5 py-28 md:px-8"
    >
      {/* Centered ambient glow */}
      <div className="absolute left-1/2 top-28 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-400/6 blur-[80px]" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 max-w-2xl"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/4 px-4 py-2 text-xs font-bold tracking-wide text-slate-400">
            <Waves className="h-3.5 w-3.5 text-cyan-300" />
            Three-step process
          </div>

          <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">
            From address to flood preview in minutes.
          </h2>
        </motion.div>

        {/* Step cards — staggered on scroll */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-5 lg:grid-cols-3"
        >
          <motion.div variants={cardVariants}>
            <StepCard
              icon={<Camera className="h-6 w-6" />}
              number="01"
              title="Enter your address"
              text="Start with a street address. We check Google Street View availability and keep it for elevation lookup."
            />
          </motion.div>

          <motion.div variants={cardVariants}>
            <StepCard
              icon={<Ruler className="h-6 w-6" />}
              number="02"
              title="Street View or upload"
              text="If a usable Street View image is found, we use it automatically. Otherwise, upload a front-facing photo of your home."
            />
          </motion.div>

          <motion.div variants={cardVariants}>
            <StepCard
              icon={<CloudRain className="h-6 w-6" />}
              number="03"
              title="Preview flood height"
              text="Our model detects a door or garage, calculates real-world scale, and overlays the estimated flood waterline on your home."
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
