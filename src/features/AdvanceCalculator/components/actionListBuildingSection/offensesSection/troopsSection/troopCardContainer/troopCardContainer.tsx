import { memo } from "react";
import { troopDataUtils } from "utils/GameData/troopDataUtils";
import { OffenseItem } from "features/AdvanceCalculator/objects/offenseItem";
import { TroopCard } from "./troopCard";
import { ModifierItem } from "features/AdvanceCalculator/objects/modifierItem";
import { getBaseModifiedImage } from "objects/baseModifierItem";
import { calculateTroopDamage } from "actions/BaseOffenseItem";

interface Props {
  troopItem: OffenseItem;
  activeModifier?: ModifierItem;
  updateTroop: (offenseID: string, currentLevelPos?: number) => void;
  useTroopDeathDamage: boolean;
}

export const TroopCardContainer = memo(function TroopCardContainer({
  troopItem,
  activeModifier,
  updateTroop,
  useTroopDeathDamage,
}: Props) {
  const updateCurrentLevelPos = (newCurrentLevelPos: number) => {
    updateTroop(troopID, newCurrentLevelPos);
  };

  const troopID = troopItem.offenseID;
  const {
    getTroopName,
    getTroopImage,
    getTroopMinLevelPos,
    getTroopMaxLevelPos,
    getTroopLevel,
    getTroopDamageType,
    isMaxLevelPos,
  } = troopDataUtils(troopID);

  const name = getTroopName();
  const minLevelPos = getTroopMinLevelPos();
  const maxLevelPos = getTroopMaxLevelPos();
  const currentLevelPos = troopItem.currentLevelPos;
  const currentLevel = getTroopLevel(currentLevelPos);
  const isMaxed = isMaxLevelPos(currentLevelPos);
  const imagePath = getTroopImage(currentLevelPos);
  const damage = calculateTroopDamage(
    troopItem,
    useTroopDeathDamage,
    activeModifier
  );
  const damageType = getTroopDamageType();
  const modifierImgPath = activeModifier
    ? getBaseModifiedImage(activeModifier)
    : undefined;

  return (
    <TroopCard
      name={name}
      imagePath={imagePath}
      minLevelPos={minLevelPos}
      maxLevelPos={maxLevelPos}
      currentLevelPos={currentLevelPos}
      currentLevel={currentLevel}
      updateCurrentLevelPos={updateCurrentLevelPos}
      isMaxed={isMaxed}
      damage={damage}
      damageType={damageType}
      useTroopDeathDamage={useTroopDeathDamage}
      modifierImgPath={modifierImgPath}
    />
  );
});
