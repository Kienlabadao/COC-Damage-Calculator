import { OFFENSE_TYPE, SPELL } from "data/game";
import {
  getGameDataMaxLevelPos,
  getGameDataMinLevelPos,
} from "utils/GameData/gameDataUtils";
import { getDonatedGameDataID } from "utils/calcLocalStorageKeyUtils";
import { OffenseItem } from "../offenseItem";
import { manageZapquakeCalcLevelPosGameDataLocalStorage } from "features/zapquake_calc/utils/LocalStorageData/manageZapquakeCalcLevelPosGameDataLocalStorage";
import { manageZapquakeCalcUseOffenseLocalStorage } from "features/zapquake_calc/utils/LocalStorageData/manageZapquakeCalcUseOffenseLocalStorage";
import { manageDonatedLightningSpellCountLocalStorage } from "features/zapquake_calc/utils/LocalStorageData/manageDonatedLightningSpellCountLocalStorage";

export interface DonatedLightningSpellItem extends OffenseItem {
  count: number;
  saveCount: (newCount: number) => number;
}

export function createDonatedLightningSpellItem(): DonatedLightningSpellItem {
  const offenseID = SPELL.LightningSpell;
  const type = OFFENSE_TYPE.Spell;
  const isDonated = true;

  const { getOrStoreLevelPos, storeLevelPos } =
    manageZapquakeCalcLevelPosGameDataLocalStorage(offenseID, type, isDonated);
  const { getOrStoreUseOffense, storeUseOffense } =
    manageZapquakeCalcUseOffenseLocalStorage(offenseID, type, isDonated);
  const { getOrStoreCount, storeCount } =
    manageDonatedLightningSpellCountLocalStorage();
  const id = getDonatedGameDataID(offenseID);
  const currentLevelPos = getOrStoreLevelPos();
  const useOffense = getOrStoreUseOffense();
  const count = getOrStoreCount();

  return {
    id: id,
    offenseID: offenseID,
    type: type,
    currentLevelPos: currentLevelPos,
    use: useOffense,
    count: count,
    saveCurrentLevelPos: (newCurrentLevelPos: number): number => {
      storeLevelPos(newCurrentLevelPos);
      return getOrStoreLevelPos();
    },
    saveUseOffense: (newUseOffense: boolean): boolean => {
      console.log("saveUseOffense");
      console.log(newUseOffense);
      storeUseOffense(newUseOffense);
      console.log(getOrStoreUseOffense());
      return getOrStoreUseOffense();
    },
    saveCount: (newCount: number): number => {
      storeCount(newCount);
      return getOrStoreCount();
    },
  };
}

export function updateDonatedLightningSpellItem(
  donatedLightningSpellItem: DonatedLightningSpellItem,
  currentLevelPos?: number,
  useOffense?: boolean,
  count?: number
): DonatedLightningSpellItem {
  return {
    ...donatedLightningSpellItem,
    ...(currentLevelPos !== undefined && {
      currentLevelPos:
        donatedLightningSpellItem.saveCurrentLevelPos(currentLevelPos),
    }),
    ...(useOffense !== undefined && {
      use: donatedLightningSpellItem.saveUseOffense(useOffense),
    }),
    ...(count !== undefined && {
      count: donatedLightningSpellItem.saveCount(count),
    }),
  };
}

export function setDonatedLightningSpellItemToMax(
  donatedLightningSpellItem: DonatedLightningSpellItem
): DonatedLightningSpellItem {
  console.log("setDonatedLightningSpellItemToMax");
  const offenseID = donatedLightningSpellItem.offenseID;
  const type = donatedLightningSpellItem.type;

  const maxLevelPos = getGameDataMaxLevelPos(offenseID, type);

  return {
    ...donatedLightningSpellItem,
    currentLevelPos: donatedLightningSpellItem.saveCurrentLevelPos(maxLevelPos),
  };
}

export function setDonatedLightningSpellItemToMin(
  donatedLightningSpellItem: DonatedLightningSpellItem
): DonatedLightningSpellItem {
  const offenseID = donatedLightningSpellItem.offenseID;
  const type = donatedLightningSpellItem.type;

  const minLevelPos = getGameDataMinLevelPos(offenseID, type);

  return {
    ...donatedLightningSpellItem,
    currentLevelPos: donatedLightningSpellItem.saveCurrentLevelPos(minLevelPos),
  };
}