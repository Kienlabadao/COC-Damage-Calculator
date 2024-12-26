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
import { OffenseItem } from "features/zapquake_calc/objects/offenseItem";
import { equipmentDataUtils } from "utils/GameData/equipmentDataUtils";

function createEquipmentRow(
  equipmentItemList: OffenseItem[],
  isImmune: (offenseID: string) => boolean
): JSX.Element[] {
  return equipmentItemList.map((equipmentItem) => {
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
    if (isImmune(equipmentID)) {
      backgroundType = BACKGROUND_TYPE.Immune;
    } else if (isEquipmentRarityEpic()) {
      backgroundType = BACKGROUND_TYPE.Epic;
    }
    const headerOverlayType: OverlayType = isMaxed
      ? OVERLAY_TYPE.NumLevelMaxed
      : OVERLAY_TYPE.Num;

    return (
      <GameDataCardContainer
        key={id}
        imgPath={imgPath}
        backgroundType={backgroundType}
        size={SIZE.Tall}
        headerOverlay={{
          type: headerOverlayType,
          content: currentLevel.toString(),
        }}
      />
    );
  });
}

interface Props {
  equipmentItemList: OffenseItem[];
  isImmune: (offenseID: string) => boolean;
}

export function UsedEquipmentDisplayer({ equipmentItemList, isImmune }: Props) {
  return (
    <div className="equipment-div">
      <h5>Heroes Equipment used:</h5>
      <div className="equipment-list d-flex justify-content-center align-items-center flex-wrap gap-2">
        {createEquipmentRow(equipmentItemList, isImmune)}
      </div>
    </div>
  );
}
