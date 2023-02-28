export function format_num(x: number, digits: number = 1) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: digits,
  }).format(x);
}
