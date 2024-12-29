import { OFFENSE_TYPE } from "data/game";
import { useOffensesSectionContext } from "features/zapquake_calc/contexts/OffensesSectionContext";
import { EquipmentCard } from "./EquipmentCard";
import { EquipmentSetting } from "./EquipmentSetting";
import { filterOffenseItemList } from "features/zapquake_calc/objects/offenseItem";

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
        className="setting-container"
      />

      <div className="row row-cols-6 justify-content-evenly gap-3 mt-5">
        {filterOffenseItemList(
          offenseItemList,
          new Set([OFFENSE_TYPE.Equipment])
        ).map((offense) => (
          <EquipmentCard
            key={offense.id}
            equipment={offense}
            updateOffense={updateOffense}
          />
        ))}
      </div>
    </div>
  );
}
