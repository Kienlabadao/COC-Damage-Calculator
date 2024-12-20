import { OFFENSE_TYPE } from "data/game";
import {
  useInitOffense,
  useInitTroopSetting,
} from "features/advance_calc/hooks/Init";
import { TroopSetting } from "./TroopSetting";
import { TroopCardWrapper } from "./TroopCardWrapper";

export function TroopSection() {
  const [
    troopItemList,
    updateOffense,
    setAllOffensesToMax,
    setAllOffensesToMin,
  ] = useInitOffense(new Set([OFFENSE_TYPE.Troop]));
  const [useTroopDeathDamage, setUseTroopDeathDamage] = useInitTroopSetting();

  return (
    <div className="mb-5">
      <h3 className="text-center">Troop</h3>

      <TroopSetting
        className="setting-container"
        useTroopDeathDamage={useTroopDeathDamage}
        setUseTroopDeathDamage={setUseTroopDeathDamage}
        setAllOffensesToMax={setAllOffensesToMax}
        setAllOffensesToMin={setAllOffensesToMin}
      />

      <div className="row row-cols-6 justify-content-evenly gap-3 mt-5">
        {troopItemList.map((offense) => (
          <TroopCardWrapper
            key={offense.id}
            troop={offense}
            updateOffense={updateOffense}
            useTroopDeathDamage={useTroopDeathDamage}
          />
        ))}
      </div>
    </div>
  );
}
