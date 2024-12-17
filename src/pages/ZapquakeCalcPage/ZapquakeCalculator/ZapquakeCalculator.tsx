import {
  DefenseSection,
  FilterSection,
  OffenseSection,
} from "features/zapquake_calc/components";
import { DefenseSectionContext } from "features/zapquake_calc/context/DefenseSectionContext";
import { OffenseSectionContext } from "features/zapquake_calc/context/OffenseSectionContext";
import { useInitDefense } from "features/zapquake_calc/hooks/Init/useInitDefense";
import { useInitEarthquakeOrder } from "features/zapquake_calc/hooks/Init/useInitEarthquakeOrder";
import { useInitOffense } from "features/zapquake_calc/hooks/Init/useInitOffense";

export function ZapquakeCalculator() {
  const [
    offenseItemList,
    donatedLightningSpellItem,
    updateOffense,
    setAllOffensesToMax,
    setAllOffensesToMin,
  ] = useInitOffense();
  const [earthquakeOrder, setEarthquakeOrder] = useInitEarthquakeOrder();
  const [
    defenseItemList,
    updateDefense,
    setAllDefensesToMax,
    setAllDefensesToMin,
  ] = useInitDefense(
    offenseItemList,
    donatedLightningSpellItem,
    earthquakeOrder
  );
  console.log(earthquakeOrder);
  console.log(defenseItemList);
  return (
    <>
      <OffenseSectionContext.Provider
        value={{
          offenseItemList,
          donatedLightningSpellItem,
          updateOffense,
          setAllOffensesToMax,
          setAllOffensesToMin,
          earthquakeOrder,
          setEarthquakeOrder,
        }}
      >
        <OffenseSection></OffenseSection>
      </OffenseSectionContext.Provider>

      <FilterSection></FilterSection>

      <DefenseSectionContext.Provider
        value={{
          defenseItemList,
          updateDefense,
          setAllDefensesToMax,
          setAllDefensesToMin,
        }}
      >
        <DefenseSection></DefenseSection>
      </DefenseSectionContext.Provider>
    </>
  );
}
