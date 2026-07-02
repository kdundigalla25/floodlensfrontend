import { PLACEHOLDER_FLOOD_ELEVATION_METERS } from "./config";
import { calculateFFE } from "./ffeGeometry";
import { clamp } from "./imageUtils";
import { getReferenceHeightInches } from "./referenceHeights";
import type { BoundingBox, ReferenceType } from "./types";

export function calculateFloodReachFromAddress({
  imageHeight,
  imageWidth,
  referenceType,
  referencePixelHeight,
  referenceBox,
  camAltitude,
}: {
  imageHeight: number;
  imageWidth: number;
  referenceType: ReferenceType;
  referencePixelHeight: number;
  referenceBox: BoundingBox;
  camAltitude: number;
}) {
  const elevFFE = calculateFFE({
    referenceBox,
    referenceType,
    imageHeight,
    imageWidth,
    camAltitude,
  });

  const floodAltitudeFromDoorBottom =
    PLACEHOLDER_FLOOD_ELEVATION_METERS - elevFFE;

  const referenceHeightInches = getReferenceHeightInches(referenceType);
  const pixelsPerInch = referencePixelHeight / referenceHeightInches;

  const pixelsPerMeter = pixelsPerInch * 39.37;

  const yPixelLevel =
    referenceBox.y2 - floodAltitudeFromDoorBottom * pixelsPerMeter;

  const floodLineYPixels = clamp(yPixelLevel, 0, imageHeight);
  const floodLineYPercent = (floodLineYPixels / imageHeight) * 100;
  const floodFillFromBottom = clamp(1 - floodLineYPixels / imageHeight, 0, 1);

  return {
    referencePixelHeight,
    referenceHeightInches,

    cam_altitude: camAltitude,
    elev_FFE: elevFFE,

    floodElevationMeters: PLACEHOLDER_FLOOD_ELEVATION_METERS,
    floodAltitudeFromDoorBot: floodAltitudeFromDoorBottom,

    pixelsPerInch,

    floodLineYPixels,
    floodLineYPercent,
    floodFillFromBottom,
  };
}
