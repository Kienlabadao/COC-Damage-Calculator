import {
  initDefenseItem,
  setAllDefenseItemsToMax,
  setAllDefenseItemsToMin,
  updateDefenseItem,
} from "features/zapquake_calc/actions/DefenseItem";
import { EarthquakeOrder } from "features/zapquake_calc/data/constants";
import { DefenseItem } from "features/zapquake_calc/objects/defenseItem";
import { DonatedLightningSpellItem } from "features/zapquake_calc/objects/donatedLightningSpellItem";
import { OffenseItem } from "features/zapquake_calc/objects/offenseItem";
import { useCallback, useEffect, useState } from "react";
import { getAllDefenseIDs } from "utils/GameData/gameDataUtils";

function getAllDefenses(
  offenseItemList: OffenseItem[],
  donatedLightningSpellItem: DonatedLightningSpellItem,
  earthquakeOrder: EarthquakeOrder
): DefenseItem[] {
  const defenseIDList = getAllDefenseIDs();

  return defenseIDList.map((defenseID) =>
    initDefenseItem(
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
  // Init defenseItemList
  const [defenseItemList, setDefenseItemList] = useState([
    ...getAllDefenses(
      offenseItemList,
      donatedLightningSpellItem,
      earthquakeOrder
    ),
  ]);

  // Update defenseItemList when something related to offense changed
  useEffect(() => {
    setDefenseItemList([
      ...getAllDefenses(
        offenseItemList,
        donatedLightningSpellItem,
        earthquakeOrder
      ),
    ]);
  }, [offenseItemList, donatedLightningSpellItem, earthquakeOrder]);

  // Update defense in list
  const updateDefense = useCallback(
    (defenseID: string, currentLevelPos: number) => {
      setDefenseItemList((prevDefenseItemList) => {
        return updateDefenseItem(
          defenseID,
          currentLevelPos,
          prevDefenseItemList,
          offenseItemList,
          donatedLightningSpellItem,
          earthquakeOrder
        );
      });
    },
    [offenseItemList, donatedLightningSpellItem, earthquakeOrder]
  );

  function setAllDefensesToMax() {
    setDefenseItemList((prevDefenseItemList) => {
      return setAllDefenseItemsToMax(
        prevDefenseItemList,
        offenseItemList,
        donatedLightningSpellItem,
        earthquakeOrder
      );
    });
  }

  function setAllDefensesToMin() {
    setDefenseItemList((prevDefenseItemList) => {
      return setAllDefenseItemsToMin(
        prevDefenseItemList,
        offenseItemList,
        donatedLightningSpellItem,
        earthquakeOrder
      );
    });
  }

  return [
    defenseItemList,
    updateDefense,
    setAllDefensesToMax,
    setAllDefensesToMin,
  ] as const;
}
