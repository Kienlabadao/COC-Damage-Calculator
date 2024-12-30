import { DefenseItem } from "features/ZapquakeCalculator/objects/defenseItem";
import { memo } from "react";
import { defenseDataUtils } from "utils/GameData/defenseDataUtils";
import { SpellCountItem } from "features/ZapquakeCalculator/objects/spellCountItem";
import {
  filterOffenseItemList,
  OffenseItem,
} from "features/ZapquakeCalculator/objects/offenseItem";
import { OFFENSE_TYPE } from "data/Game";
import {
  DEFENSE_STATUS,
  DefenseStatus,
} from "features/ZapquakeCalculator/objects/defenseLog";
import { SpellDisplayer } from "./defenseCard/spellDisplayer";
import {
  EquipmentDestroyedStatus,
  ImpossibleDestroyStatus,
  UsedEquipmentDisplayer,
} from "components/Calculator";
import { DefenseCard } from "./defenseCard";

function createDefenseStatus(
  defenseStatus: DefenseStatus,
  id: string,
  spellCountList: SpellCountItem[][]
): JSX.Element {
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
}

function createUsedEquipmentDisplayer(
  equipmentItemList: OffenseItem[],
  isImmune: (offenseID: string) => boolean
): JSX.Element | undefined {
  if (equipmentItemList.length > 0) {
    return (
      <UsedEquipmentDisplayer
        equipmentItemList={equipmentItemList}
        isImmune={isImmune}
      />
    );
  } else {
    return undefined;
  }
}

interface Props {
  defenseItem: DefenseItem;
  updateDefense: (defenseID: string, currentLevelPos: number) => void;
  defenseStatus: DefenseStatus;
  spellCountList: SpellCountItem[][];
  offenseItemList: OffenseItem[];
}

export const DefenseCardContainer = memo(function DefenseCardContainer({
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

  const id = defenseItem.id;
  const name = getDefenseName();
  const minLevelPos = getDefenseMinLevelPos();
  const maxLevelPos = getDefenseMaxLevelPos();
  const currentLevelPos = defenseItem.currentLevelPos;
  const currentLevel = getDefenseLevel(currentLevelPos);
  const superchargeLevel = getDefenseSuperchargeLevel(currentLevelPos);
  const isMaxed = isMaxLevel(currentLevelPos);
  const imagePath = getDefenseImage(currentLevelPos);
  const maxHP = getDefenseHP(currentLevelPos);
  const defenseStatusDisplayer = createDefenseStatus(
    defenseStatus,
    id,
    spellCountList
  );
  const usedEquipmentDisplayer = createUsedEquipmentDisplayer(
    equipmentItemList,
    isImmune
  );

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
      defenseStatusDisplayer={defenseStatusDisplayer}
      usedEquipmentDisplayer={usedEquipmentDisplayer}
    />
  );
});
