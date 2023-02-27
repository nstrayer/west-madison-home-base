export function parse_time_stamp(timestamp: number) {
  return new Date(timestamp * 1000);
}
