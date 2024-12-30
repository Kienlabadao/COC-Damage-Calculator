import { IMAGE_PATH } from "data/constants";
import { ImageContainer } from "./imageContainer";
import { StatDisplayer } from "./statDisplayer";
import { TEXT_TYPE, TextFormatter } from "components/UI";
import { formatNumber } from "utils/numberUtils";
import {
  MAX_DISPLAYING_DECIMAL_PLACE,
  MIN_DISPLAYING_DECIMAL_PLACE,
} from "config";

interface Props {
  extraDamage: number;
  useHardMode: boolean;
}

export function ExtraDamageStatDisplayer({ extraDamage, useHardMode }: Props) {
  const textType = useHardMode ? TEXT_TYPE.HardMode : TEXT_TYPE.Normal;
  const imgPath = IMAGE_PATH.Attack;
  const label = `Extra Damage: `;
  const extraDamageStr = formatNumber(
    extraDamage,
    MIN_DISPLAYING_DECIMAL_PLACE,
    MAX_DISPLAYING_DECIMAL_PLACE
  );
  const content = `${extraDamageStr}`;

  return (
    <StatDisplayer label={label}>
      <ImageContainer imagePath={imgPath} />
      <TextFormatter content={content} textType={textType} />
    </StatDisplayer>
  );
}
