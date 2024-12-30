import { OffenseType } from "data/Game";
import { OffenseItem } from "features/ZapquakeCalculator/objects/offenseItem";
import { manageZapquakeCalcLevelPosGameDataLocalStorage } from "features/ZapquakeCalculator/utils/LocalStorageData/manageZapquakeCalcLevelPosGameDataLocalStorage";
import { getGameDataMinLevelPos } from "utils/GameData/gameDataUtils";
import { initOffenseItem } from "../initOffenseItem";

export function setAllOffenseItemsToMin(
  offenseItemList: OffenseItem[],
  offenseTypeFilterList?: Set<OffenseType>
): OffenseItem[] {
  return offenseItemList.map((offense) => {
    if (offenseTypeFilterList && offenseTypeFilterList.has(offense.type)) {
      const offenseID = offense.offenseID;
      const type = offense.type;
      const isDonated = false;
      const minLevelPos = getGameDataMinLevelPos(offenseID, type);

      const { storeLevelPos } = manageZapquakeCalcLevelPosGameDataLocalStorage(
        offenseID,
        type,
        isDonated
      );
      storeLevelPos(minLevelPos);

      return initOffenseItem(offenseID, type);
    } else {
      return offense;
    }
  });
}
