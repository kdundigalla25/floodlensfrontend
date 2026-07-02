import {
  CheckCircle2,
  MapPin,
  Navigation,
  ScanSearch,
  Search,
  Sparkles,
  UploadCloud,
  Waves,
} from "lucide-react";
import type { ReactNode } from "react";

export type UploadFlowMethod = "choose" | "address" | "photo";

type Props = {
  method: UploadFlowMethod;
  addressIsComplete: boolean;
  hasGsvDetection: boolean;
  imageUrl: string | null;
  hasLocation: boolean;
  canGenerateFromImage: boolean;
};

type Step = {
  key: string;
  complete: boolean;
  active: boolean;
  icon: ReactNode;
  title: string;
  text: string;
};

export function UploadProgressPanel({
  method,
  addressIsComplete,
  hasGsvDetection,
  imageUrl,
  hasLocation,
  canGenerateFromImage,
}: Props) {
  const steps = buildSteps({
    method,
    addressIsComplete,
    hasGsvDetection,
    imageUrl,
    hasLocation,
    canGenerateFromImage,
  });

  const subtitle =
    method === "address"
      ? "Street View first — confirm the image, then generate."
      : method === "photo"
        ? "Upload a photo and confirm where it was taken."
        : "Pick a starting point to begin.";

  return (
    <aside className="relative overflow-hidden rounded-4xl border border-white/10 bg-[#0d1a2b] p-5 shadow-2xl">
      <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-cyan-300/10 blur-3xl" />
      <div className="absolute -bottom-24 right-0 h-56 w-56 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="relative mb-6">
        <p className="text-sm font-black uppercase tracking-wide text-cyan-100/60">
          Flow
        </p>
        <h2 className="mt-1 text-2xl font-black text-white">Your progress</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">{subtitle}</p>
      </div>

      <div className="relative grid gap-3">
        {steps.map((step) => (
          <ProgressStep key={step.key} {...step} />
        ))}
      </div>
    </aside>
  );
}

function buildSteps({
  method,
  addressIsComplete,
  hasGsvDetection,
  imageUrl,
  hasLocation,
  canGenerateFromImage,
}: Props): Step[] {
  if (method === "choose") {
    return [
      {
        key: "choose",
        complete: false,
        active: true,
        icon: <Sparkles className="h-5 w-5" />,
        title: "Choose how to start",
        text: "Use your address for Street View, or upload a photo",
      },
    ];
  }

  const enterAddress: Step = {
    key: "address",
    complete: addressIsComplete,
    active: true,
    icon: <MapPin className="h-5 w-5" />,
    title: "Enter address",
    text: "Needed for elevation data either way",
  };

  if (method === "address") {
    return [
      enterAddress,
      {
        key: "check",
        complete: hasGsvDetection,
        active: addressIsComplete,
        icon: <Search className="h-5 w-5" />,
        title: "Check Street View",
        text: "Find an image automatically",
      },
      {
        key: "confirm",
        complete: false,
        active: hasGsvDetection,
        icon: <ScanSearch className="h-5 w-5" />,
        title: "Confirm & generate",
        text: "Check the image and detected door look right",
      },
    ];
  }

  return [
    enterAddress,
    {
      key: "upload",
      complete: !!imageUrl,
      active: addressIsComplete,
      icon: <UploadCloud className="h-5 w-5" />,
      title: "Upload photo",
      text: "Use your own front-facing image",
    },
    {
      key: "location",
      complete: hasLocation,
      active: !!imageUrl,
      icon: <Navigation className="h-5 w-5" />,
      title: "Confirm location",
      text: "From the photo’s GPS or a dropped map pin",
    },
    {
      key: "generate",
      complete: false,
      active: canGenerateFromImage,
      icon: <Waves className="h-5 w-5" />,
      title: "Generate preview",
      text: "Use uploaded image and confirmed location",
    },
  ];
}

function ProgressStep({ active, complete, icon, title, text }: Step) {
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
