import { Button, Checkbox, TEXT_TYPE, TextFormatter } from "components/UI";
import { SettingContainerWrapper } from "components/Wrapper";
import { BS_COLOR } from "data/constants";
import { getUseTroopDeathDamageStorageKey } from "features/AdvanceCalculator/utils/advanceCalcUtils";
import { memo } from "react";

interface Props {
  useTroopDeathDamage: boolean;
  setUseTroopDeathDamage: React.Dispatch<React.SetStateAction<boolean>>;
  setAllTroopsToMax: () => void;
  setAllTroopsToMin: () => void;
}

export const TroopSetting = memo(function TroopSetting({
  useTroopDeathDamage,
  setUseTroopDeathDamage,
  setAllTroopsToMax,
  setAllTroopsToMin,
}: Props) {
  function handleUseTroopDeathDamage(value: boolean) {
    setUseTroopDeathDamage(value);
  }
  const useTroopDeathDamageID = getUseTroopDeathDamageStorageKey();

  return (
    <SettingContainerWrapper>
      <div className="d-flex flex-wrap gap-2 my-2">
        <Button color={BS_COLOR.Gray} onClick={() => setAllTroopsToMax()}>
          Set All Troops to Max Level
        </Button>
        <Button color={BS_COLOR.Gray} onClick={() => setAllTroopsToMin()}>
          Set All Troops to Min Level
        </Button>
      </div>
      <div className="mt-2">
        <Checkbox
          key={useTroopDeathDamageID}
          id={useTroopDeathDamageID}
          label={`Use Troop's Death Damage`}
          isChecked={useTroopDeathDamage}
          onChange={handleUseTroopDeathDamage}
        />
      </div>
      <TextFormatter
        content={`*Note: Death damage always takes precedence over modifiers. If both are
        selected, death damage will be applied.`}
        textType={TEXT_TYPE.Warning}
      />
    </SettingContainerWrapper>
  );
});
