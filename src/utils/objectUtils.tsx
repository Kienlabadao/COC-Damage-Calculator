export type ObjectValues<T> = T[keyof T];

export function getAllObjectKeys<T>(data: Record<string, T>): string[] {
  return Object.keys(data);
}

export function getArrayFirstElement<T>(arr: T[]): T {
  if (arr.length === 0) {
    throw new Error(
      "getArrayFirstElement ERROR: The array is empty. Cannot get the first element."
    );
  }
  return arr[0];
}

export function getArrayLastElement<T>(arr: T[]): T {
  if (arr.length === 0) {
    throw new Error(
      "getArrayLastElement ERROR: The array is empty. Cannot get the last element."
    );
  }
  return arr[arr.length - 1];
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
