class Repair extends Offense {

    static LEVEL_POS = 0;
    static REPAIR_POS = 1;

    constructor(offenseID, currentLevelPos) {
        super(offenseID, "repair");
        this.setSortedRepairList();
        this.maxLevelPos = this.repairList.length - 1;
        this.currentLevelPos = currentLevelPos;
    }

    getLevel(levelPos) {
        return this.repairList[levelPos][Repair.LEVEL_POS];
    }

    getMaxLevel() {
        return this.getLevel(this.maxLevelPos);
    }

    getCurrentLevel() {
        return this.getLevel(this.currentLevelPos);
    }

    getRepair(levelPos) {
        return this.repairList[levelPos][Repair.REPAIR_POS];
    }

    getCurrentDamage() {
        return this.getRepair(this.currentLevelPos);
    }

    calcModifiedDamage(modify = 0) {
        return this.getCurrentDamage() * modify / 100;
    }

    calcDamage(defense, modify = 0) {
        if (defense instanceof Defense) {
            if (defense.isImmune(this)) {
                return 0;
            }
            
            const maxHP = defense.getCurrentMaxHP();
            const hp = defense.remainingHP;
            const repair = Util.round2Places(this.getCurrentDamage() + this.calcModifiedDamage(modify));

            if (Util.round2Places(hp + repair) > maxHP) {
                return Util.round2Places(maxHP - hp);
            } else {
                return repair;
            }         
        } else {
            throw new Error(`Invalid defense: ${defense}`);
        } 
    }

    calcRemainingHP(defense, modify = 0) {
        if (defense instanceof Defense) {
            if (defense.isImmune(this)) {
                return;
            }

            const hp = defense.remainingHP;

            defense.remainingHP = Util.round2Places(hp + this.calcDamage(defense, modify));
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

    compare(compareRepair) {
        if (compareRepair instanceof Repair) {
            return this.offenseID === compareRepair.offenseID;
        }
        return false;
    }

    getImagePath() {
        return `/images/offense/repairs/${this.offenseID}/${this.getCurrentLevel()}.webp`;    
    }

    clone() {
        return new Repair(this.offenseID, this.currentLevelPos);
    }

    setSortedRepairList() {
        this.repairList = Object.entries(this.offenseJSON["repair"]).sort(([, valueA], [, valueB]) => valueA - valueB);
    }

    set currentLevelPos(newCurrentLevelPos) {
        if (newCurrentLevelPos !== null) {
            if (typeof newCurrentLevelPos !== "number") {
                throw new Error(`Invalid type of currentLevelPos: ${newCurrentLevelPos}. Type: ${typeof newCurrentLevelPos}`);
            }
            if (this.repairList[newCurrentLevelPos] !== undefined) {
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