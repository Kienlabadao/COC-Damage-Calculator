import {
  ActionCardWrapper,
  ActiveModifierOverlay,
  BACKGROUND_TYPE,
  CardTitle,
  GameDataImageDisplayer,
  LevelOverlay,
  LevelSlider,
  OVERLAY_POSITION,
  RepairStatDisplayer,
  SIZE,
} from "components/Calculator";

interface Props {
  name: string;
  imagePath: string;
  minLevelPos: number;
  maxLevelPos: number;
  currentLevelPos: number;
  currentLevel: number;
  isMaxed: boolean;
  updateCurrentLevelPos: (newCurrentLevelPos: number) => void;
  repair: number;
  modifierImgPath?: string;
}

export function RepairCard({
  name,
  imagePath,
  minLevelPos,
  maxLevelPos,
  currentLevelPos,
  currentLevel,
  isMaxed,
  updateCurrentLevelPos,
  repair,
  modifierImgPath,
}: Props) {
  const isModifierActive = modifierImgPath !== undefined;

  return (
    <ActionCardWrapper>
      <CardTitle title={name} />
      <div>
        <GameDataImageDisplayer
          imgPath={imagePath}
          size={SIZE.Normal}
          backgroundType={BACKGROUND_TYPE.Normal}
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
        <RepairStatDisplayer
          repair={repair}
          isModifierActive={isModifierActive}
        />
      </div>
    </ActionCardWrapper>
  );
}
