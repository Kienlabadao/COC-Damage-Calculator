function setAllSpellsLevel(element) {
    switch (element.value) {
        case "max":
            setAllSpellsMaxLevel();
            return;
        case "min":
            setAllSpellsMinLevel();
            return;
        default:
            throw new Error(`Invalid state: ${element.value}`)
    }
}

function setAllTroopsLevel(element) {
    switch (element.value) {
        case "max":
            setAllTroopsMaxLevel();
            return;
        case "min":
            setAllTroopsMinLevel();
            return;
        default:
            throw new Error(`Invalid state: ${element.value}`)
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
            throw new Error(`Invalid state: ${element.value}`)
    }
}

function setAllRepairsLevel(element) {
    switch (element.value) {
        case "max":
            setAllRepairsMaxLevel(element);
            return;
        case "min":
            setAllRepairsMinLevel(element);
            return;
        default:
            throw new Error(`Invalid state: ${element.value}`)
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
            throw new Error(`Invalid state: ${element.value}`)
    }
}

function setAllModifiersLevel(element) {
    switch (element.value) {
        case "max":
            setAllModifiersMaxLevel(element);
            updateOverlay();
            return;
        case "min":
            setAllModifiersMinLevel(element);
            updateOverlay();
            return;
        default:
            throw new Error(`Invalid state: ${element.value}`)
    }
}