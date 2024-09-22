class Action {

    // Store action that later will be read by damage log to calculate its damage on a defense
    // Consists offense and its modifier (if have)

    constructor(offense) {
        this.offense = offense;
    }

    // Setter
    set offense(newOffense) {
        if (newOffense instanceof Offense) {
            this._offense = newOffense;
        } else {
            throw new TypeError(`Invalid offense: ${newOffense}`)
        }       
    }

    // Getter
    get offense() {
        return this._offense;
    }
}