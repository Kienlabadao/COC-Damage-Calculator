import { IMAGE_PATH } from "data/constants";
import { ImageContainer } from "./imageContainer";
import { StatDisplayer } from "./statDisplayer";
import { TEXT_TYPE, TextFormatter, TextType } from "components/UI";
import { formatNumber } from "utils/numberUtils";
import {
  MAX_DISPLAYING_DECIMAL_PLACE,
  MIN_DISPLAYING_DECIMAL_PLACE,
} from "config";

function getTextType(isModifierActive: boolean): TextType {
  return isModifierActive ? TEXT_TYPE.Raged : TEXT_TYPE.Normal;
}

interface Props {
  repair: number;
  isModifierActive?: boolean;
}

export function RepairStatDisplayer({
  repair,
  isModifierActive = false,
}: Props) {
  const textType = getTextType(isModifierActive);
  const label = `Repair: `;
  const repairStr = formatNumber(
    repair,
    MIN_DISPLAYING_DECIMAL_PLACE,
    MAX_DISPLAYING_DECIMAL_PLACE
  );
  const content = `${repairStr}`;

  return (
    <StatDisplayer label={label}>
      <ImageContainer imagePath={IMAGE_PATH.Repair} />
      <TextFormatter content={content} textType={textType} />
    </StatDisplayer>
  );
}
