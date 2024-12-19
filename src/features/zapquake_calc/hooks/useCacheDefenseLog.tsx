import { useRef } from "react";
import { calculateDefense, DefenseStatus } from "../actions/DefenseItem";
import { SpellCountItem } from "../objects/spellCountItem";
import { isValidDefenseLevelPos } from "utils/GameData/gameDataUtils";
import { compareOffenseItemList, OffenseItem } from "../objects/offenseItem";
import { DonatedLightningSpellItem } from "../objects/donatedLightningSpellItem";
import { EarthquakeOrder } from "../data/constants";
import { compareBaseOffenseItem } from "objects/baseOffenseItem";

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
    compareBaseOffenseItem(
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

interface DefenseLog {
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
