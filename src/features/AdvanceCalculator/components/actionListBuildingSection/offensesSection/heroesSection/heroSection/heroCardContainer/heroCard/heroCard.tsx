import { ReactNode } from "react";
import { IMAGE_PATH } from "data/constants";
import { EquipmentItem } from "features/AdvanceCalculator/objects/equipmentItem";
import { equipmentDataUtils } from "utils/GameData/equipmentDataUtils";
import {
  ActionCardWrapper,
  AttackSpeedStatDisplayer,
  BACKGROUND_TYPE,
  CardTitle,
  DPHStatDisplayer,
  DPSStatDisplayer,
  GameDataImageDisplayer,
  LevelSlider,
  SIZE,
  ActiveEquipmentOverlay,
  ActiveModifierOverlay,
  LevelOverlay,
  OVERLAY_POSITION,
  UseCheckbox,
} from "components/Calculator";
import { getUseAbilityHeroStorageKey } from "features/AdvanceCalculator/utils/advanceCalcUtils";

function createActiveEquipmentOverlay(
  activeAttackEquipmentItem: EquipmentItem
) {
  const { getEquipmentRarity, getEquipmentImage } = equipmentDataUtils(
    activeAttackEquipmentItem.offenseID
  );

  const imgPath = getEquipmentImage();
  const rarity = getEquipmentRarity();

  return (
    <ActiveEquipmentOverlay
      position={OVERLAY_POSITION.TopRight}
      equipmentImgPath={imgPath}
      rarity={rarity}
    />
  );
}

interface Props {
  heroID: string;
  name: string;
  imagePath: string;
  minLevelPos: number;
  maxLevelPos: number;
  currentLevelPos: number;
  currentLevel: number;
  isMaxed: boolean;
  updateCurrentLevelPos: (newCurrentLevelPos: number) => void;
  useAbility: boolean;
  updateUseAbility: (newUseAbility: boolean) => void;
  dps: number;
  dph: number;
  attackSpeed: number;
  isAttackSpeedModified: boolean;
  useHardMode: boolean;
  modifierImgPath?: string;
  activeAttackEquipmentItem?: EquipmentItem;
  usedEquipmentDisplayer?: ReactNode;
}

export function HeroCard({
  heroID,
  name,
  imagePath,
  minLevelPos,
  maxLevelPos,
  currentLevelPos,
  currentLevel,
  isMaxed,
  updateCurrentLevelPos,
  useAbility,
  updateUseAbility,
  dps,
  dph,
  attackSpeed,
  isAttackSpeedModified,
  useHardMode,
  modifierImgPath,
  activeAttackEquipmentItem,
  usedEquipmentDisplayer,
}: Props) {
  const isModifierActive = modifierImgPath !== undefined;
  const useAbilityID = getUseAbilityHeroStorageKey(heroID);
  const backgroundType = BACKGROUND_TYPE.Normal;

  return (
    <ActionCardWrapper>
      <div className="d-flex align-items-center justify-content-center gap-2">
        <CardTitle title={name} />
        {useHardMode && <img height={30} src={IMAGE_PATH.HardModeIcon} />}
      </div>
      <div className="mt-2">
        <GameDataImageDisplayer
          imgPath={imagePath}
          backgroundType={backgroundType}
          size={SIZE.Large}
        >
          {activeAttackEquipmentItem &&
            createActiveEquipmentOverlay(activeAttackEquipmentItem)}
          {isModifierActive && (
            <ActiveModifierOverlay
              position={OVERLAY_POSITION.TopLeft}
              modifierImgPath={modifierImgPath}
            />
          )}
          <LevelOverlay
            position={OVERLAY_POSITION.BottomLeft}
            level={currentLevel}
            isMaxed={isMaxed}
          />
        </GameDataImageDisplayer>
      </div>
      <div className="mt-2">
        <LevelSlider
          minLevelPos={minLevelPos}
          maxLevelPos={maxLevelPos}
          currentLevelPos={currentLevelPos}
          updateCurrentLevelPos={updateCurrentLevelPos}
        />
      </div>
      <div className="mt-2">
        <UseCheckbox
          id={useAbilityID}
          type={`Ability`}
          use={useAbility}
          updateUse={updateUseAbility}
        />
      </div>
      {usedEquipmentDisplayer && (
        <div className="mt-2">{usedEquipmentDisplayer}</div>
      )}
      <div className="mt-2">
        <DPSStatDisplayer
          dps={dps}
          isBoost={false}
          isModifierActive={isModifierActive}
          useHardMode={useHardMode}
        />
        <DPHStatDisplayer
          dph={dph}
          isBoost={false}
          isModifierActive={isModifierActive}
          useHardMode={useHardMode}
        />
        <AttackSpeedStatDisplayer
          attackSpeed={attackSpeed}
          isModifierActive={isAttackSpeedModified}
        />
      </div>
    </ActionCardWrapper>
  );
}
