import { OffenseType } from "data/game";
import {
  OffenseItem,
  updateOffenseItemInList,
} from "features/advance_calc/objects/offenseItem";
import { manageAdvanceCalcLevelPosGameDataLocalStorage } from "features/advance_calc/utils/LocalStorageData/manageAdvanceCalcLevelPosGameDataLocalStorage";
import { initOffenseItem } from "../initOffenseItem";

export function updateOffenseItem(
  offenseID: string,
  type: OffenseType,
  offenseItemList: OffenseItem[],
  newCurrentLevelPos?: number
): OffenseItem[] {
  if (newCurrentLevelPos !== undefined) {
    const { storeLevelPos } = manageAdvanceCalcLevelPosGameDataLocalStorage(
      offenseID,
      type
    );
    storeLevelPos(newCurrentLevelPos);
  }

  const updatedOffenseItem = initOffenseItem(offenseID, type);

  return updateOffenseItemInList(updatedOffenseItem, offenseItemList);
}
