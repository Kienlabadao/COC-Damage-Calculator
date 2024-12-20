import { OFFENSE_TYPE, OffenseType } from "data/game";
import {
  initOffenseItem,
  setAllOffenseItemsToMax,
  setAllOffenseItemsToMin,
  updateOffenseItem,
} from "features/advance_calc/actions/OffenseItem";
import { OffenseItem } from "features/advance_calc/objects/offenseItem";
import { useCallback, useState } from "react";
import {
  getAllEquipmentIDs,
  getAllHeroIDs,
  getAllSpellIDs,
  getAllTroopIDs,
} from "utils/GameData/gameDataUtils";

function getAllSpells(): OffenseItem[] {
  const spellIDList = getAllSpellIDs();

  return spellIDList.map((spellID) =>
    initOffenseItem(spellID, OFFENSE_TYPE.Spell)
  );
}

function getAllTroops(): OffenseItem[] {
  const troopIDList = getAllTroopIDs();

  return troopIDList.map((troopID) =>
    initOffenseItem(troopID, OFFENSE_TYPE.Troop)
  );
}

function getAllHeroes(): OffenseItem[] {
  const heroIDList = getAllHeroIDs();

  return heroIDList.map((heroID) => initOffenseItem(heroID, OFFENSE_TYPE.Hero));
}

function getAllEquipments(): OffenseItem[] {
  const equipmentIDList = getAllEquipmentIDs();

  return equipmentIDList.map((equipmentID) =>
    initOffenseItem(equipmentID, OFFENSE_TYPE.Equipment)
  );
}

export function useInitOffense(
  offenseTypeList: Set<OffenseType> = new Set([])
) {
  const [offenseItemList, setOffenseItemList] = useState(() => {
    const offenseMap = [
      [OFFENSE_TYPE.Spell, getAllSpells],
      [OFFENSE_TYPE.Troop, getAllTroops],
      [OFFENSE_TYPE.Hero, getAllHeroes],
      [OFFENSE_TYPE.Equipment, getAllEquipments],
    ] as const;

    return offenseTypeList.size === 0
      ? [
          ...getAllSpells(),
          ...getAllTroops(),
          ...getAllHeroes(),
          ...getAllEquipments(),
        ]
      : offenseMap
          .filter(([type]) => offenseTypeList.has(type))
          .flatMap(([, getItems]) => getItems());
  });

  const updateOffense = useCallback(
    (offenseID: string, type: OffenseType, currentLevelPos?: number) => {
      setOffenseItemList((prevOffenseItemList) => {
        return updateOffenseItem(
          offenseID,
          type,
          prevOffenseItemList,
          currentLevelPos
        );
      });
    },
    []
  );

  const setAllOffensesToMax = useCallback(
    (offenseTypeFilterList: Set<OffenseType>) => {
      setOffenseItemList((prevOffenseItemList) => {
        return setAllOffenseItemsToMax(
          prevOffenseItemList,
          offenseTypeFilterList
        );
      });
    },
    []
  );

  const setAllOffensesToMin = useCallback(
    (offenseTypeFilterList: Set<OffenseType>) => {
      setOffenseItemList((prevOffenseItemList) => {
        return setAllOffenseItemsToMin(
          prevOffenseItemList,
          offenseTypeFilterList
        );
      });
    },
    []
  );

  return [
    offenseItemList,
    updateOffense,
    setAllOffensesToMax,
    setAllOffensesToMin,
  ] as const;
}
