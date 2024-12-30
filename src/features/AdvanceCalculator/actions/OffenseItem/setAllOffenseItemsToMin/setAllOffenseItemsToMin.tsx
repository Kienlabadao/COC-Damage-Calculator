import { OffenseType } from "data/Game";
import { OffenseItem } from "features/AdvanceCalculator/objects/offenseItem";
import { manageAdvanceCalcLevelPosGameDataLocalStorage } from "features/AdvanceCalculator/utils/LocalStorageData/manageAdvanceCalcLevelPosGameDataLocalStorage";
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
      const minLevelPos = getGameDataMinLevelPos(offenseID, type);

      const { storeLevelPos } = manageAdvanceCalcLevelPosGameDataLocalStorage(
        offenseID,
        type
      );
      storeLevelPos(minLevelPos);

      return initOffenseItem(offenseID, type);
    } else {
      return offense;
    }
  });
}
