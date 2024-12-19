import { Slider } from "components";
import { StatDisplayer } from "components/CalculatorComponents/DefenseCard";
import { DefenseItem } from "features/zapquake_calc/objects/defenseItem";
import { memo } from "react";
import { defenseDataUtils } from "utils/GameData/defenseDataUtils";
import { ImpossibleDestroyStatus } from "./ImpossibleDestroyStatus";
import { EquipmentDestroyedStatus } from "./EquipmentDestroyedStatus";
import { SpellDisplayer } from "./SpellDisplayer";
import { SpellCountItem } from "features/zapquake_calc/objects/spellCountItem";
import {
  DEFENSE_STATUS,
  DefenseStatus,
} from "features/zapquake_calc/actions/DefenseItem";

export interface Props {
  defense: DefenseItem;
  updateDefense: (defenseID: string, currentLevelPos: number) => void;
  defenseStatus: DefenseStatus;
  spellCountList: SpellCountItem[][];
}

export const DefenseCard = memo(function DefenseCard({
  defense,
  updateDefense,
  defenseStatus,
  spellCountList,
}: Props) {
  const updateCurrentLevelPos = (newCurrentLevelPos: number) => {
    updateDefense(defenseID, newCurrentLevelPos);
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
  const id = defense.id;
  const minLevelPos = getDefenseMinLevelPos();
  const maxLevelPos = getDefenseMaxLevelPos();
  const currentLevelPos = defense.currentLevelPos;
  const currentLevel = getDefenseLevel(currentLevelPos);
  const superchargeLevel = getDefenseSuperchargeLevel(currentLevelPos);
  const isMaxed = isMaxLevel(currentLevelPos);
  const imagePath = getDefenseImage(currentLevelPos);
  const hp = getDefenseHP(currentLevelPos);

  const renderDefenseStatus = (): JSX.Element => {
    switch (defenseStatus) {
      case DEFENSE_STATUS.Normal:
        return <SpellDisplayer id={id} spellCountList={spellCountList} />;
      case DEFENSE_STATUS.EquipmentDestroyed:
        return <EquipmentDestroyedStatus />;
      case DEFENSE_STATUS.ImpossibleDestroy:
        return <ImpossibleDestroyStatus />;
      default:
        throw new Error(
          `DefenseCard.renderDefenseStatus ERROR: defenseStatus (${defenseStatus}) is not supported.`
        );
    }
  };

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
          {renderDefenseStatus()}
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
