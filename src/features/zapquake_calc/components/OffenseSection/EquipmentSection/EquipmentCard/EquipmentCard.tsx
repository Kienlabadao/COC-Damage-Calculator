import { OffenseCard } from "../../OffenseCard";
import { memo, useCallback } from "react";
import { equipmentDataUtils } from "utils/GameData/equipmentDataUtils";
import { RARITY } from "data/game";
import { BACKGROUND_TYPE } from "components/CalculatorComponents/OffenseCard/OffenseCardImage";
import { OffenseItem } from "features/zapquake_calc/objects/offenseItem";

interface Props {
  equipment: OffenseItem;
  updateOffenseItem: (
    offenseID: string,
    isDonated?: boolean,
    currentLevelPos?: number,
    useOffense?: boolean,
    count?: number
  ) => void;
}

export const EquipmentCard = memo(function EquipmentCard({
  equipment,
  updateOffenseItem,
}: Props) {
  const updateCurrentLevelPos = useCallback((newCurrentLevelPos: number) => {
    updateOffenseItem(equipmentID, undefined, newCurrentLevelPos);
  }, []);
  const updateUseOffense = useCallback((newUseOffense: boolean) => {
    updateOffenseItem(equipmentID, undefined, undefined, newUseOffense);
  }, []);

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
    />
  );
});
