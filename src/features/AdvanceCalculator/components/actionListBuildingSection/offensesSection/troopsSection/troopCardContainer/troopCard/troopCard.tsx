import { DamageType } from "data/Game";
import { memo } from "react";
import {
  ActionCardWrapper,
  BACKGROUND_TYPE,
  CardTitle,
  DamageStatDisplayer,
  GameDataImageDisplayer,
  LevelSlider,
  SIZE,
  ActiveModifierOverlay,
  DeathDamageOverlay,
  LevelOverlay,
  OVERLAY_POSITION,
} from "components/Calculator";

function createTopLeftOverlay(
  useTroopDeathDamage: boolean,
  isModifierActive: boolean,
  modifierImgPath?: string
) {
  if (useTroopDeathDamage) {
    return <DeathDamageOverlay position={OVERLAY_POSITION.TopLeft} />;
  } else if (isModifierActive) {
    return (
      <ActiveModifierOverlay
        position={OVERLAY_POSITION.TopLeft}
        modifierImgPath={modifierImgPath!}
      />
    );
  } else {
    return undefined;
  }
}

interface Props {
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
  modifierImgPath?: string;
  useTroopDeathDamage?: boolean;
}

export const TroopCard = memo(function TroopCard({
  name,
  imagePath,
  minLevelPos,
  maxLevelPos,
  currentLevelPos,
  currentLevel,
  updateCurrentLevelPos,
  damage,
  damageType,
  isMaxed = false,
  modifierImgPath,
  useTroopDeathDamage = false,
}: Props) {
  const isModifierActive =
    modifierImgPath !== undefined && !useTroopDeathDamage;
  const backgroundType = BACKGROUND_TYPE.Normal;

  return (
    <ActionCardWrapper>
      <CardTitle title={name} />
      <div>
        <GameDataImageDisplayer
          imgPath={imagePath}
          backgroundType={backgroundType}
          size={SIZE.Normal}
        >
          {createTopLeftOverlay(
            useTroopDeathDamage,
            isModifierActive,
            modifierImgPath
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
        <DamageStatDisplayer
          damage={damage}
          damageType={damageType}
          isModifierActive={isModifierActive}
        />
      </div>
    </ActionCardWrapper>
  );
});
