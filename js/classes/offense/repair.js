class Repair extends Offense {

    static LEVEL_POS = 0;
    static REPAIR_POS = 1;

    constructor(offenseID, currentLevelPos, isRaged = false) {
        super(offenseID, "repair");
        this.setSortedRepairList();
        this.rageTowerModify = this.offenseJSON["rage_tower_modify"];
        this.maxLevelPos = this.repairList.length - 1;
        this.currentLevelPos = currentLevelPos;
        this.isRaged = isRaged;
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

    getCurrentRepair() {
        return this.getRepair(this.currentLevelPos);
    }

    calcRepair() {
        return this.isRaged ? this.getCurrentRepair() * this.rageTowerModify / 100 : this.getCurrentRepair();  
    }

    calcRemainingHP(hp) {
        return hp + this.calcDamage();
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
        switch(this.repairType) {
            case "normal":
                return `/images/offense/repairs/${this.offenseID}/${this.getCurrentLevel()}.webp`;
            case "super":
                return `/images/offense/repairs/super_repairs/${this.offenseID}/${this.offenseID}.webp`;
        }       
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

    set isRaged(newIsRaged) {
        if (typeof newIsRaged === "boolean") {
            this._isRaged = newIsRaged;
        } else {
            throw new Error(`Invalid isRaged: ${newIsRaged}`)
        }
    }

    get currentLevelPos() {
        return this._currentLevelPos;
    }

    get isRaged() {
        return this._isRaged;
    }
 }