import { motion } from "framer-motion";
import { heroImage } from "./homeContent";
import { MiniMetric } from "./MiniMetric";

export function HeroPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 34, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.75, delay: 0.2 }}
      className="relative hidden w-full max-w-xl justify-self-end lg:block"
    >
      <div className="absolute -inset-8 rounded-[3rem] bg-linear-to-br from-cyan-300/25 to-blue-700/20 blur-3xl" />

      <div className="relative overflow-hidden rounded-[2.25rem] border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur-2xl">
        <div className="overflow-hidden rounded-[1.75rem] bg-[#08111f]">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div>
              <p className="text-sm font-black text-white">FloodLens Preview</p>
              <p className="text-xs text-slate-400">Live visual mockup</p>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-emerald-300/15 px-3 py-1 text-xs font-black text-emerald-200">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              Ready
            </div>
          </div>

          <div className="relative aspect-[4/4.1] overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${heroImage})` }}
            />

            <div className="absolute inset-0 bg-linear-to-t from-[#07111F]/50 via-transparent to-transparent" />

            <motion.div
              initial={{ height: "0%" }}
              animate={{ height: ["22%", "28%", "24%"] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              className="absolute bottom-0 left-0 right-0 overflow-hidden bg-linear-to-t from-blue-700/80 via-blue-500/55 to-cyan-300/35"
            >
              <motion.div
                animate={{ x: ["-8%", "8%", "-8%"] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-3 left-0 h-8 w-full rounded-full bg-cyan-200/70 blur-sm"
              />
            </motion.div>

            <div className="absolute left-5 top-5 rounded-3xl bg-white/95 px-5 py-4 text-slate-950 shadow-2xl">
              <p className="text-xs font-black uppercase tracking-wide text-blue-600">
                Estimated depth
              </p>
              <p className="mt-1 text-3xl font-black">2.4 ft</p>
            </div>

            <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-3">
              <MiniMetric label="Risk" value="Moderate" />
              <MiniMetric label="Line" value="Set" />
              <MiniMetric label="Source" value="Photo" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
