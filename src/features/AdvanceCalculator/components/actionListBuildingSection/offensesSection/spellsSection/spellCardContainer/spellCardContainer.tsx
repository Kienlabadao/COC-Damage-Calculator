import { memo } from "react";
import { spellDataUtils } from "utils/GameData/spellDataUtils";
import { OffenseItem } from "features/AdvanceCalculator/objects/offenseItem";
import { SpellCard } from "./spellCard";
import {
  AdvanceActionItem,
  createAdvanceActionItem,
} from "features/AdvanceCalculator/objects/advanceActionItem";
import { ACTION_TYPE } from "objects/actionItem";

interface Props {
  spellItem: OffenseItem;
  updateSpell: (offenseID: string, currentLevelPos?: number) => void;
  addAction: (actionItem: AdvanceActionItem, count: number) => void;
}

export const SpellCardContainer = memo(function SpellCardContainer({
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

  const name = getSpellName();
  const imagePath = getSpellImage();
  const minLevelPos = getSpellMinLevelPos();
  const maxLevelPos = getSpellMaxLevelPos();
  const currentLevelPos = spellItem.currentLevelPos;
  const currentLevel = getSpellLevel(currentLevelPos);
  const isMaxed = isMaxLevelPos(currentLevelPos);
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
      damage={damage}
      damageType={damageType}
      createAction={createAction}
    />
  );
});
