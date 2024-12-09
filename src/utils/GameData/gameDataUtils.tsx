import {
  DefenseData,
  DefenseStats,
  EquipmentData,
  EquipmentType,
  GAME_DATA_TYPE,
  GameDataType,
  HeroData,
  HeroStats,
  ModifierData,
  ModifierStats,
  RepairData,
  RepairStats,
  SpellData,
  TroopData,
  TroopStats,
} from "assets/data/game";
import { getAllObjectKeys } from "../objectUtils";
import { spellDataUtils } from "./spellDataUtils";
import { equipmentDataUtils } from "./equipmentDataUtils";

export const OFFENSE_IMG_PATH = "/images/offense/";
const MODIFIER_IMG_PATH = "/images/modifier/";
const REPAIR_IMG_PATH = "/images/repairs/";
const DEFENSE_IMG_PATH = "/images/defense/";

export function getAllHeroIDs(): string[] {
  return getAllObjectKeys(HeroData);
}

export function getAllEquipmentIDs(
  equipmentTypeSearchList?: Set<EquipmentType>
): string[] {
  const equipmentIDList = getAllObjectKeys(EquipmentData);

  if (equipmentTypeSearchList) {
    return equipmentIDList.filter((id) => {
      const equipmentTypeArray = EquipmentData[id].equipment_type;

      return [...equipmentTypeSearchList].every((item) =>
        equipmentTypeArray.includes(item)
      );
    });
  } else {
    return equipmentIDList;
  }
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

export function getTroop(troopID: string): TroopStats {
  const troop = TroopData[troopID];

  if (troop != null) {
    return troop;
  } else {
    throw new Error(`getTroop ERROR: Troop with ID "${troopID}" not found.`);
  }
}

export function getHero(heroID: string): HeroStats {
  const hero = HeroData[heroID];

  if (hero != null) {
    return hero;
  } else {
    throw new Error(`getHero ERROR: Hero with ID "${heroID}" not found.`);
  }
}

export function getModifier(modifierID: string): ModifierStats {
  const modifier = ModifierData[modifierID];

  if (modifier != null) {
    return modifier;
  } else {
    throw new Error(
      `getModifier ERROR: Modifier with ID "${modifierID}" not found.`
    );
  }
}

export function getRepair(repairID: string): RepairStats {
  const repair = RepairData[repairID];

  if (repair != null) {
    return repair;
  } else {
    throw new Error(`getRepair ERROR: Repair with ID "${repairID}" not found.`);
  }
}

export function getDefense(defenseID: string): DefenseStats {
  const defense = DefenseData[defenseID];

  if (defense != null) {
    return defense;
  } else {
    throw new Error(
      `getDefense ERROR: Defense with ID "${defenseID}" not found.`
    );
  }
}

export function getTroopImage(troopID: string, level: number): string {
  return `${OFFENSE_IMG_PATH}/troops/${troopID}/${level}.webp`;
}

export function getHeroImage(heroID: string): string {
  return `${OFFENSE_IMG_PATH}/heroes/${heroID}/${heroID}.webp`;
}

export function getModifierImage(modifierID: string): string {
  return `${MODIFIER_IMG_PATH}/modifier/${modifierID}.webp`;
}

export function getDefenseImage(defenseID: string, level: number): string {
  return `${DEFENSE_IMG_PATH}/defense/${defenseID}/${level}.webp`;
}

export function getRepairImage(repairID: string, level: number): string {
  return `${REPAIR_IMG_PATH}/repair/${repairID}/${level}.webp`;
}

export function getTroopLevelCount(troopID: string): number {
  const troop = getTroop(troopID);
  return troop.damage.length === 0
    ? troop.death_damage.length
    : troop.damage.length;
}

export function getHeroLevelCount(heroID: string): number {
  const hero = getHero(heroID);

  return hero.dps.length;
}

export function getRepairLevelCount(repairID: string): number {
  const repair = getRepair(repairID);

  return repair.repair.length;
}

export function getModifierLevelCount(modifierID: string): number {
  const modifier = getModifier(modifierID);

  return modifier.modify.length;
}

export function getDefenseLevelCount(defenseID: string): number {
  const defense = getDefense(defenseID);

  return defense.hp.length;
}

export function getTroopMaxLevelPos(troopID: string): number {
  return getTroopLevelCount(troopID) - 1;
}

export function getHeroMaxLevelPos(heroID: string): number {
  return getHeroLevelCount(heroID) - 1;
}

export function getRepairMaxLevelPos(repairID: string): number {
  return getRepairLevelCount(repairID) - 1;
}

export function getModifierMaxLevelPos(modifierID: string): number {
  return getModifierLevelCount(modifierID) - 1;
}

export function getDefenseMaxLevelPos(defenseID: string): number {
  return getDefenseLevelCount(defenseID) - 1;
}

export function getTroopMinLevelPos(): number {
  return 0;
}

export function getHeroMinLevelPos(): number {
  return 0;
}

export function getRepairMinLevelPos(): number {
  return 0;
}

export function getModifierMinLevelPos(): number {
  return 0;
}

export function getDefenseMinLevelPos(): number {
  return 0;
}

export function isValidTroopLevelPos(
  troopID: string,
  levelPos: number
): boolean {
  const maxLevelPos = getTroopMaxLevelPos(troopID);
  const minLevelPos = getTroopMinLevelPos();

  return minLevelPos <= levelPos && levelPos <= maxLevelPos;
}

export function isValidHeroLevelPos(heroID: string, levelPos: number): boolean {
  const maxLevelPos = getHeroMaxLevelPos(heroID);
  const minLevelPos = getHeroMinLevelPos();

  return minLevelPos <= levelPos && levelPos <= maxLevelPos;
}

export function isValidModifierLevelPos(
  modifierID: string,
  levelPos: number
): boolean {
  const maxLevelPos = getModifierMaxLevelPos(modifierID);
  const minLevelPos = getModifierMinLevelPos();

  return minLevelPos <= levelPos && levelPos <= maxLevelPos;
}

export function isValidRepairLevelPos(
  repairID: string,
  levelPos: number
): boolean {
  const maxLevelPos = getRepairMaxLevelPos(repairID);
  const minLevelPos = getRepairMinLevelPos();

  return minLevelPos <= levelPos && levelPos <= maxLevelPos;
}

export function isValidDefenseLevelPos(
  defenseID: string,
  levelPos: number
): boolean {
  const maxLevelPos = getDefenseMaxLevelPos(defenseID);
  const minLevelPos = getDefenseMinLevelPos();

  return minLevelPos <= levelPos && levelPos <= maxLevelPos;
}

export function isValidGameDataLevelPos(
  levelPos: number,
  gameDataID: string,
  type: GameDataType
): boolean {
  switch (type) {
    case GAME_DATA_TYPE.Spell:
      const { isValidSpellLevelPos } = spellDataUtils(gameDataID);

      return isValidSpellLevelPos(levelPos);
    case GAME_DATA_TYPE.Troop:
      return isValidTroopLevelPos(gameDataID, levelPos);
    case GAME_DATA_TYPE.Equipment:
      const { isValidEquipmentLevelPos } = equipmentDataUtils(gameDataID);

      return isValidEquipmentLevelPos(levelPos);
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

export function getTroopLevel(troopID: string, levelPos: number): number {
  if (isValidTroopLevelPos(troopID, levelPos)) {
    const troop = getTroop(troopID);

    return troop.damage.length === 0
      ? troop.death_damage[levelPos].level
      : troop.damage[levelPos].level;
  } else {
    throw new Error(
      `gameDataUtils.getTroopLevel ERROR: Invalid level pos. TroopID: ${troopID}. LevelPos: ${levelPos}`
    );
  }
}

export function getHeroLevel(heroID: string, levelPos: number): number {
  if (isValidHeroLevelPos(heroID, levelPos)) {
    const hero = getHero(heroID);

    return hero.dps[levelPos].level;
  } else {
    throw new Error(
      `gameDataUtils.getHeroLevel ERROR: Invalid level pos. HeroID: ${heroID}. LevelPos: ${levelPos}`
    );
  }
}

// Modifier version
export function getModifierLevel(modifierID: string, levelPos: number): number {
  if (isValidModifierLevelPos(modifierID, levelPos)) {
    const modifier = getModifier(modifierID);

    return modifier.modify[levelPos].level;
  } else {
    throw new Error(
      `gameDataUtils.getModifierLevel ERROR: Invalid level pos. ModifierID: ${modifierID}. LevelPos: ${levelPos}`
    );
  }
}

// Repair version
export function getRepairLevel(repairID: string, levelPos: number): number {
  if (isValidRepairLevelPos(repairID, levelPos)) {
    const repair = getRepair(repairID);

    return repair.repair[levelPos].level;
  } else {
    throw new Error(
      `gameDataUtils.getRepairLevel ERROR: Invalid level pos. RepairID: ${repairID}. LevelPos: ${levelPos}`
    );
  }
}

// Defense version
export function getDefenseLevel(defenseID: string, levelPos: number): number {
  if (isValidDefenseLevelPos(defenseID, levelPos)) {
    const defense = getDefense(defenseID);

    return defense.hp[levelPos].level;
  } else {
    throw new Error(
      `gameDataUtils.getDefenseLevel ERROR: Invalid level pos. DefenseID: ${defenseID}. LevelPos: ${levelPos}`
    );
  }
}
