import { OffenseType } from "data/Game";
import {
  createOffenseItem,
  OffenseItem,
} from "features/AdvanceCalculator/objects/offenseItem";
import { manageAdvanceCalcLevelPosGameDataLocalStorage } from "features/AdvanceCalculator/utils/LocalStorageData/manageAdvanceCalcLevelPosGameDataLocalStorage";

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
