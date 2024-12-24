import { DefenseDisplayData } from "features/zapquake_calc/objects/defenseDisplayData";
import { DefenseCard } from "./DefenseCard";
import { NoDefenseFoundStatus } from "./NoDefenseFoundStatus";
import { OffenseItem } from "features/zapquake_calc/objects/offenseItem";

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
            <DefenseCard
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
