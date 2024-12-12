import { GAME_DATA_TYPE, GameDataType } from "data/game";
import {
  CALCULATOR_TYPE,
  getHideDestroyedDefenseStorageKey,
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
import { DEFAULT_LEVEL } from "../config/config";

export function getAdvanceCalcLevelPosGameDataStorageKey(
  gameDataID: string,
  gameDataType: GameDataType,
  isDonated = false
): string {
  return getLevelPosGameDataStorageKey(
    gameDataID,
    gameDataType,
    CALCULATOR_TYPE.Advance,
    isDonated
  );
}

export function getAdvanceCalcUseGameDataStorageKey(
  gameDataID: string,
  gameDataType: GameDataType,
  isDonated = false
): string {
  return getUseGameDataStorageKey(
    gameDataID,
    gameDataType,
    CALCULATOR_TYPE.Advance,
    isDonated
  );
}

export function getAdvanceCalcHideDestroyedDefenseStorageKey(): string {
  return getHideDestroyedDefenseStorageKey(CALCULATOR_TYPE.Advance);
}

export function getHideSurvivedDefenseStorageKey(): string {
  return `${CALCULATOR_TYPE.Advance}_hide_survived_defense`;
}

export function getUseHardModeStorageKey(): string {
  return `${CALCULATOR_TYPE.Advance}_use_hard_mode`;
}

export function getUseTroopDeathDamageStorageKey(): string {
  return `${CALCULATOR_TYPE.Advance}_use_troop_death_damage`;
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

export function getTroopDefaultLevelPos(troopID: string): number {
  switch (DEFAULT_LEVEL) {
    case VALUE_BOUNDARY.MAX:
      const { getTroopMaxLevelPos } = troopDataUtils(troopID);

      return getTroopMaxLevelPos();
    case VALUE_BOUNDARY.MIN:
      const { getTroopMinLevelPos } = troopDataUtils(troopID);

      return getTroopMinLevelPos();
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

export function getModifierDefaultLevelPos(modifierID: string): number {
  switch (DEFAULT_LEVEL) {
    case VALUE_BOUNDARY.MAX:
      const { getModifierMaxLevelPos } = modifierDataUtils(modifierID);

      return getModifierMaxLevelPos();
    case VALUE_BOUNDARY.MIN:
      const { getModifierMinLevelPos } = modifierDataUtils(modifierID);

      return getModifierMinLevelPos();
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
