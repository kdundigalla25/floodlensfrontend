import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { PhotoDropzone } from "./PhotoDropzone";

type Props = {
  imageUrl: string | null;
  setImageUrl: (url: string | null) => void;
  setImageFile: (file: File | null) => void;
  gsvError: string | null;
};

export function PhotoFallbackCard({
  imageUrl,
  setImageUrl,
  setImageFile,
  gsvError,
}: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 22, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35 }}
      className="relative overflow-hidden rounded-4xl border border-amber-200/20 bg-linear-to-br from-amber-300/15 via-rose-400/10 to-[#0d1a2b] p-6 shadow-2xl"
    >
      <div className="absolute -right-20 -top-24 h-56 w-56 rounded-full bg-amber-300/20 blur-3xl" />

      <div className="relative mb-6 flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-200 text-slate-950 shadow-xl">
          <AlertTriangle className="h-7 w-7" />
        </div>

        <div>
          <p className="text-sm font-black uppercase tracking-wide text-amber-100/70">
            Street View unavailable
          </p>
          <h2 className="mt-1 text-2xl font-black text-white">
            Upload a photo instead
          </h2>
          <p className="mt-2 max-w-2xl leading-7 text-slate-300">
            {gsvError ||
              "We could not find a usable Street View image for this address. The address is still saved for elevation lookup later."}
          </p>
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
