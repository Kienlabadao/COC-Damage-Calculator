import { OffenseItem } from "features/zapquake_calc/objects/offenseItem";
import {
  createZapquakeActionItem,
  ZapquakeActionItem,
} from "features/zapquake_calc/objects/zapquakeActionItem";

export function convertOffenseItem(
  offenseItem: OffenseItem
): ZapquakeActionItem {
  return createZapquakeActionItem(
    offenseItem.offenseID,
    offenseItem.type,
    offenseItem.currentLevelPos
  );
}
