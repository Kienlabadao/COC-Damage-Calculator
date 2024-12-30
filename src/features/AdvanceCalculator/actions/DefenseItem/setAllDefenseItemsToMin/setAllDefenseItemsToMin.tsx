import { GAME_DATA_TYPE } from "data/Game";
import { DefenseItem } from "features/AdvanceCalculator/objects/defenseItem";
import { manageAdvanceCalcLevelPosGameDataLocalStorage } from "features/AdvanceCalculator/utils/LocalStorageData/manageAdvanceCalcLevelPosGameDataLocalStorage";
import { getGameDataMinLevelPos } from "utils/GameData/gameDataUtils";
import { initDefenseItem } from "../initDefenseItem";

export function setAllDefenseItemsToMin(
  defenseItemList: DefenseItem[]
): DefenseItem[] {
  return defenseItemList.map((defense) => {
    const defenseID = defense.defenseID;
    const minLevelPos = getGameDataMinLevelPos(
      defenseID,
      GAME_DATA_TYPE.Defense
    );

    const { storeLevelPos } = manageAdvanceCalcLevelPosGameDataLocalStorage(
      defenseID,
      GAME_DATA_TYPE.Defense
    );
    storeLevelPos(minLevelPos);

    return initDefenseItem(defenseID);
  });
}
