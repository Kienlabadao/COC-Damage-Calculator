import { EQUIPMENT, OFFENSE_TYPE, SPELL } from "data/game";
import { MAX_SPELL_COUNT } from "features/zapquake_calc/config/config";
import {
  EARTHQUAKE_ORDER,
  EarthquakeOrder,
} from "features/zapquake_calc/data/constants";
import { DonatedLightningSpellItem } from "features/zapquake_calc/objects/donatedLightningSpellItem";
import {
  filterOffenseItemList,
  findOffenseItem,
  OffenseItem,
  removeOffenseItem,
} from "features/zapquake_calc/objects/offenseItem";
import { ZapquakeActionItem } from "features/zapquake_calc/objects/zapquakeActionItem";
import { duplicateItem } from "utils/objectUtils";
import { convertOffenseItemList } from "../convertOffenseItemList";
import { convertOffenseItem } from "../convertOffenseItem";
import { convertDonatedLightningSpell } from "../convertDonatedLightningSpell";

export function createZapquakeActionList(
  offenseItemList: OffenseItem[],
  donatedLightningSpellItem: DonatedLightningSpellItem,
  earthquakeSpellCount: number,
  earthquakeOrder: EarthquakeOrder
): ZapquakeActionItem[] {
  if (earthquakeSpellCount <= 0) {
    throw new Error(
      `zapquakeCalcUtils.createZapquakeActionList ERROR: earthquakeSpellCount (${earthquakeSpellCount}) must be larger than 0`
    );
  } else if (earthquakeSpellCount > MAX_SPELL_COUNT) {
    earthquakeSpellCount = MAX_SPELL_COUNT;
  }

  const {
    removedOffenseItem: earthquakeBoots,
    newOffenseItemList: equipmentList,
  } = removeOffenseItem(
    filterOffenseItemList(
      offenseItemList,
      new Set([OFFENSE_TYPE.Equipment]),
      true
    ),
    EQUIPMENT.EarthquakeBoots
  );

  const spellList = filterOffenseItemList(
    offenseItemList,
    new Set([OFFENSE_TYPE.Spell]),
    true
  );
  const earthquakeSpell = findOffenseItem(spellList, SPELL.EarthquakeSpell);
  const lightingSpell = findOffenseItem(spellList, SPELL.LightningSpell);

  let spellCount = 0;
  const actionList = convertOffenseItemList(equipmentList);

  if (earthquakeBoots && earthquakeSpell) {
    switch (earthquakeOrder) {
      case EARTHQUAKE_ORDER.EarthquakeBoots:
        actionList.push(convertOffenseItem(earthquakeBoots));
        actionList.push(
          ...convertOffenseItemList(
            duplicateItem(earthquakeSpell, earthquakeSpellCount)
          )
        );
        break;
      case EARTHQUAKE_ORDER.EarthquakeSpell:
        actionList.push(
          ...convertOffenseItemList(
            duplicateItem(earthquakeSpell, earthquakeSpellCount)
          )
        );
        actionList.push(convertOffenseItem(earthquakeBoots));

        break;
      default:
        throw new Error(
          `zapquakeCalcUtils.createActionList ERROR: earthquakeOrder (${earthquakeOrder}) is not supported.`
        );
    }
    spellCount += earthquakeSpellCount;
  } else if (earthquakeBoots) {
    actionList.push(convertOffenseItem(earthquakeBoots));
  } else if (earthquakeSpell) {
    actionList.push(
      ...convertOffenseItemList(
        duplicateItem(earthquakeSpell, earthquakeSpellCount)
      )
    );
    spellCount += earthquakeSpellCount;
  }

  if (donatedLightningSpellItem.use && spellCount < MAX_SPELL_COUNT) {
    let donatedLightningSpellCount = donatedLightningSpellItem.count;

    spellCount += donatedLightningSpellCount;
    if (spellCount > MAX_SPELL_COUNT) {
      actionList.push(
        ...convertDonatedLightningSpell(
          donatedLightningSpellItem,
          spellCount - MAX_SPELL_COUNT
        )
      );
    } else {
      actionList.push(
        ...convertDonatedLightningSpell(
          donatedLightningSpellItem,
          donatedLightningSpellCount
        )
      );
    }
  }

  if (lightingSpell) {
    while (spellCount < MAX_SPELL_COUNT) {
      actionList.push(convertOffenseItem(lightingSpell));
      spellCount++;
    }
  }

  return actionList;
}
