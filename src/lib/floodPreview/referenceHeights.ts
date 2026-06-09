import type { ReferenceType } from "./types";

export function getReferenceHeightInches(referenceType: ReferenceType) {
  const standardDoorHeightInches = 80;
  const standardGarageDoorHeightInches = 84;

  return referenceType === "front_door"
    ? standardDoorHeightInches
    : standardGarageDoorHeightInches;
}

export function getReferenceHeightMeters(referenceType: ReferenceType) {
  const standardDoorHeightMeters = 2.03;
  const standardGarageDoorHeightMeters = 2.13;

  return referenceType === "front_door"
    ? standardDoorHeightMeters
    : standardGarageDoorHeightMeters;
}
