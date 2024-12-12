import {
  DefenseSection,
  FilterSection,
  OffenseSection,
} from "features/zapquake_calc/components";
import { OffenseSectionContext } from "features/zapquake_calc/context/OffenseSectionContext";
import { useInitOffense } from "features/zapquake_calc/hooks/init/useInitOffense";

export function ZapquakeCalculator() {
  const [
    offenseItemList,
    donatedLightningSpellItem,
    updateOffenseItem,
    setAllOffensesToMax,
    setAllOffensesToMin,
  ] = useInitOffense();
  console.log("ZapquakeCalculator");
  console.log(offenseItemList);
  console.log(donatedLightningSpellItem);
  return (
    <>
      <OffenseSectionContext.Provider
        value={{
          offenseItemList,
          donatedLightningSpellItem,
          updateOffenseItem,
          setAllOffensesToMax,
          setAllOffensesToMin,
        }}
      >
        <OffenseSection></OffenseSection>
      </OffenseSectionContext.Provider>

      <FilterSection></FilterSection>

      <DefenseSection></DefenseSection>
    </>
  );
}
