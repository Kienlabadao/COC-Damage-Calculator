import { OffenseType } from "data/game";
import { isValidGameDataLevelPos } from "utils/GameData/gameDataUtils";

export interface BaseOffenseItem {
  offenseID: string;
  type: OffenseType;
  currentLevelPos: number;
}

export function createBaseOffenseItem(
  offenseID: string,
  type: OffenseType,
  currentLevelPos: number
): BaseOffenseItem {
  if (isValidGameDataLevelPos(currentLevelPos, offenseID, type)) {
    return {
      offenseID: offenseID,
      type: type,
      currentLevelPos: currentLevelPos,
    };
  } else {
    throw new Error(
      `baseOffenseItem.createBaseOffenseItem ERROR: currentLevelPos (${currentLevelPos}) is invalid. OffenseID: ${offenseID}`
    );
  }
}

export function filterBaseOffenseItemList(
  offenseItemList: BaseOffenseItem[],
  offenseTypeFilterList: Set<OffenseType>
): BaseOffenseItem[] {
  return offenseItemList.filter((offenseItem) => {
    return offenseTypeFilterList.has(offenseItem.type);
  });
}
