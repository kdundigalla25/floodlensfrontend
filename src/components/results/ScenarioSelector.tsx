import { CloudRainWind } from "lucide-react";
import { motion } from "framer-motion";
import type { FloodScenario } from "../../lib/floodPreview/scenarios";

type Props = {
  scenarios: FloodScenario[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export function ScenarioSelector({ scenarios, selectedId, onSelect }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="mb-6"
    >
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-cyan-100/80">
        <CloudRainWind className="h-4 w-4 text-cyan-300" />
        Run a storm scenario
      </div>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {scenarios.map((scenario) => {
          const active = scenario.id === selectedId;
          return (
            <button
              key={scenario.id}
              type="button"
              onClick={() => onSelect(scenario.id)}
              className="relative overflow-hidden rounded-2xl border border-white/10 px-4 py-3 text-left transition hover:border-cyan-300/40"
            >
              {active && (
                <motion.span
                  layoutId="scenario-active"
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  className="absolute inset-0 bg-linear-to-br from-cyan-300 to-blue-500"
                />
              )}

              <span className="relative block">
                <span
                  className={`text-[11px] font-semibold uppercase tracking-wide ${
                    active ? "text-slate-900/70" : "text-cyan-100/60"
                  }`}
                >
                  {scenario.category}
                </span>
                <span
                  className={`mt-0.5 block truncate font-display font-bold ${
                    active ? "text-slate-950" : "text-white"
                  }`}
                >
                  {scenario.name}
                </span>
                <span
                  className={`text-xs font-semibold ${
                    active ? "text-slate-900/70" : "text-slate-400"
                  }`}
                >
                  {scenario.depthFeet} ft at the door
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
