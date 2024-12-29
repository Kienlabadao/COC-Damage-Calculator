import { OFFENSE_TYPE } from "data/game";
import {
  createHeroItem,
  HeroItem,
} from "features/advance_calc/objects/heroItem";
import { manageAdvanceCalcLevelPosGameDataLocalStorage } from "features/advance_calc/utils/LocalStorageData/manageAdvanceCalcLevelPosGameDataLocalStorage";
import { manageUseAbilityHeroLocalStorage } from "features/advance_calc/utils/LocalStorageData/manageUseAbilityHeroLocalStorage";

export function initHeroItem(heroID: string): HeroItem {
  const { getOrStoreLevelPos } = manageAdvanceCalcLevelPosGameDataLocalStorage(
    heroID,
    OFFENSE_TYPE.Hero
  );
  const currentLevelPos = getOrStoreLevelPos();

  const { getOrStoreUseOffense } = manageUseAbilityHeroLocalStorage(heroID);
  const useAbility = getOrStoreUseOffense();

  return createHeroItem(heroID, currentLevelPos, useAbility);
}
