import { OFFENSE_TYPE } from "data/game";
import { memo } from "react";
import { heroDataUtils } from "utils/GameData/heroDataUtils";
import { HeroCard } from "./HeroCard";
import { EquipmentItem } from "features/advance_calc/objects/equipmentItem";
import { HeroItem } from "features/advance_calc/objects/heroItem";

interface Props {
  heroItem: HeroItem;
  equipmentItemList: EquipmentItem[];
  updateHero: (
    heroID: string,
    currentLevelPos?: number,
    useAbility?: boolean
  ) => void;
  useHardMode: boolean;
}

export const HeroCardWrapper = memo(function HeroCardWrapper({
  heroItem,
  equipmentItemList,
  updateHero,
  useHardMode,
}: Props) {
  const type = heroItem.type;
  if (type !== OFFENSE_TYPE.Hero) {
    throw new Error(`HeroCardWrapper ERROR: type (${type}) must be hero type.`);
  }

  const updateCurrentLevelPos = (newCurrentLevelPos: number) => {
    updateHero(heroID, newCurrentLevelPos);
  };

  const updateUseAbility = (useAbility: boolean) => {
    updateHero(heroID, undefined, useAbility);
  };

  const heroID = heroItem.offenseID;
  const {
    getHeroName,
    getHeroImage,
    getHeroMinLevelPos,
    getHeroMaxLevelPos,
    getHeroLevel,
    getHeroDPS,
    getHeroDamageType,
    isMaxLevelPos,
  } = heroDataUtils(heroID);

  const id = heroItem.id;
  const name = getHeroName();
  const minLevelPos = getHeroMinLevelPos();
  const maxLevelPos = getHeroMaxLevelPos();
  const currentLevelPos = heroItem.currentLevelPos;
  const currentLevel = getHeroLevel(currentLevelPos);
  const useAbility = heroItem.useAbility;
  const imagePath = getHeroImage();
  const dps = getHeroDPS(currentLevelPos);
  const damageType = getHeroDamageType();

  return (
    <HeroCard
      id={id}
      name={name}
      imagePath={imagePath}
      minLevelPos={minLevelPos}
      maxLevelPos={maxLevelPos}
      currentLevelPos={currentLevelPos}
      currentLevel={currentLevel}
      useAbility={useAbility}
      updateCurrentLevelPos={updateCurrentLevelPos}
      updateUseAbility={updateUseAbility}
      dps={dps}
      damageType={damageType}
      isMaxed={isMaxLevelPos(currentLevelPos)}
    />
  );
});
