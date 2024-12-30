import { OFFENSE_TYPE } from "data/Game";
import {
  initOffenseItem,
  setAllOffenseItemsToMax,
  setAllOffenseItemsToMin,
  updateOffenseItem,
} from "features/AdvanceCalculator/actions/OffenseItem";
import {
  OffenseItem,
  updateOffenseItemInList,
} from "features/AdvanceCalculator/objects/offenseItem";
import { useCallback, useState } from "react";
import { getAllSpellIDs } from "utils/GameData/gameDataUtils";

const type = OFFENSE_TYPE.Spell;

function getAllSpells(): OffenseItem[] {
  const spellIDList = getAllSpellIDs();

  return spellIDList.map((spellID) => initOffenseItem(spellID, type));
}

export function useInitSpell() {
  const [spellItemList, setSpellItemList] = useState(getAllSpells());

  const updateSpell = useCallback(
    (spellID: string, currentLevelPos?: number) => {
      setSpellItemList((prevSpellItemList) => {
        const updatedSpellItem = updateOffenseItem(
          spellID,
          type,
          currentLevelPos
        );

        return updateOffenseItemInList(updatedSpellItem, prevSpellItemList);
      });
    },
    []
  );

  const setAllSpellsToMax = useCallback(() => {
    setSpellItemList((prevSpellItemList) => {
      return setAllOffenseItemsToMax(prevSpellItemList, new Set([type]));
    });
  }, []);

  const setAllSpellsToMin = useCallback(() => {
    setSpellItemList((prevSpellItemList) => {
      return setAllOffenseItemsToMin(prevSpellItemList, new Set([type]));
    });
  }, []);

  return [
    spellItemList,
    updateSpell,
    setAllSpellsToMax,
    setAllSpellsToMin,
  ] as const;
}
