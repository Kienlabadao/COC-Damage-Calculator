import {
  DefenseData,
  DefenseStats,
  EquipmentData,
  EquipmentStats,
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
  SpellStats,
  TroopData,
  TroopStats,
} from "assets/data/game";
import { getAllObjectKeys } from "./objectUtils";

const OFFENSE_IMG_PATH = "/images/offense/";
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

export function getSpell(spellID: string): SpellStats {
  const spell = SpellData[spellID];

  if (spell != null) {
    return spell;
  } else {
    throw new Error(`getSpell ERROR: Spell with ID "${spellID}" not found.`);
  }
}

export function getEquipment(equipmentID: string): EquipmentStats {
  const equipment = EquipmentData[equipmentID];

  if (equipment != null) {
    return equipment;
  } else {
    throw new Error(
      `getEquipment ERROR: Equipment with ID "${equipmentID}" not found.`
    );
  }
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

export function getSpellImage(spellID: string): string {
  return `${OFFENSE_IMG_PATH}/spells/${spellID}.webp`;
}

export function getEquipmentImage(equipmentID: string): string {
  return `${OFFENSE_IMG_PATH}/equipments/${equipmentID}.webp`;
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

export function getSpellMaxLevelPos(spellID: string): number {
  const spell = getSpell(spellID);

  return spell.damage.length;
}

export function getTroopMaxLevelPos(troopID: string): number {
  const troop = getTroop(troopID);
  return troop.damage.length === 0
    ? troop.death_damage.length
    : troop.damage.length;
}

export function getHeroMaxLevelPos(heroID: string): number {
  const hero = getHero(heroID);

  return hero.dps.length;
}

export function getEquipmentMaxLevelPos(equipmentID: string): number {
  const equipment = getEquipment(equipmentID);

  return equipment.damage.length === 0
    ? equipment.dps_boost.length
    : equipment.damage.length;
}

export function getRepairMaxLevelPos(repairID: string): number {
  const repair = getRepair(repairID);

  return repair.repair.length;
}

export function getModifierMaxLevelPos(modifierID: string): number {
  const modifier = getModifier(modifierID);

  return modifier.modify.length;
}

export function getDefenseMaxLevelPos(defenseID: string): number {
  const defense = getDefense(defenseID);

  return defense.hp.length;
}

export function getSpellMinLevelPos(): number {
  return 0;
}

export function getTroopMinLevelPos(): number {
  return 0;
}

export function getHeroMinLevelPos(): number {
  return 0;
}

export function getEquipmentMinLevelPos(): number {
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

export function isValidSpellLevelPos(
  spellID: string,
  levelPos: number
): boolean {
  const maxLevelPos = getSpellMaxLevelPos(spellID);
  const minLevelPos = getSpellMinLevelPos();

  return minLevelPos <= levelPos && levelPos <= maxLevelPos;
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

export function isValidEquipmentLevelPos(
  equipmentID: string,
  levelPos: number
): boolean {
  const maxLevelPos = getEquipmentMaxLevelPos(equipmentID);
  const minLevelPos = getEquipmentMinLevelPos();

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
