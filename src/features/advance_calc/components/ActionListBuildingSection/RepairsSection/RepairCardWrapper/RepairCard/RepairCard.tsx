import { memo } from "react";
import {
  GameDataCardContainer,
  SIZE,
  TOP_LEFT_OVERLAY_TYPE,
} from "components/CalculatorComponents/GameDataCardContainer";
import {
  OffenseCardContainer,
  StatDisplayer,
} from "components/CalculatorComponents/OffenseCard";
import { Slider } from "components";
import { DISPLAYER_TYPE } from "components/CalculatorComponents/OffenseCard/StatDisplayer";

interface Props {
  id: string;
  name: string;
  imagePath: string;
  minLevelPos: number;
  maxLevelPos: number;
  currentLevelPos: number;
  currentLevel: number;
  updateCurrentLevelPos: (newCurrentLevelPos: number) => void;
  repair: number;
  isMaxed?: boolean;
  modifierImgPath?: string;
}

export const RepairCard = memo(function RepairCard({
  name,
  imagePath,
  minLevelPos,
  maxLevelPos,
  currentLevelPos,
  currentLevel,
  updateCurrentLevelPos,
  repair,
  isMaxed = false,
  modifierImgPath,
}: Props) {
  const isModifierActive = modifierImgPath !== undefined;
  const topLeftOverlayType = isModifierActive
    ? TOP_LEFT_OVERLAY_TYPE.Modifier
    : undefined;

  return (
    <OffenseCardContainer>
      <h5>{name}</h5>
      <div>
        <GameDataCardContainer
          imgPath={imagePath}
          size={SIZE.Normal}
          level={currentLevel}
          isMaxed={isMaxed}
          topLeftOverlayType={topLeftOverlayType}
          modifierImgPath={modifierImgPath}
        />
      </div>
      <div className="mt-2">
        <Slider
          min={minLevelPos}
          max={maxLevelPos}
          currentValue={currentLevelPos}
          onChange={(newValue: number) => updateCurrentLevelPos(newValue)}
        />
      </div>
      <div className="mt-2">
        <StatDisplayer
          displayerType={DISPLAYER_TYPE.Repair}
          content={repair.toString()}
          isModifierActive={isModifierActive}
        ></StatDisplayer>
      </div>
    </OffenseCardContainer>
  );
});
