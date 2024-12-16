import { GAME_DATA_TYPE } from "data/game";
import { EarthquakeOrder } from "features/zapquake_calc/data/constants";
import {
  createDefenseItem,
  DEFENSE_STATUS,
  DefenseItem,
} from "features/zapquake_calc/objects/defenseItem";
import { DonatedLightningSpellItem } from "features/zapquake_calc/objects/donatedLightningSpellItem";
import { OffenseItem } from "features/zapquake_calc/objects/offenseItem";
import { SpellCountItem } from "features/zapquake_calc/objects/spellCountItem";
import { manageZapquakeCalcLevelPosGameDataLocalStorage } from "features/zapquake_calc/utils/LocalStorageData/manageZapquakeCalcLevelPosGameDataLocalStorage";
import { canEquipmentDestroyDefense } from "../../canEquipmentDestroyDefense";
import { MAX_SPELL_COUNT } from "features/zapquake_calc/config/config";
import { createZapquakeActionList } from "../../ZapquakeActionItem";
import { convertZapquakeActionList } from "../../ZapquakeDamageLogItem";
import { getArrayLastElement } from "utils/objectUtils";
import { convertZapquakeDamageLogList } from "../../SpellCountItem";

export function createAndCalculateDefense(
  defenseID: string,
  offenseItemList: OffenseItem[],
  donatedLightningSpellItem: DonatedLightningSpellItem,
  earthquakeOrder: EarthquakeOrder
): DefenseItem {
  const { getOrStoreLevelPos } = manageZapquakeCalcLevelPosGameDataLocalStorage(
    defenseID,
    GAME_DATA_TYPE.Defense
  );
  const currentLevelPos = getOrStoreLevelPos();

  console.log(defenseID);
  calculateDefense(
    defenseID,
    currentLevelPos,
    offenseItemList,
    donatedLightningSpellItem,
    earthquakeOrder
  );

  return createDefenseItem(defenseID, DEFENSE_STATUS.Normal, []);
}

function calculateDefense(
  defenseID: string,
  currentLevelPos: number,
  offenseItemList: OffenseItem[],
  donatedLightningSpellItem: DonatedLightningSpellItem,
  earthquakeOrder: EarthquakeOrder
) {
  if (offenseItemList.every((offenseItem) => !offenseItem.use)) {
  } else if (
    canEquipmentDestroyDefense(defenseID, currentLevelPos, offenseItemList)
  ) {
  } else {
    const spellCountList: SpellCountItem[][] = [];

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
        currentLevelPos,
        actionList
      );
      console.log(damageLogList);
      if (
        damageLogList.length > 0 &&
        getArrayLastElement(damageLogList).remainingHP > 0
      ) {
        const spellCountItemList = convertZapquakeDamageLogList(damageLogList);
        spellCountItemList.reverse();
        spellCountList.push(spellCountItemList);
        console.log(spellCountItemList);
        if (spellCountItemList.length === 1) {
          break;
        }
      } else {
        if (spellCountList.length !== 0) {
          break;
        }
      }
    }
  }
}
