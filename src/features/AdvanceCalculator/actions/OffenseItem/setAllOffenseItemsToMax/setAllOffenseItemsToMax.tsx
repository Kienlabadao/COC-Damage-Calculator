import { OffenseType } from "data/Game";
import { OffenseItem } from "features/AdvanceCalculator/objects/offenseItem";
import { manageAdvanceCalcLevelPosGameDataLocalStorage } from "features/AdvanceCalculator/utils/LocalStorageData/manageAdvanceCalcLevelPosGameDataLocalStorage";
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
      const maxLevelPos = getGameDataMaxLevelPos(offenseID, type);

      const { storeLevelPos } = manageAdvanceCalcLevelPosGameDataLocalStorage(
        offenseID,
        type
      );
      storeLevelPos(maxLevelPos);

      return initOffenseItem(offenseID, type);
    } else {
      return offense;
    }
  });
}
