import { DEFAULT_FOV_DEGREES } from "./config";
import { getReferenceHeightMeters } from "./referenceHeights";
import type { BoundingBox, ReferenceType } from "./types";

function calculatePixelAngle({
  fov,
  x,
  y,
  imageHeight,
  imageWidth,
}: {
  fov: number;
  x: number;
  y: number;
  imageHeight: number;
  imageWidth: number;
}) {
  const halfFov = fov / 2;
  const origin = [Math.trunc(imageWidth / 2), Math.trunc(imageHeight / 2)];

  const verticalPixelDistance = Math.abs(origin[1] - y);
  const horizontalPixelDistance = Math.abs(origin[0] - x);

  const focalPixelDistance = origin[0] / Math.tan((halfFov * Math.PI) / 180);

  const centerToPointDistance = Math.sqrt(
    focalPixelDistance ** 2 + horizontalPixelDistance ** 2,
  );

  return Math.atan(verticalPixelDistance / centerToPointDistance);
}

export function calculateFFE({
  referenceBox,
  referenceType,
  imageHeight,
  imageWidth,
  camAltitude,
  fov = DEFAULT_FOV_DEGREES,
}: {
  referenceBox: BoundingBox;
  referenceType: ReferenceType;
  imageHeight: number;
  imageWidth: number;
  camAltitude: number;
  fov?: number;
}) {
  const thetaTop = calculatePixelAngle({
    fov,
    x: referenceBox.x1,
    y: referenceBox.y1,
    imageHeight,
    imageWidth,
  });

  const thetaBottom = calculatePixelAngle({
    fov,
    x: referenceBox.x1,
    y: referenceBox.y2,
    imageHeight,
    imageWidth,
  });

  const cameraHeightToReferenceBottom =
    (getReferenceHeightMeters(referenceType) *
      Math.sin(thetaBottom) *
      Math.cos(thetaTop)) /
    Math.sin(thetaBottom + thetaTop);

  return camAltitude - cameraHeightToReferenceBottom;
}
