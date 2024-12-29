import {
  initRepairItem,
  setAllRepairItemsToMax,
  setAllRepairItemsToMin,
  updateRepairItem,
} from "features/advance_calc/actions/RepairItem";
import {
  RepairItem,
  updateRepairItemInList,
} from "features/advance_calc/objects/repairItem";
import { useCallback, useState } from "react";
import { getAllRepairIDs } from "utils/GameData/gameDataUtils";

function getAllRepairs(): RepairItem[] {
  const repairIDList = getAllRepairIDs();

  return repairIDList.map((repairID) => initRepairItem(repairID));
}

export function useInitRepair() {
  const [repairItemList, setRepairItemList] = useState(getAllRepairs());

  const updateRepair = useCallback(
    (repairID: string, currentLevelPos?: number) => {
      setRepairItemList((prevRepairItemList) => {
        const updatedRepairItem = updateRepairItem(repairID, currentLevelPos);

        return updateRepairItemInList(updatedRepairItem, prevRepairItemList);
      });
    },
    []
  );

  const setAllRepairsToMax = useCallback(() => {
    setRepairItemList((prevRepairItemList) => {
      return setAllRepairItemsToMax(prevRepairItemList);
    });
  }, []);

  const setAllRepairsToMin = useCallback(() => {
    setRepairItemList((prevRepairItemList) => {
      return setAllRepairItemsToMin(prevRepairItemList);
    });
  }, []);

  return [
    repairItemList,
    updateRepair,
    setAllRepairsToMax,
    setAllRepairsToMin,
  ] as const;
}
