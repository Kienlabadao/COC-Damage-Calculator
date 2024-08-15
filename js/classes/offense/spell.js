class Spell extends Offense {

    constructor(offenseID, isDonated, currentLevelPos) {
        super(offenseID, "spell");
        this.isDonated = isDonated;
        this.damageType = this.offenseJSON["damage_type"];
        this.maxLevelPos = this.getDamageList().length - 1;
        this.currentLevelPos = currentLevelPos;
    }

    getLevel(levelPos) {
        return String(levelPos);
    }

    getMaxLevel() {
        return this.getLevel(this.maxLevelPos);
    }

    getCurrentLevel() {
        return this.getLevel(this.currentLevelPos);
    }

    getDamage(levelPos) {
        return this.getDamageList()[levelPos];
    }

    getCurrentDamage() {
        return this.getDamage(this.currentLevelPos);
    }

    calcDamage(maxHP) {
        switch (this.damageType) {
            case "direct":
                return this.getCurrentDamage();
            case "earthquake":
                return maxHP * this.getCurrentDamage() / 100;
        }      
    }

    calcRemainingHP(hp, maxHP, eqCount) {
        switch (this.damageType) {
            case "direct":
                return hp - this.calcDamage();
            case "earthquake":
                if (maxHP !== undefined && eqCount !== undefined && eqCount >= 0) {
                    return hp - this.calcDamage(maxHP) * (1 / (2 * eqCount + 1));
                } else {
                    throw new Error(`Invalid maxHp: ${maxHP} & eqCount: ${eqCount}`);
                }                
        }  
        
    }

    isMaxLevel() {
        return this.getMaxLevel() === this.getCurrentLevel();
    }

    isMinLevel() {
        return this.getLevel(0) === this.getCurrentLevel();
    }

    isDamageTypeEQ() {
        return this.damageType === "earthquake";
    }

    compare(compareSpell) {
        if (compareSpell instanceof Spell) {
            return this.offenseID === compareSpell.offenseID && this.isDonated === compareSpell.isDonated;
        }
        return false;
    }

    getDamageList() {
        return this.offenseJSON["damage"]; 
    }
    
    getImagePath() {
        return `/images/offense/spells/${this.offenseID}.webp`;
    }

    set isDonated(isDonated) {
        return this._isDonated = isDonated === true;
    }

    set currentLevelPos(newCurrentLevelPos) {
        if (newCurrentLevelPos !== null) {
            if (typeof newCurrentLevelPos !== "number") {
                throw new Error(`Invalid type of currentLevelPos: ${newCurrentLevelPos}. Type: ${typeof newCurrentLevelPos}`);
            }
            
            if (this.getDamageList()[newCurrentLevelPos] !== undefined) {
                this._currentLevelPos = newCurrentLevelPos;
            } else {
                throw new Error(`Invalid currentLevelPos: ${newCurrentLevelPos}. OffenseID: ${this.offenseID}`);
            }
        } else {
            this._currentLevelPos = this.maxLevelPos;
        }
    }

    get isDonated() {
        return this._isDonated;
    }

    get currentLevelPos() {
        return this._currentLevelPos;
    }
}