export class MappingContractError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MappingContractError";
  }
}

export function isMappingContractError(
  error: unknown,
): error is MappingContractError {
  return error instanceof Error && error.name === "MappingContractError";
}

export function assertMapped<T>(value: T | undefined, message: string): T {
  if (value === undefined) {
    throw new MappingContractError(message);
  }
  return value;
}

export function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

export function assertDefined<T>(value: T | undefined, message: string): T {
  if (!isDefined(value)) {
    throw new Error(message);
  }

  return value;
}
