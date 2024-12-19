import {
  DefenseSection,
  OffenseSection,
} from "features/zapquake_calc/components";
import { OffenseSectionContext } from "features/zapquake_calc/context/OffenseSectionContext";
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
  console.log(earthquakeOrder);

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
        <OffenseSection />
      </OffenseSectionContext.Provider>

      <DefenseSection
        offenseItemList={offenseItemList}
        donatedLightningSpellItem={donatedLightningSpellItem}
        earthquakeOrder={earthquakeOrder}
      />
    </>
  );
}
