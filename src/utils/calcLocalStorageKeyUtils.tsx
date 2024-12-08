import { GameDataType } from "assets/data/game";
import { ObjectValues } from "./objectUtils";

export const CALCULATOR_TYPE = {
  Zapquake: "zapquake_calc",
  Advance: "advance_calc",
} as const;

export type CalculatorType = ObjectValues<typeof CALCULATOR_TYPE>;

const DONATED_STR = "donated";

export function getLevelPosGameDataStorageKey(
  gameDataID: string,
  gameDataType: GameDataType,
  calculatorType: CalculatorType,
  isDonated = false
): string {
  return `${calculatorType}_${gameDataType}_level_pos_${gameDataID}${
    isDonated ? `_${DONATED_STR}` : ""
  }`;
}

export function getUseGameDataStorageKey(
  gameDataID: string,
  gameDataType: GameDataType,
  calculatorType: CalculatorType,
  isDonated = false
): string {
  return `${calculatorType}_${gameDataType}_use_${gameDataID}${
    isDonated ? `_${DONATED_STR}` : ""
  }`;
}

export function getHideDestroyedDefenseStorageKey(
  calculatorType: CalculatorType
): string {
  return `${calculatorType}_hide_destroyed_defense`;
}
