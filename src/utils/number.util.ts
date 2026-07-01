export function isPresentPositiveNumber(value: number | undefined): boolean {
  return value !== undefined && Number.isFinite(value) && value > 0;
}
