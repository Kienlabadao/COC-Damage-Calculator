import { OffenseType } from "data/Game";
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
  baseOF1: BaseOffenseItem | undefined,
  baseOF2: BaseOffenseItem | undefined
): boolean {
  if (baseOF1 === baseOF2) return true;
  if (!baseOF1 || !baseOF2) return false;

  return (
    baseOF1.id === baseOF2.id &&
    baseOF1.offenseID === baseOF2.offenseID &&
    baseOF1.type === baseOF2.type &&
    baseOF1.currentLevelPos === baseOF2.currentLevelPos
  );
}

export function compareBaseOffenseItemList(
  baseOFItemList1: BaseOffenseItem[] | undefined,
  baseOFItemList2: BaseOffenseItem[] | undefined
): boolean {
  if (baseOFItemList1 === baseOFItemList2) return true;
  if (!baseOFItemList1 || !baseOFItemList2) return false;

  if (baseOFItemList1.length !== baseOFItemList2.length) {
    return false;
  }

  return baseOFItemList1.every((oF, index) =>
    compareBaseOffenseItem(oF, baseOFItemList2[index])
  );
}
