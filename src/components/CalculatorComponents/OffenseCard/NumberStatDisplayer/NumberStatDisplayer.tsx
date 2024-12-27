import { formatNumber } from "utils/numberUtils";
import { DisplayerType, StatDisplayer } from "../StatDisplayer";
import {
  MAX_DISPLAYING_DECIMAL_PLACE,
  MIN_DISPLAYING_DECIMAL_PLACE,
} from "config";

interface Props {
  displayerType: DisplayerType;
  label?: string;
  content: number;
  isModifierActive?: boolean;
  useHardMode?: boolean;
}

export function NumberStatDisplayer({
  displayerType,
  label,
  content,
  isModifierActive = false,
  useHardMode = false,
}: Props) {
  return (
    <StatDisplayer
      displayerType={displayerType}
      label={label}
      content={formatNumber(
        content,
        MIN_DISPLAYING_DECIMAL_PLACE,
        MAX_DISPLAYING_DECIMAL_PLACE
      )}
      isModifierActive={isModifierActive}
      useHardMode={useHardMode}
    />
  );
}
