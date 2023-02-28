export function parse_timestamp(timestamp: number) {
  return new Date(timestamp * 1000);
}
