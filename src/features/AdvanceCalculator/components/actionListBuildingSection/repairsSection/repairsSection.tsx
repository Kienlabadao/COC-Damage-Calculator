import { ModifierItem } from "features/AdvanceCalculator/objects/modifierItem";
import { RepairCardContainer } from "./repairCardContainer";
import { RepairSetting } from "./repairSetting";
import { useInitRepair } from "features/AdvanceCalculator/hooks/Init";
import { getActiveModifier } from "features/AdvanceCalculator/actions/ModifierItem";
import { GAME_DATA_TYPE } from "data/Game";

interface Props {
  modifierItemList: ModifierItem[];
}

export function RepairsSection({ modifierItemList }: Props) {
  const [repairItemList, updateRepair, setAllRepairsToMax, setAllRepairsToMin] =
    useInitRepair();

  return (
    <div className="mb-5">
      <h3 className="text-center">Repair</h3>

      <RepairSetting
        setAllRepairsToMax={setAllRepairsToMax}
        setAllRepairsToMin={setAllRepairsToMin}
      />

      <div className="row row-cols-6 justify-content-evenly gap-3 mt-5">
        {repairItemList.map((repair) => {
          const activeModifier = getActiveModifier(
            repair.repairID,
            GAME_DATA_TYPE.Repair,
            modifierItemList
          );

          return (
            <RepairCardContainer
              key={repair.id}
              repairItem={repair}
              activeModifier={activeModifier}
              updateRepair={updateRepair}
            />
          );
        })}
      </div>
    </div>
  );
}
