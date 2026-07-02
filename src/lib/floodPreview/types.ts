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

export type GenerateAddressPreviewInput = {
  address: string;
};

// A Street View detection plus its loaded image, held for user confirmation
// before the flood result is computed.
export type AddressDetection = {
  detection: BackendDetectionResponse;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
};

export type GenerateCoordsPreviewInput = {
  imageUrl: string;
  imageFile: File;
  address: string;
  lat: number;
  lng: number;
};

export type FloodImageSource = "streetview" | "upload";

export type FloodPreviewResult = {
  imageUrl: string;
  source: FloodImageSource;
  address: string;

  latitude?: number;
  longitude?: number;

  imageWidth: number;
  imageHeight: number;

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
