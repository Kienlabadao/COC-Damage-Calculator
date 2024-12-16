import { SpellCountItem } from "features/zapquake_calc/objects/spellCountItem";
import { ZapquakeDamageLogItem } from "features/zapquake_calc/objects/zapquakeDamageLogItem";
import { ACTION_TYPE } from "objects/actionItem";

export function convertZapquakeDamageLogList(
  zapquakeDamageLogItem: ZapquakeDamageLogItem[]
): SpellCountItem[] {
  const spellCountItemList: SpellCountItem[] = [];

  zapquakeDamageLogItem.forEach((damageLogItem) => {
    if (damageLogItem.type === ACTION_TYPE.Spell) {
      const existingItem = spellCountItemList.find(
        (spellCountItem) =>
          spellCountItem.spellID === damageLogItem.actionID &&
          spellCountItem.currentLevelPos === damageLogItem.currentLevelPos &&
          spellCountItem.isDonated === damageLogItem.isDonated
      );

      if (existingItem) {
        existingItem.count += 1;
      } else {
        const newItem: SpellCountItem = {
          spellID: damageLogItem.actionID,
          currentLevelPos: damageLogItem.currentLevelPos,
          isDonated: damageLogItem.isDonated,
          count: 1,
        };
        spellCountItemList.push(newItem);
      }
    }
  });

  return spellCountItemList;
}
