import { EquipmentType, GAME_DATA_TYPE, Rarity } from "data/Game";
import {
  ActionCardWrapper,
  ActiveModifierOverlay,
  AttackSpeedModifyStatDisplayer,
  CardTitle,
  convertEquipmentRarity,
  DPHStatDisplayer,
  DPSStatDisplayer,
  EquipmentTypeStatDisplayer,
  GameDataImageDisplayer,
  LevelOverlay,
  LevelSlider,
  ModifyStatDisplayer,
  OVERLAY_POSITION,
  SIZE,
  UseCheckbox,
} from "components/Calculator";
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
  dpsBoost: number;
  dphBoost: number;
  useHardMode: boolean;
  equipmentTypeList: EquipmentType[];
  attackSpeedBoost?: number;
  modifierImgPath?: string;
  modify?: number;
}

export function SupportEquipmentCard({
  equipmentID,
  name,
  imagePath,
  rarity,
  minLevelPos,
  maxLevelPos,
  currentLevelPos,
  currentLevel,
  isMaxed,
  updateCurrentLevelPos,
  useEquipment,
  updateUseEquipment,
  dpsBoost,
  dphBoost,
  useHardMode,
  equipmentTypeList,
  attackSpeedBoost,
  modifierImgPath,
  modify,
}: Props) {
  const isModifierActive = modifierImgPath !== undefined;

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
        <DPSStatDisplayer
          dps={dpsBoost}
          isBoost={true}
          isModifierActive={isModifierActive}
          useHardMode={useHardMode}
        />
        <DPHStatDisplayer
          dph={dphBoost}
          isBoost={true}
          isModifierActive={isModifierActive}
          useHardMode={useHardMode}
        />
        {attackSpeedBoost && (
          <AttackSpeedModifyStatDisplayer
            attackSpeedModify={attackSpeedBoost}
          />
        )}
        {modify && <ModifyStatDisplayer modify={modify} />}
        <EquipmentTypeStatDisplayer equipmentTypeList={equipmentTypeList} />
      </div>
    </ActionCardWrapper>
  );
}
