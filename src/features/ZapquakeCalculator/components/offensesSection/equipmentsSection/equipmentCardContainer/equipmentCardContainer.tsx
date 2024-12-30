import { memo } from "react";
import { equipmentDataUtils } from "utils/GameData/equipmentDataUtils";
import { GAME_DATA_TYPE, OffenseType } from "data/Game";
import { OffenseItem } from "features/ZapquakeCalculator/objects/offenseItem";
import { EquipmentCard } from "./equipmentCard/equipmentCard";

const type = GAME_DATA_TYPE.Equipment;

interface Props {
  equipment: OffenseItem;
  updateOffense: (
    offenseID: string,
    type: OffenseType,
    isDonated?: boolean,
    currentLevelPos?: number,
    useOffense?: boolean,
    count?: number
  ) => void;
}

export const EquipmentCardContainer = memo(function EquipmentCardContainer({
  equipment,
  updateOffense,
}: Props) {
  const updateCurrentLevelPos = (newCurrentLevelPos: number) => {
    updateOffense(equipmentID, type, undefined, newCurrentLevelPos);
  };
  const updateUseEquipment = (newUseOffense: boolean) => {
    updateOffense(equipmentID, type, undefined, undefined, newUseOffense);
  };

  const equipmentID = equipment.offenseID;
  const {
    equipmentData,
    getEquipmentName,
    getEquipmentImage,
    getEquipmentMinLevelPos,
    getEquipmentMaxLevelPos,
    getEquipmentLevel,
    getEquipmentDamage,
    getEquipmentDamageType,
    getEquipmentRarity,
    isMaxLevelPos,
  } = equipmentDataUtils(equipmentID);

  const name = getEquipmentName();
  const imagePath = getEquipmentImage();
  const rarity = getEquipmentRarity();
  const minLevelPos = getEquipmentMinLevelPos();
  const maxLevelPos = getEquipmentMaxLevelPos();
  const currentLevelPos = equipment.currentLevelPos;
  const currentLevel = getEquipmentLevel(currentLevelPos);
  const isMaxed = isMaxLevelPos(currentLevelPos);
  const useEquipment = equipment.use;
  const damage = getEquipmentDamage(currentLevelPos);
  const damageType = getEquipmentDamageType();
  if (damageType === null) {
    throw new Error(
      `EquipmentCardContainer ERROR: Equipment type Damage have null damage type. Equipment: ${equipmentData}`
    );
  }

  return (
    <EquipmentCard
      equipmentID={equipmentID}
      name={name}
      imagePath={imagePath}
      rarity={rarity}
      minLevelPos={minLevelPos}
      maxLevelPos={maxLevelPos}
      currentLevelPos={currentLevelPos}
      currentLevel={currentLevel}
      isMaxed={isMaxed}
      updateCurrentLevelPos={updateCurrentLevelPos}
      useEquipment={useEquipment}
      updateUseEquipment={updateUseEquipment}
      damage={damage}
      damageType={damageType}
    />
  );
});
