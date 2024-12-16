import { DonatedLightningSpellItem } from "features/zapquake_calc/objects/donatedLightningSpellItem";
import {
  createZapquakeActionItem,
  ZapquakeActionItem,
} from "features/zapquake_calc/objects/zapquakeActionItem";
import { duplicateItem } from "utils/objectUtils";

export function convertDonatedLightningSpell(
  donatedLightningSpellItem: DonatedLightningSpellItem,
  count: number
): ZapquakeActionItem[] {
  return duplicateItem(
    createZapquakeActionItem(
      donatedLightningSpellItem.offenseID,
      donatedLightningSpellItem.type,
      donatedLightningSpellItem.currentLevelPos,
      true
    ),
    count
  );
}
