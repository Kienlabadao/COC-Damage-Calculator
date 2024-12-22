import { EQUIPMENT_TYPE, OFFENSE_TYPE, OffenseType, SPELL } from "data/game";
import {
  initDonatedLightningSpellItem,
  setDonatedLightningSpellToMax,
  setDonatedLightningSpellToMin,
  updateDonatedLightningSpell,
} from "features/zapquake_calc/actions/DonatedLightningSpellItem";
import {
  initOffenseItem,
  setAllOffenseItemsToMax,
  setAllOffenseItemsToMin,
  updateOffenseItem,
} from "features/zapquake_calc/actions/OffenseItem";
import {
  OffenseItem,
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
    initOffenseItem(spellID, OFFENSE_TYPE.Spell)
  );
}

function getAllEquipments(): OffenseItem[] {
  const equipmentIDList = getAllEquipmentIDs(new Set([EQUIPMENT_TYPE.Damage]));

  return equipmentIDList.map((equipmentID) =>
    initOffenseItem(equipmentID, OFFENSE_TYPE.Equipment)
  );
}

export function useInitOffense() {
  const [offenseItemList, setOffenseItemList] = useState([
    ...getAllSpells(),
    ...getAllEquipments(),
  ]);
  const [donatedLightningSpellItem, setDonatedLightningSpellItem] = useState(
    initDonatedLightningSpellItem()
  );

  const updateOffense = useCallback(
    (
      offenseID: string,
      type: OffenseType,
      isDonated: boolean = false,
      currentLevelPos?: number,
      useOffense?: boolean,
      count?: number
    ) => {
      if (isDonated) {
        if (offenseID === SPELL.LightningSpell) {
          setDonatedLightningSpellItem(() =>
            updateDonatedLightningSpell(currentLevelPos, useOffense, count)
          );
        } else {
          throw new Error(
            `useInitOffense.updateOffenseItemList ERROR: Donated for offenseID (${offenseID}) is not supported!`
          );
        }
      } else {
        setOffenseItemList((prevOffenseItemList) => {
          const updatedOffenseItem = updateOffenseItem(
            offenseID,
            type,
            currentLevelPos,
            useOffense
          );

          return updateOffenseItemInList(
            updatedOffenseItem,
            prevOffenseItemList
          );
        });
      }
    },
    []
  );

  const setAllOffensesToMax = useCallback(
    (offenseTypeFilterList: Set<OffenseType>) => {
      setOffenseItemList((prevOffenseItemList) => {
        return setAllOffenseItemsToMax(
          prevOffenseItemList,
          offenseTypeFilterList
        );
      });

      if (offenseTypeFilterList.has(OFFENSE_TYPE.Spell)) {
        setDonatedLightningSpellItem(() => setDonatedLightningSpellToMax());
      }
    },
    []
  );

  const setAllOffensesToMin = useCallback(
    (offenseTypeFilterList: Set<OffenseType>) => {
      setOffenseItemList((prevOffenseItemList) => {
        return setAllOffenseItemsToMin(
          prevOffenseItemList,
          offenseTypeFilterList
        );
      });

      if (offenseTypeFilterList.has(OFFENSE_TYPE.Spell)) {
        setDonatedLightningSpellItem(() => setDonatedLightningSpellToMin());
      }
    },
    []
  );

  return [
    offenseItemList,
    donatedLightningSpellItem,
    updateOffense,
    setAllOffensesToMax,
    setAllOffensesToMin,
  ] as const;
}
