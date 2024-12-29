import {
  MAX_DISPLAYING_DECIMAL_PLACE,
  MIN_DISPLAYING_DECIMAL_PLACE,
} from "config";
import { formatNumber } from "utils/numberUtils";

function getHPTextClass(currentHP: number, maxHP: number) {
  if (currentHP <= 0) {
    return "text text--destroyed";
  } else if (currentHP === maxHP) {
    return "text text--hp-full";
  } else {
    return "text";
  }
}

interface Props {
  currentHP: number;
  maxHP: number;
}

export function HPStatCell({ currentHP, maxHP }: Props) {
  return (
    <div className="card-custom card-custom__stat">
      <span>❤️</span>
      <span className={getHPTextClass(currentHP, maxHP)}>
        {formatNumber(
          currentHP,
          MIN_DISPLAYING_DECIMAL_PLACE,
          MAX_DISPLAYING_DECIMAL_PLACE
        )}
      </span>
    </div>
  );
}
