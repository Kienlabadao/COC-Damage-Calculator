import { DefenseDisplayData } from "features/zapquake_calc/hooks/Init";
import { DefenseCard } from "./DefenseCard";
import { NoDefenseFoundStatus } from "./NoDefenseFoundStatus";

interface Props {
  defenseDisplayDataList: DefenseDisplayData[];
}

export function DefenseDisplaySection({ defenseDisplayDataList }: Props) {
  function renderDefenseDisplayDataList() {
    if (defenseDisplayDataList.length > 0) {
      return (
        <div className="row row-cols-md-2 row-cols-xl-3 row-cols-xxl-4 gy-3">
          {defenseDisplayDataList.map((defenseDisplayData) => (
            <DefenseCard
              key={defenseDisplayData.id}
              defense={defenseDisplayData.defense}
              updateDefense={defenseDisplayData.updateDefense}
              defenseStatus={defenseDisplayData.defenseStatus}
              spellCountList={defenseDisplayData.spellCountList}
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
