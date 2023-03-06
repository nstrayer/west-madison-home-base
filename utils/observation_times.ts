import { last_item } from "./last_item";
import { parse_timestamp } from "./parse_timestamp";
import { ParsedObservation } from "./parse_observations";
import { date_formatter, time_formatter } from "./format_time";

export function observation_times(observations: ParsedObservation[]) {
  const earliest = parse_timestamp(observations[0].timestamp);
  const latest = parse_timestamp(last_item(observations).timestamp);

  return {
    earliest: {
      time: time_formatter.format(earliest),
      date: date_formatter.format(earliest),
    },
    latest: {
      time: time_formatter.format(latest),
      date: date_formatter.format(latest),
    },
    hrs_elapsed: (latest.valueOf() - earliest.valueOf()) / 1000 / 60 / 60,
  };
}
