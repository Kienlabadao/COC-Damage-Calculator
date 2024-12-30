import { OFFENSE_TYPE, SPELL } from "data/Game";
import { manageZapquakeCalcLevelPosGameDataLocalStorage } from "features/ZapquakeCalculator/utils/LocalStorageData/manageZapquakeCalcLevelPosGameDataLocalStorage";
import { getGameDataMaxLevelPos } from "utils/GameData/gameDataUtils";
import { initDonatedLightningSpellItem } from "../initDonatedLightningSpellItem";
import { DonatedLightningSpellItem } from "features/ZapquakeCalculator/objects/donatedLightningSpellItem";

export function setDonatedLightningSpellToMax(): DonatedLightningSpellItem {
  const offenseID = SPELL.LightningSpell;
  const type = OFFENSE_TYPE.Spell;
  const isDonated = true;
  const maxLevelPos = getGameDataMaxLevelPos(offenseID, type);

  const { storeLevelPos } = manageZapquakeCalcLevelPosGameDataLocalStorage(
    offenseID,
    type,
    isDonated
  );
  storeLevelPos(maxLevelPos);

  return initDonatedLightningSpellItem();
}
