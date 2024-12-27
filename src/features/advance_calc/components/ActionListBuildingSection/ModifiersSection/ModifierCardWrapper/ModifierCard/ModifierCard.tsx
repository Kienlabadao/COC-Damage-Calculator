import { memo } from "react";
import {
  BACKGROUND_TYPE,
  GameDataCardContainer,
  SIZE,
} from "components/CalculatorComponents/GameDataCardContainer";
import {
  OffenseCardContainer,
  NumberStatDisplayer,
} from "components/CalculatorComponents/OffenseCard";
import { Checkbox, Slider } from "components";
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
  useModifier: boolean;
  updateCurrentLevelPos: (newCurrentLevelPos: number) => void;
  updateUseModifier: (newUseModifier: boolean) => void;
  modify: number;
  isMaxed?: boolean;
}

export const ModifierCard = memo(function ModifierCard({
  id,
  name,
  imagePath,
  minLevelPos,
  maxLevelPos,
  currentLevelPos,
  currentLevel,
  useModifier,
  updateCurrentLevelPos,
  updateUseModifier,
  modify,
  isMaxed = false,
}: Props) {
  function createBottomLeftOverlay() {
    if (currentLevel === 1 && isMaxed) {
      return undefined;
    } else {
      const bottomLeftOverlayType: OverlayType = isMaxed
        ? OVERLAY_TYPE.NumLevelMaxed
        : OVERLAY_TYPE.Num;

      return {
        type: bottomLeftOverlayType,
        content: currentLevel.toString(),
      };
    }
  }

  return (
    <OffenseCardContainer>
      <h5>{name}</h5>
      <div>
        <GameDataCardContainer
          imgPath={imagePath}
          backgroundType={BACKGROUND_TYPE.Modifier}
          size={SIZE.Normal}
          bottomLeftOverlay={createBottomLeftOverlay()}
        />
      </div>
      <div className="mt-2">
        {minLevelPos !== maxLevelPos && (
          <Slider
            min={minLevelPos}
            max={maxLevelPos}
            currentValue={currentLevelPos}
            onChange={(newValue: number) => updateCurrentLevelPos(newValue)}
          />
        )}
      </div>
      <div className="d-flex justify-content-center align-items-center mt-2">
        <Checkbox
          id={`use_modifier_${id}`}
          label={`Enable Modifier`}
          isChecked={useModifier}
          onChange={(isChecked: boolean) => updateUseModifier(isChecked)}
        />
      </div>
      <div className="mt-2">
        <NumberStatDisplayer
          label={`Modify`}
          displayerType={DISPLAYER_TYPE.Modify}
          content={modify}
        />
      </div>
    </OffenseCardContainer>
  );
});
