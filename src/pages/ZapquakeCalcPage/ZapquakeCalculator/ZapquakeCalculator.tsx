import {
  DefenseSection,
  FilterSection,
  OffenseSection,
} from "features/zapquake_calc/components";
import { DefenseSectionContext } from "features/zapquake_calc/context/DefenseSectionContext";
import { OffenseSectionContext } from "features/zapquake_calc/context/OffenseSectionContext";
import { useInitDefense } from "features/zapquake_calc/hooks/init/useInitDefense";
import { useInitEarthquakeOrder } from "features/zapquake_calc/hooks/init/useInitEarthquakeOrder";
import { useInitOffense } from "features/zapquake_calc/hooks/init/useInitOffense";

export function ZapquakeCalculator() {
  const [
    offenseItemList,
    donatedLightningSpellItem,
    updateOffenseItem,
    setAllOffensesToMax,
    setAllOffensesToMin,
  ] = useInitOffense();
  const [earthquakeOrder, setEarthquakeOrder] = useInitEarthquakeOrder();
  const [
    defenseItemList,
    updateDefenseItem,
    setAllDefensesToMax,
    setAllDefensesToMin,
  ] = useInitDefense();
  console.log(earthquakeOrder);
  console.log(defenseItemList);
  return (
    <>
      <OffenseSectionContext.Provider
        value={{
          offenseItemList,
          donatedLightningSpellItem,
          updateOffenseItem,
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
          updateDefenseItem,
          setAllDefensesToMax,
          setAllDefensesToMin,
        }}
      >
        <DefenseSection></DefenseSection>
      </DefenseSectionContext.Provider>
    </>
  );
}
