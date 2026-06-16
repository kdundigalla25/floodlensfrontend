import { Link } from "react-router-dom";
import { ArrowLeft, Waves } from "lucide-react";
import { motion } from "framer-motion";

export function EmptyResultState() {
  return (
    <main className="mx-auto flex min-h-screen max-w-sm items-center px-6 py-28">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="w-full rounded-3xl border border-white/10 bg-[#0d1a2b] p-8 shadow-2xl"
      >
        <div
          className="mb-5 flex h-12 w-12 items-center justify-center rounded-full"
          style={{
            background: "linear-gradient(135deg, #22d3ee, #3b82f6)",
            boxShadow: "0 0 20px rgba(34,211,238,0.28)",
          }}
        >
          <Waves className="h-5 w-5 text-white" />
        </div>

        <h1 className="text-xl font-bold text-white">No preview found</h1>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          Go back and generate a flood preview first before viewing results.
        </p>

        <Link
          to="/upload"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to upload
        </Link>
      </motion.div>
    </main>
  );
}
