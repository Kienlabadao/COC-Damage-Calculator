import { DamageType, HeroData } from "assets/data/game";
import { OFFENSE_IMG_PATH } from "./gameDataUtils";

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
  };
}
