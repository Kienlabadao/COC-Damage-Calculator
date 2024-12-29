import { Hero } from "data/game";
import {
  initEquipmentItem,
  setAllEquipmentItemsToMax,
  setAllEquipmentItemsToMin,
  updateEquipmentItem,
} from "features/advance_calc/actions/EquipmentItem";
import { setAllEquipmentItemsToUnuse } from "features/advance_calc/actions/EquipmentItem/setAllEquipmentItemsToUnuse";
import { setAllEquipmentItemsToUse } from "features/advance_calc/actions/EquipmentItem/setAllEquipmentItemsToUse";
import {
  EquipmentItem,
  updateEquipmentItemInList,
} from "features/advance_calc/objects/equipmentItem";
import { useCallback, useEffect, useState } from "react";
import { getAllEquipmentIDs } from "utils/GameData/gameDataUtils";

function getEquipmentItemList(
  hero: Hero,
  useHardMode: boolean
): EquipmentItem[] {
  const equipmentIDList = getAllEquipmentIDs(undefined, hero);

  return equipmentIDList.map((equipmentID) =>
    initEquipmentItem(equipmentID, useHardMode)
  );
}

export function useInitEquipment(hero: Hero, useHardMode: boolean) {
  const [equipmentItemList, setEquipmentItemList] = useState(
    getEquipmentItemList(hero, useHardMode)
  );

  useEffect(() => {
    setEquipmentItemList(getEquipmentItemList(hero, useHardMode));
  }, [useHardMode]);

  const updateEquipment = useCallback(
    (equipmentID: string, currentLevelPos?: number, use?: boolean) => {
      setEquipmentItemList((prevEquipmentItemList) => {
        const updatedEquipmentItem = updateEquipmentItem(
          equipmentID,
          useHardMode,
          currentLevelPos,
          use
        );

        return updateEquipmentItemInList(
          updatedEquipmentItem,
          prevEquipmentItemList
        );
      });
    },
    [useHardMode]
  );

  const setAllEquipmentsToMax = useCallback(() => {
    setEquipmentItemList((prevEquipmentItemList) => {
      return setAllEquipmentItemsToMax(prevEquipmentItemList, useHardMode);
    });
  }, [useHardMode]);

  const setAllEquipmentsToMin = useCallback(() => {
    setEquipmentItemList((prevEquipmentItemList) => {
      return setAllEquipmentItemsToMin(prevEquipmentItemList, useHardMode);
    });
  }, [useHardMode]);

  const setAllEquipmentsToUse = useCallback(() => {
    setEquipmentItemList((prevEquipmentItemList) => {
      return setAllEquipmentItemsToUse(prevEquipmentItemList, useHardMode);
    });
  }, [useHardMode]);

  const setAllEquipmentsToUnuse = useCallback(() => {
    setEquipmentItemList((prevEquipmentItemList) => {
      return setAllEquipmentItemsToUnuse(prevEquipmentItemList, useHardMode);
    });
  }, [useHardMode]);

  return [
    equipmentItemList,
    updateEquipment,
    setAllEquipmentsToMax,
    setAllEquipmentsToMin,
    setAllEquipmentsToUse,
    setAllEquipmentsToUnuse,
  ] as const;
}
