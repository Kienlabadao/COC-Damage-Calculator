import { ModifierItem } from "features/advance_calc/objects/modifierItem";
import { EquipmentCardWrapper } from "./EquipmentCardWrapper";
import { EquipmentDisplayData } from "features/advance_calc/objects/equipmentDisplayData";

interface Props {
  equipmentDisplayDataList: EquipmentDisplayData[];
  useHardMode: boolean;
  activeModifier?: ModifierItem;
}

export function EquipmentsSection({
  equipmentDisplayDataList,
  useHardMode,
  activeModifier,
}: Props) {
  return (
    <div>
      <h3 className="mb-0 me-3 text-center">Equipments</h3>
      <div className="equipment-list row row-cols-5 justify-content-evenly gap-3 mt-3">
        {equipmentDisplayDataList.map((equipmentDisplayData) => (
          <EquipmentCardWrapper
            key={equipmentDisplayData.id}
            equipmentItem={equipmentDisplayData.equipmentItem}
            updateEquipment={equipmentDisplayData.updateEquipment}
            equipmentDamageLog={equipmentDisplayData.equipmentDamageLog}
            useHardMode={useHardMode}
            activeModifier={activeModifier}
          />
        ))}
      </div>
    </div>
  );
}
