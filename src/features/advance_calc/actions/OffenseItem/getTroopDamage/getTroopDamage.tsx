import { ModifierItem } from "features/advance_calc/objects/modifierItem";
import { getModifiedValue } from "objects/baseModifierItem";
import { troopDataUtils } from "utils/GameData/troopDataUtils";
import { GAME_DATA_TYPE } from "data/game";
import { OffenseItem } from "features/advance_calc/objects/offenseItem";

const type = GAME_DATA_TYPE.Troop;

export function getTroopDamage(
  troopItem: OffenseItem,
  useTroopDeathDamage: boolean,
  activeModifier?: ModifierItem
): number {
  if (troopItem.type !== type) {
    throw new Error(
      `calculateTroopModifiedValue ERROR: troopItem must be troop type. troopItem: ${troopItem}`
    );
  }

  const troopID = troopItem.offenseID;
  const currentLevelPos = troopItem.currentLevelPos;
  const { getTroopDamage, getTroopDeathDamage, canDealDeathDamage } =
    troopDataUtils(troopID);

  if (useTroopDeathDamage && canDealDeathDamage()) {
    return getTroopDeathDamage(currentLevelPos);
  } else {
    let damage = getTroopDamage(currentLevelPos);

    if (activeModifier) {
      damage = getModifiedValue(damage, activeModifier);
    }

    return damage;
  }
}
