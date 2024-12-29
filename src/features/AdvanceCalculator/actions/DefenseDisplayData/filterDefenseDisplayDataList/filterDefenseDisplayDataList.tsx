import {
  createDefenseCountLog,
  DefenseCountLog,
} from "features/advance_calc/objects/defenseCountLog";
import { DefenseDisplayData } from "features/advance_calc/objects/defenseDisplayData";
import { DEFENSE_STATUS } from "features/advance_calc/objects/defenseLog";
import { defenseDataUtils } from "utils/GameData/defenseDataUtils";

export function filterDefenseDisplayDataList(
  defenseDisplayDataList: DefenseDisplayData[],
  hideSurvivedDefense: boolean,
  hideDestroyedDefense: boolean,
  searchQuery: string
): {
  filteredDefenseDisplayDataList: DefenseDisplayData[];
  defenseCountLog: DefenseCountLog;
} {
  const defenseCountLog = createDefenseCountLog(defenseDisplayDataList.length);

  const filteredDefenseDisplayDataList = defenseDisplayDataList.filter(
    (defenseDisplayData) => {
      const defenseStatus = defenseDisplayData.defenseLog.defenseStatus;

      if (searchQuery) {
        const defenseID = defenseDisplayData.defenseItem.defenseID;
        const { getDefenseName } = defenseDataUtils(defenseID);

        if (
          !getDefenseName().toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          defenseCountLog.hiddenSearchQueryDefenseCount++;
          return false;
        }
      }

      if (hideSurvivedDefense && defenseStatus === DEFENSE_STATUS.Survived) {
        defenseCountLog.hiddenSurvivedDefenseCount++;
        return false;
      }

      if (hideDestroyedDefense && defenseStatus === DEFENSE_STATUS.Destroyed) {
        defenseCountLog.hiddenDestroyedDefenseCount++;
        return false;
      }

      return true;
    }
  );
  defenseCountLog.remainingDefense = filteredDefenseDisplayDataList.length;

  return { filteredDefenseDisplayDataList, defenseCountLog };
}
