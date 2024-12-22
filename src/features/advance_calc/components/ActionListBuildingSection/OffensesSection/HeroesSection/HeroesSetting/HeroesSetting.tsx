import { Checkbox } from "components";

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
      <div>
        <Checkbox
          key={`use_hard_mode`}
          id={`use_hard_mode`}
          label={`Use Hard Mode`}
          isChecked={useHardMode}
          onChange={handleUseHardMode}
        />
      </div>
    </div>
  );
}
