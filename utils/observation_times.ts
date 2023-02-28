import { last_item } from "./last_item";
import { parse_timestamp } from "./parse_timestamp";
import { ParsedObservation } from "./parse_observations";
import { format_time } from "./format_time";

export function observation_times(observations: ParsedObservation[]) {
  const earliest = parse_timestamp(observations[0].timestamp);
  const latest = parse_timestamp(last_item(observations).timestamp);

  return {
    earliest: format_time(earliest, true),
    latest: format_time(latest, true),
    hrs_elapsed: (latest.valueOf() - earliest.valueOf()) / 1000 / 60 / 60,
  };
}
