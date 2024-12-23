import { IMAGE_PATH } from "data/constants";
import { ObjectValues } from "utils/objectUtils";
import {
  CONTENT_TYPE,
  ContentContainer,
  ContentType,
} from "./ContentContainer";
import { ImageContainer } from "./ImageContainer";
import { DAMAGE_TYPE, DamageType } from "data/game";

export const DISPLAYER_TYPE = {
  Damage: "damage",
  EarthquakeDamage: "earthquakeDamage",
  Repair: "repair",
  AtackSpeed: "attackSpeed",
  Modify: "modify",
} as const;
export type DisplayerType = ObjectValues<typeof DISPLAYER_TYPE>;

export function convertToContentType(
  isModifierActive: boolean,
  useHardMode: boolean
) {
  if (useHardMode) {
    return CONTENT_TYPE.HardMode;
  } else {
    return isModifierActive ? CONTENT_TYPE.Raged : CONTENT_TYPE.Normal;
  }
}

export function convertToDisplayerType(damageType: DamageType): DisplayerType {
  switch (damageType) {
    case DAMAGE_TYPE.Direct:
      return DISPLAYER_TYPE.Damage;
    case DAMAGE_TYPE.Earthquake:
      return DISPLAYER_TYPE.EarthquakeDamage;
    default:
      throw new Error(
        `OffenseCard.convertToDisplayerType ERROR: DamageType (${damageType}) not supported.`
      );
  }
}

function createContent(
  displayerType: string,
  content: string,
  contentType: ContentType
) {
  switch (displayerType) {
    case DISPLAYER_TYPE.Damage:
      return (
        <>
          <ImageContainer imagePath={IMAGE_PATH.Attack} />
          <ContentContainer content={content} contentType={contentType} />
        </>
      );
    case DISPLAYER_TYPE.EarthquakeDamage:
      return (
        <>
          <ImageContainer imagePath={IMAGE_PATH.EarthquakeDamage} />
          <ContentContainer content={`${content}%`} contentType={contentType} />
        </>
      );
    case DISPLAYER_TYPE.Repair:
      return (
        <>
          <ImageContainer imagePath={IMAGE_PATH.Repair} />
          <ContentContainer content={content} contentType={contentType} />
        </>
      );
    case DISPLAYER_TYPE.AtackSpeed:
      return (
        <>
          <ImageContainer imagePath={IMAGE_PATH.AttackSpeed} />
          <ContentContainer content={`${content}s`} contentType={contentType} />
        </>
      );
    case DISPLAYER_TYPE.Modify:
      return (
        <>
          <ImageContainer imagePath={IMAGE_PATH.Attack} />
          <ContentContainer
            content={`+${content}%`}
            contentType={contentType}
          />
        </>
      );
    default:
      throw new Error(
        `StatDisplayer.createContent ERROR: DisplayerType (${displayerType}) not supported.`
      );
  }
}

interface Props {
  displayerType: DisplayerType;
  label?: string;
  content: string;
  isModifierActive?: boolean;
  useHardMode?: boolean;
}

export function StatDisplayer({
  displayerType,
  label,
  content,
  isModifierActive = false,
  useHardMode = false,
}: Props) {
  return (
    <div className="d-flex justify-content-center align-items-center column-gap-1">
      {label && <div className="fw-bold">{label}: </div>}
      {createContent(
        displayerType,
        content,
        convertToContentType(isModifierActive, useHardMode)
      )}
    </div>
  );
}
