import { Camera, CloudRain, Ruler, Waves } from "lucide-react";
import { motion } from "framer-motion";
import { StepCard } from "./StepCard";

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative bg-[#07111F] px-5 py-24 md:px-8"
    >
      <div className="absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-3xl"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold text-cyan-100">
            <Waves className="h-4 w-4 text-cyan-300" />
            Three-step preview
          </div>

          <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">
            Built to feel simple, even when the data is complex.
          </h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          <StepCard
            icon={<Camera className="h-7 w-7" />}
            number="01"
            title="Enter the address"
            text="We start with location so the app can check Street View and keep the address for elevation lookup."
          />

          <StepCard
            icon={<Ruler className="h-7 w-7" />}
            number="02"
            title="Use Street View or upload"
            text="If a usable Street View image exists, we use it. If not, upload a front-facing photo manually."
          />

          <StepCard
            icon={<CloudRain className="h-7 w-7" />}
            number="03"
            title="Preview flood height"
            text="Generate a visual overlay showing where flood water may reach on the home."
          />
        </div>
      </div>
    </section>
  );
}
