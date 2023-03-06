import { parse_timestamp } from "./parse_timestamp";

const timezone_options: Intl.DateTimeFormatOptions = {
  timeZone: "America/Detroit",
};

export const time_formatter = new Intl.DateTimeFormat("en-US", {
  ...timezone_options,
  timeStyle: "short",
});

export const date_formatter = new Intl.DateTimeFormat("en-US", {
  ...timezone_options,
  dateStyle: "short",
});

export function format_timestamp(timestamp: number): string {
  return time_formatter.format(parse_timestamp(timestamp));
}
