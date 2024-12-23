import { calculateDefense } from "features/zapquake_calc/actions/DefenseItem";
import { EarthquakeOrder } from "features/zapquake_calc/data/constants";
import {
  compareDefenseItem,
  DefenseItem,
} from "features/zapquake_calc/objects/defenseItem";
import { DefenseLog } from "features/zapquake_calc/objects/defenseLog";
import {
  compareDonatedLightningSpellItem,
  DonatedLightningSpellItem,
} from "features/zapquake_calc/objects/donatedLightningSpellItem";
import {
  compareOffenseItemList,
  OffenseItem,
} from "features/zapquake_calc/objects/offenseItem";
import { useRef } from "react";

function compareVariables(
  variables: Variables,
  defenseItem: DefenseItem,
  offenseItemList: OffenseItem[],
  donatedLightningSpellItem: DonatedLightningSpellItem,
  earthquakeOrder: EarthquakeOrder
) {
  return (
    compareDefenseItem(variables.defenseItem, defenseItem) &&
    compareOffenseItemList(variables.offenseItemList, offenseItemList) &&
    compareDonatedLightningSpellItem(
      variables.donatedLightningSpellItem,
      donatedLightningSpellItem
    ) &&
    variables.earthquakeOrder === earthquakeOrder
  );
}

interface Variables {
  defenseItem: DefenseItem;
  offenseItemList: OffenseItem[];
  donatedLightningSpellItem: DonatedLightningSpellItem;
  earthquakeOrder: EarthquakeOrder;
}

export function useCacheDefenseLog() {
  const defenseLogMemoRef = useRef<
    Record<string, { variables: Variables; defenseLog: DefenseLog }>
  >({});

  function retrieveOrRecalculateDefenseLog(
    defenseItem: DefenseItem,
    offenseItemList: OffenseItem[],
    donatedLightningSpellItem: DonatedLightningSpellItem,
    earthquakeOrder: EarthquakeOrder
  ): DefenseLog {
    const defenseID = defenseItem.defenseID;

    tryCalculateAndStoreDefenseLog(
      defenseItem,
      offenseItemList,
      donatedLightningSpellItem,
      earthquakeOrder
    );

    return defenseLogMemoRef.current[defenseID].defenseLog;
  }

  function tryCalculateAndStoreDefenseLog(
    defenseItem: DefenseItem,
    offenseItemList: OffenseItem[],
    donatedLightningSpellItem: DonatedLightningSpellItem,
    earthquakeOrder: EarthquakeOrder
  ): void {
    const defenseID = defenseItem.defenseID;
    const prevEntry = defenseLogMemoRef.current[defenseID];

    if (
      prevEntry === undefined ||
      !compareVariables(
        prevEntry.variables,
        defenseItem,
        offenseItemList,
        donatedLightningSpellItem,
        earthquakeOrder
      )
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
  ): void {
    const defenseID = defenseItem.defenseID;
    const defenseLog = calculateDefense(
      defenseItem,
      offenseItemList,
      donatedLightningSpellItem,
      earthquakeOrder
    );

    defenseLogMemoRef.current[defenseID] = {
      variables: {
        defenseItem,
        offenseItemList,
        donatedLightningSpellItem,
        earthquakeOrder,
      },
      defenseLog: defenseLog,
    };
  }

  return retrieveOrRecalculateDefenseLog;
}
