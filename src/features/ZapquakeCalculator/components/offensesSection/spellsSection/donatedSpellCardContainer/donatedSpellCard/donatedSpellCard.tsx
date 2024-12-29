import { OffenseType, SPELL } from "data/game";
import { memo } from "react";
import { spellDataUtils } from "utils/GameData/spellDataUtils";
import {
  MAX_DONATED_SPELL_COUNT,
  MIN_DONATED_SPELL_COUNT,
} from "features/zapquake_calc/config/config";
import { DonatedLightningSpellItem } from "features/zapquake_calc/objects/donatedLightningSpellItem";
import {
  ActionCardWrapper,
  BACKGROUND_TYPE,
  CardTitle,
  DamageStatDisplayer,
  DonatedSpellCountInputField,
  GameDataImageDisplayer,
  LevelSlider,
  SIZE,
} from "components/Calculator";
import {
  DonatedOverlay,
  LevelOverlay,
  OVERLAY_POSITION,
} from "components/Calculator/GameDataCard/gameDataImageDisplayer/Overlay";
import { Slider } from "components/UI";

interface Props {
  spell: DonatedLightningSpellItem;
  updateOffense: (
    offenseID: string,
    type: OffenseType,
    isDonated?: boolean,
    currentLevelPos?: number,
    useOffense?: boolean,
    count?: number
  ) => void;
}

export const DonatedSpellCard = memo(function DonatedSpellCard({
  spell,
  updateOffense,
}: Props) {
  const isDonated = true;
  const updateCurrentLevelPos = (newCurrentLevelPos: number) => {
    updateOffense(spellID, type, isDonated, newCurrentLevelPos);
  };
  const updateCount = (newCount: number) => {
    updateOffense(spellID, type, isDonated, undefined, undefined, newCount);
  };

  const spellID = spell.offenseID;
  const {
    getSpellName,
    getSpellImage,
    getSpellMinLevelPos,
    getSpellMaxLevelPos,
    getSpellLevel,
    getSpellDamage,
    getSpellDamageType,
    isMaxLevelPos,
  } = spellDataUtils(spellID);

  const name = getSpellName();
  const id = spell.id;
  const type = spell.type;
  const imagePath = getSpellImage();
  const minLevelPos = getSpellMinLevelPos();
  const maxLevelPos = getSpellMaxLevelPos();
  const currentLevelPos = spell.currentLevelPos;
  const currentLevel = getSpellLevel(currentLevelPos);
  const isMaxed = isMaxLevelPos(currentLevelPos);
  const minCount = MIN_DONATED_SPELL_COUNT;
  const maxCount = MAX_DONATED_SPELL_COUNT;
  const currentCount = spell.count;
  const damage = getSpellDamage(currentLevelPos);
  const damageType = getSpellDamageType();

  const donateCountID = `donate_count_${id}`;
  const backgroundType =
    spellID === SPELL.EarthquakeSpell
      ? BACKGROUND_TYPE.Earthquake
      : BACKGROUND_TYPE.Normal;

  return (
    <ActionCardWrapper>
      <CardTitle title={`${name} (Donated)`} />
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
});
