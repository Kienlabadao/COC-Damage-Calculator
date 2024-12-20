import { DAMAGE_TYPE, DamageType } from "data/game";
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
import { Slider } from "components";
import {
  DISPLAYER_TYPE,
  DisplayerType,
} from "components/CalculatorComponents/OffenseCard/StatDisplayer";

function convertToDisplayerType(damageType: DamageType): DisplayerType {
  switch (damageType) {
    case DAMAGE_TYPE.Direct:
      return DISPLAYER_TYPE.Damage;
    case DAMAGE_TYPE.Earthquake:
      return DISPLAYER_TYPE.EarthquakeDamage;
    default:
      throw new Error(
        `OffenseCard.convertToDisplayerType ERROR: DamageType (${damageType}) not supported.`
      );
  }
}

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
  useTroopDeathDamage?: boolean;
}

export const TroopCard = memo(function TroopCard({
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
  useTroopDeathDamage = false,
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
          topLeftOverlayType={
            useTroopDeathDamage
              ? TOP_LEFT_OVERLAY_TYPE.DeathDamage
              : TOP_LEFT_OVERLAY_TYPE.None
          }
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
          isModifierActive={false}
        ></StatDisplayer>
      </div>
    </OffenseCardContainer>
  );
});
