import { memo } from "react";
import { repairDataUtils } from "utils/GameData/repairDataUtils";
import { RepairCard } from "./repairCard";
import { RepairItem } from "features/AdvanceCalculator/objects/repairItem";
import { ModifierItem } from "features/AdvanceCalculator/objects/modifierItem";
import { getBaseModifiedImage } from "objects/baseModifierItem";
import { calculateRepairRepair } from "actions/BaseRepairItem";

interface Props {
  repairItem: RepairItem;
  activeModifier?: ModifierItem;
  updateRepair: (repairID: string, currentLevelPos?: number) => void;
}

export const RepairCardContainer = memo(function RepairCardContainer({
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

  const name = getRepairName();
  const minLevelPos = getRepairMinLevelPos();
  const maxLevelPos = getRepairMaxLevelPos();
  const currentLevelPos = repairItem.currentLevelPos;
  const currentLevel = getRepairLevel(currentLevelPos);
  const isMaxed = isMaxLevelPos(currentLevelPos);
  const imagePath = getRepairImage(currentLevel);
  const repair = calculateRepairRepair(repairItem, activeModifier);
  const modifierImgPath = activeModifier
    ? getBaseModifiedImage(activeModifier)
    : undefined;

  return (
    <RepairCard
      name={name}
      imagePath={imagePath}
      minLevelPos={minLevelPos}
      maxLevelPos={maxLevelPos}
      currentLevelPos={currentLevelPos}
      currentLevel={currentLevel}
      isMaxed={isMaxed}
      updateCurrentLevelPos={updateCurrentLevelPos}
      repair={repair}
      modifierImgPath={modifierImgPath}
    />
  );
});
