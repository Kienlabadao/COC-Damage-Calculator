import { OFFENSE_TYPE } from "data/game";
import { createOffenseItem, OffenseItem } from "../offenseItem";

export interface HeroItem extends OffenseItem {
  useAbility: boolean;
}

export function createHeroItem(
  offenseID: string,
  currentLevelPos: number,
  useAbility: boolean
): HeroItem {
  return {
    ...createOffenseItem(offenseID, OFFENSE_TYPE.Hero, currentLevelPos),
    useAbility: useAbility,
  };
}

export function updateHeroItemInList(
  updatedHeroItem: HeroItem,
  heroItemList: HeroItem[]
): HeroItem[] {
  const heroID = updatedHeroItem.offenseID;
  let isHeroFound = false;

  const updatedList = heroItemList.map((hero) => {
    if (hero.offenseID === heroID) {
      isHeroFound = true;
      return {
        ...updatedHeroItem,
      };
    }
    return hero;
  });

  if (!isHeroFound) {
    throw new Error(
      `heroItem.updateHeroItemInList ERROR: No offense found with id ${heroID}`
    );
  }

  return updatedList;
}
