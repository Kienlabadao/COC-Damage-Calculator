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
import { transformRecord } from "utils/objectUtils";

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

export function useCacheDefenseLog(
  defenseItemList: DefenseItem[],
  offenseItemList: OffenseItem[],
  donatedLightningSpellItem: DonatedLightningSpellItem,
  earthquakeOrder: EarthquakeOrder
): Record<string, DefenseLog> {
  const defenseLogMemoRef = useRef<
    Record<string, { variables: Variables; defenseLog: DefenseLog }>
  >({});

  defenseItemList.forEach((defenseItem) => {
    const defenseID = defenseItem.defenseID;

    tryStoreDefenseLog(
      defenseItem,
      offenseItemList,
      donatedLightningSpellItem,
      earthquakeOrder
    );

    return defenseLogMemoRef.current[defenseID].defenseLog;
  });

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
      !compareVariables(
        prevEntry.variables,
        defenseItem,
        offenseItemList,
        donatedLightningSpellItem,
        earthquakeOrder
      )
    ) {
      const defenseLog = calculateDefense(
        defenseItem,
        offenseItemList,
        donatedLightningSpellItem,
        earthquakeOrder
      );

      storeDefenseLog(
        defenseItem,
        defenseLog,
        offenseItemList,
        donatedLightningSpellItem,
        earthquakeOrder
      );
    }
  }

  function storeDefenseLog(
    defenseItem: DefenseItem,
    defenseLog: DefenseLog,
    offenseItemList: OffenseItem[],
    donatedLightningSpellItem: DonatedLightningSpellItem,
    earthquakeOrder: EarthquakeOrder
  ): void {
    const defenseID = defenseItem.defenseID;

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

  return transformRecord(
    defenseLogMemoRef.current,
    (entry) => entry.defenseLog
  );
}
