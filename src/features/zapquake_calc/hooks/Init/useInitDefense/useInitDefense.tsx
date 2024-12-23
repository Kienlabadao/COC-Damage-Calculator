import {
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

function getAllDefenses(): DefenseItem[] {
  const defenseIDList = getAllDefenseIDs();

  return defenseIDList.map((defenseID) => initDefenseItem(defenseID));
}

export function useInitDefense() {
  const [defenseItemList, setDefenseItemList] = useState(getAllDefenses());

  const updateDefense = useCallback(
    (defenseID: string, currentLevelPos: number) => {
      setDefenseItemList((prevDefenseItemList) => {
        const updatedDefenseItem = updateDefenseItem(
          defenseID,
          currentLevelPos
        );

        return updateDefenseItemInList(updatedDefenseItem, prevDefenseItemList);
      });
    },
    []
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
    defenseItemList,
    updateDefense,
    setAllDefensesToMax,
    setAllDefensesToMin,
  ] as const;
}
