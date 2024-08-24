function setAllSpellsLevel(element) {
    switch (element.value) {
        case "max":
            setAllSpellsMaxLevel();
            calc();
            return;
        case "min":
            setAllSpellsMinLevel();
            calc();
            return;
        default:
            throw new Error(`Invalid state: ${element.value}`)
    }
}

function setAllEquipmentsLevel(element) {
    switch (element.value) {
        case "max":
            setAllEquipmentsMaxLevel(element);
            calc();
            return;
        case "min":
            setAllEquipmentsMinLevel(element);
            calc();
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