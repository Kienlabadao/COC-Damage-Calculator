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
  StatDisplayer,
} from "components/CalculatorComponents/OffenseCard";
import { Slider } from "components";
import { convertToDisplayerType } from "components/CalculatorComponents/OffenseCard/StatDisplayer";
import {
  OVERLAY_TYPE,
  OverlayType,
} from "components/CalculatorComponents/GameDataCardContainer/Overlay";
import { IMAGE_PATH } from "data/constants";

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
  const isModifierActive =
    modifierImgPath !== undefined && !useTroopDeathDamage;

  let topLeftOverlay = undefined;
  if (useTroopDeathDamage) {
    topLeftOverlay = {
      type: OVERLAY_TYPE.ImgDeath,
      imgPath: IMAGE_PATH.DeathDamage,
    };
  } else if (isModifierActive) {
    topLeftOverlay = { type: OVERLAY_TYPE.ImgRaged, imgPath: modifierImgPath };
  }
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
