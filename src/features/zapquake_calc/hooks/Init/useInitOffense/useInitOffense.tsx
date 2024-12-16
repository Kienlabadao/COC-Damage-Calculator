import { EQUIPMENT_TYPE, OFFENSE_TYPE, OffenseType, SPELL } from "data/game";
import {
  createDonatedLightningSpellItem,
  setDonatedLightningSpellItemToMax,
  setDonatedLightningSpellItemToMin,
  updateDonatedLightningSpellItem,
} from "features/zapquake_calc/objects/donatedLightningSpellItem";
import {
  createOffenseItem,
  OffenseItem,
  setAllOffenseItemsToMax,
  setAllOffenseItemsToMin,
  updateOffenseItemInList,
} from "features/zapquake_calc/objects/offenseItem";
import { useCallback, useState } from "react";
import {
  getAllEquipmentIDs,
  getAllSpellIDs,
} from "utils/GameData/gameDataUtils";

function getAllSpells(): OffenseItem[] {
  const spellIDList = getAllSpellIDs();

  return spellIDList.map((spellID) =>
    createOffenseItem(spellID, OFFENSE_TYPE.Spell)
  );
}

function getAllEquipments(): OffenseItem[] {
  const equipmentIDList = getAllEquipmentIDs(new Set([EQUIPMENT_TYPE.Damage]));

  return equipmentIDList.map((equipmentID) =>
    createOffenseItem(equipmentID, OFFENSE_TYPE.Equipment)
  );
}

export function useInitOffense() {
  const [offenseItemList, setOffenseItemList] = useState([
    ...getAllSpells(),
    ...getAllEquipments(),
  ]);
  const [donatedLightningSpellItem, setDonatedLightningSpellItem] = useState(
    createDonatedLightningSpellItem()
  );

  const updateOffenseItem = useCallback(
    (
      offenseID: string,
      isDonated: boolean = false,
      currentLevelPos?: number,
      useOffense?: boolean,
      count?: number
    ) => {
      if (isDonated) {
        if (offenseID === SPELL.LightningSpell) {
          setDonatedLightningSpellItem((prevDonatedLightningSpellItem) =>
            updateDonatedLightningSpellItem(
              prevDonatedLightningSpellItem,
              currentLevelPos,
              useOffense,
              count
            )
          );
        } else {
          throw new Error(
            `useInitOffense.updateOffenseItemList ERROR: Donated for offenseID (${offenseID}) is not supported!`
          );
        }
      } else {
        setOffenseItemList((prevOffenseItemList) => {
          return updateOffenseItemInList(
            prevOffenseItemList,
            offenseID,
            currentLevelPos,
            useOffense
          );
        });
      }
    },
    []
  );

  function setAllOffensesToMax(offenseTypeFilterList: Set<OffenseType>) {
    setOffenseItemList((prevOffenseItemList) => {
      return setAllOffenseItemsToMax(
        prevOffenseItemList,
        offenseTypeFilterList
      );
    });

    if (offenseTypeFilterList.has(OFFENSE_TYPE.Spell)) {
      setDonatedLightningSpellItem((prevDonatedLightningSpellItem) =>
        setDonatedLightningSpellItemToMax(prevDonatedLightningSpellItem)
      );
    }
  }

  function setAllOffensesToMin(offenseTypeFilterList: Set<OffenseType>) {
    setOffenseItemList((prevOffenseItemList) => {
      return setAllOffenseItemsToMin(
        prevOffenseItemList,
        offenseTypeFilterList
      );
    });

    if (offenseTypeFilterList.has(OFFENSE_TYPE.Spell)) {
      setDonatedLightningSpellItem((prevDonatedLightningSpellItem) =>
        setDonatedLightningSpellItemToMin(prevDonatedLightningSpellItem)
      );
    }
  }

  return [
    offenseItemList,
    donatedLightningSpellItem,
    updateOffenseItem,
    setAllOffensesToMax,
    setAllOffensesToMin,
  ] as const;
}
