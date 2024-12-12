import { Slider } from "components";
import { StatDisplayer } from "components/CalculatorComponents/DefenseCard";
import { DefenseItem } from "features/zapquake_calc/utils/defenseItemUtils";
import { memo } from "react";
import { defenseDataUtils } from "utils/GameData/defenseDataUtils";

interface Props {
  defense: DefenseItem;
  updateDefenseItem: (defenseID: string, currentLevelPos: number) => void;
}

export const DefenseCard = memo(function DefenseCard({
  defense,
  updateDefenseItem,
}: Props) {
  const updateCurrentLevelPos = (newCurrentLevelPos: number) => {
    updateDefenseItem(defenseID, newCurrentLevelPos);
  };

  const defenseID = defense.defenseID;
  const {
    getDefenseName,
    getDefenseImage,
    getDefenseMinLevelPos,
    getDefenseMaxLevelPos,
    getDefenseLevel,
    getDefenseSuperchargeLevel,
    isMaxLevel,
    getDefenseHP,
  } = defenseDataUtils(defenseID);

  const name = getDefenseName();
  const minLevelPos = getDefenseMinLevelPos();
  const maxLevelPos = getDefenseMaxLevelPos();
  const currentLevelPos = defense.currentLevelPos;
  const currentLevel = getDefenseLevel(currentLevelPos);
  const superchargeLevel = getDefenseSuperchargeLevel(currentLevelPos);
  const isMaxed = isMaxLevel(currentLevelPos);
  const imagePath = getDefenseImage(currentLevelPos);
  const hp = getDefenseHP(currentLevelPos);

  return (
    <div>
      <div className="card-custom card-custom__object card-custom__object--defense shadow p-3">
        <StatDisplayer
          name={name}
          imagePath={imagePath}
          currentLevel={currentLevel}
          superchargeLevel={superchargeLevel}
          isMaxed={isMaxed}
          currentHP={hp}
          maxHP={hp}
        />
        <Slider
          min={minLevelPos}
          max={maxLevelPos}
          currentValue={currentLevelPos}
          onInput={updateCurrentLevelPos}
          useTheme={false}
          className="mt-3"
        />
        <div className="my-3">
          <div className="equipment-div d-none">
            <h5>Heroes Equipment used:</h5>
            <div className="equipment-list d-flex justify-content-center align-items-center flex-wrap gap-2"></div>
          </div>
          <div className="status-div status-container d-flex align-items-center my-3">
            <img
              className="image status-container__img"
              width="80"
              src="/images/other/raged-barbarian.png"
            />
            <div className="info status-container__text">
              It's impossible to destroy this defense with setup. Womp womp! 😔
            </div>
          </div>
          <div className="defense-div container-fluid mt-3 d-none">
            <h5>Defense needed:</h5>
            <div className="defense-main-display row gy-2 gx-1 align-items-center"></div>
            <div className="collapse-btn text-center my-3 d-none">
              <button
                className="show-more-btn btn btn-secondary collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#showMore-townhall"
                aria-controls="showMore-townhall"
                aria-expanded="false"
                onClick={() => console.log("pressed")}
              >
                Show More
              </button>
            </div>
            <div
              className="defense-display row row-cols-1 gy-2 gx-0 collapse"
              id="showMore-townhall"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
});
