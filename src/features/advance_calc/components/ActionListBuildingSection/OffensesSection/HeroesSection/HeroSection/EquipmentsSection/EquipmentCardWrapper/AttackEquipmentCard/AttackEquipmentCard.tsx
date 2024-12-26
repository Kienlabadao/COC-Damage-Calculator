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
  useEquipment: boolean;
  updateCurrentLevelPos: (newCurrentLevelPos: number) => void;
  updateUseEquipment: (newUseEquipment: boolean) => void;
  extraDamage: number;
  damageType: DamageType;
  useHardMode: boolean;
  dpsBoost?: number;
  dphBoost?: number;
  attackSpeedBoost?: number;
  backgroundType?: BackgroundType;
  isMaxed?: boolean;
  modifierImgPath?: string;
}

export const AttackEquipmentCard = memo(function AttackEquipmentCard({
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
  extraDamage,
  damageType,
  useHardMode,
  dpsBoost,
  dphBoost,
  attackSpeedBoost,
  backgroundType = BACKGROUND_TYPE.Normal,
  isMaxed = false,
  modifierImgPath,
}: Props) {
  const isModifierActive =
    dpsBoost !== undefined && modifierImgPath !== undefined;
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
          backgroundType={backgroundType}
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
          label={"Extra Damage"}
          content={extraDamage.toString()}
          useHardMode={useHardMode}
        ></StatDisplayer>
        {dpsBoost && (
          <StatDisplayer
            displayerType={convertToDisplayerType(damageType)}
            label={"DPS Boost"}
            content={dpsBoost.toString()}
            isModifierActive={isModifierActive}
            useHardMode={useHardMode}
          ></StatDisplayer>
        )}
        {dphBoost && (
          <StatDisplayer
            displayerType={DISPLAYER_TYPE.Damage}
            label={"DPH Boost"}
            content={dphBoost.toString()}
            isModifierActive={isModifierActive}
            useHardMode={useHardMode}
          ></StatDisplayer>
        )}
        {attackSpeedBoost && (
          <StatDisplayer
            displayerType={DISPLAYER_TYPE.AtackSpeedModify}
            label={"Atk Speed"}
            content={attackSpeedBoost.toString()}
          ></StatDisplayer>
        )}
      </div>
    </OffenseCardContainer>
  );
});
