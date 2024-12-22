import {
  DefenseData,
  EquipmentData,
  EquipmentType,
  GAME_DATA_TYPE,
  GameDataType,
  Hero,
  HeroData,
  ModifierData,
  RepairData,
  SpellData,
  TroopData,
} from "data/game";
import { getAllObjectKeys } from "utils/objectUtils";
import { spellDataUtils } from "../spellDataUtils";
import { troopDataUtils } from "../troopDataUtils";
import { heroDataUtils } from "../heroDataUtils";
import { equipmentDataUtils } from "../equipmentDataUtils";
import { modifierDataUtils } from "../modifierDataUtils";
import { repairDataUtils } from "../repairDataUtils";
import { defenseDataUtils } from "../defenseDataUtils";

export function getAllHeroIDs(): string[] {
  return getAllObjectKeys(HeroData);
}

export function getAllEquipmentIDs(
  equipmentTypeFilterList?: Set<EquipmentType>,
  user?: Hero
): string[] {
  const equipmentIDList = getAllObjectKeys(EquipmentData);

  return equipmentIDList.filter((equipmentID) => {
    const { getEquipmentType, getEquipmentUser } =
      equipmentDataUtils(equipmentID);
    const equipmentTypeList = getEquipmentType();

    const matchesType =
      !equipmentTypeFilterList ||
      [...equipmentTypeFilterList].every((type) =>
        equipmentTypeList.includes(type)
      );

    const matchesUser = !user || user === getEquipmentUser();

    return matchesType && matchesUser;
  });
}

export function getAllSpellIDs(): string[] {
  return getAllObjectKeys(SpellData);
}

export function getAllTroopIDs(): string[] {
  return getAllObjectKeys(TroopData);
}

export function getAllDefenseIDs(): string[] {
  return getAllObjectKeys(DefenseData);
}

export function getAllRepairIDs(): string[] {
  return getAllObjectKeys(RepairData);
}

export function getAllModifierIDs(): string[] {
  return getAllObjectKeys(ModifierData);
}

export function getAllOffenseIDs(): string[] {
  return [
    ...getAllHeroIDs(),
    ...getAllEquipmentIDs(),
    ...getAllSpellIDs(),
    ...getAllTroopIDs(),
  ];
}

export function getGameDataMaxLevelPos(
  gameDataID: string,
  type: GameDataType
): number {
  switch (type) {
    case GAME_DATA_TYPE.Spell:
      const { getSpellMaxLevelPos } = spellDataUtils(gameDataID);

      return getSpellMaxLevelPos();
    case GAME_DATA_TYPE.Troop:
      const { getTroopMaxLevelPos } = troopDataUtils(gameDataID);

      return getTroopMaxLevelPos();
    case GAME_DATA_TYPE.Hero:
      const { getHeroMaxLevelPos } = heroDataUtils(gameDataID);

      return getHeroMaxLevelPos();
    case GAME_DATA_TYPE.Equipment:
      const { getEquipmentMaxLevelPos } = equipmentDataUtils(gameDataID);

      return getEquipmentMaxLevelPos();
    case GAME_DATA_TYPE.Modifier:
      const { getModifierMaxLevelPos } = modifierDataUtils(gameDataID);

      return getModifierMaxLevelPos();
    case GAME_DATA_TYPE.Repair:
      const { getRepairMaxLevelPos } = repairDataUtils(gameDataID);

      return getRepairMaxLevelPos();
    case GAME_DATA_TYPE.Defense:
      const { getDefenseMaxLevelPos } = defenseDataUtils(gameDataID);

      return getDefenseMaxLevelPos();
    default:
      throw new Error(
        `gameDataUtils.getGameDataMaxLevelPos ERROR: GameData Type (${type}) is not supported in this function.`
      );
  }
}

export function getGameDataMinLevelPos(
  gameDataID: string,
  type: GameDataType
): number {
  switch (type) {
    case GAME_DATA_TYPE.Spell:
      const { getSpellMinLevelPos } = spellDataUtils(gameDataID);

      return getSpellMinLevelPos();
    case GAME_DATA_TYPE.Troop:
      const { getTroopMinLevelPos } = troopDataUtils(gameDataID);

      return getTroopMinLevelPos();
    case GAME_DATA_TYPE.Hero:
      const { getHeroMinLevelPos } = heroDataUtils(gameDataID);

      return getHeroMinLevelPos();
    case GAME_DATA_TYPE.Equipment:
      const { getEquipmentMinLevelPos } = equipmentDataUtils(gameDataID);

      return getEquipmentMinLevelPos();
    case GAME_DATA_TYPE.Modifier:
      const { getModifierMinLevelPos } = modifierDataUtils(gameDataID);

      return getModifierMinLevelPos();
    case GAME_DATA_TYPE.Repair:
      const { getRepairMinLevelPos } = repairDataUtils(gameDataID);

      return getRepairMinLevelPos();
    case GAME_DATA_TYPE.Defense:
      const { getDefenseMinLevelPos } = defenseDataUtils(gameDataID);

      return getDefenseMinLevelPos();
    default:
      throw new Error(
        `gameDataUtils.getGameDataMinLevelPos ERROR: GameData Type (${type}) is not supported in this function.`
      );
  }
}

export function isValidSpellLevelPos(
  gameDataID: string,
  levelPos: number
): boolean {
  const { isValidSpellLevelPos } = spellDataUtils(gameDataID);
  return isValidSpellLevelPos(levelPos);
}

export function isValidTroopLevelPos(
  gameDataID: string,
  levelPos: number
): boolean {
  const { isValidTroopLevelPos } = troopDataUtils(gameDataID);
  return isValidTroopLevelPos(levelPos);
}

export function isValidEquipmentLevelPos(
  gameDataID: string,
  levelPos: number
): boolean {
  const { isValidEquipmentLevelPos } = equipmentDataUtils(gameDataID);
  return isValidEquipmentLevelPos(levelPos);
}

export function isValidHeroLevelPos(
  gameDataID: string,
  levelPos: number
): boolean {
  const { isValidHeroLevelPos } = heroDataUtils(gameDataID);
  return isValidHeroLevelPos(levelPos);
}

export function isValidModifierLevelPos(
  gameDataID: string,
  levelPos: number
): boolean {
  const { isValidModifierLevelPos } = modifierDataUtils(gameDataID);
  return isValidModifierLevelPos(levelPos);
}

export function isValidRepairLevelPos(
  gameDataID: string,
  levelPos: number
): boolean {
  const { isValidRepairLevelPos } = repairDataUtils(gameDataID);
  return isValidRepairLevelPos(levelPos);
}

export function isValidDefenseLevelPos(
  gameDataID: string,
  levelPos: number
): boolean {
  const { isValidDefenseLevelPos } = defenseDataUtils(gameDataID);
  return isValidDefenseLevelPos(levelPos);
}

export function isValidGameDataLevelPos(
  levelPos: number,
  gameDataID: string,
  type: GameDataType
): boolean {
  switch (type) {
    case GAME_DATA_TYPE.Spell:
      return isValidSpellLevelPos(gameDataID, levelPos);
    case GAME_DATA_TYPE.Troop:
      return isValidTroopLevelPos(gameDataID, levelPos);
    case GAME_DATA_TYPE.Equipment:
      return isValidEquipmentLevelPos(gameDataID, levelPos);
    case GAME_DATA_TYPE.Hero:
      return isValidHeroLevelPos(gameDataID, levelPos);
    case GAME_DATA_TYPE.Modifier:
      return isValidModifierLevelPos(gameDataID, levelPos);
    case GAME_DATA_TYPE.Repair:
      return isValidRepairLevelPos(gameDataID, levelPos);
    case GAME_DATA_TYPE.Defense:
      return isValidDefenseLevelPos(gameDataID, levelPos);
    default:
      throw new Error(
        `gameDataUtils.isValidGameDataLevelPos ERROR: GameData Type (${type}) is not supported in this function.`
      );
  }
}
