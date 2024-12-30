import { GAME_DATA_TYPE, GameDataType, OFFENSE_TYPE } from "data/Game";
import {
  CALCULATOR_TYPE,
  getLevelPosGameDataStorageKey,
  getUseGameDataStorageKey,
} from "utils/calcLocalStorageKeyUtils";
import { VALUE_BOUNDARY } from "data/constants";
import { spellDataUtils } from "utils/GameData/spellDataUtils";
import { troopDataUtils } from "utils/GameData/troopDataUtils";
import { heroDataUtils } from "utils/GameData/heroDataUtils";
import { equipmentDataUtils } from "utils/GameData/equipmentDataUtils";
import { modifierDataUtils } from "utils/GameData/modifierDataUtils";
import { repairDataUtils } from "utils/GameData/repairDataUtils";
import { defenseDataUtils } from "utils/GameData/defenseDataUtils";
import { DEFAULT_LEVEL } from "features/AdvanceCalculator/config";

const calculatorType = CALCULATOR_TYPE.Advance;

export function getAdvanceCalcLevelPosGameDataStorageKey(
  gameDataID: string,
  gameDataType: GameDataType
): string {
  return getLevelPosGameDataStorageKey(
    gameDataID,
    gameDataType,
    calculatorType
  );
}

export function getAdvanceCalcUseGameDataStorageKey(
  gameDataID: string,
  gameDataType: GameDataType
): string {
  return getUseGameDataStorageKey(gameDataID, gameDataType, calculatorType);
}

export function getUseAbilityHeroStorageKey(heroID: string): string {
  return `${calculatorType}_${OFFENSE_TYPE.Hero}_use_ability_${heroID}`;
}

export function getHideDestroyedDefenseStorageKey(): string {
  return `${calculatorType}_hide_destroyed_defense`;
}

export function getHideSurvivedDefenseStorageKey(): string {
  return `${calculatorType}_hide_survived_defense`;
}

export function getUseHardModeStorageKey(): string {
  return `${calculatorType}_use_hard_mode`;
}

export function getUseTroopDeathDamageStorageKey(): string {
  return `${calculatorType}_use_troop_death_damage`;
}

export function getShowDetailActionListStorageKey(): string {
  return `${calculatorType}_show_detail_action_list`;
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
        `advanceCalcUtils.getSpellDefaultLevelPos ERROR: DEFAULT_LEVEL (${DEFAULT_LEVEL}) is not supported.`
      );
  }
}

export function getTroopDefaultLevelPos(troopID: string): number {
  switch (DEFAULT_LEVEL) {
    case VALUE_BOUNDARY.MAX:
      const { getTroopMaxLevelPos } = troopDataUtils(troopID);

      return getTroopMaxLevelPos();
    case VALUE_BOUNDARY.MIN:
      const { getTroopMinLevelPos } = troopDataUtils(troopID);

      return getTroopMinLevelPos();
    default:
      throw new Error(
        `advanceCalcUtils.getTroopDefaultLevelPos ERROR: DEFAULT_LEVEL (${DEFAULT_LEVEL}) is not supported.`
      );
  }
}

export function getHeroDefaultLevelPos(heroID: string): number {
  switch (DEFAULT_LEVEL) {
    case VALUE_BOUNDARY.MAX:
      const { getHeroMaxLevelPos } = heroDataUtils(heroID);

      return getHeroMaxLevelPos();
    case VALUE_BOUNDARY.MIN:
      const { getHeroMinLevelPos } = heroDataUtils(heroID);

      return getHeroMinLevelPos();
    default:
      throw new Error(
        `advanceCalcUtils.getHeroDefaultLevelPos ERROR: DEFAULT_LEVEL (${DEFAULT_LEVEL}) is not supported.`
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
        `advanceCalcUtils.getEquipmentDefaultLevelPos ERROR: DEFAULT_LEVEL (${DEFAULT_LEVEL}) is not supported.`
      );
  }
}

export function getModifierDefaultLevelPos(modifierID: string): number {
  switch (DEFAULT_LEVEL) {
    case VALUE_BOUNDARY.MAX:
      const { getModifierMaxLevelPos } = modifierDataUtils(modifierID);

      return getModifierMaxLevelPos();
    case VALUE_BOUNDARY.MIN:
      const { getModifierMinLevelPos } = modifierDataUtils(modifierID);

      return getModifierMinLevelPos();
    default:
      throw new Error(
        `advanceCalcUtils.getModifierDefaultLevelPos ERROR: DEFAULT_LEVEL (${DEFAULT_LEVEL}) is not supported.`
      );
  }
}

export function getRepairDefaultLevelPos(repairID: string): number {
  switch (DEFAULT_LEVEL) {
    case VALUE_BOUNDARY.MAX:
      const { getRepairMaxLevelPos } = repairDataUtils(repairID);

      return getRepairMaxLevelPos();
    case VALUE_BOUNDARY.MIN:
      const { getRepairMinLevelPos } = repairDataUtils(repairID);

      return getRepairMinLevelPos();
    default:
      throw new Error(
        `advanceCalcUtils.getRepairDefaultLevelPos ERROR: DEFAULT_LEVEL (${DEFAULT_LEVEL}) is not supported.`
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
        `advanceCalcUtils.getDefenseDefaultLevelPos ERROR: DEFAULT_LEVEL (${DEFAULT_LEVEL}) is not supported.`
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
    case GAME_DATA_TYPE.Troop:
      return getTroopDefaultLevelPos(gameDataID);
    case GAME_DATA_TYPE.Hero:
      return getHeroDefaultLevelPos(gameDataID);
    case GAME_DATA_TYPE.Equipment:
      return getEquipmentDefaultLevelPos(gameDataID);
    case GAME_DATA_TYPE.Modifier:
      return getModifierDefaultLevelPos(gameDataID);
    case GAME_DATA_TYPE.Repair:
      return getRepairDefaultLevelPos(gameDataID);
    case GAME_DATA_TYPE.Defense:
      return getDefenseDefaultLevelPos(gameDataID);
    default:
      throw new Error(
        `advanceCalcUtils.getGameDataDefaultLevelPos ERROR: GameData Type (${type}) is not supported.`
      );
  }
}
