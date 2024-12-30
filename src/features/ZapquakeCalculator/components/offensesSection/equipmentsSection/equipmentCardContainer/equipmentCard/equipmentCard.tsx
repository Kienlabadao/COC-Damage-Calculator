import {
  ActionCardWrapper,
  CardTitle,
  convertEquipmentRarity,
  DamageStatDisplayer,
  GameDataImageDisplayer,
  LevelSlider,
  SIZE,
  LevelOverlay,
  OVERLAY_POSITION,
  UseCheckbox,
} from "components/Calculator";
import { DamageType, GAME_DATA_TYPE, Rarity } from "data/Game";
import { getZapquakeCalcUseOffenseStorageKey } from "features/ZapquakeCalculator/utils/zapquakeCalcUtils";

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
  updateUseEquipment: (newUseOffense: boolean) => void;
  damage: number;
  damageType: DamageType;
}

export function EquipmentCard({
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
  updateUseEquipment: updateUseOffense,
  damage,
  damageType,
  isMaxed,
}: Props) {
  const useCheckboxID = getZapquakeCalcUseOffenseStorageKey(equipmentID, type);
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
          updateUse={updateUseOffense}
        />
      </div>
      <div className="mt-2">
        <DamageStatDisplayer damage={damage} damageType={damageType} />
      </div>
    </ActionCardWrapper>
  );
}
