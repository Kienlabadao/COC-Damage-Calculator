import { DefenseDisplayData } from "features/ZapquakeCalculator/objects/defenseDisplayData";
import { DefenseCardContainer } from "./defenseCardContainer";
import { OffenseItem } from "features/ZapquakeCalculator/objects/offenseItem";
import { NoDefenseFoundStatus } from "components/Calculator";

interface Props {
  offenseItemList: OffenseItem[];
  defenseDisplayDataList: DefenseDisplayData[];
}

export function DefenseDisplaySection({
  offenseItemList,
  defenseDisplayDataList,
}: Props) {
  function renderDefenseDisplayDataList() {
    if (defenseDisplayDataList.length > 0) {
      return (
        <div className="row row-cols-md-2 row-cols-xl-3 row-cols-xxl-4 gy-3">
          {defenseDisplayDataList.map((defenseDisplayData) => (
            <DefenseCardContainer
              key={defenseDisplayData.id}
              defenseItem={defenseDisplayData.defenseItem}
              updateDefense={defenseDisplayData.updateDefense}
              defenseStatus={defenseDisplayData.defenseLog.defenseStatus}
              spellCountList={defenseDisplayData.defenseLog.spellCountList}
              offenseItemList={offenseItemList}
            />
          ))}
        </div>
      );
    } else {
      return <NoDefenseFoundStatus />;
    }
  }

  return renderDefenseDisplayDataList();
}
