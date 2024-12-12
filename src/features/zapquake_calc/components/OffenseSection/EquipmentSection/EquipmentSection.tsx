import { OFFENSE_TYPE } from "data/game";
import { useOffenseSectionContext } from "features/zapquake_calc/context/OffenseSectionContext";
import { EquipmentCard } from "./EquipmentCard";

export function EquipmentSection() {
  const {
    offenseItemList,
    updateOffenseItem,
    setAllOffensesToMax,
    setAllOffensesToMin,
  } = useOffenseSectionContext();

  return (
    <div className="mb-5">
      <h3 className="text-center">Equipment</h3>
      <div className="setting-container">
        <div className="d-flex flex-wrap gap-2 my-2">
          <button
            className="btn btn-secondary"
            type="button"
            value="max"
            onClick={() =>
              setAllOffensesToMax(new Set([OFFENSE_TYPE.Equipment]))
            }
          >
            Set All Equipments to Max Level
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            value="min"
            onClick={() =>
              setAllOffensesToMin(new Set([OFFENSE_TYPE.Equipment]))
            }
          >
            Set All Equipments to Min Level
          </button>
        </div>
        <div className="d-flex align-items-center flex-wrap gap-3">
          <label className="h5 mb-0" htmlFor="earthquakeOrder">
            Earthquake order:
          </label>
          <br />
          <select
            className="form-select dropdown bg-secondary"
            id="earthquakeOrder"
            aria-label="earthquakeOrder"
            onChange={() => console.log("pressed")}
          >
            <option value="earthquake_spell">Earthquake Spell first</option>
            <option value="earthquake_boots">Earthquake Boots first</option>
          </select>
        </div>
      </div>
      <div className="row row-cols-6 justify-content-evenly gap-3 mt-5">
        {offenseItemList
          .filter((offense) => offense.type === OFFENSE_TYPE.Equipment)
          .map((offense) => (
            <EquipmentCard
              key={offense.id}
              equipment={offense}
              updateOffenseItem={updateOffenseItem}
            />
          ))}
      </div>
    </div>
  );
}
