import { OFFENSE_TYPE } from "data/game";
import { useOffenseSectionContext } from "features/zapquake_calc/context/OffenseSectionContext";
import { EquipmentCard } from "./EquipmentCard";
import { EquipmentSettingSection } from "./EquipmentSettingSection";
import { filterOffenseItemList } from "features/zapquake_calc/objects/offenseItem";

export function EquipmentSection() {
  const { offenseItemList, updateOffenseItem } = useOffenseSectionContext();

  return (
    <div className="mb-5">
      <h3 className="text-center">Equipment</h3>

      <EquipmentSettingSection className="setting-container" />

      <div className="row row-cols-6 justify-content-evenly gap-3 mt-5">
        {filterOffenseItemList(
          offenseItemList,
          new Set([OFFENSE_TYPE.Equipment])
        ).map((offense) => (
          <EquipmentCard
            key={offense.id}
            equipment={offense}
            updateOffenseItem={updateOffenseItem}
          />
        ))}
      </div>
    </div>
  );
}
