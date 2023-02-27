export function format_time(d: Date, with_day: boolean = false) {
  return time_formatter.format(d);
}
const time_formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Detroit",
  timeStyle: "short",
});
