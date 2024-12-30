import { manageAdvanceCalcLevelPosGameDataLocalStorage } from "features/AdvanceCalculator/utils/LocalStorageData/manageAdvanceCalcLevelPosGameDataLocalStorage";
import { getGameDataMinLevelPos } from "utils/GameData/gameDataUtils";
import { initModifierItem } from "../initModifierItem";
import { ModifierItem } from "features/AdvanceCalculator/objects/modifierItem";
import { GAME_DATA_TYPE } from "data/Game";

const type = GAME_DATA_TYPE.Modifier;

export function setAllModifierItemsToMin(
  modifierItemList: ModifierItem[]
): ModifierItem[] {
  return modifierItemList.map((modifier) => {
    const modifierID = modifier.modifierID;
    const minLevelPos = getGameDataMinLevelPos(modifierID, type);

    const { storeLevelPos } = manageAdvanceCalcLevelPosGameDataLocalStorage(
      modifierID,
      type
    );
    storeLevelPos(minLevelPos);

    return initModifierItem(modifierID);
  });
}
