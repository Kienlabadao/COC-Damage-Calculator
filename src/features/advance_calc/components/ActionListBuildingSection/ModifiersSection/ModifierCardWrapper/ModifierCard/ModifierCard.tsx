import { memo } from "react";
import {
  BACKGROUND_TYPE,
  GameDataCardContainer,
  SIZE,
} from "components/CalculatorComponents/GameDataCardContainer";
import {
  OffenseCardContainer,
  StatDisplayer,
} from "components/CalculatorComponents/OffenseCard";
import { Checkbox, Slider } from "components";
import { DISPLAYER_TYPE } from "components/CalculatorComponents/OffenseCard/StatDisplayer";

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
  let displayLevel: number | undefined = currentLevel;
  let displayMaxed: boolean | undefined = isMaxed;
  if (currentLevel === 1 && displayMaxed) {
    displayLevel = undefined;
    displayMaxed = undefined;
  }

  return (
    <OffenseCardContainer>
      <h5>{name}</h5>
      <div>
        <GameDataCardContainer
          imgPath={imagePath}
          backgroundType={BACKGROUND_TYPE.Modifier}
          size={SIZE.Normal}
          level={displayLevel}
          isMaxed={displayMaxed}
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
        <StatDisplayer
          displayerType={DISPLAYER_TYPE.Modify}
          isModifierActive={false}
          content={modify.toString()}
        ></StatDisplayer>
      </div>
    </OffenseCardContainer>
  );
});
