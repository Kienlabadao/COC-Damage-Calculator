import { OFFENSE_TYPE } from "data/Game";
import {
  createHeroItem,
  HeroItem,
} from "features/AdvanceCalculator/objects/heroItem";
import { manageAdvanceCalcLevelPosGameDataLocalStorage } from "features/AdvanceCalculator/utils/LocalStorageData/manageAdvanceCalcLevelPosGameDataLocalStorage";
import { manageUseAbilityHeroLocalStorage } from "features/AdvanceCalculator/utils/LocalStorageData/manageUseAbilityHeroLocalStorage";

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
