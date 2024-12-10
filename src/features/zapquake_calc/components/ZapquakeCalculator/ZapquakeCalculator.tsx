import { DefenseSection } from "../DefenseSection";
import { OffenseSection } from "../OffenseSection";
import { FilterSection } from "../FilterSection";
import { useInitOffense } from "features/zapquake_calc/hooks/init/useInitOffense";

export function ZapquakeCalculator() {
  const [
    offenseItemList,
    updateOffenseItemList,
    setAllOffensesToMax,
    setAllOffensesToMin,
  ] = useInitOffense();

  return (
    <>
      <OffenseSection
        offenseItemList={offenseItemList}
        updateOffenseItemList={updateOffenseItemList}
        setAllOffensesToMax={setAllOffensesToMax}
        setAllOffensesToMin={setAllOffensesToMin}
      ></OffenseSection>

      <FilterSection></FilterSection>

      <DefenseSection></DefenseSection>
    </>
  );
}
