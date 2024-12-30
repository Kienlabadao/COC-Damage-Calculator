import { GAME_DATA_TYPE } from "data/Game";
import { DefenseItem } from "features/AdvanceCalculator/objects/defenseItem";
import { manageAdvanceCalcLevelPosGameDataLocalStorage } from "features/AdvanceCalculator/utils/LocalStorageData/manageAdvanceCalcLevelPosGameDataLocalStorage";
import { initDefenseItem } from "../initDefenseItem";

export function updateDefenseItem(
  defenseID: string,
  newCurrentLevelPos: number
): DefenseItem {
  const { storeLevelPos } = manageAdvanceCalcLevelPosGameDataLocalStorage(
    defenseID,
    GAME_DATA_TYPE.Defense
  );
  storeLevelPos(newCurrentLevelPos);

  return initDefenseItem(defenseID);
}
