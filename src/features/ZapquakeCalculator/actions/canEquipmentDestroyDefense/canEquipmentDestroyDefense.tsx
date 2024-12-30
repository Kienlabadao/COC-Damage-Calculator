import { OFFENSE_TYPE } from "data/Game";
import {
  filterOffenseItemList,
  OffenseItem,
} from "features/ZapquakeCalculator/objects/offenseItem";
import { getArrayLastElement } from "utils/objectUtils";
import { convertOffenseItemList } from "../ZapquakeActionItem";
import { convertZapquakeActionList } from "../ZapquakeDamageLogItem";

export function canEquipmentDestroyDefense(
  defenseID: string,
  defenseCurrentLevelPos: number,
  offenseItemList: OffenseItem[]
): boolean {
  const equipmentItemList = filterOffenseItemList(
    offenseItemList,
    new Set([OFFENSE_TYPE.Equipment]),
    true
  );

  if (equipmentItemList.length === 0) {
    // User did not use any equipment
    return false;
  }

  const actionList = convertOffenseItemList(equipmentItemList);

  const damageLogList = convertZapquakeActionList(
    defenseID,
    defenseCurrentLevelPos,
    actionList
  );

  return getArrayLastElement(damageLogList).remainingHP <= 0;
}
