import { ROUNDING_PRECISION } from "config";
import { MODIFIER_HERO_EFFECTIVENESS } from "data/Game";
import { ACTION_TYPE, ActionType } from "objects/actionItem";
import { BaseModifierItem } from "objects/baseModifierItem";
import { calculateModifiedValue } from "utils/GameData/gameDataCalculatorUtils";
import { modifierDataUtils } from "utils/GameData/modifierDataUtils";
import { roundToN } from "utils/numberUtils";

export function calculateModifiedActionValue(
  baseValue: number,
  type: ActionType,
  baseModifierItem: BaseModifierItem
) {
  const { getModifierModify } = modifierDataUtils(baseModifierItem.modifierID);

  let modifyPercentage = getModifierModify(baseModifierItem.currentLevelPos);
  if (type === ACTION_TYPE.Hero || type === ACTION_TYPE.Equipment) {
    modifyPercentage = roundToN(
      modifyPercentage * MODIFIER_HERO_EFFECTIVENESS,
      ROUNDING_PRECISION
    );
  }

  return calculateModifiedValue(baseValue, modifyPercentage);
}
