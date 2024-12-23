import { memo } from "react";
import {
  BACKGROUND_TYPE,
  BackgroundType,
  GameDataCardContainer,
  SIZE,
  TOP_LEFT_OVERLAY_TYPE,
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
  useEquipment: boolean;
  updateCurrentLevelPos: (newCurrentLevelPos: number) => void;
  updateUseEquipment: (newUseEquipment: boolean) => void;
  dpsBoost: number;
  dphBoost: number;
  useHardMode: boolean;
  backgroundType?: BackgroundType;
  isMaxed?: boolean;
  modifierImgPath?: string;
}

export const SupportEquipmentCard = memo(function SupportEquipmentCard({
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
  dpsBoost,
  dphBoost,
  useHardMode,
  backgroundType = BACKGROUND_TYPE.Normal,
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
          backgroundType={backgroundType}
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
          displayerType={DISPLAYER_TYPE.Damage}
          label={"DPS Boost"}
          content={dpsBoost.toString()}
          isModifierActive={isModifierActive}
          useHardMode={useHardMode}
        ></StatDisplayer>
        <StatDisplayer
          displayerType={DISPLAYER_TYPE.Damage}
          label={"DPH Boost"}
          content={dphBoost.toString()}
          isModifierActive={isModifierActive}
          useHardMode={useHardMode}
        ></StatDisplayer>
      </div>
    </OffenseCardContainer>
  );
});
