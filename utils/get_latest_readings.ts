import { sort } from "d3-array";
import { get_ranges } from "./get_ranges";
import { last_item } from "./last_item";
import { parse_time_stamp } from "./parse_time_stamp";

export type ParsedReading = {
  timestamp: number;
  co2: number;
  temp: number;
  humidity: number;
};

export type ReadingMeasure = keyof Omit<ParsedReading, "timestamp">;

export const measure_info: Record<
  ReadingMeasure,
  { unit: string; description: string }
> = {
  temp: {
    unit: "deg",
    description: "in degrees fahrenheit",
  },
  co2: {
    unit: "PPM",
    description: "concentration in parts per million",
  },
  humidity: {
    unit: "%",
    description: "relative humidity",
  },
};

export async function get_latest_readings(num_hours: number) {
  // Cache data but not for too long
  const res = await fetch(`http://100.108.62.129:8888/data/${num_hours}`, {
    next: { revalidate: 10 },
  });

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  const parsed_readings: ParsedReading[] = (await res.json()).map(
    parse_reading_line
  );

  const sorted_readings = sort(parsed_readings, (d) => d.timestamp);

  // new Date(timestamp * 1000);
  const earliest = parse_time_stamp(sorted_readings[0].timestamp);
  const latest = parse_time_stamp(last_item(sorted_readings).timestamp);
  const time_formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Detroit",
    timeStyle: "short",
    dateStyle: "short",
  });
  const times = {
    earliest: time_formatter.format(earliest),
    latest: time_formatter.format(latest),
    hrs_elapsed: (latest.valueOf() - earliest.valueOf()) / 1000 / 60 / 60,
  };

  return {
    readings: sorted_readings,
    num_obs: sorted_readings.length,
    temp: get_ranges(sorted_readings, "temp"),
    humidity: get_ranges(sorted_readings, "humidity"),
    co2: get_ranges(sorted_readings, "co2"),
    times,
  };
}

export function parse_reading_line(line: string): ParsedReading {
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
function C_to_F(deg_in_c: number) {
  return deg_in_c * (9 / 5) + 32;
}
