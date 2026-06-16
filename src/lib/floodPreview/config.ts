const API_BASE_URL =
  import.meta.env.SERVER_BASE_URL || "http://192.168.56.1:8000";

export const IMAGE_DETECTION_API_URL = `${API_BASE_URL}/detect_reference`;

export const ADDRESS_DETECTION_API_URL = `${API_BASE_URL}/gsv_prediction`;

export const DEFAULT_FOV_DEGREES = 60;

// Temporary until your flood model is connected.
export const PLACEHOLDER_UPLOADED_IMAGE_FLOOD_HEIGHT_FEET = 3;

// Temporary hardcoded flood elevation for address/GSV flow.
export const PLACEHOLDER_FLOOD_ELEVATION_METERS = 150;
