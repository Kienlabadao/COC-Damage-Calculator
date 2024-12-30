import { GAME_DATA_TYPE } from "data/Game";
import { DefenseItem } from "features/ZapquakeCalculator/objects/defenseItem";
import { getGameDataMinLevelPos } from "utils/GameData/gameDataUtils";
import { initDefenseItem } from "../initDefenseItem";
import { manageZapquakeCalcLevelPosGameDataLocalStorage } from "features/ZapquakeCalculator/utils/LocalStorageData/manageZapquakeCalcLevelPosGameDataLocalStorage";

export function setAllDefenseItemsToMin(
  defenseItemList: DefenseItem[]
): DefenseItem[] {
  return defenseItemList.map((defense) => {
    const defenseID = defense.defenseID;
    const minLevelPos = getGameDataMinLevelPos(
      defenseID,
      GAME_DATA_TYPE.Defense
    );

    const { storeLevelPos } = manageZapquakeCalcLevelPosGameDataLocalStorage(
      defenseID,
      GAME_DATA_TYPE.Defense
    );
    storeLevelPos(minLevelPos);

    return initDefenseItem(defenseID);
  });
}
