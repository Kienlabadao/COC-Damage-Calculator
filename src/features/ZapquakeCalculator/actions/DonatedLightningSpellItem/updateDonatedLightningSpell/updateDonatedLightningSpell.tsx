import { OFFENSE_TYPE, SPELL } from "data/game";
import { manageZapquakeCalcLevelPosGameDataLocalStorage } from "features/zapquake_calc/utils/LocalStorageData/manageZapquakeCalcLevelPosGameDataLocalStorage";
import { manageZapquakeCalcUseOffenseLocalStorage } from "features/zapquake_calc/utils/LocalStorageData/manageZapquakeCalcUseOffenseLocalStorage";
import { manageDonatedLightningSpellCountLocalStorage } from "features/zapquake_calc/utils/LocalStorageData/manageDonatedLightningSpellCountLocalStorage";
import { initDonatedLightningSpellItem } from "../initDonatedLightningSpellItem";
import { DonatedLightningSpellItem } from "features/zapquake_calc/objects/donatedLightningSpellItem";

export function updateDonatedLightningSpell(
  newCurrentLevelPos?: number,
  newUseOffense?: boolean,
  newCount?: number
): DonatedLightningSpellItem {
  const offenseID = SPELL.LightningSpell;
  const type = OFFENSE_TYPE.Spell;
  const isDonated = true;

  if (newCurrentLevelPos !== undefined) {
    const { storeLevelPos } = manageZapquakeCalcLevelPosGameDataLocalStorage(
      offenseID,
      type,
      isDonated
    );
    storeLevelPos(newCurrentLevelPos);
  }

  if (newUseOffense !== undefined) {
    const { storeUseOffense } = manageZapquakeCalcUseOffenseLocalStorage(
      offenseID,
      type,
      isDonated
    );
    storeUseOffense(newUseOffense);
  }

  if (newCount !== undefined) {
    const { storeCount } = manageDonatedLightningSpellCountLocalStorage();
    storeCount(newCount);
  }

  return initDonatedLightningSpellItem();
}
