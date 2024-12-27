import { EQUIPMENT, HERO, MODIFIER } from "data/game";
import { EquipmentItem } from "features/advance_calc/objects/equipmentItem";
import { HeroItem } from "features/advance_calc/objects/heroItem";
import { useEffect } from "react";

export function useUpdateRageVialModifier(
  heroItem: HeroItem,
  equipmentItemList: EquipmentItem[],
  updateModifier: (
    modifierID: string,
    currentLevelPos?: number,
    use?: boolean
  ) => void
) {
  const heroID = heroItem.offenseID;
  const useAbility = heroItem.useAbility;

  useEffect(() => {
    if (heroID === HERO.BarbarianKing) {
      const rageVial = equipmentItemList.find(
        (equipmentItem) => equipmentItem.offenseID === EQUIPMENT.RageVial
      );

      if (rageVial) {
        if (useAbility) {
          updateModifier(
            MODIFIER.RageVial,
            rageVial.currentLevelPos,
            rageVial.use
          );
        } else {
          updateModifier(MODIFIER.RageVial, rageVial.currentLevelPos, false);
        }
      } else {
        throw new Error(
          `HeroSection ERROR: Barbarian King doesn't have rage vial equipment. equipmentItemList: ${equipmentItemList}`
        );
      }
    }
  }, [heroItem, equipmentItemList]);
}
