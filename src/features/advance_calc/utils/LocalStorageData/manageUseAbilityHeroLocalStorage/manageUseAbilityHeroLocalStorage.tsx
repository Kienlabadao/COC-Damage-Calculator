import { getUseAbilityHeroStorageKey } from "../../advanceCalcUtils";
import { DEFAULT_USE_ABILITY_HERO } from "features/advance_calc/config";
import { manageUseOffenseLocalStorage } from "utils/LocalStorageData/manageUseOffenseLocalStorage";

export function manageUseAbilityHeroLocalStorage(heroID: string) {
  const key = getUseAbilityHeroStorageKey(heroID);
  const defaultUseEquipment = DEFAULT_USE_ABILITY_HERO;

  return manageUseOffenseLocalStorage(key, defaultUseEquipment);
}
