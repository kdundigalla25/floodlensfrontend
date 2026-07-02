import {
  ADDRESS_DETECTION_API_URL,
  COORDS_DETECTION_API_URL,
} from "./config";
import type { BackendDetectionResponse } from "./types";

export async function fetchPixelDataFromAddress(
  address: string,
): Promise<BackendDetectionResponse> {
  const response = await fetch(
    `${ADDRESS_DETECTION_API_URL}?address=${encodeURIComponent(address)}`,
  );

  if (response.status === 404) {
    throw new Error("No Street View image found for this address.");
  }

  if (!response.ok) {
    throw new Error(`Address detection failed with status ${response.status}`);
  }

  return response.json();
}

export async function fetchPixelDataFromCoords(
  imageFile: File,
  lat: number,
  lng: number,
): Promise<BackendDetectionResponse> {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("latitude", String(lat));
  formData.append("longitude", String(lng));

  const response = await fetch(COORDS_DETECTION_API_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Coordinate detection failed with status ${response.status}`);
  }

  return response.json();
}

export function getImageUrlFromAddressResponse(data: BackendDetectionResponse) {
  if (data.image_url) {
    return data.image_url;
  }

  if (data.image_base64) {
    const mediaType = data.media_type || "image/jpeg";
    return `data:${mediaType};base64,${data.image_base64}`;
  }

  throw new Error("Address backend did not return an image.");
}
