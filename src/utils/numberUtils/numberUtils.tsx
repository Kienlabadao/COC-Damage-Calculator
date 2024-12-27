import { ROUNDING_PRECISION } from "config";

export function roundToN(number: number, decimalPlaces: number): number {
  return parseFloat(number.toFixed(decimalPlaces));
}

export function multiplyAndRound(
  a: number,
  b: number,
  decimalPlaces?: number
): number {
  const result = a * b;
  return decimalPlaces !== undefined ? roundToN(result, decimalPlaces) : result;
}

export function divideAndRound(
  a: number,
  b: number,
  decimalPlaces?: number
): number {
  if (b === 0) {
    throw new Error("Division by zero is not allowed.");
  }
  const result = a / b;
  return decimalPlaces !== undefined ? roundToN(result, decimalPlaces) : result;
}

/**
 * Scales a value proportionally by a percentage increase (linear scaling).
 * @param baseValue - The original value to scale.
 * @param increaseFactor - The percentage increase as a decimal (e.g., 0.25 for 25%).
 * @returns The new scaled value.
 */
export function scaleAndRoundValue(
  baseValue: number,
  increaseFactor: number,
  decimalPlaces?: number
): number {
  const result = baseValue * (1 + increaseFactor);
  return decimalPlaces !== undefined ? roundToN(result, decimalPlaces) : result;
}

/**
 * Applies inverse scaling to a value based on a percentage increase.
 * Useful for cases where increasing a factor reduces the value (e.g., attack interval).
 * @param baseValue - The original value to scale.
 * @param increaseFactor - The percentage increase as a decimal (e.g., 0.16 for 16%).
 * @returns The new scaled value.
 */
export function inverseScaleAndRoundValue(
  baseValue: number,
  increaseFactor: number,
  decimalPlaces?: number
): number {
  const result = baseValue / (1 + increaseFactor);
  return decimalPlaces !== undefined ? roundToN(result, decimalPlaces) : result;
}

/**
 * Calculates a value based on a percentage of a given amount.
 * @param baseValue - The original value (e.g., target HP, base damage, etc.).
 * @param percentage - The percentage as a decimal (e.g., 0.25 for 25%).
 * @returns The calculated value based on the percentage.
 */
export function calculatePercentage(
  baseValue: number,
  percentage: number,
  decimalPlaces?: number
): number {
  const result = baseValue * percentage;
  return decimalPlaces !== undefined ? roundToN(result, decimalPlaces) : result;
}

export function calculateCombinedPercentageIncrease(
  a: number,
  b: number
): number {
  // Convert percentage increases to decimal multipliers
  const multiplierA = 1 + percentageToDecimal(a);
  const multiplierB = 1 + percentageToDecimal(b);

  // Apply both percentage increases sequentially
  const finalMultiplier = multiplierA * multiplierB;

  // Calculate total percentage increase
  const totalIncrease = decimalToPercentage(
    finalMultiplier - 1,
    ROUNDING_PRECISION
  );

  return totalIncrease;
}

/**
 * Converts a percentage number to its decimal equivalent.
 * Optionally rounds the result to a specified number of decimal places.
 * @param percentage - The percentage number to convert.
 * @param decimals - Optional number of decimal places to round to.
 * @returns The decimal equivalent of the percentage.
 */
export function percentageToDecimal(
  percentage: number,
  decimalPlaces?: number
): number {
  const result = percentage / 100;
  return decimalPlaces !== undefined ? roundToN(result, decimalPlaces) : result;
}

export function decimalToPercentage(
  decimal: number,
  decimalPlaces?: number
): number {
  const result = decimal * 100;
  return decimalPlaces !== undefined ? roundToN(result, decimalPlaces) : result;
}

export function clampNumber(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function formatNumber(
  num: number,
  minDecimals: number,
  maxDecimals: number
): string {
  const parts = num.toString().split(".");

  if (parts.length === 1) {
    // No decimal part, return as is (apply minDecimals if needed)
    return minDecimals > 0 ? `${num.toFixed(minDecimals)}` : `${num}`;
  }

  const integerPart = parts[0];
  let decimalPart = parts[1].slice(0, maxDecimals); // Truncate to maxDecimals

  // Ensure minimum decimals by padding with zeros if necessary
  while (decimalPart.length < minDecimals) {
    decimalPart += "0";
  }

  return `${integerPart}.${decimalPart}`;
}
