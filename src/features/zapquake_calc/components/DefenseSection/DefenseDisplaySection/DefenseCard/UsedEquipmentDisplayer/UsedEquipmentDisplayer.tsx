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
    let backgroundType: BackgroundType = BACKGROUND_TYPE.Normal;
    if (isImmune(equipmentID)) {
      backgroundType = BACKGROUND_TYPE.Immune;
    } else if (isEquipmentRarityEpic()) {
      backgroundType = BACKGROUND_TYPE.Epic;
    }
    let headerOverlayType: OverlayType = OVERLAY_TYPE.Num;
    if (isMaxLevelPos(currentLevelPos)) {
      headerOverlayType = OVERLAY_TYPE.NumLevelMaxed;
    }

    return (
      <GameDataCardContainer
        key={id}
        backgroundType={backgroundType}
        imgPath={imgPath}
        size={SIZE.Tall}
        headerContent={getEquipmentLevel(currentLevelPos).toString()}
        headerOverlayType={headerOverlayType}
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
