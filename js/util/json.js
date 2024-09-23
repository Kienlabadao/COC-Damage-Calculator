let defenseJSON = null;
let offenseJSON = null;
let modifierJSON = null;
let equipmentJSON = null;
let otherJSON = null;

// Load json file
// If success, fire init event for calculator page to start its init function
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

        const response4 = await fetch('/json/modifier.json');
        if (!response4.ok) throw new Error('Failed to fetch data from other.json');
        modifierJSON = await response4.json();

        const response5 = await fetch('/json/equipment.json');
        if (!response5.ok) throw new Error('Failed to fetch data from other.json');
        equipmentJSON = await response5.json();

        document.dispatchEvent(initEvent);
    } catch (error) {
        console.error('Error:', error);
        window.location.href = errorPage; // Redirect to an error page
    }
}

// Get object from json
function getDefense(defenseID) {
    return defenseJSON["defense"][defenseID];
}

function getSpell(spellID) {
    return offenseJSON["offense"]["spell"][spellID];
}

function getTroop(troopID) {
    return offenseJSON["offense"]["troop"][troopID];
}

function getHero(heroID) {
    return offenseJSON["offense"]["hero"][heroID];
}

function getRepair(repairID) {
    return offenseJSON["offense"]["repair"][repairID];
}

function getModifier(modifierID) {
    return modifierJSON["modifier"][modifierID];
}

function getEquipment(equipmentID) {
    return equipmentJSON["equipment"][equipmentID];
}

function getAllDefenses() {
    return defenseJSON["defense"];
}

function getAllHeroes() {
    return offenseJSON["offense"]["hero"];
}

function getAllSpells() {
    return offenseJSON["offense"]["spell"];
}

function getAllTroops() {
    return offenseJSON["offense"]["troop"];
}

function getAllRepairs() {
    return offenseJSON["offense"]["repair"];
}

function getAllModifiers() {
    return modifierJSON["modifier"];
}

function getAllEquipments() {
    return equipmentJSON["equipment"];
}

function getMaxSpellCount() {
    return otherJSON["max_spell_count"];
}

function getHardModeHeroesModifier() {
    return otherJSON["hard_mode_heroes_modifier"];
}

fetchJSON();