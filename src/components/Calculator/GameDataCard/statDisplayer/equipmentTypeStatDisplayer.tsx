import { StatDisplayer } from "./statDisplayer";
import { TEXT_TYPE, TextFormatter } from "components/UI";
import { EquipmentType } from "data/Game";
import { capitalizeFirstLetter } from "utils/stringUtils";

interface Props {
  equipmentTypeList: EquipmentType[];
}

export function EquipmentTypeStatDisplayer({ equipmentTypeList }: Props) {
  const textType = TEXT_TYPE.Normal;
  const label = `Type: `;
  const content = equipmentTypeList
    .map((equipmentType) => capitalizeFirstLetter(equipmentType.toLowerCase()))
    .join(", ");

  return (
    <StatDisplayer label={label}>
      <TextFormatter content={content} textType={textType} />
    </StatDisplayer>
  );
}
