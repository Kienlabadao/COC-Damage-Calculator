import { OFFENSE_TYPE, OffenseType, SPELL } from "data/Game";
import {
  DEFAULT_USE_SPELL,
  DEFAULT_USE_EQUIPMENT,
  DEFAULT_USE_DONATED_LIGHTNING_SPELL,
} from "features/ZapquakeCalculator/config/config";
import { manageUseOffenseLocalStorage } from "utils/LocalStorageData/manageUseOffenseLocalStorage";
import { getZapquakeCalcUseOffenseStorageKey } from "../../zapquakeCalcUtils";

export function manageZapquakeCalcUseOffenseLocalStorage(
  gameDataID: string,
  type: OffenseType,
  isDonated: boolean = false
) {
  const key = getZapquakeCalcUseOffenseStorageKey(gameDataID, type, isDonated);

  let defaultUseOffense: boolean;
  switch (type) {
    case OFFENSE_TYPE.Spell:
      if (isDonated && gameDataID === SPELL.LightningSpell) {
        defaultUseOffense = DEFAULT_USE_DONATED_LIGHTNING_SPELL;
      } else {
        defaultUseOffense = DEFAULT_USE_SPELL;
      }
      break;
    case OFFENSE_TYPE.Equipment:
      defaultUseOffense = DEFAULT_USE_EQUIPMENT;
      break;
    default:
      throw new Error(
        `getZapquakeCalcUseOffenseStorageKey.ERROR: OffenseType (${type}) is not supported.`
      );
  }

  return manageUseOffenseLocalStorage(key, defaultUseOffense);
}
