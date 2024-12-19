import { Checkbox } from "components";
import { OffenseType } from "data/game";
import { DonatedLightningSpellItem } from "features/zapquake_calc/objects/donatedLightningSpellItem";
import { useCallback } from "react";
import { spellDataUtils } from "utils/GameData/spellDataUtils";

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
  className?: string;
}

export function UseDonatedSpellCheckbox({
  spell,
  updateOffense,
  className = "",
}: Props) {
  const id = spell.id;
  const spellID = spell.offenseID;
  const { getSpellName } = spellDataUtils(spellID);

  const updateUseOffense = useCallback((newUseOffense: boolean) => {
    updateOffense(spellID, type, isDonated, undefined, newUseOffense);
  }, []);

  const name = getSpellName();
  const type = spell.type;
  const isDonated = true;
  const useOffense = spell.use;

  return (
    <Checkbox
      key={`use_${id}`}
      id={`use_${id}`}
      label={`Use donated ${name.toLowerCase()}`}
      isChecked={useOffense}
      onInput={(isChecked: boolean) => updateUseOffense(isChecked)}
      className={className}
    />
  );
}
