import { OffenseType } from "data/Game";
import { OffenseItem } from "features/ZapquakeCalculator/objects/offenseItem";
import { manageZapquakeCalcLevelPosGameDataLocalStorage } from "features/ZapquakeCalculator/utils/LocalStorageData/manageZapquakeCalcLevelPosGameDataLocalStorage";
import { getGameDataMaxLevelPos } from "utils/GameData/gameDataUtils";
import { initOffenseItem } from "../initOffenseItem";

export function setAllOffenseItemsToMax(
  offenseItemList: OffenseItem[],
  offenseTypeFilterList?: Set<OffenseType>
): OffenseItem[] {
  return offenseItemList.map((offense) => {
    if (offenseTypeFilterList && offenseTypeFilterList.has(offense.type)) {
      const offenseID = offense.offenseID;
      const type = offense.type;
      const isDonated = false;
      const maxLevelPos = getGameDataMaxLevelPos(offenseID, type);

      const { storeLevelPos } = manageZapquakeCalcLevelPosGameDataLocalStorage(
        offenseID,
        type,
        isDonated
      );
      storeLevelPos(maxLevelPos);

      return initOffenseItem(offenseID, type);
    } else {
      return offense;
    }
  });
}
