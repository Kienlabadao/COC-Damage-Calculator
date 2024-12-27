import { OffenseType, SPELL } from "data/game";
import { memo } from "react";
import { spellDataUtils } from "utils/GameData/spellDataUtils";
import {
  MAX_DONATED_SPELL_COUNT,
  MIN_DONATED_SPELL_COUNT,
} from "features/zapquake_calc/config/config";
import { NumberInputField, Slider } from "components";
import {
  convertToDisplayerType,
  StatDisplayer,
  OffenseCardContainer,
} from "components/CalculatorComponents/OffenseCard";
import { DonatedLightningSpellItem } from "features/zapquake_calc/objects/donatedLightningSpellItem";
import {
  BACKGROUND_TYPE,
  GameDataCardContainer,
  SIZE,
} from "components/CalculatorComponents/GameDataCardContainer";
import {
  OVERLAY_TYPE,
  OverlayType,
} from "components/CalculatorComponents/GameDataCardContainer/Overlay";
import { IMAGE_PATH } from "data/constants";

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
  const bottomLeftOverlayType: OverlayType = isMaxed
    ? OVERLAY_TYPE.NumLevelMaxed
    : OVERLAY_TYPE.Num;

  return (
    <OffenseCardContainer>
      <h5>{`${name} (Donated)`}</h5>
      <div>
        <GameDataCardContainer
          imgPath={imagePath}
          backgroundType={backgroundType}
          size={SIZE.Normal}
          topLeftOverlay={{
            type: OVERLAY_TYPE.Img,
            imgPath: IMAGE_PATH.Donated,
          }}
          bottomLeftOverlay={{
            type: bottomLeftOverlayType,
            content: currentLevel.toString(),
          }}
        />
      </div>
      <div className="mt-2">
        <Slider
          min={minLevelPos}
          max={maxLevelPos}
          currentValue={currentLevelPos}
          onChange={(newValue: number) => updateCurrentLevelPos(newValue)}
        />
      </div>
      <div>
        <label htmlFor={donateCountID} className="form-label">
          <strong>Number of {type} in clan castle:</strong>
        </label>
        <NumberInputField
          id={donateCountID}
          minValue={minCount}
          maxValue={maxCount}
          currentValue={currentCount}
          onChange={(newCount: number) => updateCount(newCount)}
        />
      </div>
      <div className="mt-2">
        <StatDisplayer
          displayerType={convertToDisplayerType(damageType)}
          label={"Damage"}
          content={damage.toString()}
          isModifierActive={false}
        ></StatDisplayer>
      </div>
    </OffenseCardContainer>
  );
});
