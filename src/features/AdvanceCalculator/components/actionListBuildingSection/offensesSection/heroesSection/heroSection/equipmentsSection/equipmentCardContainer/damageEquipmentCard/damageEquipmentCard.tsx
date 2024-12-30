import {
  ActionCardWrapper,
  ActiveModifierOverlay,
  AttackSpeedModifyStatDisplayer,
  CardTitle,
  convertEquipmentRarity,
  DamageStatDisplayer,
  DPHStatDisplayer,
  DPSStatDisplayer,
  EquipmentTypeStatDisplayer,
  GameDataImageDisplayer,
  LevelOverlay,
  LevelSlider,
  OVERLAY_POSITION,
  SIZE,
  UseCheckbox,
} from "components/Calculator";
import { DamageType, EquipmentType, GAME_DATA_TYPE, Rarity } from "data/Game";
import { getAdvanceCalcUseGameDataStorageKey } from "features/AdvanceCalculator/utils/advanceCalcUtils";

const type = GAME_DATA_TYPE.Equipment;

interface Props {
  equipmentID: string;
  name: string;
  imagePath: string;
  rarity: Rarity;
  minLevelPos: number;
  maxLevelPos: number;
  currentLevelPos: number;
  currentLevel: number;
  isMaxed: boolean;
  updateCurrentLevelPos: (newCurrentLevelPos: number) => void;
  useEquipment: boolean;
  updateUseEquipment: (newUseEquipment: boolean) => void;
  damage: number;
  damageType: DamageType;
  useHardMode: boolean;
  equipmentTypeList: EquipmentType[];
  dpsBoost?: number;
  dphBoost?: number;
  attackSpeedBoost?: number;
  modifierImgPath?: string;
}

export function DamageEquipmentCard({
  equipmentID,
  name,
  imagePath,
  rarity,
  minLevelPos,
  maxLevelPos,
  currentLevelPos,
  currentLevel,
  useEquipment,
  updateCurrentLevelPos,
  updateUseEquipment,
  damage,
  damageType,
  useHardMode,
  isMaxed,
  equipmentTypeList,
  dpsBoost,
  dphBoost,
  attackSpeedBoost,
  modifierImgPath,
}: Props) {
  const isModifierActive =
    dpsBoost !== undefined && modifierImgPath !== undefined;

  const useCheckboxID = getAdvanceCalcUseGameDataStorageKey(equipmentID, type);
  const backgroundType = convertEquipmentRarity(rarity);

  return (
    <ActionCardWrapper>
      <CardTitle title={name} />
      <div>
        <GameDataImageDisplayer
          imgPath={imagePath}
          backgroundType={backgroundType}
          size={SIZE.Normal}
        >
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
          id={useCheckboxID}
          type={type}
          use={useEquipment}
          updateUse={updateUseEquipment}
        />
      </div>
      <div className="mt-2">
        <DamageStatDisplayer damage={damage} damageType={damageType} />
        {dpsBoost && (
          <DPSStatDisplayer
            dps={dpsBoost}
            isBoost={true}
            isModifierActive={isModifierActive}
            useHardMode={useHardMode}
          />
        )}
        {dphBoost && (
          <DPHStatDisplayer
            dph={dphBoost}
            isBoost={true}
            isModifierActive={isModifierActive}
            useHardMode={useHardMode}
          />
        )}
        {attackSpeedBoost && (
          <AttackSpeedModifyStatDisplayer
            attackSpeedModify={attackSpeedBoost}
          />
        )}
        <EquipmentTypeStatDisplayer equipmentTypeList={equipmentTypeList} />
      </div>
    </ActionCardWrapper>
  );
}
