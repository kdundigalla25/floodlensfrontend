import { calculateFloodReachFromAddress } from "./floodMath";
import { getImageDimensions } from "./imageUtils";
import {
  fetchPixelDataFromAddress,
  fetchPixelDataFromCoords,
  getImageUrlFromAddressResponse,
} from "./previewApi";
import type {
  AddressDetection,
  FloodPreviewResult,
  GenerateAddressPreviewInput,
  GenerateCoordsPreviewInput,
} from "./types";

export async function generateFloodPreviewFromCoords({
  imageUrl,
  imageFile,
  address,
  lat,
  lng,
}: GenerateCoordsPreviewInput): Promise<FloodPreviewResult> {
  const { width: imageWidth, height: imageHeight } =
    await getImageDimensions(imageUrl);

  const detection = await fetchPixelDataFromCoords(imageFile, lat, lng);

  if (!detection.reference_type || !detection.pixel_height || !detection.box) {
    throw new Error("No usable door or garage door detected in the photo.");
  }

  const floodCalculation = calculateFloodReachFromAddress({
    imageHeight,
    imageWidth,
    referenceType: detection.reference_type,
    referencePixelHeight: detection.pixel_height,
    referenceBox: detection.box,
    camAltitude: detection.altitude,
  });

  return {
    imageUrl,
    source: "upload",
    address,
    latitude: lat,
    longitude: lng,
    imageWidth,
    imageHeight,
    referenceType: detection.reference_type,
    referenceBox: detection.box,
    floodHeightFeet: null,
    floodHeightPixels: null,
    ...floodCalculation,
  };
}

/**
 * Fetches the Street View detection for an address and loads the image, but
 * stops short of computing the flood result. This lets the UI show the image
 * and detected door box for the user to confirm before we commit to a preview.
 */
export async function fetchAddressDetection({
  address,
}: GenerateAddressPreviewInput): Promise<AddressDetection> {
  const detection = await fetchPixelDataFromAddress(address);

  if (!detection.reference_type || !detection.pixel_height || !detection.box) {
    throw new Error("No usable door or garage door detected from address.");
  }

  const imageUrl = getImageUrlFromAddressResponse(detection);

  const { width: imageWidth, height: imageHeight } =
    await getImageDimensions(imageUrl);

  return { detection, imageUrl, imageWidth, imageHeight };
}

/**
 * Computes the flood preview from a detection the user has already confirmed.
 */
export function buildAddressFloodResult(
  address: string,
  { detection, imageUrl, imageWidth, imageHeight }: AddressDetection,
): FloodPreviewResult {
  const floodCalculation = calculateFloodReachFromAddress({
    imageHeight,
    imageWidth,
    referenceType: detection.reference_type,
    referencePixelHeight: detection.pixel_height,
    referenceBox: detection.box!,
    camAltitude: detection.altitude,
  });

  return {
    imageUrl,
    source: "streetview",
    address,
    imageWidth,
    imageHeight,
    referenceType: detection.reference_type,
    referenceBox: detection.box,
    floodHeightFeet: null,
    floodHeightPixels: null,
    ...floodCalculation,
  };
}

export type {
  BoundingBox,
  ReferenceType,
  BackendDetectionResponse,
  AddressDetection,
  GenerateAddressPreviewInput,
  GenerateCoordsPreviewInput,
  FloodImageSource,
  FloodPreviewResult,
} from "./types";
