import { Slider } from "components/uiComponents/Slider";
import { StatDisplayer } from "components/CalculatorComponents/DefenseCard";
import { DefenseItem } from "features/advance_calc/objects/defenseItem";
import { memo } from "react";
import { defenseDataUtils } from "utils/GameData/defenseDataUtils";
import {
  DEFENSE_STATUS,
  DefenseStatus,
} from "features/advance_calc/objects/defenseLog";
import { AdvanceDamageLogItem } from "features/advance_calc/objects/advanceDamageLogItem";
import { getArrayLastElement } from "utils/objectUtils";

export interface Props {
  defenseItem: DefenseItem;
  updateDefense: (defenseID: string, currentLevelPos: number) => void;
  defenseStatus: DefenseStatus;
  damageLogList: AdvanceDamageLogItem[];
}

export const DefenseCard = memo(function DefenseCard({
  defenseItem,
  updateDefense,
  defenseStatus,
  damageLogList,
}: Props) {
  const updateCurrentLevelPos = (newCurrentLevelPos: number) => {
    updateDefense(defenseID, newCurrentLevelPos);
  };

  const defenseID = defenseItem.defenseID;
  const {
    getDefenseName,
    getDefenseImage,
    getDefenseDestroyedImage,
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
  const currentLevelPos = defenseItem.currentLevelPos;
  const currentLevel = getDefenseLevel(currentLevelPos);
  const superchargeLevel = getDefenseSuperchargeLevel(currentLevelPos);
  const isMaxed = isMaxLevel(currentLevelPos);
  const imagePath =
    defenseStatus === DEFENSE_STATUS.Survived
      ? getDefenseImage(currentLevelPos)
      : getDefenseDestroyedImage();
  const maxHP = getDefenseHP(currentLevelPos);
  const remainingHP =
    damageLogList.length > 0
      ? getArrayLastElement(damageLogList).remainingHP
      : maxHP;

  return (
    <div>
      <div className="card-custom card-custom__object card-custom__object--defense shadow p-3">
        <StatDisplayer
          name={name}
          imagePath={imagePath}
          currentLevel={currentLevel}
          superchargeLevel={superchargeLevel}
          isMaxed={isMaxed}
          currentHP={remainingHP}
          maxHP={maxHP}
        />
        <Slider
          min={minLevelPos}
          max={maxLevelPos}
          currentValue={currentLevelPos}
          onChange={updateCurrentLevelPos}
          useTheme={false}
          className="mt-3"
        />
      </div>
    </div>
  );
});
