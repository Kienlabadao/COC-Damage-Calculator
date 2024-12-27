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
import { OFFENSE_TYPE } from "data/game";
import { BaseOffenseItem } from "objects/baseOffenseItem";
import { equipmentDataUtils } from "utils/GameData/equipmentDataUtils";

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
    const overlayType: OverlayType = isMaxed
      ? OVERLAY_TYPE.NumLevelMaxed
      : OVERLAY_TYPE.Num;

    return (
      <GameDataCardContainer
        key={id}
        imgPath={imgPath}
        backgroundType={backgroundType}
        size={SIZE.Small}
        bottomLeftOverlay={{
          type: overlayType,
          content: currentLevel.toString(),
        }}
      />
    );
  });
}

interface Props {
  equipmentItemList: BaseOffenseItem[];
  isImmune?: (offenseID: string) => boolean;
}

export function UsedEquipmentDisplayer({ equipmentItemList, isImmune }: Props) {
  return (
    <div className="equipment-div">
      <h5>Equipment used:</h5>
      <div className="equipment-list d-flex justify-content-center align-items-center flex-wrap gap-2">
        {createEquipmentRow(equipmentItemList, isImmune)}
      </div>
    </div>
  );
}
