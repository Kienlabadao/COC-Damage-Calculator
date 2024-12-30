import { OffenseItem } from "features/ZapquakeCalculator/objects/offenseItem";
import { ZapquakeActionItem } from "features/ZapquakeCalculator/objects/zapquakeActionItem";
import { convertOffenseItem } from "../convertOffenseItem";

export function convertOffenseItemList(
  offenseItemList: OffenseItem[]
): ZapquakeActionItem[] {
  const zapquakeActionList: ZapquakeActionItem[] = [];

  offenseItemList.forEach((equipmentItem) =>
    zapquakeActionList.push(convertOffenseItem(equipmentItem))
  );

  return zapquakeActionList;
}
