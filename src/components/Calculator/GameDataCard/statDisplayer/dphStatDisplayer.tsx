import { ImageContainer } from "./imageContainer";
import { StatDisplayer } from "./statDisplayer";
import { TEXT_TYPE, TextFormatter, TextType } from "components/UI";
import { formatNumber } from "utils/numberUtils";
import {
  MAX_DISPLAYING_DECIMAL_PLACE,
  MIN_DISPLAYING_DECIMAL_PLACE,
} from "config";
import { IMAGE_PATH } from "data/constants";

function getTextType(
  isModifierActive: boolean,
  useHardMode: boolean
): TextType {
  if (isModifierActive) {
    return TEXT_TYPE.Raged;
  } else {
    return useHardMode ? TEXT_TYPE.HardMode : TEXT_TYPE.Normal;
  }
}

interface Props {
  dph: number;
  isBoost: boolean;
  isModifierActive: boolean;
  useHardMode: boolean;
}

export function DPHStatDisplayer({
  dph,
  isBoost,
  isModifierActive,
  useHardMode,
}: Props) {
  const textType = getTextType(isModifierActive, useHardMode);
  const imgPath = IMAGE_PATH.Attack;
  const label = isBoost ? `DPH Boost: ` : `DPH: `;
  const dphStr = formatNumber(
    dph,
    MIN_DISPLAYING_DECIMAL_PLACE,
    MAX_DISPLAYING_DECIMAL_PLACE
  );
  const content = `${dphStr}`;

  return (
    <StatDisplayer label={label}>
      <ImageContainer imagePath={imgPath} />
      <TextFormatter content={content} textType={textType} />
    </StatDisplayer>
  );
}
