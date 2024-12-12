import { SPELL } from "data/game";
import { BACKGROUND_TYPE } from "components/CalculatorComponents/OffenseCard/OffenseCardImage";
import { OffenseItem } from "features/zapquake_calc/utils/offenseItemUtils";
import { memo, useCallback } from "react";
import { spellDataUtils } from "utils/GameData/spellDataUtils";
import { OffenseCard } from "../../OffenseCard";

interface Props {
  spell: OffenseItem;
  isDonated: boolean;
  updateOffenseItem: (
    offenseID: string,
    isDonated?: boolean,
    currentLevelPos?: number,
    useOffense?: boolean,
    count?: number
  ) => void;
}

export const SpellCard = memo(function SpellCard({
  spell,
  isDonated = false,
  updateOffenseItem,
}: Props) {
  const updateCurrentLevelPos = useCallback((newCurrentLevelPos: number) => {
    updateOffenseItem(spellID, isDonated, newCurrentLevelPos);
  }, []);
  const updateUseOffense = useCallback((newUseOffense: boolean) => {
    updateOffenseItem(spellID, isDonated, undefined, newUseOffense);
  }, []);
  // const updateCount = useCallback((newCount: number) => {
  //   updateOffenseItem(spellID, isDonated, undefined, undefined, newCount);
  // }, []);

  const spellID = spell.offenseID;
  const {
    getSpellName,
    getSpellImage,
    getSpellMinLevelPos,
    getSpellMaxLevelPos,
    getSpellLevel,
    getSpellDamage,
    getSpellDamageType,
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
      isDonated={isDonated}
    />
  );
});
