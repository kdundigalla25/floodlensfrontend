import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Camera,
  MapPin,
  Sparkles,
  UploadCloud,
  Waves,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FloodIntro } from "../components/intro/FloodIntro";
import { WaveBand } from "../components/common/WaveBand";
import { heroImage, stormImage } from "../components/home/homeContent";

const EASE = [0.16, 1, 0.3, 1] as const;

export function HomePage() {
  // Play the flood intro once per browser session, not on every navigation.
  const [showIntro, setShowIntro] = useState(
    () => !sessionStorage.getItem("introPlayed"),
  );

  function finishIntro() {
    sessionStorage.setItem("introPlayed", "1");
    setShowIntro(false);
  }

  return (
    <main className="overflow-hidden">
      <AnimatePresence>
        {showIntro && <FloodIntro key="intro" onComplete={finishIntro} />}
      </AnimatePresence>

      <Hero />
      <ProcessSection />
      <StoryCta />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden pt-24">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-linear-to-r from-deep via-deep/85 to-deep/30" />
      <div className="absolute inset-0 bg-linear-to-t from-deep via-transparent to-transparent" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-5 pb-16 md:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="max-w-2xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-white/8 px-4 py-2 text-sm font-semibold text-cyan-100 backdrop-blur-xl">
            <Sparkles className="h-4 w-4 text-cyan-300" />
            Visual flood risk
          </div>

          <h1 className="text-5xl font-bold leading-[0.98] text-white md:text-6xl lg:text-7xl">
            See the flood before it reaches your door.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-200 md:text-lg">
            Enter an address or upload a photo, then watch how high water could
            rise on your actual home.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <PrimaryLink to="/upload">Check my home</PrimaryLink>
            <a
              href="#process"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/8 px-7 py-4 font-semibold text-white backdrop-blur-xl transition hover:bg-white/14"
            >
              See how it works
            </a>
          </div>
        </motion.div>

        <HeroPreview />
      </div>

      <WaveBand
        className="absolute bottom-0 left-0 w-full"
        fill="#07111f"
        height={90}
        seconds={16}
      />
    </section>
  );
}

function HeroPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 34, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.85, delay: 0.35, ease: EASE }}
      className="relative hidden w-full max-w-lg justify-self-end lg:block"
    >
      <div className="absolute -inset-6 rounded-[3rem] bg-linear-to-br from-cyan-300/25 to-blue-700/20 blur-3xl" />

      <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/8 p-3 shadow-2xl backdrop-blur-2xl">
        <div className="relative overflow-hidden rounded-[1.5rem] bg-abyss">
          <div className="relative aspect-4/5">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${heroImage})` }}
            />

            <motion.div
              initial={{ height: "0%" }}
              animate={{ height: ["26%", "34%", "28%"] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              className="absolute inset-x-0 bottom-0 overflow-hidden bg-linear-to-t from-blue-800/85 via-blue-500/55 to-cyan-300/35"
            >
              <div className="absolute inset-x-0 top-0 border-t-2 border-cyan-200/90" />
              <motion.div
                animate={{ x: ["-10%", "10%", "-10%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-3 h-7 w-full rounded-full bg-cyan-200/60 blur-sm"
              />
            </motion.div>

            <div className="absolute left-4 top-4 rounded-2xl bg-white/95 px-4 py-3 text-slate-950 shadow-xl">
              <p className="text-[11px] font-bold uppercase tracking-wide text-blue-600">
                Estimated depth
              </p>
              <p className="mt-0.5 font-display text-2xl font-bold">2.4 ft</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const STEPS = [
  {
    icon: MapPin,
    title: "Enter the address",
    text: "We pull a Google Street View image and find the front door automatically.",
  },
  {
    icon: Camera,
    title: "Street View or your photo",
    text: "No usable image? Upload a front-facing photo and drop a pin where it was taken.",
  },
  {
    icon: Waves,
    title: "See the waterline",
    text: "We turn elevation and flood data into a visual water level on the home.",
  },
];

function ProcessSection() {
  return (
    <section id="process" className="relative bg-deep px-5 py-28 md:px-8">
      <div className="absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-16 max-w-2xl text-4xl font-bold text-white md:text-5xl"
        >
          Three steps from an address to a waterline.
        </motion.h2>

        <ol className="relative ml-6 border-l border-white/10">
          {STEPS.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
              className="relative mb-12 pl-10 last:mb-0"
            >
              <span className="absolute -left-[1.35rem] flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/30 bg-tide text-cyan-200 shadow-lg">
                <step.icon className="h-5 w-5" />
              </span>

              <p className="font-display text-sm font-bold text-cyan-300/80">
                0{i + 1}
              </p>
              <h3 className="mt-1 text-2xl font-bold text-white">
                {step.title}
              </h3>
              <p className="mt-2 max-w-lg leading-7 text-slate-400">
                {step.text}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function StoryCta() {
  return (
    <section id="why" className="relative min-h-[92vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${stormImage})` }}
      />
      <div className="absolute inset-0 bg-deep/72" />
      <div className="absolute inset-0 bg-linear-to-t from-deep via-deep/40 to-deep/70" />

      <WaveBand
        className="absolute left-0 top-0 w-full"
        fill="#07111f"
        height={90}
        seconds={18}
        flip
      />

      <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-7xl items-center px-5 py-24 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-2xl rounded-[2rem] border border-white/12 bg-tide/70 p-8 shadow-2xl backdrop-blur-xl md:p-12"
        >
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-300/15 text-cyan-200">
            <UploadCloud className="h-7 w-7" />
          </div>

          <h2 className="text-4xl font-bold leading-tight text-white md:text-5xl">
            A picture makes risk impossible to ignore.
          </h2>

          <p className="mt-6 text-base leading-8 text-slate-300 md:text-lg">
            Maps and risk scores stay abstract. Water rendered on your own home
            makes the danger personal and immediate.
          </p>

          <div className="mt-9">
            <PrimaryLink to="/upload">Check my home</PrimaryLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PrimaryLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-cyan-300 to-blue-500 px-7 py-4 font-bold text-slate-950 shadow-2xl shadow-cyan-500/25 transition hover:scale-[1.03] active:scale-[0.99]"
    >
      {children}
      <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
    </Link>
  );
}
