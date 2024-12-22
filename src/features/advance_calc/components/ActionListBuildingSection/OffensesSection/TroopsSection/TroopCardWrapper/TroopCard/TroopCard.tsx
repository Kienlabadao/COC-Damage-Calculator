import { DamageType } from "data/game";
import { memo } from "react";
import {
  BACKGROUND_TYPE,
  BackgroundType,
  GameDataCardContainer,
  SIZE,
  TOP_LEFT_OVERLAY_TYPE,
  TopLeftOverlayType,
} from "components/CalculatorComponents/GameDataCardContainer";
import {
  OffenseCardContainer,
  StatDisplayer,
} from "components/CalculatorComponents/OffenseCard";
import { Slider } from "components";
import { convertToDisplayerType } from "components/CalculatorComponents/OffenseCard/StatDisplayer";

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
  backgroundType?: BackgroundType;
  isMaxed?: boolean;
  modifierImgPath?: string;
  useTroopDeathDamage?: boolean;
}

export const TroopCard = memo(function TroopCard({
  id,
  name,
  imagePath,
  minLevelPos,
  maxLevelPos,
  currentLevelPos,
  currentLevel,
  updateCurrentLevelPos,
  damage,
  damageType,
  backgroundType = BACKGROUND_TYPE.Normal,
  isMaxed = false,
  modifierImgPath,
  useTroopDeathDamage = false,
}: Props) {
  const isModifierActive = modifierImgPath !== undefined;

  if (isModifierActive && useTroopDeathDamage) {
    throw new Error(
      `TroopCard ERROR: TroopCard cannot use both modifier and death damage at the same time. id: ${id}`
    );
  }
  let topLeftOverlayType: TopLeftOverlayType;
  if (isModifierActive) {
    topLeftOverlayType = TOP_LEFT_OVERLAY_TYPE.Modifier;
  } else if (useTroopDeathDamage) {
    topLeftOverlayType = TOP_LEFT_OVERLAY_TYPE.DeathDamage;
  } else {
    topLeftOverlayType = TOP_LEFT_OVERLAY_TYPE.None;
  }

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
      <div className="mt-2">
        <StatDisplayer
          displayerType={convertToDisplayerType(damageType)}
          label={"Damage"}
          content={damage.toString()}
          isModifierActive={isModifierActive}
        ></StatDisplayer>
      </div>
    </OffenseCardContainer>
  );
});
