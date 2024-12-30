import { DefenseItem } from "features/AdvanceCalculator/objects/defenseItem";
import { memo } from "react";
import { defenseDataUtils } from "utils/GameData/defenseDataUtils";
import {
  DEFENSE_STATUS,
  DefenseStatus,
} from "features/AdvanceCalculator/objects/defenseLog";
import { DefenseCard } from "./defenseCard";
import { AdvanceDamageLogItem } from "features/AdvanceCalculator/objects/advanceDamageLogItem";
import { getArrayLastElement } from "utils/objectUtils";

interface Props {
  defenseItem: DefenseItem;
  updateDefense: (defenseID: string, currentLevelPos: number) => void;
  defenseStatus: DefenseStatus;
  damageLogList: AdvanceDamageLogItem[];
}

export const DefenseCardContainer = memo(function DefenseCardContainer({
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
    <DefenseCard
      name={name}
      imagePath={imagePath}
      minLevelPos={minLevelPos}
      maxLevelPos={maxLevelPos}
      currentLevelPos={currentLevelPos}
      currentLevel={currentLevel}
      superchargeLevel={superchargeLevel}
      isMaxed={isMaxed}
      updateCurrentLevelPos={updateCurrentLevelPos}
      maxHP={maxHP}
      remainingHP={remainingHP}
    />
  );
});
