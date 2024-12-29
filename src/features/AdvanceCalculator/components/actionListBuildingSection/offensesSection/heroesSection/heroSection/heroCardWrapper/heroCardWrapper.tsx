import { memo } from "react";
import { heroDataUtils } from "utils/GameData/heroDataUtils";
import { HeroCard } from "./HeroCard";
import {
  EquipmentItem,
  filterEquipmentItemList,
} from "features/advance_calc/objects/equipmentItem";
import { HeroItem } from "features/advance_calc/objects/heroItem";
import { EquipmentDamageLog } from "features/advance_calc/objects/equipmentDamageLog";
import { ModifierItem } from "features/advance_calc/objects/modifierItem";
import { calculateHeroDamage } from "features/advance_calc/actions/HeroItem";
import { getBaseModifiedImage } from "objects/baseModifierItem";

interface Props {
  heroItem: HeroItem;
  equipmentItemList: EquipmentItem[];
  equipmentDamageLogList: Record<string, EquipmentDamageLog>;
  updateHero: (
    heroID: string,
    currentLevelPos?: number,
    useAbility?: boolean
  ) => void;
  attackSpeed: number;
  attackSpeedModify: number;
  useHardMode: boolean;
  activeModifier?: ModifierItem;
}

export const HeroCardWrapper = memo(function HeroCardWrapper({
  heroItem,
  equipmentItemList,
  equipmentDamageLogList,
  updateHero,
  attackSpeed,
  attackSpeedModify,
  useHardMode,
  activeModifier,
}: Props) {
  const usedEquipmentItemList = filterEquipmentItemList(
    equipmentItemList,
    true
  );

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
  const damageType = getHeroDamageType();
  const { dps, dph, activeAttackEquipmentItem } = calculateHeroDamage(
    heroItem,
    usedEquipmentItemList,
    equipmentDamageLogList,
    attackSpeed,
    attackSpeedModify,
    useHardMode,
    activeModifier
  );
  const modifierImgPath = activeModifier
    ? getBaseModifiedImage(activeModifier)
    : undefined;
  const isAttackSpeedModified = attackSpeedModify > 0;

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
      dph={dph}
      damageType={damageType}
      attackSpeed={attackSpeed}
      isAttackSpeedModified={isAttackSpeedModified}
      usedEquipmentItemList={usedEquipmentItemList}
      useHardMode={useHardMode}
      isMaxed={isMaxLevelPos(currentLevelPos)}
      modifierImgPath={modifierImgPath}
      activeAttackEquipmentItem={activeAttackEquipmentItem}
    />
  );
});
