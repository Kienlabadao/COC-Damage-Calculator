import { memo } from "react";
import { modifierDataUtils } from "utils/GameData/modifierDataUtils";
import { ModifierCard } from "./modifierCard";
import { ModifierItem } from "features/AdvanceCalculator/objects/modifierItem";

interface Props {
  modifierItem: ModifierItem;
  updateModifier: (
    modifierID: string,
    currentLevelPos?: number,
    use?: boolean
  ) => void;
}

export const ModifierCardContainer = memo(function ModifierCardContainer({
  modifierItem,
  updateModifier,
}: Props) {
  const updateCurrentLevelPos = (newCurrentLevelPos: number) => {
    updateModifier(modifierID, newCurrentLevelPos);
  };
  const updateUseModifier = (newUseModifier: boolean) => {
    updateModifier(modifierID, undefined, newUseModifier);
  };

  const modifierID = modifierItem.modifierID;
  const {
    getModifierName,
    getModifierImage,
    getModifierMinLevelPos,
    getModifierMaxLevelPos,
    getModifierLevel,
    getModifierModify,
    isMaxLevelPos,
  } = modifierDataUtils(modifierID);

  const name = getModifierName();
  const imagePath = getModifierImage();
  const minLevelPos = getModifierMinLevelPos();
  const maxLevelPos = getModifierMaxLevelPos();
  const currentLevelPos = modifierItem.currentLevelPos;
  const currentLevel = getModifierLevel(currentLevelPos);
  const isMaxed = isMaxLevelPos(currentLevelPos);
  const modify = getModifierModify(currentLevelPos);
  const useModifier = modifierItem.use;

  return (
    <ModifierCard
      modifierID={modifierID}
      name={name}
      imagePath={imagePath}
      minLevelPos={minLevelPos}
      maxLevelPos={maxLevelPos}
      currentLevelPos={currentLevelPos}
      currentLevel={currentLevel}
      isMaxed={isMaxed}
      updateCurrentLevelPos={updateCurrentLevelPos}
      useModifier={useModifier}
      updateUseModifier={updateUseModifier}
      modify={modify}
    />
  );
});
