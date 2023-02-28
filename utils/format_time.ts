import { parse_timestamp } from "./parse_timestamp";

export function format_time(d: Date, with_day: boolean = false) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Detroit",
    timeStyle: "short",
    dateStyle: with_day ? "short" : undefined,
  }).format(d);
}

export function format_timestamp(timestamp: number): string {
  return format_time(parse_timestamp(timestamp));
}
