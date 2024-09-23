class Action {

    // Store action that later will be read by damage log to calculate its damage on a defense
    // Consists offense and its modifier (if have)

    static OFFENSE = "offense";
    static HERO = "hero";
    static EQUIPMENT = "equipment";

    constructor(offense, type) {
        this.offense = offense;
        this.type = type;
    }

    isActionType(type) {
        return this.type === type;
    }

    // Setter
    set offense(newOffense) {
        if (newOffense instanceof Offense) {
            this._offense = newOffense;
        } else {
            throw new TypeError(`Invalid offense: ${newOffense}`)
        }       
    }

    set type(newType) {
        const typeList = [Action.OFFENSE, Action.HERO, Action.EQUIPMENT];

        if (typeList.includes(newType)) {
            this._type = newType;
        } else {
            throw new TypeError(`Invalid type: ${newType}`)
        }
    }

    // Getter
    get offense() {
        return this._offense;
    }

    get type() {
        return this._type;
    }
}