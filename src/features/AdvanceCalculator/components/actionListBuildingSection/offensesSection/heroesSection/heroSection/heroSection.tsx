import { Hero, OFFENSE_TYPE } from "data/Game";
import { HeroCardContainer } from "./heroCardContainer";
import { heroDataUtils } from "utils/GameData/heroDataUtils";
import { EquipmentsSection } from "./equipmentsSection";
import {
  useInitEquipment,
  useInitHero,
} from "features/AdvanceCalculator/hooks/Init";
import { HeroSetting } from "./heroSetting";
import { memo } from "react";
import { ModifierItem } from "features/AdvanceCalculator/objects/modifierItem";
import { getActiveModifier } from "features/AdvanceCalculator/actions/ModifierItem";
import { calculateHeroAttackSpeed } from "features/AdvanceCalculator/actions/EquipmentItem";
import {
  useCacheEquipmentDamageLog,
  useUpdateRageVialModifier,
} from "features/AdvanceCalculator/hooks";
import { initEquipmentDisplayDataList } from "features/AdvanceCalculator/actions/EquipmentDisplayDataList";
import { filterEquipmentItemList } from "features/AdvanceCalculator/objects/equipmentItem";

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
  useUpdateRageVialModifier(heroItem, equipmentItemList, updateModifier);

  const heroID = heroItem.offenseID;
  const useAbility = heroItem.useAbility;
  const { getHeroName, getHeroAttackSpeed } = heroDataUtils(heroID);

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
          setAllEquipmentsToMax={setAllEquipmentsToMax}
          setAllEquipmentsToMin={setAllEquipmentsToMin}
          setAllEquipmentsToUse={setAllEquipmentsToUse}
          setAllEquipmentsToUnuse={setAllEquipmentsToUnuse}
        />
        <div className="row align-items-center gy-5 gy-lg-0 mt-3">
          <div className="col-lg-4 col-xl-3">
            <div className="row row-cols-1 justify-content-center">
              <HeroCardContainer
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
