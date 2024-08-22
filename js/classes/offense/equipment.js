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

    get currentLevelPos() {
        return this._currentLevelPos;
    }
 }