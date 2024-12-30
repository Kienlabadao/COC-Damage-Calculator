import { GAME_DATA_TYPE } from "data/Game";
import { DefenseItem } from "features/ZapquakeCalculator/objects/defenseItem";
import { manageZapquakeCalcLevelPosGameDataLocalStorage } from "features/ZapquakeCalculator/utils/LocalStorageData/manageZapquakeCalcLevelPosGameDataLocalStorage";
import { initDefenseItem } from "../initDefenseItem";

export function updateDefenseItem(
  defenseID: string,
  newCurrentLevelPos: number
): DefenseItem {
  const { storeLevelPos } = manageZapquakeCalcLevelPosGameDataLocalStorage(
    defenseID,
    GAME_DATA_TYPE.Defense
  );
  storeLevelPos(newCurrentLevelPos);

  return initDefenseItem(defenseID);
}
