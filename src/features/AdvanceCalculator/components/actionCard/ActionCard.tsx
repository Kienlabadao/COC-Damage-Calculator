import {
  BACKGROUND_TYPE,
  BackgroundType,
  convertEquipmentRarity,
  GameDataImageDisplayer,
  LevelOverlay,
  OrderOverlay,
  OVERLAY_POSITION,
  SIZE,
} from "components/Calculator";
import { convertSpellID } from "components/Calculator/GameDataCard/gameDataImageDisplayer/Helper/convertSpellID";
import { AdvanceActionItem } from "features/AdvanceCalculator/objects/advanceActionItem";
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
  if (type === ACTION_TYPE.Spell) {
    return convertSpellID(actionID);
  } else if (type === ACTION_TYPE.Equipment) {
    const { getEquipmentRarity } = equipmentDataUtils(actionID);

    return convertEquipmentRarity(getEquipmentRarity());
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

  const backgroundType = getBackgroundType(actionID, type);

  return (
    <GameDataImageDisplayer
      imgPath={imgPath}
      backgroundType={backgroundType}
      size={SIZE.Responsive}
    >
      <LevelOverlay
        position={OVERLAY_POSITION.BottomLeft}
        level={currentLevel}
        isMaxed={isMaxed}
      />
      <OrderOverlay position={OVERLAY_POSITION.BottomRight} order={index} />
    </GameDataImageDisplayer>
  );
}
