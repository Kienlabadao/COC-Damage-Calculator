import { memo } from "react";
import {
  BACKGROUND_TYPE,
  BackgroundType,
  GameDataCardContainer,
  SIZE,
} from "components/CalculatorComponents/GameDataCardContainer";
import {
  OffenseCardContainer,
  NumberStatDisplayer,
} from "components/CalculatorComponents/OffenseCard";
import { Checkbox, Slider } from "components";
import {
  DISPLAYER_TYPE,
  StatDisplayer,
} from "components/CalculatorComponents/OffenseCard/StatDisplayer";
import {
  OVERLAY_TYPE,
  OverlayType,
} from "components/CalculatorComponents/GameDataCardContainer/Overlay";
import { EquipmentType } from "data/game";
import { capitalizeFirstLetter } from "utils/stringUtils";

interface Props {
  id: string;
  name: string;
  imagePath: string;
  equipmentTypeList: EquipmentType[];
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
  attackSpeedBoost?: number;
  modify?: number;
  backgroundType?: BackgroundType;
  isMaxed?: boolean;
  modifierImgPath?: string;
}

export const SupportEquipmentCard = memo(function SupportEquipmentCard({
  id,
  name,
  imagePath,
  equipmentTypeList,
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
  attackSpeedBoost,
  modify,
  backgroundType = BACKGROUND_TYPE.Normal,
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
        <NumberStatDisplayer
          displayerType={DISPLAYER_TYPE.Damage}
          label={"DPS Boost"}
          content={dpsBoost}
          isModifierActive={isModifierActive}
          useHardMode={useHardMode}
        />
        <NumberStatDisplayer
          displayerType={DISPLAYER_TYPE.Damage}
          label={"DPH Boost"}
          content={dphBoost}
          isModifierActive={isModifierActive}
          useHardMode={useHardMode}
        />
        {attackSpeedBoost && (
          <NumberStatDisplayer
            displayerType={DISPLAYER_TYPE.AtackSpeedModify}
            label={"Atk Speed"}
            content={attackSpeedBoost}
          />
        )}
        {modify && (
          <NumberStatDisplayer
            displayerType={DISPLAYER_TYPE.Modify}
            label={"Modify"}
            content={modify}
          />
        )}
        <StatDisplayer
          displayerType={DISPLAYER_TYPE.Type}
          label={"Type"}
          content={equipmentTypeList
            .map((equipmentType) =>
              capitalizeFirstLetter(equipmentType.toLowerCase())
            )
            .join(", ")}
        />
      </div>
    </OffenseCardContainer>
  );
});
