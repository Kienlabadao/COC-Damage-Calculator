import {
  DEFENSE_STATUS,
  DefenseStatus,
  initDefenseItem,
  setAllDefenseItemsToMax,
  setAllDefenseItemsToMin,
  updateDefenseItem,
} from "features/zapquake_calc/actions/DefenseItem";
import {
  DefenseItem,
  updateDefenseItemInList,
} from "features/zapquake_calc/objects/defenseItem";
import { useCallback, useState } from "react";
import { getAllDefenseIDs } from "utils/GameData/gameDataUtils";
import { OffenseItem } from "features/zapquake_calc/objects/offenseItem";
import { DonatedLightningSpellItem } from "features/zapquake_calc/objects/donatedLightningSpellItem";
import { EarthquakeOrder } from "features/zapquake_calc/data/constants";
import { SpellCountItem } from "features/zapquake_calc/objects/spellCountItem";
import { defenseDataUtils } from "utils/GameData/defenseDataUtils";
import { DefenseLog, useCacheDefenseLog } from "../../useCacheDefenseLog";

export interface DefenseDisplayData {
  id: string;
  defense: DefenseItem;
  updateDefense: (defenseID: string, currentLevelPos: number) => void;
  defenseStatus: DefenseStatus;
  spellCountList: SpellCountItem[][];
}

export interface DefenseCountLog {
  maxDefenseCount: number;
  remainingDefense: number;
  hiddenSettingDefenseCount: number;
  hiddenSearchQueryDefenseCount: number;
  hiddenImpossibleDestroyDefenseCount: number;
  hiddenEquipmentDestroyedDefenseCount: number;
  hiddenNormalDefenseCount: number;
}

function getAllDefenses(): DefenseItem[] {
  const defenseIDList = getAllDefenseIDs();

  return defenseIDList.map((defenseID) => initDefenseItem(defenseID));
}

function initDefenseLog(
  defenseItemList: DefenseItem[],
  tryCalculateAndStoreDefenseLog: (
    defenseID: string,
    currentLevelPos: number,
    offenseItemList: OffenseItem[],
    donatedLightningSpellItem: DonatedLightningSpellItem,
    earthquakeOrder: EarthquakeOrder
  ) => void,
  filteredOffenseItemList: OffenseItem[],
  donatedLightningSpellItem: DonatedLightningSpellItem,
  earthquakeOrder: EarthquakeOrder
): void {
  defenseItemList.forEach((defenseItem) => {
    const defenseID = defenseItem.defenseID;
    const currentLevelPos = defenseItem.currentLevelPos;

    tryCalculateAndStoreDefenseLog(
      defenseID,
      currentLevelPos,
      filteredOffenseItemList,
      donatedLightningSpellItem,
      earthquakeOrder
    );
  });
}

function initDefenseDisplayDataList(
  defenseItemList: DefenseItem[],
  retrieveOrRecalculateDefenseLog: (
    defenseID: string,
    currentLevelPos: number,
    offenseItemList: OffenseItem[],
    donatedLightningSpellItem: DonatedLightningSpellItem,
    earthquakeOrder: EarthquakeOrder
  ) => DefenseLog,
  filteredOffenseItemList: OffenseItem[],
  donatedLightningSpellItem: DonatedLightningSpellItem,
  earthquakeOrder: EarthquakeOrder,
  setDefenseItemList: React.Dispatch<React.SetStateAction<DefenseItem[]>>
): DefenseDisplayData[] {
  return defenseItemList.map((defense) => {
    const id = defense.id;
    const defenseID = defense.defenseID;
    const currentLevelPos = defense.currentLevelPos;

    const { defenseStatus, spellCountList } = retrieveOrRecalculateDefenseLog(
      defenseID,
      currentLevelPos,
      filteredOffenseItemList,
      donatedLightningSpellItem,
      earthquakeOrder
    );

    return {
      id: id,
      defense: defense,
      updateDefense: useCallback(
        (defenseID: string, currentLevelPos: number) => {
          setDefenseItemList((prevDefenseItemList) => {
            const updatedDefenseItem = updateDefenseItem(
              defenseID,
              currentLevelPos
            );

            return updateDefenseItemInList(
              updatedDefenseItem,
              prevDefenseItemList
            );
          });
        },
        []
      ),
      defenseStatus: defenseStatus,
      spellCountList: spellCountList,
    };
  });
}

function filterDefenseDisplayDataList(
  defenseDisplayDataList: DefenseDisplayData[],
  hideImpossibleDestroyDefense: boolean,
  hideEquipmentDestroyedDefense: boolean,
  hideNormalDefense: boolean,
  searchQuery: string
) {
  const defenseCountLog: DefenseCountLog = {
    maxDefenseCount: defenseDisplayDataList.length,
    remainingDefense: 0,
    hiddenSettingDefenseCount: 0,
    hiddenSearchQueryDefenseCount: 0,
    hiddenImpossibleDestroyDefenseCount: 0,
    hiddenEquipmentDestroyedDefenseCount: 0,
    hiddenNormalDefenseCount: 0,
  };

  const filteredDefenseDisplayDataList = defenseDisplayDataList.filter(
    (defenseDisplayData) => {
      const defenseStatus = defenseDisplayData.defenseStatus;

      if (searchQuery) {
        const defenseID = defenseDisplayData.defense.defenseID;
        const { getDefenseName } = defenseDataUtils(defenseID);

        if (
          !getDefenseName().toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          defenseCountLog.hiddenSearchQueryDefenseCount++;
          return false;
        }
      }

      if (
        hideImpossibleDestroyDefense &&
        defenseStatus === DEFENSE_STATUS.ImpossibleDestroy
      ) {
        defenseCountLog.hiddenImpossibleDestroyDefenseCount++;
        return false;
      }

      if (
        hideEquipmentDestroyedDefense &&
        defenseStatus === DEFENSE_STATUS.EquipmentDestroyed
      ) {
        defenseCountLog.hiddenEquipmentDestroyedDefenseCount++;
        return false;
      }

      if (hideNormalDefense && defenseStatus === DEFENSE_STATUS.Normal) {
        defenseCountLog.hiddenNormalDefenseCount++;
        return false;
      }

      return true;
    }
  );
  defenseCountLog.remainingDefense = filteredDefenseDisplayDataList.length;

  return [filteredDefenseDisplayDataList, defenseCountLog] as const;
}

export function useInitDefense(
  filteredOffenseItemList: OffenseItem[],
  donatedLightningSpellItem: DonatedLightningSpellItem,
  earthquakeOrder: EarthquakeOrder,
  hideImpossibleDestroyDefense: boolean,
  hideEquipmentDestroyedDefense: boolean,
  hideNormalDefense: boolean,
  searchQuery: string
) {
  const [defenseItemList, setDefenseItemList] = useState(getAllDefenses());
  const { tryCalculateAndStoreDefenseLog, retrieveOrRecalculateDefenseLog } =
    useCacheDefenseLog();

  initDefenseLog(
    defenseItemList,
    tryCalculateAndStoreDefenseLog,
    filteredOffenseItemList,
    donatedLightningSpellItem,
    earthquakeOrder
  );

  const defenseDisplayDataList = initDefenseDisplayDataList(
    defenseItemList,
    retrieveOrRecalculateDefenseLog,
    filteredOffenseItemList,
    donatedLightningSpellItem,
    earthquakeOrder,
    setDefenseItemList
  );

  const [filteredDefenseDisplayDataList, defenseCountLog] =
    filterDefenseDisplayDataList(
      defenseDisplayDataList,
      hideImpossibleDestroyDefense,
      hideEquipmentDestroyedDefense,
      hideNormalDefense,
      searchQuery
    );

  const setAllDefensesToMax = useCallback(() => {
    setDefenseItemList((prevDefenseItemList) => {
      return setAllDefenseItemsToMax(prevDefenseItemList);
    });
  }, []);

  const setAllDefensesToMin = useCallback(() => {
    setDefenseItemList((prevDefenseItemList) => {
      return setAllDefenseItemsToMin(prevDefenseItemList);
    });
  }, []);

  return [
    filteredDefenseDisplayDataList,
    defenseCountLog,
    setAllDefensesToMax,
    setAllDefensesToMin,
  ] as const;
}
