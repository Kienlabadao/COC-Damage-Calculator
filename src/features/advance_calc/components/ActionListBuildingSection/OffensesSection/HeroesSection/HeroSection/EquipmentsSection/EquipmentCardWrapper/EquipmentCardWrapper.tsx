import { memo } from "react";
import { equipmentDataUtils } from "utils/GameData/equipmentDataUtils";
import { EquipmentItem } from "features/advance_calc/objects/equipmentItem";
import { SupportEquipmentCard } from "./SupportEquipmentCard";
import { DamageEquipmentCard } from "./DamageEquipmentCard";
import { AttackEquipmentCard } from "./AttackEquipmentCard";
import { BACKGROUND_TYPE } from "components/CalculatorComponents/GameDataCardContainer";
import { ModifierItem } from "features/advance_calc/objects/modifierItem";
import { getBaseModifiedImage } from "objects/baseModifierItem";
import { EquipmentDamageLog } from "features/advance_calc/objects/equipmentDamageLog";
import { calculateCombinedPercentageIncrease } from "utils/numberUtils";

interface Props {
  equipmentItem: EquipmentItem;
  updateEquipment: (
    equipmentID: string,
    currentLevelPos?: number,
    use?: boolean
  ) => void;
  equipmentDamageLog: EquipmentDamageLog;
  useHardMode: boolean;
  useAbility: boolean;
  activeModifier?: ModifierItem;
}

export const EquipmentCardWrapper = memo(function EquipmentCardWrapper({
  equipmentItem,
  updateEquipment,
  equipmentDamageLog,
  useHardMode,
  useAbility,
  activeModifier,
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
    getEquipmentDamageType,
    getEquipmentType,
    isMaxLevelPos,
    isEquipmentTypeAttack,
    isEquipmentTypeDamage,
    isEquipmentTypeSupport,
    isEquipmentRarityEpic,
    getEquipmentAttackSpeedBoost,
    getEquipmentAbilityAttackSpeedBoost,
    getEquipmentAbilityModify,
    canGiveAttackSpeedBoost,
    canGiveAbilityModify,
    canGiveAbilityAttackSpeedBoost,
  } = equipmentDataUtils(equipmentID);

  const id = equipmentItem.id;
  const name = getEquipmentName();
  const equipmentTypeList = getEquipmentType();
  const minLevelPos = getEquipmentMinLevelPos();
  const maxLevelPos = getEquipmentMaxLevelPos(useHardMode);
  const currentLevelPos = equipmentItem.currentLevelPos;
  const currentLevel = getEquipmentLevel(currentLevelPos);
  const useEquipment = equipmentItem.use;
  const imagePath = getEquipmentImage();
  const backgroundType = isEquipmentRarityEpic()
    ? BACKGROUND_TYPE.Epic
    : BACKGROUND_TYPE.Normal;
  const modifierImgPath = activeModifier
    ? getBaseModifiedImage(activeModifier)
    : undefined;

  let attackSpeedBoost: number;
  if (canGiveAttackSpeedBoost()) {
    attackSpeedBoost = getEquipmentAttackSpeedBoost(currentLevelPos);

    if (useAbility && canGiveAbilityAttackSpeedBoost()) {
      attackSpeedBoost = attackSpeedBoost ? attackSpeedBoost : 0;

      attackSpeedBoost = calculateCombinedPercentageIncrease(
        attackSpeedBoost,
        getEquipmentAbilityAttackSpeedBoost(currentLevelPos)
      );
    }
  }

  let modify: number;
  if (useAbility && canGiveAbilityModify()) {
    modify = getEquipmentAbilityModify(currentLevelPos);
  }

  function renderEquipmentCard() {
    if (isEquipmentTypeDamage()) {
      const damage = equipmentDamageLog.damage!;
      const damageType = getEquipmentDamageType();
      if (!damageType) {
        throw new Error(
          `EquipmentCardWrapper.renderEquipmentCard ERROR: damageType of a equipment damage type cannot be null. EquipmentID: ${equipmentID}`
        );
      }
      const dpsBoost = equipmentDamageLog.dps;
      const dphBoost = equipmentDamageLog.dph;

      return (
        <DamageEquipmentCard
          id={id}
          name={name}
          imagePath={imagePath}
          equipmentTypeList={equipmentTypeList}
          minLevelPos={minLevelPos}
          maxLevelPos={maxLevelPos}
          currentLevelPos={currentLevelPos}
          currentLevel={currentLevel}
          useEquipment={useEquipment}
          updateCurrentLevelPos={updateCurrentLevelPos}
          updateUseEquipment={updateUseEquipment}
          damage={damage}
          damageType={damageType}
          useHardMode={useHardMode}
          dpsBoost={dpsBoost}
          dphBoost={dphBoost}
          attackSpeedBoost={attackSpeedBoost}
          backgroundType={backgroundType}
          isMaxed={isMaxLevelPos(currentLevelPos)}
          modifierImgPath={modifierImgPath}
        />
      );
    } else if (isEquipmentTypeAttack()) {
      const extraDamage = equipmentDamageLog.extraDamage!;
      const damageType = getEquipmentDamageType();
      if (!damageType) {
        throw new Error(
          `EquipmentCardWrapper.renderEquipmentCard ERROR: damageType of a equipment damage type cannot be null. EquipmentID: ${equipmentID}`
        );
      }
      const dpsBoost = equipmentDamageLog.dps;
      const dphBoost = equipmentDamageLog.dph;

      return (
        <AttackEquipmentCard
          id={id}
          name={name}
          imagePath={imagePath}
          equipmentTypeList={equipmentTypeList}
          minLevelPos={minLevelPos}
          maxLevelPos={maxLevelPos}
          currentLevelPos={currentLevelPos}
          currentLevel={currentLevel}
          useEquipment={useEquipment}
          updateCurrentLevelPos={updateCurrentLevelPos}
          updateUseEquipment={updateUseEquipment}
          extraDamage={extraDamage}
          damageType={damageType}
          useHardMode={useHardMode}
          dpsBoost={dpsBoost}
          dphBoost={dphBoost}
          attackSpeedBoost={attackSpeedBoost}
          backgroundType={backgroundType}
          isMaxed={isMaxLevelPos(currentLevelPos)}
          modifierImgPath={modifierImgPath}
        />
      );
    } else if (isEquipmentTypeSupport()) {
      const dpsBoost = equipmentDamageLog.dps!;
      const dphBoost = equipmentDamageLog.dph!;
      if (!dpsBoost) {
        throw new Error(
          `EquipmentCardWrapper.renderEquipmentCard ERROR: equipment support type must give dps boost. EquipmentID: ${equipmentID}`
        );
      }

      return (
        <SupportEquipmentCard
          id={id}
          name={name}
          imagePath={imagePath}
          equipmentTypeList={equipmentTypeList}
          minLevelPos={minLevelPos}
          maxLevelPos={maxLevelPos}
          currentLevelPos={currentLevelPos}
          currentLevel={currentLevel}
          useEquipment={useEquipment}
          updateCurrentLevelPos={updateCurrentLevelPos}
          updateUseEquipment={updateUseEquipment}
          dpsBoost={dpsBoost}
          dphBoost={dphBoost}
          attackSpeedBoost={attackSpeedBoost}
          modify={modify}
          useHardMode={useHardMode}
          backgroundType={backgroundType}
          isMaxed={isMaxLevelPos(currentLevelPos)}
          modifierImgPath={modifierImgPath}
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
