import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import {
  GroundLineStep,
  type GroundLine,
} from "../components/measurement/GroundLineStep";
import {
  generateFloodPreviewFromAddress,
  generateFloodPreviewFromImage,
} from "../lib/floodPreview";
import { AddressLookupCard } from "../components/upload/AddressLookupCard";
import { PhotoFallbackCard } from "../components/upload/PhotoFallbackCard";
import { UploadLoadingState } from "../components/upload/UploadLoadingState";
import { UploadProgressPanel } from "../components/upload/UploadProgressPanel";
import {
  getFullAddress,
  isAddressComplete,
  type AddressInput,
} from "../components/upload/uploadTypes";

export function UploadPage() {
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState<string | null>(
    sessionStorage.getItem("houseImageUrl"),
  );

  const [imageFile, setImageFile] = useState<File | null>(null);

  const [addressInput, setAddressInput] = useState<AddressInput>(() => {
    const saved = sessionStorage.getItem("homeAddressInput");
    return saved
      ? JSON.parse(saved)
      : { address: "", city: "", state: "" };
  });

  const [groundLine, setGroundLine] = useState<GroundLine | null>(() => {
    const saved = sessionStorage.getItem("groundLine");
    return saved ? JSON.parse(saved) : null;
  });

  const [checkingAddress, setCheckingAddress] = useState(false);
  const [generatingPreview, setGeneratingPreview] = useState(false);
  const [gsvUnavailable, setGsvUnavailable] = useState(false);
  const [gsvError, setGsvError] = useState<string | null>(null);

  const addressIsComplete = isAddressComplete(addressInput);
  const fullAddress = getFullAddress(addressInput);

  const imageFlowIsComplete =
    addressIsComplete && !!imageUrl && !!imageFile && !!groundLine;

  useEffect(() => {
    sessionStorage.setItem("homeAddressInput", JSON.stringify(addressInput));
    sessionStorage.setItem("homeFullAddress", fullAddress);
  }, [addressInput, fullAddress]);

  function updateAddressInput(value: AddressInput) {
    setAddressInput(value);
    setGsvUnavailable(false);
    setGsvError(null);
  }

  async function handleCheckAddress() {
    if (!addressIsComplete) return;

    setCheckingAddress(true);
    setGsvUnavailable(false);
    setGsvError(null);

    sessionStorage.setItem("homeFullAddress", fullAddress);
    sessionStorage.setItem("homeAddressInput", JSON.stringify(addressInput));

    try {
      const result = await generateFloodPreviewFromAddress({
        address: fullAddress,
      });

      sessionStorage.setItem("floodPreviewResult", JSON.stringify(result));
      navigate("/results");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong.";

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

      setGsvError(message);
    } finally {
      setCheckingAddress(false);
    }
  }

  async function handleGenerateFromImage() {
    if (!imageFlowIsComplete) return;

    setGeneratingPreview(true);

    sessionStorage.setItem("homeFullAddress", fullAddress);
    sessionStorage.setItem("homeAddressInput", JSON.stringify(addressInput));

    try {
      const result = await generateFloodPreviewFromImage({
        imageUrl: imageUrl!,
        imageFile: imageFile!,
        groundLine: groundLine!,
        address: fullAddress,
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
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10"
      >
        <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl">
          Start with the address. We'll handle the image source.
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400 md:text-lg">
          We first try Street View. If there's no usable image, upload your own
          photo while the address stays saved for road elevation.
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
        <UploadProgressPanel
          addressIsComplete={addressIsComplete}
          gsvUnavailable={gsvUnavailable}
          imageUrl={imageUrl}
          groundLine={groundLine}
          canGenerateFromImage={imageFlowIsComplete}
        />

        <section className="grid gap-6">
          <AddressLookupCard
            addressInput={addressInput}
            setAddressInput={updateAddressInput}
            addressIsComplete={addressIsComplete}
            checkingAddress={checkingAddress}
            onCheckAddress={handleCheckAddress}
          />

          {gsvUnavailable && (
            <PhotoFallbackCard
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              setImageFile={setImageFile}
              gsvError={gsvError}
            />
          )}

          {gsvUnavailable && imageUrl && (
            <GroundLineStep
              imageUrl={imageUrl}
              groundLine={groundLine}
              setGroundLine={setGroundLine}
            />
          )}

          {gsvUnavailable && (
            <motion.button
              whileHover={imageFlowIsComplete ? { scale: 1.02 } : undefined}
              whileTap={imageFlowIsComplete ? { scale: 0.98 } : undefined}
              onClick={handleGenerateFromImage}
              disabled={!imageFlowIsComplete}
              className="group inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-base font-bold text-white shadow-2xl disabled:cursor-not-allowed disabled:opacity-40"
              style={{
                background: imageFlowIsComplete
                  ? "linear-gradient(90deg, #22d3ee, #3b82f6)"
                  : "rgba(255,255,255,0.08)",
                boxShadow: imageFlowIsComplete
                  ? "0 8px 30px rgba(34,211,238,0.25)"
                  : "none",
                transition: "box-shadow 0.2s",
              }}
            >
              Generate from uploaded image
              <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </motion.button>
          )}
        </section>
      </div>
    </main>
  );
}
