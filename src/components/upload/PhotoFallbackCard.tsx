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
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-4xl border border-amber-400/15 bg-[#0d1a2b] p-6 shadow-xl"
    >
      <div className="mb-6 flex items-center gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
          style={{
            background: "linear-gradient(135deg, #fbbf24, #f97316)",
            boxShadow: "0 0 16px rgba(251,191,36,0.25)",
          }}
        >
          <AlertTriangle className="h-[18px] w-[18px] text-white" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-white">Upload a photo instead</h2>
          <p className="text-sm text-slate-400">
            {gsvError ||
              "No usable Street View image found. The address is still saved for elevation."}
          </p>
        </div>
      </div>

      <PhotoDropzone
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        setImageFile={setImageFile}
      />
    </motion.section>
  );
}
