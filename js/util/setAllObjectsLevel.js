// Set all type of objects to max/min level
// Get the max/min level of object, update its slider, and call the appropriate update function (same name for both calculators)

// Offenses
// Spells
function setAllSpellsMaxLevel() {
    spellDivs.forEach((spellDiv) => {
        const spellID = HTMLUtil.getDataID(spellDiv);
        const isDonated = HTMLUtil.getDataDonated(spellDiv);
        const spell = offenseListManager.getSpell(spellID, isDonated);
        const maxLevelPos = spell.maxLevelPos;

        const levelSlider = spellDiv.querySelector(".slider");
        levelSlider.value = maxLevelPos;

        updateOffense(levelSlider);
    });
}

function setAllSpellsMinLevel() {
    spellDivs.forEach((spellDiv) => {
        const spellID = HTMLUtil.getDataID(spellDiv);
        const isDonated = HTMLUtil.getDataDonated(spellDiv);
        const spell = offenseListManager.getSpell(spellID, isDonated);
        const minLevelPos = spell.minLevelPos;

        const levelSlider = spellDiv.querySelector(".slider");
        levelSlider.value = minLevelPos;

        updateOffense(levelSlider);
    });
}

// Troops
function setAllTroopsMaxLevel() {
    troopDivs.forEach((troopDiv) => {
        const troopID = HTMLUtil.getDataID(troopDiv);
        const troop = offenseListManager.getTroop(troopID);
        const maxLevelPos = troop.maxLevelPos;

        const levelSlider = troopDiv.querySelector(".slider");
        levelSlider.value = maxLevelPos;

        updateOffenseLevel(troopDiv, maxLevelPos);
    });
}

function setAllTroopsMinLevel() {
    troopDivs.forEach((troopDiv) => {
        const troopID = HTMLUtil.getDataID(troopDiv);
        const troop = offenseListManager.getTroop(troopID);
        const minLevelPos = troop.minLevelPos;

        const levelSlider = troopDiv.querySelector(".slider");
        levelSlider.value = minLevelPos;

        updateOffenseLevel(troopDiv, minLevelPos);
    });
}

// Equipments
function setAllEquipmentsMaxLevel() {
    equipmentDivs.forEach((equipmentDiv) => {
        const equipmentID = HTMLUtil.getDataID(equipmentDiv);
        const equipment = offenseListManager.getEquipment(equipmentID);
        const maxLevelPos = equipment.maxLevelPos;

        const levelSlider = equipmentDiv.querySelector(".slider");
        levelSlider.value = maxLevelPos;

        updateOffenseLevel(equipmentDiv, maxLevelPos);
    });
}

function setAllEquipmentsMinLevel() {
    equipmentDivs.forEach((equipmentDiv) => {
        const equipmentID = HTMLUtil.getDataID(equipmentDiv);
        const equipment = offenseListManager.getEquipment(equipmentID);
        const minLevelPos = equipment.minLevelPos;

        const levelSlider = equipmentDiv.querySelector(".slider");
        levelSlider.value = minLevelPos;

        updateOffenseLevel(equipmentDiv, minLevelPos);
    });
}

// Repairs
function setAllRepairsMaxLevel() {
    repairDivs.forEach((repairDiv) => {
        const repairID = HTMLUtil.getDataID(repairDiv);
        const repair = offenseListManager.getRepair(repairID);
        const maxLevelPos = repair.maxLevelPos;

        const levelSlider = repairDiv.querySelector(".slider");
        levelSlider.value = maxLevelPos;

        updateOffenseLevel(repairDiv, maxLevelPos);
    });
}

function setAllRepairsMinLevel() {
    repairDivs.forEach((repairDiv) => {
        const repairID = HTMLUtil.getDataID(repairDiv);
        const repair = offenseListManager.getRepair(repairID);
        const minLevelPos = repair.minLevelPos;

        const levelSlider = repairDiv.querySelector(".slider");
        levelSlider.value = minLevelPos;

        updateOffenseLevel(repairDiv, minLevelPos);
    });
}

// Defenses
function setAllDefensesMaxLevel() {
    defenseDivs.forEach((defenseDiv) => {
        const defenseID = HTMLUtil.getDataID(defenseDiv);
        const defense = defenseListManager.getDefense(defenseID);
        const maxLevelPos = defense.maxLevelPos;

        const levelSlider = defenseDiv.querySelector(".slider");
        levelSlider.value = maxLevelPos;

        updateDefenseLevel(defenseDiv, maxLevelPos);
    });
}

function setAllDefensesMinLevel() {
    defenseDivs.forEach((defenseDiv) => {
        const defenseID = HTMLUtil.getDataID(defenseDiv);
        const defense = defenseListManager.getDefense(defenseID);
        const minLevelPos = defense.minLevelPos;

        const levelSlider = defenseDiv.querySelector(".slider");
        levelSlider.value = minLevelPos;

        updateDefenseLevel(defenseDiv, minLevelPos);
    });
}

// Modifiers
function setAllModifiersMaxLevel() {
    modifierDivs.forEach((modifierDiv) => {
        const modifierID = HTMLUtil.getDataID(modifierDiv);
        if (modifierID !== rageSpellTowerKey) {
            const modifier = modifierListManager.getModifier(modifierID);
            const maxLevelPos = modifier.maxLevelPos;

            const levelSlider = modifierDiv.querySelector(".slider");
            levelSlider.value = maxLevelPos;

            updateModifierLevel(modifierDiv, maxLevelPos);
        }
    });
}

function setAllModifiersMinLevel() {
    modifierDivs.forEach((modifierDiv) => {
        const modifierID = HTMLUtil.getDataID(modifierDiv);
        if (modifierID !== rageSpellTowerKey) {
            const modifier = modifierListManager.getModifier(modifierID);
            const minLevelPos = modifier.minLevelPos;

            const levelSlider = modifierDiv.querySelector(".slider");
            levelSlider.value = minLevelPos;

            updateModifierLevel(modifierDiv, minLevelPos);
        }
    });
}