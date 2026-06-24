export function sortRecordByNumericKey<T>(
  record: Record<number, T>,
): Record<number, T> {
  return Object.fromEntries(
    Object.entries(record).sort(([a], [b]) => Number(a) - Number(b)),
  ) as Record<number, T>;
}
