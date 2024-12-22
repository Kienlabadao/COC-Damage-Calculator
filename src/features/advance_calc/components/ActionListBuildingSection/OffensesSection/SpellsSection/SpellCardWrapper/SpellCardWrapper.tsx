import { SPELL } from "data/game";
import { memo } from "react";
import { spellDataUtils } from "utils/GameData/spellDataUtils";
import { BACKGROUND_TYPE } from "components/CalculatorComponents/GameDataCardContainer";
import { OffenseItem } from "features/advance_calc/objects/offenseItem";
import { SpellCard } from "./SpellCard";

interface Props {
  spellItem: OffenseItem;
  updateSpell: (offenseID: string, currentLevelPos?: number) => void;
}

export const SpellCardWrapper = memo(function SpellCardWrapper({
  spellItem,
  updateSpell,
}: Props) {
  const updateCurrentLevelPos = (newCurrentLevelPos: number) => {
    updateSpell(spellID, newCurrentLevelPos);
  };

  const spellID = spellItem.offenseID;
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

  const id = spellItem.id;
  const name = getSpellName();
  const imagePath = getSpellImage();
  const backgroundType =
    spellID === SPELL.EarthquakeSpell
      ? BACKGROUND_TYPE.Earthquake
      : BACKGROUND_TYPE.Normal;
  const minLevelPos = getSpellMinLevelPos();
  const maxLevelPos = getSpellMaxLevelPos();
  const currentLevelPos = spellItem.currentLevelPos;
  const currentLevel = getSpellLevel(currentLevelPos);
  const damage = getSpellDamage(currentLevelPos);
  const damageType = getSpellDamageType();

  return (
    <SpellCard
      id={id}
      name={name}
      imagePath={imagePath}
      minLevelPos={minLevelPos}
      maxLevelPos={maxLevelPos}
      currentLevelPos={currentLevelPos}
      currentLevel={currentLevel}
      updateCurrentLevelPos={updateCurrentLevelPos}
      damage={damage}
      damageType={damageType}
      isMaxed={isMaxLevelPos(currentLevelPos)}
      backgroundType={backgroundType}
    />
  );
});
