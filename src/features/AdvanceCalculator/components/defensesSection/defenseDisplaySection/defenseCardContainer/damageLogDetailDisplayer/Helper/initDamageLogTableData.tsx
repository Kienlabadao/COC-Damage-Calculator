import { GameDataImageDisplayerContainer, SIZE } from "components/Calculator";
import { TableData, TEXT_TYPE, TextFormatter, TextType } from "components/UI";
import {
  MAX_DISPLAYING_DECIMAL_PLACE,
  MIN_DISPLAYING_DECIMAL_PLACE,
} from "config";
import { AdvanceDamageLogItem } from "features/AdvanceCalculator/objects/advanceDamageLogItem";
import { DefenseItem } from "features/AdvanceCalculator/objects/defenseItem";
import { defenseDataUtils } from "utils/GameData/defenseDataUtils";
import { formatNumber } from "utils/numberUtils";

function getHPTextType(currentHP: number, maxHP: number): TextType {
  if (currentHP <= 0) {
    return TEXT_TYPE.Destroyed;
  } else if (currentHP === maxHP) {
    return TEXT_TYPE.HpFull;
  } else {
    return TEXT_TYPE.Normal;
  }
}

export function initDamageLogTableData(
  damageLogList: AdvanceDamageLogItem[],
  defenseItem: DefenseItem
): TableData[] {
  const defenseID = defenseItem.defenseID;
  const currentLevelPos = defenseItem.currentLevelPos;
  const { getDefenseHP } = defenseDataUtils(defenseID);

  const maxHP = getDefenseHP(currentLevelPos);

  return damageLogList.map((damageLog, index) => {
    const gameDataID = damageLog.actionID;
    const type = damageLog.type;
    const currentLevelPos = damageLog.currentLevelPos;
    const remainingHP = damageLog.remainingHP;
    //const d = damageLog.damageLogType;

    const remainingHPStr = formatNumber(
      remainingHP,
      MIN_DISPLAYING_DECIMAL_PLACE,
      MAX_DISPLAYING_DECIMAL_PLACE
    );
    const textType = getHPTextType(remainingHP, maxHP);

    const actionContent = (
      <GameDataImageDisplayerContainer
        key={`${gameDataID}_damage_log_${index}`}
        size={SIZE.Small}
        gameDataID={gameDataID}
        type={type}
        currentLevelPos={currentLevelPos}
      />
    );
    const typeContent = undefined;
    const damageContent = undefined;

    const hpContent = (
      <>
        <span>❤️</span>
        <TextFormatter content={remainingHPStr} textType={textType} />
      </>
    );

    return {
      action: actionContent,
      type: typeContent,
      damage: damageContent,
      hp: hpContent,
    };
  });
}
