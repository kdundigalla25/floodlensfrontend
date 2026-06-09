import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function EmptyResultState() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-28">
      <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-[#101d30] p-8 shadow-2xl">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-300/15 blur-3xl" />

        <div className="relative">
          <h1 className="text-3xl font-black text-white">No preview found</h1>

          <p className="mt-3 leading-7 text-slate-400">
            Go back to the upload page and generate a flood preview first.
          </p>

          <Link
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-black text-slate-950"
            to="/upload"
          >
            <ArrowLeft className="h-4 w-4 text-blue-600" />
            Back to upload
          </Link>
        </div>
      </div>
    </main>
  );
}
