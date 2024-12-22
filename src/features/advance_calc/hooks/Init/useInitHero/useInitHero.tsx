import { Hero } from "data/game";
import {
  initHeroItem,
  updateHeroItem,
} from "features/advance_calc/actions/HeroItem";
import { HeroItem } from "features/advance_calc/objects/heroItem";
import { useCallback, useState } from "react";

function getHero(hero: Hero): HeroItem {
  return initHeroItem(hero);
}

export function useInitHero(hero: Hero) {
  const [heroItem, setHeroItem] = useState(getHero(hero));

  const updateHero = useCallback(
    (heroID: string, currentLevelPos?: number, useAbility?: boolean) => {
      setHeroItem(() => {
        return updateHeroItem(heroID, currentLevelPos, useAbility);
      });
    },
    []
  );

  return [heroItem, updateHero] as const;
}
