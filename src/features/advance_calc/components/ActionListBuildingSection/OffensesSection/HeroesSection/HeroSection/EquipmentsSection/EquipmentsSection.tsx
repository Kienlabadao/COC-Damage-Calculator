import { ModifierItem } from "features/advance_calc/objects/modifierItem";
import { EquipmentCardWrapper } from "./EquipmentCardWrapper";
import { EquipmentDisplayData } from "features/advance_calc/objects/equipmentDisplayData";
import { MAX_SELECTED_EQUIPMENT } from "data/game";

interface Props {
  equipmentDisplayDataList: EquipmentDisplayData[];
  selectedEquipmentCount: number;
  useHardMode: boolean;
  useAbility: boolean;
  activeModifier?: ModifierItem;
}

export function EquipmentsSection({
  equipmentDisplayDataList,
  selectedEquipmentCount,
  useHardMode,
  useAbility,
  activeModifier,
}: Props) {
  function renderSelectedEquipmentWarning() {
    if (selectedEquipmentCount > MAX_SELECTED_EQUIPMENT) {
      return (
        <div className="text text--warning">
          {`*Note: Hero is using more than ${MAX_SELECTED_EQUIPMENT} equipments.`}
        </div>
      );
    } else {
      return null;
    }
  }

  return (
    <div>
      <h3 className="mb-0 me-3 text-center">Equipments</h3>
      {renderSelectedEquipmentWarning()}
      <div className="equipment-list row row-cols-5 justify-content-evenly gap-3 mt-3">
        {equipmentDisplayDataList.map((equipmentDisplayData) => (
          <EquipmentCardWrapper
            key={equipmentDisplayData.id}
            equipmentItem={equipmentDisplayData.equipmentItem}
            updateEquipment={equipmentDisplayData.updateEquipment}
            equipmentDamageLog={equipmentDisplayData.equipmentDamageLog}
            useHardMode={useHardMode}
            useAbility={useAbility}
            activeModifier={activeModifier}
          />
        ))}
      </div>
    </div>
  );
}
