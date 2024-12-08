import { OFFENSE_TYPE } from "assets/data/game";
import { OffenseCard } from "../OffenseCard";
import {
  getEquipment,
  getEquipmentImage,
  getEquipmentMaxLevelPos,
  getEquipmentMinLevelPos,
  getSpell,
  getSpellImage,
  getSpellMaxLevelPos,
  getSpellMinLevelPos,
} from "utils/gameDataUtils";
import { useCallback } from "react";
import { OffenseItem } from "features/zapquake_calc/hooks/init/useInitOffense";

interface Props {
  offenseItemList: OffenseItem[];
  updateOffenseItemList: (offenseID: string, currentLevelPos: number) => void;
}

function createSpellCard(
  spell: OffenseItem,
  updateOffenseItemList: (offenseID: string, currentLevelPos: number) => void
) {
  const spellID = spell.id;
  const spellData = getSpell(spellID);

  const name = spellData.name;
  const imagePath = getSpellImage(spellID);
  const minLevelPos = getSpellMinLevelPos();
  const maxLevelPos = getSpellMaxLevelPos(spellID);
  const currentLevelPos = spell.currentLevelPos;
  const updateCurrentLevelPos = useCallback((newCurrentLevelPos: number) => {
    updateOffenseItemList(spellID, newCurrentLevelPos);
  }, []);

  return (
    <OffenseCard
      key={spellID}
      name={name}
      imagePath={imagePath}
      minLevelPos={minLevelPos}
      maxLevelPos={maxLevelPos}
      currentLevelPos={currentLevelPos}
      updateCurrentLevelPos={updateCurrentLevelPos}
    />
  );
}

function createEquipmentCard(
  equipment: OffenseItem,
  updateOffenseItemList: (offenseID: string, currentLevelPos: number) => void
) {
  const equipmentID = equipment.id;
  const equipmentData = getEquipment(equipmentID);

  const name = equipmentData.name;
  const imagePath = getEquipmentImage(equipmentID);
  const minLevelPos = getEquipmentMinLevelPos();
  const maxLevelPos = getEquipmentMaxLevelPos(equipmentID);
  const currentLevelPos = equipment.currentLevelPos;
  const updateCurrentLevelPos = useCallback((newCurrentLevelPos: number) => {
    updateOffenseItemList(equipmentID, newCurrentLevelPos);
  }, []);

  return (
    <OffenseCard
      key={equipmentID}
      name={name}
      imagePath={imagePath}
      minLevelPos={minLevelPos}
      maxLevelPos={maxLevelPos}
      currentLevelPos={currentLevelPos}
      updateCurrentLevelPos={updateCurrentLevelPos}
    />
  );
}

export function OffenseSection({
  offenseItemList,
  updateOffenseItemList,
}: Props) {
  console.log(offenseItemList);
  return (
    <>
      <div>OffenseSection</div>
      <div>Spell</div>
      {offenseItemList
        .filter((offense) => offense.type === OFFENSE_TYPE.Spell)
        .map((offense) => createSpellCard(offense, updateOffenseItemList))}
      <div>Equipment</div>
      {offenseItemList
        .filter((offense) => offense.type === OFFENSE_TYPE.Equipment)
        .map((offense) => createEquipmentCard(offense, updateOffenseItemList))}
    </>
  );
}
