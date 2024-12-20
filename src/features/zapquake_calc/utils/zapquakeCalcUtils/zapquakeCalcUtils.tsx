import { GAME_DATA_TYPE, GameDataType, SPELL } from "data/game";
import {
  CALCULATOR_TYPE,
  DONATED_STR,
  getLevelPosGameDataStorageKey,
  getUseGameDataStorageKey,
} from "utils/calcLocalStorageKeyUtils";
import { VALUE_BOUNDARY } from "data/constants";
import { spellDataUtils } from "utils/GameData/spellDataUtils";
import { equipmentDataUtils } from "utils/GameData/equipmentDataUtils";
import { defenseDataUtils } from "utils/GameData/defenseDataUtils";
import {
  DEFAULT_LEVEL,
  MAX_DONATED_SPELL_COUNT,
  MIN_DONATED_SPELL_COUNT,
} from "features/zapquake_calc/config";

const calculatorType = CALCULATOR_TYPE.Zapquake;

export function getZapquakeCalcLevelPosGameDataStorageKey(
  gameDataID: string,
  gameDataType: GameDataType,
  isDonated = false
): string {
  return getLevelPosGameDataStorageKey(
    gameDataID,
    gameDataType,
    calculatorType,
    isDonated
  );
}

export function getZapquakeCalcUseOffenseStorageKey(
  gameDataID: string,
  gameDataType: GameDataType,
  isDonated = false
): string {
  return getUseGameDataStorageKey(
    gameDataID,
    gameDataType,
    calculatorType,
    isDonated
  );
}

export function getDonatedLightningSpellCountStorageKey(): string {
  return `${calculatorType}_${GAME_DATA_TYPE.Spell}_count_${SPELL.LightningSpell}_${DONATED_STR}`;
}

export function getHideEquipmentDestroyedDefenseStorageKey(): string {
  return `${calculatorType}_hide_equipment_destroyed_defense`;
}

export function getHideImpossibleDestroyDefenseStorageKey(): string {
  return `${calculatorType}_hide_impossible_destroy_defense`;
}

export function getHideNormalDefenseStorageKey(): string {
  return `${calculatorType}_hide_normal_defense`;
}

export function getEarthquakeOrderStorageKey(): string {
  return `${calculatorType}_earthquake_order`;
}

export function getSpellDefaultLevelPos(spellID: string): number {
  switch (DEFAULT_LEVEL) {
    case VALUE_BOUNDARY.MAX:
      const { getSpellMaxLevelPos } = spellDataUtils(spellID);

      return getSpellMaxLevelPos();
    case VALUE_BOUNDARY.MIN:
      const { getSpellMinLevelPos } = spellDataUtils(spellID);

      return getSpellMinLevelPos();
    default:
      throw new Error(
        `zapquakeCalcUtils.getSpellDefaultLevelPos ERROR: DEFAULT_LEVEL (${DEFAULT_LEVEL}) is not supported.`
      );
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
    default:
      throw new Error(
        `zapquakeCalcUtils.getEquipmentDefaultLevelPos ERROR: DEFAULT_LEVEL (${DEFAULT_LEVEL}) is not supported.`
      );
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
    default:
      throw new Error(
        `zapquakeCalcUtils.getDefenseDefaultLevelPos ERROR: DEFAULT_LEVEL (${DEFAULT_LEVEL}) is not supported.`
      );
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

export function isValidDonatedSpellCount(amount: number): boolean {
  return MIN_DONATED_SPELL_COUNT <= amount && amount <= MAX_DONATED_SPELL_COUNT;
}
