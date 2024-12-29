import { DamageType } from "data/game";
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
  convertToDisplayerType,
} from "components/CalculatorComponents/OffenseCard";
import { Slider } from "components/uiComponents/Slider";
import {
  OVERLAY_TYPE,
  OverlayType,
} from "components/CalculatorComponents/GameDataCardContainer/Overlay";
import { ActionAdderButtons } from "features/advance_calc/components/ActionListBuildingSection/ActionAdderButtons";

interface Props {
  id: string;
  name: string;
  imagePath: string;
  minLevelPos: number;
  maxLevelPos: number;
  currentLevelPos: number;
  currentLevel: number;
  updateCurrentLevelPos: (newCurrentLevelPos: number) => void;
  damage: number;
  damageType: DamageType;
  createAction: (count: number) => void;
  backgroundType?: BackgroundType;
  isMaxed?: boolean;
}

export const SpellCard = memo(function SpellCard({
  name,
  imagePath,
  minLevelPos,
  maxLevelPos,
  currentLevelPos,
  currentLevel,
  updateCurrentLevelPos,
  damage,
  damageType,
  createAction,
  backgroundType = BACKGROUND_TYPE.Normal,
  isMaxed = false,
}: Props) {
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
        <ActionAdderButtons createAction={createAction} />
      </div>
      <div className="mt-2">
        <NumberStatDisplayer
          displayerType={convertToDisplayerType(damageType)}
          label={"Damage"}
          content={damage}
          isModifierActive={false}
        />
      </div>
    </OffenseCardContainer>
  );
});
