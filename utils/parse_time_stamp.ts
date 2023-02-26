import { timeFormat } from "d3-time-format";

export function parse_time_stamp(timestamp: number) {
  return new Date(timestamp * 1000);
}

export function format_time(d: Date, with_day: boolean = false) {
  if (with_day) {
    return timeFormat("%a %b %e @ %I:%M %p")(d);
  }
  return timeFormat("%I:%M %p")(d);
}
