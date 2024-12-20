import { OFFENSE_TYPE, OffenseType } from "data/game";
import { Button, Checkbox } from "components";
import { BS_COLOR } from "data/constants";
import { memo } from "react";

interface Props {
  useTroopDeathDamage: boolean;
  setUseTroopDeathDamage: React.Dispatch<React.SetStateAction<boolean>>;
  setAllOffensesToMax: (offenseTypeFilterList: Set<OffenseType>) => void;
  setAllOffensesToMin: (offenseTypeFilterList: Set<OffenseType>) => void;
  className?: string;
}

export const TroopSetting = memo(function TroopSetting({
  useTroopDeathDamage,
  setUseTroopDeathDamage,
  setAllOffensesToMax,
  setAllOffensesToMin,
  className = "",
}: Props) {
  function handleUseTroopDeathDamage(value: boolean) {
    setUseTroopDeathDamage(value);
  }

  return (
    <div className={className}>
      <div className="d-flex flex-wrap gap-2 my-2">
        <Button
          color={BS_COLOR.Gray}
          onClick={() => setAllOffensesToMax(new Set([OFFENSE_TYPE.Troop]))}
        >
          Set All Troops to Max Level
        </Button>
        <Button
          color={BS_COLOR.Gray}
          onClick={() => setAllOffensesToMin(new Set([OFFENSE_TYPE.Troop]))}
        >
          Set All Troops to Min Level
        </Button>
      </div>
      <div>
        <Checkbox
          key={`use_troop_death_damage`}
          id={`use_troop_death_damage`}
          label={`Use Troop's Death Damage`}
          isChecked={useTroopDeathDamage}
          onChange={handleUseTroopDeathDamage}
          className="mt-2"
        />
      </div>
      <div className="text text--warning">
        *Note: Death damage always takes precedence over modifiers. If both are
        selected, death damage will be applied.
      </div>
    </div>
  );
});
