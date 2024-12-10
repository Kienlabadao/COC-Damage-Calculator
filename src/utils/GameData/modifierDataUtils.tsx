import { GameDataType, ModifierData } from "assets/data/game";
import { MODIFIER_IMG_PATH } from "./gameDataUtils";

export function modifierDataUtils(modifierID: string) {
  const modifierData = ModifierData[modifierID];
  if (modifierData === undefined) {
    throw new Error(
      `getModifier ERROR: Modifier with ID "${modifierID}" not found.`
    );
  }

  function getModifierName(): string {
    return modifierData.name;
  }

  function getModifierImage(modifierID: string): string {
    return `${MODIFIER_IMG_PATH}/modifier/${modifierID}.webp`;
  }

  function getModifierAffectOnlyType(): GameDataType[] {
    return modifierData.affect_offense_type;
  }

  function getModifierAffectOnly(): string[] {
    return modifierData.affect_only;
  }

  function getModifierDoesntAffect(): string[] {
    return modifierData.doesnt_affect;
  }

  function getModifierLevelCount(): number {
    return modifierData.modify.length;
  }

  function getModifierMaxLevelPos(): number {
    return getModifierLevelCount() - 1;
  }

  function getModifierMinLevelPos(): number {
    return 0;
  }

  function getModifierLevel(levelPos: number): number {
    if (isValidModifierLevelPos(levelPos)) {
      return modifierData.modify[levelPos].level;
    } else {
      throw new Error(
        `gameDataUtils.getModifierLevel ERROR: Invalid level pos. ModifierID: ${modifierID}. LevelPos: ${levelPos}`
      );
    }
  }

  function getModifierModify(levelPos: number): number {
    if (isValidModifierLevelPos(levelPos)) {
      return modifierData.modify[levelPos].modify;
    } else {
      throw new Error(
        `gameDataUtils.getModifierLevel ERROR: Invalid level pos. ModifierID: ${modifierID}. LevelPos: ${levelPos}`
      );
    }
  }

  function isValidModifierLevelPos(levelPos: number): boolean {
    const maxLevelPos = getModifierMaxLevelPos();
    const minLevelPos = getModifierMinLevelPos();

    return minLevelPos <= levelPos && levelPos <= maxLevelPos;
  }

  return {
    modifierData,
    getModifierName,
    getModifierImage,
    getModifierAffectOnlyType,
    getModifierAffectOnly,
    getModifierDoesntAffect,
    getModifierLevelCount,
    getModifierMaxLevelPos,
    getModifierMinLevelPos,
    getModifierLevel,
    getModifierModify,
    isValidModifierLevelPos,
  };
}
