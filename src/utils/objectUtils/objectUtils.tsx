export type ObjectValues<T> = T[keyof T];

export function getAllObjectKeys<T>(data: Record<string, T>): string[] {
  return Object.keys(data);
}

export function getArrayFirstElement<T>(arr: T[]): T {
  if (arr.length === 0) {
    throw new Error(
      "objectUtils.getArrayFirstElement ERROR: The array is empty. Cannot get the first element."
    );
  } else {
    return arr[0];
  }
}

export function getArrayLastElement<T>(arr: T[]): T {
  if (arr.length === 0) {
    throw new Error(
      "objectUtils.getArrayLastElement ERROR: The array is empty. Cannot get the last element."
    );
  } else {
    return arr[arr.length - 1];
  }
}

export function removeArrayElement<T>(array: T[], index: number): T[] {
  if (index < 0 || index >= array.length) {
    throw new Error("Index out of bounds");
  }

  return [...array.slice(0, index), ...array.slice(index + 1)];
}

export function isString(input: unknown): input is string {
  return typeof input === "string";
}

export function isNumber(input: unknown): input is number {
  return typeof input === "number";
}

export function isBoolean(input: unknown): input is boolean {
  return typeof input === "boolean";
}

export function duplicateItem<T>(item: T, count: number): T[] {
  if (count > 0) {
    return Array(count).fill(item);
  } else {
    throw new Error(
      `objectUtils.zapquakeCalcUtils.addMultipleOffenseItem ERROR: count (${count}) must be larger than 0.`
    );
  }
}
