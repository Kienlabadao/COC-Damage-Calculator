import { OffenseType } from "data/game";
import {
  createOffenseItem,
  OffenseItem,
} from "features/advance_calc/objects/offenseItem";
import { manageAdvanceCalcLevelPosGameDataLocalStorage } from "features/advance_calc/utils/LocalStorageData/manageAdvanceCalcLevelPosGameDataLocalStorage";

export function initOffenseItem(
  offenseID: string,
  type: OffenseType
): OffenseItem {
  const { getOrStoreLevelPos } = manageAdvanceCalcLevelPosGameDataLocalStorage(
    offenseID,
    type
  );
  const currentLevelPos = getOrStoreLevelPos();

  return createOffenseItem(offenseID, type, currentLevelPos);
}
