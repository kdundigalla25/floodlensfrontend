import { Check, ScanSearch, X } from "lucide-react";
import { motion } from "framer-motion";
import type { BoundingBox, ReferenceType } from "../../lib/floodPreview";

type Props = {
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  box: BoundingBox;
  referenceType: ReferenceType;
  onConfirm: () => void;
  onReject: () => void;
};

const REFERENCE_LABELS: Record<NonNullable<ReferenceType>, string> = {
  front_door: "Front door",
  garage_door: "Garage door",
};

export function GsvConfirmCard({
  imageUrl,
  imageWidth,
  imageHeight,
  box,
  referenceType,
  onConfirm,
  onReject,
}: Props) {
  const label = referenceType ? REFERENCE_LABELS[referenceType] : "Reference";

  // The box is in the image's pixel space, so position the overlay as
  // percentages of the rendered image — which fills the container at its
  // natural aspect ratio, keeping the two aligned at any display size.
  const boxStyle = {
    left: `${(box.x1 / imageWidth) * 100}%`,
    top: `${(box.y1 / imageHeight) * 100}%`,
    width: `${((box.x2 - box.x1) / imageWidth) * 100}%`,
    height: `${((box.y2 - box.y1) / imageHeight) * 100}%`,
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 22, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35 }}
      className="relative isolate overflow-hidden rounded-4xl border border-white/10 bg-[#132233]/90 p-6 shadow-2xl"
    >

      <div className="relative mb-5 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-300/15 text-cyan-200">
          <ScanSearch className="h-6 w-6" />
        </div>

        <div>
          <h2 className="text-xl font-black text-white">
            Does this look right?
          </h2>
          <p className="mt-2 leading-7 text-slate-400">
            We found a Street View image and detected the{" "}
            <span className="font-black text-cyan-200">
              {label.toLowerCase()}
            </span>{" "}
            highlighted below. Confirm it&apos;s your home and the box is on the
            door.
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950">
        <div className="relative">
          <img
            src={imageUrl}
            alt="Street View of the home"
            className="block w-full"
          />

          <div
            className="absolute rounded-md border-2 border-cyan-300 shadow-[0_0_0_9999px_rgba(4,10,20,0.35)]"
            style={boxStyle}
          >
            <span className="absolute -top-7 left-0 whitespace-nowrap rounded-full bg-cyan-300 px-3 py-1 text-xs font-black text-cyan-950 shadow-lg">
              {label}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onConfirm}
          className="group inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-cyan-300 to-blue-500 px-6 py-4 text-base font-black text-slate-950 shadow-2xl shadow-cyan-500/20"
        >
          <Check className="h-5 w-5" />
          Yes, this looks right
        </motion.button>

        <button
          type="button"
          onClick={onReject}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-base font-black text-white transition hover:bg-white/10"
        >
          <X className="h-5 w-5 text-rose-300" />
          No, upload a photo
        </button>
      </div>
    </motion.section>
  );
}
