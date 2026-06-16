import { Search, Waves } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  mode: "checking-address" | "generating-preview";
};

export function UploadLoadingState({ mode }: Props) {
  const checking = mode === "checking-address";

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-[#0d1a2b] p-10 text-center shadow-2xl">
        <motion.div
          className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl"
          style={{
            background: "linear-gradient(135deg, #22d3ee, #3b82f6)",
            boxShadow: "0 0 24px rgba(34,211,238,0.35)",
          }}
          animate={{
            boxShadow: [
              "0 0 24px rgba(34,211,238,0.35)",
              "0 0 42px rgba(34,211,238,0.55)",
              "0 0 24px rgba(34,211,238,0.35)",
            ],
            scale: [1, 1.04, 1],
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          {checking ? (
            <Search className="h-7 w-7 text-white" />
          ) : (
            <Waves className="h-7 w-7 text-white" />
          )}
        </motion.div>

        <div className="mb-6 flex items-center justify-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="block h-1.5 w-1.5 rounded-full bg-cyan-400"
              animate={{ scale: [1, 1.6, 1], opacity: [0.35, 1, 0.35] }}
              transition={{
                duration: 1.1,
                repeat: Infinity,
                delay: i * 0.18,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <p className="text-base font-bold text-white">
          {checking
            ? "Checking for Street View imagery"
            : "Generating your flood preview"}
        </p>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          {checking
            ? "We're looking for a usable Google Street View image at this address."
            : "Processing the image, ground reference, and waterline estimate."}
        </p>
      </div>
    </div>
  );
}
