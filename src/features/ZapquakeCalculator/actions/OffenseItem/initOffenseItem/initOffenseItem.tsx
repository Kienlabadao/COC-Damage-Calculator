import { OffenseType } from "data/game";
import {
  createOffenseItem,
  OffenseItem,
} from "features/zapquake_calc/objects/offenseItem";
import { manageZapquakeCalcLevelPosGameDataLocalStorage } from "features/zapquake_calc/utils/LocalStorageData/manageZapquakeCalcLevelPosGameDataLocalStorage";
import { manageZapquakeCalcUseOffenseLocalStorage } from "features/zapquake_calc/utils/LocalStorageData/manageZapquakeCalcUseOffenseLocalStorage";

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
