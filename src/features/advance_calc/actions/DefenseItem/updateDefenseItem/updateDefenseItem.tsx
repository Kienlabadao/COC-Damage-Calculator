import { GAME_DATA_TYPE } from "data/game";
import { DefenseItem } from "features/advance_calc/objects/defenseItem";
import { manageAdvanceCalcLevelPosGameDataLocalStorage } from "features/advance_calc/utils/LocalStorageData/manageAdvanceCalcLevelPosGameDataLocalStorage";
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
