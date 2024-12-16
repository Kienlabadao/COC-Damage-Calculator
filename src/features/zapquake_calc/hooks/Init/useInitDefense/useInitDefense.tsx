import { createAndCalculateDefense } from "features/zapquake_calc/actions/DefenseItem";
import { EarthquakeOrder } from "features/zapquake_calc/data/constants";
import {
  DefenseItem,
  setAllDefenseItemsToMax,
  setAllDefenseItemsToMin,
  updateDefenseItemInList,
} from "features/zapquake_calc/objects/defenseItem";
import { DonatedLightningSpellItem } from "features/zapquake_calc/objects/donatedLightningSpellItem";
import { OffenseItem } from "features/zapquake_calc/objects/offenseItem";
import { useCallback, useState } from "react";
import { getAllDefenseIDs } from "utils/GameData/gameDataUtils";

function getAllDefenses(
  offenseItemList: OffenseItem[],
  donatedLightningSpellItem: DonatedLightningSpellItem,
  earthquakeOrder: EarthquakeOrder
): DefenseItem[] {
  const defenseIDList = getAllDefenseIDs();

  return defenseIDList.map((defenseID) =>
    createAndCalculateDefense(
      defenseID,
      offenseItemList,
      donatedLightningSpellItem,
      earthquakeOrder
    )
  );
}

export function useInitDefense(
  offenseItemList: OffenseItem[],
  donatedLightningSpellItem: DonatedLightningSpellItem,
  earthquakeOrder: EarthquakeOrder
) {
  const [defenseItemList, setDefenseItemList] = useState([
    ...getAllDefenses(
      offenseItemList,
      donatedLightningSpellItem,
      earthquakeOrder
    ),
  ]);

  const updateDefenseItem = useCallback(
    (defenseID: string, currentLevelPos: number) => {
      setDefenseItemList((prevDefenseItemList) => {
        return updateDefenseItemInList(
          prevDefenseItemList,
          defenseID,
          currentLevelPos
        );
      });
    },
    []
  );

  function setAllDefensesToMax() {
    setDefenseItemList((prevDefenseItemList) => {
      return setAllDefenseItemsToMax(prevDefenseItemList);
    });
  }

  function setAllDefensesToMin() {
    setDefenseItemList((prevDefenseItemList) => {
      return setAllDefenseItemsToMin(prevDefenseItemList);
    });
  }

  return [
    defenseItemList,
    updateDefenseItem,
    setAllDefensesToMax,
    setAllDefensesToMin,
  ] as const;
}
