import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Waves } from "lucide-react";
import { motion } from "framer-motion";
import { LocationStep } from "../components/measurement/LocationStep";
import type { Coordinates } from "../lib/floodPreview/exif";
import {
  buildAddressFloodResult,
  fetchAddressDetection,
  generateFloodPreviewFromCoords,
  type AddressDetection,
} from "../lib/floodPreview";
import { AddressLookupCard } from "../components/upload/AddressLookupCard";
import {
  MethodChoiceCard,
  type UploadMethod,
} from "../components/upload/MethodChoiceCard";
import { GsvConfirmCard } from "../components/upload/GsvConfirmCard";
import {
  PhotoFallbackCard,
  type PhotoReason,
} from "../components/upload/PhotoFallbackCard";
import { UploadLoadingState } from "../components/upload/UploadLoadingState";
import { UploadProgressPanel } from "../components/upload/UploadProgressPanel";
import {
  getFullAddress,
  isAddressComplete,
  type AddressInput,
} from "../components/upload/uploadTypes";

type FlowMethod = "choose" | UploadMethod;

const GSV_FALLBACK_HINTS = [
  "no usable door",
  "garage door detected",
  "no street view",
  "street view image found",
  "404",
  "zero_results",
];

export function UploadPage() {
  const navigate = useNavigate();

  const [method, setMethod] = useState<FlowMethod>("choose");

  const [imageUrl, setImageUrl] = useState<string | null>(
    sessionStorage.getItem("houseImageUrl"),
  );
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [addressInput, setAddressInput] = useState<AddressInput>(() => {
    const saved = sessionStorage.getItem("homeAddressInput");
    return saved ? JSON.parse(saved) : { address: "", city: "", state: "" };
  });

  const [coords, setCoords] = useState<Coordinates | null>(null);

  const [checkingAddress, setCheckingAddress] = useState(false);
  const [generatingPreview, setGeneratingPreview] = useState(false);

  const [gsvDetection, setGsvDetection] = useState<AddressDetection | null>(
    null,
  );
  const [gsvError, setGsvError] = useState<string | null>(null);
  const [photoReason, setPhotoReason] = useState<PhotoReason>("choice");

  const addressIsComplete = isAddressComplete(addressInput);
  const fullAddress = getFullAddress(addressInput);

  const imageFlowIsComplete =
    addressIsComplete && !!imageUrl && !!imageFile && !!coords;

  useEffect(() => {
    sessionStorage.setItem("homeAddressInput", JSON.stringify(addressInput));
    sessionStorage.setItem("homeFullAddress", fullAddress);
  }, [addressInput, fullAddress]);

  function updateAddressInput(value: AddressInput) {
    setAddressInput(value);
    // Any prior lookup is stale once the address changes.
    setGsvDetection(null);
    setGsvError(null);
  }

  function goToPhoto(reason: PhotoReason) {
    setPhotoReason(reason);
    setGsvDetection(null);
    setGsvError(null);
    setMethod("photo");
  }

  async function handleCheckAddress() {
    if (!addressIsComplete) return;

    setCheckingAddress(true);
    setGsvDetection(null);
    setGsvError(null);

    try {
      const detection = await fetchAddressDetection({ address: fullAddress });
      setGsvDetection(detection);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong.";

      const normalized = message.toLowerCase();
      const shouldUseImageFallback = GSV_FALLBACK_HINTS.some((hint) =>
        normalized.includes(hint),
      );

      if (shouldUseImageFallback) {
        goToPhoto("gsv-none");
        return;
      }

      setGsvError(message);
    } finally {
      setCheckingAddress(false);
    }
  }

  function handleConfirmGsv() {
    if (!gsvDetection) return;

    const result = buildAddressFloodResult(fullAddress, gsvDetection);
    sessionStorage.setItem("floodPreviewResult", JSON.stringify(result));
    navigate("/results");
  }

  async function handleGenerateFromImage() {
    if (!imageFlowIsComplete) return;

    setGeneratingPreview(true);

    try {
      const result = await generateFloodPreviewFromCoords({
        imageUrl: imageUrl!,
        imageFile: imageFile!,
        address: fullAddress,
        lat: coords!.lat,
        lng: coords!.lng,
      });

      sessionStorage.setItem("floodPreviewResult", JSON.stringify(result));
      navigate("/results");
    } catch (error) {
      console.error(error);

      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong generating the flood preview.";

      alert(message);
    } finally {
      setGeneratingPreview(false);
    }
  }

  if (checkingAddress) {
    return <UploadLoadingState mode="checking-address" />;
  }

  if (generatingPreview) {
    return <UploadLoadingState mode="generating-preview" />;
  }

  return (
    <main className="mx-auto max-w-7xl px-5 py-28 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-100">
          <Waves className="h-4 w-4 text-cyan-300" />
          Create your flood preview
        </div>

        <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl">
          Start with your address or your own photo.
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 md:text-lg md:leading-8">
          Try Street View from an address, or upload a front-facing photo. The
          address is always saved for road elevation.
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
        <UploadProgressPanel
          method={method}
          addressIsComplete={addressIsComplete}
          hasGsvDetection={!!gsvDetection}
          imageUrl={imageUrl}
          hasLocation={!!coords}
          canGenerateFromImage={imageFlowIsComplete}
        />

        <section className="grid gap-6">
          {method !== "choose" && (
            <button
              type="button"
              onClick={() => setMethod("choose")}
              className="inline-flex w-fit items-center gap-2 text-sm font-bold text-slate-400 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Choose a different method
            </button>
          )}

          {method === "choose" && (
            <MethodChoiceCard
              onChoose={(choice: UploadMethod) => {
                if (choice === "photo") setPhotoReason("choice");
                setMethod(choice);
              }}
            />
          )}

          {method === "address" && (
            <>
              <AddressLookupCard
                addressInput={addressInput}
                setAddressInput={updateAddressInput}
                addressIsComplete={addressIsComplete}
                checkingAddress={checkingAddress}
                onCheckAddress={handleCheckAddress}
              />

              {gsvError && (
                <div className="rounded-3xl border border-rose-300/25 bg-rose-400/10 px-5 py-4 text-sm font-bold text-rose-100">
                  {gsvError}
                </div>
              )}

              {gsvDetection && (
                <GsvConfirmCard
                  imageUrl={gsvDetection.imageUrl}
                  imageWidth={gsvDetection.imageWidth}
                  imageHeight={gsvDetection.imageHeight}
                  box={gsvDetection.detection.box!}
                  referenceType={gsvDetection.detection.reference_type}
                  onConfirm={handleConfirmGsv}
                  onReject={() => goToPhoto("gsv-rejected")}
                />
              )}
            </>
          )}

          {method === "photo" && (
            <>
              <AddressLookupCard
                variant="entry"
                addressInput={addressInput}
                setAddressInput={updateAddressInput}
                addressIsComplete={addressIsComplete}
                checkingAddress={checkingAddress}
                onCheckAddress={handleCheckAddress}
              />

              <PhotoFallbackCard
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                setImageFile={setImageFile}
                reason={photoReason}
                gsvError={gsvError}
              />

              {imageUrl && (
                <LocationStep
                  imageFile={imageFile}
                  fullAddress={fullAddress}
                  coords={coords}
                  setCoords={setCoords}
                />
              )}

              <motion.button
                whileHover={imageFlowIsComplete ? { scale: 1.02 } : undefined}
                whileTap={imageFlowIsComplete ? { scale: 0.98 } : undefined}
                onClick={handleGenerateFromImage}
                disabled={!imageFlowIsComplete}
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-cyan-300 to-blue-500 px-6 py-4 text-base font-black text-slate-950 shadow-2xl shadow-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Generate from uploaded image
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </motion.button>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
