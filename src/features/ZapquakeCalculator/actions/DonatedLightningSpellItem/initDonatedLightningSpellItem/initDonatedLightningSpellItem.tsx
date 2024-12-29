import { OFFENSE_TYPE, SPELL } from "data/game";
import {
  createDonatedLightningSpellItem,
  DonatedLightningSpellItem,
} from "features/zapquake_calc/objects/donatedLightningSpellItem";
import { manageDonatedLightningSpellCountLocalStorage } from "features/zapquake_calc/utils/LocalStorageData/manageDonatedLightningSpellCountLocalStorage";
import { manageZapquakeCalcLevelPosGameDataLocalStorage } from "features/zapquake_calc/utils/LocalStorageData/manageZapquakeCalcLevelPosGameDataLocalStorage";
import { manageZapquakeCalcUseOffenseLocalStorage } from "features/zapquake_calc/utils/LocalStorageData/manageZapquakeCalcUseOffenseLocalStorage";

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
