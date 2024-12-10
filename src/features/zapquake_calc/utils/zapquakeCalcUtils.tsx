import { GAME_DATA_TYPE, GameDataType } from "assets/data/game";
import {
  CALCULATOR_TYPE,
  getHideDestroyedDefenseStorageKey,
  getLevelPosGameDataStorageKey,
  getUseGameDataStorageKey,
} from "utils/calcLocalStorageKeyUtils";
import { DEFAULT_LEVEL } from "../assets/calcConfig";
import { VALUE_BOUNDARY } from "assets/data/config";
import { spellDataUtils } from "utils/GameData/spellDataUtils";
import { equipmentDataUtils } from "utils/GameData/equipmentDataUtils";
import { defenseDataUtils } from "utils/GameData/defenseDataUtils";

export function getZapquakeCalcLevelPosGameDataStorageKey(
  gameDataID: string,
  gameDataType: GameDataType,
  isDonated = false
): string {
  return getLevelPosGameDataStorageKey(
    gameDataID,
    gameDataType,
    CALCULATOR_TYPE.Zapquake,
    isDonated
  );
}

export function getZapquakeCalcUseGameDataStorageKey(
  gameDataID: string,
  gameDataType: GameDataType,
  isDonated = false
): string {
  return getUseGameDataStorageKey(
    gameDataID,
    gameDataType,
    CALCULATOR_TYPE.Zapquake,
    isDonated
  );
}

export function getZapquakeCalcHideDestroyedDefenseStorageKey(): string {
  return getHideDestroyedDefenseStorageKey(CALCULATOR_TYPE.Zapquake);
}

export function getHideEquipmentDestroyedDefenseStorageKey(): string {
  return `${CALCULATOR_TYPE.Zapquake}_hide_equipment_destroyed_defense`;
}

export function getHideImpossibleDestroyDefenseStorageKey(): string {
  return `${CALCULATOR_TYPE.Zapquake}_hide_impossible_destroy_defense`;
}

export function getEarthquakeOrderStorageKey(): string {
  return `${CALCULATOR_TYPE.Zapquake}_earthquake_order`;
}

export function getSpellDefaultLevelPos(spellID: string): number {
  switch (DEFAULT_LEVEL) {
    case VALUE_BOUNDARY.MAX:
      const { getSpellMaxLevelPos } = spellDataUtils(spellID);

      return getSpellMaxLevelPos();
    case VALUE_BOUNDARY.MIN:
      const { getSpellMinLevelPos } = spellDataUtils(spellID);

      return getSpellMinLevelPos();
  }
}

export function getEquipmentDefaultLevelPos(equipmentID: string): number {
  switch (DEFAULT_LEVEL) {
    case VALUE_BOUNDARY.MAX:
      const { getEquipmentMaxLevelPos } = equipmentDataUtils(equipmentID);

      return getEquipmentMaxLevelPos();
    case VALUE_BOUNDARY.MIN:
      const { getEquipmentMinLevelPos } = equipmentDataUtils(equipmentID);

      return getEquipmentMinLevelPos();
  }
}

export function getDefenseDefaultLevelPos(defenseID: string): number {
  switch (DEFAULT_LEVEL) {
    case VALUE_BOUNDARY.MAX:
      const { getDefenseMaxLevelPos } = defenseDataUtils(defenseID);

      return getDefenseMaxLevelPos();
    case VALUE_BOUNDARY.MIN:
      const { getDefenseMinLevelPos } = defenseDataUtils(defenseID);

      return getDefenseMinLevelPos();
  }
}

export function getGameDataDefaultLevelPos(
  gameDataID: string,
  type: GameDataType
): number {
  switch (type) {
    case GAME_DATA_TYPE.Spell:
      return getSpellDefaultLevelPos(gameDataID);
    case GAME_DATA_TYPE.Equipment:
      return getEquipmentDefaultLevelPos(gameDataID);
    case GAME_DATA_TYPE.Defense:
      return getDefenseDefaultLevelPos(gameDataID);
    default:
      throw new Error(
        `zapquakeCalcUtils.getGameDataDefaultLevelPos ERROR: GameData Type (${type}) is not supported.`
      );
  }
}
