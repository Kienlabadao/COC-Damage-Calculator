import { Button } from "components/UI";
import { SettingContainerWrapper } from "components/Wrapper";
import { BS_COLOR } from "data/constants";
import { memo } from "react";

interface Props {
  setAllRepairsToMax: () => void;
  setAllRepairsToMin: () => void;
}

export const RepairSetting = memo(function RepairSetting({
  setAllRepairsToMax,
  setAllRepairsToMin,
}: Props) {
  return (
    <SettingContainerWrapper>
      <div className="d-flex flex-wrap gap-2 my-2">
        <Button color={BS_COLOR.Gray} onClick={() => setAllRepairsToMax()}>
          Set All Repairs to Max Level
        </Button>
        <Button color={BS_COLOR.Gray} onClick={() => setAllRepairsToMin()}>
          Set All Repairs to Min Level
        </Button>
      </div>
    </SettingContainerWrapper>
  );
});
