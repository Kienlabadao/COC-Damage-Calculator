import { GameDataImageDisplayerContainer, SIZE } from "components/Calculator";
import { AdvanceActionItem } from "features/AdvanceCalculator/objects/advanceActionItem";

interface Props {
  actionList: AdvanceActionItem[];
}

export function SimpleActionListDisplayer({ actionList }: Props) {
  return (
    <div className="d-flex justify-content-center justify-content-md-start flex-wrap gap-1">
      {actionList.map((action, index) => {
        const gameDataID = action.actionID;
        const type = action.type;
        const currentLevelPos = action.currentLevelPos;
        const order = index + 1;

        return (
          <GameDataImageDisplayerContainer
            key={`${gameDataID}_action_${order}`}
            size={SIZE.Normal}
            gameDataID={gameDataID}
            type={type}
            currentLevelPos={currentLevelPos}
            order={order}
          />
        );
      })}
    </div>
  );
}
