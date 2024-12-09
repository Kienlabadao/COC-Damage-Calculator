import { DAMAGE_TYPE, DamageType } from "assets/data/game";
import {
  OffenseCardContainer,
  OffenseCardImage,
  Slider,
  StatDisplayer,
} from "components";
import { BackgroundType } from "components/CalculatorComponents/OffenseCard/OffenseCardImage";
import {
  DISPLAYER_TYPE,
  DisplayerType,
} from "components/CalculatorComponents/OffenseCard/StatDisplayer";
import { memo } from "react";

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
  name: string;
  imagePath: string;
  backgroundType: BackgroundType;
  minLevelPos: number;
  maxLevelPos: number;
  currentLevelPos: number;
  currentLevel: number;
  updateCurrentLevelPos: (newCurrentLevelPos: number) => void;
  damage: number;
  damageType: DamageType;
  isDonated?: boolean;
}

export const OffenseCard = memo(function OffenseCard({
  name,
  imagePath,
  backgroundType,
  minLevelPos,
  maxLevelPos,
  currentLevelPos,
  currentLevel,
  updateCurrentLevelPos,
  damage,
  damageType,
  isDonated = false,
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
        <input
          className="useCheckbox form-check-input checkbox me-1"
          type="checkbox"
          id="useLightningSpell"
          onInput={() => console.log("pressed")}
        />
        <label className="h5 mb-0" htmlFor="useLightningSpell">
          Use spell
        </label>
      </div>
      {isDonated && (
        <div className="donate-count">
          <label htmlFor="donateCount" className="form-label">
            <strong>Number of spell in clan castle:</strong>
          </label>
          <div className="d-flex justify-content-center">
            <input
              type="number"
              min="0"
              max="3"
              value="0"
              className="form-control input-box bg-secondary"
              id="donateCount"
              onInput={() => console.log("pressed")}
            />
          </div>
        </div>
      )}
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
