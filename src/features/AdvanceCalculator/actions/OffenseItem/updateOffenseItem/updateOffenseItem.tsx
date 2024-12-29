import { OffenseType } from "data/game";
import { OffenseItem } from "features/advance_calc/objects/offenseItem";
import { manageAdvanceCalcLevelPosGameDataLocalStorage } from "features/advance_calc/utils/LocalStorageData/manageAdvanceCalcLevelPosGameDataLocalStorage";
import { initOffenseItem } from "../initOffenseItem";

export function updateOffenseItem(
  offenseID: string,
  type: OffenseType,
  newCurrentLevelPos?: number
): OffenseItem {
  if (newCurrentLevelPos !== undefined) {
    const { storeLevelPos } = manageAdvanceCalcLevelPosGameDataLocalStorage(
      offenseID,
      type
    );
    storeLevelPos(newCurrentLevelPos);
  }

  return initOffenseItem(offenseID, type);
}
