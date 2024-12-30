import { GameDataType } from "data/Game";
import { ObjectValues } from "utils/objectUtils";

export const CALCULATOR_TYPE = {
  Zapquake: "zapquake_calc",
  Advance: "advance_calc",
} as const;

export type CalculatorType = ObjectValues<typeof CALCULATOR_TYPE>;

export const DONATED_STR = "donated";

export function getDonatedGameDataID(gameDataID: string): string {
  return `${gameDataID}_${DONATED_STR}`;
}

export function getLevelPosGameDataStorageKey(
  gameDataID: string,
  gameDataType: GameDataType,
  calculatorType: CalculatorType,
  isDonated = false
): string {
  return `${calculatorType}_${gameDataType}_level_pos_${
    isDonated ? getDonatedGameDataID(gameDataID) : `${gameDataID}`
  }`;
}

export function getUseGameDataStorageKey(
  gameDataID: string,
  gameDataType: GameDataType,
  calculatorType: CalculatorType,
  isDonated = false
): string {
  return `${calculatorType}_${gameDataType}_use_${
    isDonated ? getDonatedGameDataID(gameDataID) : `${gameDataID}`
  }`;
}
