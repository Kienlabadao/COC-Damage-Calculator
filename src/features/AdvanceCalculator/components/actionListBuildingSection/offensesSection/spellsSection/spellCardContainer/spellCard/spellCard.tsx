import {
  ActionAdderButtons,
  ActionCardWrapper,
  CardTitle,
  DamageStatDisplayer,
  GameDataImageDisplayer,
  LevelSlider,
  SIZE,
  LevelOverlay,
  OVERLAY_POSITION,
} from "components/Calculator";
import { convertSpellID } from "components/Calculator/GameDataCard/gameDataImageDisplayer/Helper/convertSpellID";
import { DamageType } from "data/Game";
import { memo } from "react";

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
  damage: number;
  damageType: DamageType;
  createAction: (count: number) => void;
}

export const SpellCard = memo(function SpellCard({
  spellID,
  name,
  imagePath,
  minLevelPos,
  maxLevelPos,
  currentLevelPos,
  currentLevel,
  isMaxed,
  updateCurrentLevelPos,
  damage,
  damageType,
  createAction,
}: Props) {
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
        <ActionAdderButtons createAction={createAction} />
      </div>
      <div className="mt-2">
        <DamageStatDisplayer damage={damage} damageType={damageType} />
      </div>
    </ActionCardWrapper>
  );
});
