import { OffenseType } from "data/Game";
import {
  createOffenseItem,
  OffenseItem,
} from "features/ZapquakeCalculator/objects/offenseItem";
import { manageZapquakeCalcLevelPosGameDataLocalStorage } from "features/ZapquakeCalculator/utils/LocalStorageData/manageZapquakeCalcLevelPosGameDataLocalStorage";
import { manageZapquakeCalcUseOffenseLocalStorage } from "features/ZapquakeCalculator/utils/LocalStorageData/manageZapquakeCalcUseOffenseLocalStorage";

export function initOffenseItem(
  offenseID: string,
  type: OffenseType
): OffenseItem {
  const isDonated = false;

  const { getOrStoreLevelPos } = manageZapquakeCalcLevelPosGameDataLocalStorage(
    offenseID,
    type,
    isDonated
  );
  const currentLevelPos = getOrStoreLevelPos();

  const { getOrStoreUseOffense } = manageZapquakeCalcUseOffenseLocalStorage(
    offenseID,
    type,
    isDonated
  );
  const useOffense = getOrStoreUseOffense();

  return createOffenseItem(offenseID, type, currentLevelPos, useOffense);
}
