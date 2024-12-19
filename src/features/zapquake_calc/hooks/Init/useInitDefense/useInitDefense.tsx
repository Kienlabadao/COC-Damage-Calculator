import {
  DEFENSE_STATUS,
  DefenseStatus,
  initDefenseItem,
  setAllDefenseItemsToMax,
  setAllDefenseItemsToMin,
  updateDefenseItem,
} from "features/zapquake_calc/actions/DefenseItem";
import { DefenseItem } from "features/zapquake_calc/objects/defenseItem";
import { useCallback, useState } from "react";
import { getAllDefenseIDs } from "utils/GameData/gameDataUtils";
import { useCacheDefenseLog } from "../../useCacheDefenseLog";
import { OffenseItem } from "features/zapquake_calc/objects/offenseItem";
import { DonatedLightningSpellItem } from "features/zapquake_calc/objects/donatedLightningSpellItem";
import { EarthquakeOrder } from "features/zapquake_calc/data/constants";
import { SpellCountItem } from "features/zapquake_calc/objects/spellCountItem";

export interface DefenseDisplayData {
  id: string;
  defense: DefenseItem;
  updateDefense: (defenseID: string, currentLevelPos: number) => void;
  defenseStatus: DefenseStatus;
  spellCountList: SpellCountItem[][];
}

function getAllDefenses(): DefenseItem[] {
  const defenseIDList = getAllDefenseIDs();

  return defenseIDList.map((defenseID) => initDefenseItem(defenseID));
}

export function useInitDefense(
  filteredOffenseItemList: OffenseItem[],
  donatedLightningSpellItem: DonatedLightningSpellItem,
  earthquakeOrder: EarthquakeOrder,
  hideImpossibleDestroyDefense: boolean,
  hideEquipmentDestroyedDefense: boolean,
  hideNormalDefense: boolean
) {
  const [defenseItemList, setDefenseItemList] = useState(getAllDefenses());
  const { tryCalculateAndStoreDefenseLog, retrieveOrRecalculateDefenseLog } =
    useCacheDefenseLog();

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

  let defenseDisplayDataList: DefenseDisplayData[] = defenseItemList.map(
    (defense) => {
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
              return updateDefenseItem(
                defenseID,
                currentLevelPos,
                prevDefenseItemList
              );
            });
          },
          []
        ),
        defenseStatus: defenseStatus,
        spellCountList: spellCountList,
      };
    }
  );

  let hiddenImpossibleDestroyDefenseCount = 0;
  let hiddenEquipmentDestroyedDefenseCount = 0;
  let hiddenNormalDefenseCount = 0;
  defenseDisplayDataList = defenseDisplayDataList.filter(
    (defenseDisplayData) => {
      const defenseStatus = defenseDisplayData.defenseStatus;

      if (
        hideImpossibleDestroyDefense &&
        defenseStatus === DEFENSE_STATUS.ImpossibleDestroy
      ) {
        hiddenImpossibleDestroyDefenseCount++;
        return false;
      }

      if (
        hideEquipmentDestroyedDefense &&
        defenseStatus === DEFENSE_STATUS.EquipmentDestroyed
      ) {
        hiddenEquipmentDestroyedDefenseCount++;
        return false;
      }

      if (hideNormalDefense && defenseStatus === DEFENSE_STATUS.Normal) {
        hiddenNormalDefenseCount++;
        return false;
      }

      return true;
    }
  );
  console.log("hiddenImpossibleDestroyDefenseCount");
  console.log(hiddenImpossibleDestroyDefenseCount);
  console.log("hiddenEquipmentDestroyedDefenseCount");
  console.log(hiddenEquipmentDestroyedDefenseCount);
  console.log("hiddenNormalDefenseCount");
  console.log(hiddenNormalDefenseCount);

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
    defenseDisplayDataList,
    setAllDefensesToMax,
    setAllDefensesToMin,
  ] as const;
}
