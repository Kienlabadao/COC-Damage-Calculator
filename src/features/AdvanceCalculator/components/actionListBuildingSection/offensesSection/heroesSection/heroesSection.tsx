import { useInitHeroSetting } from "features/advance_calc/hooks/Init/useInitHeroSetting";
import { HeroesSetting } from "./HeroesSetting";
import { HeroSection } from "./HeroSection";
import { HERO } from "data/game";
import { useOffensesSectionContext } from "features/advance_calc/contexts";

export function HeroesSection() {
  const { modifierItemList, updateModifier } = useOffensesSectionContext();

  const [useHardMode, setUseHardMode] = useInitHeroSetting();
  const heroList = Object.values(HERO);
  const heroCount = heroList.length;

  return (
    <div className="mb-5">
      <h3 className="text-center">Hero</h3>
      <HeroesSetting
        className="setting-container"
        useHardMode={useHardMode}
        setUseHardMode={setUseHardMode}
      />

      <div className="mt-5">
        {heroList.map((heroID, index) => (
          <div key={heroID} className="mb-4">
            <HeroSection
              hero={heroID}
              useHardMode={useHardMode}
              modifierItemList={modifierItemList}
              updateModifier={updateModifier}
            />
            {index < heroCount - 1 && <hr />}
          </div>
        ))}
      </div>
    </div>
  );
}
