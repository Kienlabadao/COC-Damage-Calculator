import { GAME_DATA_TYPE, GameDataType } from "data/game";
import { getAdvanceCalcUseGameDataStorageKey } from "../../advanceCalcUtils";
import { DEFAULT_USE_EQUIPMENT } from "features/advance_calc/config";
import { manageUseOffenseLocalStorage } from "utils/LocalStorageData/manageUseOffenseLocalStorage";

export function manageAdvanceCalcUseGameDataLocalStorage(
  equipmentID: string,
  type: GameDataType
) {
  if (type === GAME_DATA_TYPE.Equipment || type === GAME_DATA_TYPE.Modifier) {
    const key = getAdvanceCalcUseGameDataStorageKey(equipmentID, type);
    const defaultUseEquipment = DEFAULT_USE_EQUIPMENT;

    return manageUseOffenseLocalStorage(key, defaultUseEquipment);
  } else {
    throw new Error(
      `manageAdvanceCalcUseGameDataLocalStorage ERROR: type (${type}) is not supported.`
    );
  }
}
