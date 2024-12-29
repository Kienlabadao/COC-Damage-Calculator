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
  attackSpeedModify: number;
}

export function AttackSpeedModifyStatDisplayer({ attackSpeedModify }: Props) {
  const textType = TEXT_TYPE.Raged;
  const label = `Atk Speed: `;
  const attackSpeedModifyStr = formatNumber(
    attackSpeedModify,
    MIN_DISPLAYING_DECIMAL_PLACE,
    MAX_DISPLAYING_DECIMAL_PLACE
  );
  const content = `+${attackSpeedModifyStr}%`;

  return (
    <StatDisplayer label={label}>
      <ImageContainer imagePath={IMAGE_PATH.AttackSpeed} />
      <TextFormatter content={content} textType={textType} />
    </StatDisplayer>
  );
}
