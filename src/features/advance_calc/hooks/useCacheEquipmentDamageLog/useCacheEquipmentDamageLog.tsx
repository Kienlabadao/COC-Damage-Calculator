import { calculateEquipmentDamageLog } from "features/advance_calc/actions/EquipmentDamage";
import { EquipmentDamageLog } from "features/advance_calc/objects/equipmentDamageLog";
import {
  compareEquipmentItem,
  EquipmentItem,
} from "features/advance_calc/objects/equipmentItem";
import {
  compareModifierItem,
  ModifierItem,
} from "features/advance_calc/objects/modifierItem";
import { useRef } from "react";
import { transformRecord } from "utils/objectUtils";

function compareVariables(
  variables: Variables,
  equipmentItem: EquipmentItem,
  attackSpeed: number,
  attackSpeedModify: number,
  useHardMode: boolean,
  activeModifier?: ModifierItem
) {
  const { activeModifier: variablesActiveModifier } = variables;

  if (
    compareEquipmentItem(variables.equipmentItem, equipmentItem) &&
    variables.attackSpeed === attackSpeed &&
    variables.attackSpeedModify === attackSpeedModify &&
    variables.useHardMode === useHardMode
  ) {
    return variablesActiveModifier
      ? activeModifier
        ? compareModifierItem(variablesActiveModifier, activeModifier)
        : false
      : !activeModifier;
  }
  return false;
}

interface Variables {
  equipmentItem: EquipmentItem;
  attackSpeed: number;
  attackSpeedModify: number;
  useHardMode: boolean;
  activeModifier?: ModifierItem;
}

export function useCacheEquipmentDamageLog(
  equipmentItemList: EquipmentItem[],
  attackSpeed: number,
  attackSpeedModify: number,
  useHardMode: boolean,
  activeModifier?: ModifierItem
): Record<string, EquipmentDamageLog> {
  const equipmentDamageLogMemoRef = useRef<
    Record<
      string,
      { variables: Variables; equipmentDamageLog: EquipmentDamageLog }
    >
  >({});

  equipmentItemList.forEach((equipmentItem) => {
    const equipmentID = equipmentItem.offenseID;

    tryStoreEquipmentDamageLog(
      equipmentItem,
      attackSpeed,
      attackSpeedModify,
      useHardMode,
      activeModifier
    );

    return equipmentDamageLogMemoRef.current[equipmentID].equipmentDamageLog;
  });

  function tryStoreEquipmentDamageLog(
    equipmentItem: EquipmentItem,
    attackSpeed: number,
    attackSpeedModify: number,
    useHardMode: boolean,
    activeModifier?: ModifierItem
  ): void {
    const equipmentID = equipmentItem.offenseID;
    const prevEntry = equipmentDamageLogMemoRef.current[equipmentID];

    if (
      prevEntry === undefined ||
      !compareVariables(
        prevEntry.variables,
        equipmentItem,
        attackSpeed,
        attackSpeedModify,
        useHardMode,
        activeModifier
      )
    ) {
      const equipmentDamageLog = calculateEquipmentDamageLog(
        equipmentItem,
        attackSpeed,
        attackSpeedModify,
        useHardMode,
        activeModifier
      );

      storeEquipmentDamageLog(
        equipmentItem,
        equipmentDamageLog,
        attackSpeed,
        attackSpeedModify,
        useHardMode,
        activeModifier
      );
    }
  }

  function storeEquipmentDamageLog(
    equipmentItem: EquipmentItem,
    equipmentDamageLog: EquipmentDamageLog,
    attackSpeed: number,
    attackSpeedModify: number,
    useHardMode: boolean,
    activeModifier?: ModifierItem
  ): void {
    const equipmentID = equipmentItem.offenseID;

    equipmentDamageLogMemoRef.current[equipmentID] = {
      variables: {
        equipmentItem,
        attackSpeed,
        attackSpeedModify,
        useHardMode,
        activeModifier,
      },
      equipmentDamageLog: equipmentDamageLog,
    };
  }

  return transformRecord(
    equipmentDamageLogMemoRef.current,
    (entry) => entry.equipmentDamageLog
  );
}
