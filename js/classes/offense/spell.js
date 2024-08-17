class Spell extends Offense {

    constructor(offenseID, isDonated, currentLevelPos) {
        super(offenseID, "spell");
        this.isDonated = isDonated;
        this.maxLevelPos = this.getDamageList().length - 1;
        this.currentLevelPos = currentLevelPos;
        if (this.isDamageTypeEQ()) {
            this.eqCount = 0;
        }
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

    calcBaseEQDamage(maxHP) {
        if (this.isDamageTypeEQ()) {
            return maxHP * this.getCurrentDamage() / 100;
        } else {
            throw new Error(`Spell isn't EQ type: ${this.offenseID}`);
        }
    }

    calcDamage(maxHP) {
        switch (this.damageType) {
            case "direct":
                return this.getCurrentDamage();
            case "earthquake":
                return this.calcBaseEQDamage(maxHP) * (1 / (2 * this.eqCount + 1));            
        }      
    }
 
    calcRemainingHP(hp, maxHP) {
        switch (this.damageType) {
            case "direct":
                return hp - this.calcDamage();
            case "earthquake":
                return hp - this.calcDamage(maxHP);               
        }  
        
    }

    isMaxLevel() {
        return this.getMaxLevel() === this.getCurrentLevel();
    }

    isMinLevel() {
        return this.getLevel(0) === this.getCurrentLevel();
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

    clone() {
        return new Spell(this.offenseID, this.isDonated, this.currentLevelPos);
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

    set eqCount(newEqCount) {
        if (this.isDamageTypeEQ()) {
            if (typeof newEqCount === "number" && newEqCount >= 0) {
                this._eqCount = newEqCount;
            } else {
                throw new Error(`Invalid eqCount: ${eqCount}`);
            }
        } else {
            throw new Error(`Equipment isn't EQ type: ${this.offenseID}`);
        }
    }

    get isDonated() {
        return this._isDonated;
    }

    get currentLevelPos() {
        return this._currentLevelPos;
    }

    get eqCount() {
        if (this.isDamageTypeEQ()) {
            return this._eqCount;
        } else {
            throw new Error(`Equipment isn't EQ type: ${this.offenseID}`);
        }
    }
}