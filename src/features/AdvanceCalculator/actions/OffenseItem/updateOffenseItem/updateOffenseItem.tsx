import { OffenseType } from "data/Game";
import { OffenseItem } from "features/AdvanceCalculator/objects/offenseItem";
import { manageAdvanceCalcLevelPosGameDataLocalStorage } from "features/AdvanceCalculator/utils/LocalStorageData/manageAdvanceCalcLevelPosGameDataLocalStorage";
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
