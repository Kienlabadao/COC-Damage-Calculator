import {
  createDefenseItem,
  DefenseItem,
  setAllDefenseItemsToMax,
  setAllDefenseItemsToMin,
  updateDefenseItemInList,
} from "features/zapquake_calc/utils/defenseItemUtils";
import { useCallback, useState } from "react";
import { getAllDefenseIDs } from "utils/GameData/gameDataUtils";

function getAllDefenses(): DefenseItem[] {
  const defenseIDList = getAllDefenseIDs();

  return defenseIDList.map((defenseID) => createDefenseItem(defenseID));
}

export function useInitDefense() {
  const [defenseItemList, setDefenseItemList] = useState([...getAllDefenses()]);

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
