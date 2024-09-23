class DamageLog {

    // Store damage log which hold action, its modifier (if have), the defense that it attacks, how many damage does it deals, does that defense immune to it, and defense remaining HP.

    constructor(action, defense, isImmune, damage, modifiedDamage, hardModeDamage, reducedEQDamage, remainingHP) {
        this.action = action;
        this.defense = defense;
        this._damage = damage;
        this._modifiedDamage = modifiedDamage;
        this._hardModeDamage = hardModeDamage;
        this._reducedEQDamage = reducedEQDamage;
        this._isImmune = isImmune;
        this._remainingHP = remainingHP;
    }

    // Setter
    set action(newAction) {
        if (newAction instanceof Action) {
            this._action = newAction;
        } else {
            throw new TypeError(`Invalid action: ${newAction}`)
        }       
    }

    set defense(newDefense) {
        if (newDefense instanceof Defense) {
            this._defense = newDefense;
        } else {
            throw new TypeError(`Invalid defense: ${newDefense}`)
        }        
    }

    set isImmune(newIsImmune) {
        if (typeof newIsImmune === "boolean") {
            this._isImmune = newIsImmune;
        } else {
            throw new TypeError(`Invalid isImmune: ${newIsImmune}`)
        }
    }

    set damage(newDamage) {
        if (NumberUtil.isNumber(newDamage) && newDamage >= 0) {
            this._damage = newDamage;
        } else {
            throw new TypeError(`Invalid damage: ${newDamage}`)
        }
    }

    set modifiedDamage(newModifiedDamage) {
        if (NumberUtil.isNumber(newModifiedDamage) && newModifiedDamage >= 0) {
            this._modifiedDamage = newModifiedDamage;
        } else {
            throw new TypeError(`Invalid modifiedDamage: ${newModifiedDamage}`)
        }
    }

    set hardModeDamage(newHardModeDamage) {
        if (NumberUtil.isNumber(newHardModeDamage) && newHardModeDamage >= 0) {
            this._hardModeDamage = newHardModeDamage;
        } else {
            throw new TypeError(`Invalid damage: ${newHardModeDamage}`)
        }
    }

    set reducedEQDamage(newReducedEQDamage) {
        if (NumberUtil.isNumber(newReducedEQDamage) && newReducedEQDamage >= 0) {
            this._reducedEQDamage = newReducedEQDamage;
        } else {
            throw new TypeError(`Invalid damage: ${newReducedEQDamage}`)
        }
    }

    set remainingHP(newRemainingHP) {
        if (NumberUtil.isNumber(newRemainingHP)) {
            this._remainingHP = newRemainingHP;
        } else {
            throw new TypeError(`Invalid remainingHP: ${newRemainingHP}`)
        }
    }

    // Getter
    get action() {
        return this._action;
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

    get modifiedDamage() {
        return this._modifiedDamage;
    }

    get hardModeDamage() {
        return this._hardModeDamage;
    }

    get reducedEQDamage() {
        return this._reducedEQDamage;
    }

    get remainingHP() {
        return this._remainingHP;
    }
}