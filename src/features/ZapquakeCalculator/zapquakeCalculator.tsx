import { DefensesSection, OffensesSection } from "./components";
import { OffensesSectionContext } from "./contexts";
import { useInitEarthquakeOrder, useInitOffense } from "./hooks/Init";

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
