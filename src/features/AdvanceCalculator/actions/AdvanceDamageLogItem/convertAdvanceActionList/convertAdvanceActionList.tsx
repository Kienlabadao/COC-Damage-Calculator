import { convertActionItem } from "actions/DamageLogItem";
import { AdvanceActionItem } from "features/AdvanceCalculator/objects/advanceActionItem";
import { AdvanceDamageLogItem } from "features/AdvanceCalculator/objects/advanceDamageLogItem";
import { defenseDataUtils } from "utils/GameData/defenseDataUtils";

export function convertAdvanceActionList(
  defenseID: string,
  defenseCurrentLevelPos: number,
  advanceActionList: AdvanceActionItem[]
): AdvanceDamageLogItem[] {
  const { getDefenseHP, isImmune } = defenseDataUtils(defenseID);

  const advanceDamageLogItemList: AdvanceDamageLogItem[] = [];
  const maxHP = getDefenseHP(defenseCurrentLevelPos);
  let currentHP = maxHP;
  let earthquakeCount = 0;

  for (const advanceAction of advanceActionList) {
    if (currentHP > 0) {
      const damageLogItem = {
        ...convertActionItem(
          advanceAction,
          currentHP,
          maxHP,
          earthquakeCount,
          isImmune
        ),
      };

      currentHP = damageLogItem.remainingHP;
      earthquakeCount = damageLogItem.earthquakeCount;

      advanceDamageLogItemList.push(damageLogItem);
    } else {
      break;
    }
  }

  return advanceDamageLogItemList;
}
