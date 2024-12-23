import { memo } from "react";
import {
  BACKGROUND_TYPE,
  BackgroundType,
  GameDataCardContainer,
  SIZE,
} from "components/CalculatorComponents/GameDataCardContainer";
import {
  OffenseCardContainer,
  StatDisplayer,
} from "components/CalculatorComponents/OffenseCard";
import { Checkbox, Slider } from "components";
import {
  convertToDisplayerType,
  DISPLAYER_TYPE,
} from "components/CalculatorComponents/OffenseCard/StatDisplayer";
import { DamageType } from "data/game";

interface Props {
  id: string;
  name: string;
  imagePath: string;
  minLevelPos: number;
  maxLevelPos: number;
  currentLevelPos: number;
  currentLevel: number;
  useEquipment: boolean;
  updateCurrentLevelPos: (newCurrentLevelPos: number) => void;
  updateUseEquipment: (newUseEquipment: boolean) => void;
  damage: number;
  damageType: DamageType;
  dpsBoost?: number;
  backgroundType?: BackgroundType;
  isMaxed?: boolean;
}

export const DamageEquipmentCard = memo(function DamageEquipmentCard({
  id,
  name,
  imagePath,
  minLevelPos,
  maxLevelPos,
  currentLevelPos,
  currentLevel,
  useEquipment,
  updateCurrentLevelPos,
  updateUseEquipment,
  damage,
  damageType,
  dpsBoost,
  backgroundType = BACKGROUND_TYPE.Normal,
  isMaxed = false,
}: Props) {
  return (
    <OffenseCardContainer>
      <h5>{name}</h5>
      <div>
        <GameDataCardContainer
          imgPath={imagePath}
          backgroundType={backgroundType}
          size={SIZE.Normal}
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
          id={`use_${id}`}
          label={`Use Equipment`}
          isChecked={useEquipment}
          onChange={(isChecked: boolean) => updateUseEquipment(isChecked)}
        />
      </div>
      <div className="mt-2">
        <StatDisplayer
          displayerType={convertToDisplayerType(damageType)}
          label={"Damage"}
          content={damage.toString()}
          isModifierActive={false}
        ></StatDisplayer>
        {dpsBoost && (
          <StatDisplayer
            displayerType={DISPLAYER_TYPE.Damage}
            label={"DPS Boost"}
            content={dpsBoost.toString()}
            isModifierActive={false}
          ></StatDisplayer>
        )}
      </div>
    </OffenseCardContainer>
  );
});
