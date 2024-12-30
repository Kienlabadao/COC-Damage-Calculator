import { EQUIPMENT, OFFENSE_TYPE, SPELL } from "data/Game";
import { MAX_SPELL_COUNT } from "features/ZapquakeCalculator/config/config";
import {
  EARTHQUAKE_ORDER,
  EarthquakeOrder,
} from "features/ZapquakeCalculator/data/constants";
import { DonatedLightningSpellItem } from "features/ZapquakeCalculator/objects/donatedLightningSpellItem";
import {
  filterOffenseItemList,
  findOffenseItem,
  OffenseItem,
  removeOffenseItem,
} from "features/ZapquakeCalculator/objects/offenseItem";
import { ZapquakeActionItem } from "features/ZapquakeCalculator/objects/zapquakeActionItem";
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

  if (donatedLightningSpellItem.use) {
    actionList.push(
      ...convertDonatedLightningSpell(
        donatedLightningSpellItem,
        donatedLightningSpellItem.count
      )
    );
  }

  if (lightingSpell) {
    while (spellCount < MAX_SPELL_COUNT) {
      actionList.push(convertOffenseItem(lightingSpell));
      spellCount++;
    }
  }

  return actionList;
}
