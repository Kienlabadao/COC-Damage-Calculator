import { DamageType } from "data/game";
import { memo } from "react";
import {
  GameDataCardContainer,
  SIZE,
} from "components/CalculatorComponents/GameDataCardContainer";
import {
  OffenseCardContainer,
  NumberStatDisplayer,
  convertToDisplayerType,
  DISPLAYER_TYPE,
} from "components/CalculatorComponents/OffenseCard";
import { Checkbox, Slider } from "components";
import { IMAGE_PATH } from "data/constants";
import {
  OVERLAY_TYPE,
  OverlayType,
} from "components/CalculatorComponents/GameDataCardContainer/Overlay";
import { EquipmentItem } from "features/advance_calc/objects/equipmentItem";
import { equipmentDataUtils } from "utils/GameData/equipmentDataUtils";
import { UsedEquipmentDisplayer } from "components/CalculatorComponents/DefenseCard";

interface Props {
  id: string;
  name: string;
  imagePath: string;
  minLevelPos: number;
  maxLevelPos: number;
  currentLevelPos: number;
  currentLevel: number;
  useAbility: boolean;
  updateCurrentLevelPos: (newCurrentLevelPos: number) => void;
  updateUseAbility: (newUseAbility: boolean) => void;
  dps: number;
  dph: number;
  damageType: DamageType;
  attackSpeed: number;
  isAttackSpeedModified: boolean;
  usedEquipmentItemList: EquipmentItem[];
  useHardMode: boolean;
  isMaxed: boolean;
  modifierImgPath?: string;
  activeAttackEquipmentItem?: EquipmentItem;
}

export const HeroCard = memo(function HeroCard({
  id,
  name,
  imagePath,
  minLevelPos,
  maxLevelPos,
  currentLevelPos,
  currentLevel,
  useAbility,
  updateCurrentLevelPos,
  updateUseAbility,
  dps,
  dph,
  damageType,
  attackSpeed,
  isAttackSpeedModified,
  usedEquipmentItemList,
  useHardMode,
  isMaxed,
  modifierImgPath,
  activeAttackEquipmentItem,
}: Props) {
  const isModifierActive = modifierImgPath !== undefined;

  function createTopRightOverlay() {
    if (activeAttackEquipmentItem) {
      const {
        isEquipmentRarityCommon,
        isEquipmentRarityEpic,
        getEquipmentImage,
      } = equipmentDataUtils(activeAttackEquipmentItem.offenseID);

      const imgPath = getEquipmentImage();
      let type: OverlayType = OVERLAY_TYPE.Img;
      if (isEquipmentRarityCommon()) {
        type = OVERLAY_TYPE.ImgCommon;
      } else if (isEquipmentRarityEpic()) {
        type = OVERLAY_TYPE.ImgEpic;
      }

      return {
        type: type,
        imgPath: imgPath,
      };
    } else {
      return undefined;
    }
  }

  const topLeftOverlay = isModifierActive
    ? { type: OVERLAY_TYPE.ImgRaged, imgPath: modifierImgPath }
    : undefined;
  const bottomLeftOverlayType: OverlayType = isMaxed
    ? OVERLAY_TYPE.NumLevelMaxed
    : OVERLAY_TYPE.Num;

  return (
    <OffenseCardContainer>
      <div className="d-flex align-items-center justify-content-center gap-2">
        <h5>{name}</h5>
        {useHardMode && <img height={30} src={IMAGE_PATH.HardModeIcon} />}
      </div>
      <div className="mt-2">
        <GameDataCardContainer
          imgPath={imagePath}
          size={SIZE.Large}
          bottomLeftOverlay={{
            type: bottomLeftOverlayType,
            content: currentLevel.toString(),
          }}
          topLeftOverlay={topLeftOverlay}
          topRightOverlay={createTopRightOverlay()}
        />
      </div>
      <div className="mt-2">
        <Slider
          min={minLevelPos}
          max={maxLevelPos}
          currentValue={currentLevelPos}
          onChange={(newValue: number) => updateCurrentLevelPos(newValue)}
        />
      </div>
      <div className="d-flex justify-content-center align-items-center mt-2">
        <Checkbox
          id={`use_ability_${id}`}
          label={`Use Ability`}
          isChecked={useAbility}
          onChange={(isChecked: boolean) => updateUseAbility(isChecked)}
        />
      </div>
      <div className="mt-2">
        {usedEquipmentItemList.length > 0 && (
          <UsedEquipmentDisplayer equipmentItemList={usedEquipmentItemList} />
        )}
      </div>
      <div className="mt-2">
        <NumberStatDisplayer
          displayerType={convertToDisplayerType(damageType)}
          label={"DPS"}
          content={dps}
          isModifierActive={isModifierActive}
          useHardMode={useHardMode}
        />
        <NumberStatDisplayer
          displayerType={convertToDisplayerType(damageType)}
          label={"DPH"}
          content={dph}
          isModifierActive={isModifierActive}
          useHardMode={useHardMode}
        />
        <NumberStatDisplayer
          displayerType={DISPLAYER_TYPE.AtackSpeed}
          label={"Attack Speed"}
          content={attackSpeed}
          isModifierActive={isAttackSpeedModified}
        />
      </div>
    </OffenseCardContainer>
  );
});
