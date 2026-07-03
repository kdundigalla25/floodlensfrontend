import { Loader, Search, Waves } from "lucide-react";

type Props = {
  mode: "checking-address" | "generating-preview";
};

export function UploadLoadingState({ mode }: Props) {
  const checking = mode === "checking-address";

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="relative isolate overflow-hidden rounded-4xl border border-white/10 bg-[#111f33]/95 p-8 text-center shadow-2xl">

        <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-200">
          {checking ? (
            <Search className="h-8 w-8" />
          ) : (
            <Waves className="h-8 w-8" />
          )}
        </div>

        <Loader className="relative mx-auto mt-6 h-10 w-10 animate-spin text-cyan-300" />

        <p className="relative mt-5 text-lg font-black text-white">
          {checking
            ? "Checking for Street View imagery..."
            : "Generating your flood preview..."}
        </p>

        <p className="relative mt-2 max-w-sm text-sm leading-6 text-slate-400">
          {checking
            ? "We’re checking whether this address has a usable Google Street View image."
            : "We’re processing the image, reference object, and waterline estimate."}
        </p>
      </div>
    </div>
  );
}
