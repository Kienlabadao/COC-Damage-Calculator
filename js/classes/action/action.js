class Action {

    constructor(offense, modifier) {
        this.offense = offense;
        this.modifier = modifier;
    }

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

    get offense() {
        return this._offense;
    }

    get modifier() {
        return this._modifier;
    }

    get isImmune() {
        return this._isImmune;
    }
}