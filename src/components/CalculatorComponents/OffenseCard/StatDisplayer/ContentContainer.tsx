import { ObjectValues } from "utils/objectUtils";

export const CONTENT_TYPE = {
  Normal: "normal",
  Raged: "raged",
  HardMode: "hardMode",
  LevelMaxed: "levelMaxed",
  Destroyed: "destroyed",
  Immune: "immune",
  DamageReduced: "damageReduced",
  HpFull: "hpFull",
  Warning: "warning",
} as const;
export type ContentType = ObjectValues<typeof CONTENT_TYPE>;

export function renderContentType(contentType: ContentType): string {
  switch (contentType) {
    case CONTENT_TYPE.Normal:
      return " text";
    case CONTENT_TYPE.Raged:
      return " text text--raged";
    case CONTENT_TYPE.HardMode:
      return " text text--hard-mode";
    case CONTENT_TYPE.LevelMaxed:
      return " text text--level-maxed";
    case CONTENT_TYPE.Destroyed:
      return " text text--destroyed";
    case CONTENT_TYPE.Immune:
      return " text text--immune";
    case CONTENT_TYPE.DamageReduced:
      return " text text--damage-reduced";
    case CONTENT_TYPE.HpFull:
      return " text text--hp-full";
    case CONTENT_TYPE.Warning:
      return " text text--warning";
    default:
      throw new Error(
        `ContentContainer.renderContentType ERROR: contentType (${contentType}) is not supported.`
      );
  }
}

interface Props {
  content: string;
  contentType?: ContentType;
}

export function ContentContainer({
  content,
  contentType = CONTENT_TYPE.Normal,
}: Props) {
  return (
    <div className={`fw-bold${renderContentType(contentType)}`}>{content}</div>
  );
}
