import { OffenseType } from "data/Game";
import { memo } from "react";
import { spellDataUtils } from "utils/GameData/spellDataUtils";
import {
  MAX_DONATED_SPELL_COUNT,
  MIN_DONATED_SPELL_COUNT,
} from "features/ZapquakeCalculator/config/config";
import { DonatedLightningSpellItem } from "features/ZapquakeCalculator/objects/donatedLightningSpellItem";
import { DonatedSpellCard } from "./donatedSpellCard/donatedSpellCard";

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

export const DonatedSpellCardContainer = memo(
  function DonatedSpellCardContainer({ spell, updateOffense }: Props) {
    function updateCurrentLevelPos(newCurrentLevelPos: number) {
      updateOffense(spellID, type, isDonated, newCurrentLevelPos);
    }
    function updateCount(newCount: number) {
      updateOffense(spellID, type, isDonated, undefined, undefined, newCount);
    }

    const spellID = spell.offenseID;
    const isDonated = true;
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

    const name = `${getSpellName()} (Donated)`;
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

    return (
      <DonatedSpellCard
        name={name}
        spellID={spellID}
        imagePath={imagePath}
        minLevelPos={minLevelPos}
        maxLevelPos={maxLevelPos}
        currentLevelPos={currentLevelPos}
        currentLevel={currentLevel}
        isMaxed={isMaxed}
        updateCurrentLevelPos={updateCurrentLevelPos}
        minCount={minCount}
        maxCount={maxCount}
        currentCount={currentCount}
        updateCount={updateCount}
        damage={damage}
        damageType={damageType}
      />
    );
  }
);
