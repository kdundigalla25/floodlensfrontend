import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Waves } from "lucide-react";

type Props = {
  onComplete: () => void;
};

// A vertical wavy silhouette used as the leading/trailing edge of the water
// wall, so the sweep reads as a cresting flood rather than a flat wipe.
const WAVE_EDGE =
  "M40,0 L40,0 C64,6 16,14 40,20 C64,26 16,34 40,40 C64,46 16,54 40,60 C64,66 16,74 40,80 C64,86 16,94 40,100 L0,100 L0,0 Z";

const WATER_GRADIENT =
  "linear-gradient(90deg, #041121 0%, #0b3a63 34%, #0e6ea3 68%, #35c6e6 100%)";

// Deterministic bubble field (no Math.random so SSR/hydration stays stable).
const BUBBLES = [
  { left: "12%", size: 10, delay: 0.15, drift: -14 },
  { left: "26%", size: 6, delay: 0.45, drift: 10 },
  { left: "41%", size: 14, delay: 0.05, drift: -8 },
  { left: "58%", size: 8, delay: 0.6, drift: 16 },
  { left: "72%", size: 5, delay: 0.3, drift: -12 },
  { left: "86%", size: 11, delay: 0.5, drift: 8 },
];

export function FloodIntro({ onComplete }: Props) {
  const reduceMotion = useReducedMotion();

  // Reduced motion or non-visual contexts skip straight to the page.
  useEffect(() => {
    if (!reduceMotion) return;
    onComplete();
  }, [reduceMotion, onComplete]);

  if (reduceMotion) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Darken the page underneath until the water has passed. */}
      <motion.div
        className="absolute inset-0 bg-abyss"
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 1, 0] }}
        transition={{ duration: 4, times: [0, 0.62, 1], ease: "easeInOut" }}
      />

      {/* The water wall: fills left-to-right, holds, then sweeps off-right. */}
      <motion.div
        className="absolute inset-y-0 left-0 w-screen"
        style={{ backgroundImage: WATER_GRADIENT }}
        initial={{ x: "-116%" }}
        animate={{ x: ["-116%", "0%", "0%", "116%"] }}
        transition={{ duration: 4, times: [0, 0.42, 0.6, 1], ease: [0.7, 0, 0.3, 1] }}
        onAnimationComplete={onComplete}
      >
        {/* Wavy leading edge (right) and trailing edge (left, mirrored). */}
        <svg
          className="absolute -right-20 top-0 h-full w-24"
          viewBox="0 0 40 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <motion.path
            d={WAVE_EDGE}
            fill="#35c6e6"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
        <svg
          className="absolute -left-20 top-0 h-full w-24 -scale-x-100"
          viewBox="0 0 40 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <motion.path
            d={WAVE_EDGE}
            fill="#041121"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>

        {/* Foam highlight riding the leading crest. */}
        <div className="absolute -right-2 top-0 h-full w-10 bg-linear-to-l from-cyan-100/70 to-transparent blur-md" />

        {/* Rising bubbles for depth. */}
        {BUBBLES.map((b, i) => (
          <motion.span
            key={i}
            className="absolute bottom-10 rounded-full bg-cyan-100/40 blur-[1px]"
            style={{ left: b.left, width: b.size, height: b.size }}
            animate={{ y: [40, -220], x: [0, b.drift], opacity: [0, 0.8, 0] }}
            transition={{
              duration: 1.6,
              delay: 0.5 + b.delay,
              ease: "easeOut",
            }}
          />
        ))}
      </motion.div>

      {/* Brand mark surfacing at the crest of the flood. */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: [0, 1, 1, 0], y: [16, 0, 0, -10] }}
        transition={{ duration: 4, times: [0.2, 0.42, 0.58, 0.74], ease: "easeInOut" }}
      >
        <motion.div
          className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/12 backdrop-blur-md"
          animate={{ scale: [0.9, 1, 1] }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Waves className="h-8 w-8 text-cyan-200" />
        </motion.div>
        <p className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
          FloodLens
        </p>
      </motion.div>
    </motion.div>
  );
}
