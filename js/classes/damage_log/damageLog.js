class DamageLog {

    constructor(offense, modifier, defense, damage, isImmune, remainingHP) {
        this.offense = offense;
        this.modifier = modifier;
        this.defense = defense;
        this._damage = damage;
        this._isImmune = isImmune;
        this._remainingHP = remainingHP;
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

    set defense(newDefense) {
        if (newDefense instanceof Defense) {
            this._defense = newDefense;
        } else {
            throw new Error(`Invalid defense: ${newDefense}`)
        }        
    }

    get offense() {
        return this._offense;
    }

    get modifier() {
        return this._modifier;
    }

    get defense() {
        return this._defense;
    }

    get isImmune() {
        return this._isImmune;
    }

    get damage() {
        return this._damage;
    }

    get remainingHP() {
        return this._remainingHP;
    }
}