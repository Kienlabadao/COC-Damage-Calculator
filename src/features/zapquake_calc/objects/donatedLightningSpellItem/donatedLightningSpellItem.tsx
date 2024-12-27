import { OFFENSE_TYPE, SPELL } from "data/game";
import {
  compareOffenseItem,
  createOffenseItem,
  OffenseItem,
} from "../offenseItem";
import { DONATED_STR } from "utils/calcLocalStorageKeyUtils";

export interface DonatedLightningSpellItem extends OffenseItem {
  count: number;
}

export function createDonatedLightningSpellItem(
  currentLevelPos: number,
  use: boolean,
  count: number
): DonatedLightningSpellItem {
  const offenseID = SPELL.LightningSpell;
  const id = `${offenseID}_${DONATED_STR}`;
  const type = OFFENSE_TYPE.Spell;

  return {
    ...createOffenseItem(offenseID, type, currentLevelPos, use),
    id: id,
    count: count,
  };
}

export function compareDonatedLightningSpellItem(
  dlsItem1: DonatedLightningSpellItem | undefined,
  dlsItem2: DonatedLightningSpellItem | undefined
): boolean {
  if (dlsItem1 === dlsItem2) return true;
  if (!dlsItem1 || !dlsItem2) return false;

  return (
    dlsItem1.count === dlsItem2.count && compareOffenseItem(dlsItem1, dlsItem2)
  );
}
