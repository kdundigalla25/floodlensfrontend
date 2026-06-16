import { useState } from "react";
import { RotateCcw, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export type GroundPoint = {
  x: number;
  y: number;
};

export type GroundLine = {
  start: GroundPoint;
  end: GroundPoint;
};

type Props = {
  imageUrl: string;
  groundLine: GroundLine | null;
  setGroundLine: (line: GroundLine | null) => void;
};

type DragPoint = "start" | "end" | null;

export function GroundLineStep({ imageUrl, groundLine, setGroundLine }: Props) {
  const [draggingPoint, setDraggingPoint] = useState<DragPoint>(null);

  const hasFullLine =
    groundLine &&
    !(
      groundLine.start.x === groundLine.end.x &&
      groundLine.start.y === groundLine.end.y
    );

  function getPointFromEvent(event: React.PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    return {
      x: Math.min(100, Math.max(0, x)),
      y: Math.min(100, Math.max(0, y)),
    };
  }

  function handleImagePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest("[data-ground-handle]")) return;

    const point = getPointFromEvent(event);

    if (!groundLine) {
      setGroundLine({ start: point, end: point });
      return;
    }

    if (!hasFullLine) {
      setGroundLine({ start: groundLine.start, end: point });
      return;
    }

    setGroundLine({ start: point, end: point });
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!draggingPoint || !groundLine) return;
    const point = getPointFromEvent(event);
    setGroundLine({ ...groundLine, [draggingPoint]: point });
  }

  function stopDragging() {
    setDraggingPoint(null);
  }

  function startDragging(
    event: React.PointerEvent<HTMLButtonElement>,
    pointName: "start" | "end",
  ) {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    setDraggingPoint(pointName);
  }

  function resetGroundLine() {
    setGroundLine(null);
    sessionStorage.removeItem("groundLine");
  }

  const hint = !groundLine
    ? "Click the first ground point"
    : hasFullLine
      ? "Drag the points to adjust"
      : "Click the second ground point";

  return (
    <motion.div
      layout
      className="rounded-4xl border border-white/10 bg-[#0d1a2b] p-5 shadow-xl"
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
            style={{
              background: "linear-gradient(135deg, #22d3ee, #3b82f6)",
              boxShadow: "0 0 16px rgba(34,211,238,0.28)",
            }}
          >
            <MapPin className="h-[18px] w-[18px] text-white" />
          </div>

          <div>
            <h2 className="font-semibold text-white">Mark the ground line</h2>
            <p className="text-sm text-slate-400">
              Click two points where the structure meets the ground, then drag
              to fine-tune.
            </p>
          </div>
        </div>

        {groundLine && (
          <button
            type="button"
            onClick={resetGroundLine}
            className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-sm font-medium text-white transition hover:bg-white/10"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>
        )}
      </div>

      {/* Canvas */}
      <div
        onPointerDown={handleImagePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        className="relative cursor-crosshair overflow-hidden rounded-3xl border border-white/10 bg-slate-950"
        style={{ touchAction: "none" }}
      >
        <img
          src={imageUrl}
          alt="Mark ground line"
          className="w-full select-none object-contain"
          draggable={false}
        />

        {groundLine && (
          <svg className="pointer-events-none absolute inset-0 z-10 h-full w-full">
            <line
              x1={`${groundLine.start.x}%`}
              y1={`${groundLine.start.y}%`}
              x2={`${groundLine.end.x}%`}
              y2={`${groundLine.end.y}%`}
              stroke="rgb(103 232 249)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={hasFullLine ? "none" : "8 8"}
            />
          </svg>
        )}

        {groundLine && (
          <>
            <GroundHandle
              point={groundLine.start}
              label="Start point"
              onPointerDown={(e) => startDragging(e, "start")}
              active={draggingPoint === "start"}
            />
            <GroundHandle
              point={groundLine.end}
              label="End point"
              onPointerDown={(e) => startDragging(e, "end")}
              active={draggingPoint === "end"}
            />
          </>
        )}

        {/* Hint overlay — fixed inside the canvas */}
        <div className="absolute bottom-4 left-4 rounded-xl bg-slate-950/80 px-3 py-2 text-xs font-semibold text-white backdrop-blur-xl">
          {hint}
        </div>
      </div>
    </motion.div>
  );
}

function GroundHandle({
  point,
  label,
  onPointerDown,
  active,
}: {
  point: GroundPoint;
  label: string;
  onPointerDown: (event: React.PointerEvent<HTMLButtonElement>) => void;
  active: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      data-ground-handle
      onPointerDown={onPointerDown}
      className={[
        "absolute z-20 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-cyan-300 shadow-xl shadow-cyan-500/40 transition",
        "hover:scale-125 active:scale-110",
        active ? "scale-125 ring-4 ring-cyan-300/30" : "",
      ].join(" ")}
      style={{
        left: `${point.x}%`,
        top: `${point.y}%`,
        touchAction: "none",
      }}
    >
      <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-950" />
    </button>
  );
}
