import exifr from "exifr";

export type Coordinates = {
  lat: number;
  lng: number;
};

/**
 * Reads GPS coordinates embedded in an uploaded photo's EXIF metadata.
 * Returns null when the image has no usable location data (the common case for
 * screenshots, downloaded images, or photos with location tagging disabled).
 */
export async function extractGpsFromImage(
  file: File,
): Promise<Coordinates | null> {
  try {
    const gps = await exifr.gps(file);

    if (
      !gps ||
      typeof gps.latitude !== "number" ||
      typeof gps.longitude !== "number" ||
      Number.isNaN(gps.latitude) ||
      Number.isNaN(gps.longitude)
    ) {
      return null;
    }

    return { lat: gps.latitude, lng: gps.longitude };
  } catch {
    // Unsupported format or unreadable metadata — treat as "no location".
    return null;
  }
}
