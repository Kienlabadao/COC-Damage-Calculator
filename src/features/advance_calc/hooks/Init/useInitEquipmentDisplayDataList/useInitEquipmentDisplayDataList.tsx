import { EquipmentItem } from "features/advance_calc/objects/equipmentItem";
import { ModifierItem } from "features/advance_calc/objects/modifierItem";
import { useCacheEquipmentDamageLog } from "../../useCacheEquipmentDamageLog";
import {
  createEquipmentDisplayData,
  EquipmentDisplayData,
} from "features/advance_calc/objects/equipmentDisplayData";

function initEquipmentDisplayData(
  equipmentItemList: EquipmentItem[],
  updateEquipment: (
    equipmentID: string,
    currentLevelPos?: number,
    use?: boolean
  ) => void,
  attackSpeed: number,
  attackSpeedModify: number,
  useHardMode: boolean,
  activeModifier?: ModifierItem
): EquipmentDisplayData[] {
  const retrieveOrRecalculateEquipmentDamageLog = useCacheEquipmentDamageLog();

  return equipmentItemList.map((equipmentItem) => {
    const id = equipmentItem.id;

    const equipmentDamageLog = retrieveOrRecalculateEquipmentDamageLog(
      equipmentItem,
      attackSpeed,
      attackSpeedModify,
      useHardMode,
      activeModifier
    );

    return createEquipmentDisplayData(
      id,
      equipmentItem,
      updateEquipment,
      equipmentDamageLog
    );
  });
}

export function useInitEquipmentDisplayDataList(
  equipmentItemList: EquipmentItem[],
  updateEquipment: (
    equipmentID: string,
    currentLevelPos?: number,
    use?: boolean
  ) => void,
  attackSpeed: number,
  attackSpeedModify: number,
  useHardMode: boolean,
  activeModifier?: ModifierItem
) {
  return initEquipmentDisplayData(
    equipmentItemList,
    updateEquipment,
    attackSpeed,
    attackSpeedModify,
    useHardMode,
    activeModifier
  );
}
