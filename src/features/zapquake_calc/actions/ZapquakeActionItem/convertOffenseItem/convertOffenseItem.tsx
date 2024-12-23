import { DamageType, OFFENSE_TYPE } from "data/game";
import { OffenseItem } from "features/zapquake_calc/objects/offenseItem";
import {
  createZapquakeActionItem,
  ZapquakeActionItem,
} from "features/zapquake_calc/objects/zapquakeActionItem";
import { equipmentDataUtils } from "utils/GameData/equipmentDataUtils";
import { spellDataUtils } from "utils/GameData/spellDataUtils";

export function convertOffenseItem(
  offenseItem: OffenseItem
): ZapquakeActionItem {
  const offenseID = offenseItem.offenseID;
  const type = offenseItem.type;
  const currentLevelPos = offenseItem.currentLevelPos;
  let damage: number;
  let damageType: DamageType;

  switch (type) {
    case OFFENSE_TYPE.Spell:
      const { getSpellDamage, getSpellDamageType } = spellDataUtils(offenseID);

      damage = getSpellDamage(currentLevelPos);
      damageType = getSpellDamageType();
      break;
    case OFFENSE_TYPE.Equipment:
      const { canDealDamage, getEquipmentDamage, getEquipmentDamageType } =
        equipmentDataUtils(offenseID);

      if (canDealDamage()) {
        damage = getEquipmentDamage(currentLevelPos);
        damageType = getEquipmentDamageType()!;
      } else {
        throw new Error(
          `convertOffenseItem ERROR: Equipment cannot deal damage. offenseID: ${offenseID}`
        );
      }
      break;
    default:
      throw new Error(
        `convertOffenseItem ERROR: type (${type}) is not supported.`
      );
  }

  return createZapquakeActionItem(
    offenseID,
    type,
    currentLevelPos,
    damage,
    damageType
  );
}
