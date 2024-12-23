import { BaseModifierItem, getModifiedValue } from "objects/baseModifierItem";
import { troopDataUtils } from "utils/GameData/troopDataUtils";
import { GAME_DATA_TYPE } from "data/game";
import { BaseOffenseItem } from "objects/baseOffenseItem";

const type = GAME_DATA_TYPE.Troop;

export function calculateTroopItemModifiedDamage(
  troopItem: BaseOffenseItem,
  useTroopDeathDamage: boolean,
  activeModifier: BaseModifierItem
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
    const damage = getTroopDamage(currentLevelPos);

    return getModifiedValue(damage, activeModifier);
  }
}
