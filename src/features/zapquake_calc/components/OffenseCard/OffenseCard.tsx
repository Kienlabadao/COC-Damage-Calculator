import { OffenseCardImage, Slider } from "components";
import { memo } from "react";

interface Props {
  name: string;
  imagePath: string;
  minLevelPos: number;
  maxLevelPos: number;
  currentLevelPos: number;
  updateCurrentLevelPos: (newCurrentLevelPos: number) => void;
  isDonated?: boolean;
}

export const OffenseCard = memo(function OffenseCard({
  name,
  imagePath,
  minLevelPos,
  maxLevelPos,
  currentLevelPos,
  updateCurrentLevelPos,
  isDonated = false,
}: Props) {
  console.log(`OffenseCard name ${name} rendered`);
  return (
    <div className="col card-custom card-custom__object text-center">
      <h5>{name}</h5>
      <div className="object-container">
        <OffenseCardImage
          imagePath={imagePath}
          level={currentLevelPos}
          isMaxed={currentLevelPos === maxLevelPos}
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
      <div className="d-flex justify-content-center align-items-center column-gap-1 mt-2">
        <img src="/images/other/attack.webp" width="20" />
        <div className="damage fw-bold"></div>
      </div>
    </div>
  );
});
