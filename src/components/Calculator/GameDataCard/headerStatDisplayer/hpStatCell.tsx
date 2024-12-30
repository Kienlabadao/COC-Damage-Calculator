import { TEXT_TYPE, TextFormatter, TextType } from "components/UI";
import {
  MAX_DISPLAYING_DECIMAL_PLACE,
  MIN_DISPLAYING_DECIMAL_PLACE,
} from "config";
import { formatNumber } from "utils/numberUtils";

function getTextType(currentHP: number, maxHP: number): TextType {
  if (currentHP <= 0) {
    return TEXT_TYPE.Destroyed;
  } else if (currentHP === maxHP) {
    return TEXT_TYPE.HpFull;
  } else {
    return TEXT_TYPE.Normal;
  }
}

interface Props {
  currentHP: number;
  maxHP: number;
}

export function HPStatCell({ currentHP, maxHP }: Props) {
  const content = formatNumber(
    currentHP,
    MIN_DISPLAYING_DECIMAL_PLACE,
    MAX_DISPLAYING_DECIMAL_PLACE
  );
  const textType = getTextType(currentHP, maxHP);

  return (
    <div className="card-custom card-custom__stat">
      <span>❤️</span>
      <TextFormatter content={content} textType={textType} />
    </div>
  );
}
