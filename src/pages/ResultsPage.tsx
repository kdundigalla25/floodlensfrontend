import { useState } from "react";
import { FloodPreview } from "../components/preview/FloodPreview";
import { EmptyResultState } from "../components/results/EmptyResultState";
import { ResultsHeader } from "../components/results/ResultsHeader";
import { ResultMetaStrip } from "../components/results/ResultMetaStrip";
import { ScenarioSelector } from "../components/results/ScenarioSelector";
import {
  FLOOD_SCENARIOS,
  waterlineForDepth,
} from "../lib/floodPreview/scenarios";
import type { FloodPreviewResult } from "../lib/floodPreview";

// Default to a representative moderate storm rather than the raw stored value.
const DEFAULT_SCENARIO_ID = "cat1-belram";

export function ResultsPage() {
  const rawResult = sessionStorage.getItem("floodPreviewResult");
  const result: FloodPreviewResult | null = rawResult
    ? JSON.parse(rawResult)
    : null;

  const [scenarioId, setScenarioId] = useState(DEFAULT_SCENARIO_ID);

  if (!result?.imageUrl) {
    return <EmptyResultState />;
  }

  const savedAddress =
    result.address ||
    sessionStorage.getItem("homeFullAddress") ||
    "Address unavailable";

  const imageSource =
    result.source === "upload" ? "Uploaded photo" : "Street View";

  const referenceLabel =
    result.referenceType === "front_door"
      ? "front door"
      : result.referenceType === "garage_door"
        ? "garage door"
        : "reference";

  const scenario =
    FLOOD_SCENARIOS.find((s) => s.id === scenarioId) ?? FLOOD_SCENARIOS[0];

  // The selected storm's depth drives the rendered water level, reusing the
  // scale from the detection. Swapping in real model data later means changing
  // the scenario list, not this page.
  const waterline = waterlineForDepth(result, scenario.depthFeet);

  return (
    <main className="relative mx-auto max-w-5xl px-5 pb-24 pt-32 md:px-8">
      <div className="pointer-events-none absolute left-1/2 top-24 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-300/10 blur-3xl" />

      <ResultsHeader imageSource={imageSource} />

      <ScenarioSelector
        scenarios={FLOOD_SCENARIOS}
        selectedId={scenario.id}
        onSelect={setScenarioId}
      />

      <FloodPreview
        imageUrl={result.imageUrl}
        floodLine={waterline.floodFillFromBottom}
        doorPct={waterline.doorPct}
        aboveDoor={waterline.aboveDoor}
        referenceLabel={referenceLabel}
        depthFeet={scenario.depthFeet}
      />

      <ResultMetaStrip
        address={savedAddress}
        imageSource={imageSource}
        referenceLabel={referenceLabel}
      />
    </main>
  );
}
