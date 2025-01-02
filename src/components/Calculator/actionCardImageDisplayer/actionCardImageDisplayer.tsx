import {
  BACKGROUND_TYPE,
  BackgroundType,
  convertEquipmentRarity,
  GameDataImageDisplayer,
  LevelOverlay,
  OrderOverlay,
  OVERLAY_POSITION,
  convertSpellID,
  Size,
} from "components/Calculator";
import { GameDataType } from "data/Game";
import { ACTION_TYPE, ActionType } from "objects/actionItem";
import { equipmentDataUtils } from "utils/GameData/equipmentDataUtils";
import {
  getGameDataImgPath,
  getGameDataLevel,
  isMaxGameDataLevelPos,
} from "utils/GameData/gameDataUtils";

function getBackgroundType(actionID: string, type: ActionType): BackgroundType {
  if (type === ACTION_TYPE.Spell) {
    return convertSpellID(actionID);
  } else if (type === ACTION_TYPE.Equipment) {
    const { getEquipmentRarity } = equipmentDataUtils(actionID);

    return convertEquipmentRarity(getEquipmentRarity());
  }

  return BACKGROUND_TYPE.Normal;
}

interface Props {
  size: Size;
  gameDataID: string;
  type: GameDataType;
  currentLevelPos: number;
  order?: number;
}

export function GameDataImageDisplayerContainer({
  size,
  gameDataID,
  type,
  currentLevelPos,
  order,
}: Props) {
  const imgPath = getGameDataImgPath(gameDataID, type, currentLevelPos);
  const isMaxed = isMaxGameDataLevelPos(gameDataID, type, currentLevelPos);
  const currentLevel = getGameDataLevel(gameDataID, type, currentLevelPos);

  const backgroundType = getBackgroundType(gameDataID, type);

  return (
    <GameDataImageDisplayer
      imgPath={imgPath}
      backgroundType={backgroundType}
      size={size}
    >
      <LevelOverlay
        position={OVERLAY_POSITION.BottomLeft}
        level={currentLevel}
        isMaxed={isMaxed}
      />
      {order && (
        <OrderOverlay position={OVERLAY_POSITION.BottomRight} order={order} />
      )}
    </GameDataImageDisplayer>
  );
}
