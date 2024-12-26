import { DamageType, OffenseType } from "data/game";
import { Checkbox, Slider } from "components";
import {
  convertToDisplayerType,
  StatDisplayer,
} from "components/CalculatorComponents/OffenseCard/StatDisplayer";
import { OffenseCardContainer } from "components/CalculatorComponents/OffenseCard";
import {
  BACKGROUND_TYPE,
  BackgroundType,
  GameDataCardContainer,
  SIZE,
} from "components/CalculatorComponents/GameDataCardContainer";
import {
  OVERLAY_TYPE,
  OverlayType,
} from "components/CalculatorComponents/GameDataCardContainer/Overlay";

interface Props {
  id: string;
  name: string;
  type: OffenseType;
  imagePath: string;
  minLevelPos: number;
  maxLevelPos: number;
  currentLevelPos: number;
  currentLevel: number;
  useOffense: boolean;
  updateCurrentLevelPos: (newCurrentLevelPos: number) => void;
  updateUseOffense: (newUseOffense: boolean) => void;
  damage: number;
  damageType: DamageType;
  backgroundType?: BackgroundType;
  isMaxed?: boolean;
}

export function OffenseCard({
  id,
  name,
  type,
  imagePath,
  minLevelPos,
  maxLevelPos,
  currentLevelPos,
  currentLevel,
  useOffense,
  updateCurrentLevelPos,
  updateUseOffense,
  damage,
  damageType,
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
      <div className="d-flex justify-content-center align-items-center mt-2">
        <Checkbox
          id={`use_${id}`}
          label={`Use ${type}`}
          isChecked={useOffense}
          onChange={(isChecked: boolean) => updateUseOffense(isChecked)}
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
}
