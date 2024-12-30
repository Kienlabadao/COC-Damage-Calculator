import { memo } from "react";
import { heroDataUtils } from "utils/GameData/heroDataUtils";
import { HeroCard } from "./heroCard";
import {
  EquipmentItem,
  filterEquipmentItemList,
} from "features/AdvanceCalculator/objects/equipmentItem";
import { HeroItem } from "features/AdvanceCalculator/objects/heroItem";
import { EquipmentDamageLog } from "features/AdvanceCalculator/objects/equipmentDamageLog";
import { ModifierItem } from "features/AdvanceCalculator/objects/modifierItem";
import { calculateHeroDamage } from "features/AdvanceCalculator/actions/HeroItem";
import { getBaseModifiedImage } from "objects/baseModifierItem";
import { UsedEquipmentDisplayer } from "components/Calculator";

function createUsedEquipmentDisplayer(
  equipmentItemList: EquipmentItem[]
): JSX.Element | undefined {
  if (equipmentItemList.length > 0) {
    return <UsedEquipmentDisplayer equipmentItemList={equipmentItemList} />;
  } else {
    return undefined;
  }
}

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

export const HeroCardContainer = memo(function HeroCardContainer({
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
    isMaxLevelPos,
  } = heroDataUtils(heroID);

  const name = getHeroName();
  const minLevelPos = getHeroMinLevelPos();
  const maxLevelPos = getHeroMaxLevelPos();
  const currentLevelPos = heroItem.currentLevelPos;
  const currentLevel = getHeroLevel(currentLevelPos);
  const isMaxed = isMaxLevelPos(currentLevelPos);
  const useAbility = heroItem.useAbility;
  const imagePath = getHeroImage();
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
  const usedEquipmentDisplayer = createUsedEquipmentDisplayer(
    usedEquipmentItemList
  );

  return (
    <HeroCard
      heroID={heroID}
      name={name}
      imagePath={imagePath}
      minLevelPos={minLevelPos}
      maxLevelPos={maxLevelPos}
      currentLevelPos={currentLevelPos}
      currentLevel={currentLevel}
      isMaxed={isMaxed}
      updateCurrentLevelPos={updateCurrentLevelPos}
      useAbility={useAbility}
      updateUseAbility={updateUseAbility}
      dps={dps}
      dph={dph}
      attackSpeed={attackSpeed}
      isAttackSpeedModified={isAttackSpeedModified}
      useHardMode={useHardMode}
      modifierImgPath={modifierImgPath}
      activeAttackEquipmentItem={activeAttackEquipmentItem}
      usedEquipmentDisplayer={usedEquipmentDisplayer}
    />
  );
});
