import { DonatedLightningSpellItem } from "features/zapquake_calc/objects/donatedLightningSpellItem";
import {
  createZapquakeActionItem,
  ZapquakeActionItem,
} from "features/zapquake_calc/objects/zapquakeActionItem";
import { spellDataUtils } from "utils/GameData/spellDataUtils";
import { duplicateItem } from "utils/objectUtils";

export function convertDonatedLightningSpell(
  donatedLightningSpellItem: DonatedLightningSpellItem,
  count: number
): ZapquakeActionItem[] {
  const spellID = donatedLightningSpellItem.offenseID;
  const currentLevelPos = donatedLightningSpellItem.currentLevelPos;
  const { getSpellDamage, getSpellDamageType } = spellDataUtils(spellID);

  return duplicateItem(
    createZapquakeActionItem(
      spellID,
      donatedLightningSpellItem.type,
      currentLevelPos,
      getSpellDamage(currentLevelPos),
      getSpellDamageType(),
      true
    ),
    count
  );
}
