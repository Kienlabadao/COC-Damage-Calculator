import { EQUIPMENT_TYPE, OFFENSE_TYPE, OffenseType } from "assets/data/game";
import {
  createOffenseItem,
  OffenseItem,
  setAllOffenseItemsToMax,
  setAllOffenseItemsToMin,
  updateOffenseItemInList,
} from "features/zapquake_calc/utils/offenseItemUtils";
import { useState } from "react";
import {
  getAllEquipmentIDs,
  getAllSpellIDs,
} from "utils/GameData/gameDataUtils";

function getAllSpells(): OffenseItem[] {
  const spellIDList = getAllSpellIDs();

  return spellIDList.map((spellID) =>
    createOffenseItem(spellID, OFFENSE_TYPE.Spell)
  );
}

function getAllEquipments(): OffenseItem[] {
  const equipmentIDList = getAllEquipmentIDs(new Set([EQUIPMENT_TYPE.Damage]));

  return equipmentIDList.map((equipmentID) =>
    createOffenseItem(equipmentID, OFFENSE_TYPE.Equipment)
  );
}

export function useInitOffense() {
  const [offenseItemList, setOffenseItemList] = useState([
    ...getAllSpells(),
    ...getAllEquipments(),
  ]);

  function updateOffenseItemList(
    offenseID: string,
    currentLevelPos?: number,
    useOffense?: boolean
  ) {
    setOffenseItemList((prevOffenseItemList) => {
      return updateOffenseItemInList(
        prevOffenseItemList,
        offenseID,
        currentLevelPos,
        useOffense
      );
    });
  }

  function setAllOffensesToMax(offenseTypeFilterList: Set<OffenseType>) {
    setOffenseItemList((prevOffenseItemList) => {
      return setAllOffenseItemsToMax(
        prevOffenseItemList,
        offenseTypeFilterList
      );
    });
  }

  function setAllOffensesToMin(offenseTypeFilterList: Set<OffenseType>) {
    setOffenseItemList((prevOffenseItemList) => {
      return setAllOffenseItemsToMin(
        prevOffenseItemList,
        offenseTypeFilterList
      );
    });
  }

  return [
    offenseItemList,
    updateOffenseItemList,
    setAllOffensesToMax,
    setAllOffensesToMin,
  ] as const;
}
