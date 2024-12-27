import { memo } from "react";
import {
  GameDataCardContainer,
  SIZE,
} from "components/CalculatorComponents/GameDataCardContainer";
import {
  OffenseCardContainer,
  NumberStatDisplayer,
} from "components/CalculatorComponents/OffenseCard";
import { Slider } from "components";
import { DISPLAYER_TYPE } from "components/CalculatorComponents/OffenseCard/StatDisplayer";
import {
  OVERLAY_TYPE,
  OverlayType,
} from "components/CalculatorComponents/GameDataCardContainer/Overlay";

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
  const topLeftOverlay = isModifierActive
    ? { type: OVERLAY_TYPE.ImgRaged, imgPath: modifierImgPath }
    : undefined;
  const bottomLeftOverlayType: OverlayType = isMaxed
    ? OVERLAY_TYPE.NumLevelMaxed
    : OVERLAY_TYPE.Num;

  return (
    <OffenseCardContainer>
      <h5>{name}</h5>
      <div>
        <GameDataCardContainer
          imgPath={imagePath}
          size={SIZE.Normal}
          topLeftOverlay={topLeftOverlay}
          bottomLeftOverlay={{
            type: bottomLeftOverlayType,
            content: currentLevel.toString(),
          }}
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
        <NumberStatDisplayer
          label={`Repair`}
          displayerType={DISPLAYER_TYPE.Repair}
          content={repair}
          isModifierActive={isModifierActive}
        />
      </div>
    </OffenseCardContainer>
  );
});
