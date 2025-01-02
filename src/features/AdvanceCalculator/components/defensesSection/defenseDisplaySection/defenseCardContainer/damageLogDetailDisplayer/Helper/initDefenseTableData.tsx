import { GameDataImageDisplayerContainer, SIZE } from "components/Calculator";
import { TableData, TEXT_TYPE, TextFormatter } from "components/UI";
import { GAME_DATA_TYPE } from "data/Game";
import { DefenseItem } from "features/AdvanceCalculator/objects/defenseItem";
import { defenseDataUtils } from "utils/GameData/defenseDataUtils";

const type = GAME_DATA_TYPE.Defense;

export function initDefenseTableData(defenseItem: DefenseItem): TableData {
  const defenseID = defenseItem.defenseID;
  const currentLevelPos = defenseItem.currentLevelPos;
  const { /*getDefenseSuperchargeLevel,*/ getDefenseHP } =
    defenseDataUtils(defenseID);

  //const superchargeLevel = getDefenseSuperchargeLevel(currentLevelPos);
  const maxHP = getDefenseHP(currentLevelPos);

  const actionContent = (
    <GameDataImageDisplayerContainer
      size={SIZE.Small}
      gameDataID={defenseID}
      type={type}
      currentLevelPos={currentLevelPos}
    />
  );
  const typeContent = undefined;
  const damageContent = undefined;
  const hpContent = (
    <>
      <span>❤️</span>
      <TextFormatter content={maxHP.toString()} textType={TEXT_TYPE.HpFull} />
    </>
  );

  return {
    action: actionContent,
    type: typeContent,
    damage: damageContent,
    hp: hpContent,
  };
}
