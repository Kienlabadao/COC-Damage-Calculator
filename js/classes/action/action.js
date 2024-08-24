class Action {

    // Store action that later will be read by damage log to calculate its damage on a defense
    // Consists offense and its modifier (if have)

    constructor(offense, modifier) {
        this.offense = offense;
        this.modifier = modifier;
    }

    // Setter
    set offense(newOffense) {
        if (newOffense instanceof Offense) {
            this._offense = newOffense;
        } else {
            throw new Error(`Invalid offense: ${newOffense}`)
        }       
    }

    set modifier(newModifier) {
        if (newModifier === null || newModifier instanceof Modifier) {
            this._modifier = newModifier;
        } else {
            throw new Error(`Invalid modifier: ${newModifier}`)
        }
    }

    // Getter
    get offense() {
        return this._offense;
    }

    get modifier() {
        return this._modifier;
    }
}