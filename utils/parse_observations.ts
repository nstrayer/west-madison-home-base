import { C_to_F } from "./C_to_F";
import { get_data } from "./get_data";

export type ParsedObservation = {
  timestamp: number;
  co2: number;
  temp: number;
  humidity: number;
};

export type ObservationMeasure = keyof Omit<ParsedObservation, "timestamp">;

export function parse_observations(
  raw_readings: Awaited<ReturnType<typeof get_data>>
) {
  return raw_readings
    .map(raw_line_to_parsed_observation)
    .sort((obs_a, obs_b) => obs_a.timestamp - obs_b.timestamp);
}

function raw_line_to_parsed_observation(line: string): ParsedObservation {
  const [timestamp, co2, temp_in_c, humidity] = line.split(",").map(Number);

  if (!(timestamp && co2 && temp_in_c && humidity)) {
    console.error("Can't parse line of data", line);
    throw new Error("Can't parse line of data");
  }

  return {
    timestamp,
    co2: co2,
    temp: C_to_F(Number(temp_in_c)),
    humidity: humidity,
  };
}
