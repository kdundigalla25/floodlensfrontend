import { DoorOpen, Home, MapPin } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  address: string;
  imageSource: string;
  referenceLabel: string;
};

export function ResultMetaStrip({ address, imageSource, referenceLabel }: Props) {
  const reference =
    referenceLabel.charAt(0).toUpperCase() + referenceLabel.slice(1);

  const items = [
    { icon: MapPin, label: "Address", value: address },
    { icon: Home, label: "Image source", value: imageSource },
    { icon: DoorOpen, label: "Reference", value: reference },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="mt-6"
    >
      <div className="grid gap-3 sm:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-300/12 text-cyan-200">
              <item.icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                {item.label}
              </p>
              <p className="truncate font-semibold text-white">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-xs leading-5 text-slate-500">
        Estimated from the detected door scale and flood elevation data. For
        visualization only, not an official flood assessment.
      </p>
    </motion.div>
  );
}
