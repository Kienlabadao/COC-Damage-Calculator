import { OffenseType } from "data/game";
import { isValidGameDataLevelPos } from "utils/GameData/gameDataUtils";

export interface BaseOffenseItem {
  id: string;
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
      id: offenseID,
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

export function compareBaseOffenseItem(
  baseOF1: BaseOffenseItem,
  baseOF2: BaseOffenseItem
): boolean {
  return (
    baseOF1.id === baseOF2.id &&
    baseOF1.offenseID === baseOF2.offenseID &&
    baseOF1.type === baseOF2.type &&
    baseOF1.currentLevelPos === baseOF2.currentLevelPos
  );
}
