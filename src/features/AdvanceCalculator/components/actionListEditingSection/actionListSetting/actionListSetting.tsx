import { Button, Checkbox } from "components/UI";
import { BS_COLOR } from "data/constants";
import { getShowDetailActionListStorageKey } from "features/AdvanceCalculator/utils/advanceCalcUtils";
import { memo } from "react";

interface Props {
  showDetailActionList: boolean;
  setShowDetailActionList: React.Dispatch<React.SetStateAction<boolean>>;
  removeAction: (count: number) => void;
  removeAllAction: () => void;
  className?: string;
}

export const ActionListSetting = memo(function ActionListSetting({
  showDetailActionList,
  setShowDetailActionList,
  removeAction,
  removeAllAction,
  className = "",
}: Props) {
  function handleShowDetailActionList(value: boolean) {
    setShowDetailActionList(value);
  }

  const id = getShowDetailActionListStorageKey();

  return (
    <div className={className}>
      <div>
        <Checkbox
          key={id}
          id={id}
          label={`Show Detail`}
          isChecked={showDetailActionList}
          onChange={handleShowDetailActionList}
          className="mt-2"
        />
      </div>
      <div className="d-flex flex-wrap gap-2 mt-3">
        <Button color={BS_COLOR.Red} onClick={() => removeAction(1)}>
          Remove 1
        </Button>
        <Button color={BS_COLOR.Red} onClick={() => removeAction(5)}>
          Remove 5
        </Button>
        <Button color={BS_COLOR.Red} onClick={() => removeAllAction()}>
          Remove All
        </Button>
      </div>
    </div>
  );
});
