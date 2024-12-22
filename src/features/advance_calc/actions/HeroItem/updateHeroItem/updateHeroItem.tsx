import { OFFENSE_TYPE } from "data/game";
import { manageAdvanceCalcLevelPosGameDataLocalStorage } from "features/advance_calc/utils/LocalStorageData/manageAdvanceCalcLevelPosGameDataLocalStorage";
import { HeroItem } from "features/advance_calc/objects/heroItem";
import { initHeroItem } from "../initHeroItem";
import { manageUseAbilityHeroLocalStorage } from "features/advance_calc/utils/LocalStorageData/manageUseAbilityHeroLocalStorage";

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
