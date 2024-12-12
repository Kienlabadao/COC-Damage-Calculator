import { DAMAGE_TYPE, DamageType, OffenseType } from "data/game";
import { Checkbox, Slider } from "components";
import {
  BackgroundType,
  OffenseCardImage,
} from "components/CalculatorComponents/OffenseCard/OffenseCardImage";
import {
  DISPLAYER_TYPE,
  DisplayerType,
  StatDisplayer,
} from "components/CalculatorComponents/OffenseCard/StatDisplayer";
import { OffenseCardContainer } from "components/CalculatorComponents/OffenseCard";

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
  type: OffenseType;
  imagePath: string;
  backgroundType: BackgroundType;
  minLevelPos: number;
  maxLevelPos: number;
  currentLevelPos: number;
  currentLevel: number;
  useOffense: boolean;
  updateCurrentLevelPos: (newCurrentLevelPos: number) => void;
  updateUseOffense: (newUseOffense: boolean) => void;
  damage: number;
  damageType: DamageType;
}

export function OffenseCard({
  id,
  name,
  type,
  imagePath,
  backgroundType,
  minLevelPos,
  maxLevelPos,
  currentLevelPos,
  currentLevel,
  useOffense,
  updateCurrentLevelPos,
  updateUseOffense,
  damage,
  damageType,
}: Props) {
  return (
    <OffenseCardContainer>
      <h5>{name}</h5>
      <div>
        <OffenseCardImage
          imagePath={imagePath}
          level={currentLevel}
          isMaxed={currentLevelPos === maxLevelPos}
          backgroudType={backgroundType}
        />
      </div>
      <div className="mt-2">
        <Slider
          min={minLevelPos}
          max={maxLevelPos}
          currentValue={currentLevelPos}
          onInput={(newValue: number) => updateCurrentLevelPos(newValue)}
        />
      </div>
      <div className="d-flex justify-content-center align-items-center mt-2">
        <Checkbox
          id={`use_${id}`}
          label={`Use ${type}`}
          isChecked={useOffense}
          onInput={(isChecked: boolean) => updateUseOffense(isChecked)}
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
