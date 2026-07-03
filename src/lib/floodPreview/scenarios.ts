import { clamp } from "./imageUtils";
import type { FloodPreviewResult } from "./types";

// Storm scenarios the user can click through. For now these are sample depths
// (water height above the door base, in feet). Later this list is expected to
// come from external data: a physics-based flood model run per storm, likely
// loaded from a database. Keep the shape stable so that swap is a data change,
// not a UI change.
export type FloodScenario = {
  id: string;
  name: string;
  category: string;
  depthFeet: number;
};

export const FLOOD_SCENARIOS: FloodScenario[] = [
  { id: "ts-ana", name: "Tropical Storm Ana", category: "Tropical storm", depthFeet: 1.5 },
  { id: "cat1-belram", name: "Hurricane Belram", category: "Category 1", depthFeet: 3 },
  { id: "cat3-delia", name: "Hurricane Delia", category: "Category 3", depthFeet: 5.5 },
  { id: "cat5-ovid", name: "Hurricane Ovid", category: "Category 5", depthFeet: 8 },
];

export type Waterline = {
  floodFillFromBottom: number;
  floodLineYPixels: number;
  doorPct: number | null;
  aboveDoor: boolean;
};

// Recomputes the on-image waterline for a given water depth, reusing the scale
// the detection already established (pixels per inch, the reference door box).
// This is the single place a scenario's depth turns into a rendered water level.
export function waterlineForDepth(
  result: FloodPreviewResult,
  depthFeet: number,
): Waterline {
  const box = result.referenceBox;
  const pixelsPerInch = result.pixelsPerInch;

  // Without geometry we cannot recompute, so fall back to the stored values.
  if (!box || !pixelsPerInch) {
    return {
      floodFillFromBottom: result.floodFillFromBottom,
      floodLineYPixels: result.floodLineYPixels,
      doorPct: null,
      aboveDoor: false,
    };
  }

  const depthPixels = depthFeet * 12 * pixelsPerInch;
  const floodLineYPixels = clamp(box.y2 - depthPixels, 0, result.imageHeight);
  const floodFillFromBottom = clamp(
    1 - floodLineYPixels / result.imageHeight,
    0,
    1,
  );

  const doorHeight = box.y2 - box.y1;
  let doorPct: number | null = null;
  let aboveDoor = false;
  if (doorHeight > 0) {
    const fraction = (box.y2 - floodLineYPixels) / doorHeight;
    aboveDoor = fraction >= 1;
    doorPct = Math.round(clamp(fraction, 0, 1) * 100);
  }

  return { floodFillFromBottom, floodLineYPixels, doorPct, aboveDoor };
}
