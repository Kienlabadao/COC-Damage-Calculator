import { ModifierItem } from "features/AdvanceCalculator/objects/modifierItem";
import { EquipmentCardContainer } from "./equipmentCardContainer";
import { EquipmentDisplayData } from "features/AdvanceCalculator/objects/equipmentDisplayData";
import { MAX_SELECTED_EQUIPMENT } from "data/Game";

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
      <h3 className="mb-0 text-center">Equipments</h3>
      {renderSelectedEquipmentWarning()}
      <div className="equipment-list row row-cols-5 justify-content-evenly gap-3 mt-4">
        {equipmentDisplayDataList.map((equipmentDisplayData) => (
          <EquipmentCardContainer
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
