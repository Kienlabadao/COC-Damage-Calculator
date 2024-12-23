import { memo } from "react";
import { troopDataUtils } from "utils/GameData/troopDataUtils";
import { BACKGROUND_TYPE } from "components/CalculatorComponents/GameDataCardContainer";
import { OffenseItem } from "features/advance_calc/objects/offenseItem";
import { TroopCard } from "./TroopCard";
import { ModifierItem } from "features/advance_calc/objects/modifierItem";
import { getBaseModifiedImage } from "objects/baseModifierItem";
import { getTroopDamage } from "features/advance_calc/actions/OffenseItem";

interface Props {
  troopItem: OffenseItem;
  activeModifier?: ModifierItem;
  updateTroop: (offenseID: string, currentLevelPos?: number) => void;
  useTroopDeathDamage: boolean;
}

export const TroopCardWrapper = memo(function TroopCardWrapper({
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

  const id = troopItem.id;
  const name = getTroopName();
  const backgroundType = BACKGROUND_TYPE.Normal;
  const minLevelPos = getTroopMinLevelPos();
  const maxLevelPos = getTroopMaxLevelPos();
  const currentLevelPos = troopItem.currentLevelPos;
  const currentLevel = getTroopLevel(currentLevelPos);
  const imagePath = getTroopImage(currentLevelPos);
  const damage = getTroopDamage(troopItem, useTroopDeathDamage, activeModifier);
  const modifierImgPath = activeModifier
    ? getBaseModifiedImage(activeModifier)
    : undefined;
  const damageType = getTroopDamageType();

  return (
    <TroopCard
      id={id}
      name={name}
      imagePath={imagePath}
      minLevelPos={minLevelPos}
      maxLevelPos={maxLevelPos}
      currentLevelPos={currentLevelPos}
      currentLevel={currentLevel}
      updateCurrentLevelPos={updateCurrentLevelPos}
      damage={damage}
      damageType={damageType}
      isMaxed={isMaxLevelPos(currentLevelPos)}
      backgroundType={backgroundType}
      useTroopDeathDamage={useTroopDeathDamage}
      modifierImgPath={modifierImgPath}
    />
  );
});
