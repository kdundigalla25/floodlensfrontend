import {
  calculateFloodReachFromAddress,
  calculateFloodReachFromGroundLine,
} from "./floodMath";
import { getImageDimensions } from "./imageUtils";
import {
  fetchPixelDataFromAddress,
  fetchPixelDataFromImage,
  getImageUrlFromAddressResponse,
} from "./previewApi";
import type {
  FloodPreviewResult,
  GenerateAddressPreviewInput,
  GenerateImagePreviewInput,
} from "./types";

export async function generateFloodPreviewFromImage({
  imageUrl,
  groundLine,
  imageFile,
  address,
}: GenerateImagePreviewInput): Promise<FloodPreviewResult> {
  const { width: imageWidth, height: imageHeight } =
    await getImageDimensions(imageUrl);

  const detection = await fetchPixelDataFromImage(imageFile);

  if (!detection.reference_type || !detection.pixel_height || !detection.box) {
    throw new Error("No usable door or garage door detected.");
  }

  const groundMidpointYPercent = (groundLine.start.y + groundLine.end.y) / 2;
  const groundMidpointYPixels = (groundMidpointYPercent / 100) * imageHeight;

  const floodCalculation = calculateFloodReachFromGroundLine({
    imageHeight,
    groundMidpointYPixels,
    referenceType: detection.reference_type,
    referencePixelHeight: detection.pixel_height,
  });

  return {
    imageUrl,
    groundLine,
    address,
    imageWidth,
    imageHeight,
    groundMidpointYPixels,
    groundMidpointYPercent,
    referenceType: detection.reference_type,
    referenceBox: detection.box,
    ...floodCalculation,
  };
}

export async function generateFloodPreviewFromAddress({
  address,
}: GenerateAddressPreviewInput): Promise<FloodPreviewResult> {
  const detection = await fetchPixelDataFromAddress(address);

  if (!detection.reference_type || !detection.pixel_height || !detection.box) {
    throw new Error("No usable door or garage door detected from address.");
  }

  const imageUrl = getImageUrlFromAddressResponse(detection);

  const { width: imageWidth, height: imageHeight } =
    await getImageDimensions(imageUrl);

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
    groundLine: null,
    address,
    imageWidth,
    imageHeight,
    groundMidpointYPixels: null,
    groundMidpointYPercent: null,
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
  GenerateImagePreviewInput,
  GenerateAddressPreviewInput,
  FloodPreviewResult,
} from "./types";
