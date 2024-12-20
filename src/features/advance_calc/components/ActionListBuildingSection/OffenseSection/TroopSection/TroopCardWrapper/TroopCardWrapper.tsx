import { OFFENSE_TYPE, OffenseType } from "data/game";
import { memo } from "react";
import { troopDataUtils } from "utils/GameData/troopDataUtils";
import { BACKGROUND_TYPE } from "components/CalculatorComponents/GameDataCardContainer";
import { OffenseItem } from "features/advance_calc/objects/offenseItem";
import { TroopCard } from "./TroopCard";

interface Props {
  troop: OffenseItem;
  updateOffense: (
    offenseID: string,
    type: OffenseType,
    currentLevelPos?: number
  ) => void;
  useTroopDeathDamage: boolean;
}

export const TroopCardWrapper = memo(function TroopCardWrapper({
  troop,
  updateOffense,
  useTroopDeathDamage,
}: Props) {
  const type = troop.type;
  if (type !== OFFENSE_TYPE.Troop) {
    throw new Error(
      `TroopCardWrapper ERROR: type (${type}) must be troop type.`
    );
  }

  const updateCurrentLevelPos = (newCurrentLevelPos: number) => {
    updateOffense(troopID, type, newCurrentLevelPos);
  };

  const troopID = troop.offenseID;
  const {
    getTroopName,
    getTroopImage,
    getTroopMinLevelPos,
    getTroopMaxLevelPos,
    getTroopLevel,
    getTroopDamage,
    getTroopDeathDamage,
    getTroopDamageType,
    isMaxLevelPos,
    canDealDamage,
  } = troopDataUtils(troopID);

  const id = troop.id;
  const name = getTroopName();
  const backgroundType = BACKGROUND_TYPE.Normal;
  const minLevelPos = getTroopMinLevelPos();
  const maxLevelPos = getTroopMaxLevelPos();
  const currentLevelPos = troop.currentLevelPos;
  const currentLevel = getTroopLevel(currentLevelPos);
  const imagePath = getTroopImage(currentLevelPos);
  let damage;
  if (useTroopDeathDamage && canDealDamage()) {
    damage = getTroopDeathDamage(currentLevelPos);
  } else {
    damage = getTroopDamage(currentLevelPos);
  }
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
    />
  );
});
