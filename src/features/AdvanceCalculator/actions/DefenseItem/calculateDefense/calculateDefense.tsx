import { getArrayLastElement } from "utils/objectUtils";
import {
  DEFENSE_STATUS,
  DefenseLog,
} from "features/advance_calc/objects/defenseLog";
import { DefenseItem } from "features/advance_calc/objects/defenseItem";
import { AdvanceActionItem } from "features/advance_calc/objects/advanceActionItem/advanceActionItem";
import { convertAdvanceActionList } from "../../AdvanceDamageLogItem";

export function calculateDefense(
  defenseItem: DefenseItem,
  actionList: AdvanceActionItem[]
): DefenseLog {
  const defenseID = defenseItem.defenseID;
  const defenseLevelPos = defenseItem.currentLevelPos;

  const damageLogList = convertAdvanceActionList(
    defenseID,
    defenseLevelPos,
    actionList
  );

  if (
    damageLogList.length > 0 &&
    getArrayLastElement(damageLogList).remainingHP <= 0
  ) {
    return { defenseStatus: DEFENSE_STATUS.Destroyed, damageLogList };
  } else {
    return { defenseStatus: DEFENSE_STATUS.Survived, damageLogList };
  }
}
