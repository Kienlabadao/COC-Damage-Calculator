import { ModifierItem } from "features/advance_calc/objects/modifierItem";
import { getActiveModifier } from "../getActiveModifier";
import { getModifiedValue } from "objects/baseModifierItem";
import { troopDataUtils } from "utils/GameData/troopDataUtils";
import { GAME_DATA_TYPE } from "data/game";
import { OffenseItem } from "features/advance_calc/objects/offenseItem";

const type = GAME_DATA_TYPE.Troop;

export function calculateTroopModifiedValue(
  troopItem: OffenseItem,
  useTroopDeathDamage: boolean,
  modifierItemList: ModifierItem[]
): readonly [number, ModifierItem | null] {
  if (troopItem.type !== GAME_DATA_TYPE.Troop) {
    throw new Error(
      `calculateTroopModifiedValue ERROR: troopItem must be troop type. troopItem: ${troopItem}`
    );
  }

  const troopID = troopItem.offenseID;
  const currentLevelPos = troopItem.currentLevelPos;
  const { getTroopDamage, getTroopDeathDamage, canDealDamage } =
    troopDataUtils(troopID);

  let damage: number;
  if (useTroopDeathDamage && canDealDamage()) {
    return [getTroopDeathDamage(currentLevelPos), null] as const;
  } else {
    damage = getTroopDamage(currentLevelPos);
  }

  const activeModifier = getActiveModifier(troopID, type, modifierItemList);
  if (activeModifier) {
    damage = getModifiedValue(damage, activeModifier);
  }

  return [damage, activeModifier] as const;
}
