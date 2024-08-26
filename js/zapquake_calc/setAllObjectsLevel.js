// Called when button is pressed, and call the appropriate update function (store in util folder)
// While the update function is the same for both calculators, the calculate function is not. So I had to separate them into different files

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