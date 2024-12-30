import { EquipmentItem } from "features/AdvanceCalculator/objects/equipmentItem";
import {
  createEquipmentDisplayData,
  EquipmentDisplayData,
} from "features/AdvanceCalculator/objects/equipmentDisplayData";
import { EquipmentDamageLog } from "features/AdvanceCalculator/objects/equipmentDamageLog";

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
