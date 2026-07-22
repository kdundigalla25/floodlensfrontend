const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";

export const ADDRESS_DETECTION_API_URL = `${API_BASE_URL}/gsv_prediction`;

// Uploaded-photo fallback: send the user's image plus the coordinates where it
// was taken (from EXIF GPS or a dropped map pin). Returns detection + camera
// altitude, like /gsv_prediction. Endpoint path is a placeholder until the
// backend route is finalized.
export const COORDS_DETECTION_API_URL = `${API_BASE_URL}/coords_prediction`;

export const DEFAULT_FOV_DEGREES = 60;

// Temporary hardcoded flood elevation for address/GSV flow.
export const PLACEHOLDER_FLOOD_ELEVATION_METERS = 150;
