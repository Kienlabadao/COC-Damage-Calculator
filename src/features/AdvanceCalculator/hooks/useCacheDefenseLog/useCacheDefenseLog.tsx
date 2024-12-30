import { calculateDefense } from "features/AdvanceCalculator/actions/DefenseItem";
import {
  AdvanceActionItem,
  compareAdvanceActionItemList,
} from "features/AdvanceCalculator/objects/advanceActionItem";
import {
  compareDefenseItem,
  DefenseItem,
} from "features/AdvanceCalculator/objects/defenseItem";
import { DefenseLog } from "features/AdvanceCalculator/objects/defenseLog";
import { useRef } from "react";
import { transformRecord } from "utils/objectUtils";

interface InternalVariable {
  defenseItem: DefenseItem;
}

interface ExternalVariable {
  actionList: AdvanceActionItem[];
}

function compareInternalVariable(
  internalVariable: InternalVariable,
  defenseItem: DefenseItem
) {
  return compareDefenseItem(internalVariable.defenseItem, defenseItem);
}

function compareExternalVariable(
  externalVariable1: ExternalVariable,
  externalVariable2: ExternalVariable
) {
  return compareAdvanceActionItemList(
    externalVariable1.actionList,
    externalVariable2.actionList
  );
}

export function useCacheDefenseLog(
  defenseItemList: DefenseItem[],
  actionList: AdvanceActionItem[]
): Record<string, DefenseLog> {
  const defenseLogMemoRef = useRef<
    Record<
      string,
      { internalVariable: InternalVariable; defenseLog: DefenseLog }
    >
  >({});
  const externalVariableMemoRef = useRef<ExternalVariable>();

  const externalVariable: ExternalVariable = {
    actionList,
  };

  if (
    externalVariableMemoRef.current &&
    compareExternalVariable(externalVariableMemoRef.current, externalVariable)
  ) {
    defenseItemList.forEach((defenseItem) => {
      tryStoreDefenseLog(defenseItem, actionList);
    });
  } else {
    defenseItemList.forEach((defenseItem) => {
      calculateAndStoreDefenseLog(defenseItem, actionList);
    });

    storeExternalVariableRef(externalVariable);
  }

  function tryStoreDefenseLog(
    defenseItem: DefenseItem,
    actionList: AdvanceActionItem[]
  ): void {
    const defenseID = defenseItem.defenseID;
    const prevEntry = defenseLogMemoRef.current[defenseID];

    if (
      prevEntry === undefined ||
      !compareInternalVariable(prevEntry.internalVariable, defenseItem)
    ) {
      calculateAndStoreDefenseLog(defenseItem, actionList);
    }
  }

  function calculateAndStoreDefenseLog(
    defenseItem: DefenseItem,
    actionList: AdvanceActionItem[]
  ) {
    const defenseLog = calculateDefense(defenseItem, actionList);

    storeDefenseLog(defenseItem, defenseLog);
  }

  function storeDefenseLog(
    defenseItem: DefenseItem,
    defenseLog: DefenseLog
  ): void {
    const defenseID = defenseItem.defenseID;

    defenseLogMemoRef.current[defenseID] = {
      internalVariable: {
        defenseItem,
      },
      defenseLog: defenseLog,
    };
  }

  function storeExternalVariableRef(externalVariable: ExternalVariable): void {
    externalVariableMemoRef.current = externalVariable;
  }

  return transformRecord(
    defenseLogMemoRef.current,
    (entry) => entry.defenseLog
  );
}
