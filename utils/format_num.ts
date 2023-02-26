import { format } from "d3-format";

export function format_num(x: number, digits: number = 1) {
  return format(`,.${digits}~f`)(x);
}
