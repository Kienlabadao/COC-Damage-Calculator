import { ObjectValues } from "utils/objectUtils";

export const TEXT_TYPE = {
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
export type TextType = ObjectValues<typeof TEXT_TYPE>;

function renderContentType(textType: TextType): string {
  switch (textType) {
    case TEXT_TYPE.Normal:
      return "";
    case TEXT_TYPE.Raged:
      return "text--raged";
    case TEXT_TYPE.HardMode:
      return "text--hard-mode";
    case TEXT_TYPE.LevelMaxed:
      return "text--level-maxed";
    case TEXT_TYPE.Destroyed:
      return "text--destroyed";
    case TEXT_TYPE.Immune:
      return "text--immune";
    case TEXT_TYPE.DamageReduced:
      return "text--damage-reduced";
    case TEXT_TYPE.HpFull:
      return "text--hp-full";
    case TEXT_TYPE.Warning:
      return "text--warning";
    default:
      throw new Error(
        `TextFormatter.renderContentType ERROR: textType (${textType}) is not supported.`
      );
  }
}

interface Props {
  content: string;
  textType?: TextType;
}

export function TextFormatter({ content, textType = TEXT_TYPE.Normal }: Props) {
  return (
    <div className={`text ${renderContentType(textType)} fw-bold`}>
      {content}
    </div>
  );
}
