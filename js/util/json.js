let defenseJSON = null;
let offenseJSON = null;
let otherJSON = null;

const initEvent = new Event("init");

async function fetchJSON() {
    try {
        const response1 = await fetch('/json/defense.json');
        if (!response1.ok) throw new Error('Failed to fetch data from defense.json');
        defenseJSON = await response1.json();
                
        const response2 = await fetch('/json/offense.json');
        if (!response2.ok) throw new Error('Failed to fetch data from offense.json');
        offenseJSON = await response2.json();

        const response3 = await fetch('/json/other.json');
        if (!response3.ok) throw new Error('Failed to fetch data from other.json');
        otherJSON = await response3.json();

        document.dispatchEvent(initEvent);
    } catch (error) {
        console.error('Error:', error);
        window.location.href = errorPage; // Redirect to an error page
    }
}

function getDefense(defenseID) {
    return defenseJSON["defense"][defenseID];
}

function getEquipment(equipmentID) {
    return offenseJSON["offense"]["equipment"][equipmentID];
}

function getSpell(spellID) {
    return offenseJSON["offense"]["spell"][spellID];
}

function getTroop(troopID) {
    return offenseJSON["offense"]["troop"][troopID];
}

function getModifier(modifierID) {
    return offenseJSON["offense"]["modifier"][modifierID];
}

function getRepair(repairID) {
    return offenseJSON["offense"]["repair"][repairID];
}

function getAllDefenses() {
    return defenseJSON["defense"];
}

function getAllEquipments() {
    return offenseJSON["offense"]["equipment"];
}

function getAllSpells() {
    return offenseJSON["offense"]["spell"];
}

function getAllTroops() {
    return offenseJSON["offense"]["troop"];
}

function getAllModifiers() {
    return offenseJSON["offense"]["modifier"];
}

function getAllRepairs() {
    return offenseJSON["offense"]["repair"];
}

function getMaxSpellCount() {
    return otherJSON["max_spell_count"];
}

fetchJSON();