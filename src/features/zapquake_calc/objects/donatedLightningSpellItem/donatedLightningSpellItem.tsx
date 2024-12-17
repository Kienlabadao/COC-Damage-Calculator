import { OFFENSE_TYPE, SPELL } from "data/game";
import { createOffenseItem, OffenseItem } from "../offenseItem";

export interface DonatedLightningSpellItem extends OffenseItem {
  count: number;
}

export function createDonatedLightningSpellItem(
  currentLevelPos: number,
  use: boolean,
  count: number
): DonatedLightningSpellItem {
  const offenseID = SPELL.LightningSpell;
  const type = OFFENSE_TYPE.Spell;

  return {
    ...createOffenseItem(offenseID, type, currentLevelPos, use),
    count: count,
  };
}
