import { OffenseType, SPELL } from "data/game";
import { memo } from "react";
import { spellDataUtils } from "utils/GameData/spellDataUtils";
import { OffenseCard } from "../../OffenseCard";
import { OffenseItem } from "features/zapquake_calc/objects/offenseItem";
import { BACKGROUND_TYPE } from "components/CalculatorComponents/GameDataCardContainer";

interface Props {
  spell: OffenseItem;
  updateOffense: (
    offenseID: string,
    type: OffenseType,
    isDonated?: boolean,
    currentLevelPos?: number,
    useOffense?: boolean,
    count?: number
  ) => void;
}

export const SpellCard = memo(function SpellCard({
  spell,
  updateOffense,
}: Props) {
  const isDonated = false;
  const updateCurrentLevelPos = (newCurrentLevelPos: number) => {
    updateOffense(spellID, type, isDonated, newCurrentLevelPos);
  };
  const updateUseOffense = (newUseOffense: boolean) => {
    updateOffense(spellID, type, isDonated, undefined, newUseOffense);
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
  const backgroundType =
    spellID === SPELL.EarthquakeSpell
      ? BACKGROUND_TYPE.Earthquake
      : BACKGROUND_TYPE.Normal;
  const minLevelPos = getSpellMinLevelPos();
  const maxLevelPos = getSpellMaxLevelPos();
  const currentLevelPos = spell.currentLevelPos;
  const currentLevel = getSpellLevel(currentLevelPos);
  const useOffense = spell.use;
  const damage = getSpellDamage(currentLevelPos);
  const damageType = getSpellDamageType();

  return (
    <OffenseCard
      id={id}
      name={name}
      type={type}
      imagePath={imagePath}
      backgroundType={backgroundType}
      minLevelPos={minLevelPos}
      maxLevelPos={maxLevelPos}
      currentLevelPos={currentLevelPos}
      currentLevel={currentLevel}
      useOffense={useOffense}
      updateCurrentLevelPos={updateCurrentLevelPos}
      updateUseOffense={updateUseOffense}
      damage={damage}
      damageType={damageType}
      isMaxed={isMaxLevelPos(currentLevelPos)}
    />
  );
});
