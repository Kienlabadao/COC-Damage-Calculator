import { OFFENSE_TYPE, SPELL } from "data/game";
import { manageZapquakeCalcLevelPosGameDataLocalStorage } from "features/zapquake_calc/utils/LocalStorageData/manageZapquakeCalcLevelPosGameDataLocalStorage";
import { getGameDataMinLevelPos } from "utils/GameData/gameDataUtils";
import { initDonatedLightningSpellItem } from "../initDonatedLightningSpellItem";
import { DonatedLightningSpellItem } from "features/zapquake_calc/objects/donatedLightningSpellItem";

export function setDonatedLightningSpellToMin(): DonatedLightningSpellItem {
  const offenseID = SPELL.LightningSpell;
  const type = OFFENSE_TYPE.Spell;
  const isDonated = true;
  const minLevelPos = getGameDataMinLevelPos(offenseID, type);

  const { storeLevelPos } = manageZapquakeCalcLevelPosGameDataLocalStorage(
    offenseID,
    type,
    isDonated
  );
  storeLevelPos(minLevelPos);

  return initDonatedLightningSpellItem();
}
