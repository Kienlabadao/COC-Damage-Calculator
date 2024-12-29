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
  attackSpeed: number;
  isModifierActive?: boolean;
}

export function AttackSpeedStatDisplayer({
  attackSpeed,
  isModifierActive = false,
}: Props) {
  const textType = getTextType(isModifierActive);
  const label = `Attack Speed: `;
  const attackSpeedStr = formatNumber(
    attackSpeed,
    MIN_DISPLAYING_DECIMAL_PLACE,
    MAX_DISPLAYING_DECIMAL_PLACE
  );
  const content = `${attackSpeedStr}s`;

  return (
    <StatDisplayer label={label}>
      <ImageContainer imagePath={IMAGE_PATH.AttackSpeed} />
      <TextFormatter content={content} textType={textType} />
    </StatDisplayer>
  );
}
