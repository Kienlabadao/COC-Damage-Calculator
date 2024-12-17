import { EarthquakeOrder } from "features/zapquake_calc/data/constants";
import {
  DEFENSE_STATUS,
  DefenseStatus,
} from "features/zapquake_calc/objects/defenseItem";
import { DonatedLightningSpellItem } from "features/zapquake_calc/objects/donatedLightningSpellItem";
import { OffenseItem } from "features/zapquake_calc/objects/offenseItem";
import { SpellCountItem } from "features/zapquake_calc/objects/spellCountItem";
import { canEquipmentDestroyDefense } from "../../canEquipmentDestroyDefense";
import { MAX_SPELL_COUNT } from "features/zapquake_calc/config/config";
import { createZapquakeActionList } from "../../ZapquakeActionItem";
import { convertZapquakeActionList } from "../../ZapquakeDamageLogItem";
import { getArrayLastElement } from "utils/objectUtils";
import { convertZapquakeDamageLogList } from "../../SpellCountItem";
import { isValidDefenseLevelPos } from "utils/GameData/gameDataUtils";

export function calculateDefense(
  defenseID: string,
  defenseLevelPos: number,
  offenseItemList: OffenseItem[],
  donatedLightningSpellItem: DonatedLightningSpellItem,
  earthquakeOrder: EarthquakeOrder
): { defenseStatus: DefenseStatus; spellCountList: SpellCountItem[][] } {
  if (!isValidDefenseLevelPos(defenseID, defenseLevelPos)) {
    throw new Error(
      `calculateDefense ERROR: Invalid defenseLevelPos ${defenseLevelPos}. DefenseID: ${defenseID}.`
    );
  }

  let defenseStatus: DefenseStatus;
  const spellCountList: SpellCountItem[][] = [];

  if (offenseItemList.every((offenseItem) => !offenseItem.use)) {
    // User didn't select any offense
    defenseStatus = DEFENSE_STATUS.ImpossibleDestroy;
  } else if (
    canEquipmentDestroyDefense(defenseID, defenseLevelPos, offenseItemList)
  ) {
    // User selected equipment is enough to destroy this defense
    defenseStatus = DEFENSE_STATUS.EquipmentDestroyed;
  } else {
    for (
      let earthquakeSpellCount = 1;
      earthquakeSpellCount <= MAX_SPELL_COUNT;
      earthquakeSpellCount++
    ) {
      const actionList = createZapquakeActionList(
        offenseItemList,
        donatedLightningSpellItem,
        earthquakeSpellCount,
        earthquakeOrder
      );

      const damageLogList = convertZapquakeActionList(
        defenseID,
        defenseLevelPos,
        actionList
      );

      if (
        damageLogList.length > 0 &&
        getArrayLastElement(damageLogList).remainingHP <= 0
      ) {
        const spellCountItemList = convertZapquakeDamageLogList(damageLogList);
        spellCountItemList.reverse();
        spellCountList.push(spellCountItemList);

        if (spellCountItemList.length === 1) {
          break;
        }
      } else {
        // Defense is immune to everything in action list or action list combination is not enough to destroy defense
        if (spellCountList.length !== 0) {
          break;
        }
      }
    }

    if (spellCountList.length === 0) {
      defenseStatus = DEFENSE_STATUS.ImpossibleDestroy;
    } else {
      defenseStatus = DEFENSE_STATUS.Normal;
    }
  }

  return { defenseStatus, spellCountList };
}
