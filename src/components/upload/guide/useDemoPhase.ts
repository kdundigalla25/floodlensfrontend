import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Steps a looping demo through its phases. Phase 0 is always the *correct*
 * state, so visitors who prefer reduced motion rest on the right answer
 * instead of on whichever mistake the loop happened to freeze on.
 */
export function useDemoPhase(count: number, intervalMs: number) {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;

    const id = setInterval(
      () => setPhase((current) => (current + 1) % count),
      intervalMs,
    );
    return () => clearInterval(id);
  }, [count, intervalMs, reducedMotion]);

  return reducedMotion ? 0 : phase;
}
