import { Hero } from "data/game";
import {
  initEquipmentItem,
  setAllEquipmentItemsToMax,
  setAllEquipmentItemsToMin,
  updateEquipmentItem,
} from "features/advance_calc/actions/EquipmentItem";
import {
  EquipmentItem,
  updateEquipmentItemInList,
} from "features/advance_calc/objects/equipmentItem";
import { useCallback, useState } from "react";
import { getAllEquipmentIDs } from "utils/GameData/gameDataUtils";

function getEquipmentItemList(hero: Hero): EquipmentItem[] {
  const equipmentIDList = getAllEquipmentIDs(undefined, hero);

  return equipmentIDList.map((equipmentID) => initEquipmentItem(equipmentID));
}

export function useInitEquipment(hero: Hero) {
  const [equipmentItemList, setEquipmentItemList] = useState(
    getEquipmentItemList(hero)
  );

  const updateEquipment = useCallback(
    (equipmentID: string, currentLevelPos?: number, use?: boolean) => {
      setEquipmentItemList((prevEquipmentItemList) => {
        const updatedEquipmentItem = updateEquipmentItem(
          equipmentID,
          currentLevelPos,
          use
        );

        return updateEquipmentItemInList(
          updatedEquipmentItem,
          prevEquipmentItemList
        );
      });
    },
    []
  );

  const setAllEquipmentsToMax = useCallback(() => {
    setEquipmentItemList((prevEquipmentItemList) => {
      return setAllEquipmentItemsToMax(prevEquipmentItemList);
    });
  }, []);

  const setAllEquipmentsToMin = useCallback(() => {
    setEquipmentItemList((prevEquipmentItemList) => {
      return setAllEquipmentItemsToMin(prevEquipmentItemList);
    });
  }, []);

  return [
    equipmentItemList,
    updateEquipment,
    setAllEquipmentsToMax,
    setAllEquipmentsToMin,
  ] as const;
}
