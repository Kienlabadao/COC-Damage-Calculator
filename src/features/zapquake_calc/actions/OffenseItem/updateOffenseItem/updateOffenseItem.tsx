import { OffenseType } from "data/game";
import {
  OffenseItem,
  updateOffenseItemInList,
} from "features/zapquake_calc/objects/offenseItem";
import { manageZapquakeCalcLevelPosGameDataLocalStorage } from "features/zapquake_calc/utils/LocalStorageData/manageZapquakeCalcLevelPosGameDataLocalStorage";
import { manageZapquakeCalcUseOffenseLocalStorage } from "features/zapquake_calc/utils/LocalStorageData/manageZapquakeCalcUseOffenseLocalStorage";
import { initOffenseItem } from "../initOffenseItem";

export function updateOffenseItem(
  offenseID: string,
  type: OffenseType,
  offenseItemList: OffenseItem[],
  newCurrentLevelPos?: number,
  newUseOffense?: boolean
): OffenseItem[] {
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

  const updatedOffenseItem = initOffenseItem(offenseID, type);

  return updateOffenseItemInList(updatedOffenseItem, offenseItemList);
}
