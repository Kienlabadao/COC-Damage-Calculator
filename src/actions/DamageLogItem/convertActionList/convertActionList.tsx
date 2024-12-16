import { ActionItem } from "objects/actionItem";
import { DamageLogItem } from "objects/damageLogItem";
import { defenseDataUtils } from "utils/GameData/defenseDataUtils";
import { convertActionItem } from "../convertActionItem";

export function convertActionList(
  defenseID: string,
  defenseCurrentLevelPos: number,
  actionList: ActionItem[]
): DamageLogItem[] {
  const { getDefenseHP, isImmune } = defenseDataUtils(defenseID);

  const damageLogItemList: DamageLogItem[] = [];
  const maxHP = getDefenseHP(defenseCurrentLevelPos);
  let currentHP = maxHP;
  let earthquakeCount = 0;

  for (const action of actionList) {
    if (currentHP > 0) {
      const damageLogItem = convertActionItem(
        action,
        currentHP,
        maxHP,
        earthquakeCount,
        isImmune
      );

      currentHP = damageLogItem.remainingHP;
      earthquakeCount = damageLogItem.earthquakeCount;

      damageLogItemList.push(damageLogItem);
    } else {
      break;
    }
  }

  return damageLogItemList;
}
