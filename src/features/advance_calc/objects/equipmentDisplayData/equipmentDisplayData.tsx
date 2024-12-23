import { EquipmentDamageLog } from "../equipmentDamageLog";
import { EquipmentItem } from "../equipmentItem";

export interface EquipmentDisplayData {
  id: string;
  equipmentItem: EquipmentItem;
  updateEquipment: (
    equipmentID: string,
    currentLevelPos?: number,
    use?: boolean
  ) => void;
  equipmentDamageLog: EquipmentDamageLog;
}

export function createEquipmentDisplayData(
  id: string,
  equipmentItem: EquipmentItem,
  updateEquipment: (
    equipmentID: string,
    currentLevelPos?: number,
    use?: boolean
  ) => void,
  equipmentDamageLog: EquipmentDamageLog
) {
  return {
    id: id,
    equipmentItem,
    updateEquipment,
    equipmentDamageLog,
  };
}
