import {
  Camera,
  CheckCircle2,
  MapPin,
  Search,
  UploadCloud,
  Waves,
} from "lucide-react";
import type { ReactNode } from "react";
import type { GroundLine } from "../measurement/GroundLineStep";

type Props = {
  addressIsComplete: boolean;
  gsvUnavailable: boolean;
  imageUrl: string | null;
  groundLine: GroundLine | null;
  canGenerateFromImage: boolean;
};

export function UploadProgressPanel({
  addressIsComplete,
  gsvUnavailable,
  imageUrl,
  groundLine,
  canGenerateFromImage,
}: Props) {
  return (
    <aside className="relative overflow-hidden rounded-4xl border border-white/10 bg-[#0d1a2b] p-5 shadow-2xl">
      <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-cyan-300/10 blur-3xl" />
      <div className="absolute -bottom-24 right-0 h-56 w-56 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="relative mb-6">
        <p className="text-sm font-black uppercase tracking-wide text-cyan-100/60">
          Flow
        </p>
        <h2 className="mt-1 text-2xl font-black text-white">
          Address-first preview
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          We save the address either way so it can be used for elevation later.
        </p>
      </div>

      <div className="relative grid gap-3">
        <ProgressStep
          complete={addressIsComplete}
          active
          icon={<MapPin className="h-5 w-5" />}
          title="Enter address"
          text="Needed for Street View and elevation data"
        />

        <ProgressStep
          complete={addressIsComplete && !gsvUnavailable}
          active={addressIsComplete}
          icon={<Search className="h-5 w-5" />}
          title="Check Street View"
          text={
            gsvUnavailable
              ? "No usable Street View image found"
              : "Try to generate automatically"
          }
        />

        {gsvUnavailable && (
          <>
            <ProgressStep
              complete={!!imageUrl}
              active
              icon={<UploadCloud className="h-5 w-5" />}
              title="Upload photo"
              text="Use your own front-facing image"
            />

            <ProgressStep
              complete={!!groundLine}
              active={!!imageUrl}
              icon={<Camera className="h-5 w-5" />}
              title="Mark ground line"
              text="Show where the home meets the ground"
            />

            <ProgressStep
              complete={false}
              active={canGenerateFromImage}
              icon={<Waves className="h-5 w-5" />}
              title="Generate preview"
              text="Use uploaded image and saved address"
            />
          </>
        )}
      </div>
    </aside>
  );
}

function ProgressStep({
  active,
  complete,
  icon,
  title,
  text,
}: {
  active: boolean;
  complete: boolean;
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-3xl border p-4 transition",
        complete
          ? "border-emerald-300/20 bg-emerald-300/10"
          : active
            ? "border-cyan-300/20 bg-cyan-300/10"
            : "border-white/10 bg-white/4",
      ].join(" ")}
    >
      <div className="flex gap-4">
        <div
          className={[
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border",
            complete
              ? "border-emerald-300/30 bg-emerald-300/20 text-emerald-200"
              : active
                ? "border-cyan-300/30 bg-cyan-300/20 text-cyan-200"
                : "border-white/10 bg-white/5 text-white/30",
          ].join(" ")}
        >
          {complete ? <CheckCircle2 className="h-5 w-5" /> : icon}
        </div>

        <div>
          <p
            className={
              active ? "font-black text-white" : "font-bold text-white/40"
            }
          >
            {title}
          </p>
          <p className="mt-1 text-sm leading-6 text-slate-400">{text}</p>
        </div>
      </div>
    </div>
  );
}
