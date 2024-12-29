import { OffenseItem } from "features/zapquake_calc/objects/offenseItem";
import { ZapquakeActionItem } from "features/zapquake_calc/objects/zapquakeActionItem";
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
