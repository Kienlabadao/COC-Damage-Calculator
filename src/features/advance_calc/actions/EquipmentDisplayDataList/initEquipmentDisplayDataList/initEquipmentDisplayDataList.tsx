import { EquipmentItem } from "features/advance_calc/objects/equipmentItem";
import {
  createEquipmentDisplayData,
  EquipmentDisplayData,
} from "features/advance_calc/objects/equipmentDisplayData";
import { EquipmentDamageLog } from "features/advance_calc/objects/equipmentDamageLog";

export function initEquipmentDisplayDataList(
  equipmentItemList: EquipmentItem[],
  equipmentDamageLogList: Record<string, EquipmentDamageLog>,
  updateEquipment: (
    equipmentID: string,
    currentLevelPos?: number,
    use?: boolean
  ) => void
): EquipmentDisplayData[] {
  return equipmentItemList.map((equipmentItem) => {
    const id = equipmentItem.id;
    const equipmentDamageLog = equipmentDamageLogList[equipmentItem.offenseID];

    return createEquipmentDisplayData(
      id,
      equipmentItem,
      updateEquipment,
      equipmentDamageLog
    );
  });
}
