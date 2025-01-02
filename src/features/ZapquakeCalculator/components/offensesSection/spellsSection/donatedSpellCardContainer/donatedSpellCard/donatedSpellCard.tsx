import { DamageType } from "data/Game";
import {
  ActionCardWrapper,
  CardTitle,
  DamageStatDisplayer,
  DonatedSpellCountInputField,
  GameDataImageDisplayer,
  LevelSlider,
  SIZE,
  DonatedOverlay,
  LevelOverlay,
  OVERLAY_POSITION,
  convertSpellID,
} from "components/Calculator";
import { getDonatedLightningSpellCountStorageKey } from "features/ZapquakeCalculator/utils/zapquakeCalcUtils";

interface Props {
  name: string;
  spellID: string;
  imagePath: string;
  minLevelPos: number;
  maxLevelPos: number;
  currentLevelPos: number;
  currentLevel: number;
  isMaxed: boolean;
  updateCurrentLevelPos: (newCurrentLevelPos: number) => void;
  minCount: number;
  maxCount: number;
  currentCount: number;
  updateCount: (newCount: number) => void;
  damage: number;
  damageType: DamageType;
}

export function DonatedSpellCard({
  name,
  spellID,
  imagePath,
  minLevelPos,
  maxLevelPos,
  currentLevelPos,
  currentLevel,
  isMaxed,
  updateCurrentLevelPos,
  minCount,
  maxCount,
  currentCount,
  updateCount,
  damage,
  damageType,
}: Props) {
  const donateCountID = getDonatedLightningSpellCountStorageKey();
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
          <DonatedOverlay position={OVERLAY_POSITION.TopLeft} />
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
        <DonatedSpellCountInputField
          id={donateCountID}
          minCount={minCount}
          maxCount={maxCount}
          currentCount={currentCount}
          updateCount={updateCount}
        />
      </div>
      <div className="mt-2">
        <DamageStatDisplayer
          damage={damage}
          damageType={damageType}
          isModifierActive={false}
        />
      </div>
    </ActionCardWrapper>
  );
}
