import { memo } from "react";
import { repairDataUtils } from "utils/GameData/repairDataUtils";
import { RepairCard } from "./RepairCard";
import { RepairItem } from "features/advance_calc/objects/repairItem";
import { ModifierItem } from "features/advance_calc/objects/modifierItem";
import { getBaseModifiedImage } from "objects/baseModifierItem";
import { calculateRepairRepair } from "actions/BaseRepairItem";

interface Props {
  repairItem: RepairItem;
  activeModifier?: ModifierItem;
  updateRepair: (offenseID: string, currentLevelPos?: number) => void;
}

export const RepairCardWrapper = memo(function RepairCardWrapper({
  repairItem,
  activeModifier,
  updateRepair,
}: Props) {
  const updateCurrentLevelPos = (newCurrentLevelPos: number) => {
    updateRepair(repairID, newCurrentLevelPos);
  };

  const repairID = repairItem.repairID;
  const {
    getRepairName,
    getRepairImage,
    getRepairMinLevelPos,
    getRepairMaxLevelPos,
    getRepairLevel,
    isMaxLevelPos,
  } = repairDataUtils(repairID);

  const id = repairItem.id;
  const name = getRepairName();
  const minLevelPos = getRepairMinLevelPos();
  const maxLevelPos = getRepairMaxLevelPos();
  const currentLevelPos = repairItem.currentLevelPos;
  const currentLevel = getRepairLevel(currentLevelPos);
  const imagePath = getRepairImage(currentLevel);
  const repair = calculateRepairRepair(repairItem, activeModifier);
  const modifierImgPath = activeModifier
    ? getBaseModifiedImage(activeModifier)
    : undefined;

  return (
    <RepairCard
      id={id}
      name={name}
      imagePath={imagePath}
      minLevelPos={minLevelPos}
      maxLevelPos={maxLevelPos}
      currentLevelPos={currentLevelPos}
      currentLevel={currentLevel}
      updateCurrentLevelPos={updateCurrentLevelPos}
      repair={repair}
      isMaxed={isMaxLevelPos(currentLevelPos)}
      modifierImgPath={modifierImgPath}
    />
  );
});
