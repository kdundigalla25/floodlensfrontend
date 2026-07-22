import { motion } from "framer-motion";
import {
  ArrowRight,
  Camera,
  CarFront,
  ImageOff,
  Navigation,
  Sun,
} from "lucide-react";
import type { ReactNode } from "react";
import { PitchDemo } from "./PitchDemo";
import { PinDemo } from "./PinDemo";
import { FramingDemo } from "./FramingDemo";

const EASE = [0.16, 1, 0.3, 1] as const;

const EXTRA_TIPS = [
  {
    icon: Navigation,
    title: "Leave location on",
    text: "A photo that carries GPS skips the pin step entirely.",
  },
  {
    icon: Sun,
    title: "Shoot in daylight",
    text: "Shadows across the wall are fine. Darkness is not.",
  },
  {
    icon: ImageOff,
    title: "No zoom, no portrait mode",
    text: "Both distort the image and throw off the scale.",
  },
  {
    icon: CarFront,
    title: "Nothing blocking the door",
    text: "Cars, bins and hedges hide the door and the wall base we measure.",
  },
];

type Props = {
  onContinue: () => void;
};

export function UploadGuide({ onContinue }: Props) {
  return (
    <main className="mx-auto max-w-7xl px-5 pb-28 pt-32 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="mb-10"
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100">
          <Camera className="h-4 w-4 text-cyan-300" />
          Before you start
        </div>

        <h1 className="max-w-4xl text-4xl font-bold leading-[1.02] text-white md:text-5xl lg:text-6xl">
          Three things that decide how accurate your waterline is.
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 md:text-lg md:leading-8">
          Starting from an address? Street View handles all of this for you.
          Taking the photo yourself is worth thirty seconds of reading first.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        <GuideCard
          index={1}
          badge="Most common mistake"
          title="Keep the phone level"
          text="Hold the phone upright and shoot straight ahead, as parallel to flat ground as you can — pitch as close to 0° as possible. Tilting up or down stretches the door in the frame, and the door is the ruler we scale the water against."
          visual={<PitchDemo />}
          delay={0.08}
          highlight
        />

        <GuideCard
          index={2}
          badge="Easy to get wrong"
          title="Pin where you stood, not the house"
          text="After uploading you'll drop a pin on a map. Put it on the spot the photo was taken from — the sidewalk, the street, your driveway. We read ground elevation at the camera, so a pin on the roof measures the wrong ground."
          visual={<PinDemo />}
          delay={0.16}
          highlight
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <GuideCard
          index={3}
          badge="Required"
          title="The front door has to be in frame"
          text="A standard front door is a known height, so it is the ruler we measure everything else against — without one fully visible, top to bottom, there is nothing to scale the water to. If the front door genuinely can't be captured, a clearly visible garage door works as a backup. Step back far enough to get the whole door, the facade around it, and the ground at the base of the wall."
          visual={<FramingDemo />}
          delay={0.24}
        />

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32, ease: EASE }}
          className="rounded-4xl border border-white/10 bg-[#0d1a2b] p-5 shadow-2xl"
        >
          <p className="text-sm font-black uppercase tracking-wide text-cyan-100/60">
            Also worth knowing
          </p>
          <h2 className="mt-1 text-2xl font-black text-white">
            Small things that still help
          </h2>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {EXTRA_TIPS.map((tip) => (
              <div
                key={tip.title}
                className="rounded-3xl border border-white/10 bg-white/4 p-4"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-300/15 text-cyan-200">
                  <tip.icon className="h-5 w-5" />
                </div>
                <p className="font-black text-white">{tip.title}</p>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  {tip.text}
                </p>
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
        className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
      >
        <motion.button
          type="button"
          onClick={onContinue}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-cyan-300 to-blue-500 px-6 py-4 text-base font-black text-slate-950 shadow-2xl shadow-cyan-500/20"
        >
          Got it — continue
          <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
        </motion.button>

        <p className="text-sm font-semibold text-slate-400">
          You can reopen these tips from the next screen.
        </p>
      </motion.div>
    </main>
  );
}

function GuideCard({
  index,
  badge,
  title,
  text,
  visual,
  delay,
  highlight = false,
}: {
  index: number;
  badge?: string;
  title: string;
  text: string;
  visual: ReactNode;
  delay: number;
  highlight?: boolean;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className={[
        "relative isolate overflow-hidden rounded-4xl border border-white/10 p-5 shadow-2xl",
        highlight
          ? "bg-linear-to-br from-cyan-300/15 via-blue-500/10 to-[#0d1a2b]"
          : "bg-[#0d1a2b]",
      ].join(" ")}
    >
      {visual}

      <div className="mt-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-display text-sm font-bold text-cyan-300/80">
            0{index}
          </span>
          {badge && (
            <span className="inline-flex items-center rounded-full border border-amber-300/25 bg-amber-300/10 px-3 py-1 text-xs font-black text-amber-100">
              {badge}
            </span>
          )}
        </div>

        <h2 className="mt-2 text-2xl font-black text-white">{title}</h2>
        <p className="mt-2 leading-7 text-slate-300">{text}</p>
      </div>
    </motion.section>
  );
}
