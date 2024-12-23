import { Hero } from "data/game";
import { HeroCardWrapper } from "./HeroCardWrapper";
import { heroDataUtils } from "utils/GameData/heroDataUtils";
import { EquipmentsSection } from "./EquipmentsSection";
import {
  useInitEquipment,
  useInitHero,
} from "features/advance_calc/hooks/Init";
import { HeroSetting } from "./HeroSetting";
import { memo } from "react";

interface Props {
  hero: Hero;
  useHardMode: boolean;
}

export const HeroSection = memo(function HeroSection({
  hero,
  useHardMode,
}: Props) {
  const [heroItem, updateHero] = useInitHero(hero);
  const [
    equipmentItemList,
    updateEquipment,
    setAllEquipmentsToMax,
    setAllEquipmentsToMin,
  ] = useInitEquipment(hero, useHardMode);

  const { getHeroName } = heroDataUtils(heroItem.offenseID);

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
              heroItem={heroItem}
              equipmentItemList={equipmentItemList}
              updateEquipment={updateEquipment}
              useHardMode={useHardMode}
            />
          </div>
        </div>
      </div>
    </>
  );
});
