import { manageAdvanceCalcLevelPosGameDataLocalStorage } from "features/advance_calc/utils/LocalStorageData/manageAdvanceCalcLevelPosGameDataLocalStorage";
import { getGameDataMinLevelPos } from "utils/GameData/gameDataUtils";
import { initModifierItem } from "../initModifierItem";
import { ModifierItem } from "features/advance_calc/objects/modifierItem";
import { GAME_DATA_TYPE } from "data/game";

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
