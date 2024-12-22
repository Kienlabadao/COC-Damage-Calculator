import { memo } from "react";
import { modifierDataUtils } from "utils/GameData/modifierDataUtils";
import { ModifierCard } from "./ModifierCard";
import { ModifierItem } from "features/advance_calc/objects/modifierItem";

interface Props {
  modifierItem: ModifierItem;
  updateModifier: (
    modifierID: string,
    currentLevelPos?: number,
    use?: boolean
  ) => void;
}

export const ModifierCardWrapper = memo(function ModifierCardWrapper({
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

  const id = modifierItem.id;
  const name = getModifierName();
  const imagePath = getModifierImage();
  const minLevelPos = getModifierMinLevelPos();
  const maxLevelPos = getModifierMaxLevelPos();
  const currentLevelPos = modifierItem.currentLevelPos;
  const currentLevel = getModifierLevel(currentLevelPos);
  const modify = getModifierModify(currentLevelPos);
  const useModifier = modifierItem.use;

  return (
    <ModifierCard
      id={id}
      name={name}
      imagePath={imagePath}
      minLevelPos={minLevelPos}
      maxLevelPos={maxLevelPos}
      currentLevelPos={currentLevelPos}
      currentLevel={currentLevel}
      useModifier={useModifier}
      updateCurrentLevelPos={updateCurrentLevelPos}
      updateUseModifier={updateUseModifier}
      modify={modify}
      isMaxed={isMaxLevelPos(currentLevelPos)}
    />
  );
});
