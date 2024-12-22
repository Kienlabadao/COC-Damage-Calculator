import {
  DefensesSection,
  OffensesSection,
} from "features/zapquake_calc/components";
import { OffensesSectionContext } from "features/zapquake_calc/contexts/OffensesSectionContext";
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

  return (
    <>
      <OffensesSectionContext.Provider
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
        <OffensesSection />
      </OffensesSectionContext.Provider>

      <DefensesSection
        offenseItemList={offenseItemList}
        donatedLightningSpellItem={donatedLightningSpellItem}
        earthquakeOrder={earthquakeOrder}
      />
    </>
  );
}
