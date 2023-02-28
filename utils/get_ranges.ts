import { ParsedObservation, ObservationMeasure } from "./parse_observations";

export function get_ranges(
  readings: ParsedObservation[],
  measure: ObservationMeasure
): Record<
  "min" | "max",
  { val: number; timestamp: ParsedObservation["timestamp"] }
> {
  let min = { val: Infinity, timestamp: 0 };
  let max = { val: -Infinity, timestamp: 0 };

  for (const obs of readings) {
    const val = obs[measure];
    const timestamp = obs.timestamp;

    if (val < min.val) {
      min = { val, timestamp };
    }
    if (val > max.val) {
      max = { val, timestamp };
    }
  }

  if (min === undefined) {
    throw new Error("Data appears malformed");
  }

  return { min, max };
}
