import { Button } from "components/UI";
import { SettingContainerWrapper } from "components/Wrapper";
import { BS_COLOR } from "data/constants";
import { memo } from "react";

interface Props {
  setAllSpellsToMax: () => void;
  setAllSpellsToMin: () => void;
}

export const SpellSetting = memo(function SpellSetting({
  setAllSpellsToMax,
  setAllSpellsToMin,
}: Props) {
  return (
    <SettingContainerWrapper>
      <div className="d-flex flex-wrap gap-2 my-2">
        <Button color={BS_COLOR.Gray} onClick={() => setAllSpellsToMax()}>
          Set All Spells to Max Level
        </Button>
        <Button color={BS_COLOR.Gray} onClick={() => setAllSpellsToMin()}>
          Set All Spells to Min Level
        </Button>
      </div>
    </SettingContainerWrapper>
  );
});
