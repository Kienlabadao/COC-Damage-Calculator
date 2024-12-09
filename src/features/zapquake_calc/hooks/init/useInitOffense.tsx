import { EQUIPMENT_TYPE, OFFENSE_TYPE } from "assets/data/game";
import {
  createOffenseItem,
  OffenseItem,
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

  function updateOffenseItemList(offenseID: string, currentLevelPos: number) {
    setOffenseItemList((prevOffenseItemList) => {
      return updateOffenseItemInList(
        prevOffenseItemList,
        offenseID,
        currentLevelPos
      );
    });
  }

  return [offenseItemList, updateOffenseItemList] as const;
}
