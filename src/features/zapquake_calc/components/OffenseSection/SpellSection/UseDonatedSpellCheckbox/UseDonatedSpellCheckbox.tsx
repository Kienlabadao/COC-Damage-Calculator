import { Checkbox } from "components";
import { DonatedLightningSpellItem } from "features/zapquake_calc/utils/donatedLightningSpellItemUtils";
import { useCallback } from "react";
import { spellDataUtils } from "utils/GameData/spellDataUtils";

interface Props {
  spell: DonatedLightningSpellItem;
  updateOffenseItem: (
    offenseID: string,
    isDonated?: boolean,
    currentLevelPos?: number,
    useOffense?: boolean,
    count?: number
  ) => void;
}

export function UseDonatedSpellCheckbox({ spell, updateOffenseItem }: Props) {
  const id = spell.id;
  const spellID = spell.offenseID;
  const { getSpellName } = spellDataUtils(spellID);

  const updateUseOffense = useCallback((newUseOffense: boolean) => {
    updateOffenseItem(spellID, isDonated, undefined, newUseOffense);
  }, []);

  const name = getSpellName();
  const isDonated = true;
  const useOffense = spell.use;

  return (
    <Checkbox
      key={`use_${id}`}
      id={`use_${id}`}
      label={`Use donated ${name.toLowerCase()}`}
      isChecked={useOffense}
      onInput={(isChecked: boolean) => updateUseOffense(isChecked)}
    />
  );
}
