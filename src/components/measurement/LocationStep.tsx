import { useEffect, useRef, useState } from "react";
import { MapPin, Loader2, Image as ImageIcon, Hand } from "lucide-react";
import { motion } from "framer-motion";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { extractGpsFromImage, type Coordinates } from "../../lib/floodPreview/exif";

// Vite serves Leaflet's marker images as hashed URLs, so wire them up manually.
// Leaflet's default icon overrides _getIconUrl to prepend an auto-detected image
// path to the URLs we set below, which corrupts the resolved Vite URLs and leaves
// broken marker images. Delete that override so the base getter returns them as-is.
delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const DEFAULT_CENTER: [number, number] = [39.5, -98.35]; // Center of the US.
const DEFAULT_ZOOM = 4;
const LOCATED_ZOOM = 16; // Street level, so pin placement is precise.

type LocationSource = "photo" | "pin" | null;

type Props = {
  imageFile: File | null;
  fullAddress: string;
  coords: Coordinates | null;
  setCoords: (coords: Coordinates | null) => void;
};

export function LocationStep({
  imageFile,
  fullAddress,
  coords,
  setCoords,
}: Props) {
  const [checkingExif, setCheckingExif] = useState(false);
  const [source, setSource] = useState<LocationSource>(null);
  const [center, setCenter] = useState<[number, number]>(DEFAULT_CENTER);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);

  // Read GPS from the uploaded photo whenever the file changes.
  useEffect(() => {
    if (!imageFile) return;

    let cancelled = false;
    // Reset UI immediately, then launch the async EXIF read for the new file.
    /* eslint-disable react-hooks/set-state-in-effect */
    setCheckingExif(true);
    setSource(null);
    setCoords(null);
    /* eslint-enable react-hooks/set-state-in-effect */

    extractGpsFromImage(imageFile).then((gps) => {
      if (cancelled) return;
      setCheckingExif(false);

      if (gps) {
        setCoords(gps);
        setSource("photo");
        setCenter([gps.lat, gps.lng]);
        setZoom(LOCATED_ZOOM);
      }
    });

    return () => {
      cancelled = true;
    };
    // setCoords is stable enough for this prototype; re-run only on new file.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFile]);

  // With no GPS, center the map near the typed address to make pin-dropping easy.
  useEffect(() => {
    if (source === "photo" || coords || !fullAddress.trim()) return;

    let cancelled = false;
    geocodeAddress(fullAddress).then((result) => {
      if (cancelled || !result) return;
      setCenter([result.lat, result.lng]);
      setZoom(LOCATED_ZOOM);
    });

    return () => {
      cancelled = true;
    };
  }, [source, coords, fullAddress]);

  function handlePlace(next: Coordinates) {
    setCoords(next);
    setSource("pin");
  }

  return (
    <motion.div
      layout
      className="rounded-4xl border border-white/10 bg-[#132233]/90 p-5 shadow-2xl"
    >
      <div className="mb-5 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-300/15 text-cyan-200">
          <MapPin className="h-6 w-6" />
        </div>

        <div>
          <h2 className="text-xl font-black text-white">
            Confirm the photo location
          </h2>
          <p className="mt-2 leading-7 text-slate-400">
            We use the coordinates where the photo was taken to estimate
            elevation and flood reach.
          </p>
        </div>
      </div>

      <div className="mb-4">
        {checkingExif ? (
          <StatusPill
            tone="neutral"
            icon={<Loader2 className="h-4 w-4 animate-spin" />}
            text="Reading location from photo…"
          />
        ) : source === "photo" ? (
          <StatusPill
            tone="good"
            icon={<ImageIcon className="h-4 w-4" />}
            text="Location detected from your photo — drag the pin to fine-tune."
          />
        ) : (
          <StatusPill
            tone="warn"
            icon={<Hand className="h-4 w-4" />}
            text="No location in this photo. Click the map to drop a pin where it was taken."
          />
        )}
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/10">
        <MapContainer
          center={center}
          zoom={zoom}
          scrollWheelZoom
          style={{ height: 360, width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Recenter center={center} zoom={zoom} />
          <ClickToPlace onPlace={handlePlace} />
          {coords && (
            <Marker
              position={[coords.lat, coords.lng]}
              draggable
              eventHandlers={{
                dragend(event) {
                  const { lat, lng } = event.target.getLatLng();
                  handlePlace({ lat, lng });
                },
              }}
            />
          )}
        </MapContainer>
      </div>

      {coords && (
        <p className="mt-3 text-sm font-semibold text-slate-400">
          {coords.lat.toFixed(6)}, {coords.lng.toFixed(6)}
        </p>
      )}
    </motion.div>
  );
}

function ClickToPlace({ onPlace }: { onPlace: (coords: Coordinates) => void }) {
  useMapEvents({
    click(event) {
      onPlace({ lat: event.latlng.lat, lng: event.latlng.lng });
    },
  });
  return null;
}

function Recenter({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) {
  const map = useMap();
  const last = useRef<string | null>(null);

  useEffect(() => {
    const key = `${center[0]},${center[1]},${zoom}`;
    if (last.current === key) return;

    last.current = key;
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
}

async function geocodeAddress(
  address: string,
): Promise<Coordinates | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
      address,
    )}`;
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return null;

    const data = (await response.json()) as Array<{ lat: string; lon: string }>;
    if (!data.length) return null;

    return { lat: Number(data[0].lat), lng: Number(data[0].lon) };
  } catch {
    return null;
  }
}

function StatusPill({
  tone,
  icon,
  text,
}: {
  tone: "good" | "warn" | "neutral";
  icon: React.ReactNode;
  text: string;
}) {
  const toneClass =
    tone === "good"
      ? "border-emerald-300/25 bg-emerald-300/10 text-emerald-100"
      : tone === "warn"
        ? "border-amber-300/25 bg-amber-300/10 text-amber-100"
        : "border-white/10 bg-white/5 text-slate-200";

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold ${toneClass}`}
    >
      {icon}
      {text}
    </div>
  );
}
