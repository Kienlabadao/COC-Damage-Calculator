class Spell extends Offense {

    constructor(offenseID, isDonated, currentLevelPos) {
        super(offenseID, "spell");
        this.isDonated = isDonated;
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

    calcBaseEQDamage(maxHP) {
        if (this.isDamageTypeEQ()) {
            return maxHP * this.getCurrentDamage() / 100;
        } else {
            throw new Error(`Spell isn't EQ type: ${this.offenseID}`);
        }
    }

    calcDamage(defense) {
        if (defense instanceof Defense) {
            if (defense.isImmune(this)) {
                return 0;
            }

            const maxHP = defense.getCurrentMaxHP();
            const eqCount = defense.eqCount;

            switch (this.damageType) {
                case "direct":
                    return Util.round2Places(this.getCurrentDamage());
                case "earthquake":
                    return Util.round2Places(this.calcBaseEQDamage(maxHP) * (1 / (2 * eqCount + 1)));            
            }  
        } else {
            throw new Error(`Invalid defense: ${defense}`);
        }       
    }
 
    calcRemainingHP(defense) {
        if (defense instanceof Defense) {
            if (defense.isImmune(this)) {
                return;
            }

            const hp = defense.remainingHP;

            switch (this.damageType) {
                case "direct":
                    defense.remainingHP = Util.round2Places(hp - this.calcDamage(defense));
                    return;
                case "earthquake":
                    defense.remainingHP = Util.round2Places(hp - this.calcDamage(defense));
                    defense.eqCount++;
                    return;               
            }  
        } else {
            throw new Error(`Invalid defense: ${defense}`);
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

    get isDonated() {
        return this._isDonated;
    }

    get currentLevelPos() {
        return this._currentLevelPos;
    }
}