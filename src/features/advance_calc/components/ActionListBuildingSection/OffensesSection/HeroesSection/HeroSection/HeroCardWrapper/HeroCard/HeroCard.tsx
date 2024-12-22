import { DamageType } from "data/game";
import { memo } from "react";
import {
  GameDataCardContainer,
  SIZE,
} from "components/CalculatorComponents/GameDataCardContainer";
import {
  OffenseCardContainer,
  StatDisplayer,
} from "components/CalculatorComponents/OffenseCard";
import { Checkbox, Slider } from "components";
import { convertToDisplayerType } from "components/CalculatorComponents/OffenseCard/StatDisplayer";

interface Props {
  id: string;
  name: string;
  imagePath: string;
  minLevelPos: number;
  maxLevelPos: number;
  currentLevelPos: number;
  currentLevel: number;
  useAbility: boolean;
  updateCurrentLevelPos: (newCurrentLevelPos: number) => void;
  updateUseAbility: (newUseAbility: boolean) => void;
  dps: number;
  damageType: DamageType;
  isMaxed?: boolean;
}

export const HeroCard = memo(function HeroCard({
  id,
  name,
  imagePath,
  minLevelPos,
  maxLevelPos,
  currentLevelPos,
  currentLevel,
  useAbility,
  updateCurrentLevelPos,
  updateUseAbility,
  dps,
  damageType,
  isMaxed = false,
}: Props) {
  return (
    <OffenseCardContainer>
      <h5>{name}</h5>
      <div>
        <GameDataCardContainer
          imgPath={imagePath}
          size={SIZE.Large}
          level={currentLevel}
          isMaxed={isMaxed}
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
      <div className="d-flex justify-content-center align-items-center mt-2">
        <Checkbox
          id={`use_ability_${id}`}
          label={`Use Ability`}
          isChecked={useAbility}
          onChange={(isChecked: boolean) => updateUseAbility(isChecked)}
        />
      </div>
      <div className="mt-2">
        <StatDisplayer
          displayerType={convertToDisplayerType(damageType)}
          label={"Damage"}
          content={dps.toString()}
          isModifierActive={false}
        ></StatDisplayer>
      </div>
    </OffenseCardContainer>
  );
});
