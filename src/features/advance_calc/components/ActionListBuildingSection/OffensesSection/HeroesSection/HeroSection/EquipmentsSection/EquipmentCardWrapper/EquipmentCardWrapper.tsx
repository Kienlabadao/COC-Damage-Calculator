import { memo } from "react";
import { equipmentDataUtils } from "utils/GameData/equipmentDataUtils";
import { OffenseItem } from "features/advance_calc/objects/offenseItem";
import { EquipmentItem } from "features/advance_calc/objects/equipmentItem";
import { SupportEquipmentCard } from "./SupportEquipmentCard";
import { DamageEquipmentCard } from "./DamageEquipmentCard";
import { AttackEquipmentCard } from "./AttackEquipmentCard";
import { BACKGROUND_TYPE } from "components/CalculatorComponents/GameDataCardContainer";

interface Props {
  equipmentItem: EquipmentItem;
  heroItem: OffenseItem;
  updateEquipment: (
    equipmentID: string,
    currentLevelPos?: number,
    use?: boolean
  ) => void;
  useHardMode: boolean;
}

export const EquipmentCardWrapper = memo(function EquipmentCardWrapper({
  equipmentItem,
  heroItem,
  updateEquipment,
  useHardMode,
}: Props) {
  const updateCurrentLevelPos = (newCurrentLevelPos: number) => {
    updateEquipment(equipmentID, newCurrentLevelPos);
  };
  const updateUseEquipment = (useEquipment: boolean) => {
    updateEquipment(equipmentID, undefined, useEquipment);
  };

  const equipmentID = equipmentItem.offenseID;
  const {
    getEquipmentName,
    getEquipmentImage,
    getEquipmentMinLevelPos,
    getEquipmentMaxLevelPos,
    getEquipmentLevel,
    getEquipmentDPSBoost,
    getEquipmentDamage,
    getEquipmentDamageType,
    isMaxLevelPos,
    isEquipmentTypeAttack,
    isEquipmentTypeDamage,
    isEquipmentTypeSupport,
    isEquipmentRarityEpic,
  } = equipmentDataUtils(equipmentID);

  const id = equipmentItem.id;
  const name = getEquipmentName();
  const minLevelPos = getEquipmentMinLevelPos();
  const maxLevelPos = getEquipmentMaxLevelPos(useHardMode);
  const currentLevelPos = equipmentItem.currentLevelPos;
  const currentLevel = getEquipmentLevel(currentLevelPos);
  const useEquipment = equipmentItem.use;
  const imagePath = getEquipmentImage();
  const backgroundType = isEquipmentRarityEpic()
    ? BACKGROUND_TYPE.Epic
    : BACKGROUND_TYPE.Normal;

  function renderEquipmentCard() {
    if (isEquipmentTypeDamage()) {
      const damage = getEquipmentDamage(currentLevelPos);
      const damageType = getEquipmentDamageType();
      if (!damageType) {
        throw new Error(
          `EquipmentCardWrapper.renderEquipmentCard ERROR: damageType of a equipment damage type cannot be null. EquipmentID: ${equipmentID}`
        );
      }
      let dpsBoost: number | undefined;
      if (isEquipmentTypeSupport()) {
        dpsBoost = getEquipmentDPSBoost(currentLevelPos);
      }

      return (
        <DamageEquipmentCard
          id={id}
          name={name}
          imagePath={imagePath}
          minLevelPos={minLevelPos}
          maxLevelPos={maxLevelPos}
          currentLevelPos={currentLevelPos}
          currentLevel={currentLevel}
          useEquipment={useEquipment}
          updateCurrentLevelPos={updateCurrentLevelPos}
          updateUseEquipment={updateUseEquipment}
          damage={damage}
          damageType={damageType}
          dpsBoost={dpsBoost}
          backgroundType={backgroundType}
          isMaxed={isMaxLevelPos(currentLevelPos)}
        />
      );
    } else if (isEquipmentTypeAttack()) {
      const extraDamage = getEquipmentDamage(currentLevelPos);
      const damageType = getEquipmentDamageType();
      if (!damageType) {
        throw new Error(
          `EquipmentCardWrapper.renderEquipmentCard ERROR: damageType of a equipment damage type cannot be null. EquipmentID: ${equipmentID}`
        );
      }
      let dpsBoost: number | undefined;
      if (isEquipmentTypeSupport()) {
        dpsBoost = getEquipmentDPSBoost(currentLevelPos);
      }

      return (
        <AttackEquipmentCard
          id={id}
          name={name}
          imagePath={imagePath}
          minLevelPos={minLevelPos}
          maxLevelPos={maxLevelPos}
          currentLevelPos={currentLevelPos}
          currentLevel={currentLevel}
          useEquipment={useEquipment}
          updateCurrentLevelPos={updateCurrentLevelPos}
          updateUseEquipment={updateUseEquipment}
          extraDamage={extraDamage}
          damageType={damageType}
          dpsBoost={dpsBoost}
          backgroundType={backgroundType}
          isMaxed={isMaxLevelPos(currentLevelPos)}
        />
      );
    } else if (isEquipmentTypeSupport()) {
      const dpsBoost = getEquipmentDPSBoost(currentLevelPos);

      return (
        <SupportEquipmentCard
          id={id}
          name={name}
          imagePath={imagePath}
          minLevelPos={minLevelPos}
          maxLevelPos={maxLevelPos}
          currentLevelPos={currentLevelPos}
          currentLevel={currentLevel}
          useEquipment={useEquipment}
          updateCurrentLevelPos={updateCurrentLevelPos}
          updateUseEquipment={updateUseEquipment}
          dpsBoost={dpsBoost}
          backgroundType={backgroundType}
          isMaxed={isMaxLevelPos(currentLevelPos)}
        />
      );
    } else {
      throw new Error(
        `EquipmentCardWrapper.renderEquipmentCard ERROR: equipment must have at least 1 type (attack, damage, or support). EquipmentID: ${equipmentID}`
      );
    }
  }

  return renderEquipmentCard();
});
