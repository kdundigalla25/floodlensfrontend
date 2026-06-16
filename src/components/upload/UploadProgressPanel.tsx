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
    <aside className="rounded-4xl border border-white/10 bg-[#0d1a2b] p-5 shadow-xl">
      <div className="mb-5">
        <h2 className="text-base font-bold text-white">How it works</h2>
        <p className="mt-1 text-sm leading-6 text-slate-400">
          The address is always saved — even when Street View isn't available.
        </p>
      </div>

      <div className="grid gap-2">
        <ProgressStep
          complete={addressIsComplete}
          active
          icon={<MapPin className="h-4 w-4" />}
          title="Enter address"
          text="Needed for Street View and elevation data"
        />

        <ProgressStep
          complete={addressIsComplete && !gsvUnavailable}
          active={addressIsComplete}
          icon={<Search className="h-4 w-4" />}
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
              icon={<UploadCloud className="h-4 w-4" />}
              title="Upload photo"
              text="Use your own front-facing image"
            />

            <ProgressStep
              complete={!!groundLine}
              active={!!imageUrl}
              icon={<Camera className="h-4 w-4" />}
              title="Mark ground line"
              text="Show where the home meets the ground"
            />

            <ProgressStep
              complete={false}
              active={canGenerateFromImage}
              icon={<Waves className="h-4 w-4" />}
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
        "flex gap-3 rounded-2xl border p-3.5 transition-colors",
        complete
          ? "border-emerald-400/20 bg-emerald-400/[0.07]"
          : active
            ? "border-cyan-400/20 bg-cyan-400/[0.07]"
            : "border-white/[0.07] bg-white/[0.03]",
      ].join(" ")}
    >
      <div
        className={[
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border",
          complete
            ? "border-emerald-400/30 bg-emerald-400/15 text-emerald-300"
            : active
              ? "border-cyan-400/30 bg-cyan-400/15 text-cyan-300"
              : "border-white/10 bg-white/5 text-white/25",
        ].join(" ")}
      >
        {complete ? <CheckCircle2 className="h-4 w-4" /> : icon}
      </div>

      <div className="min-w-0">
        <p
          className={[
            "text-sm font-semibold leading-5",
            active ? "text-white" : "text-white/35",
          ].join(" ")}
        >
          {title}
        </p>
        <p className="mt-0.5 text-xs leading-5 text-slate-500">{text}</p>
      </div>
    </div>
  );
}
