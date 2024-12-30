import { Button } from "components/UI";
import { SettingContainerWrapper } from "components/Wrapper";
import { BS_COLOR } from "data/constants";
import { memo } from "react";

interface Props {
  setAllModifiersToMax: () => void;
  setAllModifiersToMin: () => void;
}

export const ModifierSetting = memo(function ModifierSetting({
  setAllModifiersToMax,
  setAllModifiersToMin,
}: Props) {
  return (
    <SettingContainerWrapper>
      <div className="d-flex flex-wrap gap-2 my-2">
        <Button color={BS_COLOR.Gray} onClick={() => setAllModifiersToMax()}>
          Set All Modifiers to Max Level
        </Button>
        <Button color={BS_COLOR.Gray} onClick={() => setAllModifiersToMin()}>
          Set All Modifiers to Min Level
        </Button>
      </div>
    </SettingContainerWrapper>
  );
});
