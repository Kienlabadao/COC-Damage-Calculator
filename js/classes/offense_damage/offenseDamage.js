class OffenseDamage {

    constructor(offense, isImmune, damage, remainingHP) {
        this.offense = offense;
        this.isImmune = isImmune;
        this.damage = damage;
        this.remainingHP = remainingHP;
    }

    set offense(newOffense) {
        if (newOffense instanceof Offense) {
            this._offense = newOffense;
        } else {
            throw new Error(`Invalid offense: ${newOffense}`)
        }       
    }

    set isImmune(newIsImmune) {
        if (typeof newIsImmune === "boolean") {
            this._isImmune = newIsImmune;
        } else {
            throw new Error(`Invalid isImmune: ${newIsImmune}`)
        }        
    }

    set damage(newDamage) {
        if (typeof newDamage === "number") {
            this._damage = newDamage;
        } else {
            throw new Error(`Invalid damage: ${newDamage}`)
        }        
    }

    set remainingHP(newRemainingHP) {
        if (typeof newRemainingHP === "number") {
            this._remainingHP = newRemainingHP;
        } else {
            throw new Error(`Invalid remainingHP: ${newRemainingHP}`)
        }     
    }

    get offense() {
        return this._offense;
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