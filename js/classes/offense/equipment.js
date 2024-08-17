class Equipment extends Offense {

    static LEVEL_POS = 0;
    static DAMAGE_POS = 1;

    constructor(offenseID, currentLevelPos) {
        super(offenseID, "equipment");
        this.setSortedDamageList();
        this.rarity = this.offenseJSON["rarity"];
        this.damageType = this.offenseJSON["damage_type"];
        this.maxLevelPos = this.damageList.length - 1;
        this.currentLevelPos = currentLevelPos;
        if (this.isDamageTypeEQ()) {
            this.eqCount = 0;
        }
    }

    getLevel(levelPos) {
        return this.damageList[levelPos][Equipment.LEVEL_POS];
    }

    getMaxLevel() {
        return this.getLevel(this.maxLevelPos);
    }

    getCurrentLevel() {
        return this.getLevel(this.currentLevelPos);
    }

    getDamage(levelPos) {
        return this.damageList[levelPos][Equipment.DAMAGE_POS];
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

    isRarityEpic() {
        return this.rarity === "epic";
    }

    compare(compareEquipment) {
        if (compareEquipment instanceof Equipment) {
            return this.offenseID === compareEquipment.offenseID;
        }
        return false;
    }

    getDamageList() {
        return this.offenseJSON["damage"]; 
    }
    
    getImagePath() {
        return `/images/offense/equipments/${this.offenseID}.webp`;
    }

    clone() {
        return new Equipment(this.offenseID, this.currentLevelPos);
    }

    setSortedDamageList() {
        this.damageList = Object.entries(this.offenseJSON["damage"]).sort(([, valueA], [, valueB]) => valueA - valueB);
    }

    set currentLevelPos(newCurrentLevelPos) {
        if (newCurrentLevelPos !== null) {
            if (typeof newCurrentLevelPos !== "number") {
                throw new Error(`Invalid type of currentLevelPos: ${newCurrentLevelPos}. Type: ${typeof newCurrentLevelPos}`);
            }

            if (this.damageList[newCurrentLevelPos] !== undefined) {
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