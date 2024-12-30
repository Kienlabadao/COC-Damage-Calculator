import { OFFENSE_TYPE } from "data/Game";
import { manageAdvanceCalcLevelPosGameDataLocalStorage } from "features/AdvanceCalculator/utils/LocalStorageData/manageAdvanceCalcLevelPosGameDataLocalStorage";
import { HeroItem } from "features/AdvanceCalculator/objects/heroItem";
import { initHeroItem } from "../initHeroItem";
import { manageUseAbilityHeroLocalStorage } from "features/AdvanceCalculator/utils/LocalStorageData/manageUseAbilityHeroLocalStorage";

export function updateHeroItem(
  heroID: string,
  newCurrentLevelPos?: number,
  useAbility?: boolean
): HeroItem {
  if (newCurrentLevelPos !== undefined) {
    const { storeLevelPos } = manageAdvanceCalcLevelPosGameDataLocalStorage(
      heroID,
      OFFENSE_TYPE.Hero
    );
    storeLevelPos(newCurrentLevelPos);
  }

  if (useAbility !== undefined) {
    const { storeUseOffense } = manageUseAbilityHeroLocalStorage(heroID);
    storeUseOffense(useAbility);
  }

  return initHeroItem(heroID);
}
