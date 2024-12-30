import {
  createSpellCountItem,
  SpellCountItem,
} from "features/ZapquakeCalculator/objects/spellCountItem";
import { ZapquakeDamageLogItem } from "features/ZapquakeCalculator/objects/zapquakeDamageLogItem";
import { ACTION_TYPE } from "objects/actionItem";
import { DAMAGE_LOG_TYPE } from "objects/damageLogItem";

export function convertZapquakeDamageLogList(
  zapquakeDamageLogItem: ZapquakeDamageLogItem[]
): SpellCountItem[] {
  const spellCountItemList: SpellCountItem[] = [];

  zapquakeDamageLogItem.forEach((damageLogItem) => {
    if (
      damageLogItem.damageLogType !== DAMAGE_LOG_TYPE.Immune &&
      damageLogItem.type === ACTION_TYPE.Spell
    ) {
      const existingItem = spellCountItemList.find(
        (spellCountItem) =>
          spellCountItem.spellID === damageLogItem.actionID &&
          spellCountItem.currentLevelPos === damageLogItem.currentLevelPos &&
          spellCountItem.isDonated === damageLogItem.isDonated
      );

      if (existingItem) {
        existingItem.count += 1;
      } else {
        const spellID = damageLogItem.actionID;
        const currentLevelPos = damageLogItem.currentLevelPos;
        const isDonated = damageLogItem.isDonated;
        const count = 1;

        spellCountItemList.push(
          createSpellCountItem(spellID, isDonated, currentLevelPos, count)
        );
      }
    }
  });

  return spellCountItemList;
}
