import { Hero, OFFENSE_TYPE } from "data/game";
import { HeroCardWrapper } from "./HeroCardWrapper";
import { heroDataUtils } from "utils/GameData/heroDataUtils";
import { EquipmentsSection } from "./EquipmentsSection";
import {
  useInitEquipment,
  useInitHero,
} from "features/advance_calc/hooks/Init";
import { HeroSetting } from "./HeroSetting";
import { memo } from "react";
import { ModifierItem } from "features/advance_calc/objects/modifierItem";
import { getActiveModifier } from "features/advance_calc/actions/ModifierItem";
import { calculateHeroAttackSpeed } from "features/advance_calc/actions/EquipmentItem";
import { useCacheEquipmentDamageLog } from "features/advance_calc/hooks";
import { initEquipmentDisplayDataList } from "features/advance_calc/actions/EquipmentDisplayDataList";

interface Props {
  hero: Hero;
  useHardMode: boolean;
  modifierItemList: ModifierItem[];
}

export const HeroSection = memo(function HeroSection({
  hero,
  useHardMode,
  modifierItemList,
}: Props) {
  const [heroItem, updateHero] = useInitHero(hero);
  const [
    equipmentItemList,
    updateEquipment,
    setAllEquipmentsToMax,
    setAllEquipmentsToMin,
  ] = useInitEquipment(hero, useHardMode);

  const heroID = heroItem.offenseID;
  const { getHeroName, getHeroAttackSpeed } = heroDataUtils(heroID);

  const activeModifier = getActiveModifier(
    heroID,
    OFFENSE_TYPE.Hero,
    modifierItemList
  );
  const { attackSpeed, attackSpeedModify } = calculateHeroAttackSpeed(
    getHeroAttackSpeed(),
    equipmentItemList,
    heroItem.useAbility
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

  return (
    <>
      <div className="collapse-btn my-3 d-flex align-items-center">
        <h3 className="mb-0 me-3">{getHeroName()}</h3>
      </div>
      <div>
        <HeroSetting
          className="setting-container"
          setAllEquipmentsToMax={setAllEquipmentsToMax}
          setAllEquipmentsToMin={setAllEquipmentsToMin}
        />
        <div className="row align-items-center gy-5 gy-lg-0 mt-3">
          <div className="col-lg-4 col-xl-3">
            <div className="row row-cols-1 justify-content-center">
              <HeroCardWrapper
                heroItem={heroItem}
                equipmentItemList={equipmentItemList}
                updateHero={updateHero}
                useHardMode={useHardMode}
              />
            </div>
          </div>
          <div className="col-lg-8 col-xl-9">
            <EquipmentsSection
              equipmentDisplayDataList={equipmentDisplayDataList}
              useHardMode={useHardMode}
              activeModifier={activeModifier}
            />
          </div>
        </div>
      </div>
    </>
  );
});
