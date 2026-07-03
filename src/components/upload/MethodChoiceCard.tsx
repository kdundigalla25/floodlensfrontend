import { ArrowRight, MapPin, Search, UploadCloud } from "lucide-react";
import { motion } from "framer-motion";

export type UploadMethod = "address" | "photo";

type Props = {
  onChoose: (method: UploadMethod) => void;
};

export function MethodChoiceCard({ onChoose }: Props) {
  return (
    <motion.section
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative isolate overflow-hidden rounded-4xl border border-white/10 bg-linear-to-br from-cyan-300/15 via-blue-500/10 to-[#0d1a2b] p-6 shadow-2xl"
    >

      <div className="relative">
        <p className="text-sm font-black uppercase tracking-wide text-cyan-100/70">
          Step 1
        </p>
        <h2 className="mt-1 text-2xl font-black text-white">
          How do you want to start?
        </h2>
        <p className="mt-2 max-w-2xl leading-7 text-slate-300">
          Pull an image automatically from your address, or upload your own
          front-facing photo. Either way we keep the address for elevation.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <MethodOption
            icon={<Search className="h-6 w-6" />}
            badgeIcon={<MapPin className="h-4 w-4" />}
            badge="Fastest"
            title="Use my address"
            text="We try a Google Street View image and detect the front door automatically."
            onClick={() => onChoose("address")}
          />

          <MethodOption
            icon={<UploadCloud className="h-6 w-6" />}
            badgeIcon={<UploadCloud className="h-4 w-4" />}
            badge="Your photo"
            title="Upload a photo"
            text="Use a clear front-facing image of the home and confirm where it was taken."
            onClick={() => onChoose("photo")}
          />
        </div>
      </div>
    </motion.section>
  );
}

function MethodOption({
  icon,
  badge,
  badgeIcon,
  title,
  text,
  onClick,
}: {
  icon: React.ReactNode;
  badge: string;
  badgeIcon: React.ReactNode;
  title: string;
  text: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="group flex h-full flex-col items-start rounded-3xl border border-white/10 bg-slate-950/40 p-5 text-left shadow-xl transition hover:border-cyan-300/50 hover:bg-slate-950/60"
    >
      <div className="mb-4 flex w-full items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300/15 text-cyan-200 transition group-hover:bg-cyan-300/25">
          {icon}
        </div>

        <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-black text-cyan-100">
          {badgeIcon}
          {badge}
        </span>
      </div>

      <p className="text-lg font-black text-white">{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>

      <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-cyan-200">
        Continue
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </motion.button>
  );
}
