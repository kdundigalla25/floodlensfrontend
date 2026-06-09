import type { GroundLine } from "../../components/measurement/GroundLineStep";

export type BoundingBox = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

export type ReferenceType = "front_door" | "garage_door" | null;

export type BackendDetectionResponse = {
  reference_type: ReferenceType;
  pixel_height: number;
  confidence?: number;
  box: BoundingBox | null;
  image_base64?: string;
  media_type?: string;
  image_url?: string;
  altitude: number;
};

export type GenerateImagePreviewInput = {
  imageUrl: string;
  groundLine: GroundLine;
  imageFile: File;
  address: string;
};

export type GenerateAddressPreviewInput = {
  address: string;
};

export type FloodPreviewResult = {
  imageUrl: string;
  groundLine: GroundLine | null;
  address: string;

  imageWidth: number;
  imageHeight: number;

  groundMidpointYPixels: number | null;
  groundMidpointYPercent: number | null;

  floodLineYPixels: number;
  floodLineYPercent: number;
  floodFillFromBottom: number;

  floodHeightFeet: number | null;
  floodHeightPixels: number | null;

  pixelsPerInch: number;

  referenceType: ReferenceType;
  referenceBox: BoundingBox | null;

  referencePixelHeight?: number;
  referenceHeightInches?: number;

  cam_altitude?: number;
  elev_FFE?: number;
  floodElevationMeters?: number;
  floodAltitudeFromDoorBot?: number;
};
