import { Checkbox } from "components/UI";
import { SettingContainerWrapper } from "components/Wrapper";
import { IMAGE_PATH } from "data/constants";
import { getUseHardModeStorageKey } from "features/AdvanceCalculator/utils/advanceCalcUtils";

interface Props {
  useHardMode: boolean;
  setUseHardMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export function HeroesSetting({ useHardMode, setUseHardMode }: Props) {
  function handleUseHardMode(value: boolean) {
    setUseHardMode(value);
  }
  const useHardModeID = getUseHardModeStorageKey();

  return (
    <SettingContainerWrapper>
      <div className="d-flex align-items-center gap-2">
        <Checkbox
          key={useHardModeID}
          id={useHardModeID}
          label={`Use Hard Mode`}
          isChecked={useHardMode}
          onChange={handleUseHardMode}
        />
        <img height={30} src={IMAGE_PATH.HardModeIcon} />
      </div>
    </SettingContainerWrapper>
  );
}
