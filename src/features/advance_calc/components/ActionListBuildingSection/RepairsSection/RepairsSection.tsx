import { ModifierItem } from "features/advance_calc/objects/modifierItem";
import { RepairCardWrapper } from "./RepairCardWrapper";
import { RepairSetting } from "./RepairSetting";
import { useInitRepair } from "features/advance_calc/hooks/Init";

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
        className="setting-container"
        setAllRepairsToMax={setAllRepairsToMax}
        setAllRepairsToMin={setAllRepairsToMin}
      />

      <div className="row row-cols-6 justify-content-evenly gap-3 mt-5">
        {repairItemList.map((repair) => (
          <RepairCardWrapper
            key={repair.id}
            repairItem={repair}
            modifierItemList={modifierItemList}
            updateRepair={updateRepair}
          />
        ))}
      </div>
    </div>
  );
}
