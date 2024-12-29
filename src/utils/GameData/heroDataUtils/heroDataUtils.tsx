import { DAMAGE_TYPE, DamageType, HeroData } from "data/Game";
import { OFFENSE_IMG_PATH } from "data/constants";

export function heroDataUtils(heroID: string) {
  const heroData = HeroData[heroID];
  if (heroData === undefined) {
    throw new Error(`getHero ERROR: Hero with ID "${heroID}" not found.`);
  }

  function getHeroName(): string {
    return heroData.name;
  }

  function getHeroImage(): string {
    return `${OFFENSE_IMG_PATH}/heroes/${heroID}/${heroID}.webp`;
  }

  function getHeroDamageType(): DamageType {
    return heroData.damage_type;
  }

  function getHeroAttackSpeed(): number {
    return heroData.attack_speed;
  }

  function getHeroLevelCount(): number {
    return heroData.dps.length;
  }

  function getHeroMaxLevelPos(): number {
    return getHeroLevelCount() - 1;
  }

  function getHeroMinLevelPos(): number {
    return 0;
  }

  function getHeroLevel(levelPos: number): number {
    if (isValidHeroLevelPos(levelPos)) {
      return heroData.dps[levelPos].level;
    } else {
      throw new Error(
        `gameDataUtils.getHeroLevel ERROR: Invalid level pos. HeroID: ${heroID}. LevelPos: ${levelPos}`
      );
    }
  }

  function getHeroDPS(levelPos: number): number {
    if (isValidHeroLevelPos(levelPos)) {
      return heroData.dps[levelPos].dps;
    } else {
      throw new Error(
        `gameDataUtils.getHeroLevel ERROR: Invalid level pos. HeroID: ${heroID}. LevelPos: ${levelPos}`
      );
    }
  }

  function isValidHeroLevelPos(levelPos: number): boolean {
    const maxLevelPos = getHeroMaxLevelPos();
    const minLevelPos = getHeroMinLevelPos();

    return minLevelPos <= levelPos && levelPos <= maxLevelPos;
  }

  function isMaxLevelPos(levelPos: number): boolean {
    return getHeroMaxLevelPos() === levelPos;
  }

  function isHeroDamageTypeDirect() {
    return getHeroDamageType() === DAMAGE_TYPE.Direct;
  }

  function isHeroDamageTypeEarthquake() {
    return getHeroDamageType() === DAMAGE_TYPE.Earthquake;
  }

  return {
    heroData,
    getHeroName,
    getHeroImage,
    getHeroDamageType,
    getHeroAttackSpeed,
    getHeroLevelCount,
    getHeroMaxLevelPos,
    getHeroMinLevelPos,
    getHeroLevel,
    getHeroDPS,
    isValidHeroLevelPos,
    isMaxLevelPos,
    isHeroDamageTypeDirect,
    isHeroDamageTypeEarthquake,
  };
}
