import { Button, Checkbox } from "components";
import { BS_COLOR } from "data/constants";
import { memo } from "react";

interface Props {
  useTroopDeathDamage: boolean;
  setUseTroopDeathDamage: React.Dispatch<React.SetStateAction<boolean>>;
  setAllTroopsToMax: () => void;
  setAllTroopsToMin: () => void;
  className?: string;
}

export const TroopSetting = memo(function TroopSetting({
  useTroopDeathDamage,
  setUseTroopDeathDamage,
  setAllTroopsToMax,
  setAllTroopsToMin,
  className = "",
}: Props) {
  function handleUseTroopDeathDamage(value: boolean) {
    setUseTroopDeathDamage(value);
  }

  return (
    <div className={className}>
      <div className="d-flex flex-wrap gap-2 my-2">
        <Button color={BS_COLOR.Gray} onClick={() => setAllTroopsToMax()}>
          Set All Troops to Max Level
        </Button>
        <Button color={BS_COLOR.Gray} onClick={() => setAllTroopsToMin()}>
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
