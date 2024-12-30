import { convertActionItem } from "actions/DamageLogItem";
import { ZapquakeActionItem } from "features/ZapquakeCalculator/objects/zapquakeActionItem";
import { ZapquakeDamageLogItem } from "features/ZapquakeCalculator/objects/zapquakeDamageLogItem";
import { defenseDataUtils } from "utils/GameData/defenseDataUtils";

export function convertZapquakeActionList(
  defenseID: string,
  defenseCurrentLevelPos: number,
  zapquakeActionList: ZapquakeActionItem[]
): ZapquakeDamageLogItem[] {
  const { getDefenseHP, isImmune } = defenseDataUtils(defenseID);

  const zapquakeDamageLogItemList: ZapquakeDamageLogItem[] = [];
  const maxHP = getDefenseHP(defenseCurrentLevelPos);
  let currentHP = maxHP;
  let earthquakeCount = 0;

  for (const zapquakeAction of zapquakeActionList) {
    if (currentHP > 0) {
      const damageLogItem = {
        ...convertActionItem(
          zapquakeAction,
          currentHP,
          maxHP,
          earthquakeCount,
          isImmune
        ),
        isDonated: zapquakeAction.isDonated,
      };

      currentHP = damageLogItem.remainingHP;
      earthquakeCount = damageLogItem.earthquakeCount;

      zapquakeDamageLogItemList.push(damageLogItem);
    } else {
      break;
    }
  }

  return zapquakeDamageLogItemList;
}
