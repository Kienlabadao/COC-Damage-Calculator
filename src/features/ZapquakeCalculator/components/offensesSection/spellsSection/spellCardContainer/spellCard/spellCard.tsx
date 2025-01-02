import {
  ActionCardWrapper,
  CardTitle,
  DamageStatDisplayer,
  GameDataImageDisplayer,
  LevelSlider,
  SIZE,
  LevelOverlay,
  OVERLAY_POSITION,
  UseCheckbox,
  convertSpellID,
} from "components/Calculator";
import { DamageType, GAME_DATA_TYPE } from "data/Game";
import { getZapquakeCalcUseOffenseStorageKey } from "features/ZapquakeCalculator/utils/zapquakeCalcUtils";

const type = GAME_DATA_TYPE.Spell;

interface Props {
  spellID: string;
  name: string;
  imagePath: string;
  minLevelPos: number;
  maxLevelPos: number;
  currentLevelPos: number;
  currentLevel: number;
  isMaxed: boolean;
  updateCurrentLevelPos: (newCurrentLevelPos: number) => void;
  useSpell: boolean;
  updateUseSpell: (newUseOffense: boolean) => void;
  damage: number;
  damageType: DamageType;
}

export function SpellCard({
  spellID,
  name,
  imagePath,
  minLevelPos,
  maxLevelPos,
  currentLevelPos,
  currentLevel,
  isMaxed,
  updateCurrentLevelPos,
  useSpell,
  updateUseSpell,
  damage,
  damageType,
}: Props) {
  const useCheckboxID = getZapquakeCalcUseOffenseStorageKey(spellID, type);
  const backgroundType = convertSpellID(spellID);

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
          use={useSpell}
          updateUse={updateUseSpell}
        />
      </div>
      <div className="mt-2">
        <DamageStatDisplayer damage={damage} damageType={damageType} />
      </div>
    </ActionCardWrapper>
  );
}
