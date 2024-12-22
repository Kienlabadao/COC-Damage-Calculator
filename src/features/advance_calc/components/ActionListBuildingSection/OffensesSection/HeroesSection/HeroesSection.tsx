import { useInitHeroSetting } from "features/advance_calc/hooks/Init/useInitHeroSetting";
import { HeroesSetting } from "./HeroesSetting";
import { HeroSection } from "./HeroSection";
import { HERO } from "data/game";

export function HeroesSection() {
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

      {heroList.map((heroID, index) => (
        <div key={heroID} className="mb-5">
          <HeroSection hero={heroID} useHardMode={useHardMode} />
          {index < heroCount - 1 && <hr />}
        </div>
      ))}
    </div>
  );
}
