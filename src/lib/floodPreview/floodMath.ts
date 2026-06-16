import {
  PLACEHOLDER_FLOOD_ELEVATION_METERS,
  PLACEHOLDER_UPLOADED_IMAGE_FLOOD_HEIGHT_FEET,
} from "./config";
import { calculateFFE } from "./ffeGeometry";
import { clamp } from "./imageUtils";
import { getReferenceHeightInches } from "./referenceHeights";
import type { BoundingBox, ReferenceType } from "./types";

export function calculateFloodReachFromGroundLine({
  imageHeight,
  groundMidpointYPixels,
  referenceType,
  referencePixelHeight,
}: {
  imageHeight: number;
  groundMidpointYPixels: number;
  referenceType: ReferenceType;
  referencePixelHeight: number;
}) {
  const referenceHeightInches = getReferenceHeightInches(referenceType);
  const pixelsPerInch = referencePixelHeight / referenceHeightInches;

  const floodHeightFeet = PLACEHOLDER_UPLOADED_IMAGE_FLOOD_HEIGHT_FEET;
  const floodHeightPixels = floodHeightFeet * 12 * pixelsPerInch;

  const floodLineYPixels = clamp(
    groundMidpointYPixels - floodHeightPixels,
    0,
    imageHeight,
  );

  const floodLineYPercent = (floodLineYPixels / imageHeight) * 100;
  const floodFillFromBottom = clamp(1 - floodLineYPixels / imageHeight, 0, 1);

  return {
    floodLineYPixels,
    floodLineYPercent,
    floodFillFromBottom,
    floodHeightFeet,
    pixelsPerInch,
    floodHeightPixels,
  };
}

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

  console.log(elevFFE);

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
