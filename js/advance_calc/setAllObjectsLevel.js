// Called when button is pressed, and call the appropriate update function (store in util folder)
// While the update function is the same for both calculators, the calculate function is not. So I had to separate them into different files

function setAllSpellsLevel(element) {
    switch (element.value) {
        case "max":
            setAllSpellsMaxLevel();
            updateAllSpellsDamage();
            return;
        case "min":
            setAllSpellsMinLevel();
            updateAllSpellsDamage();
            return;
        default:
            throw new ReferenceError(`Invalid state: ${element.value}`)
    }
}

function setAllTroopsLevel(element) {
    switch (element.value) {
        case "max":
            setAllTroopsMaxLevel();
            updateAllTroopsDamage();
            return;
        case "min":
            setAllTroopsMinLevel();
            updateAllTroopsDamage();
            return;
        default:
            throw new ReferenceError(`Invalid state: ${element.value}`)
    }
}

function setAllEquipmentsLevel(element) {
    switch (element.value) {
        case "max":
            setAllEquipmentsMaxLevel(element);
            return;
        case "min":
            setAllEquipmentsMinLevel(element);
            return;
        default:
            throw new ReferenceError(`Invalid state: ${element.value}`)
    }
}

function setAllRepairsLevel(element) {
    switch (element.value) {
        case "max":
            setAllRepairsMaxLevel(element);
            updateAllRepairsDamage();
            return;
        case "min":
            setAllRepairsMinLevel(element);
            updateAllRepairsDamage();
            return;
        default:
            throw new ReferenceError(`Invalid state: ${element.value}`)
    }
}

function setAllDefensesLevel(element) {
    switch (element.value) {
        case "max":
            setAllDefensesMaxLevel(element);
            calc();
            return;
        case "min":
            setAllDefensesMinLevel(element);
            calc();
            return;
        default:
            throw new ReferenceError(`Invalid state: ${element.value}`)
    }
}

function setAllModifiersLevel(element) {
    switch (element.value) {
        case "max":
            setAllModifiersMaxLevel(element);
            updateAllModifiersModify();
            updateAllOffensesModifier();
            return;
        case "min":
            setAllModifiersMinLevel(element);
            updateAllModifiersModify();
            updateAllOffensesModifier();
            return;
        default:
            throw new ReferenceError(`Invalid state: ${element.value}`)
    }
}