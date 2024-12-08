import { GameDataType } from "assets/data/game";
import {
  CALCULATOR_TYPE,
  getHideDestroyedDefenseStorageKey,
  getLevelPosGameDataStorageKey,
  getUseGameDataStorageKey,
} from "utils/calcLocalStorageKeyUtils";
import { DEFAULT_LEVEL } from "../assets/calcConfig";
import { VALUE_BOUNDARY } from "assets/data/config";
import {
  getDefenseMaxLevelPos,
  getDefenseMinLevelPos,
  getEquipmentMaxLevelPos,
  getEquipmentMinLevelPos,
  getHeroMaxLevelPos,
  getHeroMinLevelPos,
  getModifierMaxLevelPos,
  getModifierMinLevelPos,
  getRepairMaxLevelPos,
  getRepairMinLevelPos,
  getSpellMaxLevelPos,
  getSpellMinLevelPos,
  getTroopMaxLevelPos,
  getTroopMinLevelPos,
} from "utils/gameDataUtils";

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
      return getSpellMaxLevelPos(spellID);

    case VALUE_BOUNDARY.MIN:
      return getSpellMinLevelPos();
  }
}

export function getTroopDefaultLevelPos(troopID: string): number {
  switch (DEFAULT_LEVEL) {
    case VALUE_BOUNDARY.MAX:
      return getTroopMaxLevelPos(troopID);

    case VALUE_BOUNDARY.MIN:
      return getTroopMinLevelPos();
  }
}

export function getEquipmentDefaultLevelPos(equipmentID: string): number {
  switch (DEFAULT_LEVEL) {
    case VALUE_BOUNDARY.MAX:
      return getEquipmentMaxLevelPos(equipmentID);

    case VALUE_BOUNDARY.MIN:
      return getEquipmentMinLevelPos();
  }
}

export function getHeroDefaultLevelPos(heroID: string): number {
  switch (DEFAULT_LEVEL) {
    case VALUE_BOUNDARY.MAX:
      return getHeroMaxLevelPos(heroID);

    case VALUE_BOUNDARY.MIN:
      return getHeroMinLevelPos();
  }
}

export function getRepairDefaultLevelPos(repairID: string): number {
  switch (DEFAULT_LEVEL) {
    case VALUE_BOUNDARY.MAX:
      return getRepairMaxLevelPos(repairID);

    case VALUE_BOUNDARY.MIN:
      return getRepairMinLevelPos();
  }
}

export function getModifierDefaultLevelPos(modifierID: string): number {
  switch (DEFAULT_LEVEL) {
    case VALUE_BOUNDARY.MAX:
      return getModifierMaxLevelPos(modifierID);

    case VALUE_BOUNDARY.MIN:
      return getModifierMinLevelPos();
  }
}

export function getDefenseDefaultLevelPos(defenseID: string): number {
  switch (DEFAULT_LEVEL) {
    case VALUE_BOUNDARY.MAX:
      return getDefenseMaxLevelPos(defenseID);

    case VALUE_BOUNDARY.MIN:
      return getDefenseMinLevelPos();
  }
}
