import { OffenseType } from "data/Game";
import { OffenseItem } from "features/ZapquakeCalculator/objects/offenseItem";
import { manageZapquakeCalcLevelPosGameDataLocalStorage } from "features/ZapquakeCalculator/utils/LocalStorageData/manageZapquakeCalcLevelPosGameDataLocalStorage";
import { manageZapquakeCalcUseOffenseLocalStorage } from "features/ZapquakeCalculator/utils/LocalStorageData/manageZapquakeCalcUseOffenseLocalStorage";
import { initOffenseItem } from "../initOffenseItem";

export function updateOffenseItem(
  offenseID: string,
  type: OffenseType,
  newCurrentLevelPos?: number,
  newUseOffense?: boolean
): OffenseItem {
  const isDonated = false;

  if (newCurrentLevelPos !== undefined) {
    const { storeLevelPos } = manageZapquakeCalcLevelPosGameDataLocalStorage(
      offenseID,
      type,
      isDonated
    );
    storeLevelPos(newCurrentLevelPos);
  }

  if (newUseOffense !== undefined) {
    const { storeUseOffense } = manageZapquakeCalcUseOffenseLocalStorage(
      offenseID,
      type,
      isDonated
    );
    storeUseOffense(newUseOffense);
  }

  return initOffenseItem(offenseID, type);
}
