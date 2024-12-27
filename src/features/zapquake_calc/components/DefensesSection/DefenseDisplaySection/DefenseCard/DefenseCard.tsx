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
  filterOffenseItemList,
  OffenseItem,
} from "features/zapquake_calc/objects/offenseItem";
import { OFFENSE_TYPE } from "data/game";
import { UsedEquipmentDisplayer } from "components/CalculatorComponents/DefenseCard/UsedEquipmentDisplayer/UsedEquipmentDisplayer";
import {
  DEFENSE_STATUS,
  DefenseStatus,
} from "features/zapquake_calc/objects/defenseLog";

export interface Props {
  defenseItem: DefenseItem;
  updateDefense: (defenseID: string, currentLevelPos: number) => void;
  defenseStatus: DefenseStatus;
  spellCountList: SpellCountItem[][];
  offenseItemList: OffenseItem[];
}

export const DefenseCard = memo(function DefenseCard({
  defenseItem,
  updateDefense,
  defenseStatus,
  spellCountList,
  offenseItemList,
}: Props) {
  const updateCurrentLevelPos = (newCurrentLevelPos: number) => {
    updateDefense(defenseID, newCurrentLevelPos);
  };
  const equipmentItemList = filterOffenseItemList(
    offenseItemList,
    new Set([OFFENSE_TYPE.Equipment]),
    true
  );

  const defenseID = defenseItem.defenseID;
  const {
    getDefenseName,
    getDefenseImage,
    getDefenseMinLevelPos,
    getDefenseMaxLevelPos,
    getDefenseLevel,
    getDefenseSuperchargeLevel,
    isMaxLevel,
    getDefenseHP,
    isImmune,
  } = defenseDataUtils(defenseID);

  const name = getDefenseName();
  const id = defenseItem.id;
  const minLevelPos = getDefenseMinLevelPos();
  const maxLevelPos = getDefenseMaxLevelPos();
  const currentLevelPos = defenseItem.currentLevelPos;
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
          onChange={updateCurrentLevelPos}
          useTheme={false}
          className="mt-3"
        />
        <div className="my-3">
          {equipmentItemList.length > 0 && (
            <UsedEquipmentDisplayer
              equipmentItemList={equipmentItemList}
              isImmune={isImmune}
            />
          )}
          {renderDefenseStatus()}
        </div>
      </div>
    </div>
  );
});
