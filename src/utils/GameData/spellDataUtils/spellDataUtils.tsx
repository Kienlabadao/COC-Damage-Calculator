import { DAMAGE_TYPE, DamageType, SpellData } from "data/game";
import { OFFENSE_IMG_PATH } from "../gameDataUtils";

export function spellDataUtils(spellID: string) {
  const spellData = SpellData[spellID];
  if (spellData === undefined) {
    throw new Error(`getSpell ERROR: Spell with ID "${spellID}" not found.`);
  }

  function getSpellName(): string {
    return spellData.name;
  }

  function getSpellImage(): string {
    return `${OFFENSE_IMG_PATH}/spells/${spellID}.webp`;
  }

  function getSpellDamageType(): DamageType {
    return spellData.damage_type;
  }

  function getSpellLevelCount(): number {
    return spellData.damage.length;
  }

  function getSpellMaxLevelPos(): number {
    return getSpellLevelCount() - 1;
  }

  function getSpellMinLevelPos(): number {
    return 0;
  }

  function getSpellLevel(levelPos: number): number {
    if (isValidSpellLevelPos(levelPos)) {
      return spellData.damage[levelPos].level;
    } else {
      throw new Error(
        `gameDataUtils.getSpellLevel ERROR: Invalid level pos. SpellID: ${spellID}. LevelPos: ${levelPos}`
      );
    }
  }

  function getSpellDamage(levelPos: number): number {
    if (isValidSpellLevelPos(levelPos)) {
      return spellData.damage[levelPos].damage;
    } else {
      throw new Error(
        `gameDataUtils.getSpellLevel ERROR: Invalid level pos. SpellID: ${spellID}. LevelPos: ${levelPos}`
      );
    }
  }

  function isValidSpellLevelPos(levelPos: number): boolean {
    const maxLevelPos = getSpellMaxLevelPos();
    const minLevelPos = getSpellMinLevelPos();

    return minLevelPos <= levelPos && levelPos <= maxLevelPos;
  }

  function isSpellDamageTypeDirect() {
    return getSpellDamageType() === DAMAGE_TYPE.Direct;
  }

  function isSpellDamageTypeEarthquake() {
    return getSpellDamageType() === DAMAGE_TYPE.Earthquake;
  }

  return {
    spellData,
    getSpellName,
    getSpellImage,
    getSpellDamageType,
    getSpellLevelCount,
    getSpellMaxLevelPos,
    getSpellMinLevelPos,
    getSpellLevel,
    getSpellDamage,
    isValidSpellLevelPos,
    isSpellDamageTypeDirect,
    isSpellDamageTypeEarthquake,
  };
}