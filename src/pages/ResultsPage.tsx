import { FloodPreview } from "../components/preview/FloodPreview";
import { EmptyResultState } from "../components/results/EmptyResultState";
import { ResultsHeader } from "../components/results/ResultsHeader";
import { ResultDetailsPanel } from "../components/results/ResultDetailsPanel";
import type { FloodPreviewResult } from "../lib/floodPreview";

export function ResultsPage() {
  const rawResult = sessionStorage.getItem("floodPreviewResult");
  const result: FloodPreviewResult | null = rawResult
    ? JSON.parse(rawResult)
    : null;

  if (!result?.imageUrl) {
    return <EmptyResultState />;
  }

  const savedAddress =
    result.address ||
    sessionStorage.getItem("homeFullAddress") ||
    "Address unavailable";

  const imageSource =
    result.source === "upload" ? "Uploaded photo" : "Street View";

  return (
    <main className="relative mx-auto max-w-7xl px-5 py-28 md:px-8">
      <div className="pointer-events-none absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-300/10 blur-3xl" />

      <ResultsHeader imageSource={imageSource} />

      <div className="relative grid gap-6 lg:grid-cols-[1.45fr_0.75fr]">
        <FloodPreview
          imageUrl={result.imageUrl}
          floodLine={result.floodFillFromBottom}
        />

        <ResultDetailsPanel
          result={result}
          address={savedAddress}
          imageSource={imageSource}
        />
      </div>
    </main>
  );
}
