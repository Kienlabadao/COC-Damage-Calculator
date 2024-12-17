import { isValidSpellLevelPos } from "utils/GameData/gameDataUtils";

export interface SpellCountItem {
  spellID: string;
  currentLevelPos: number;
  isDonated: boolean;
  count: number;
}

export function createSpellCountItem(
  spellID: string,
  isDonated = false,
  currentLevelPos: number,
  count: number
): SpellCountItem {
  if (isValidSpellLevelPos(spellID, currentLevelPos)) {
    return {
      spellID: spellID,
      isDonated: isDonated,
      currentLevelPos: currentLevelPos,
      count: count,
    };
  } else {
    throw new Error(
      `spellCountItem.createSpellCountItem ERROR: currentLevelPos (${currentLevelPos}) is invalid. SpellID: ${spellID}`
    );
  }
}
