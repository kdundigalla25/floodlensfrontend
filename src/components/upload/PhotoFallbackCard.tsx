import { AlertTriangle, ImagePlus } from "lucide-react";
import { motion } from "framer-motion";
import { PhotoDropzone } from "./PhotoDropzone";

export type PhotoReason = "choice" | "gsv-none" | "gsv-rejected";

type Props = {
  imageUrl: string | null;
  setImageUrl: (url: string | null) => void;
  setImageFile: (file: File | null) => void;
  reason: PhotoReason;
  gsvError: string | null;
};

const COPY: Record<
  PhotoReason,
  { eyebrow: string; title: string; message: string }
> = {
  choice: {
    eyebrow: "Your photo",
    title: "Upload a front-facing photo",
    message:
      "Use a clear image of the home’s front. We’ll confirm where it was taken next.",
  },
  "gsv-none": {
    eyebrow: "Street View unavailable",
    title: "Upload a photo instead",
    message:
      "We could not find a usable Street View image for this address. The address is still saved for elevation lookup later.",
  },
  "gsv-rejected": {
    eyebrow: "No problem",
    title: "Upload a photo instead",
    message:
      "We’ll use your own photo instead. The address stays saved for elevation lookup later.",
  },
};

export function PhotoFallbackCard({
  imageUrl,
  setImageUrl,
  setImageFile,
  reason,
  gsvError,
}: Props) {
  const isWarning = reason === "gsv-none";
  const copy = COPY[reason];
  const message = isWarning ? gsvError || copy.message : copy.message;

  return (
    <motion.section
      initial={{ opacity: 0, y: 22, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35 }}
      className={`relative isolate overflow-hidden rounded-4xl border p-6 shadow-2xl ${
        isWarning
          ? "border-amber-200/20 bg-linear-to-br from-amber-300/15 via-rose-400/10 to-[#0d1a2b]"
          : "border-cyan-300/20 bg-linear-to-br from-cyan-300/15 via-blue-500/10 to-[#0d1a2b]"
      }`}
    >
      <div className="relative mb-6 flex items-start gap-4">
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-xl ${
            isWarning ? "bg-amber-200 text-amber-950" : "bg-white text-blue-600"
          }`}
        >
          {isWarning ? (
            <AlertTriangle className="h-7 w-7" />
          ) : (
            <ImagePlus className="h-7 w-7" />
          )}
        </div>

        <div>
          <p
            className={`text-sm font-black uppercase tracking-wide ${
              isWarning ? "text-amber-100/70" : "text-cyan-100/70"
            }`}
          >
            {copy.eyebrow}
          </p>
          <h2 className="mt-1 text-2xl font-black text-white">{copy.title}</h2>
          <p className="mt-2 max-w-2xl leading-7 text-slate-300">{message}</p>
        </div>
      </div>

      <div className="relative">
        <PhotoDropzone
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          setImageFile={setImageFile}
        />
      </div>
    </motion.section>
  );
}
