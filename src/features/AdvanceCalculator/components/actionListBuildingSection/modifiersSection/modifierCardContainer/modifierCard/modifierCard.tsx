import {
  ActionCardWrapper,
  BACKGROUND_TYPE,
  GameDataImageDisplayer,
  LevelOverlay,
  LevelSlider,
  ModifyStatDisplayer,
  OVERLAY_POSITION,
  SIZE,
  UseCheckbox,
} from "components/Calculator";
import { GAME_DATA_TYPE } from "data/Game";
import { getAdvanceCalcUseGameDataStorageKey } from "features/AdvanceCalculator/utils/advanceCalcUtils";
import { CardTitle } from "react-bootstrap";

const type = GAME_DATA_TYPE.Modifier;

function createLevelOverlay(
  currentLevel: number,
  isMaxed: boolean
): JSX.Element | undefined {
  if (currentLevel === 1 && isMaxed) {
    return undefined;
  } else {
    return (
      <LevelOverlay
        position={OVERLAY_POSITION.BottomLeft}
        level={currentLevel}
        isMaxed={isMaxed}
      />
    );
  }
}

interface Props {
  modifierID: string;
  name: string;
  imagePath: string;
  minLevelPos: number;
  maxLevelPos: number;
  currentLevelPos: number;
  currentLevel: number;
  isMaxed: boolean;
  updateCurrentLevelPos: (newCurrentLevelPos: number) => void;
  useModifier: boolean;
  updateUseModifier: (newUseModifier: boolean) => void;
  modify: number;
}

export function ModifierCard({
  modifierID,
  name,
  imagePath,
  minLevelPos,
  maxLevelPos,
  currentLevelPos,
  currentLevel,
  isMaxed,
  updateCurrentLevelPos,
  useModifier,
  updateUseModifier,
  modify,
}: Props) {
  const useModifierID = getAdvanceCalcUseGameDataStorageKey(modifierID, type);

  return (
    <ActionCardWrapper>
      <CardTitle title={name} />
      <div>
        <GameDataImageDisplayer
          imgPath={imagePath}
          backgroundType={BACKGROUND_TYPE.Modifier}
          size={SIZE.Normal}
        >
          {createLevelOverlay(currentLevel, isMaxed)}
        </GameDataImageDisplayer>
      </div>
      {minLevelPos !== maxLevelPos && (
        <div className="mt-2">
          <LevelSlider
            minLevelPos={minLevelPos}
            maxLevelPos={maxLevelPos}
            currentLevelPos={currentLevelPos}
            updateCurrentLevelPos={updateCurrentLevelPos}
          />
        </div>
      )}
      <div className="mt-2">
        <UseCheckbox
          id={useModifierID}
          type={type}
          use={useModifier}
          updateUse={updateUseModifier}
        />
      </div>
      <div className="mt-2">
        <ModifyStatDisplayer modify={modify} />
      </div>
    </ActionCardWrapper>
  );
}
