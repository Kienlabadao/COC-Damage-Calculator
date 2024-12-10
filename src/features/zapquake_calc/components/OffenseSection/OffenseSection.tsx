import { OFFENSE_TYPE, OffenseType, RARITY, SPELL } from "assets/data/game";
import { OffenseCard } from "../OffenseCard";
import { useCallback } from "react";
import { OffenseItem } from "features/zapquake_calc/utils/offenseItemUtils";
import { BACKGROUND_TYPE } from "components/CalculatorComponents/OffenseCard/OffenseCardImage";
import { equipmentDataUtils } from "utils/GameData/equipmentDataUtils";
import { spellDataUtils } from "utils/GameData/spellDataUtils";
import { CardContainer } from "components";

function createSpellCard(
  spell: OffenseItem,
  updateOffenseItemList: (
    offenseID: string,
    currentLevelPos?: number,
    useOffense?: boolean
  ) => void
) {
  const spellID = spell.id;
  const {
    getSpellName,
    getSpellImage,
    getSpellMinLevelPos,
    getSpellMaxLevelPos,
    getSpellLevel,
    getSpellDamage,
    getSpellDamageType,
  } = spellDataUtils(spellID);

  const name = getSpellName();
  const type = spell.type;
  const imagePath = getSpellImage();
  const minLevelPos = getSpellMinLevelPos();
  const maxLevelPos = getSpellMaxLevelPos();
  const currentLevelPos = spell.currentLevelPos;
  const currentLevel = getSpellLevel(currentLevelPos);
  const useOffense = spell.use;
  const updateCurrentLevelPos = useCallback((newCurrentLevelPos: number) => {
    updateOffenseItemList(spellID, newCurrentLevelPos);
  }, []);
  const updateUseOffense = useCallback((newUseOffense: boolean) => {
    updateOffenseItemList(spellID, undefined, newUseOffense);
  }, []);
  const damage = getSpellDamage(currentLevelPos);
  const damageType = getSpellDamageType();

  return (
    <OffenseCard
      key={spellID}
      id={spellID}
      name={name}
      type={type}
      imagePath={imagePath}
      backgroundType={
        spellID === SPELL.EarthquakeSpell
          ? BACKGROUND_TYPE.Earthquake
          : BACKGROUND_TYPE.Normal
      }
      minLevelPos={minLevelPos}
      maxLevelPos={maxLevelPos}
      currentLevelPos={currentLevelPos}
      currentLevel={currentLevel}
      useOffense={useOffense}
      updateCurrentLevelPos={updateCurrentLevelPos}
      updateUseOffense={updateUseOffense}
      damage={damage}
      damageType={damageType}
    />
  );
}

function createEquipmentCard(
  equipment: OffenseItem,
  updateOffenseItemList: (
    offenseID: string,
    currentLevelPos?: number,
    useOffense?: boolean
  ) => void
) {
  const equipmentID = equipment.id;
  const {
    equipmentData,
    getEquipmentName,
    getEquipmentImage,
    getEquipmentMinLevelPos,
    getEquipmentMaxLevelPos,
    getEquipmentLevel,
    getEquipmentRarity,
    getEquipmentDamage,
    getEquipmentDamageType,
  } = equipmentDataUtils(equipmentID);

  const name = getEquipmentName();
  const type = equipment.type;
  const imagePath = getEquipmentImage();
  const minLevelPos = getEquipmentMinLevelPos();
  const maxLevelPos = getEquipmentMaxLevelPos();
  const currentLevelPos = equipment.currentLevelPos;
  const currentLevel = getEquipmentLevel(currentLevelPos);
  const useOffense = equipment.use;
  const updateCurrentLevelPos = useCallback((newCurrentLevelPos: number) => {
    updateOffenseItemList(equipmentID, newCurrentLevelPos);
  }, []);
  const updateUseOffense = useCallback((newUseOffense: boolean) => {
    updateOffenseItemList(equipmentID, undefined, newUseOffense);
  }, []);
  const damage = getEquipmentDamage(currentLevelPos);
  const damageType = getEquipmentDamageType();
  if (damageType === null) {
    throw new Error(
      `OffenseSection.createEquipmentCard ERROR: Equipment type Damage have null damage type. Equipment: ${equipmentData}`
    );
  }

  return (
    <OffenseCard
      key={equipmentID}
      id={equipmentID}
      name={name}
      type={type}
      imagePath={imagePath}
      backgroundType={
        getEquipmentRarity() === RARITY.Epic
          ? BACKGROUND_TYPE.Epic
          : BACKGROUND_TYPE.Normal
      }
      minLevelPos={minLevelPos}
      maxLevelPos={maxLevelPos}
      currentLevelPos={currentLevelPos}
      currentLevel={currentLevel}
      useOffense={useOffense}
      updateCurrentLevelPos={updateCurrentLevelPos}
      updateUseOffense={updateUseOffense}
      damage={damage}
      damageType={damageType}
    />
  );
}

interface Props {
  offenseItemList: OffenseItem[];
  updateOffenseItemList: (
    offenseID: string,
    currentLevelPos?: number,
    useOffense?: boolean
  ) => void;
  setAllOffensesToMax: (offenseTypeFilterList: Set<OffenseType>) => void;
  setAllOffensesToMin: (offenseTypeFilterList: Set<OffenseType>) => void;
}

export function OffenseSection({
  offenseItemList,
  updateOffenseItemList,
  setAllOffensesToMax,
  setAllOffensesToMin,
}: Props) {
  return (
    <CardContainer>
      <h2 className="text-center">Select Offense Level</h2>
      <hr />

      <div className="mb-5">
        <h3 className="text-center">Spell</h3>
        <div className="setting-container">
          <div className="d-flex flex-wrap gap-2 my-2">
            <button
              className="btn btn-secondary"
              type="button"
              value="max"
              onClick={() => setAllOffensesToMax(new Set([OFFENSE_TYPE.Spell]))}
            >
              Set All Spells to Max Level
            </button>
            <button
              className="btn btn-secondary"
              type="button"
              value="min"
              onClick={() => setAllOffensesToMin(new Set([OFFENSE_TYPE.Spell]))}
            >
              Set All Spells to Min Level
            </button>
          </div>
          <div className="d-flex align-items-center">
            <input
              className="form-check-input checkbox me-1"
              type="checkbox"
              id="useDonatedLightning"
              onInput={() => setAllOffensesToMin(new Set([OFFENSE_TYPE.Spell]))}
            />
            <label className="h5 mb-0" htmlFor="useDonatedLightning">
              Use donated lightning spell
            </label>
          </div>
        </div>
        <div className="row row-cols-6 justify-content-evenly gap-3 mt-5">
          {offenseItemList
            .filter((offense) => offense.type === OFFENSE_TYPE.Spell)
            .map((offense) => createSpellCard(offense, updateOffenseItemList))}
        </div>
      </div>
      <hr />

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
            .map((offense) =>
              createEquipmentCard(offense, updateOffenseItemList)
            )}
        </div>
      </div>
    </CardContainer>
  );
}
