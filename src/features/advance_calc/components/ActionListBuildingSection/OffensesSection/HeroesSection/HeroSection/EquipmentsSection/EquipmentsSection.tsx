import { OffenseItem } from "features/advance_calc/objects/offenseItem";
import { EquipmentCardWrapper } from "./EquipmentCardWrapper";
import { EquipmentItem } from "features/advance_calc/objects/equipmentItem";

interface Props {
  heroItem: OffenseItem;
  equipmentItemList: EquipmentItem[];
  updateEquipment: (
    equipmentID: string,
    currentLevelPos?: number,
    use?: boolean
  ) => void;
  useHardMode: boolean;
}

export function EquipmentsSection({
  heroItem,
  equipmentItemList,
  updateEquipment,
  useHardMode,
}: Props) {
  return (
    <div>
      <h3 className="mb-0 me-3 text-center">Equipments</h3>
      <div className="equipment-list row row-cols-5 justify-content-evenly gap-3 mt-3">
        {equipmentItemList.map((equipmentItem) => (
          <EquipmentCardWrapper
            key={equipmentItem.id}
            equipmentItem={equipmentItem}
            heroItem={heroItem}
            updateEquipment={updateEquipment}
            useHardMode={useHardMode}
          />
        ))}
      </div>
    </div>
  );
}
