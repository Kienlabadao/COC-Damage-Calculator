import { EQUIPMENT_TYPE, OFFENSE_TYPE, OffenseType } from "assets/data/game";
import { useLevelPosGameDataLocalStorage } from "features/zapquake_calc/utils/LocalStorageData/useLevelPosGameDataLocalStorage";
import { useState } from "react";
import { getAllEquipmentIDs, getAllSpellIDs } from "utils/gameDataUtils";

export interface OffenseItem {
  id: string;
  type: OffenseType;
  currentLevelPos: number;
  saveCurrentLevelPos: (newCurrentLevelPos: number) => number;
}

function getAllSpells(): OffenseItem[] {
  console.log("getAllSpells called");
  const spellIDList = getAllSpellIDs();

  return spellIDList.map((spellID) =>
    createOffenseItem(spellID, OFFENSE_TYPE.Spell)
  );
}

function getAllEquipments(): OffenseItem[] {
  console.log("getAllEquipments called");

  const equipmentIDList = getAllEquipmentIDs(new Set([EQUIPMENT_TYPE.Damage]));

  return equipmentIDList.map((equipmentID) =>
    createOffenseItem(equipmentID, OFFENSE_TYPE.Equipment)
  );
}

function createOffenseItem(offenseID: string, type: OffenseType): OffenseItem {
  console.log("createOffenseItem called");
  const { getOrStoreLevelPos, storeLevelPos } = useLevelPosGameDataLocalStorage(
    offenseID,
    type
  );
  const currentLevelPos = getOrStoreLevelPos();

  return {
    id: offenseID,
    type: type,
    currentLevelPos: currentLevelPos,
    saveCurrentLevelPos: (newCurrentLevelPos: number): number => {
      storeLevelPos(newCurrentLevelPos);
      return getOrStoreLevelPos();
    },
  };
}

export function useInitOffense() {
  console.log("useInitOffense called");
  const [offenseItemList, setOffenseItemList] = useState([
    ...getAllSpells(),
    ...getAllEquipments(),
  ]);

  function updateOffenseItemList(offenseID: string, currentLevelPos: number) {
    let isOffenseFound = false;

    setOffenseItemList((prevOffenseItemList) =>
      prevOffenseItemList.map((offense) => {
        if (offense.id === offenseID) {
          isOffenseFound = true;
          return {
            ...offense,
            currentLevelPos: offense.saveCurrentLevelPos(currentLevelPos),
          };
        } else {
          return offense;
        }
      })
    );

    if (!isOffenseFound) {
      console.log(
        `useInitOffense.updateOffenseItemList ERROR: No offense found with id ${offenseID}`
      );
    }
  }

  return [offenseItemList, updateOffenseItemList] as const;
}
