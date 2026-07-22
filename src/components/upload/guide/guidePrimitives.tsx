import { Check, X } from "lucide-react";
import type { ReactNode } from "react";

/** Shared dark canvas every guide animation is drawn on. */
export function DemoStage({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-56 overflow-hidden rounded-3xl border border-white/10 bg-abyss/70">
      {children}
    </div>
  );
}

/** Pass/fail label pinned to the top-right of a demo stage. */
export function VerdictChip({ ok, text }: { ok: boolean; text: string }) {
  return (
    <div
      className={[
        "absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-black transition-colors",
        ok
          ? "border-emerald-300/30 bg-emerald-400/15 text-emerald-100"
          : "border-rose-300/30 bg-rose-400/15 text-rose-100",
      ].join(" ")}
    >
      {ok ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
      {text}
    </div>
  );
}

/**
 * Front elevation of a house. `highlightDoor` rings the front door, which is
 * the reference the flood height is actually scaled against.
 */
export function HouseGlyph({
  className,
  highlightDoor = false,
}: {
  className?: string;
  highlightDoor?: boolean;
}) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path
        d="M6 46 L50 12 L94 46"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="16"
        y="46"
        width="68"
        height="46"
        rx="2"
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeWidth="4"
      />
      <rect x="25" y="58" width="11" height="11" rx="1" fill="currentColor" fillOpacity="0.3" />
      <rect x="64" y="58" width="11" height="11" rx="1" fill="currentColor" fillOpacity="0.3" />

      <rect
        x="42"
        y="64"
        width="16"
        height="28"
        rx="1"
        fill={highlightDoor ? "rgb(52 211 153)" : "currentColor"}
        fillOpacity={highlightDoor ? 0.55 : 0.45}
      />
      {highlightDoor && (
        <rect
          x="38"
          y="60"
          width="24"
          height="34"
          rx="2"
          fill="none"
          stroke="rgb(52 211 153)"
          strokeWidth="2"
          strokeDasharray="4 3"
        />
      )}
    </svg>
  );
}
