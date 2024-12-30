import { OFFENSE_TYPE, SPELL } from "data/Game";
import {
  createDonatedLightningSpellItem,
  DonatedLightningSpellItem,
} from "features/ZapquakeCalculator/objects/donatedLightningSpellItem";
import { manageDonatedLightningSpellCountLocalStorage } from "features/ZapquakeCalculator/utils/LocalStorageData/manageDonatedLightningSpellCountLocalStorage";
import { manageZapquakeCalcLevelPosGameDataLocalStorage } from "features/ZapquakeCalculator/utils/LocalStorageData/manageZapquakeCalcLevelPosGameDataLocalStorage";
import { manageZapquakeCalcUseOffenseLocalStorage } from "features/ZapquakeCalculator/utils/LocalStorageData/manageZapquakeCalcUseOffenseLocalStorage";

export function initDonatedLightningSpellItem(): DonatedLightningSpellItem {
  const offenseID = SPELL.LightningSpell;
  const type = OFFENSE_TYPE.Spell;
  const isDonated = true;

  const { getOrStoreLevelPos } = manageZapquakeCalcLevelPosGameDataLocalStorage(
    offenseID,
    type,
    isDonated
  );
  const currentLevelPos = getOrStoreLevelPos();

  const { getOrStoreUseOffense } = manageZapquakeCalcUseOffenseLocalStorage(
    offenseID,
    type,
    isDonated
  );
  const useOffense = getOrStoreUseOffense();

  const { getOrStoreCount } = manageDonatedLightningSpellCountLocalStorage();
  const count = getOrStoreCount();

  return createDonatedLightningSpellItem(currentLevelPos, useOffense, count);
}
