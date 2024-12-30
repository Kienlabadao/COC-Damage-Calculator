import { calculateEquipmentDamageLog } from "features/AdvanceCalculator/actions/EquipmentDamage";
import { EquipmentDamageLog } from "features/AdvanceCalculator/objects/equipmentDamageLog";
import {
  compareEquipmentItem,
  EquipmentItem,
} from "features/AdvanceCalculator/objects/equipmentItem";
import {
  compareModifierItem,
  ModifierItem,
} from "features/AdvanceCalculator/objects/modifierItem";
import { useRef } from "react";
import { transformRecord } from "utils/objectUtils";

interface InternalVariable {
  equipmentItem: EquipmentItem;
}

interface ExternalVariable {
  attackSpeed: number;
  attackSpeedModify: number;
  useHardMode: boolean;
  activeModifier?: ModifierItem;
}

function compareInternalVariable(
  internalVariable: InternalVariable,
  equipmentItem: EquipmentItem
) {
  return compareEquipmentItem(internalVariable.equipmentItem, equipmentItem);
}

function compareExternalVariable(
  externalVariable1: ExternalVariable,
  externalVariable2: ExternalVariable
) {
  return (
    externalVariable1.attackSpeed === externalVariable2.attackSpeed &&
    externalVariable1.attackSpeedModify ===
      externalVariable2.attackSpeedModify &&
    externalVariable1.useHardMode === externalVariable2.useHardMode &&
    compareModifierItem(
      externalVariable1.activeModifier,
      externalVariable2.activeModifier
    )
  );
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
      {
        internalVariable: InternalVariable;
        equipmentDamageLog: EquipmentDamageLog;
      }
    >
  >({});
  const externalVariableMemoRef = useRef<ExternalVariable>();

  const externalVariable: ExternalVariable = {
    attackSpeed,
    attackSpeedModify,
    useHardMode,
    activeModifier,
  };

  if (
    externalVariableMemoRef.current &&
    compareExternalVariable(externalVariableMemoRef.current, externalVariable)
  ) {
    equipmentItemList.forEach((equipmentItem) => {
      tryStoreEquipmentDamageLog(
        equipmentItem,
        attackSpeed,
        attackSpeedModify,
        useHardMode,
        activeModifier
      );
    });
  } else {
    equipmentItemList.forEach((equipmentItem) => {
      calculateAndStoreEquipmentDamageLog(
        equipmentItem,
        attackSpeed,
        attackSpeedModify,
        useHardMode,
        activeModifier
      );
    });

    storeExternalVariableRef(externalVariable);
  }

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
      !compareInternalVariable(prevEntry.internalVariable, equipmentItem)
    ) {
      calculateAndStoreEquipmentDamageLog(
        equipmentItem,
        attackSpeed,
        attackSpeedModify,
        useHardMode,
        activeModifier
      );
    }
  }

  function calculateAndStoreEquipmentDamageLog(
    equipmentItem: EquipmentItem,
    attackSpeed: number,
    attackSpeedModify: number,
    useHardMode: boolean,
    activeModifier?: ModifierItem
  ) {
    const equipmentDamageLog = calculateEquipmentDamageLog(
      equipmentItem,
      attackSpeed,
      attackSpeedModify,
      useHardMode,
      activeModifier
    );

    storeEquipmentDamageLog(equipmentItem, equipmentDamageLog);
  }

  function storeEquipmentDamageLog(
    equipmentItem: EquipmentItem,
    equipmentDamageLog: EquipmentDamageLog
  ): void {
    const equipmentID = equipmentItem.offenseID;

    equipmentDamageLogMemoRef.current[equipmentID] = {
      internalVariable: {
        equipmentItem,
      },
      equipmentDamageLog: equipmentDamageLog,
    };
  }

  function storeExternalVariableRef(externalVariable: ExternalVariable): void {
    externalVariableMemoRef.current = externalVariable;
  }

  return transformRecord(
    equipmentDamageLogMemoRef.current,
    (entry) => entry.equipmentDamageLog
  );
}
