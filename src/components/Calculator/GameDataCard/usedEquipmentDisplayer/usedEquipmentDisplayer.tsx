import { OFFENSE_TYPE } from "data/game";
import { BaseOffenseItem } from "objects/baseOffenseItem";
import { equipmentDataUtils } from "utils/GameData/equipmentDataUtils";
import {
  BACKGROUND_TYPE,
  BackgroundType,
  GameDataImageDisplayer,
  SIZE,
} from "../gameDataImageDisplayer";
import {
  LevelOverlay,
  OVERLAY_POSITION,
} from "../gameDataImageDisplayer/Overlay";

function createEquipmentRow(
  equipmentItemList: BaseOffenseItem[],
  isImmune?: (offenseID: string) => boolean
): JSX.Element[] {
  return equipmentItemList.map((equipmentItem) => {
    if (equipmentItem.type !== OFFENSE_TYPE.Equipment) {
      throw new Error(
        `UsedEquipmentDisplayer.createEquipmentRow ERROR: equipmentItem must be equipment type. equipmentItem: ${equipmentItem}`
      );
    }

    const id = equipmentItem.id;
    const equipmentID = equipmentItem.offenseID;
    const currentLevelPos = equipmentItem.currentLevelPos;

    const {
      getEquipmentImage,
      isMaxLevelPos,
      getEquipmentLevel,
      isEquipmentRarityEpic,
    } = equipmentDataUtils(equipmentID);

    const imgPath = getEquipmentImage();
    const currentLevel = getEquipmentLevel(currentLevelPos);
    const isMaxed = isMaxLevelPos(currentLevelPos);

    let backgroundType: BackgroundType = BACKGROUND_TYPE.Normal;
    if (isImmune && isImmune(equipmentID)) {
      backgroundType = BACKGROUND_TYPE.Immune;
    } else if (isEquipmentRarityEpic()) {
      backgroundType = BACKGROUND_TYPE.Epic;
    }

    return (
      <GameDataImageDisplayer
        key={id}
        imgPath={imgPath}
        backgroundType={backgroundType}
        size={SIZE.Small}
      >
        <LevelOverlay
          position={OVERLAY_POSITION.Header}
          level={currentLevel}
          isMaxed={isMaxed}
        />
      </GameDataImageDisplayer>
    );
  });
}

interface Props {
  equipmentItemList: BaseOffenseItem[];
  isImmune?: (offenseID: string) => boolean;
}

export function UsedEquipmentDisplayer({ equipmentItemList, isImmune }: Props) {
  return (
    <div>
      <h5>Equipment used:</h5>
      <div className="d-flex justify-content-center align-items-center flex-wrap gap-2">
        {createEquipmentRow(equipmentItemList, isImmune)}
      </div>
    </div>
  );
}
