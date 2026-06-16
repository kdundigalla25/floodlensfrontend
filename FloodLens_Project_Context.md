# FloodLens Project Context for LLM Continuation

## 1. Project Summary

FloodLens is a web application that helps homeowners understand flood risk by making it visual. Instead of only showing abstract flood maps, elevation numbers, or insurance-zone labels, the app generates an image-based preview showing where flood water could potentially reach on a user's home.

The main idea:

```txt
Address or home photo
→ Retrieve or upload home image
→ Detect a reference object such as a front door or garage door
→ Convert image pixels into real-world scale
→ Estimate flood waterline position
→ Display flood overlay on the home image
```

The goal is to help homeowners make more informed decisions about flood preparation, protection, and flood insurance.

---

## 2. Current Product Flow

The app should use an address-first flow.

```txt
User starts on homepage
→ User clicks Get Started
→ User enters home address
→ Frontend calls backend /gsv_prediction
→ Backend tries to retrieve Google Street View image
→ Backend runs door / garage detection
→ If detection succeeds, frontend generates and shows flood preview
→ If Street View or detection fails, frontend switches to manual upload flow
```

Manual upload fallback:

```txt
Street View unavailable OR automatic detection fails
→ User uploads front-facing home image
→ User marks ground line
→ Frontend calls backend /detect_reference
→ Backend detects door / garage
→ Frontend calculates image scale and flood waterline
→ Results page shows flood overlay
```

Important product assumption:

```txt
Street View failure and detection failure are normal fallback conditions, not dead ends.
```

---

## 3. Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- Session storage for temporary state

### Backend
- Python
- FastAPI
- Uvicorn
- Requests
- python-dotenv
- Pillow
- NumPy
- OpenCV headless
- Ultralytics YOLO
- python-multipart

### External Services
- Google Street View Static API
- Google Street View Metadata API
- Render for backend hosting
- Potential future elevation/flood sources such as USGS EPQS

---

## 4. Repositories

### Frontend repo
Likely repo name:

```txt
floodlensfrontend
```

The frontend handles:
- Landing page
- Address input
- Image upload
- Ground-line marking
- API calls
- Flood preview display
- Results page

### Backend repo
Repo name:

```txt
floodlens-backend
```

GitHub description:

```txt
FastAPI backend for FloodLens, handling Street View image retrieval, reference detection, elevation inputs, and flood preview calculations.
```

The backend handles:
- Street View metadata lookup
- Street View image retrieval
- Uploaded image processing
- YOLO reference-object detection
- Returning detection/image data to frontend

---

## 5. Backend API Endpoints

### `GET /gsv_prediction?address=<address>`

Used for automatic address flow.

Responsibilities:
- Receive address
- Query Google Street View metadata
- Retrieve Street View image if available
- Run detection model
- Return image and detection data

Common failure cases:
- No Street View image found
- Street View exists but angle is bad
- No usable front door or garage door detected
- Google API issue
- Model or memory issue

Frontend should treat these as fallback triggers when appropriate.

### `POST /detect_reference`

Used for manual uploaded image flow.

Responsibilities:
- Receive image as multipart upload
- Run YOLO detection
- Return detected reference object data

Frontend request pattern:

```ts
const formData = new FormData();
formData.append("file", imageFile);

const response = await fetch(IMAGE_DETECTION_API_URL, {
  method: "POST",
  body: formData,
});
```

---

## 6. Frontend API Configuration

Do not hardcode localhost in production.

Use this pattern:

```ts
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export const IMAGE_DETECTION_API_URL = `${API_BASE_URL}/detect_reference`;

export const ADDRESS_DETECTION_API_URL = `${API_BASE_URL}/gsv_prediction`;
```

Local frontend `.env`:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Production frontend environment variable:

```env
VITE_API_BASE_URL=https://floodlens-backend.onrender.com
```

Important:
- Use `localhost` or `127.0.0.1` for browser/frontend calls.
- Use `0.0.0.0` only for backend server binding.

---

## 7. Backend Deployment Context

Backend is deployed on Render:

```txt
https://floodlens-backend.onrender.com
```

Docs route:

```txt
https://floodlens-backend.onrender.com/docs
```

Correct Render start command:

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

Do not use for production:

```bash
fastapi dev main.py
```

Recommended Render environment variables:

```env
GOOGLE_MAPS_API_KEY=your_key_here
MODEL_PATH=models/best.pt
```

Important issue:
- Render free instances have low memory, around 512 MB.
- FastAPI + Ultralytics + PyTorch + OpenCV + YOLO can exceed 512 MB.
- If Render says it used over 512 MB, the app needs a smaller model, lazy loading, lower `imgsz`, fewer heavy dependencies, or a larger instance.

Recommended health routes that do not touch the model:

```py
@app.get("/")
def root():
    return {"status": "ok", "message": "FloodLens backend is running"}

@app.get("/health")
def health():
    return {"status": "healthy"}
```

---

## 8. Backend Requirements

Avoid blindly using local `pip freeze` because it can include local CUDA-specific PyTorch packages that fail on Render.

Recommended minimal `requirements.txt`:

```txt
fastapi
uvicorn[standard]
python-dotenv
requests
pillow
numpy
opencv-python-headless
python-multipart
ultralytics
```

If CPU PyTorch install needs to be explicit:

```txt
--extra-index-url https://download.pytorch.org/whl/cpu

fastapi
uvicorn[standard]
python-dotenv
requests
pillow
numpy
opencv-python-headless
python-multipart
torch
torchvision
ultralytics
```

Recommended `.python-version`:

```txt
3.11.9
```

Do not use local CUDA requirements like:

```txt
torch==2.12.0+cu126
```

on Render.

---

## 9. Backend `.gitignore` Guidance

Recommended backend ignores:

```gitignore
__pycache__/
*.py[cod]
*$py.class

.venv/
venv/
env/
ENV/

.env
.env.*
!.env.example

*.log
logs/

.vscode/
.idea/
.DS_Store
Thumbs.db

.pytest_cache/
.coverage
htmlcov/
.mypy_cache/
.ruff_cache/

build/
dist/
*.egg-info/

datasets/
dataset/
data/
raw_data/
training_data/
validation_data/
test_data/

images/
imageStorage/
uploads/
outputs/
results/
predictions/
temp/
tmp/

runs/

models/*.pt
models/*.pth
models/*.onnx
models/*.engine
models/*.weights
models/*.ckpt
models/*.safetensors

!models/.gitkeep
```

Important:
- Datasets, image folders, YOLO training `runs/`, uploads, outputs, and generated predictions should be ignored.
- The inference model file is required for backend to run. If `models/best.pt` is ignored, Render will not have it.
- Options:
  - Commit only a small final model
  - Upload model separately
  - Download model during build/startup
  - Use cloud storage

---

## 10. YOLO / Detection Model Context

The backend uses Ultralytics YOLO to detect:
- `front_door`
- `garage_door`

Local/training model path used before:

```txt
runs/detect/train/weights/best.pt
```

Deployment-friendly path:

```txt
models/best.pt
```

Recommended code:

```py
MODEL_PATH = os.getenv("MODEL_PATH", "models/best.pt")
```

Recommended lazy-load pattern:

```py
from ultralytics import YOLO
import os

_model = None

def get_model():
    global _model

    if _model is None:
        model_path = os.getenv("MODEL_PATH", "models/best.pt")
        _model = YOLO(model_path)

    return _model
```

Use inside prediction function:

```py
model = get_model()
results = model(image_path, imgsz=416, conf=0.2, device="cpu")
```

Notes:
- `imgsz=640` may be better but uses more memory.
- `imgsz=416` or `512` can reduce memory.
- Render likely runs CPU inference unless using a specialized GPU host.
- Use `opencv-python-headless`, not `opencv-python`.

---

## 11. Google Street View Context

Preferred implementation uses official Google API endpoints with `requests`, not the `streetlevel` package.

Metadata endpoint:

```txt
https://maps.googleapis.com/maps/api/streetview/metadata
```

Image endpoint:

```txt
https://maps.googleapis.com/maps/api/streetview
```

Recommended metadata request:

```py
params = {
    "location": address,
    "radius": 200,
    "key": GOOGLE_MAPS_API_KEY,
}
```

Use returned `pano_id` for image request:

```py
params = {
    "size": "640x640",
    "pano": pano_id,
    "fov": 60,
    "heading": 0,
    "pitch": 0,
    "key": GOOGLE_MAPS_API_KEY,
}
```

Important:
- `source="outdoor"` can reduce matches; remove during debugging.
- Some addresses fail despite Google Maps showing imagery. Try larger radius or geocoding to lat/lng first.
- If `output_path` is a string, write with `Path(output_path).write_bytes(response.content)`.

There was a previous Render issue:

```txt
ModuleNotFoundError: No module named 'streetlevel'
```

Preferred fix:
- Remove `streetlevel`
- Use direct `requests` calls to Google Street View endpoints

---

## 12. CORS

Backend should allow local frontend and deployed frontend.

Example:

```py
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://your-frontend-domain.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Replace `https://your-frontend-domain.com` with actual frontend deployment URL.

---

## 13. Frontend Session Storage Keys

The app uses session storage for temporary prototype state.

Known/recommended keys:

```txt
houseImageUrl
groundLine
homeAddressInput
homeFullAddress
floodPreviewResult
```

Address should still be saved when falling back to manual upload:

```ts
sessionStorage.setItem("homeAddressInput", JSON.stringify(addressInput));
sessionStorage.setItem("homeFullAddress", fullAddress);
```

---

## 14. Important Frontend Types

### Ground Line

The ground line is where the home meets the ground. It is marked manually in upload fallback flow.

Coordinates are stored as percentages.

```ts
export type GroundLine = {
  start: {
    x: number;
    y: number;
  };
  end: {
    x: number;
    y: number;
  };
};
```

### Bounding Box

```ts
export type BoundingBox = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};
```

### Reference Type

```ts
export type ReferenceType = "front_door" | "garage_door" | null;
```

### Backend Detection Response

```ts
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
```

### Flood Preview Result

```ts
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
```

Important:
- `groundLine` may be `null` for automatic address/GSV flow.
- Results page must not assume groundLine exists.

---

## 15. Reference Object Assumptions

Reference types:
- `front_door`
- `garage_door`

Typical real-world heights:
- Front door: 80 inches
- Garage door: 84 inches or 96 inches depending app version

Recent refactor used:

```ts
front_door = 80 inches
garage_door = 84 inches
```

Meters:
- Front door ≈ 2.03 m
- Garage door ≈ 2.13 m

Make sure frontend and backend use consistent assumptions.

---

## 16. Flood Math: Uploaded Image Flow

Uploaded image flow uses:
- User-drawn ground line
- Detected reference object pixel height
- Known real reference height
- Placeholder flood height, usually 3 ft for now

Correct pattern:

```ts
const groundMidpointYPercent = (groundLine.start.y + groundLine.end.y) / 2;
const groundMidpointYPixels = (groundMidpointYPercent / 100) * imageHeight;

const pixelsPerInch = referencePixelHeight / referenceHeightInches;
const floodHeightPixels = floodHeightFeet * 12 * pixelsPerInch;

const floodLineYPixels = clamp(
  groundMidpointYPixels - floodHeightPixels,
  0,
  imageHeight
);

const floodLineYPercent = (floodLineYPixels / imageHeight) * 100;
const floodFillFromBottom = clamp(1 - floodLineYPixels / imageHeight, 0, 1);
```

Critical bug to avoid:
- Do not mix percentage coordinates and pixel coordinates.
- Do not hardcode image height like `640`; use actual `imageHeight`.

---

## 17. Flood Math: Address / GSV Flow

Address flow can eventually use:
- Detected reference object
- Camera/GSV metadata
- Estimated finished floor elevation
- Flood elevation

General pattern:

```ts
const floodAltitudeFromDoorBot = floodElevationMeters - elev_FFE;

const referenceHeightInches = getReferenceHeightInches(referenceType);
const pixelsPerInch = referencePixelHeight / referenceHeightInches;
const pixelsPerMeter = pixelsPerInch * 39.37;

const yPixelLevel = referenceBox.y2 - floodAltitudeFromDoorBot * pixelsPerMeter;

const floodLineYPixels = clamp(yPixelLevel, 0, imageHeight);
const floodLineYPercent = (floodLineYPixels / imageHeight) * 100;
const floodFillFromBottom = clamp(1 - floodLineYPixels / imageHeight, 0, 1);
```

Important:
- Image y-axis increases downward.
- If water elevation is higher, waterline moves upward in the image.
- If `yPixelLevel` is already the final flood line y pixel, do not recompute it from ground line.

---

## 18. Frontend Component Organization

### Home Page Split

Recommended structure:

```txt
src/pages/HomePage.tsx
src/components/home/homeContent.ts
src/components/home/HeroSection.tsx
src/components/home/HeroPreview.tsx
src/components/home/HowItWorksSection.tsx
src/components/home/StepCard.tsx
src/components/home/ImageStorySection.tsx
src/components/home/WhySection.tsx
src/components/home/MiniMetric.tsx
src/components/home/FeaturePill.tsx
```

Home page should compose:

```tsx
<main className="overflow-hidden">
  <HeroSection />
  <HowItWorksSection />
  <ImageStorySection />
  <WhySection />
</main>
```

Home flow copy:
1. Enter address
2. Use Street View or upload
3. Preview flood height

### Upload Page Split

Recommended structure:

```txt
src/components/upload/uploadTypes.ts
src/components/upload/UploadLoadingState.tsx
src/components/upload/UploadProgressPanel.tsx
src/components/upload/AddressLookupCard.tsx
src/components/upload/PhotoDropzone.tsx
src/components/upload/PhotoFallbackCard.tsx
src/pages/UploadPage.tsx
```

`uploadTypes.ts`:

```ts
export type AddressInput = {
  address: string;
  city: string;
  state: string;
};

export function getFullAddress(input: AddressInput) {
  return `${input.address.trim()}, ${input.city.trim()}, ${input.state.trim()}`;
}

export function isAddressComplete(input: AddressInput) {
  return (
    input.address.trim().length > 0 &&
    input.city.trim().length > 0 &&
    input.state.trim().length === 2
  );
}
```

Upload page state should include:
- `imageUrl`
- `imageFile`
- `addressInput`
- `groundLine`
- `checkingAddress`
- `generatingPreview`
- `gsvUnavailable`
- `gsvError`

Fallback condition logic:

```ts
const shouldUseImageFallback =
  message.toLowerCase().includes("no usable door") ||
  message.toLowerCase().includes("garage door detected") ||
  message.toLowerCase().includes("no street view") ||
  message.toLowerCase().includes("street view image found") ||
  message.toLowerCase().includes("404") ||
  message.toLowerCase().includes("zero_results");

if (shouldUseImageFallback) {
  setGsvUnavailable(true);
  setGsvError(null);
  return;
}
```

### Results Page Split

Recommended structure:

```txt
src/pages/ResultsPage.tsx
src/components/results/EmptyResultState.tsx
src/components/results/ResultsHeader.tsx
src/components/results/ResultMetricCard.tsx
src/components/results/ResultDetailsPanel.tsx
src/components/preview/FloodPreview.tsx
```

Results should support both address and uploaded image flows:

```ts
const imageSource = result.groundLine ? "Uploaded photo" : "Street View";
const savedAddress =
  result.address ||
  sessionStorage.getItem("homeFullAddress") ||
  "Address unavailable";
```

---

## 19. Frontend Flood Preview Library Split

Recommended folder:

```txt
src/lib/floodPreview/
  index.ts
  types.ts
  config.ts
  imageUtils.ts
  referenceHeights.ts
  previewApi.ts
  floodMath.ts
  ffeGeometry.ts
```

Old imports:

```ts
import {
  generateFloodPreviewFromAddress,
  generateFloodPreviewFromImage,
} from "../lib/generateFloodPreview";

import type { FloodPreviewResult } from "../lib/generateFloodPreview";
```

New imports:

```ts
import {
  generateFloodPreviewFromAddress,
  generateFloodPreviewFromImage,
} from "../lib/floodPreview";

import type { FloodPreviewResult } from "../lib/floodPreview";
```

### `imageUtils.ts`

```ts
export function getImageDimensions(
  src: string
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () =>
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });

    img.onerror = reject;
    img.src = src;
  });
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
```

### `referenceHeights.ts`

```ts
import type { ReferenceType } from "./types";

export function getReferenceHeightInches(referenceType: ReferenceType) {
  return referenceType === "front_door" ? 80 : 84;
}

export function getReferenceHeightMeters(referenceType: ReferenceType) {
  return referenceType === "front_door" ? 2.03 : 2.13;
}
```

---

## 20. Ground Line Interaction

Ground line requirements:
- Used only in manual upload flow
- User marks where the house meets the ground
- Stored in percent coordinates
- Midpoint is used as ground reference for flood height

Preferred UX:
- Click once to place start point
- Click again to place endpoint
- Endpoints should be draggable
- Use pointer events for mouse/touch
- Clamp coordinates from 0 to 100
- Use `touchAction: "none"` on the interaction area

A slanted ground line is acceptable because perspective can make the house base appear angled.

---

## 21. Known Errors / Debug Context

### Error: No usable door or garage door detected from address

This comes from the frontend address flow, likely in:

```txt
generateFloodPreview.ts
```

or after refactor:

```txt
src/lib/floodPreview/index.ts
```

Flow:

```txt
UploadPage
→ handleCheckAddress
→ generateFloodPreviewFromAddress
→ fetchPixelDataFromAddress
→ backend /gsv_prediction
→ frontend validates reference_type, pixel_height, and box
→ if invalid, throws "No usable door or garage door detected from address."
```

This should now route to manual upload fallback instead of showing an error popup.

### Render: Application loading

Usually means:
- Free instance is waking up
- App crashed during startup
- Model loading is slow
- No open port because app crashed before Uvicorn started

Check Render logs for:

```txt
Application startup complete.
```

### Render: No open ports detected

Usually a side effect of the app crashing before Uvicorn starts. Check import errors or model-loading errors above it.

### Render: Out of memory over 512 MB

Likely from:
- `ultralytics`
- `torch`
- `opencv`
- YOLO model loaded at startup

Mitigations:
- Lazy-load model
- Lower image size
- Use smaller model
- Upgrade Render
- Use headless OpenCV
- Avoid loading model for `/health`

---

## 22. Design Direction

The app should feel:
- Modern
- Climate-tech / insurtech inspired
- Trustworthy
- Clean
- Polished
- Not overly flashy

Visual direction:
- Dark navy backgrounds
- Cyan/blue accents
- Glassy/floating cards
- Smooth Framer Motion animations
- Clear CTAs
- Large image previews
- Practical professional UI

Useful colors:
```txt
Deep navy: #07111F
Dark card: #101d30
Dark card 2: #132233
Cyan/blue accents
Orange/purple for fallback/status
```

Navbar direction:
- Fixed floating pill
- Rounded full
- Dark/glass style
- Brand left
- Nav center
- CTA right
- Mobile menu with AnimatePresence

Hero direction:
- Slightly smaller than huge default headings
- Good preview image/card on right
- Main CTA: start visualization
- Secondary CTA: learn how it works

---

## 23. Presentation / Flowchart Context

Project blurb:

```txt
This project is focused on helping homeowners better understand flood risk by making it visual and easy to interpret. Users can enter their address or upload a photo of their home, and the system generates a preview showing where flood water could potentially reach on the building. The goal is to turn complex flood and elevation data into a simple image-based visualization, so homeowners can make more informed decisions about preparation, protection, and flood insurance.
```

Suggested presentation structure after background/context:
1. The Gap
2. What We Built
3. User Flow
4. System Architecture
5. Pixel-to-Real-World Scaling
6. Fallback Flow
7. Demo
8. Limitations
9. Future Work
10. Impact

Flowchart structure:
```txt
Address / Photo Input
→ Image Source
→ Reference Detection
→ Scale Calculation
→ Flood Height Calculation
→ Visual Preview
```

Backend rectangle should show:
```txt
Receive Address
→ Check Street View Availability
→ Retrieve Street View Image
→ Run Detection Model
→ Return Detection Result
```

Fallback flow:
```txt
If Street View unavailable or detection unsuccessful
→ User uploads photo
→ User marks ground line
→ Run detection model
→ Return detection result
```

Preferred diagram style:
- Dark mode
- Large backend rectangle
- Clear arrows into and out of backend
- Fallback flow underneath
- Remove legend if it adds clutter

---

## 24. Current Best Next Steps

1. Ensure frontend uses `VITE_API_BASE_URL`.
2. Ensure backend CORS includes deployed frontend URL.
3. Add backend `/health` route.
4. Make YOLO lazy-loaded.
5. Verify Render has access to `models/best.pt`.
6. Treat Street View/detection failure as fallback to manual upload.
7. Test end-to-end:
   - Address flow success
   - No Street View fallback
   - Detection failure fallback
   - Manual upload + ground line
   - Results page preview
8. Later integrate more reliable elevation/flood data.
9. Later improve model accuracy with better labeled exterior home images.
10. Later improve GSV selection by geocoding, heading selection, and better image quality checks.

---

## 25. Guiding Principle for Future LLM Work

When continuing this project, preserve this core assumption:

```txt
The app should try automatic address-based visualization first, but gracefully fall back to manual upload whenever Street View or detection cannot produce a usable result.
```

Before changing code, identify which layer is being modified:

```txt
Frontend UI
Frontend flow/state
Frontend flood math
Backend API
Backend Street View retrieval
Backend YOLO detection
Deployment/Render
Presentation/diagram
```

Keep the user flow clear and avoid turning normal fallback cases into blocking errors.
