import { SPELL } from "data/game";
import { memo } from "react";
import { spellDataUtils } from "utils/GameData/spellDataUtils";
import { BACKGROUND_TYPE } from "components/CalculatorComponents/GameDataCardContainer";
import { OffenseItem } from "features/advance_calc/objects/offenseItem";
import { SpellCard } from "./SpellCard";
import {
  AdvanceActionItem,
  createAdvanceActionItem,
} from "features/advance_calc/objects/advanceActionItem";
import { ACTION_TYPE } from "objects/actionItem";

interface Props {
  spellItem: OffenseItem;
  updateSpell: (offenseID: string, currentLevelPos?: number) => void;
  addAction: (actionItem: AdvanceActionItem, count: number) => void;
}

export const SpellCardWrapper = memo(function SpellCardWrapper({
  spellItem,
  updateSpell,
  addAction,
}: Props) {
  const updateCurrentLevelPos = (newCurrentLevelPos: number) => {
    updateSpell(spellID, newCurrentLevelPos);
  };
  const createAction = (count: number) => {
    addAction(
      createAdvanceActionItem(
        spellID,
        ACTION_TYPE.Spell,
        currentLevelPos,
        damage,
        damageType
      ),
      count
    );
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
      createAction={createAction}
      isMaxed={isMaxLevelPos(currentLevelPos)}
      backgroundType={backgroundType}
    />
  );
});
