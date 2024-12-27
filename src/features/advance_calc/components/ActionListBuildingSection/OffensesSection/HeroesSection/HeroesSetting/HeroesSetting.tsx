import { Checkbox } from "components";
import { IMAGE_PATH } from "data/constants";

interface Props {
  useHardMode: boolean;
  setUseHardMode: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

export function HeroesSetting({
  useHardMode,
  setUseHardMode,
  className = "",
}: Props) {
  function handleUseHardMode(value: boolean) {
    setUseHardMode(value);
  }

  return (
    <div className={className}>
      <div className="d-flex align-items-center gap-2">
        <Checkbox
          key={`use_hard_mode`}
          id={`use_hard_mode`}
          label={`Use Hard Mode`}
          isChecked={useHardMode}
          onChange={handleUseHardMode}
        />
        <img height={30} src={IMAGE_PATH.HardModeIcon} />
      </div>
    </div>
  );
}
