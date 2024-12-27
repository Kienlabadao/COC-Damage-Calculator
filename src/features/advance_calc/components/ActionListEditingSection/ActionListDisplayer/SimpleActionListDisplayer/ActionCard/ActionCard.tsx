import {
  BACKGROUND_TYPE,
  BackgroundType,
  GameDataCardContainer,
  SIZE,
} from "components/CalculatorComponents/GameDataCardContainer";
import {
  OVERLAY_TYPE,
  OverlayType,
} from "components/CalculatorComponents/GameDataCardContainer/Overlay";
import { SPELL } from "data/game";
import { AdvanceActionItem } from "features/advance_calc/objects/advanceActionItem";
import { ACTION_TYPE, ActionType } from "objects/actionItem";
import { equipmentDataUtils } from "utils/GameData/equipmentDataUtils";
import {
  getGameDataImgPath,
  getGameDataLevel,
  isMaxGameDataLevelPos,
} from "utils/GameData/gameDataUtils";

interface Props {
  action: AdvanceActionItem;
  index: number;
}

function getBackgroundType(actionID: string, type: ActionType): BackgroundType {
  if (type === ACTION_TYPE.Spell && actionID === SPELL.EarthquakeSpell) {
    return BACKGROUND_TYPE.Earthquake;
  } else if (type === ACTION_TYPE.Equipment) {
    const { isEquipmentRarityEpic } = equipmentDataUtils(actionID);

    if (isEquipmentRarityEpic()) {
      return BACKGROUND_TYPE.Epic;
    }
  }

  return BACKGROUND_TYPE.Normal;
}

export function ActionCard({ action, index }: Props) {
  const actionID = action.actionID;
  const type = action.type;
  const currentLevelPos = action.currentLevelPos;

  const imgPath = getGameDataImgPath(actionID, type, currentLevelPos);
  const isMaxed = isMaxGameDataLevelPos(actionID, type, currentLevelPos);
  const currentLevel = getGameDataLevel(actionID, type, currentLevelPos);

  const bottomLeftOverlayType: OverlayType = isMaxed
    ? OVERLAY_TYPE.NumLevelMaxed
    : OVERLAY_TYPE.Num;

  return (
    <GameDataCardContainer
      imgPath={imgPath}
      backgroundType={getBackgroundType(actionID, type)}
      size={SIZE.Responsive}
      bottomLeftOverlay={{
        type: bottomLeftOverlayType,
        content: currentLevel.toString(),
      }}
      bottomRightOverlay={{
        type: OVERLAY_TYPE.NumOrder,
        content: index.toString(),
      }}
    />
  );
}
