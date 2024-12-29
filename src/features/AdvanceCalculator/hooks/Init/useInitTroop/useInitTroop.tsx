import { OFFENSE_TYPE } from "data/game";
import {
  initOffenseItem,
  setAllOffenseItemsToMax,
  setAllOffenseItemsToMin,
  updateOffenseItem,
} from "features/advance_calc/actions/OffenseItem";
import {
  OffenseItem,
  updateOffenseItemInList,
} from "features/advance_calc/objects/offenseItem";
import { useCallback, useState } from "react";
import { getAllTroopIDs } from "utils/GameData/gameDataUtils";

const type = OFFENSE_TYPE.Troop;

function getAllTroops(): OffenseItem[] {
  const troopIDList = getAllTroopIDs();

  return troopIDList.map((troopID) => initOffenseItem(troopID, type));
}

export function useInitTroop() {
  const [troopItemList, setTroopItemList] = useState(getAllTroops());

  const updateTroop = useCallback(
    (troopID: string, currentLevelPos?: number) => {
      setTroopItemList((prevTroopItemList) => {
        const updatedTroopItem = updateOffenseItem(
          troopID,
          type,
          currentLevelPos
        );

        return updateOffenseItemInList(updatedTroopItem, prevTroopItemList);
      });
    },
    []
  );

  const setAllTroopsToMax = useCallback(() => {
    setTroopItemList((prevTroopItemList) => {
      return setAllOffenseItemsToMax(prevTroopItemList, new Set([type]));
    });
  }, []);

  const setAllTroopsToMin = useCallback(() => {
    setTroopItemList((prevTroopItemList) => {
      return setAllOffenseItemsToMin(prevTroopItemList, new Set([type]));
    });
  }, []);

  return [
    troopItemList,
    updateTroop,
    setAllTroopsToMax,
    setAllTroopsToMin,
  ] as const;
}
