type Props = {
  className?: string;
  fill?: string;
  height?: number;
  // Slower drift for calmer sections, faster for energetic ones.
  seconds?: number;
  flip?: boolean;
};

// A seamless drifting water band. The path is duplicated across a 2x-wide SVG
// and slid by -50% on loop, so the crest travels continuously with no seam.
// Pure CSS animation (tide-drift), so it honors prefers-reduced-motion.
export function WaveBand({
  className = "",
  fill = "#0e6ea3",
  height = 120,
  seconds = 14,
  flip = false,
}: Props) {
  return (
    <div
      className={`pointer-events-none overflow-hidden ${className}`}
      style={{ height, transform: flip ? "scaleY(-1)" : undefined }}
      aria-hidden
    >
      <svg
        className="tide-drift h-full w-[200%]"
        viewBox="0 0 2880 120"
        preserveAspectRatio="none"
        style={{
          animation: `tide-drift ${seconds}s linear infinite`,
        }}
      >
        <path
          fill={fill}
          d="M0 60 C 240 10 480 10 720 60 C 960 110 1200 110 1440 60 C 1680 10 1920 10 2160 60 C 2400 110 2640 110 2880 60 L2880 120 L0 120 Z"
        />
      </svg>
    </div>
  );
}
