import { extent } from "d3-array";
import { ParsedReading, ReadingMeasure } from "./get_latest_readings";

export function get_ranges(
  readings: ParsedReading[],
  measure: ReadingMeasure
): { min: number; max: number } {
  const [min, max] = extent(readings, (d) => d[measure]);

  if (min === undefined) {
    throw new Error("Data appears malformed");
  }

  return { min, max };
}
