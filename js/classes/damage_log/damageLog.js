class DamageLog {

    // Store damage log which hold offense, its modifier (if have), the defense that it attacks, how many damage does it deals, does that defense immune to it, and defense remaining HP.

    constructor(offense, modifier, defense, damage, isImmune, remainingHP) {
        this.offense = offense;
        this.modifier = modifier;
        this.defense = defense;
        this._damage = damage;
        this._isImmune = isImmune;
        this._remainingHP = remainingHP;
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

    set defense(newDefense) {
        if (newDefense instanceof Defense) {
            this._defense = newDefense;
        } else {
            throw new Error(`Invalid defense: ${newDefense}`)
        }        
    }

    set damage(newDamage) {
        if (NumberUtil.isNumber(newDamage) && newDamage >= 0) {
            this._damage = newDamage;
        } else {
            throw new Error(`Invalid damage: ${newDamage}`)
        }
    }

    set isImmune(newIsImmune) {
        if (typeof newIsImmune === "boolean") {
            this._isImmune = newIsImmune;
        } else {
            throw new Error(`Invalid isImmune: ${newIsImmune}`)
        }
    }

    set remainingHP(newRemainingHP) {
        if (NumberUtil.isNumber(newRemainingHP)) {
            this._remainingHP = newRemainingHP;
        } else {
            throw new Error(`Invalid remainingHP: ${newRemainingHP}`)
        }
    }

    // Getter
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