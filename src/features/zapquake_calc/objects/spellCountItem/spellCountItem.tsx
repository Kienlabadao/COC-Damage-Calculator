import { isValidSpellLevelPos } from "utils/GameData/gameDataUtils";
import { v4 as uuidv4 } from "uuid";

export interface SpellCountItem {
  id: string;
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
      id: uuidv4(),
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
