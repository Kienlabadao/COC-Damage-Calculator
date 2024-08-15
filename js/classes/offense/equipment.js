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

    isRarityEpic() {
        return this.rarity === "epic";
    }

    isDamageTypeEQ() {
        return this.damageType === "earthquake";
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

    get currentLevelPos() {
        return this._currentLevelPos;
    }
 }