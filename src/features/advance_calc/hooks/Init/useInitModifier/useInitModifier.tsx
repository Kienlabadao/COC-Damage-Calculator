import {
  initModifierItem,
  setAllModifierItemsToMax,
  setAllModifierItemsToMin,
  updateModifierItem,
} from "features/advance_calc/actions/ModifierItem";
import {
  ModifierItem,
  updateModifierItemInList,
} from "features/advance_calc/objects/modifierItem";
import { useCallback, useState } from "react";
import { getAllModifierIDs } from "utils/GameData/gameDataUtils";

function getModifierItemList(): ModifierItem[] {
  const modifierIDList = getAllModifierIDs();

  return modifierIDList.map((modifierID) => initModifierItem(modifierID));
}

export function useInitModifier() {
  const [modifierItemList, setModifierItemList] = useState(
    getModifierItemList()
  );

  const updateModifier = useCallback(
    (modifierID: string, currentLevelPos?: number, use?: boolean) => {
      setModifierItemList((prevModifierItemList) => {
        const updatedModifierItem = updateModifierItem(
          modifierID,
          currentLevelPos,
          use
        );

        return updateModifierItemInList(
          updatedModifierItem,
          prevModifierItemList
        );
      });
    },
    []
  );

  const setAllModifiersToMax = useCallback(() => {
    setModifierItemList((prevModifierItemList) => {
      return setAllModifierItemsToMax(prevModifierItemList);
    });
  }, []);

  const setAllModifiersToMin = useCallback(() => {
    setModifierItemList((prevModifierItemList) => {
      return setAllModifierItemsToMin(prevModifierItemList);
    });
  }, []);

  return [
    modifierItemList,
    updateModifier,
    setAllModifiersToMax,
    setAllModifiersToMin,
  ] as const;
}
