import { ModifierItem } from "features/advance_calc/objects/modifierItem";
import { heroDataUtils } from "utils/GameData/heroDataUtils";
import {
  calculateDPSAfterAttackSpeedModified,
  calculateHeroHardModeDamage,
} from "utils/GameData/gameDataCalculatorUtils";
import { calculateModifiedActionValue } from "actions/BaseModifierItem";
import { ACTION_TYPE } from "objects/actionItem";
import { GAME_DATA_TYPE } from "data/game";
import { BaseOffenseItem } from "objects/baseOffenseItem";

const type = GAME_DATA_TYPE.Hero;

export function calculateHeroDPS(
  heroItem: BaseOffenseItem,
  activeModifier?: ModifierItem,
  attackSpeedModify?: number,
  useHardMode = false
): number {
  if (heroItem.type !== type) {
    throw new Error(
      `calculateHeroDPS ERROR: heroItem is not hero type. heroItem: ${heroItem}`
    );
  }

  const heroID = heroItem.offenseID;
  const currentLevelPos = heroItem.currentLevelPos;
  const { getHeroDPS } = heroDataUtils(heroID);

  let dpsBoost = getHeroDPS(currentLevelPos);

  if (activeModifier) {
    dpsBoost = calculateModifiedActionValue(
      dpsBoost,
      ACTION_TYPE.Hero,
      activeModifier
    );
  }

  if (attackSpeedModify) {
    dpsBoost = calculateDPSAfterAttackSpeedModified(
      dpsBoost,
      attackSpeedModify
    );
  }

  if (useHardMode) {
    dpsBoost = calculateHeroHardModeDamage(dpsBoost);
  }

  return dpsBoost;
}
