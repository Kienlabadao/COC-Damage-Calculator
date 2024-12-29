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
  modify: number;
}

export function ModifyStatDisplayer({ modify }: Props) {
  const textType = TEXT_TYPE.Raged;
  const label = `Modify: `;
  const modifyStr = formatNumber(
    modify,
    MIN_DISPLAYING_DECIMAL_PLACE,
    MAX_DISPLAYING_DECIMAL_PLACE
  );
  const content = `+${modifyStr}%`;

  return (
    <StatDisplayer label={label}>
      <ImageContainer imagePath={IMAGE_PATH.Attack} />
      <TextFormatter content={content} textType={textType} />
    </StatDisplayer>
  );
}
