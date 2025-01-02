import { DefenseDisplayData } from "features/AdvanceCalculator/objects/defenseDisplayData";
import { NoDefenseFoundStatus } from "components/Calculator";
import { DefenseCardContainer } from "./defenseCardContainer";

interface Props {
  defenseDisplayDataList: DefenseDisplayData[];
}

export function DefenseDisplaySection({ defenseDisplayDataList }: Props) {
  function renderDefenseDisplayDataList() {
    if (defenseDisplayDataList.length > 0) {
      return (
        <div className="row row-cols-xl-3 row-cols-md-2 row-gap-3">
          {defenseDisplayDataList.map((defenseDisplayData) => (
            <DefenseCardContainer
              key={defenseDisplayData.id}
              defenseItem={defenseDisplayData.defenseItem}
              updateDefense={defenseDisplayData.updateDefense}
              defenseStatus={defenseDisplayData.defenseLog.defenseStatus}
              damageLogList={defenseDisplayData.defenseLog.damageLogList}
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
