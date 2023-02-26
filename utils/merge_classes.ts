export function merge_classes(
  ...classes: (string | string[] | null | undefined)[]
): string {
  return classes.filter((c) => c).join(" ");
}
