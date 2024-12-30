import { OFFENSE_TYPE } from "data/Game";
import { useOffensesSectionContext } from "features/ZapquakeCalculator/contexts/OffensesSectionContext";
import { EquipmentSetting } from "./equipmentSetting";
import { filterOffenseItemList } from "features/ZapquakeCalculator/objects/offenseItem";
import { EquipmentCardContainer } from "./equipmentCardContainer";

export function EquipmentsSection() {
  const {
    earthquakeOrder,
    setEarthquakeOrder,
    offenseItemList,
    setAllOffensesToMax,
    setAllOffensesToMin,
    updateOffense,
  } = useOffensesSectionContext();

  return (
    <div className="mb-5">
      <h3 className="text-center">Equipment</h3>

      <EquipmentSetting
        earthquakeOrder={earthquakeOrder}
        setEarthquakeOrder={setEarthquakeOrder}
        setAllOffensesToMax={setAllOffensesToMax}
        setAllOffensesToMin={setAllOffensesToMin}
      />

      <div className="row row-cols-6 justify-content-evenly gap-3 mt-5">
        {filterOffenseItemList(
          offenseItemList,
          new Set([OFFENSE_TYPE.Equipment])
        ).map((offense) => (
          <EquipmentCardContainer
            key={offense.id}
            equipment={offense}
            updateOffense={updateOffense}
          />
        ))}
      </div>
    </div>
  );
}
