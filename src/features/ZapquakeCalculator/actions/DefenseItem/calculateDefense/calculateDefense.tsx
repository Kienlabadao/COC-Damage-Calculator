import { EarthquakeOrder } from "features/ZapquakeCalculator/data/constants";
import { DonatedLightningSpellItem } from "features/ZapquakeCalculator/objects/donatedLightningSpellItem";
import {
  filterOffenseItemList,
  OffenseItem,
} from "features/ZapquakeCalculator/objects/offenseItem";
import {
  isListContainOneTypeOnly,
  SpellCountItem,
} from "features/ZapquakeCalculator/objects/spellCountItem";
import { canEquipmentDestroyDefense } from "../../canEquipmentDestroyDefense";
import { MAX_SPELL_COUNT } from "features/ZapquakeCalculator/config/config";
import { createZapquakeActionList } from "../../ZapquakeActionItem";
import { convertZapquakeActionList } from "../../ZapquakeDamageLogItem";
import { getArrayLastElement } from "utils/objectUtils";
import { convertZapquakeDamageLogList } from "../../SpellCountItem";
import { SPELL } from "data/Game";
import { DefenseItem } from "features/ZapquakeCalculator/objects/defenseItem";
import {
  DEFENSE_STATUS,
  DefenseLog,
  DefenseStatus,
} from "features/ZapquakeCalculator/objects/defenseLog";

export function calculateDefense(
  defenseItem: DefenseItem,
  offenseItemList: OffenseItem[],
  donatedLightningSpellItem: DonatedLightningSpellItem,
  earthquakeOrder: EarthquakeOrder
): DefenseLog {
  const defenseID = defenseItem.defenseID;
  const defenseLevelPos = defenseItem.currentLevelPos;

  const filteredOffenseItemList = filterOffenseItemList(
    offenseItemList,
    undefined,
    true
  );
  const spellCountList: SpellCountItem[][] = [];
  let defenseStatus: DefenseStatus;

  if (filteredOffenseItemList.length === 0) {
    // User didn't select any offense
    defenseStatus = DEFENSE_STATUS.ImpossibleDestroy;
  } else if (
    canEquipmentDestroyDefense(
      defenseID,
      defenseLevelPos,
      filteredOffenseItemList
    )
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
        filteredOffenseItemList,
        donatedLightningSpellItem,
        earthquakeSpellCount,
        earthquakeOrder
      );

      const damageLogList = convertZapquakeActionList(
        defenseID,
        defenseLevelPos,
        actionList
      );

      const spellCountItemList = convertZapquakeDamageLogList(damageLogList);
      spellCountItemList.reverse();

      if (
        damageLogList.length > 0 &&
        getArrayLastElement(damageLogList).remainingHP <= 0
      ) {
        // Defense is destroy in this actionList composition
        spellCountList.push(spellCountItemList);

        if (isListContainOneTypeOnly(spellCountItemList)) {
          // User either only select 1 spell type, or this defense immune to all spells that user select except 1, or only eq spell are needed to destroy it
          // Either way, return the list as there is no point continuing
          break;
        }
      } else {
        // Defense isn't destroy in this actionList composition

        if (spellCountItemList.length === 0) {
          // Defense is immune to everything in action list
          break;
        }
        if (
          isListContainOneTypeOnly(spellCountItemList) &&
          spellCountItemList[0].spellID !== SPELL.EarthquakeSpell
        ) {
          // User only select lightning spell or this defense immune to lightning spells
          // For earthquake spell, keep continuing until at least a composition or none can destroy this defense
          break;
        } else if (spellCountList.length !== 0) {
          // There is already a compositon that destroy this defense
          // No point continuing as other composition after this also won't be able to destroy this defense
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
