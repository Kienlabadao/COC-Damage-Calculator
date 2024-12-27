import { EQUIPMENT, HERO, Hero, MODIFIER, OFFENSE_TYPE } from "data/game";
import { HeroCardWrapper } from "./HeroCardWrapper";
import { heroDataUtils } from "utils/GameData/heroDataUtils";
import { EquipmentsSection } from "./EquipmentsSection";
import {
  useInitEquipment,
  useInitHero,
} from "features/advance_calc/hooks/Init";
import { HeroSetting } from "./HeroSetting";
import { memo, useEffect } from "react";
import { ModifierItem } from "features/advance_calc/objects/modifierItem";
import { getActiveModifier } from "features/advance_calc/actions/ModifierItem";
import { calculateHeroAttackSpeed } from "features/advance_calc/actions/EquipmentItem";
import { useCacheEquipmentDamageLog } from "features/advance_calc/hooks";
import { initEquipmentDisplayDataList } from "features/advance_calc/actions/EquipmentDisplayDataList";
import { filterEquipmentItemList } from "features/advance_calc/objects/equipmentItem";

interface Props {
  hero: Hero;
  useHardMode: boolean;
  modifierItemList: ModifierItem[];
  updateModifier: (
    modifierID: string,
    currentLevelPos?: number,
    use?: boolean
  ) => void;
}

export const HeroSection = memo(function HeroSection({
  hero,
  useHardMode,
  modifierItemList,
  updateModifier,
}: Props) {
  const [heroItem, updateHero] = useInitHero(hero);
  const [
    equipmentItemList,
    updateEquipment,
    setAllEquipmentsToMax,
    setAllEquipmentsToMin,
    setAllEquipmentsToUse,
    setAllEquipmentsToUnuse,
  ] = useInitEquipment(hero, useHardMode);

  const heroID = heroItem.offenseID;
  const useAbility = heroItem.useAbility;
  const { getHeroName, getHeroAttackSpeed } = heroDataUtils(heroID);

  useEffect(() => {
    if (heroID === HERO.BarbarianKing) {
      const rageVial = equipmentItemList.find(
        (equipmentItem) => equipmentItem.offenseID === EQUIPMENT.RageVial
      );

      if (rageVial) {
        if (useAbility) {
          updateModifier(MODIFIER.RageVial, undefined, rageVial.use);
        } else {
          updateModifier(MODIFIER.RageVial, undefined, false);
        }
      } else {
        throw new Error(
          `HeroSection ERROR: Barbarian King doesn't have rage vial equipment. equipmentItemList: ${equipmentItemList}`
        );
      }
    }
  }, [heroItem, equipmentItemList]);

  const activeModifier = getActiveModifier(
    heroID,
    OFFENSE_TYPE.Hero,
    modifierItemList
  );
  const { attackSpeed, attackSpeedModify } = calculateHeroAttackSpeed(
    getHeroAttackSpeed(),
    equipmentItemList,
    useAbility
  );

  const equipmentDamageLogList = useCacheEquipmentDamageLog(
    equipmentItemList,
    attackSpeed,
    attackSpeedModify,
    useHardMode,
    activeModifier
  );

  const equipmentDisplayDataList = initEquipmentDisplayDataList(
    equipmentItemList,
    equipmentDamageLogList,
    updateEquipment
  );

  const selectedEquipmentCount = filterEquipmentItemList(
    equipmentItemList,
    true
  ).length;

  return (
    <>
      <h2 className="text-center">{getHeroName()}</h2>
      <div className="mt-3">
        <HeroSetting
          className="setting-container"
          setAllEquipmentsToMax={setAllEquipmentsToMax}
          setAllEquipmentsToMin={setAllEquipmentsToMin}
          setAllEquipmentsToUse={setAllEquipmentsToUse}
          setAllEquipmentsToUnuse={setAllEquipmentsToUnuse}
        />
        <div className="row align-items-center gy-5 gy-lg-0 mt-3">
          <div className="col-lg-4 col-xl-3">
            <div className="row row-cols-1 justify-content-center">
              <HeroCardWrapper
                heroItem={heroItem}
                equipmentItemList={equipmentItemList}
                equipmentDamageLogList={equipmentDamageLogList}
                updateHero={updateHero}
                attackSpeed={attackSpeed}
                attackSpeedModify={attackSpeedModify}
                useHardMode={useHardMode}
                activeModifier={activeModifier}
              />
            </div>
          </div>
          <div className="col-lg-8 col-xl-9">
            <EquipmentsSection
              equipmentDisplayDataList={equipmentDisplayDataList}
              selectedEquipmentCount={selectedEquipmentCount}
              useHardMode={useHardMode}
              useAbility={useAbility}
              activeModifier={activeModifier}
            />
          </div>
        </div>
      </div>
    </>
  );
});
