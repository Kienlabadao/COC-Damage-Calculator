import { GameDataType } from "data/game";
import { ModifierItem } from "features/advance_calc/objects/modifierItem";
import { modifierDataUtils } from "utils/GameData/modifierDataUtils";

export function getActiveModifier(
  gameDataID: string,
  type: GameDataType,
  modifierItemList: ModifierItem[]
): ModifierItem | null {
  let activeModifier: ModifierItem | null = null;
  let activeModifierModify = 0;

  for (const modifierItem of modifierItemList) {
    if (modifierItem.use) {
      const {
        getModifierAffectType,
        getModifierAffectOnly,
        getModifierDoesntAffect,
        getModifierModify,
      } = modifierDataUtils(modifierItem.modifierID);
      const currentLevelPod = modifierItem.currentLevelPos;
      const modify = getModifierModify(currentLevelPod);

      if (!getModifierDoesntAffect().includes(gameDataID)) {
        if (getModifierAffectOnly().includes(gameDataID)) {
          if (!activeModifier || activeModifierModify < modify) {
            activeModifier = modifierItem;
            activeModifierModify = modify;
          }
        } else if (getModifierAffectType().includes(type)) {
          if (!activeModifier || activeModifierModify < modify) {
            activeModifier = modifierItem;
            activeModifierModify = modify;
          }
        }
      }
    }
  }

  return activeModifier;
}
