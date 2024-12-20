import {
  calculateDefense,
  DefenseStatus,
} from "features/zapquake_calc/actions/DefenseItem";
import { EarthquakeOrder } from "features/zapquake_calc/data/constants";
import {
  compareDonatedLightningSpellItem,
  DonatedLightningSpellItem,
} from "features/zapquake_calc/objects/donatedLightningSpellItem";
import {
  compareOffenseItemList,
  OffenseItem,
} from "features/zapquake_calc/objects/offenseItem";
import { SpellCountItem } from "features/zapquake_calc/objects/spellCountItem";
import { useRef } from "react";
import { isValidDefenseLevelPos } from "utils/GameData/gameDataUtils";

function compareVariables(
  variables: Variables,
  currentLevelPos: number,
  offenseItemList: OffenseItem[],
  donatedLightningSpellItem: DonatedLightningSpellItem,
  earthquakeOrder: EarthquakeOrder
) {
  return (
    variables.currentLevelPos === currentLevelPos &&
    compareOffenseItemList(variables.offenseItemList, offenseItemList) &&
    compareDonatedLightningSpellItem(
      variables.donatedLightningSpellItem,
      donatedLightningSpellItem
    ) &&
    variables.earthquakeOrder === earthquakeOrder
  );
}

interface Variables {
  currentLevelPos: number;
  offenseItemList: OffenseItem[];
  donatedLightningSpellItem: DonatedLightningSpellItem;
  earthquakeOrder: EarthquakeOrder;
}

export interface DefenseLog {
  defenseStatus: DefenseStatus;
  spellCountList: SpellCountItem[][];
}

export function useCacheDefenseLog() {
  const defenseLogMemoRef = useRef<
    Record<string, { variables: Variables; defenseLog: DefenseLog }>
  >({});

  function retrieveOrRecalculateDefenseLog(
    defenseID: string,
    currentLevelPos: number,
    offenseItemList: OffenseItem[],
    donatedLightningSpellItem: DonatedLightningSpellItem,
    earthquakeOrder: EarthquakeOrder
  ): DefenseLog {
    if (!isValidDefenseLevelPos(defenseID, currentLevelPos)) {
      throw new Error(`useCacheDefense`);
    }

    const prevEntry = defenseLogMemoRef.current[defenseID];

    if (
      prevEntry === undefined ||
      !compareVariables(
        prevEntry.variables,
        currentLevelPos,
        offenseItemList,
        donatedLightningSpellItem,
        earthquakeOrder
      )
    ) {
      calculateAndStoreDefenseLog(
        defenseID,
        currentLevelPos,
        offenseItemList,
        donatedLightningSpellItem,
        earthquakeOrder
      );
    }

    return defenseLogMemoRef.current[defenseID].defenseLog;
  }

  function tryCalculateAndStoreDefenseLog(
    defenseID: string,
    currentLevelPos: number,
    offenseItemList: OffenseItem[],
    donatedLightningSpellItem: DonatedLightningSpellItem,
    earthquakeOrder: EarthquakeOrder
  ): void {
    const prevEntry = defenseLogMemoRef.current[defenseID];

    if (
      prevEntry === undefined ||
      !compareVariables(
        prevEntry.variables,
        currentLevelPos,
        offenseItemList,
        donatedLightningSpellItem,
        earthquakeOrder
      )
    ) {
      calculateAndStoreDefenseLog(
        defenseID,
        currentLevelPos,
        offenseItemList,
        donatedLightningSpellItem,
        earthquakeOrder
      );
    }
  }

  function calculateAndStoreDefenseLog(
    defenseID: string,
    currentLevelPos: number,
    offenseItemList: OffenseItem[],
    donatedLightningSpellItem: DonatedLightningSpellItem,
    earthquakeOrder: EarthquakeOrder
  ): void {
    const defenseLog = calculateDefense(
      defenseID,
      currentLevelPos,
      offenseItemList,
      donatedLightningSpellItem,
      earthquakeOrder
    );

    defenseLogMemoRef.current[defenseID] = {
      variables: {
        currentLevelPos: currentLevelPos,
        offenseItemList: offenseItemList,
        donatedLightningSpellItem: donatedLightningSpellItem,
        earthquakeOrder: earthquakeOrder,
      },
      defenseLog: defenseLog,
    };
  }

  return { retrieveOrRecalculateDefenseLog, tryCalculateAndStoreDefenseLog };
}
