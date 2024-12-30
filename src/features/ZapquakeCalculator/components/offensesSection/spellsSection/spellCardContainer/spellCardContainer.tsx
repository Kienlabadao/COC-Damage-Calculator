import { OffenseType } from "data/Game";
import { memo } from "react";
import { spellDataUtils } from "utils/GameData/spellDataUtils";
import { OffenseItem } from "features/ZapquakeCalculator/objects/offenseItem";
import { SpellCard } from "./spellCard";

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

export const SpellCardContainer = memo(function SpellCardContainer({
  spell,
  updateOffense,
}: Props) {
  const updateCurrentLevelPos = (newCurrentLevelPos: number) => {
    updateOffense(spellID, type, isDonated, newCurrentLevelPos);
  };
  const updateUseSpell = (newUseOffense: boolean) => {
    updateOffense(spellID, type, isDonated, undefined, newUseOffense);
  };

  const spellID = spell.offenseID;
  const isDonated = false;
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
  const type = spell.type;
  const imagePath = getSpellImage();
  const minLevelPos = getSpellMinLevelPos();
  const maxLevelPos = getSpellMaxLevelPos();
  const currentLevelPos = spell.currentLevelPos;
  const currentLevel = getSpellLevel(currentLevelPos);
  const isMaxed = isMaxLevelPos(currentLevelPos);
  const useOffense = spell.use;
  const damage = getSpellDamage(currentLevelPos);
  const damageType = getSpellDamageType();

  return (
    <SpellCard
      spellID={spellID}
      name={name}
      imagePath={imagePath}
      minLevelPos={minLevelPos}
      maxLevelPos={maxLevelPos}
      currentLevelPos={currentLevelPos}
      currentLevel={currentLevel}
      isMaxed={isMaxed}
      updateCurrentLevelPos={updateCurrentLevelPos}
      useSpell={useOffense}
      updateUseSpell={updateUseSpell}
      damage={damage}
      damageType={damageType}
    />
  );
});
