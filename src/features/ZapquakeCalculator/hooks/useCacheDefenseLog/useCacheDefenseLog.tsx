import { calculateDefense } from "features/ZapquakeCalculator/actions/DefenseItem";
import { EarthquakeOrder } from "features/ZapquakeCalculator/data/constants";
import {
  compareDefenseItem,
  DefenseItem,
} from "features/ZapquakeCalculator/objects/defenseItem";
import { DefenseLog } from "features/ZapquakeCalculator/objects/defenseLog";
import {
  compareDonatedLightningSpellItem,
  DonatedLightningSpellItem,
} from "features/ZapquakeCalculator/objects/donatedLightningSpellItem";
import {
  compareOffenseItemList,
  filterOffenseItemList,
  OffenseItem,
} from "features/ZapquakeCalculator/objects/offenseItem";
import { useRef } from "react";
import { transformRecord } from "utils/objectUtils";

interface InternalVariable {
  defenseItem: DefenseItem;
}

interface ExternalVariable {
  offenseItemList: OffenseItem[];
  donatedLightningSpellItem: DonatedLightningSpellItem;
  earthquakeOrder: EarthquakeOrder;
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
  return (
    compareOffenseItemList(
      externalVariable1.offenseItemList,
      externalVariable2.offenseItemList
    ) &&
    compareDonatedLightningSpellItem(
      externalVariable1.donatedLightningSpellItem,
      externalVariable2.donatedLightningSpellItem
    ) &&
    externalVariable1.earthquakeOrder === externalVariable2.earthquakeOrder
  );
}

export function useCacheDefenseLog(
  defenseItemList: DefenseItem[],
  offenseItemList: OffenseItem[],
  donatedLightningSpellItem: DonatedLightningSpellItem,
  earthquakeOrder: EarthquakeOrder
): Record<string, DefenseLog> {
  const filteredOffenseItemList = filterOffenseItemList(
    offenseItemList,
    undefined,
    true
  );

  const defenseLogMemoRef = useRef<
    Record<
      string,
      { internalVariable: InternalVariable; defenseLog: DefenseLog }
    >
  >({});
  const externalVariableMemoRef = useRef<ExternalVariable>();

  const externalVariable: ExternalVariable = {
    offenseItemList: filteredOffenseItemList,
    donatedLightningSpellItem,
    earthquakeOrder,
  };

  if (
    externalVariableMemoRef.current &&
    compareExternalVariable(externalVariableMemoRef.current, externalVariable)
  ) {
    defenseItemList.forEach((defenseItem) => {
      tryStoreDefenseLog(
        defenseItem,
        filteredOffenseItemList,
        donatedLightningSpellItem,
        earthquakeOrder
      );
    });
  } else {
    defenseItemList.forEach((defenseItem) => {
      calculateAndStoreDefenseLog(
        defenseItem,
        filteredOffenseItemList,
        donatedLightningSpellItem,
        earthquakeOrder
      );
    });

    storeExternalVariableRef(externalVariable);
  }

  function tryStoreDefenseLog(
    defenseItem: DefenseItem,
    offenseItemList: OffenseItem[],
    donatedLightningSpellItem: DonatedLightningSpellItem,
    earthquakeOrder: EarthquakeOrder
  ): void {
    const defenseID = defenseItem.defenseID;
    const prevEntry = defenseLogMemoRef.current[defenseID];

    if (
      prevEntry === undefined ||
      !compareInternalVariable(prevEntry.internalVariable, defenseItem)
    ) {
      calculateAndStoreDefenseLog(
        defenseItem,
        offenseItemList,
        donatedLightningSpellItem,
        earthquakeOrder
      );
    }
  }

  function calculateAndStoreDefenseLog(
    defenseItem: DefenseItem,
    offenseItemList: OffenseItem[],
    donatedLightningSpellItem: DonatedLightningSpellItem,
    earthquakeOrder: EarthquakeOrder
  ) {
    const defenseLog = calculateDefense(
      defenseItem,
      offenseItemList,
      donatedLightningSpellItem,
      earthquakeOrder
    );

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
