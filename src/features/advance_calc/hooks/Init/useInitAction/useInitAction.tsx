import { AdvanceActionItem } from "features/advance_calc/objects/advanceActionItem";
import { useCallback, useState } from "react";

export function useInitAction() {
  const [actionList, setActionList] = useState<AdvanceActionItem[]>([]);

  const addAction = useCallback(
    (actionItem: AdvanceActionItem, count: number) => {
      if (count > 0) {
        setActionList((prevActionList) => {
          const newActionList = [...prevActionList];
          for (let index = 0; index < count; index++) {
            newActionList.push(actionItem);
          }

          return newActionList;
        });
      } else {
        throw new Error(
          `useInitAction.addAction ERROR: count (${count}) must be larger than 0.`
        );
      }
    },
    []
  );

  const removeAction = useCallback((count: number) => {
    if (count > 0) {
      setActionList((prevActionList) => {
        const newActionList = [...prevActionList];
        for (let index = 0; index < count; index++) {
          newActionList.pop();
        }

        return newActionList;
      });
    } else {
      throw new Error(
        `useInitAction.removeAction ERROR: count (${count}) must be larger than 0.`
      );
    }
  }, []);

  const removeAllAction = useCallback(() => setActionList([]), []);

  return [actionList, addAction, removeAction, removeAllAction] as const;
}
