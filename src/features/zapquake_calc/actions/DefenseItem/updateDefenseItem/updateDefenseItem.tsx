import { GAME_DATA_TYPE } from "data/game";
import {
  DefenseItem,
  updateDefenseItemInList,
} from "features/zapquake_calc/objects/defenseItem";
import { manageZapquakeCalcLevelPosGameDataLocalStorage } from "features/zapquake_calc/utils/LocalStorageData/manageZapquakeCalcLevelPosGameDataLocalStorage";
import { initDefenseItem } from "../initDefenseItem";

export function updateDefenseItem(
  defenseID: string,
  newCurrentLevelPos: number,
  defenseItemList: DefenseItem[]
): DefenseItem[] {
  const { storeLevelPos } = manageZapquakeCalcLevelPosGameDataLocalStorage(
    defenseID,
    GAME_DATA_TYPE.Defense
  );
  storeLevelPos(newCurrentLevelPos);

  const updateDefenseItem = initDefenseItem(defenseID);

  return updateDefenseItemInList(updateDefenseItem, defenseItemList);
}
