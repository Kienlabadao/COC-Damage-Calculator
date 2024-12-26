import { BaseModifierItem } from "objects/baseModifierItem";
import { troopDataUtils } from "utils/GameData/troopDataUtils";
import { GAME_DATA_TYPE } from "data/game";
import { BaseOffenseItem } from "objects/baseOffenseItem";
import { ACTION_TYPE } from "objects/actionItem";
import { calculateModifiedActionValue } from "actions/BaseModifierItem";

const type = GAME_DATA_TYPE.Troop;

export function calculateTroopDamage(
  troopItem: BaseOffenseItem,
  useTroopDeathDamage: boolean,
  activeModifier?: BaseModifierItem
): number {
  if (troopItem.type !== type) {
    throw new Error(
      `calculateTroopDamage ERROR: troopItem must be troop type. troopItem: ${troopItem}`
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
      damage = calculateModifiedActionValue(
        damage,
        ACTION_TYPE.Troop,
        activeModifier
      );
    }

    return damage;
  }
}
