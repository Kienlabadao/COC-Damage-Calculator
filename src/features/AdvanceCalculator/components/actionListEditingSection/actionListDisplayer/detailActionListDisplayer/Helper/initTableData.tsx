import { GameDataImageDisplayerContainer, SIZE } from "components/Calculator";
import { TableData } from "components/UI";
import { AdvanceActionItem } from "features/AdvanceCalculator/objects/advanceActionItem";

export function initTableData(actionList: AdvanceActionItem[]): TableData[] {
  return actionList.map((action, index) => {
    const gameDataID = action.actionID;
    const type = action.type;
    const currentLevelPos = action.currentLevelPos;
    const order = index + 1;

    const actionContent = (
      <GameDataImageDisplayerContainer
        key={`${gameDataID}_action_${order}`}
        size={SIZE.Responsive}
        gameDataID={gameDataID}
        type={type}
        currentLevelPos={currentLevelPos}
        order={order}
      />
    );
    const modifierContent = undefined;
    const manageContent = undefined;

    return {
      action: actionContent,
      modifier: modifierContent,
      manage: manageContent,
    };
  });
}
