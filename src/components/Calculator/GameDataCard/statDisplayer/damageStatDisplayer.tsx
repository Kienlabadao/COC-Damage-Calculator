import { IMAGE_PATH, ImagePath } from "data/constants";
import { ImageContainer } from "./imageContainer";
import { StatDisplayer } from "./statDisplayer";
import { TEXT_TYPE, TextFormatter, TextType } from "components/UI";
import { formatNumber } from "utils/numberUtils";
import {
  MAX_DISPLAYING_DECIMAL_PLACE,
  MIN_DISPLAYING_DECIMAL_PLACE,
} from "config";
import { DAMAGE_TYPE, DamageType } from "data/game";

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

function getImgPath(damageType: DamageType): ImagePath {
  switch (damageType) {
    case DAMAGE_TYPE.Direct:
      return IMAGE_PATH.Attack;
    case DAMAGE_TYPE.Earthquake:
      return IMAGE_PATH.EarthquakeDamage;
    default:
      throw new Error(
        `damageStatDisplayer.getImgPath ERROR: damageType (${damageType}) is not supported.`
      );
  }
}

function getContent(damageStr: string, damageType: DamageType): string {
  switch (damageType) {
    case DAMAGE_TYPE.Direct:
      return `${damageStr}`;
    case DAMAGE_TYPE.Earthquake:
      return `${damageStr}%`;
    default:
      throw new Error(
        `damageStatDisplayer.getContent ERROR: damageType (${damageType}) is not supported.`
      );
  }
}

interface Props {
  damage: number;
  damageType: DamageType;
  isModifierActive?: boolean;
  useHardMode?: boolean;
}

export function DamageStatDisplayer({
  damage,
  damageType,
  isModifierActive = false,
  useHardMode = false,
}: Props) {
  const textType = getTextType(isModifierActive, useHardMode);
  const imgPath = getImgPath(damageType);
  const label = `Damage: `;
  const content = getContent(
    formatNumber(
      damage,
      MIN_DISPLAYING_DECIMAL_PLACE,
      MAX_DISPLAYING_DECIMAL_PLACE
    ),
    damageType
  );

  return (
    <StatDisplayer label={label}>
      <ImageContainer imagePath={imgPath} />
      <TextFormatter content={content} textType={textType} />
    </StatDisplayer>
  );
}
