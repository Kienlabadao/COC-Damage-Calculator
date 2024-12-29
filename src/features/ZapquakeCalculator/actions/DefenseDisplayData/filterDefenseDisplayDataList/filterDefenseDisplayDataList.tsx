import {
  createDefenseCountLog,
  DefenseCountLog,
} from "features/zapquake_calc/objects/defenseCountLog";
import { DefenseDisplayData } from "features/zapquake_calc/objects/defenseDisplayData";
import { DEFENSE_STATUS } from "features/zapquake_calc/objects/defenseLog";
import { defenseDataUtils } from "utils/GameData/defenseDataUtils";

export function filterDefenseDisplayDataList(
  defenseDisplayDataList: DefenseDisplayData[],
  hideImpossibleDestroyDefense: boolean,
  hideEquipmentDestroyedDefense: boolean,
  hideNormalDefense: boolean,
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

      if (
        hideImpossibleDestroyDefense &&
        defenseStatus === DEFENSE_STATUS.ImpossibleDestroy
      ) {
        defenseCountLog.hiddenImpossibleDestroyDefenseCount++;
        return false;
      }

      if (
        hideEquipmentDestroyedDefense &&
        defenseStatus === DEFENSE_STATUS.EquipmentDestroyed
      ) {
        defenseCountLog.hiddenEquipmentDestroyedDefenseCount++;
        return false;
      }

      if (hideNormalDefense && defenseStatus === DEFENSE_STATUS.Normal) {
        defenseCountLog.hiddenNormalDefenseCount++;
        return false;
      }

      return true;
    }
  );
  defenseCountLog.remainingDefense = filteredDefenseDisplayDataList.length;

  return { filteredDefenseDisplayDataList, defenseCountLog };
}
