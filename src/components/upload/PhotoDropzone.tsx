import { ImagePlus, RefreshCw, UploadCloud } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  imageUrl: string | null;
  setImageUrl: (url: string | null) => void;
  setImageFile: (file: File | null) => void;
};

export function PhotoDropzone({ imageUrl, setImageUrl, setImageFile }: Props) {
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }

    setImageFile(file);

    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result as string;

      setImageUrl(base64);
      sessionStorage.setItem("houseImageUrl", base64);
      sessionStorage.removeItem("groundLine");
    };

    reader.readAsDataURL(file);
  }

  return (
    <motion.div
      layout
      className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/35 p-3 shadow-xl"
    >
      <label className="group relative flex min-h-90 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border border-dashed border-cyan-200/30 bg-linear-to-br from-slate-950 via-slate-900 to-blue-950 p-6 text-center transition hover:border-cyan-200/80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(103,232,249,0.18),transparent_38%)] opacity-70 transition group-hover:opacity-100" />
        <div className="absolute -bottom-24 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />

        {imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt="Uploaded house"
              className="relative z-10 max-h-130 rounded-[1.25rem] object-contain shadow-2xl"
            />

            <div className="absolute right-5 top-5 z-20 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-slate-950 shadow-xl">
              <RefreshCw className="h-4 w-4 text-blue-600" />
              Replace
            </div>
          </>
        ) : (
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.4, repeat: Infinity }}
              className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-linear-to-br from-cyan-300 to-blue-500 shadow-2xl shadow-cyan-500/20"
            >
              <UploadCloud className="h-10 w-10 text-slate-950" />
            </motion.div>

            <p className="text-2xl font-black text-white">
              Upload your home photo
            </p>

            <p className="mt-3 max-w-md leading-7 text-slate-400">
              Use a clear front-facing image. After uploading, you’ll mark where
              the house meets the ground.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-cyan-100">
              <ImagePlus className="h-4 w-4" />
              PNG, JPG, or JPEG
            </div>
          </div>
        )}

        <input
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
    </motion.div>
  );
}
