import { OffenseCard } from "../../OffenseCard";
import { memo } from "react";
import { equipmentDataUtils } from "utils/GameData/equipmentDataUtils";
import { OffenseType, RARITY } from "data/game";
import { OffenseItem } from "features/zapquake_calc/objects/offenseItem";
import { BACKGROUND_TYPE } from "components/CalculatorComponents/GameDataCardContainer";

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

export const EquipmentCard = memo(function EquipmentCard({
  equipment,
  updateOffense,
}: Props) {
  const updateCurrentLevelPos = (newCurrentLevelPos: number) => {
    updateOffense(equipmentID, type, undefined, newCurrentLevelPos);
  };
  const updateUseOffense = (newUseOffense: boolean) => {
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
    getEquipmentRarity,
    getEquipmentDamage,
    getEquipmentDamageType,
    isMaxLevelPos,
  } = equipmentDataUtils(equipmentID);

  const name = getEquipmentName();
  const id = equipment.id;
  const type = equipment.type;
  const imagePath = getEquipmentImage();
  const backgroundType =
    getEquipmentRarity() === RARITY.Epic
      ? BACKGROUND_TYPE.Epic
      : BACKGROUND_TYPE.Normal;
  const minLevelPos = getEquipmentMinLevelPos();
  const maxLevelPos = getEquipmentMaxLevelPos();
  const currentLevelPos = equipment.currentLevelPos;
  const currentLevel = getEquipmentLevel(currentLevelPos);
  const useOffense = equipment.use;

  const damage = getEquipmentDamage(currentLevelPos);
  const damageType = getEquipmentDamageType();
  if (damageType === null) {
    throw new Error(
      `OffenseSection.createEquipmentCard ERROR: Equipment type Damage have null damage type. Equipment: ${equipmentData}`
    );
  }

  return (
    <OffenseCard
      id={id}
      name={name}
      type={type}
      imagePath={imagePath}
      backgroundType={backgroundType}
      minLevelPos={minLevelPos}
      maxLevelPos={maxLevelPos}
      currentLevelPos={currentLevelPos}
      currentLevel={currentLevel}
      useOffense={useOffense}
      updateCurrentLevelPos={updateCurrentLevelPos}
      updateUseOffense={updateUseOffense}
      damage={damage}
      damageType={damageType}
      isMaxed={isMaxLevelPos(currentLevelPos)}
    />
  );
});
