import { memo } from "react";
import { equipmentDataUtils } from "utils/GameData/equipmentDataUtils";
import { EquipmentItem } from "features/AdvanceCalculator/objects/equipmentItem";
import { SupportEquipmentCard } from "./supportEquipmentCard";
import { DamageEquipmentCard } from "./damageEquipmentCard";
import { AttackEquipmentCard } from "./attackEquipmentCard";
import { ModifierItem } from "features/AdvanceCalculator/objects/modifierItem";
import { getBaseModifiedImage } from "objects/baseModifierItem";
import { EquipmentDamageLog } from "features/AdvanceCalculator/objects/equipmentDamageLog";
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

export const EquipmentCardContainer = memo(function EquipmentCardContainer({
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
    getEquipmentRarity,
    isMaxLevelPos,
    isEquipmentTypeAttack,
    isEquipmentTypeDamage,
    isEquipmentTypeSupport,
    getEquipmentAttackSpeedBoost,
    getEquipmentAbilityAttackSpeedBoost,
    getEquipmentAbilityModify,
    canGiveAttackSpeedBoost,
    canGiveAbilityModify,
    canGiveAbilityAttackSpeedBoost,
  } = equipmentDataUtils(equipmentID);

  const name = getEquipmentName();
  const rarity = getEquipmentRarity();
  const equipmentTypeList = getEquipmentType();
  const minLevelPos = getEquipmentMinLevelPos();
  const maxLevelPos = getEquipmentMaxLevelPos(useHardMode);
  const currentLevelPos = equipmentItem.currentLevelPos;
  const currentLevel = getEquipmentLevel(currentLevelPos);
  const isMaxed = isMaxLevelPos(currentLevelPos);
  const useEquipment = equipmentItem.use;
  const imagePath = getEquipmentImage();
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
          `EquipmentCardContainer.renderEquipmentCard ERROR: damageType of a equipment damage type cannot be null. EquipmentID: ${equipmentID}`
        );
      }
      const dpsBoost = equipmentDamageLog.dps;
      const dphBoost = equipmentDamageLog.dph;

      return (
        <DamageEquipmentCard
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
          useHardMode={useHardMode}
          equipmentTypeList={equipmentTypeList}
          dpsBoost={dpsBoost}
          dphBoost={dphBoost}
          attackSpeedBoost={attackSpeedBoost}
          modifierImgPath={modifierImgPath}
        />
      );
    } else if (isEquipmentTypeAttack()) {
      const extraDamage = equipmentDamageLog.extraDamage!;
      const damageType = getEquipmentDamageType();
      if (!damageType) {
        throw new Error(
          `EquipmentCardContainer.renderEquipmentCard ERROR: damageType of a equipment damage type cannot be null. EquipmentID: ${equipmentID}`
        );
      }
      const dpsBoost = equipmentDamageLog.dps;
      const dphBoost = equipmentDamageLog.dph;

      return (
        <AttackEquipmentCard
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
          extraDamage={extraDamage}
          useHardMode={useHardMode}
          equipmentTypeList={equipmentTypeList}
          dpsBoost={dpsBoost}
          dphBoost={dphBoost}
          attackSpeedBoost={attackSpeedBoost}
          modifierImgPath={modifierImgPath}
        />
      );
    } else if (isEquipmentTypeSupport()) {
      const dpsBoost = equipmentDamageLog.dps!;
      const dphBoost = equipmentDamageLog.dph!;
      if (!dpsBoost) {
        throw new Error(
          `EquipmentCardContainer.renderEquipmentCard ERROR: equipment support type must give dps boost. EquipmentID: ${equipmentID}`
        );
      }

      return (
        <SupportEquipmentCard
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
          dpsBoost={dpsBoost}
          dphBoost={dphBoost}
          useHardMode={useHardMode}
          equipmentTypeList={equipmentTypeList}
          attackSpeedBoost={attackSpeedBoost}
          modifierImgPath={modifierImgPath}
          modify={modify}
        />
      );
    } else {
      throw new Error(
        `EquipmentCardContainer.renderEquipmentCard ERROR: equipment must have at least 1 type (attack, damage, or support). EquipmentID: ${equipmentID}`
      );
    }
  }

  return renderEquipmentCard();
});
